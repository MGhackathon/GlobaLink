// Content API - Mock 데이터 로드
// public/api 폴더의 JSON 파일을 fetch로 가져옴

const API_BASE = '/api';

/**
 * ShortForm 콘텐츠 가져오기 (숏글/숏툰)
 * @param {string} type - 'shortgeul' 또는 'shorttoon'
 * @returns {Promise<Array>} ShortForm 콘텐츠 배열
 */
export async function fetchShortFormContent(type = 'all') {
  try {
    const response = await fetch(`${API_BASE}/shortform.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // type에 따라 필터링
    if (type === 'shortgeul') {
      return data.shortgeul || [];
    } else if (type === 'shorttoon') {
      return data.shorttoon || [];
    } else {
      // 'all'인 경우 모두 반환
      return [...(data.shortgeul || []), ...(data.shorttoon || [])];
    }
  } catch (error) {
    console.error('ShortForm API 오류:', error);
    return [];
  }
}

/**
 * Shorts 비디오 가져오기 (TOP 10)
 * @returns {Promise<Array>} 비디오 배열 (최대 10개)
 */
export async function fetchVideoShorts() {
  try {
    const response = await fetch(`${API_BASE}/shorts.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error('Shorts API 오류:', error);
    return [];
  }
}

/**
 * 뉴스 피드 가져오기 (Home 페이지) - 추후 구현
 * @param {Object} options - 옵션 { country, category, limit }
 * @returns {Promise<Array>} 뉴스 기사 배열
 */
export async function fetchNewsFeed({ country = 'US', category = null, limit = 12 } = {}) {
  try {
    // TODO: Home 페이지 데이터 구현 시 활성화
    // const response = await fetch(`${API_BASE}/news.json`);
    // if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // const data = await response.json();
    // return data.articles?.slice(0, limit) || [];
    
    console.warn('Home 페이지 데이터는 아직 구현되지 않았습니다.');
    return [];
  } catch (error) {
    console.error('News API 오류:', error);
    return [];
  }
}

/**
 * 특정 기사의 상세 정보 가져오기
 * @param {string} articleId - 기사 ID
 * @returns {Promise<Object|null>} 기사 상세 정보
 */
export async function fetchArticleDetail(articleId) {
  try {
    // ShortForm과 Shorts 모두에서 검색
    const [shortform, shorts] = await Promise.all([
      fetchShortFormContent('all'),
      fetchVideoShorts()
    ]);
    
    // ShortForm에서 검색
    const shortformArticle = shortform.find(item => item.id === articleId);
    if (shortformArticle) return shortformArticle;
    
    // Shorts에서 검색
    const shortsArticle = shorts.find(item => item.id === articleId);
    if (shortsArticle) return shortsArticle;
    
    return null;
  } catch (error) {
    console.error('기사 상세 정보 로드 실패:', error);
    return null;
  }
}
