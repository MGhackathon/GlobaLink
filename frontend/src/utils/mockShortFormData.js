// Mock data for ShortForm page
// 실제 크롤링된 매일경제 뉴스 데이터 사용 (links_summary_20251206_035026.json)
// 구조: Cover(제목+이미지) → Summary(요약) → Content 3개(핵심 내용을 200자씩 3등분)

// 숏글 (Card News) 데이터 - 9개 (실제 8개 + 광고 1개)
export const MOCK_SHORTGEUL_DATA = [
	{
		id: 'sg-11485397',
		type: 'shortgeul',
		title: 'AI인재 처우 주요국 꼴찌수준… 1만1000명 해외로 떠났다',
		pages: [
			{
				type: 'cover',
				title: 'AI인재 처우 주요국 꼴찌수준… 1만1000명 해외로 떠났다',
				image: '/cover/1.jpg'
			},
			{
				type: 'summary',
				summary: '한국 AI 인재 1만1000명 해외로 이탈\n임금 프리미엄 미국 25%에 비해 한국 6%\n패턴인식, 뇌과학 등에서 높은 임금\n딥러닝, 머신러닝은 낮음\n해외근무 국가 중 미국이 6300명으로 가장 많아\n한국은행 보고서, 국내 AI 인재 유출 우려\n미국 등 해외 경쟁력 우세, 한국 불리한 위치 평가'
			},
			{
				type: 'content',
				content: '인공지능(AI) 붐이 전 세계를 휩쓸면서 각국이 인재 유치 경쟁을 벌이는 가운데, 한국의 AI 인력 1만1000명이 해외로 떠났다. 한국은행이 발표한 보고서에 따르면 국내 AI 인력은 5만7000명으로 2010년 대비 2배 증가했지만, 미국 78만명, 영국 11만명에 비하면 여전히 적다. 가장 큰 문제는 보상 수준으로, 국내 AI 인력의 임금 프리미엄은 6%에 불과해 주요 선진국 중 꼴찌 수준이다.'
			},
			{
				type: 'content',
				content: '미국은 AI 인력에게 25%의 임금 프리미엄을 주고, 캐나다 18%, 영국·프랑스·호주는 15%를 지급한다. 한국에서는 패턴 인식(17.9%), 뇌과학(15.8%) 분야가 높은 임금을 받지만, 핵심 기술인 딥러닝과 머신러닝의 임금 프리미엄은 상대적으로 낮다. 특히 딥러닝 기술자들의 해외 근무 확률이 가장 높게 나타났다.'
			},
			{
				type: 'content',
				content: '2010년부터 2024년까지 15년간 팬데믹을 제외하고 매년 AI 인력이 순유출됐다. 해외 근무 중인 국내 AI 인력은 1만1000명으로 전체의 16%이며, 미국이 6300명으로 가장 많고 캐나다와 싱가포르가 뒤를 잇는다. 한국은행은 "미국이 풍부한 일자리와 높은 처우로 국내 인재를 흡수하고 있으며, 한국의 임금 경직성과 보상 체계 미비가 인재 유출을 가속화하고 있다"고 지적했다.'
			}
		],
		source: '매일경제',
		category: '경제',
		publishedAt: '2025-12-05T17:21:04+09:00',
		url: 'https://www.mk.co.kr/news/economy/11485397'
	},
	{
		id: 'sg-11485490',
		type: 'shortgeul',
		title: 'AI 넘어 ASI 가리킨 손정의…이재명 대통령과 70분간 협력논의',
		pages: [
			{
				type: 'cover',
				title: 'AI 넘어 ASI 가리킨 손정의…이재명 대통령과 70분간 협력논의',
				image: '/cover/2.jpg'
			},
			{
				type: 'summary',
				summary: '손정의 소프트뱅크 회장과 이재명 대통령이 AI 협력 논의\n손 회장은 ASI 개념 강조, 인간 두뇌의 1만배 뛰어난 초인공지능으로 AI 발전 주장\n이 대통령은 AI를 상하수도처럼 활용하고 국가 간 협력 강조\n한국의 시스템 반도체 분야 경쟁력 강화를 위해 소프트뱅크의 Arm스쿨 설립 계획 발표\n앞으로의 기술발전 방향과 ASI 시대 대비를 위한 협력 방안 논의\n손 회장과 이 대통령은 한일 간 AI 협력 중요성 강조 및 글로벌 반도체 시장에서 한국의 역량 강화를 위한 협력 합의'
			},
			{
				type: 'content',
				content: '손정의 소프트뱅크 회장이 5일 이재명 대통령을 만나 70분간 AI 협력을 논의했다. 손 회장은 "인간의 두뇌보다 1만배 더 뛰어난 초인공지능(ASI)이 임박했다"며 챗GPT 5.1이 박사학위 테스트를 통과할 정도로 발전했다고 강조했다. 그는 "이제 AI를 통제하려는 생각에서 벗어나 AI와 조화롭게 살아가는 방법을 고민해야 할 때"라고 말했다.'
			},
			{
				type: 'content',
				content: '이재명 대통령은 "AI 기본사회를 만들어 모든 국민과 기업이 AI를 기본적으로 활용하는 사회를 구축하겠다"고 밝혔다. 그는 "AI를 상수도·하수도·도로처럼 모든 국민이 함께 누리는 기본 인프라로 활용할 수 있다"고 강조하며 AI 3대 강국을 목표로 제시했다. 특히 한일 간 AI 협력의 중요성을 언급하며 손 회장에게 가교 역할을 요청했다.'
			},
			{
				type: 'content',
				content: '양측은 한국이 약한 시스템 반도체 분야 경쟁력 강화를 위해 협력하기로 합의했다. 소프트뱅크 자회사 Arm은 한국에 반도체 설계 인력을 양성하는 암스쿨을 설치하고 향후 5년간 1400명의 인력을 집중 배출한다. 손 회장은 김대중 전 대통령 때 브로드밴드를, 문재인 대통령 때 AI를 강조했으며, 이번엔 ASI를 제안하며 "모든 국가와 기업은 ASI 시대를 준비해야 한다"고 강조했다.'
			}
		],
		source: '매일경제',
		category: '정치',
		publishedAt: '2025-12-05T18:09:10+09:00',
		url: 'https://www.mk.co.kr/news/politics/11485490'
	},
	{
		id: 'sg-11485059',
		type: 'shortgeul',
		title: 'AWS, 차세대 컴퓨팅칩 그래비톤5 공개…성능 25%↑',
		pages: [
			{
				type: 'cover',
				title: 'AWS, 차세대 컴퓨팅칩 그래비톤5 공개',
				image: '/cover/3.jpg'
			},
			{
				type: 'summary',
				summary: 'AWS가 그래비톤5 CPU를 공개했다.\n이번 CPU는 성능이 25% 향상되었으며 에너지 효율성도 뛰어나다.\nEC2 M9g 인스턴스는 192개 코어를 담아 데이터 처리 속도가 향상되었다.\n글로벌 기업들은 그래비톤을 통해 성능 향상과 비용 절감을 경험 중이다.\n트웰브랩스는 S3 벡터를 활용해 영상 처리를 자동화하고 있다.\nAWS의 혁신은 기업들의 성과 향상을 이끌고 있다.'
			},
			{
				type: 'content',
				content: 'AWS가 라스베이거스에서 열린 리인벤트 2025에서 차세대 CPU 그래비톤5를 공개했다. 2018년 첫 선을 보인 그래비톤은 꾸준한 업그레이드로 진화해왔으며, 현재 AWS 신규 인프라의 50%가 그래비톤을 사용한다. 이번 그래비톤5는 이전 세대 대비 25% 향상된 컴퓨팅 성능을 제공하면서도 뛰어난 에너지 효율성을 유지해 비용 절감이 가능하다.'
			},
			{
				type: 'content',
				content: 'EC2 M9g 인스턴스는 AWS 역사상 가장 많은 192개 코어를 한 패키지에 담았다. 이 설계 덕분에 코어 간 데이터 이동 거리가 짧아져 통신 지연이 최대 33% 줄어들고 대역폭도 넓어졌다. 데이터를 더 빠르고 효율적으로 처리할 수 있게 되면서 대규모 애플리케이션 운영에 최적화됐다.'
			},
			{
				type: 'content',
				content: '어도비, 에어비앤비, 포뮬러 원, SAP 등 글로벌 기업들이 이미 그래비톤의 이점을 누리고 있다. 어도비는 탄소 배출량 37% 감소, 포뮬러 원은 시뮬레이션 속도 40% 향상, SAP는 시스템 성능 35% 개선 효과를 확인했다. 애플도 그래비톤으로 40% 성능 향상과 30% 비용 절감을 달성했다. 한국 스타트업 트웰브랩스도 S3 벡터를 활용해 영상을 자동 인덱싱하며 AWS의 혁신을 활용 중이다.'
			}
		],
		source: '매일경제',
		category: 'IT',
		publishedAt: '2025-12-05T13:37:51+09:00',
		url: 'https://www.mk.co.kr/news/it/11485059'
	},
	{
		id: 'sg-11485458',
		type: 'shortgeul',
		title: '젠슨 황 소형원전, 저커버그 메타버스→AI, 머스크 휴머노이드',
		pages: [
			{
				type: 'cover',
				title: '테크리더의 3인3색 AI 전략',
				image: '/cover/5.jpg'
			},
			{
				type: 'summary',
				summary: '젠슨 황 엔비디아 CEO는 소형 원전으로 AI 연산 병목 해소를 제안하고, 저커버그 메타 CEO는 메타버스에서 AI 중심 전략으로 전환하며 예산 조정 중.\n머스크 테슬라 CEO는 피지컬 AI로 휴머노이드 로봇 개발에 집중하고, 테슬라의 미래로 휴머노이드 옵티머스 공개하며 관절 기술 향상을 선보임.\nAI 경쟁에서 각각 전력, 플랫폼, 하드웨어 분야에서 경쟁하고 있으며, 데이터센터 전력 소비량은 2030년까지 두 배 이상으로 증가할 전망.'
			},
			{
				type: 'content',
				content: '젠슨 황 엔비디아 CEO는 AI 시대의 최대 병목이 전력 문제라고 지적했다. 팟캐스트에 출연한 그는 "AI 발전에 따른 전력 소비 급증이 심각한 병목을 초래할 것"이라며 소형 원전 확대를 지지했다. 국제에너지기구는 전 세계 데이터센터 전력 소비가 2030년까지 현재의 2배 이상 증가할 것으로 예상한다. 황 CEO는 6~7년 안에 소형 원전이 데이터센터의 핵심 전력원이 될 것이라 전망했다.'
			},
			{
				type: 'content',
				content: '마크 저커버그는 수년간 공들인 메타버스 전략을 대폭 수정하고 AI 경쟁력 강화에 집중하고 있다. 블룸버그에 따르면 메타는 내년 메타버스 조직 예산을 최대 30% 감축하는 방안을 논의 중이다. 삭감된 예산은 AI 웨어러블, 스마트 글라스, LLM 라마 기반 서비스로 재배치된다. 저커버그는 공개 석상에서도 메타버스 언급을 줄이고 AI 플랫폼을 전면에 내세우며 전략 변화를 명확히 하고 있다.'
			},
			{
				type: 'content',
				content: '일론 머스크는 휴머노이드 로봇을 테슬라의 미래로 보고 피지컬 AI 개발에 속도를 내고 있다. 그는 SNS를 통해 테슬라 휴머노이드 로봇 옵티머스의 달리기 시연 영상을 공개하며 균형 제어와 관절 기술 향상을 과시했다. 단순 걷기를 넘어 사람처럼 자연스러운 움직임을 구현한 것이다. 세 테크 거물 모두 AI 경쟁에 뛰어들었지만 승부처는 전력, 플랫폼, 하드웨어로 각각 다른 영역이다.'
			}
		],
		source: '매일경제',
		category: 'IT',
		publishedAt: '2025-12-05T17:32:29+09:00',
		url: 'https://www.mk.co.kr/news/it/11485458'
	},
	// ⚠️ 5번째 자리: 광고 슬롯 (AD SLOT)
	{
		id: 'ad-slot-1',
		type: 'advertisement',
		title: '[광고]',
		pages: [
			{
				type: 'cover',
				title: '광고',
				image: '/cover/5.jpg'
			}
		],
		source: 'GlobaLink AD',
		publishedAt: new Date().toISOString(),
		url: '#',
		isAd: true
	},
	{
		id: 'sg-11485582',
		type: 'shortgeul',
		title: '넷플릭스, 122조원에 워너브러더스 품었다',
		pages: [
			{
				type: 'cover',
				title: '넷플릭스, 122조원에 워너브러더스 품었다',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg'
			},
			{
				type: 'summary',
				summary: '넷플릭스가 122조원에 워너브러더스 디스커버리 인수 합의\n할리우드 역사상 최대 M&A로 세계 엔터업계 변동\n넷플릭스는 827억달러로 WBD 스튜디오와 스트리밍 사업 인수\n이번 거래는 주당 27.75달러 가치로 이뤄졌으며, 승인 후 새 엔터테인먼트 거인 탄생 전망\n넷플릭스는 DC 코믹스, 왕좌의 게임, 오징어 게임 등 인기 IP 확보\n넷플릭스의 시장 지배력 강화와 경쟁력 확보를 위한 전략적 거래\n반독점 심사와 정치적 난관에 직면하고 있음.'
			},
			{
				type: 'content',
				content: '넷플릭스가 워너브러더스 디스커버리(WBD)의 스튜디오와 스트리밍 사업을 827억달러(약 122조원)에 인수한다. 미국 CNBC와 영국 파이낸셜타임스는 이를 현대 할리우드 역사상 가장 크고 중대한 인수합병으로 평가했다. 넷플릭스는 파라마운트와 컴캐스트를 제치고 인수에 성공했으며, 현금과 주식을 혼합한 거래로 사업 부문 가치를 주당 27.75달러로 평가했다.'
			},
			{
				type: 'content',
				content: '이번 인수로 넷플릭스는 102년 역사의 유서 깊은 영화 스튜디오와 결합해 새로운 엔터테인먼트 거인으로 탄생한다. WBD는 HBO, HBO 맥스, 해리포터, 배트맨 등의 프랜차이즈를 보유하고 있다. 넷플릭스는 슈퍼맨 등 DC 코믹스 캐릭터, 왕좌의 게임, 카사블랑카, 더티 해리, 듄, 바비 등 수익성 높은 IP를 확보하게 됐다. 3억명 이상의 구독자를 보유한 넷플릭스의 콘텐츠 라이브러리가 크게 확장된다.'
			},
			{
				type: 'content',
				content: '넷플릭스의 WBD 인수는 할리우드가 극장 중심에서 디지털 우선 산업으로 진화하는 새 시대를 상징한다. 이 인수로 넷플릭스의 시장 지배력이 더욱 강화되며 유튜브, 틱톡 같은 기술 대기업과의 경쟁에서 우위를 점할 것으로 보인다. 다만 반독점 심사와 정치적 난관이 남아있다. 엘리자베스 워런 등 3명의 상원의원은 법무부에 이 M&A가 정치적 편애로 훼손될 수 있다고 경고했다.'
			}
		],
		source: '매일경제',
		category: '국제',
		publishedAt: '2025-12-05T22:23:47+09:00',
		url: 'https://www.mk.co.kr/news/world/11485582'
	},
	{
		id: 'sg-11485576',
		type: 'shortgeul',
		title: '조진웅, 소년범 인정·성폭행 부인',
		pages: [
			{
				type: 'cover',
				title: '조진웅, 소년범 인정·성폭행 부인',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg'
			},
			{
				type: 'summary',
				summary: '조진웅, 미성년 시절 잘못 인정\n소년범 의혹은 인정, 성폭행 부인\n30년 전 사건, 법적 종결\n성인 후 폭행·음주운전 전력\n부친 이름 예명은 성장 다짐\n디스패치, 학창 시절 소년보호처분 보도\n충무로 대표 배우로 활약\n사람엔터테인먼트, 공식입장 발표 후 사과\n미성년 시절 행동 인정, 성폭행과 무관\n조진웅 팬들에게 사과 및 응원 요청'
			},
			{
				type: 'content',
				content: '배우 조진웅(49세, 본명 조원준)의 소속사 사람엔터테인먼트가 5일 공식입장을 발표했다. "배우에게 확인한 결과 미성년 시절 잘못했던 행동이 있었음을 확인했다"며 소년범 의혹을 인정했다. 다만 "성폭행 관련한 행위와는 무관하다"고 명확히 선을 그었다. 30년도 더 지난 시점이라 경위를 완전히 파악하기 어렵고 법적 절차도 이미 종결된 상태라고 설명했다.'
			},
			{
				type: 'content',
				content: '디스패치는 조진웅이 학창 시절 특가법상 강도·강간 혐의로 소년보호처분을 받고 소년원에 송치됐다고 보도했다. 성인이 된 후에도 단원 폭행으로 벌금형, 음주운전으로 면허취소 전력이 있다. 사람엔터는 "성인이 된 이후에도 미흡한 판단으로 심려를 끼친 순간들이 있었던 점을 배우 본인은 무겁게 받아들이며 깊이 반성하고 있다"고 밝혔다.'
			},
			{
				type: 'content',
				content: '조진웅은 극단 동녁을 거쳐 2004년 영화 말죽거리 잔혹사로 데뷔한 뒤 독전, 용의자 X, 경관의 피 등 굵직한 작품에 출연하며 충무로 대표 배우로 자리잡았다. 소속사는 "조진웅이 부친의 이름을 예명으로 사용한 것은 과거를 감추기 위한 목적이 아니라 스스로 다짐하며 더 나은 사람이 되고자 한 결심에서 비롯됐다"며 "피해를 입은 모든 분들과 실망한 팬들께 진심으로 사과드린다"고 전했다.'
			}
		],
		source: '매일경제',
		category: '핫이슈',
		publishedAt: '2025-12-05T22:01:51+09:00',
		url: 'https://www.mk.co.kr/news/hot-issues/11485576'
	},
	{
		id: 'sg-11485396',
		type: 'shortgeul',
		title: '최태원 "AI 3강 되려면 데이터센터에 1400조 투자를"',
		pages: [
			{
				type: 'cover',
				title: '최태원 "AI 3강 되려면 데이터센터에 1400조 투자를"',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg'
			},
			{
				type: 'summary',
				summary: '최태원은 AI 분야 성장을 위해 1400조를 데이터센터에 투자해야 한다고 주장했다.\n한국의 AI 경쟁력 강화와 저성장 극복을 위해 7년간 매년 200조를 투입해야 한다고 강조했다.\nAI 분야에서 한국의 경쟁력 강화가 필수적이며, AI 생태계 구축과 전문인력 육성이 중요하다고 강조했다.\n최태원은 미국과 중국에 이어 AI 분야에서 3강이 되려면 20GW의 데이터센터를 7년 안에 구축해야 한다고 밝혔다.'
			},
			{
				type: 'content',
				content: '이창용 한국은행 총재와 최태원 대한상의 회장이 5일 AI 대전환과 성장 생태계를 주제로 특별대담을 가졌다. 최 회장은 "AI 경쟁은 국가대항전이 아니다. 한국의 AI가 별로 좋아 보이지 않는다"며 "글로벌 경쟁에서 민간이 주도권을 잃지 않도록 지원하는 것이 국가의 역할"이라고 강조했다. 그는 AI 발전은 기존 기업이 아닌 영 매니지먼트가 이끌 것이라 내다봤다.'
			},
			{
				type: 'content',
				content: '최 회장은 "경쟁에 제대로 뛰어들려면 20GW 규모의 AI 데이터센터를 7년 안에 구축해야 한다"며 "1GW에 70조원이니 총 1400조원이 필요하고, 매년 200조원 정도는 투입해야 한다"고 밝혔다. 그는 "대한민국의 잠재 성장률이 0%대로 떨어지고 5년 후 마이너스가 될 상황"이라며 "경제를 견인하지 못하면 70년간 이뤄온 성장의 신화가 소멸될 가능성이 있다"고 경고했다.'
			},
			{
				type: 'content',
				content: '최 회장은 우리나라 AI 발전을 위해 매력적인 회사들이 다수 나와야 한다고 강조했다. "한국의 AI를 더 매력적으로 만들어 국내외 자본을 끌어와야 한다"며 "매력적인 AI 회사가 얼마나 나타날 수 있느냐가 관건"이라고 말했다. 이창용 총재가 AI 버블을 언급하자 최 회장은 "산업 분야는 버블이 아니지만 주식시장은 오버슈팅이 어느 정도 있다"고 진단했다. 스테이블코인 논의에선 한은이 은행 중심 도입을 검토 중임을 밝혔다.'
			}
		],
		source: '매일경제',
		category: '경제',
		publishedAt: '2025-12-05T17:21:04+09:00',
		url: 'https://www.mk.co.kr/news/economy/11485396'
	},
	{
		id: 'sg-11485596',
		type: 'shortgeul',
		title: '대만방어 최우선, 한국 국방지출 늘려야…트럼프 행정부 새 국가안보전략',
		pages: [
			{
				type: 'cover',
				title: '대만방어 최우선, 한국 국방지출 늘려야',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg'
			},
			{
				type: 'summary',
				summary: '트럼프 행정부, 대만 방어를 최우선 과제로 꼽고 새 국가안보전략 발표\nNSS는 대만 분쟁 억제와 한국의 역할 강조\n미국은 동맹국에 국방지출 증가 촉구하며 제1도련선 방어 강화 요구\n한일에 국방비 증액을 요구하며 중국 견제 강조\n대만 정책 유지, 서태평양 주둔 강화 및 미국 우선주의 강조\n미국의 동맹국 방위 분담 촉구 및 경제 불균형 규탄\n한국은 3회 언급, 북한은 언급 없음.'
			},
			{
				type: 'content',
				content: '트럼프 행정부가 대만 방어를 인도·태평양 안보의 최우선 과제로 삼는 새 국가안보전략(NSS)을 발표했다. 백악관은 5일 트럼프 2기 행정부의 외교·경제·군사 종합 전략 지침을 공개했다. 새 NSS는 "군사적 우위를 유지해 대만 분쟁을 억제하는 것이 최우선"이라며 "제1 도련선 어디서든 침략을 저지할 수 있는 군대를 구축할 것"이라고 밝혔다. 2022년 이후 3년 만의 안보전략 지침서다.'
			},
			{
				type: 'content',
				content: 'NSS는 "미국은 이를 단독으로 수행할 수 없다"며 "동맹은 국방지출을 늘리고 집단 방어를 위해 훨씬 더 많은 일을 해야 한다"고 강조했다. 특히 "제1도련선 내 동맹국들에게 미국 시설 접근권 확대, 자체 방위 지출 증액, 침략 억제 역량 강화에 투자하도록 촉구한다"고 밝혔다. 제1도련선에는 한국이 포함되어 트럼프 행정부가 대만 방어를 위한 한국의 역할 강화를 지속 요구할 것으로 예상된다.'
			},
			{
				type: 'content',
				content: 'NSS는 "트럼프 대통령이 일본과 한국의 비용 분담 증가를 강력히 요구한다"며 "이들 국가가 적국 억제와 제1도련선 방어에 필요한 역량에 초점을 맞춰 국방 지출을 늘려야 한다"고 강조했다. 이는 한일 국방비 증액 요구가 중국의 대만 침공 억제를 위한 견제와 무관하지 않다는 해석이 나온다. 트럼프 행정부는 "미국 우선주의에 기반해 동맹국의 무임승차를 용납하지 않겠다"며 전 세계 동맹국들에 방위 분담을 촉구했다.'
			}
		],
		source: '매일경제',
		category: '정치',
		publishedAt: '2025-12-05T23:08:05+09:00',
		url: 'https://www.mk.co.kr/news/politics/11485596'
	}
];

// 숏툰 (Comic) 데이터 - 8개
export const MOCK_SHORTTOON_DATA = [
	{
		id: 'st-11485397',
		type: 'shorttoon',
		title: 'AI 인재 대탈출',
		pages: [
			{
				type: 'comic',
				image: '/DB/image/AI_wages_1.png',
				caption: '한국 AI 인재들이 해외로 떠나고 있다'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_wages_2.png',
				caption: '미국은 25% 임금 프리미엄, 한국은 겨우 6%'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_wages_3.png',
				caption: '1만1000명이 넘는 인재가 해외로'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_wages_4.png',
				caption: '미국 6300명, 캐나다, 싱가포르로 이동'
			}
		],
		source: '매일경제',
		category: '경제',
		publishedAt: '2025-12-05T17:21:04+09:00',
		url: 'https://www.mk.co.kr/news/economy/11485397'
	},
	{
		id: 'st-11485490',
		type: 'shorttoon',
		title: '초인공지능 ASI의 시대',
		pages: [
			{
				type: 'comic',
				image: '/DB/image/ASI_1.png',
				caption: '손정의 회장이 한국을 방문했다'
			},
			{
				type: 'comic',
				image: '/DB/image/ASI_2.png',
				caption: '"ASI는 인간 두뇌의 1만배!"'
			},
			{
				type: 'comic',
				image: '/DB/image/ASI_3.png',
				caption: '이재명 대통령: AI를 상하수도처럼'
			},
			{
				type: 'comic',
				image: '/DB/image/ASI_4.png',
				caption: 'Arm스쿨로 1400명 인재 양성'
			}
		],
		source: '매일경제',
		category: '정치',
		publishedAt: '2025-12-05T18:09:10+09:00',
		url: 'https://www.mk.co.kr/news/politics/11485490'
	},
	{
		id: 'st-11485059',
		type: 'shorttoon',
		title: 'AWS 그래비톤5의 혁신',
		pages: [
			{
				type: 'comic',
				image: '/DB/image/AWS_1.png',
				caption: 'AWS가 차세대 칩을 공개했다'
			},
			{
				type: 'comic',
				image: '/DB/image/AWS_2.png',
				caption: '성능 25% 향상!'
			},
			{
				type: 'comic',
				image: '/DB/image/AWS_3.png',
				caption: '192개 코어로 지연 33% 감소'
			},
			{
				type: 'comic',
				image: '/DB/image/AWS_4.png',
				caption: '글로벌 기업들이 잇따라 도입'
			}
		],
		source: '매일경제',
		category: 'IT',
		publishedAt: '2025-12-05T13:37:51+09:00',
		url: 'https://www.mk.co.kr/news/it/11485059'
	},
	{
		id: 'st-11485458',
		type: 'shorttoon',
		title: '테크 거물들의 AI 전쟁',
		pages: [
			{
				type: 'comic',
				image: '/DB/image/AI_Leader_1.png',
				caption: '젠슨 황: 원전이 답이다!'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_Leader_2.png',
				caption: '저커버그: 메타버스는 이제 그만'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_Leader_3.png',
				caption: '머스크: 휴머노이드 로봇이 미래'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_Leader_4.png',
				caption: '세 거물의 AI 전략이 엇갈린다'
			}
		],
		source: '매일경제',
		category: 'IT',
		publishedAt: '2025-12-05T17:32:29+09:00',
		url: 'https://www.mk.co.kr/news/it/11485458'
	},
	{
		id: 'st-11485582',
		type: 'shorttoon',
		title: '넷플릭스의 대형 인수',
		pages: [
			{
				type: 'comic',
				image: '/DB/image/Netflix_1.png',
				caption: '넷플릭스가 큰 결정을 내렸다'
			},
			{
				type: 'comic',
				image: '/DB/image/Netflix_2.png',
				caption: '워너브러더스를 122조원에 인수!'
			},
			{
				type: 'comic',
				image: '/DB/image/Netflix_3.png',
				caption: '해리포터, 배트맨, DC까지 모두 넷플릭스로'
			},
			{
				type: 'comic',
				image: '/DB/image/Netflix_4.png',
				caption: '스트리밍 시장의 새로운 거인 탄생'
			}
		],
		source: '매일경제',
		category: '국제',
		publishedAt: '2025-12-05T22:23:47+09:00',
		url: 'https://www.mk.co.kr/news/world/11485582'
	},
	{
		id: 'st-11485576',
		type: 'shorttoon',
		title: '충무로 스타의 과거',
		pages: [
			{
				type: 'comic',
				image: '/DB/image/Act_1.png',
				caption: '조진웅, 과거를 고백하다'
			},
			{
				type: 'comic',
				image: '/DB/image/Act_2.png',
				caption: '"미성년 시절 잘못이 있었습니다"'
			},
			{
				type: 'comic',
				image: '/DB/image/Act_3.png',
				caption: '30년 전 일, 법적으로는 종결'
			},
			{
				type: 'comic',
				image: '/DB/image/Act_4.png',
				caption: '충무로 대표 배우의 사과와 반성'
			}
		],
		source: '매일경제',
		category: '핫이슈',
		publishedAt: '2025-12-05T22:01:51+09:00',
		url: 'https://www.mk.co.kr/news/hot-issues/11485576'
	},
	{
		id: 'st-11485396',
		type: 'shorttoon',
		title: '한국 AI의 미래',
		pages: [
			{
				type: 'comic',
				image: '/DB/image/AI_Korea_1.png',
				caption: '최태원 회장이 경고했다'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_Korea_2.png',
				caption: '"데이터센터에 1400조 투자 필요"'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_Korea_3.png',
				caption: '7년간 매년 200조원씩'
			},
			{
				type: 'comic',
				image: '/DB/image/AI_Korea_4.png',
				caption: '"남은 시간은 5년뿐"'
			}
		],
		source: '매일경제',
		category: '경제',
		publishedAt: '2025-12-05T17:21:04+09:00',
		url: 'https://www.mk.co.kr/news/economy/11485396'
	},
	{
		id: 'st-11485596',
		type: 'shorttoon',
		title: '트럼프의 새 전략',
		pages: [
			{
				type: 'comic',
				image: '/DB/image/NSS_1.png',
				caption: '트럼프가 새 안보전략을 발표했다'
			},
			{
				type: 'comic',
				image: '/DB/image/NSS_2.png',
				caption: '"대만 방어가 최우선!"'
			},
			{
				type: 'comic',
				image: '/DB/image/NSS_3.png',
				caption: '한국에게도 국방비 증액 요구'
			},
			{
				type: 'comic',
				image: '/DB/image/NSS_4.png',
				caption: '제1도련선 방어 강화'
			}
		],
		source: '매일경제',
		category: '정치',
		publishedAt: '2025-12-05T23:08:05+09:00',
		url: 'https://www.mk.co.kr/news/politics/11485596'
	}
];

// ============================================================
// 통합 데이터 구조 (Integrated Structure)
// 각 항목은 같은 뉴스에 대한 shortgeul과 shorttoon을 모두 포함
// ============================================================

export const MOCK_SHORTFORM_DATA = MOCK_SHORTGEUL_DATA.map((shortgeul, index) => {
	// 같은 뉴스 ID를 가진 shorttoon 찾기
	const newsId = shortgeul.id.replace('sg-', '');
	const shorttoon = MOCK_SHORTTOON_DATA.find(st => st.id === `st-${newsId}`);

	return {
		id: `sf-${newsId}`,
		newsId: newsId,
		shortgeul: shortgeul,
		shorttoon: shorttoon || {
			// shorttoon이 없으면 기본 구조 제공
			id: `st-${newsId}`,
			type: 'shorttoon',
			title: shortgeul.title,
			pages: [
				{
					type: 'comic',
					image: shortgeul.pages[0]?.image || 'gradient-1',
					caption: shortgeul.title
				}
			],
			source: shortgeul.source,
			category: shortgeul.category,
			publishedAt: shortgeul.publishedAt,
			url: shortgeul.url
		},
		source: shortgeul.source,
		category: shortgeul.category,
		publishedAt: shortgeul.publishedAt,
		url: shortgeul.url
	};
});

// NewsFeedGrid에서 넘어온 기사를 ShortForm 형식으로 변환
export function convertToShortForm(article) {
	return {
		id: `converted-${article.id}`,
		type: 'shortgeul',
		title: article.title,
		pages: [
			{
				type: 'cover',
				title: article.title,
				image: article.pages?.[0]?.image || article.urlToImage || article.image_url
			},
			{
				type: 'summary',
				summary: article.summary || article.description || `${article.title}에 대한 요약 내용입니다.`
			},
			{
				type: 'content',
				content: '뉴스의 핵심 내용을 소개합니다. 최근 이 분야에서 중요한 변화가 일어나고 있습니다.'
			},
			{
				type: 'content',
				content: '전문가들의 분석과 향후 전망을 살펴봅니다. 이번 사건이 미칠 영향을 분석해봅니다.'
			},
			{
				type: 'content',
				content: '앞으로 어떤 변화가 예상되는지 알아봅니다. 관련 업계와 시장의 반응을 살펴봅니다.'
			}
		],
		source: article.source?.name || article.source || '매일경제',
		category: article.category,
		publishedAt: article.publishedAt || new Date().toISOString(),
		url: article.url
	};
}
