import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '22% 1fr 8%',
  rows: '1fr 1fr 1fr 13%',
  areas: ['toc g1 .', 'toc g2 .', '. g3 .', 'bar bar bar'],
  boxes: {
    toc: '锚点目录',
    g1: { label: '分组 1', acc: true, text: '基本信息' },
    g2: { label: '分组 2', acc: true, text: '联系方式' },
    g3: { label: '分组 3', acc: true, text: '结算信息' },
    bar: '吸底操作栏',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto 1fr 1fr auto',
  areas: ['nav', 'toc', 'g1', 'g2', 'bar'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '编辑客户' },
    toc: '目录横条',
    g1: { label: '分组', acc: true, text: '基本信息' },
    g2: { label: '分组', acc: true, text: '联系方式' },
    bar: '操作栏',
  },
};
