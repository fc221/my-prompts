import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr',
  rows: '12% 11% 1fr',
  areas: ['top', 'tabs', 'main'],
  boxes: {
    top: '顶栏',
    tabs: { label: '分类标签（全部露出）', acc: true },
    main: {
      inner: {
        cols: '1fr 1fr 1fr',
        rows: '1fr 1fr',
        areas: ['a b c', 'd e f'],
        boxes: { a: '卡片', b: '卡片', c: '卡片', d: '卡片', e: '卡片', f: '卡片' },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '11% 12% 1fr 11%',
  areas: ['top', 'seg', 'main', 'tab'],
  boxes: {
    top: { label: '标题', kind: 'mtop', text: '消息' },
    seg: { label: '分类横滑', acc: true },
    main: '列表',
    tab: '标签栏',
  },
};
