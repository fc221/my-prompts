import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr 1fr',
  rows: 'auto auto auto 1fr',
  areas: ['hd hd sr sr', 'c1 c2 c3 c4', 'c5 c6 c7 c8', 'rc rc rc rc'],
  boxes: {
    hd: { label: '页面标题', kind: 'heading', text: '设置' },
    sr: { label: '搜索设置项', kind: 'search', text: '搜索设置项，例如“发货”' },
    c1: { label: '入口卡片', kind: 'catcard', acc: true },
    c2: { label: '入口卡片', kind: 'catcard' },
    c3: { label: '入口卡片', kind: 'catcard' },
    c4: { label: '入口卡片', kind: 'catcard' },
    c5: { label: '入口卡片', kind: 'catcard' },
    c6: { label: '入口卡片', kind: 'catcard' },
    c7: { label: '入口卡片', kind: 'catcard' },
    c8: { label: '入口卡片', kind: 'catcard' },
    rc: { label: '最近修改的设置', kind: 'setrows' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['nav', 'sr', 'g1', 'g2', '.'],
  boxes: {
    nav: { label: '顶栏', kind: 'mtop', text: '设置' },
    sr: { label: '搜索设置项', kind: 'search', text: '搜索设置项' },
    g1: { label: '分组单元格', kind: 'cell', acc: true, text: '常用|应用设置|积分与会员|支付与结算' },
    g2: { label: '分组单元格', kind: 'cell', text: '更多|成员与权限|通知|安全|开放接口' },
  },
};
