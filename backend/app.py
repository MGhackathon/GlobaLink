from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
from dotenv import load_dotenv
from processor import NewsProcessingService
from recommender import ArticleRecommender
import traceback

# 환경변수 로드
load_dotenv()

app = Flask(__name__)
CORS(app)  # CORS 허용

# 서비스 초기화
news_service = NewsProcessingService()

# 추천 시스템 초기화
try:
    recommender = ArticleRecommender()
    print("✅ 추천 시스템 초기화 완료")
except Exception as e:
    print(f"⚠️  추천 시스템 초기화 실패: {e}")
    recommender = None

@app.route('/api/scrape', methods=['POST'])
def scrape_article():
    """기사 스크래핑 API"""
    try:
        data = request.get_json()
        url = data.get('url')
        
        if not url:
            return jsonify({
                'success': False,
                'error': 'URL이 필요합니다'
            }), 400
        
        # 기사 처리
        result = news_service.process_article(url)
        
        return jsonify(result)
        
    except Exception as e:
        print(f"스크래핑 오류: {e}")
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': f'서버 오류: {str(e)}'
        }), 500

@app.route('/api/translate', methods=['POST'])
def translate_text():
    """텍스트 번역 API"""
    try:
        data = request.get_json()
        text = data.get('text')
        target_lang = data.get('target_lang', 'ko')
        
        if not text:
            return jsonify({
                'success': False,
                'error': '번역할 텍스트가 필요합니다'
            }), 400
        
        translated = news_service.translator.translate_text(text, target_lang)
        
        if translated:
            return jsonify({
                'success': True,
                'original': text,
                'translated': translated
            })
        else:
            return jsonify({
                'success': False,
                'error': '번역에 실패했습니다'
            }), 500
            
    except Exception as e:
        print(f"번역 오류: {e}")
        return jsonify({
            'success': False,
            'error': f'서버 오류: {str(e)}'
        }), 500

@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    """텍스트 요약 API"""
    try:
        data = request.get_json()
        text = data.get('text')
        max_length = data.get('max_length', 300)
        
        if not text:
            return jsonify({
                'success': False,
                'error': '요약할 텍스트가 필요합니다'
            }), 400
        
        summarized = news_service.summarizer.summarize_text(text, max_length)
        
        if summarized:
            return jsonify({
                'success': True,
                'original': text,
                'summarized': summarized
            })
        else:
            return jsonify({
                'success': False,
                'error': '요약에 실패했습니다'
            }), 500
            
    except Exception as e:
        print(f"요약 오류: {e}")
        return jsonify({
            'success': False,
            'error': f'서버 오류: {str(e)}'
        }), 500

@app.route('/api/process', methods=['POST'])
def process_full_article():
    """전체 기사 처리 API (스크래핑 + 번역 + 요약)"""
    try:
        data = request.get_json()
        url = data.get('url')
        
        if not url:
            return jsonify({
                'success': False,
                'error': 'URL이 필요합니다'
            }), 400
        
        # 전체 처리
        result = news_service.process_article(url)
        
        return jsonify(result)
        
    except Exception as e:
        print(f"전체 처리 오류: {e}")
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': f'서버 오류: {str(e)}'
        }), 500

@app.route('/api/recommend', methods=['GET', 'POST'])
def recommend_articles():
    """기사 추천 API"""
    try:
        if recommender is None:
            return jsonify({
                'success': False,
                'error': '추천 시스템이 초기화되지 않았습니다'
            }), 503
        
        # GET 또는 POST 요청 처리
        if request.method == 'GET':
            article_id = request.args.get('article_id')
            top_n = int(request.args.get('top_n', 5))
            min_similarity = float(request.args.get('min_similarity', 0.3))
            category = request.args.get('category')
        else:
            data = request.get_json() or {}
            article_id = data.get('article_id')
            top_n = data.get('top_n', 5)
            min_similarity = data.get('min_similarity', 0.3)
            category = data.get('category')
        
        if not article_id:
            return jsonify({
                'success': False,
                'error': 'article_id가 필요합니다'
            }), 400
        
        # 기준 기사 정보
        base_article = recommender.get_article_info(article_id)
        if not base_article:
            return jsonify({
                'success': False,
                'error': f'기사를 찾을 수 없습니다: {article_id}'
            }), 404
        
        # 추천 수행
        if category:
            recommendations = recommender.recommend_by_category(
                article_id=article_id,
                category=category,
                top_n=top_n,
                min_similarity=min_similarity
            )
        else:
            recommendations = recommender.recommend(
                article_id=article_id,
                top_n=top_n,
                min_similarity=min_similarity
            )
        
        return jsonify({
            'success': True,
            'base_article': {
                'article_id': base_article.get('article_id'),
                'title': base_article.get('title'),
                'category': base_article.get('category'),
                'url': base_article.get('url')
            },
            'recommendations': recommendations,
            'count': len(recommendations)
        })
        
    except Exception as e:
        print(f"추천 API 오류: {e}")
        print(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': f'서버 오류: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """서버 상태 확인"""
    return jsonify({
        'status': 'healthy',
        'message': 'News Processing API is running',
        'recommender_available': recommender is not None
    })

@app.route('/', methods=['GET'])
def index():
    """API 문서"""
    return jsonify({
        'message': 'News Processing API',
        'endpoints': {
            'POST /api/scrape': '기사 스크래핑',
            'POST /api/translate': '텍스트 번역',
            'POST /api/summarize': '텍스트 요약',
            'POST /api/process': '전체 기사 처리',
            'GET/POST /api/recommend': '유사 기사 추천',
            'GET /api/health': '서버 상태 확인'
        },
        'example': {
            'url': 'https://example.com/news-article',
            'method': 'POST',
            'endpoint': '/api/process'
        }
    })

if __name__ == '__main__':
    # 환경변수 확인
    print("환경변수 확인:")
    print(f"Google Translate API Key: {'설정됨' if os.getenv('GOOGLE_TRANSLATE_API_KEY') else '미설정'}")
    print(f"DeepL API Key: {'설정됨' if os.getenv('DEEPL_API_KEY') else '미설정'}")
    print(f"OpenAI API Key: {'설정됨' if os.getenv('OPENAI_API_KEY') else '미설정'}")
    print(f"Claude API Key: {'설정됨' if os.getenv('CLAUDE_API_KEY') else '미설정'}")
    
    # 서버 실행
    app.run(debug=True, host='0.0.0.0', port=5000)