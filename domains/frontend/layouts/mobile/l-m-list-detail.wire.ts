import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '6% 1fr 9% 1fr 6%',
  rows: '1fr',
  areas: ['. ls ar dt .'],
  boxes: {
    ls: {
      card: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto 1fr',
        areas: ['t', 'r1', 'r2', 'r3', 'r4', '.'],
        boxes: {
          t: { label: '列表页', kind: 'mtop', text: '订单' },
          r1: '条目',
          r2: { label: '点击', acc: true },
          r3: '条目',
          r4: '条目',
        },
      },
    },
    ar: '→',
    dt: {
      card: true,
      inner: {
        cols: '1fr',
        rows: '13% 30% 1fr 15%',
        areas: ['t', 'img', 'info', 'bar'],
        boxes: {
          t: { label: '‹ 详情', kind: 'mtop', text: '订单详情' },
          img: '大图',
          info: { label: '关键信息', acc: true, kind: 'field' },
          bar: { label: '底部操作栏', kind: 'opbtns' },
        },
      },
    },
  },
};
