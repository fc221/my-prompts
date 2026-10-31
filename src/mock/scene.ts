// 示意页面里的示例文案：同一个虚构产品（订单与客户管理），让各布局的缩略页面读起来像真实界面
export const BRAND = 'MyPrompts';

export const NAV = [
  { group: '工作台', items: ['概览', '订单', '客户', '商品', '数据报表'] },
  { group: '系统', items: ['消息', '成员', '设置'] },
];
export const SITE_NAV = ['产品', '解决方案', '价格', '文档', '关于我们'];

export const KPIS = [
  { label: '今日销售额', value: '¥128,430', delta: '+12.4%' },
  { label: '订单数', value: '3,826', delta: '+6.1%' },
  { label: '转化率', value: '4.62%', delta: '-0.3%' },
  { label: '客单价', value: '¥336', delta: '+2.8%' },
  { label: '新增客户', value: '284', delta: '+18' },
  { label: '退款率', value: '1.2%', delta: '-0.4%' },
  { label: '平均响应', value: '1.8s', delta: '-0.2s' },
  { label: '活跃用户', value: '7,315', delta: '+9.6%' },
];

export const TABLE_HEAD = ['订单号', '客户', '金额', '状态', '下单时间'];
export const TABLE_ROWS = [
  ['SO-20931', '林知科技', '¥1,299.00', ['已发货', 'ok'], '10-25 14:32'],
  ['SO-20930', '陈一鸣', '¥356.50', ['待发货', 'warn'], '10-25 13:08'],
  ['SO-20928', '杭州云帆', '¥8,420.00', ['已完成', 'ok'], '10-25 11:46'],
  ['SO-20925', '周以宁', '¥89.00', ['已退款', 'danger'], '10-24 21:15'],
  ['SO-20921', '星河传媒', '¥2,990.00', ['待发货', 'warn'], '10-24 18:02'],
  ['SO-20917', '苏墨', '¥1,128.00', ['已完成', 'ok'], '10-24 09:40'],
  ['SO-20912', '南风咖啡', '¥640.00', ['已发货', 'ok'], '10-23 16:27'],
  ['SO-20909', '许然', '¥215.00', ['已完成', 'ok'], '10-23 10:05'],
] as const;

export const LIST = [
  { name: '林知科技', desc: '续费提醒已发送，等待确认', time: '2 分钟前' },
  { name: '陈一鸣', desc: '申请修改收货地址', time: '18 分钟前' },
  { name: '杭州云帆', desc: '新订单 SO-20928 已付款', time: '1 小时前' },
  { name: '周以宁', desc: '退款已原路退回', time: '3 小时前' },
  { name: '星河传媒', desc: '询问批量采购折扣', time: '昨天' },
  { name: '南风咖啡', desc: '发票信息已更新', time: '昨天' },
  { name: '许然', desc: '完成首次下单', time: '10-23' },
];

export const FORM = [
  { label: '客户名称', value: '林知科技有限公司', req: true },
  { label: '联系电话', value: '0571-8826 3310' },
  { label: '所属行业', value: '软件与信息服务', select: true },
  { label: '客户等级', value: 'A 类（重点客户）', select: true },
  { label: '收货地址', value: '杭州市西湖区文三路 90 号' },
  { label: '备注', value: '每月 5 日前对账', area: true },
];

export const CARDS = [
  { title: '订单自动对账', desc: '每天定时核对支付与发货记录，差异自动标出。' },
  { title: '客户分层运营', desc: '按消费频次和金额分组，推送更合适的权益。' },
  { title: '多仓库存同步', desc: '各渠道库存实时同步，避免超卖。' },
  { title: '经营日报', desc: '每天早上收到昨日关键指标和异常提醒。' },
  { title: '权限与审计', desc: '按角色分配权限，所有操作留痕可查。' },
  { title: '开放接口', desc: '订单、客户、商品数据都能通过接口读写。' },
  { title: '多门店管理', desc: '总部统一查看各门店的订单、库存和业绩。' },
];

export const HERO = {
  eyebrow: '订单与客户管理',
  title: '把每一笔订单，\n都管得明明白白',
  sub: '从下单、发货到对账和复购，一个工作台看清全流程。',
  cta: ['免费试用', '预约演示'],
};

export const STEPS = ['选择套餐', '填写资料', '确认支付', '完成'];
export const TABS = ['基本信息', '订单记录', '跟进动态', '附件'];
export const PLANS = [
  { name: '基础版', price: '¥0', unit: '/月', feats: ['3 位成员', '每月 500 笔订单', '基础报表', '邮件支持'] },
  {
    name: '专业版',
    price: '¥299',
    unit: '/月',
    feats: ['20 位成员', '不限订单', '自动对账', '开放接口', '多仓库存同步', '优先支持'],
  },
  { name: '企业版', price: '定制', unit: '', feats: ['不限成员', '专属部署', '审计日志', '单点登录', '专人服务'] },
];
export const FAQ = [
  '可以免费试用多久？',
  '数据存放在哪里，安全吗？',
  '支持开具发票吗？',
  '可以随时升级或降级套餐吗？',
  '能导入已有的订单数据吗？',
  '支持哪些支付和收款渠道？',
];
export const FOOTER = [
  { title: '产品', links: ['订单管理', '客户管理', '数据报表', '开放接口'] },
  { title: '方案', links: ['零售', '电商', '餐饮', '批发'] },
  { title: '资源', links: ['帮助中心', '更新日志', '接口文档'] },
  { title: '公司', links: ['关于我们', '加入我们', '联系我们'] },
];
export const CHAT = [
  { me: true, text: '帮我总结一下上周的销售情况' },
  {
    me: false,
    text: '上周销售额 ¥86.4 万，环比增长 12.4%。增长主要来自老客户复购（+18%），退款率下降到 1.2%。需要关注：华南区订单量连续 3 天下滑。',
  },
  { me: true, text: '华南区下滑的原因是什么？' },
  {
    me: false,
    text: '主要有两个原因：华南仓 10 月 20 日起物流延迟，平均发货时长从 1.2 天增加到 1.8 天；同时竞品在华南做了满减活动。建议先处理 12 笔超时订单，并给受影响的客户发补偿券。',
  },
];
export const NOTICES = [
  { tag: '重要', text: '10 月 28 日 02:00–04:00 系统升级' },
  { tag: '新功能', text: '订单支持批量修改收货地址' },
  { tag: '提醒', text: '有 12 笔订单超过 48 小时未发货' },
  { tag: '公告', text: '发票抬头支持保存多个模板' },
];
export const KANBAN = [
  { title: '待处理', cards: ['核对 SO-20930 地址', '回复星河传媒报价', '补录 3 笔线下订单'] },
  { title: '进行中', cards: ['十月对账', '客户分层规则调整'] },
  { title: '已完成', cards: ['导出九月报表'] },
];
export const CODE = [
  'curl https://api.example.com/v1/orders \\',
  '  -H "Authorization: Bearer $TOKEN" \\',
  '  -d \'{"status": "paid", "limit": 20}\'',
  '',
  '# 返回',
  '{ "data": [...], "total": 1284 }',
];
export const TIMELINE = ['张敏', '王磊', '李娜', '赵晨', '周以宁', '许然'];
export const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export const MODS = ['工作台', '订单中心', '客户中心', '数据中心', '系统设置'];
export const SETTINGS = ['通用', '成员与权限', '通知', '安全', '账单与发票', '开放接口'];
export const FILTER_NAMES = ['状态', '渠道', '下单时间'];
export const FIELDS = [
  ['订单号', 'SO-20931'],
  ['客户', '林知科技'],
  ['金额', '¥1,299.00'],
  ['支付方式', '微信支付'],
  ['下单时间', '2026-10-25 14:32'],
  ['收货地址', '杭州市西湖区文三路 90 号'],
];
export const ACTIVITY = [
  ['林晓', '标记为已发货', '10-25 14:32'],
  ['系统', '收到付款 ¥1,299.00', '10-25 11:02'],
  ['林知科技', '提交订单', '10-25 10:58'],
  ['王磊', '修改收货地址', '10-24 18:20'],
  ['张敏', '添加备注“月底对账”', '10-24 09:15'],
];
// 设置分组卡片的标题和说明（键是表单字段组 / 开关组的名字）
export const SECTIONS: Record<string, [string, string]> = {
  工作区信息: ['基本信息', '工作区名称、语言和时区，所有成员可见'],
  通知: ['通知', '选择接收哪些提醒，以及通过什么渠道发送'],
  危险操作: ['危险操作', '删除或转移后数据无法恢复，操作前请先导出备份'],
};
export const SWITCHES = [
  ['新订单提醒', '有新订单时通知负责人', true],
  ['发货超时提醒', '超过 48 小时未发货时提醒', true],
  ['每日经营日报', '每天 8:00 推送昨日数据', false],
  ['退款申请提醒', '客户发起退款时立即通知', true],
] as const;
export const TASKS = [
  '核对 SO-20930 收货地址',
  '回复星河传媒报价',
  '补录 3 笔线下订单',
  '十月对账',
  '客户分层规则调整',
  '导出九月报表',
];
export const AGENDA: Record<string, string[][]> = {
  上午: [
    ['09:00', '十月对账', '张敏'],
    ['10:30', '发货排期', '王磊'],
  ],
  下午: [
    ['14:00', '客户回访', '李娜'],
    ['16:30', '经营月报', '赵晨'],
  ],
};
export const COMPARE = [
  ['成员数', '3', '20', '不限'],
  ['每月订单', '500', '不限', '不限'],
  ['自动对账', '—', '✓', '✓'],
  ['开放接口', '—', '✓', '✓'],
  ['专属部署', '—', '—', '✓'],
];
export const LOGOS = ['NORTHWIND', 'Acme', '星河', 'Lumen', '南风', 'Orbit'];
export const SESSIONS = ['十月对账差异分析', '华南区订单下滑原因', '客户分层规则草稿', '发票模板批量修改'];
export const BULLETS = [
  '订单、库存、对账在一个工作台完成',
  '开放接口，5 分钟接入现有系统',
  '数据加密存储，操作全程留痕',
];
export const FACETS = [
  {
    name: '订单状态',
    opts: [
      ['待发货', true],
      ['已发货', false],
      ['已完成', true],
      ['已退款', false],
    ],
  },
  {
    name: '渠道',
    opts: [
      ['小程序', false],
      ['门店', false],
      ['官网', false],
    ],
  },
] as const;
type Field = { label: string; value: string; req?: boolean; select?: boolean; area?: boolean };
export const FORMS: Record<string, Field[]> = {
  基本信息: [
    { label: '客户名称', value: '林知科技有限公司', req: true },
    { label: '所属行业', value: '软件与信息服务', select: true },
    { label: '客户等级', value: 'A 类（重点客户）', select: true },
  ],
  联系方式: [
    { label: '联系人', value: '林晓', req: true },
    { label: '手机号', value: '138 0571 6620' },
    { label: '邮箱', value: 'linxiao@example.com' },
  ],
  结算信息: [
    { label: '结算方式', value: '月结（每月 5 日）', select: true },
    { label: '开票抬头', value: '林知科技有限公司' },
    { label: '税号', value: '91330106MA2H3K7X0R' },
  ],
  工作区信息: [
    { label: '工作区名称', value: 'MyPrompts', req: true },
    { label: '默认语言', value: '简体中文', select: true },
    { label: '时区', value: '(UTC+08:00) 北京', select: true },
    { label: '结算货币', value: '人民币（CNY）', select: true },
  ],
  积分配置: [
    { label: '积分比例（1 元等于多少积分）', value: '10', req: true },
    { label: '积分名称（前台显示的名字）', value: '云豆', req: true },
    { label: '签到奖励（每次）', value: '5', req: true },
  ],
  属性: [
    { label: '标题', value: '十月经营复盘' },
    { label: '负责人', value: '林晓', select: true },
    { label: '状态', value: '草稿', select: true },
    { label: '可见范围', value: '团队成员', select: true },
  ],
};
// 设置页：分类（名称、说明、设置项数）和可搜索的设置项
export const SET_CATS = [
  ['应用设置', '名称、Logo、语言与时区', 8],
  ['积分与会员', '积分比例、签到奖励、会员等级', 6],
  ['支付与结算', '收款账户、结算周期、发票', 7],
  ['成员与权限', '成员、角色和访问范围', 5],
  ['通知', '提醒渠道与接收规则', 9],
  ['安全', '登录方式、操作审计', 6],
  ['开放接口', '密钥、回调地址、调用限额', 4],
  ['数据与备份', '导出、自动备份与清理', 3],
] as const;
export const SET_ROWS = [
  { path: ['订单', '自动确认收货'], desc: '发货后多少天自动确认收货', ctl: 'input', val: '7 天', mod: true },
  { path: ['订单', '超时未付款关闭'], desc: '下单后多久未付款自动关闭订单', ctl: 'select', val: '30 分钟', mod: false },
  { path: ['库存', '库存预警阈值'], desc: '库存低于这个数量时提醒补货', ctl: 'input', val: '20 件', mod: true },
  { path: ['库存', '允许超卖'], desc: '库存为 0 时是否还允许下单', ctl: 'toggle', val: false, mod: false },
  { path: ['通知', '发货短信'], desc: '发货后给客户发送物流短信', ctl: 'toggle', val: true, mod: true },
  { path: ['支付', '退款人工审核'], desc: '超过这个金额的退款需要人工审核', ctl: 'input', val: '¥500', mod: false },
] as const;
// 内容页与电商：搜索结果、商品、订单汇总、新手任务、日程
export const RESULTS = [
  {
    title: '如何批量修改订单的收货地址',
    path: '帮助中心 › 订单与发货',
    snip: '在订单列表勾选多笔订单后，点击“批量操作 › 修改收货地址”，可以一次更新最多 200 笔……',
    tag: '文档',
  },
  {
    title: 'SO-20930 · 陈一鸣 · 待发货',
    path: '订单 › 10-25 13:08',
    snip: '收货地址：杭州市西湖区文三路 90 号，客户申请修改收货地址，等待处理……',
    tag: '订单',
  },
  {
    title: '收货地址模板',
    path: '设置 › 物流与配送',
    snip: '常用收货地址可以存成模板，新建订单时直接选择，减少重复填写……',
    tag: '设置',
  },
  {
    title: '地址解析接口',
    path: '开放接口 › 物流',
    snip: '传入一段完整地址文本，返回省、市、区和详细地址字段，可用于导入订单时自动拆分……',
    tag: '文档',
  },
  {
    title: '林知科技 · 重点客户',
    path: '客户 › 杭州',
    snip: '默认收货地址：杭州市滨江区网商路 699 号，近 30 天下单 12 笔……',
    tag: '客户',
  },
];
export const PRODUCT = {
  name: '手冲咖啡豆 · 云南保山 1kg',
  price: '¥128',
  was: '¥158',
  sold: '已售 2,384',
  rate: '4.9（612 条评价）',
  specs: [
    ['重量', ['500g', '1kg', '2kg'], 1],
    ['研磨', ['不研磨', '手冲粗细', '意式细粉'], 0],
  ] as const,
};
export const CART = [
  ['手冲咖啡豆 · 1kg', '¥128 × 2'],
  ['滤纸 100 张', '¥19 × 1'],
  ['手冲壶 600ml', '¥169 × 1'],
];
export const ONBOARD = [
  ['创建工作区', '设置名称和 Logo', true],
  ['邀请同事', '最多可邀请 3 位成员', true],
  ['导入订单', '从表格或其他系统导入历史订单', false],
  ['接入收款', '绑定收款账户，开始对账', false],
  ['开启经营日报', '每天早上收到昨日数据', false],
] as const;
export const CAL_EVENTS: Record<number, [string, number][]> = {
  3: [['周会', 0]],
  7: [['十月对账', 1]],
  8: [['十月对账', 1]],
  12: [['客户回访', 2]],
  15: [
    ['周会', 0],
    ['发版', 1],
  ],
  20: [['发货排期', 2]],
  22: [['周会', 0]],
  25: [
    ['经营月报', 1],
    ['团建', 2],
  ],
  29: [['周会', 0]],
};
