// Mock Video Data for Shorts Page (TOP 10)
// Replace videoUrl and thumbnailUrl with actual video files

export const MOCK_VIDEO_SHORTS = [
	{
		id: 'vs-1',
		title: 'AI 기술의 새로운 혁신: GPT-5 발표 임박',
		videoUrl: '/videos/1.mp4',
		thumbnailUrl: '/videos/1.mp4#t=0.1',
		source: 'TechNews',
		publishedAt: '3시간 전',
		duration: 45,
		url: 'https://example.com/ai-gpt5-announcement'
	},
	{
		id: 'vs-2',
		title: '글로벌 경제 전망: 2025년 성장률 예측',
		videoUrl: '/videos/2.mp4',
		thumbnailUrl: '/videos/2.mp4#t=0.1',
		source: 'Bloomberg',
		publishedAt: '5시간 전',
		duration: 38,
		url: 'https://example.com/global-economy-2025'
	},
	{
		id: 'vs-3',
		title: '기후 변화 대응: 세계 정상회의 주요 합의',
		videoUrl: '/videos/3.mp4',
		thumbnailUrl: '/videos/3.mp4#t=0.1',
		source: 'Reuters',
		publishedAt: '7시간 전',
		duration: 52,
		url: 'https://example.com/climate-summit-agreement'
	},
	{
		id: 'vs-4',
		title: '테슬라 신모델 공개: 자율주행 기술 대폭 개선',
		videoUrl: '/videos/4.mp4',
		thumbnailUrl: '/videos/4.mp4#t=0.1',
		source: 'CNN Business',
		publishedAt: '9시간 전',
		duration: 41,
		url: 'https://example.com/tesla-autonomous-upgrade'
	},
	{
		id: 'vs-5',
		title: '우주 탐사 새 시대: 화성 유인 탐사 계획 발표',
		videoUrl: '/videos/5.mp4',
		thumbnailUrl: '/videos/5.mp4#t=0.1',
		source: 'NASA News',
		publishedAt: '12시간 전',
		duration: 58,
		url: 'https://example.com/mars-manned-mission'
	},
	{
		id: 'vs-6',
		title: '코인 시장 급등: 비트코인 10만 달러 돌파',
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
		thumbnailUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
		source: 'CoinDesk',
		publishedAt: '14시간 전',
		duration: 35,
		url: 'https://example.com/bitcoin-100k-milestone'
	},
	{
		id: 'vs-7',
		title: '의료 혁신: AI 기반 암 조기 진단 시스템 도입',
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
		thumbnailUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
		source: 'MedTech Today',
		publishedAt: '16시간 전',
		duration: 47,
		url: 'https://example.com/ai-cancer-detection'
	},
	{
		id: 'vs-8',
		title: '스포츠: 월드컵 예선 한국 극적인 승리',
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
		thumbnailUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
		source: 'ESPN',
		publishedAt: '18시간 전',
		duration: 43,
		url: 'https://example.com/worldcup-korea-victory'
	},
	{
		id: 'vs-9',
		title: '교육 개혁: 메타버스 교실 전국 확대',
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
		thumbnailUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
		source: 'EdTech Weekly',
		publishedAt: '20시간 전',
		duration: 39,
		url: 'https://example.com/metaverse-classroom-expansion'
	},
	{
		id: 'vs-10',
		title: '엔터테인먼트: K-POP 그룹 빌보드 차트 1위 달성',
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
		thumbnailUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
		source: 'Billboard',
		publishedAt: '1일 전',
		duration: 44,
		url: 'https://example.com/kpop-billboard-number-one'
	}
];

// Alternative: Use public domain test videos for development
// Replace the videoUrl values with these URLs if you don't have local videos:
//
// Option 1: Big Buck Bunny (Blender Foundation)
// 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
//
// Option 2: Sintel Trailer
// 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
//
// Option 3: Pexels Videos (requires API key)
// Use Pexels API to fetch real stock videos: https://www.pexels.com/api/

export default MOCK_VIDEO_SHORTS;
