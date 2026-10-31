import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '21% 1fr 26%',
  rows: '12% 1fr',
  areas: ['bar bar bar', 'left mid right'],
  boxes: {
    bar: '工具栏',
    left: '目录',
    mid: { label: '主工作区', acc: true, text: '十月经营复盘' },
    right: '属性面板',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['bar', 'mid'],
  boxes: { bar: '工具栏', mid: { label: '工作区', acc: true, text: '十月经营复盘' } },
  drawer: { side: 'bottom', size: '46%', box: '属性面板（底部面板）', open: true },
};
