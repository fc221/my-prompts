import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr 1fr',
  rows: '22% 1fr 1fr',
  areas: ['k1 k2 k3 k4', 'c1 c1 c2 c2', 'c3 c3 c3 c4'],
  boxes: {
    k1: { label: '指标', acc: true },
    k2: { label: '指标', acc: true },
    k3: { label: '指标', acc: true },
    k4: { label: '指标', acc: true },
    c1: '趋势图',
    c2: '分布',
    c3: '明细表格',
    c4: { label: '占比图表', text: '客户类型占比' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr 1fr',
  rows: 'auto 16% 16% 1fr 1fr',
  areas: ['top top', 'k1 k2', 'k3 k4', 'c1 c1', 'c2 c2'],
  boxes: {
    top: { label: '顶栏 ☰', text: '经营概览' },
    k1: { label: '指标', acc: true },
    k2: { label: '指标', acc: true },
    k3: { label: '指标', acc: true },
    k4: { label: '指标', acc: true },
    c1: '趋势图',
    c2: '明细表格',
  },
};
