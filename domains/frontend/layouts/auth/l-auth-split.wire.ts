import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '52% 1fr',
  rows: '1fr',
  areas: ['art form'],
  boxes: {
    art: { label: '品牌图 · 价值主张', dark: true },
    form: {
      card: true,
      inner: {
        cols: '12% 1fr 12%',
        rows: '1fr 13% 14% 14% 14% 11% 1fr',
        areas: ['. . .', '. t .', '. f1 .', '. f2 .', '. btn .', '. alt .', '. . .'],
        boxes: {
          t: { label: '标题', text: '欢迎回来' },
          f1: { label: '账号', kind: 'input' },
          f2: { label: '密码', kind: 'input' },
          btn: { label: '登录', acc: true, kind: 'button' },
          alt: { label: '注册', kind: 'link' },
        },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '20% 11% 13% 13% 13% 1fr',
  areas: ['art', 't', 'f1', 'f2', 'btn', '.'],
  boxes: {
    art: { label: '品牌条', dark: true },
    t: { label: '标题', text: '欢迎回来' },
    f1: { label: '账号', kind: 'input' },
    f2: { label: '密码', kind: 'input' },
    btn: { label: '登录', acc: true, kind: 'button' },
  },
};
