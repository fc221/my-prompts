import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr',
  rows: 'auto auto 1fr',
  areas: ['. tg .', 'p1 p2 p3', 'cmp cmp cmp'],
  boxes: {
    tg: { label: '月付 / 年付', center: true },
    p1: '基础版',
    p2: { label: '推荐档', acc: true },
    p3: '企业版',
    cmp: '功能对比表',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['tg', 'p2', 'p1', 'p3', '.'],
  boxes: { tg: '月 / 年', p2: { label: '推荐档', acc: true }, p1: '其他档', p3: '其他档' },
};
