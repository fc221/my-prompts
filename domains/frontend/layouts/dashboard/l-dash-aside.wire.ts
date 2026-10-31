import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 30%',
  rows: '24% 1fr 1fr',
  areas: ['k side', 'ch side', 'tb side'],
  boxes: {
    k: { inner: { cols: '1fr 1fr 1fr', rows: '1fr', areas: ['a b c'], boxes: { a: '指标', b: '指标', c: '指标' } } },
    ch: { label: '图表', acc: true },
    tb: { label: '列表', acc: true },
    side: {
      label: '吸顶窄栏',
      inner: {
        cols: '1fr',
        rows: 'auto 1fr',
        areas: ['n', 't'],
        boxes: { n: { label: '公告', kind: 'notice' }, t: { label: '待处理', kind: 'list' } },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto 13% 1fr 1fr',
  areas: ['top', 'sum', 'ch', 'tb'],
  boxes: {
    top: { label: '顶栏 ☰', text: '经营概览' },
    sum: { label: '提醒摘要', kind: 'notice' },
    ch: { label: '图表', acc: true },
    tb: { label: '列表', acc: true },
  },
};
