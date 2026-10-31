import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '16% 1fr 16%',
  rows: '13% 4% 24% 10% 13% 1fr',
  areas: ['nav nav nav', '. . .', '. t .', '. s .', '. b .', 'img img img'],
  boxes: {
    nav: {
      inner: {
        cols: '18% 1fr 20%',
        rows: '1fr',
        areas: ['logo links cta'],
        boxes: { logo: 'Logo', links: '导航', cta: '按钮' },
      },
    },
    t: { label: '超大标题', acc: true, center: true },
    s: { label: '副标题', center: true },
    b: { label: '主次按钮', center: true },
    img: '产品画面（露出上半）',
  },
};
export const wireMobile: Wire = {
  cols: '6% 1fr 6%',
  rows: '10% 5% 25% 11% 11% 1fr',
  areas: ['nav nav nav', '. . .', '. t .', '. s .', '. b .', 'img img img'],
  boxes: {
    nav: 'Logo ☰',
    t: { label: '大标题', acc: true, center: true },
    s: { label: '副标题', center: true },
    b: { label: '按钮', center: true },
    img: '产品画面',
  },
};
