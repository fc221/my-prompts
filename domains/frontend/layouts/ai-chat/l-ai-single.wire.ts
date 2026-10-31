import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '16% 1fr 16%',
  rows: 'auto auto auto auto 1fr auto',
  areas: ['top top top', '. m1 .', '. m2 .', '. m3 .', '. . .', '. inp .'],
  boxes: {
    top: '顶栏 · 模型',
    m1: { inner: { cols: '45% 1fr', rows: 'auto', areas: ['. u'], boxes: { u: '提问' } } },
    m2: { label: '回答（流式）', acc: true },
    m3: { inner: { cols: '45% 1fr', rows: 'auto', areas: ['. u'], boxes: { u: '追问' } } },
    inp: '输入框（自动增高）',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr auto',
  areas: ['top', 'm1', 'm2', 'm3', '.', 'inp'],
  boxes: {
    top: { label: '标题', kind: 'mtop', text: '新对话' },
    m1: { inner: { cols: '25% 1fr', rows: 'auto', areas: ['. u'], boxes: { u: '提问' } } },
    m2: { label: '回答', acc: true },
    m3: { inner: { cols: '25% 1fr', rows: 'auto', areas: ['. u'], boxes: { u: '追问' } } },
    inp: '输入框',
  },
};
