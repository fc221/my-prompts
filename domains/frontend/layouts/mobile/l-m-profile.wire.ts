import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 56% 1fr',
  rows: '26% 12% 1fr 1fr',
  areas: ['. head .', '. stats .', '. g1 .', '. g2 .'],
  boxes: {
    head: { label: '头像 昵称', acc: true },
    stats: '关键数据',
    g1: { label: '单元格分组', text: '订单' },
    g2: { label: '单元格分组', text: '账户' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '20% 11% 1fr 1fr 11% 11%',
  areas: ['head', 'stats', 'g1', 'g2', 'out', 'tab'],
  boxes: {
    head: { label: '头像 昵称', acc: true },
    stats: '关键数据',
    g1: { label: '单元格组', text: '订单' },
    g2: { label: '单元格组', text: '账户' },
    out: '退出',
    tab: '标签栏',
  },
};
