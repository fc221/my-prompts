import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr',
  rows: '13% 1fr 10%',
  areas: ['nav nav', 'txt img', 'nx nx'],
  boxes: {
    nav: {
      inner: {
        cols: '18% 1fr 20%',
        rows: '1fr',
        areas: ['logo links cta'],
        boxes: { logo: 'Logo', links: '导航', cta: '按钮' },
      },
    },
    txt: {
      inner: {
        cols: '1fr',
        rows: '1fr 36% 16% 18% 1fr',
        areas: ['.', 't', 's', 'b', '.'],
        boxes: { t: { label: '大标题', acc: true }, s: '副标题', b: '主次按钮' },
      },
    },
    img: '产品截图',
    nx: { label: '下一节露出', kind: 'heading', text: '为什么团队选择 MyPrompts', center: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '12% 22% 10% 11% 1fr',
  areas: ['nav', 't', 's', 'b', 'img'],
  boxes: { nav: 'Logo ☰', t: { label: '大标题', acc: true }, s: '副标题', b: '按钮', img: '截图' },
};
