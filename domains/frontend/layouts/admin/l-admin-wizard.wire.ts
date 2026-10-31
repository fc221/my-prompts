import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '14% 1fr 14%',
  rows: 'auto auto 1fr auto',
  areas: ['st st st', '. body .', '. . .', 'bar bar bar'],
  boxes: {
    st: {
      inner: {
        cols: '1fr 1fr 1fr 1fr',
        rows: '1fr',
        areas: ['s1 s2 s3 s4'],
        boxes: { s1: '1 完成', s2: { label: '2 当前', acc: true }, s3: '3 等待', s4: '4 等待' },
      },
    },
    body: { label: '本步字段', acc: true },
    bar: {
      inner: {
        cols: '1fr 120px 120px',
        rows: '1fr',
        areas: ['. prev next'],
        boxes: { prev: '上一步', next: '下一步' },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto 1fr auto',
  areas: ['nav', 'st', 'body', 'bar'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '新建客户' },
    st: '2 / 4 步',
    body: { label: '本步字段', acc: true },
    bar: '下一步',
  },
};
