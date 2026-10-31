import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '88px 1fr',
  rows: '13% 1fr',
  areas: ['rail top', 'rail main'],
  boxes: {
    rail: { label: '图标轨', dark: true },
    top: '顶栏',
    main: { inner: { cols: '12% 1fr 12%', rows: '1fr', areas: ['. c .'], boxes: { c: '内容（限宽居中）' } } },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '11% 1fr 14%',
  areas: ['top', 'main', 'tab'],
  boxes: { top: { label: '标题', kind: 'mtop', text: '首页' }, main: '内容', tab: { label: '底部标签栏', acc: true } },
};
