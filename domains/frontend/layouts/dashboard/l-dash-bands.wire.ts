import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr',
  rows: '20% 36% 1fr',
  areas: ['k', 'ch', 'tb'],
  boxes: {
    k: {
      inner: {
        cols: '1fr 1fr 1fr 1fr',
        rows: '1fr',
        areas: ['a b c d'],
        boxes: { a: '数字', b: '数字', c: '数字', d: '数字' },
      },
    },
    ch: {
      inner: { cols: '2fr 1fr', rows: '1fr', areas: ['a b'], boxes: { a: { label: '趋势图', acc: true }, b: '分布' } },
    },
    tb: '明细列表',
  },
};
export const wireMobile: Wire = {
  cols: '1fr 1fr',
  rows: 'auto 13% 13% 30% 1fr',
  areas: ['top top', 'a b', 'c d', 'ch ch', 'tb tb'],
  boxes: {
    top: { label: '顶栏 ☰', text: '经营概览' },
    a: '数字',
    b: '数字',
    c: '数字',
    d: '数字',
    ch: { label: '趋势图', acc: true },
    tb: '明细',
  },
};
