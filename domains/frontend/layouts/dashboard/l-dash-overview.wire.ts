import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '19% 1fr',
  rows: '10% 1fr',
  areas: ['side top', 'side main'],
  boxes: {
    side: { label: '悬浮侧栏', kind: 'nav' },
    top: '顶栏',
    main: {
      acc: true,
      inner: {
        cols: '1fr 1fr 1fr 1fr',
        rows: '10% 19% 12% 1fr 1fr',
        areas: ['per per per per', 'k1 k2 k3 k4', 'st st st st', 'nt tr tr tr', 'p1 p1 p2 p2'],
        boxes: {
          per: { label: '统计周期', kind: 'segment' },
          k1: '指标',
          k2: '指标',
          k3: '指标',
          k4: '指标',
          st: '次级指标条',
          nt: '公告',
          tr: { label: '订单趋势', text: '订单趋势' },
          p1: { label: '热门排行', kind: 'table' },
          p2: { label: '明细', kind: 'list' },
        },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr 1fr',
  rows: 'auto auto 16% 16% auto 1fr',
  areas: ['top top', 'per per', 'k1 k2', 'k3 k4', 'st st', 'tr tr'],
  boxes: {
    top: { label: '顶栏 ☰', text: '概览' },
    per: { label: '周期', kind: 'segment' },
    k1: '指标',
    k2: '指标',
    k3: '指标',
    k4: '指标',
    st: '次级指标条',
    tr: { label: '订单趋势', text: '订单趋势' },
  },
};
