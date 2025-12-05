// Mock data for ShortForm page

// 숏글 (Card News) 데이터
export const MOCK_SHORTGEUL_DATA = [
	{
		id: 'sg-1',
		type: 'shortgeul',
		title: 'AI 기술, 의료 분야 혁신 주도',
		summary: 'AI 기술이 의료 진단의 정확도를 크게 향상시키고 있습니다. 최신 AI 진단 시스템은 95% 이상의 정확도를 보이며, 의료진의 업무 효율을 높이고 있습니다. 전문가들은 AI가 의료 분야의 핵심 도구가 될 것으로 전망합니다.',
		pages: [
			{
				type: 'cover',
				title: 'AI 기술, 의료 분야 혁신 주도',
				summary: 'AI 기술이 의료 진단의 정확도를 크게 향상시키고 있습니다. 최신 AI 진단 시스템은 95% 이상의 정확도를 보이며, 의료진의 업무 효율을 높이고 있습니다. 전문가들은 AI가 의료 분야의 핵심 도구가 될 것으로 전망합니다.',
				source: 'TechHealth Daily',
				publishedAt: '3시간 전'
			},
			{
				type: 'content',
				content: 'AI 기반 진단 시스템은 의료 영상 분석에서 탁월한 성능을 보이고 있습니다. CT, MRI, X-ray 이미지를 분석하여 질병을 조기에 발견하고 있습니다.',
				caption: '주요 포인트 1'
			},
			{
				type: 'content',
				content: '전 세계 주요 병원들이 AI 시스템을 도입하고 있으며, 환자 진료 대기 시간이 평균 40% 단축되었습니다.',
				caption: '주요 포인트 2'
			},
			{
				type: 'content',
				content: '전문가들은 2030년까지 대부분의 의료 기관이 AI 보조 진단 시스템을 필수적으로 사용할 것으로 예상하고 있습니다.',
				caption: '향후 전망'
			}
		],
		source: 'TechHealth Daily',
		publishedAt: '3시간 전',
		url: 'https://example.com/ai-healthcare'
	},
	{
		id: 'sg-2',
		type: 'shortgeul',
		title: '전기차 시장, 2025년 폭발적 성장 예상',
		summary: '글로벌 전기차 시장이 급성장하고 있습니다. 2025년에는 전년 대비 150% 성장이 예상되며, 주요 자동차 제조사들이 전기차 라인업을 대폭 확대하고 있습니다. 배터리 기술 발전으로 주행거리도 크게 늘어날 전망입니다.',
		pages: [
			{
				type: 'cover',
				title: '전기차 시장, 2025년 폭발적 성장 예상',
				summary: '글로벌 전기차 시장이 급성장하고 있습니다. 2025년에는 전년 대비 150% 성장이 예상되며, 주요 자동차 제조사들이 전기차 라인업을 대폭 확대하고 있습니다. 배터리 기술 발전으로 주행거리도 크게 늘어날 전망입니다.',
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
				content: '차세대 배터리 기술로 1회 충전 주행거리가 800km를 넘어서며, 충전 시간도 20분 이내로 단축될 예정입니다.',
				caption: '기술 혁신'
			},
			{
				type: 'content',
				content: '정부의 친환경차 보조금 정책과 충전 인프라 확대로 전기차 보급이 더욱 가속화될 것으로 전망됩니다.',
				caption: '정책 지원'
			}
		],
		source: 'Auto World',
		publishedAt: '5시간 전',
		url: 'https://example.com/ev-market'
	},
	{
		id: 'sg-3',
		type: 'shortgeul',
		title: '글로벌 기후 회의, 탄소중립 로드맵 발표',
		summary: '주요 선진국들이 2050 탄소중립 목표 달성을 위한 구체적인 로드맵을 발표했습니다. 재생에너지 투자 확대와 화석연료 사용 감축이 핵심 전략입니다. 개발도상국 지원을 위한 기금도 조성될 예정입니다.',
		pages: [
			{
				type: 'cover',
				title: '글로벌 기후 회의, 탄소중립 로드맵 발표',
				summary: '주요 선진국들이 2050 탄소중립 목표 달성을 위한 구체적인 로드맵을 발표했습니다. 재생에너지 투자 확대와 화석연료 사용 감축이 핵심 전략입니다. 개발도상국 지원을 위한 기금도 조성될 예정입니다.',
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
			},
			{
				type: 'content',
				content: '전문가들은 이번 합의가 지구 온도 상승을 1.5도 이내로 제한하는 데 중요한 전환점이 될 것으로 평가하고 있습니다.',
				caption: '전망'
			}
		],
		source: 'Climate News',
		publishedAt: '1일 전',
		url: 'https://example.com/climate-summit'
	},
	{
		id: 'sg-4',
		type: 'shortgeul',
		title: '암호화폐 시장, 규제 강화에 변동성 확대',
		summary: '주요국 정부들이 암호화폐 규제를 강화하면서 시장 변동성이 커지고 있습니다. 투자자 보호와 자금세탁 방지가 규제의 핵심입니다. 업계는 명확한 규제 가이드라인 마련을 요구하고 있습니다.',
		pages: [
			{
				type: 'cover',
				title: '암호화폐 시장, 규제 강화에 변동성 확대',
				summary: '주요국 정부들이 암호화폐 규제를 강화하면서 시장 변동성이 커지고 있습니다. 투자자 보호와 자금세탁 방지가 규제의 핵심입니다. 업계는 명확한 규제 가이드라인 마련을 요구하고 있습니다.',
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
			},
			{
				type: 'content',
				content: '업계 전문가들은 장기적으로는 명확한 규제가 시장 안정성을 높이고 기관 투자자 유입을 촉진할 것으로 전망하고 있습니다.',
				caption: '전문가 의견'
			}
		],
		source: 'Crypto Daily',
		publishedAt: '6시간 전',
		url: 'https://example.com/crypto-regulation'
	},
	{
		id: 'sg-5',
		type: 'shortgeul',
		title: '우주 관광 시대 본격화, 2025년 상업 운영 시작',
		summary: '민간 우주 기업들이 2025년부터 본격적인 우주 관광 서비스를 시작합니다. 초기 비용은 25만 달러 수준이지만, 향후 10년 내 대중화가 가능할 것으로 예상됩니다. 우주 호텔 건설 계획도 발표되었습니다.',
		pages: [
			{
				type: 'cover',
				title: '우주 관광 시대 본격화, 2025년 상업 운영 시작',
				summary: '민간 우주 기업들이 2025년부터 본격적인 우주 관광 서비스를 시작합니다. 초기 비용은 25만 달러 수준이지만, 향후 10년 내 대중화가 가능할 것으로 예상됩니다. 우주 호텔 건설 계획도 발표되었습니다.',
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
			},
			{
				type: 'content',
				content: '전문가들은 기술 발전과 규모의 경제로 2035년에는 비용이 현재의 10분의 1 수준으로 낮아질 것으로 전망합니다.',
				caption: '가격 전망'
			}
		],
		source: 'Space Today',
		publishedAt: '2일 전',
		url: 'https://example.com/space-tourism'
	},
	{
		id: 'sg-6',
		type: 'shortgeul',
		title: '메타버스 플랫폼, 교육 분야에 본격 진출',
		summary: '메타버스 기술이 교육 분야에서 새로운 가능성을 열고 있습니다. 가상 교실에서 실시간 협업과 실습이 가능해지며, 학습 효과가 크게 향상되고 있습니다. 주요 대학들이 메타버스 캠퍼스를 구축 중입니다.',
		pages: [
			{
				type: 'cover',
				title: '메타버스 플랫폼, 교육 분야에 본격 진출',
				summary: '메타버스 기술이 교육 분야에서 새로운 가능성을 열고 있습니다. 가상 교실에서 실시간 협업과 실습이 가능해지며, 학습 효과가 크게 향상되고 있습니다. 주요 대학들이 메타버스 캠퍼스를 구축 중입니다.',
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
			},
			{
				type: 'content',
				content: '의학, 공학 등 실습이 중요한 분야에서 가상 시뮬레이션을 통한 안전한 실습 환경이 제공되고 있습니다.',
				caption: '실습 교육'
			}
		],
		source: 'Edu Tech',
		publishedAt: '8시간 전',
		url: 'https://example.com/metaverse-education'
	},
	{
		id: 'sg-7',
		type: 'shortgeul',
		title: '양자컴퓨터, 신약 개발 속도 획기적 단축',
		summary: '양자컴퓨터가 신약 개발에 혁명을 일으키고 있습니다. 기존에 10년 이상 걸리던 신약 개발 기간이 2-3년으로 단축될 전망입니다. IBM과 구글이 제약사들과 협력하여 양자컴퓨팅 기반 신약 개발 플랫폼을 구축하고 있습니다.',
		pages: [
			{
				type: 'cover',
				title: '양자컴퓨터, 신약 개발 속도 획기적 단축',
				summary: '양자컴퓨터가 신약 개발에 혁명을 일으키고 있습니다. 기존에 10년 이상 걸리던 신약 개발 기간이 2-3년으로 단축될 전망입니다. IBM과 구글이 제약사들과 협력하여 양자컴퓨팅 기반 신약 개발 플랫폼을 구축하고 있습니다.',
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
			},
			{
				type: 'content',
				content: '전문가들은 2030년까지 대부분의 신약 개발 과정에 양자컴퓨팅이 필수적으로 활용될 것으로 예상합니다.',
				caption: '미래 전망'
			}
		],
		source: 'BioTech News',
		publishedAt: '10시간 전',
		url: 'https://example.com/quantum-drug'
	},
	{
		id: 'sg-8',
		type: 'shortgeul',
		title: '자율주행 트럭, 물류 혁신 주도',
		summary: '자율주행 트럭이 물류 산업의 게임 체인저로 떠오르고 있습니다. 운송 비용이 30% 감소하고, 24시간 무중단 운행이 가능해졌습니다. 주요 물류 기업들이 자율주행 트럭 도입을 확대하고 있습니다.',
		pages: [
			{
				type: 'cover',
				title: '자율주행 트럭, 물류 혁신 주도',
				summary: '자율주행 트럭이 물류 산업의 게임 체인저로 떠오르고 있습니다. 운송 비용이 30% 감소하고, 24시간 무중단 운행이 가능해졌습니다. 주요 물류 기업들이 자율주행 트럭 도입을 확대하고 있습니다.',
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
			},
			{
				type: 'content',
				content: '국내에서도 2026년부터 고속도로 자율주행 트럭 시범 운행이 시작될 예정입니다.',
				caption: '국내 동향'
			}
		],
		source: 'Logistics Today',
		publishedAt: '12시간 전',
		url: 'https://example.com/autonomous-trucks'
	},
	{
		id: 'sg-9',
		type: 'shortgeul',
		title: '재생에너지, 화석연료 발전량 첫 추월',
		summary: '2025년 글로벌 재생에너지 발전량이 화석연료를 처음으로 넘어섰습니다. 태양광과 풍력이 주도하며, 에너지 저장 기술 발전도 재생에너지 확대에 크게 기여했습니다. 에너지 전환이 가속화되고 있습니다.',
		pages: [
			{
				type: 'cover',
				title: '재생에너지, 화석연료 발전량 첫 추월',
				summary: '2025년 글로벌 재생에너지 발전량이 화석연료를 처음으로 넘어섰습니다. 태양광과 풍력이 주도하며, 에너지 저장 기술 발전도 재생에너지 확대에 크게 기여했습니다. 에너지 전환이 가속화되고 있습니다.',
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
			},
			{
				type: 'content',
				content: 'IEA는 2030년까지 재생에너지 비중이 60%를 넘어설 것으로 전망했습니다.',
				caption: '미래 전망'
			}
		],
		source: 'Energy World',
		publishedAt: '1일 전',
		url: 'https://example.com/renewable-energy'
	},
	{
		id: 'sg-10',
		type: 'shortgeul',
		title: '뇌-컴퓨터 인터페이스, 의료 현장 적용 시작',
		summary: 'BCI(뇌-컴퓨터 인터페이스) 기술이 마비 환자 치료에 활용되기 시작했습니다. 생각만으로 의수족을 제어하고, 컴퓨터를 조작할 수 있게 되었습니다. 신경과학과 AI의 융합이 새로운 가능성을 열고 있습니다.',
		pages: [
			{
				type: 'cover',
				title: '뇌-컴퓨터 인터페이스, 의료 현장 적용 시작',
				summary: 'BCI(뇌-컴퓨터 인터페이스) 기술이 마비 환자 치료에 활용되기 시작했습니다. 생각만으로 의수족을 제어하고, 컴퓨터를 조작할 수 있게 되었습니다. 신경과학과 AI의 융합이 새로운 가능성을 열고 있습니다.',
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
			},
			{
				type: 'content',
				content: '향후 언어 장애, 치매 환자 등으로 적용 범위가 확대될 것으로 기대됩니다.',
				caption: '확장 가능성'
			}
		],
		source: 'NeuroTech',
		publishedAt: '15시간 전',
		url: 'https://example.com/bci-medical'
	}
];

// 숏툰 (Comic) 데이터
export const MOCK_SHORTTOON_DATA = [
	{
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
			},
			{
				type: 'comic',
				image: 'gradient-4',
				caption: '기술과 인간성의 조화가 미래의 열쇠'
			}
		],
		source: 'AI Comics',
		publishedAt: '2시간 전'
	},
	{
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
			},
			{
				type: 'comic',
				image: 'gradient-8',
				caption: '함께라면 지구를 구할 수 있습니다'
			}
		],
		source: 'Climate Comics',
		publishedAt: '4시간 전'
	},
	{
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
			},
			{
				type: 'comic',
				image: 'gradient-13',
				caption: '다음 세대는 우주에서 살게 될지도...'
			}
		],
		source: 'Space Comics',
		publishedAt: '6시간 전'
	},
	{
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
			},
			{
				type: 'comic',
				image: 'gradient-17',
				caption: '깨끗한 공기, 조용한 도시'
			}
		],
		source: 'EV Comics',
		publishedAt: '8시간 전'
	},
	{
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
			},
			{
				type: 'comic',
				image: 'gradient-22',
				caption: '제2의 삶이 시작됩니다'
			}
		],
		source: 'Metaverse Comics',
		publishedAt: '10시간 전'
	},
	{
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
			},
			{
				type: 'comic',
				image: 'gradient-26',
				caption: '컴퓨팅의 새로운 시대'
			}
		],
		source: 'Quantum Comics',
		publishedAt: '12시간 전'
	},
	{
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
			},
			{
				type: 'comic',
				image: 'gradient-30',
				caption: '로봇은 이제 가족입니다'
			}
		],
		source: 'Robot Comics',
		publishedAt: '1일 전'
	},
	{
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
			},
			{
				type: 'comic',
				image: 'gradient-35',
				caption: '기술과 윤리의 균형이 필요합니다'
			}
		],
		source: 'BioTech Comics',
		publishedAt: '1일 전'
	}
];

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
