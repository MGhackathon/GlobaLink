// Mock data for ShortForm page
// 실제 크롤링된 매일경제 뉴스 데이터 사용 (links_summary_20251206_035026.json)

// 숏글 (Card News) 데이터 - 9개 (실제 8개 + 광고 1개)
export const MOCK_SHORTGEUL_DATA = [
	{
		id: 'sg-11485397',
		type: 'shortgeul',
		title: 'AI인재 처우 주요국 꼴찌수준… 1만1000명 해외로 떠났다',
		summary: '한국 AI 인재 1만1000명 해외로 이탈\n임금 프리미엄 미국 25%에 비해 한국 6%\n패턴인식, 뇌과학 등에서 높은 임금\n딥러닝, 머신러닝은 낮음',
		pages: [
			{
				type: 'cover',
				title: 'AI인재 처우 주요국 꼴찌수준… 1만1000명 해외로 떠났다',
				summary: '한국 AI 인재 1만1000명 해외로 이탈. 임금 프리미엄 미국 25%에 비해 한국 6%',
				source: '매일경제',
				publishedAt: '2025-12-05T17:21:04+09:00',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01110102000004_L00.jpg'
			},
			{
				type: 'content',
				content: '인공지능(AI) 붐으로 세계 각국이 인재 유치 경쟁에 나선 가운데 국외에서 근무하는 한국의 AI 인력이 1만명을 넘어섰습니다.',
				caption: '현황',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01110102000004_L00.jpg'
			},
			{
				type: 'content',
				content: '국내 AI 인력이 받는 임금 프리미엄은 6%로 미국(25%), 캐나다(18%), 영국·프랑스·호주(15%)에 비해 크게 낮습니다.',
				caption: '임금 비교',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01110102000004_L00.jpg'
			},
			{
				type: 'content',
				content: '해외 근무 국가 중에서는 미국이 6300여 명으로 가장 많았으며, 캐나다와 싱가포르 등이 뒤를 이었습니다.',
				caption: '인재 유출',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01110102000004_L00.jpg'
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
		summary: '손정의 소프트뱅크 회장과 이재명 대통령이 AI 협력 논의\n손 회장은 ASI 개념 강조, 인간 두뇌의 1만배 뛰어난 초인공지능으로 AI 발전 주장',
		pages: [
			{
				type: 'cover',
				title: 'AI 넘어 ASI 가리킨 손정의…이재명 대통령과 70분간 협력논의',
				summary: '손정의 회장이 이재명 대통령과 만나 초인공지능(ASI) 시대를 강조했습니다',
				source: '매일경제',
				publishedAt: '2025-12-05T18:09:10+09:00',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.5e5a70c5b4c34ccaa3800383e6206c39_R.jpg'
			},
			{
				type: 'content',
				content: '손정의 회장은 "인간의 두뇌보다 1만배 더 뛰어난 초인공지능(ASI)이 다음번에 임박한 기술"이라고 강조했습니다.',
				caption: 'ASI 시대',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.5e5a70c5b4c34ccaa3800383e6206c39_R.jpg'
			},
			{
				type: 'content',
				content: '이재명 대통령은 "AI를 상수도·하수도·도로처럼 모든 국민이 함께 누리는 인프라로 활용하겠다"고 밝혔습니다.',
				caption: 'AI 기본사회',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.5e5a70c5b4c34ccaa3800383e6206c39_R.jpg'
			},
			{
				type: 'content',
				content: '소프트뱅크의 Arm이 한국에 암스쿨을 설치하고 향후 5년간 1400명의 반도체 설계 인력을 양성하기로 했습니다.',
				caption: '협력 합의',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.5e5a70c5b4c34ccaa3800383e6206c39_R.jpg'
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
		summary: 'AWS가 그래비톤5 CPU를 공개했다.\n이번 CPU는 성능이 25% 향상되었으며 에너지 효율성도 뛰어나다.\nEC2 M9g 인스턴스는 192개 코어를 담아 데이터 처리 속도가 향상',
		pages: [
			{
				type: 'cover',
				title: 'AWS, 차세대 컴퓨팅칩 그래비톤5 공개',
				summary: '성능 25% 향상, 에너지 효율성 극대화',
				source: '매일경제',
				publishedAt: '2025-12-05T13:37:51+09:00',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.ea5d1370fe9a49c097ffc1dc01e6952d_R.jpg'
			},
			{
				type: 'content',
				content: '그래비톤5는 이전 세대 대비 최대 25% 향상된 컴퓨팅 성능을 제공하면서도 뛰어난 에너지 효율성을 유지합니다.',
				caption: '성능 개선',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.ea5d1370fe9a49c097ffc1dc01e6952d_R.jpg'
			},
			{
				type: 'content',
				content: 'EC2 M9g 인스턴스는 한 패키지에 무려 192개 코어가 들어가 있어, 통신 지연이 최대 33% 줄어듭니다.',
				caption: '기술 혁신',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.ea5d1370fe9a49c097ffc1dc01e6952d_R.jpg'
			},
			{
				type: 'content',
				content: '어도비는 탄소 배출량 37% 감소, 포뮬러 원은 시뮬레이션 속도 40% 향상, SAP는 성능 35% 개선 효과를 확인했습니다.',
				caption: '도입 효과',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.ea5d1370fe9a49c097ffc1dc01e6952d_R.jpg'
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
		summary: '젠슨 황 엔비디아 CEO는 소형 원전으로 AI 연산 병목 해소를 제안\n저커버그 메타 CEO는 메타버스에서 AI 중심 전략으로 전환\n머스크 테슬라 CEO는 피지컬 AI로 휴머노이드 로봇 개발에 집중',
		pages: [
			{
				type: 'cover',
				title: '테크리더의 3인3색 AI 전략',
				summary: '젠슨 황, 저커버그, 머스크가 제시하는 AI 시대 생존 전략',
				source: '매일경제',
				publishedAt: '2025-12-05T17:32:29+09:00',
				image: 'https://static.mk.co.kr/facebook_mknews.jpg'
			},
			{
				type: 'content',
				content: '젠슨 황 엔비디아 CEO는 AI 전력난 해소를 위해 소형 원전 확대를 지지했습니다. 향후 6~7년 안에 소형 원전이 데이터센터의 핵심 전력원이 될 것으로 전망했습니다.',
				caption: '전력 솔루션',
				image: 'https://static.mk.co.kr/facebook_mknews.jpg'
			},
			{
				type: 'content',
				content: '마크 저커버그는 메타버스 예산을 최대 30% 감축하고, AI 웨어러블과 스마트 글라스, LLM 라마 기반 서비스에 집중하고 있습니다.',
				caption: '플랫폼 전환',
				image: 'https://static.mk.co.kr/facebook_mknews.jpg'
			},
			{
				type: 'content',
				content: '일론 머스크는 휴머노이드 로봇 옵티머스를 테슬라의 미래로 보고, 피지컬 AI 개발에 속도를 내고 있습니다.',
				caption: '하드웨어 혁신',
				image: 'https://static.mk.co.kr/facebook_mknews.jpg'
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
		summary: '광고가 표시될 위치입니다',
		pages: [
			{
				type: 'cover',
				title: '광고',
				summary: '여기에 광고가 표시됩니다',
				source: 'GlobaLink AD',
				publishedAt: new Date().toISOString()
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
		summary: '넷플릭스가 122조원에 워너브러더스 디스커버리 인수 합의\n할리우드 역사상 최대 M&A로 세계 엔터업계 변동\nDC 코믹스, 왕좌의 게임 등 인기 IP 확보',
		pages: [
			{
				type: 'cover',
				title: '넷플릭스, 122조원에 워너브러더스 품었다',
				summary: '할리우드 역사상 최대 규모 인수합병',
				source: '매일경제',
				publishedAt: '2025-12-05T22:23:47+09:00',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg'
			},
			{
				type: 'content',
				content: '넷플릭스가 워너브러더스 디스커버리의 스튜디오와 스트리밍 사업을 827억달러(약 122조원)에 인수하기로 합의했습니다.',
				caption: '거래 규모',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg'
			},
			{
				type: 'content',
				content: 'DC 코믹스(슈퍼맨, 배트맨), 해리포터, 왕좌의 게임 등 인기 IP를 확보하게 되었습니다.',
				caption: '확보 자산',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg'
			},
			{
				type: 'content',
				content: '넷플릭스의 시장 지배력이 더욱 강화되며, 유튜브·틱톡과의 경쟁에서 우위를 점할 것으로 전망됩니다.',
				caption: '시장 영향',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg'
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
		summary: '조진웅, 미성년 시절 잘못 인정\n소년범 의혹은 인정, 성폭행 부인\n30년 전 사건, 법적 종결\n충무로 대표 배우로 활약',
		pages: [
			{
				type: 'cover',
				title: '조진웅, 소년범 인정·성폭행 부인',
				summary: '배우 조진웅이 미성년 시절 잘못을 인정하며 공식 사과',
				source: '매일경제',
				publishedAt: '2025-12-05T22:01:51+09:00',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg'
			},
			{
				type: 'content',
				content: '사람엔터테인먼트는 "미성년 시절 잘못했던 행동이 있었다"고 인정했지만, "성폭행 관련 행위와는 무관하다"고 선을 그었습니다.',
				caption: '공식 입장',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg'
			},
			{
				type: 'content',
				content: '30년 이상 지난 사건이라 경위를 완전히 파악하기 어렵고, 법적 절차도 이미 종결된 상태라고 설명했습니다.',
				caption: '사건 경위',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg'
			},
			{
				type: 'content',
				content: '조진웅은 말죽거리 잔혹사, 독전, 용의자 X, 경관의 피 등 여러 작품에서 활약해 충무로 대표 배우로 자리잡았습니다.',
				caption: '배우 경력',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg'
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
		summary: '최태원은 AI 분야 성장을 위해 1400조를 데이터센터에 투자해야 한다고 주장\n한국의 AI 경쟁력 강화와 저성장 극복을 위해 7년간 매년 200조 투입',
		pages: [
			{
				type: 'cover',
				title: '최태원 "AI 3강 되려면 데이터센터에 1400조 투자를"',
				summary: '한국은행·대한상의 AI 특별대담에서 밝혀',
				source: '매일경제',
				publishedAt: '2025-12-05T17:21:04+09:00',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg'
			},
			{
				type: 'content',
				content: '최태원 회장은 "경쟁에 제대로 뛰어들려면 20GW 정도의 AI 데이터센터를 7년 안에 만들어야 한다"고 강조했습니다.',
				caption: '투자 규모',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg'
			},
			{
				type: 'content',
				content: '"1GW에 70조원이니 1400조원을 넣어야 되며, 매년 200조원 정도쯤은 투입해야 한다"고 밝혔습니다.',
				caption: '투자 계획',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg'
			},
			{
				type: 'content',
				content: '"대한민국의 잠재 성장률이 0%대로 내려가고 5년 후 마이너스가 될 상황. 남은 시간은 5년"이라고 경고했습니다.',
				caption: '위기 경고',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg'
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
		summary: '트럼프 행정부, 대만 방어를 최우선 과제로 새 국가안보전략 발표\n한국의 역할 강화와 국방지출 증가 촉구\n제1도련선 방어 강조',
		pages: [
			{
				type: 'cover',
				title: '대만방어 최우선, 한국 국방지출 늘려야',
				summary: '트럼프 행정부, 새 국가안보전략(NSS) 발표',
				source: '매일경제',
				publishedAt: '2025-12-05T23:08:05+09:00',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg'
			},
			{
				type: 'content',
				content: '미국은 "대만 분쟁을 억제하는 것이 최우선 과제"라며 제1 도련선 어디에서든 침략을 저지할 수 있는 군대를 구축할 것이라고 밝혔습니다.',
				caption: '대만 방어',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg'
			},
			{
				type: 'content',
				content: '"동맹은 국방지출을 늘리고 집단 방어를 위해 훨씬 더 많은 일을 해야 한다"고 한국을 포함한 동맹국들에게 촉구했습니다.',
				caption: '동맹국 요구',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg'
			},
			{
				type: 'content',
				content: '한일 양국에 대한 국방비 증액 요구가 중국의 대만 침공을 억제하기 위한 대중국 견제와도 관련이 있습니다.',
				caption: '중국 견제',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg'
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
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01110102000004_L00.jpg',
				caption: '한국 AI 인재들이 해외로 떠나고 있다'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01110102000004_L00.jpg',
				caption: '미국은 25% 임금 프리미엄, 한국은 겨우 6%'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01110102000004_L00.jpg',
				caption: '1만1000명이 넘는 인재가 해외로'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01110102000004_L00.jpg',
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
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.5e5a70c5b4c34ccaa3800383e6206c39_R.jpg',
				caption: '손정의 회장이 한국을 방문했다'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.5e5a70c5b4c34ccaa3800383e6206c39_R.jpg',
				caption: '"ASI는 인간 두뇌의 1만배!"'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.5e5a70c5b4c34ccaa3800383e6206c39_R.jpg',
				caption: '이재명 대통령: AI를 상하수도처럼'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.5e5a70c5b4c34ccaa3800383e6206c39_R.jpg',
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
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.ea5d1370fe9a49c097ffc1dc01e6952d_R.jpg',
				caption: 'AWS가 차세대 칩을 공개했다'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.ea5d1370fe9a49c097ffc1dc01e6952d_R.jpg',
				caption: '성능 25% 향상!'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.ea5d1370fe9a49c097ffc1dc01e6952d_R.jpg',
				caption: '192개 코어로 지연 33% 감소'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.ea5d1370fe9a49c097ffc1dc01e6952d_R.jpg',
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
				image: 'https://static.mk.co.kr/facebook_mknews.jpg',
				caption: '젠슨 황: 원전이 답이다!'
			},
			{
				type: 'comic',
				image: 'https://static.mk.co.kr/facebook_mknews.jpg',
				caption: '저커버그: 메타버스는 이제 그만'
			},
			{
				type: 'comic',
				image: 'https://static.mk.co.kr/facebook_mknews.jpg',
				caption: '머스크: 휴머노이드 로봇이 미래'
			},
			{
				type: 'comic',
				image: 'https://static.mk.co.kr/facebook_mknews.jpg',
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
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg',
				caption: '넷플릭스가 큰 결정을 내렸다'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg',
				caption: '워너브러더스를 122조원에 인수!'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg',
				caption: '해리포터, 배트맨, DC까지 모두 넷플릭스로'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01170106000004_M00.jpg',
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
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg',
				caption: '조진웅, 과거를 고백하다'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg',
				caption: '"미성년 시절 잘못이 있었습니다"'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg',
				caption: '30년 전 일, 법적으로는 종결'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.f9be9f52eed247e1b9349a89772dfca3_R.jpeg',
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
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg',
				caption: '최태원 회장이 경고했다'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg',
				caption: '"데이터센터에 1400조 투자 필요"'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg',
				caption: '7년간 매년 200조원씩'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg',
				caption: '"남은 시간은 5년뿐"'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/06/20251206_01160102000002_L00.jpg',
				caption: 'AI 3강이 되기 위한 도전'
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
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg',
				caption: '트럼프가 새 안보전략을 발표했다'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg',
				caption: '"대만 방어가 최우선!"'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg',
				caption: '한국에게도 국방비 증액 요구'
			},
			{
				type: 'comic',
				image: 'https://pimg.mk.co.kr/news/cms/202512/05/news-p.v1.20251205.0f6fc29dff9b4d69b0be5faa8932a17c_R.jpeg',
				caption: '제1도련선 방어 강화'
			}
		],
		source: '매일경제',
		category: '정치',
		publishedAt: '2025-12-05T23:08:05+09:00',
		url: 'https://www.mk.co.kr/news/politics/11485596'
	}
];

// NewsFeedGrid에서 넘어온 기사를 ShortForm 형식으로 변환
export function convertToShortForm(article) {
	return {
		id: `converted-${article.id}`,
		type: 'shortgeul',
		title: article.title,
		summary: article.summary || article.description || `${article.title}에 대한 요약`,
		pages: [
			{
				type: 'cover',
				title: article.title,
				summary: article.summary || article.description || `${article.title}에 대한 요약 내용입니다.`,
				source: article.source?.name || '매일경제',
				publishedAt: article.publishedAt || new Date().toISOString(),
				image: article.urlToImage || article.image_url
			},
			{
				type: 'content',
				content: '뉴스의 핵심 내용을 소개합니다. 최근 이 분야에서 중요한 변화가 일어나고 있습니다.',
				caption: '주요 포인트 1',
				image: article.urlToImage || article.image_url
			},
			{
				type: 'content',
				content: '전문가들의 분석과 향후 전망을 살펴봅니다. 이번 사건이 미칠 영향을 분석해봅니다.',
				caption: '주요 포인트 2',
				image: article.urlToImage || article.image_url
			},
			{
				type: 'content',
				content: '앞으로 어떤 변화가 예상되는지 알아봅니다. 관련 업계와 시장의 반응을 살펴봅니다.',
				caption: '향후 전망',
				image: article.urlToImage || article.image_url
			}
		],
		source: article.source?.name || '매일경제',
		category: article.category,
		publishedAt: article.publishedAt || new Date().toISOString(),
		url: article.url
	};
}
