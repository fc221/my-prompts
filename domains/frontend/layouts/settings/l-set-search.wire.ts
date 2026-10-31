import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '22% 1fr',
  rows: 'auto 1fr',
  areas: ['tree top', 'tree list'],
  boxes: {
    tree: { label: '设置分组树', kind: 'toc' },
    top: {
      inner: {
        cols: '1fr 200px',
        rows: '1fr',
        areas: ['s g'],
        boxes: {
          s: { label: '搜索', kind: 'search', text: '搜索设置项、说明或参数名' },
          g: { label: '只看已修改', kind: 'segment' },
        },
      },
    },
    list: { label: '设置项（改过的有标记）', kind: 'setrows', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto 1fr',
  areas: ['nav', 's', 'g', 'list'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '高级设置' },
    s: { label: '搜索', kind: 'search', text: '搜索设置项' },
    g: { label: '只看已修改', kind: 'segment' },
    list: { label: '设置项', kind: 'setrows', acc: true },
  },
};
