import type { BrandItem } from './types';

export const INITIAL_BRANDS: BrandItem[] = [
  {
    id: 'patagonia',
    name: 'Patagonia (巴塔哥尼亚)',
    companyName: 'Patagonia Works / 巴塔哥尼亚贸易（上海）有限公司',
    logoText: 'PTG',
    category: '户外服饰',
    tier: 'S',
    weekendPolicy: 'strict_double',
    weekendPolicyLabel: '极度注重WLB / 拒绝无谓加班',
    overtimeComp: 'rarely_overtime',
    overtimeLabel: '反内卷文化 / 冲浪休假文化',
    summary: '全球劳工友好标杆企业，反对过度消费，严格落实员工带薪休假与双休制度，支持环保与劳工权益。',
    keyProducts: ['抓绒衣', '冲锋衣', '户外双肩包'],
    reasons: [
      '不提倡常态化加班，鼓励员工进行户外与家庭活动',
      '全员依法缴纳法定社会保障并提供额外商业险',
      '透明的供应链劳工权益审计报告（Fair Trade认证）'
    ],
    evidence: [
      {
        id: 'ev-ptg-1',
        date: '2024-05-10',
        type: 'esg_report',
        title: 'Patagonia 年度可持续与劳工环境公开报告',
        summary: '严格执行供应链与自营团队每周标准工作时长，无强迫与无偿超时劳动。'
      }
    ],
    auditStatus: 'official_verified',
    upvotes: 1420,
    boycotts: 12
  },
  {
    id: 'logitech',
    name: 'Logitech (罗技)',
    companyName: '罗技（中国）科技有限公司',
    logoText: 'LOGI',
    category: '数码外设',
    tier: 'A',
    weekendPolicy: 'strict_double',
    weekendPolicyLabel: '外企标准双休 965',
    overtimeComp: 'statutory_paid',
    overtimeLabel: '极少加班 / 规范调休',
    summary: '瑞士老牌电脑外设品牌，国内研发与职能团队以 965 双休著称，工作生活平衡度业界优秀。',
    keyProducts: ['无线鼠标 (MX Master)', '机械键盘', '高清网络摄像头'],
    reasons: [
      '标准周末双休，无大小周',
      '弹性工作制，年假充裕',
      '在 955.WLB 社区及看准网均保持较高满意度评分'
    ],
    evidence: [
      {
        id: 'ev-logi-1',
        date: '2023-11-18',
        type: 'crowdsource',
        title: '955.WLB 开源清单收录企业',
        summary: '罗技中国团队稳定进入外企 WLB 友好榜单，未见重大工时争议。'
      }
    ],
    auditStatus: 'community_verified',
    upvotes: 980,
    boycotts: 18
  },
  {
    id: 'chivers',
    name: '蜂花 (Bee & Flower)',
    companyName: '上海蜂花日用品有限公司',
    logoText: '蜂花',
    category: '个人护理',
    tier: 'A',
    weekendPolicy: 'strict_double',
    weekendPolicyLabel: '老牌国货 / 规范双休',
    overtimeComp: 'statutory_paid',
    overtimeLabel: '依法支付加班费 / 无无效内卷',
    summary: '经典老牌国货日化品牌，生产制造与行政团队严格依循劳动法，很少陷入劳资侵权争议。',
    keyProducts: ['蜂花护发素', '小麦蛋白洗发水', '经典檀香皂'],
    reasons: [
      '工厂与办公室实行常规轮休与标准双休',
      '注重员工稳定度，老员工留存率高',
      '近五年在公开司法文书中未见系统性侵犯劳动者加班费案件'
    ],
    evidence: [
      {
        id: 'ev-fenghua-1',
        date: '2024-02-12',
        type: 'judicial_record',
        title: '中国裁判文书网及劳动仲裁公开数据检索',
        summary: '近三年内无恶意克扣加班费及非法辞退相关败诉执行记录。'
      }
    ],
    auditStatus: 'community_verified',
    upvotes: 2150,
    boycotts: 23
  },
  {
    id: 'decathlon',
    name: 'Decathlon (迪卡侬)',
    companyName: '迪卡侬（上海）体育用品有限公司',
    logoText: '迪卡侬',
    category: '运动器材',
    tier: 'A',
    weekendPolicy: 'strict_double',
    weekendPolicyLabel: '排班规范 / 办公室双休',
    overtimeComp: 'statutory_paid',
    overtimeLabel: '加班按法定倍数核算工时',
    summary: '法国体育用品全产业链品牌，门店排班透明合规，总部职能与供应链团队实行标准双休。',
    keyProducts: ['徒步快干衣', '露营帐篷', '跑步运动鞋', '动感单车'],
    reasons: [
      '打卡工时精确到分钟，超时自动计入工时池或法定加班费',
      '反内卷与运动文化深厚，推崇工作与家庭平衡',
      '五险一金依法全额缴纳'
    ],
    evidence: [
      {
        id: 'ev-dk-1',
        date: '2024-04-15',
        type: 'esg_report',
        title: '迪卡侬全球可持续发展与人力合规白皮书',
        summary: '全职员工严格执行当地最高劳动保护标准，保障法定休息权利。'
      }
    ],
    auditStatus: 'official_verified',
    upvotes: 1830,
    boycotts: 45
  },
  {
    id: 'xingyu',
    name: '常州星宇股份 (车灯及汽车消费品)',
    companyName: '常州星宇车灯股份有限公司',
    logoText: '星宇',
    category: '汽车用品',
    tier: 'C',
    weekendPolicy: 'single',
    weekendPolicyLabel: '高强度单休/大小周及解约争议',
    overtimeComp: 'unpaid',
    overtimeLabel: '超时加班 / 试用期批量劝退风险',
    summary: '汽车照明及配件上市企业，2026 年初因简单生硬批量违规解约数百名应届毕业生引发央视网等主流媒体严肃通报。',
    keyProducts: ['汽车LED大灯模组', '车载透镜', '汽车后视改装配件'],
    alternatives: ['philips-auto', 'osram'],
    reasons: [
      '主流官媒通报：简单粗暴单方面解约百余名刚入职应届生，造成极其恶劣的就业损害',
      '多次被员工及应届生披露工厂常态化单休、试用期KPI压榨',
      '央视网评指出其“算小账违大德，违法成本太低”'
    ],
    evidence: [
      {
        id: 'ev-xy-1',
        date: '2026-03-02',
        type: 'official_punishment',
        title: '央视网评及地方工会联合调查通报',
        summary: '企业违反协商原则，简单粗暴违约解聘应届毕业生，相关责任人停职调查。'
      }
    ],
    auditStatus: 'official_verified',
    upvotes: 35,
    boycotts: 3890
  },
  {
    id: 'philips-auto',
    name: 'Philips Automotive (飞利浦汽车生活)',
    companyName: '亮锐（上海）科技有限公司 / 飞利浦照明',
    logoText: '飞利浦',
    category: '汽车用品',
    tier: 'A',
    weekendPolicy: 'strict_double',
    weekendPolicyLabel: '标准外企双休',
    overtimeComp: 'statutory_paid',
    overtimeLabel: '严格核算加班，少无偿加班',
    summary: '汽车车灯、行车记录仪及车载空气净化器知名品牌，国内实体依循外企工时管理标准。',
    keyProducts: ['极劲光车载LED大灯', '行车记录仪', '车载空气净化器'],
    reasons: [
      '标准周末双休，职能与研发不鼓励非必要加班',
      '全额社保公积金，合规透明',
      '星宇车灯配件的合规良心平替选择'
    ],
    evidence: [
      {
        id: 'ev-philips-1',
        date: '2023-08-10',
        type: 'crowdsource',
        title: '外企工时与职场环境合规收录',
        summary: '国内研发及运营实体保持严格 965 节奏与全额法定福利待遇。'
      }
    ],
    auditStatus: 'community_verified',
    upvotes: 750,
    boycotts: 14
  },
  {
    id: 'pepsi-snacks',
    name: '百事食品 (乐事 Lay\'s / 桂格燕麦)',
    companyName: '百事食品（中国）有限公司',
    logoText: '百事',
    category: '零食饮料',
    tier: 'A',
    weekendPolicy: 'strict_double',
    weekendPolicyLabel: '标准外企工时',
    overtimeComp: 'statutory_paid',
    overtimeLabel: '严格法定加班倍数',
    summary: '跨国休闲零食龙头，旗下拥有乐事、桂格、多力多滋等，国内公司严格执行法定工时与双休政策。',
    keyProducts: ['乐事薯片', '桂格即食燕麦片', '奇多粟米脆'],
    reasons: [
      '总部办公室及供应链管理严格落实周末双休与带薪休假',
      '生产线轮班严格按照劳动综合工时申报与合规打卡',
      '极少发生超时加班费仲裁诉讼'
    ],
    evidence: [
      {
        id: 'ev-pepsi-1',
        date: '2024-01-20',
        type: 'esg_report',
        title: '百事中国企业社会责任与劳工保障白皮书',
        summary: '通过 ISO 45001 认证并严格履行当地劳动工时保障标准。'
      }
    ],
    auditStatus: 'official_verified',
    upvotes: 890,
    boycotts: 31
  },
  {
    id: 'some-overtime-snack',
    name: '某代工烘焙食品 (虚拟对比黑榜)',
    companyName: '某大型烘焙代工食品集团',
    logoText: '某烘焙',
    category: '零食饮料',
    tier: 'C',
    weekendPolicy: 'overtime',
    weekendPolicyLabel: '两班倒 / 旺季月休2天',
    overtimeComp: 'unpaid',
    overtimeLabel: '超长工作时间 / 加班费争议多',
    summary: '知名代工点心品牌，曾因产线工人旺季月休仅2天、隐瞒超时加班费被劳动监察部门公开责令整改。',
    keyProducts: ['夹心吐司', '网红蛋黄酥', '小蛋糕'],
    alternatives: ['pepsi-snacks'],
    reasons: [
      '劳动监察公开通报：严重超过法定延长工时上限',
      '采用综合计算工时但超时部分未按 1.5/2 倍足额兑付'
    ],
    evidence: [
      {
        id: 'ev-snack-1',
        date: '2024-07-09',
        type: 'official_punishment',
        title: '人社部门行政处罚决定书（超时加班违规）',
        summary: '责令限期改正违法延长劳动者工作时间行为，并处行政罚款。'
      }
    ],
    auditStatus: 'official_verified',
    upvotes: 12,
    boycotts: 2450
  }
];

export const CATEGORIES = [
  '全部',
  '数码外设',
  '户外服饰',
  '个人护理',
  '运动器材',
  '零食饮料',
  '汽车用品'
];
