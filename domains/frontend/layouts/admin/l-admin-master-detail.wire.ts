import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '34% 1fr',
  rows: '12% 1fr',
  areas: ['flt dh', 'list db'],
  boxes: {
    flt: { label: '筛选 排序', kind: 'fbar' },
    dh: '标题 · 操作',
    list: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto 1fr',
        areas: ['r1', 'r2', 'r3', 'r4', '.'],
        boxes: { r1: '记录', r2: { label: '选中', acc: true }, r3: '记录', r4: '记录' },
      },
    },
    db: { label: '详情（可编辑）', acc: true, kind: 'form' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['top', 'list'],
  boxes: {
    top: { label: '列表页 ☰', kind: 'mtop', text: '订单' },
    list: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto 1fr',
        areas: ['r1', 'r2', 'r3', 'r4', 'r5', '.'],
        boxes: { r1: '记录', r2: { label: '点进详情', acc: true }, r3: '记录', r4: '记录', r5: '记录' },
      },
    },
  },
};
