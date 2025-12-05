"""
기사 추천 시스템
임베딩 기반으로 유사한 최신 기사를 추천
"""

import json
import numpy as np
from typing import List, Dict, Any, Optional
from pathlib import Path
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class ArticleRecommender:
    """기사 추천 시스템 클래스"""
    
    def __init__(self, embeddings_file: str = "embeddings.json"):
        """
        Args:
            embeddings_file: 임베딩 데이터 파일 경로
        """
        self.embeddings_file = embeddings_file
        self.embeddings_data = None
        self.articles = []
        self.embeddings_matrix = None
        self.article_ids = []
        self._load_embeddings()
    
    def _load_embeddings(self):
        """임베딩 데이터 로드"""
        try:
            with open(self.embeddings_file, 'r', encoding='utf-8') as f:
                self.embeddings_data = json.load(f)
            
            self.articles = self.embeddings_data.get('articles', [])
            
            if not self.articles:
                raise ValueError("임베딩 데이터에 기사가 없습니다.")
            
            # 임베딩 벡터 배열 생성 (NumPy 배열로 변환)
            embeddings_list = []
            self.article_ids = []
            
            for article in self.articles:
                embedding = article.get('embedding')
                if embedding:
                    embeddings_list.append(embedding)
                    self.article_ids.append(article.get('article_id'))
            
            if embeddings_list:
                self.embeddings_matrix = np.array(embeddings_list)
                logger.info(f"✅ {len(self.articles)}개 기사 임베딩 로드 완료")
                logger.info(f"   임베딩 차원: {self.embeddings_matrix.shape[1]}")
            else:
                raise ValueError("임베딩 벡터를 찾을 수 없습니다.")
                
        except FileNotFoundError:
            logger.error(f"❌ 임베딩 파일을 찾을 수 없습니다: {self.embeddings_file}")
            raise
        except Exception as e:
            logger.error(f"❌ 임베딩 로드 실패: {e}")
            raise
    
    def _cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """
        코사인 유사도 계산
        
        Args:
            vec1: 첫 번째 벡터
            vec2: 두 번째 벡터 또는 벡터 배열
            
        Returns:
            코사인 유사도 (0~1)
        """
        # 단일 벡터와 벡터 배열 간 유사도 계산
        if vec2.ndim == 1:
            # 단일 벡터
            dot_product = np.dot(vec1, vec2)
            norm1 = np.linalg.norm(vec1)
            norm2 = np.linalg.norm(vec2)
            if norm1 == 0 or norm2 == 0:
                return 0.0
            return dot_product / (norm1 * norm2)
        else:
            # 벡터 배열 (행렬)
            dot_products = np.dot(self.embeddings_matrix, vec1)
            norms = np.linalg.norm(self.embeddings_matrix, axis=1)
            norm_vec1 = np.linalg.norm(vec1)
            similarities = dot_products / (norms * norm_vec1)
            # NaN 처리
            similarities = np.nan_to_num(similarities, nan=0.0)
            return similarities
    
    def _parse_date(self, date_str: str) -> Optional[datetime]:
        """날짜 문자열 파싱"""
        if not date_str:
            return None
        try:
            from dateutil import parser
            return parser.parse(date_str)
        except:
            try:
                return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S%z")
            except:
                return None
    
    def get_article_index(self, article_id: str) -> Optional[int]:
        """article_id로 인덱스 찾기"""
        try:
            return self.article_ids.index(article_id)
        except ValueError:
            return None
    
    def recommend(self, 
                 article_id: str, 
                 top_n: int = 5,
                 min_similarity: float = 0.3,
                 exclude_self: bool = True) -> List[Dict[str, Any]]:
        """
        특정 기사와 유사한 기사 추천
        
        Args:
            article_id: 기준 기사 ID
            top_n: 추천할 기사 개수
            min_similarity: 최소 유사도 임계값
            exclude_self: 자기 자신 제외 여부
            
        Returns:
            추천 기사 리스트 (유사도 높은 순, 최신 순)
        """
        # 기준 기사 찾기
        article_index = self.get_article_index(article_id)
        if article_index is None:
            logger.warning(f"⚠️  기사를 찾을 수 없습니다: {article_id}")
            return []
        
        base_article = self.articles[article_index]
        base_embedding = np.array(base_article['embedding'])
        
        # 모든 기사와 유사도 계산
        similarities = self._cosine_similarity(base_embedding, self.embeddings_matrix)
        
        # 결과 준비
        results = []
        for i, similarity in enumerate(similarities):
            # 자기 자신 제외
            if exclude_self and i == article_index:
                continue
            
            # 최소 유사도 체크
            if similarity < min_similarity:
                continue
            
            article = self.articles[i]
            published_at = self._parse_date(article.get('published_at', ''))
            
            results.append({
                'article_id': article.get('article_id'),
                'title': article.get('title'),
                'subtitle': article.get('subtitle'),
                'category': article.get('category'),
                'url': article.get('url'),
                'published_at': article.get('published_at'),
                'similarity': float(similarity),
                'published_timestamp': published_at.timestamp() if published_at else 0
            })
        
        # 정렬: 유사도 높은 순 → 최신 순
        results.sort(key=lambda x: (-x['similarity'], -x['published_timestamp']))
        
        # 상위 N개 반환
        return results[:top_n]
    
    def recommend_by_category(self,
                             article_id: str,
                             category: str,
                             top_n: int = 5,
                             min_similarity: float = 0.3) -> List[Dict[str, Any]]:
        """
        특정 카테고리 내에서 유사한 기사 추천
        
        Args:
            article_id: 기준 기사 ID
            category: 카테고리 필터
            top_n: 추천할 기사 개수
            min_similarity: 최소 유사도 임계값
            
        Returns:
            추천 기사 리스트
        """
        all_recommendations = self.recommend(
            article_id=article_id,
            top_n=len(self.articles),  # 모든 기사 가져오기
            min_similarity=min_similarity
        )
        
        # 카테고리 필터링
        filtered = [r for r in all_recommendations if r.get('category') == category]
        
        return filtered[:top_n]
    
    def get_article_info(self, article_id: str) -> Optional[Dict[str, Any]]:
        """기사 정보 가져오기"""
        article_index = self.get_article_index(article_id)
        if article_index is None:
            return None
        return self.articles[article_index]


# 사용 예시
if __name__ == "__main__":
    import sys
    
    # 로깅 설정
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )
    
    try:
        # 추천 시스템 초기화
        recommender = ArticleRecommender()
        
        # 테스트: 첫 번째 기사로 추천
        if recommender.articles:
            test_article_id = recommender.articles[0].get('article_id')
            print(f"\n{'='*70}")
            print(f"테스트: 기사 ID {test_article_id}와 유사한 기사 추천")
            print(f"{'='*70}\n")
            
            base_article = recommender.get_article_info(test_article_id)
            if base_article:
                print(f"기준 기사:")
                print(f"  제목: {base_article.get('title')}")
                print(f"  카테고리: {base_article.get('category')}")
                print(f"\n추천 기사 (상위 5개):\n")
            
            recommendations = recommender.recommend(
                article_id=test_article_id,
                top_n=5,
                min_similarity=0.3
            )
            
            for i, rec in enumerate(recommendations, 1):
                print(f"{i}. [{rec['category']}] {rec['title'][:50]}...")
                print(f"   유사도: {rec['similarity']:.4f} | 발행일: {rec['published_at']}")
                print()
        else:
            print("❌ 추천할 기사가 없습니다.")
            
    except Exception as e:
        logger.error(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
