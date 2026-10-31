import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '23% 1fr',
  rows: '1fr',
  areas: ['nav main'],
  boxes: {
    nav: '设置分类',
    main: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto 1fr',
        areas: ['f1', 'f2', 'dz', '.'],
        boxes: {
          f1: { label: '分组卡片（标题 + 说明 + 字段）', kind: 'form', acc: true, text: '工作区信息' },
          f2: { label: '分组卡片（开关行）', kind: 'switches', acc: true, text: '通知' },
          dz: '危险操作',
        },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto auto 1fr',
  areas: ['nav', 'tabs', 'f1', 'f2', 'dz', '.'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '设置' },
    tabs: { label: '设置分类横滑', kind: 'tabs' },
    f1: { label: '分组卡片', kind: 'form', acc: true, text: '工作区信息' },
    f2: { label: '分组卡片（开关行）', kind: 'switches', acc: true, text: '通知' },
    dz: '危险操作',
  },
};
