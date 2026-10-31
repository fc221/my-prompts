import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['hero hero hero', 'c1 c2 c3', 'c4 c5 c6', 'faq faq ct', '. . .'],
  boxes: {
    hero: { label: '大搜索区', kind: 'searchhero', acc: true },
    c1: { label: '分类卡片', kind: 'catcard', text: '入门指南|注册、创建工作区、导入数据|18 篇' },
    c2: { label: '分类卡片', kind: 'catcard', text: '订单与发货|批量发货、修改地址、物流|32 篇' },
    c3: { label: '分类卡片', kind: 'catcard', text: '支付与发票|收款账户、退款、电子发票|21 篇' },
    c4: { label: '分类卡片', kind: 'catcard', text: '客户管理|客户分层、标签、回访|15 篇' },
    c5: { label: '分类卡片', kind: 'catcard', text: '账号与安全|成员、权限、登录方式|12 篇' },
    c6: { label: '分类卡片', kind: 'catcard', text: '开放接口|密钥、回调、错误码|26 篇' },
    faq: {
      label: '热门问题',
      kind: 'cell',
      text: '热门问题|如何批量修改收货地址|怎样开具电子发票|导入订单失败怎么办|如何设置发货规则',
    },
    ct: { label: '联系客服', kind: 'cta', text: '没找到答案？|在线客服 · 工作日 9:00–21:00|联系客服' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['hero', 'cats', 'faq', 'ct', '.'],
  boxes: {
    hero: { label: '大搜索区', kind: 'searchhero', acc: true },
    cats: { label: '分类（单元格）', kind: 'cell', text: '问题分类|入门指南|订单与发货|支付与发票|账号与安全' },
    faq: { label: '热门问题', kind: 'cell', text: '热门问题|如何批量修改收货地址|怎样开具电子发票|导入订单失败怎么办' },
    ct: { label: '联系客服', kind: 'cta', text: '没找到答案？|工作日 9:00–21:00|联系客服' },
  },
};
