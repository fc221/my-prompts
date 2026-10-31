import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '7% 1fr 7%',
  rows: '7% 1fr 7%',
  areas: ['. . .', '. cd .', '. . .'],
  boxes: {
    cd: {
      acc: true,
      card: true,
      inner: {
        cols: '1fr 1fr',
        rows: '1fr',
        areas: ['art frm'],
        boxes: {
          art: {
            dark: true,
            inner: {
              cols: '1fr',
              rows: '13% 22% 30% 1fr',
              areas: ['lg', 'hl', 'ft', 'pv'],
              boxes: {
                lg: 'Logo',
                hl: { label: '主标语', kind: 'heading', text: '每一笔订单，都清清楚楚' },
                ft: { label: '卖点 ×3', kind: 'bullets' },
                pv: { label: '终端预览', kind: 'code' },
              },
            },
          },
          frm: {
            inner: {
              cols: '1fr',
              rows: '15% 14% 14% 12% 12% 12% 1fr',
              areas: ['t', 'f1', 'f2', 'cap', 'btn', 'alt', 'reg'],
              boxes: {
                t: { label: '欢迎回来', kind: 'heading' },
                f1: { label: '账号', kind: 'input' },
                f2: { label: '密码', kind: 'input' },
                cap: '人机验证',
                btn: { label: '登录', kind: 'button' },
                alt: '第三方',
                reg: { label: '注册入口', kind: 'link' },
              },
            },
          },
        },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['cd', '.'],
  boxes: {
    cd: {
      acc: true,
      card: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto auto auto auto',
        areas: ['lg', 't', 'f1', 'f2', 'cap', 'btn', 'alt', 'reg'],
        boxes: {
          lg: 'Logo',
          t: { label: '欢迎回来', kind: 'heading' },
          f1: { label: '账号', kind: 'input' },
          f2: { label: '密码', kind: 'input' },
          cap: '验证',
          btn: { label: '登录', kind: 'button' },
          alt: '第三方',
          reg: { label: '注册', kind: 'link' },
        },
      },
    },
  },
};
