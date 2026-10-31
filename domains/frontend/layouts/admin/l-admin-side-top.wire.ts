import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '22% 1fr',
  rows: '14% 1fr',
  areas: ['side top', 'side main'],
  boxes: {
    side: { label: '侧栏导航', dark: true },
    top: '顶栏',
    main: {
      label: '内容区',
      acc: true,
      inner: {
        cols: '1fr 1fr 1fr',
        rows: '24% 1fr',
        areas: ['k1 k2 k3', 'tb tb tb'],
        boxes: { k1: '指标', k2: '指标', k3: '指标', tb: { label: '表格', acc: true } },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['top', 'main'],
  boxes: { top: '顶栏 ☰', main: { label: '内容', acc: true } },
  drawer: { size: '70%', box: { label: '侧栏（左侧抽屉）', dark: true, kind: 'nav' } },
};
