"""
KoSimCSE 기반 벡터 임베딩 생성
크롤링된 뉴스 기사 데이터를 벡터 임베딩으로 변환
"""

import os
import json
import sys
import numpy as np
from typing import List, Dict, Any
from pathlib import Path
import logging
from tqdm import tqdm

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

sys.stdout.reconfigure(encoding='utf-8')

# KoSimCSE 모델 로드
try:
    from transformers import AutoModel, AutoTokenizer
    import torch
    
    MODEL_NAME = "BM-K/KoSimCSE-roberta"
    logger.info(f"KoSimCSE 모델 로딩 중: {MODEL_NAME}")
    
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModel.from_pretrained(MODEL_NAME)
    model.eval()  # 평가 모드
    
    # GPU 사용 가능하면 GPU로
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    
    logger.info(f"✅ 모델 로딩 완료 (디바이스: {device})")
    
except Exception as e:
    logger.error(f"❌ 모델 로딩 실패: {e}")
    logger.error("필요한 패키지 설치: pip install transformers torch")
    sys.exit(1)


def get_embedding(text: str, max_length: int = 512) -> np.ndarray:
    """
    텍스트를 벡터 임베딩으로 변환
    
    Args:
        text: 입력 텍스트
        max_length: 최대 토큰 길이
        
    Returns:
        벡터 임베딩 (numpy array)
    """
    if not text or not text.strip():
        # 빈 텍스트는 0 벡터 반환
        return np.zeros(model.config.hidden_size)
    
    try:
        # 텍스트 토크나이징
        inputs = tokenizer(
            text,
            return_tensors="pt",
            max_length=max_length,
            truncation=True,
            padding=True
        )
        
        # GPU로 이동
        inputs = {k: v.to(device) for k, v in inputs.items()}
        
        # 임베딩 생성 (gradient 계산 불필요)
        with torch.no_grad():
            outputs = model(**inputs)
            # [CLS] 토큰 사용 (첫 번째 토큰)
            embedding = outputs.last_hidden_state[:, 0, :].squeeze()
        
        # CPU로 이동 후 numpy로 변환
        if embedding.dim() == 0:
            embedding = embedding.unsqueeze(0)
        embedding = embedding.cpu().numpy()
        
        # 정규화 (코사인 유사도 계산을 위해)
        norm = np.linalg.norm(embedding)
        if norm > 0:
            embedding = embedding / norm
        
        return embedding
        
    except Exception as e:
        logger.error(f"임베딩 생성 실패: {e}")
        return np.zeros(model.config.hidden_size)


def prepare_text_for_embedding(article: Dict[str, Any]) -> str:
    """
    기사 데이터에서 임베딩용 텍스트 생성
    
    Args:
        article: 기사 딕셔너리
        
    Returns:
        임베딩용 텍스트 (제목 + 부제목 + 본문)
    """
    title = article.get('title', '').strip()
    subtitle = article.get('subtitle', '').strip()
    content = article.get('content', '').strip()
    
    # 제목 + 부제목 + 본문 조합
    parts = []
    if title:
        parts.append(title)
    if subtitle:
        parts.append(subtitle)
    if content:
        # 본문이 너무 길면 앞부분만 사용
        content_preview = content[:2000] if len(content) > 2000 else content
        parts.append(content_preview)
    
    return " ".join(parts)


def load_articles_from_json(json_file: str) -> List[Dict[str, Any]]:
    """
    JSON 파일에서 기사 데이터 로드
    
    Args:
        json_file: JSON 파일 경로
        
    Returns:
        기사 리스트
    """
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            articles = json.load(f)
        
        if not isinstance(articles, list):
            articles = [articles]
        
        logger.info(f"✅ {json_file}: {len(articles)}개 기사 로드")
        return articles
        
    except Exception as e:
        logger.error(f"❌ 파일 로드 실패 ({json_file}): {e}")
        return []


def generate_embeddings_for_articles(articles: List[Dict[str, Any]], 
                                     batch_size: int = 8) -> List[Dict[str, Any]]:
    """
    기사 리스트에 대해 벡터 임베딩 생성
    
    Args:
        articles: 기사 리스트
        batch_size: 배치 크기 (선택사항, 현재는 1개씩 처리)
        
    Returns:
        임베딩이 추가된 기사 리스트
    """
    articles_with_embeddings = []
    
    logger.info(f"📊 {len(articles)}개 기사 임베딩 생성 시작...")
    
    for i, article in enumerate(tqdm(articles, desc="임베딩 생성")):
        try:
            # 임베딩용 텍스트 준비
            text = prepare_text_for_embedding(article)
            
            if not text or len(text.strip()) < 10:
                logger.warning(f"  ⚠️  기사 {i+1}: 텍스트가 너무 짧아 스킵")
                continue
            
            # 벡터 임베딩 생성
            embedding = get_embedding(text)
            
            # 기사에 임베딩 추가
            article_with_embedding = article.copy()
            article_with_embedding['embedding'] = embedding.tolist()
            article_with_embedding['embedding_dim'] = len(embedding)
            
            articles_with_embeddings.append(article_with_embedding)
            
            # 진행 상황 출력 (10개마다)
            if (i + 1) % 10 == 0:
                logger.info(f"  ✅ {i+1}/{len(articles)}개 완료")
                
        except Exception as e:
            logger.error(f"  ❌ 기사 {i+1} 임베딩 생성 실패: {e}")
            continue
    
    logger.info(f"✅ 총 {len(articles_with_embeddings)}개 기사 임베딩 생성 완료")
    return articles_with_embeddings


def process_all_crawled_data(data_dir: str = "crawled_data") -> List[Dict[str, Any]]:
    """
    크롤링된 모든 JSON 파일을 처리하여 임베딩 생성
    
    Args:
        data_dir: 데이터 디렉토리 경로
        
    Returns:
        모든 기사의 임베딩이 포함된 리스트
    """
    data_path = Path(data_dir)
    
    if not data_path.exists():
        logger.error(f"❌ 데이터 디렉토리가 없습니다: {data_dir}")
        return []
    
    # 모든 JSON 파일 찾기
    json_files = list(data_path.glob("mk_news_*.json"))
    
    if not json_files:
        logger.error(f"❌ JSON 파일을 찾을 수 없습니다: {data_dir}")
        return []
    
    logger.info(f"📁 {len(json_files)}개 JSON 파일 발견")
    
    all_articles = []
    
    # 각 파일에서 기사 로드
    for json_file in json_files:
        articles = load_articles_from_json(str(json_file))
        all_articles.extend(articles)
    
    logger.info(f"📊 총 {len(all_articles)}개 기사 로드 완료")
    
    # 중복 제거 (article_id 기준)
    seen_ids = set()
    unique_articles = []
    for article in all_articles:
        article_id = article.get('article_id')
        if article_id and article_id not in seen_ids:
            seen_ids.add(article_id)
            unique_articles.append(article)
    
    logger.info(f"📊 중복 제거 후: {len(unique_articles)}개 기사")
    
    # 임베딩 생성
    articles_with_embeddings = generate_embeddings_for_articles(unique_articles)
    
    return articles_with_embeddings


def save_embeddings(articles_with_embeddings: List[Dict[str, Any]], 
                   output_file: str = "embeddings.json"):
    """
    임베딩이 포함된 기사 데이터를 JSON 파일로 저장
    
    Args:
        articles_with_embeddings: 임베딩이 포함된 기사 리스트
        output_file: 출력 파일 경로
    """
    try:
        # 임베딩만 별도로 저장 (용량 절약)
        embeddings_data = {
            'articles': articles_with_embeddings,
            'total_count': len(articles_with_embeddings),
            'embedding_dim': articles_with_embeddings[0]['embedding_dim'] if articles_with_embeddings else 0,
            'model_name': MODEL_NAME
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(embeddings_data, f, ensure_ascii=False, indent=2)
        
        logger.info(f"✅ 임베딩 데이터 저장 완료: {output_file}")
        logger.info(f"   총 {len(articles_with_embeddings)}개 기사")
        logger.info(f"   임베딩 차원: {embeddings_data['embedding_dim']}")
        
        # 파일 크기 확인
        file_size = os.path.getsize(output_file) / (1024 * 1024)  # MB
        logger.info(f"   파일 크기: {file_size:.2f} MB")
        
    except Exception as e:
        logger.error(f"❌ 저장 실패: {e}")


def main():
    """메인 함수"""
    print("=" * 70)
    print("KoSimCSE 기반 벡터 임베딩 생성")
    print("=" * 70)
    print()
    
    # 크롤링된 데이터 처리
    articles_with_embeddings = process_all_crawled_data()
    
    if not articles_with_embeddings:
        logger.error("❌ 처리할 기사가 없습니다.")
        return
    
    # 임베딩 데이터 저장
    save_embeddings(articles_with_embeddings, "embeddings.json")
    
    # 통계 출력
    print("\n" + "=" * 70)
    print("임베딩 생성 완료!")
    print("=" * 70)
    print(f"총 기사 수: {len(articles_with_embeddings)}개")
    
    # 카테고리별 통계
    category_count = {}
    for article in articles_with_embeddings:
        category = article.get('category', 'Unknown')
        category_count[category] = category_count.get(category, 0) + 1
    
    print("\n카테고리별 기사 수:")
    for category, count in sorted(category_count.items()):
        print(f"  {category:10s}: {count:4d}개")
    
    print("=" * 70)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  사용자에 의해 중단되었습니다.")
        sys.exit(0)
    except Exception as e:
        logger.error(f"\n❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
