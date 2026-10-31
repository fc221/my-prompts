import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '5fr 2fr 5fr',
  rows: '1fr 1fr 1fr',
  areas: ['i1 i1 t1', 't2 i2 i2', 'i3 i3 t3'],
  boxes: {
    i1: { label: '功能截图', acc: true },
    t1: '标题 说明',
    t2: '标题 说明',
    i2: { label: '功能截图', acc: true },
    i3: { label: '功能截图', acc: true },
    t3: '标题 说明',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '1fr 14% 4% 1fr 14%',
  areas: ['i1', 't1', '.', 'i2', 't2'],
  boxes: { i1: { label: '截图', acc: true }, t1: '说明', i2: { label: '截图', acc: true }, t2: '说明' },
};
