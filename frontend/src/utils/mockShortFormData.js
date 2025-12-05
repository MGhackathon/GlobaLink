// Mock data for ShortForm page - Integrated structure
// Each item contains both shortgeul and shorttoon versions of the same news

export const MOCK_SHORTFORM_DATA = [
	{
		id: 'sf-1',
		newsId: 'news-1',
		shortgeul: {
			id: 'sg-1',
			type: 'shortgeul',
			title: 'AI 기술, 의료 분야 혁신 주도',
			summary: 'AI 기술이 의료 진단의 정확도를 크게 향상시키고 있습니다. 최신 AI 진단 시스템은 95% 이상의 정확도를 보이며, 의료진의 업무 효율을 높이고 있습니다. 전문가들은 AI가 의료 분야의 핵심 도구가 될 것으로 전망합니다.',
			pages: [
				{
					type: 'cover',
					title: 'AI 기술, 의료 분야 혁신 주도',
					summary: 'AI 기술이 의료 진단의 정확도를 크게 향상시키고 있습니다.',
					source: 'TechHealth Daily',
					publishedAt: '3시간 전'
				},
				{
					type: 'content',
					content: 'AI 기반 진단 시스템은 의료 영상 분석에서 탁월한 성능을 보이고 있습니다.',
					caption: '주요 포인트 1'
				},
				{
					type: 'content',
					content: '전 세계 주요 병원들이 AI 시스템을 도입하고 있으며, 환자 진료 대기 시간이 평균 40% 단축되었습니다.',
					caption: '주요 포인트 2'
				}
			]
		},
		shorttoon: {
			id: 'st-1',
			type: 'shorttoon',
			title: 'AI와 인간의 공존',
			pages: [
				{
					type: 'comic',
					image: 'gradient-1',
					caption: '2025년, AI가 일상이 된 세상'
				},
				{
					type: 'comic',
					image: 'gradient-2',
					caption: '인간과 AI가 협력하여 문제를 해결합니다'
				},
				{
					type: 'comic',
					image: 'gradient-3',
					caption: 'AI는 도구일 뿐, 결정은 인간의 몫'
				}
			]
		},
		source: 'TechHealth Daily',
		publishedAt: '3시간 전',
		url: 'https://example.com/ai-healthcare'
	},
	{
		id: 'sf-2',
		newsId: 'news-2',
		shortgeul: {
			id: 'sg-2',
			type: 'shortgeul',
			title: '전기차 시장, 2025년 폭발적 성장 예상',
			summary: '글로벌 전기차 시장이 급성장하고 있습니다. 2025년에는 전년 대비 150% 성장이 예상됩니다.',
			pages: [
				{
					type: 'cover',
					title: '전기차 시장, 2025년 폭발적 성장 예상',
					summary: '글로벌 전기차 시장이 급성장하고 있습니다.',
					source: 'Auto World',
					publishedAt: '5시간 전'
				},
				{
					type: 'content',
					content: '테슬라, 현대차, BMW 등 주요 제조사들이 2025년에 신형 전기차 20여 종을 출시할 계획입니다.',
					caption: '시장 동향'
				},
				{
					type: 'content',
					content: '차세대 배터리 기술로 1회 충전 주행거리가 800km를 넘어섭니다.',
					caption: '기술 혁신'
				}
			]
		},
		shorttoon: {
			id: 'st-2',
			type: 'shorttoon',
			title: '기후변화와 싸우는 영웅들',
			pages: [
				{
					type: 'comic',
					image: 'gradient-5',
					caption: '지구가 위기에 처했습니다'
				},
				{
					type: 'comic',
					image: 'gradient-6',
					caption: '재생에너지를 개발하는 과학자들'
				},
				{
					type: 'comic',
					image: 'gradient-7',
					caption: '환경을 지키는 시민들의 노력'
				}
			]
		},
		source: 'Auto World',
		publishedAt: '5시간 전',
		url: 'https://example.com/ev-market'
	},
	{
		id: 'sf-3',
		newsId: 'news-3',
		shortgeul: {
			id: 'sg-3',
			type: 'shortgeul',
			title: '글로벌 기후 회의, 탄소중립 로드맵 발표',
			summary: '주요 선진국들이 2050 탄소중립 목표 달성을 위한 구체적인 로드맵을 발표했습니다.',
			pages: [
				{
					type: 'cover',
					title: '글로벌 기후 회의, 탄소중립 로드맵 발표',
					summary: '주요 선진국들이 2050 탄소중립 목표 달성을 위한 구체적인 로드맵을 발표했습니다.',
					source: 'Climate News',
					publishedAt: '1일 전'
				},
				{
					type: 'content',
					content: '2030년까지 재생에너지 비중을 50% 이상으로 확대하고, 2040년까지 석탄 발전을 단계적으로 폐지하기로 합의했습니다.',
					caption: '핵심 목표'
				},
				{
					type: 'content',
					content: '선진국들은 개발도상국의 기후변화 대응을 지원하기 위해 연간 1,000억 달러 규모의 기금을 조성하기로 했습니다.',
					caption: '국제 협력'
				}
			]
		},
		shorttoon: {
			id: 'st-3',
			type: 'shorttoon',
			title: '우주 탐험의 꿈',
			pages: [
				{
					type: 'comic',
					image: 'gradient-9',
					caption: '인류의 오랜 꿈, 우주 여행'
				},
				{
					type: 'comic',
					image: 'gradient-10',
					caption: '민간 우주 기업의 도전'
				},
				{
					type: 'comic',
					image: 'gradient-11',
					caption: '화성 탐사 준비 중'
				},
				{
					type: 'comic',
					image: 'gradient-12',
					caption: '우주 시대가 시작됩니다'
				}
			]
		},
		source: 'Climate News',
		publishedAt: '1일 전',
		url: 'https://example.com/climate-summit'
	},
	{
		id: 'sf-4',
		newsId: 'news-4',
		shortgeul: {
			id: 'sg-4',
			type: 'shortgeul',
			title: '암호화폐 시장, 규제 강화에 변동성 확대',
			summary: '주요국 정부들이 암호화폐 규제를 강화하면서 시장 변동성이 커지고 있습니다.',
			pages: [
				{
					type: 'cover',
					title: '암호화폐 시장, 규제 강화에 변동성 확대',
					summary: '주요국 정부들이 암호화폐 규제를 강화하면서 시장 변동성이 커지고 있습니다.',
					source: 'Crypto Daily',
					publishedAt: '6시간 전'
				},
				{
					type: 'content',
					content: '미국, EU, 한국 등 주요국들이 암호화폐 거래소에 대한 인가 제도를 도입하고 있습니다.',
					caption: '규제 동향'
				},
				{
					type: 'content',
					content: '규제 강화 소식에 비트코인 가격이 10% 이상 급락했다가 다시 회복하는 등 높은 변동성을 보이고 있습니다.',
					caption: '시장 반응'
				}
			]
		},
		shorttoon: {
			id: 'st-4',
			type: 'shorttoon',
			title: '전기차 혁명',
			pages: [
				{
					type: 'comic',
					image: 'gradient-14',
					caption: '휘발유 자동차의 시대가 저물고...'
				},
				{
					type: 'comic',
					image: 'gradient-15',
					caption: '전기차가 도로를 점령합니다'
				},
				{
					type: 'comic',
					image: 'gradient-16',
					caption: '배터리 기술의 혁신'
				}
			]
		},
		source: 'Crypto Daily',
		publishedAt: '6시간 전',
		url: 'https://example.com/crypto-regulation'
	},
	{
		id: 'sf-5',
		newsId: 'news-5',
		shortgeul: {
			id: 'sg-5',
			type: 'shortgeul',
			title: '우주 관광 시대 본격화, 2025년 상업 운영 시작',
			summary: '민간 우주 기업들이 2025년부터 본격적인 우주 관광 서비스를 시작합니다.',
			pages: [
				{
					type: 'cover',
					title: '우주 관광 시대 본격화, 2025년 상업 운영 시작',
					summary: '민간 우주 기업들이 2025년부터 본격적인 우주 관광 서비스를 시작합니다.',
					source: 'Space Today',
					publishedAt: '2일 전'
				},
				{
					type: 'content',
					content: 'SpaceX, Blue Origin 등이 준궤도 우주 관광 서비스를 상업화하며, 일반인도 우주를 경험할 수 있게 되었습니다.',
					caption: '서비스 개시'
				},
				{
					type: 'content',
					content: '3박 4일 우주 정거장 체류 프로그램도 개발 중이며, 2027년부터 운영될 예정입니다.',
					caption: '미래 계획'
				}
			]
		},
		shorttoon: {
			id: 'st-5',
			type: 'shorttoon',
			title: '메타버스 모험',
			pages: [
				{
					type: 'comic',
					image: 'gradient-18',
					caption: '가상 세계로의 초대'
				},
				{
					type: 'comic',
					image: 'gradient-19',
					caption: '아바타가 된 나'
				},
				{
					type: 'comic',
					image: 'gradient-20',
					caption: '새로운 친구들과의 만남'
				},
				{
					type: 'comic',
					image: 'gradient-21',
					caption: '현실과 가상의 경계가 사라진다'
				}
			]
		},
		source: 'Space Today',
		publishedAt: '2일 전',
		url: 'https://example.com/space-tourism'
	},
	{
		id: 'sf-6',
		newsId: 'news-6',
		shortgeul: {
			id: 'sg-6',
			type: 'shortgeul',
			title: '메타버스 플랫폼, 교육 분야에 본격 진출',
			summary: '메타버스 기술이 교육 분야에서 새로운 가능성을 열고 있습니다.',
			pages: [
				{
					type: 'cover',
					title: '메타버스 플랫폼, 교육 분야에 본격 진출',
					summary: '메타버스 기술이 교육 분야에서 새로운 가능성을 열고 있습니다.',
					source: 'Edu Tech',
					publishedAt: '8시간 전'
				},
				{
					type: 'content',
					content: 'VR 헤드셋을 활용한 몰입형 학습으로 학생들의 집중도와 이해도가 30% 이상 향상되었습니다.',
					caption: '교육 효과'
				},
				{
					type: 'content',
					content: '해외 유명 대학들이 메타버스 캠퍼스를 개설하며, 전 세계 학생들이 가상 공간에서 함께 수업을 듣고 있습니다.',
					caption: '글로벌 교육'
				}
			]
		},
		shorttoon: {
			id: 'st-6',
			type: 'shorttoon',
			title: '양자컴퓨터의 비밀',
			pages: [
				{
					type: 'comic',
					image: 'gradient-23',
					caption: '기존 컴퓨터로는 불가능한 계산'
				},
				{
					type: 'comic',
					image: 'gradient-24',
					caption: '양자 중첩의 마법'
				},
				{
					type: 'comic',
					image: 'gradient-25',
					caption: '순식간에 해결되는 난제들'
				}
			]
		},
		source: 'Edu Tech',
		publishedAt: '8시간 전',
		url: 'https://example.com/metaverse-education'
	},
	{
		id: 'sf-7',
		newsId: 'news-7',
		shortgeul: {
			id: 'sg-7',
			type: 'shortgeul',
			title: '양자컴퓨터, 신약 개발 속도 획기적 단축',
			summary: '양자컴퓨터가 신약 개발에 혁명을 일으키고 있습니다.',
			pages: [
				{
					type: 'cover',
					title: '양자컴퓨터, 신약 개발 속도 획기적 단축',
					summary: '양자컴퓨터가 신약 개발에 혁명을 일으키고 있습니다.',
					source: 'BioTech News',
					publishedAt: '10시간 전'
				},
				{
					type: 'content',
					content: '양자컴퓨터는 분자 구조 시뮬레이션을 기존 슈퍼컴퓨터보다 수천 배 빠르게 처리할 수 있습니다.',
					caption: '기술 우위'
				},
				{
					type: 'content',
					content: '암, 알츠하이머 등 난치병 치료제 개발에서 이미 유의미한 성과가 나타나고 있습니다.',
					caption: '실제 적용'
				}
			]
		},
		shorttoon: {
			id: 'st-7',
			type: 'shorttoon',
			title: '로봇과의 일상',
			pages: [
				{
					type: 'comic',
					image: 'gradient-27',
					caption: '아침에 깨워주는 로봇'
				},
				{
					type: 'comic',
					image: 'gradient-28',
					caption: '집안일을 돕는 친구'
				},
				{
					type: 'comic',
					image: 'gradient-29',
					caption: '함께 대화하고 놀아요'
				}
			]
		},
		source: 'BioTech News',
		publishedAt: '10시간 전',
		url: 'https://example.com/quantum-drug'
	},
	{
		id: 'sf-8',
		newsId: 'news-8',
		shortgeul: {
			id: 'sg-8',
			type: 'shortgeul',
			title: '자율주행 트럭, 물류 혁신 주도',
			summary: '자율주행 트럭이 물류 산업의 게임 체인저로 떠오르고 있습니다.',
			pages: [
				{
					type: 'cover',
					title: '자율주행 트럭, 물류 혁신 주도',
					summary: '자율주행 트럭이 물류 산업의 게임 체인저로 떠오르고 있습니다.',
					source: 'Logistics Today',
					publishedAt: '12시간 전'
				},
				{
					type: 'content',
					content: '미국에서는 이미 수백 대의 자율주행 트럭이 고속도로에서 상업 운행 중입니다.',
					caption: '현황'
				},
				{
					type: 'content',
					content: '운전자 부족 문제 해결과 함께 교통사고율도 40% 이상 감소했습니다.',
					caption: '효과'
				}
			]
		},
		shorttoon: {
			id: 'st-8',
			type: 'shorttoon',
			title: '바이오 해킹의 미래',
			pages: [
				{
					type: 'comic',
					image: 'gradient-31',
					caption: '인간의 한계를 넘어서'
				},
				{
					type: 'comic',
					image: 'gradient-32',
					caption: '유전자 편집으로 질병 퇴치'
				},
				{
					type: 'comic',
					image: 'gradient-33',
					caption: '수명 연장의 꿈'
				},
				{
					type: 'comic',
					image: 'gradient-34',
					caption: '하지만 윤리적 고민도...'
				}
			]
		},
		source: 'Logistics Today',
		publishedAt: '12시간 전',
		url: 'https://example.com/autonomous-trucks'
	},
	{
		id: 'sf-9',
		newsId: 'news-9',
		shortgeul: {
			id: 'sg-9',
			type: 'shortgeul',
			title: '재생에너지, 화석연료 발전량 첫 추월',
			summary: '2025년 글로벌 재생에너지 발전량이 화석연료를 처음으로 넘어섰습니다.',
			pages: [
				{
					type: 'cover',
					title: '재생에너지, 화석연료 발전량 첫 추월',
					summary: '2025년 글로벌 재생에너지 발전량이 화석연료를 처음으로 넘어섰습니다.',
					source: 'Energy World',
					publishedAt: '1일 전'
				},
				{
					type: 'content',
					content: '태양광 발전 비용이 화석연료보다 저렴해지면서 투자가 급증하고 있습니다.',
					caption: '경제성'
				},
				{
					type: 'content',
					content: 'ESS(에너지 저장 시스템) 기술 발전으로 재생에너지의 간헐성 문제가 해결되고 있습니다.',
					caption: '기술 발전'
				}
			]
		},
		shorttoon: {
			id: 'st-9',
			type: 'shorttoon',
			title: '스마트 시티의 탄생',
			pages: [
				{
					type: 'comic',
					image: 'gradient-35',
					caption: '미래 도시의 모습'
				},
				{
					type: 'comic',
					image: 'gradient-36',
					caption: 'IoT로 연결된 모든 것'
				},
				{
					type: 'comic',
					image: 'gradient-37',
					caption: '편리하고 안전한 생활'
				},
				{
					type: 'comic',
					image: 'gradient-38',
					caption: '지속 가능한 미래를 향해'
				}
			]
		},
		source: 'Energy World',
		publishedAt: '1일 전',
		url: 'https://example.com/renewable-energy'
	},
	{
		id: 'sf-10',
		newsId: 'news-10',
		shortgeul: {
			id: 'sg-10',
			type: 'shortgeul',
			title: '뇌-컴퓨터 인터페이스, 의료 현장 적용 시작',
			summary: 'BCI(뇌-컴퓨터 인터페이스) 기술이 마비 환자 치료에 활용되기 시작했습니다.',
			pages: [
				{
					type: 'cover',
					title: '뇌-컴퓨터 인터페이스, 의료 현장 적용 시작',
					summary: 'BCI(뇌-컴퓨터 인터페이스) 기술이 마비 환자 치료에 활용되기 시작했습니다.',
					source: 'NeuroTech',
					publishedAt: '15시간 전'
				},
				{
					type: 'content',
					content: '척수 손상으로 사지가 마비된 환자가 BCI를 통해 로봇 팔을 제어하는 데 성공했습니다.',
					caption: '임상 성과'
				},
				{
					type: 'content',
					content: '뇌 신호를 AI가 해석하여 사용자의 의도를 95% 이상의 정확도로 파악할 수 있습니다.',
					caption: '기술 수준'
				}
			]
		},
		shorttoon: {
			id: 'st-10',
			type: 'shorttoon',
			title: '블록체인 혁명',
			pages: [
				{
					type: 'comic',
					image: 'gradient-39',
					caption: '중앙화된 시스템의 한계'
				},
				{
					type: 'comic',
					image: 'gradient-40',
					caption: '분산원장 기술의 등장'
				},
				{
					type: 'comic',
					image: 'gradient-41',
					caption: '투명하고 안전한 거래'
				},
				{
					type: 'comic',
					image: 'gradient-42',
					caption: '새로운 경제 시스템의 시작'
				}
			]
		},
		source: 'NeuroTech',
		publishedAt: '15시간 전',
		url: 'https://example.com/bci-medical'
	}
];

// Legacy exports for backward compatibility (deprecated)
export const MOCK_SHORTGEUL_DATA = MOCK_SHORTFORM_DATA.map(item => item.shortgeul);
export const MOCK_SHORTTOON_DATA = MOCK_SHORTFORM_DATA.map(item => item.shorttoon);

// NewsFeedGrid에서 넘어온 기사를 ShortForm 형식으로 변환
export function convertToShortForm(article) {
	return {
		id: `converted-${article.id}`,
		type: 'shortgeul',
		title: article.title,
		summary: `${article.title}에 대한 요약 내용입니다. 이 뉴스는 최근 화제가 되고 있으며, 많은 사람들의 관심을 받고 있습니다. 자세한 내용은 다음 페이지에서 확인하세요.`,
		pages: [
			{
				type: 'cover',
				title: article.title,
				summary: `${article.title}에 대한 요약 내용입니다. 이 뉴스는 최근 화제가 되고 있으며, 많은 사람들의 관심을 받고 있습니다. 자세한 내용은 다음 페이지에서 확인하세요.`,
				source: 'GlobalLink News',
				publishedAt: '방금 전'
			},
			{
				type: 'content',
				content: '뉴스의 핵심 내용을 소개합니다. 최근 이 분야에서 중요한 변화가 일어나고 있습니다.',
				caption: '주요 포인트 1'
			},
			{
				type: 'content',
				content: '전문가들의 분석과 향후 전망을 살펴봅니다. 이번 사건이 미칠 영향을 분석해봅니다.',
				caption: '주요 포인트 2'
			},
			{
				type: 'content',
				content: '앞으로 어떤 변화가 예상되는지 알아봅니다. 관련 업계와 시장의 반응을 살펴봅니다.',
				caption: '향후 전망'
			}
		],
		source: 'GlobalLink News',
		publishedAt: '방금 전',
		url: article.url
	};
}

export default MOCK_SHORTFORM_DATA;
