import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 40% 1fr',
  rows: '1fr auto auto auto 1fr',
  areas: ['. . .', '. logo .', '. card .', '. ft .', '. . .'],
  boxes: {
    logo: { label: 'Logo', center: true },
    card: {
      card: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto',
        areas: ['t', 'f1', 'f2', 'btn', 'alt'],
        boxes: {
          t: { label: '标题', text: '欢迎回来' },
          f1: { label: '账号', kind: 'input' },
          f2: { label: '密码', kind: 'input' },
          btn: { label: '登录', acc: true, kind: 'button' },
          alt: '第三方',
        },
      },
    },
    ft: { label: '注册入口', kind: 'link' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '16% 11% 13% 13% 13% 1fr 10%',
  areas: ['logo', 't', 'f1', 'f2', 'btn', '.', 'alt'],
  boxes: {
    logo: 'Logo',
    t: { label: '标题', text: '欢迎回来' },
    f1: { label: '账号', kind: 'input' },
    f2: { label: '密码', kind: 'input' },
    btn: { label: '登录', acc: true, kind: 'button' },
    alt: { label: '注册', kind: 'link' },
  },
};
