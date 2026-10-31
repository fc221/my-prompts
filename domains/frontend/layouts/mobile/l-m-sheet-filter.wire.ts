import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '26% 1fr',
  rows: '12% 1fr',
  areas: ['side top', 'side list'],
  boxes: { side: { label: '筛选侧栏', acc: true }, top: '已选条件 · 排序', list: '结果列表' },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto 1fr',
  areas: ['top', 'fb', 'list'],
  boxes: { top: '搜索', fb: '筛选 (2)', list: '列表' },
  drawer: { side: 'bottom', size: '62%', box: { label: '底部筛选面板', acc: true }, open: true },
};
