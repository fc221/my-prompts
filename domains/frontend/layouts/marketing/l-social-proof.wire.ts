import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr 1fr 1fr 1fr',
  rows: '1fr auto auto auto auto 1fr',
  areas: ['. . . . . .', '. . h h . .', 'l1 l2 l3 l4 l5 l6', 'st st st st st st', 'q1 q1 q2 q2 q3 q3', '. . . . . .'],
  boxes: {
    h: { label: '标题', text: '2,000+ 团队在用 MyPrompts', center: true },
    st: { label: '口碑数据', kind: 'strip' },
    l1: { label: 'Logo', kind: 'wordmark' },
    l2: { label: 'Logo', kind: 'wordmark' },
    l3: { label: 'Logo', kind: 'wordmark' },
    l4: { label: 'Logo', kind: 'wordmark' },
    l5: { label: 'Logo', kind: 'wordmark' },
    l6: { label: 'Logo', kind: 'wordmark' },
    q1: { label: '评价 + 署名', acc: true },
    q2: { label: '评价 + 署名', acc: true },
    q3: { label: '评价 + 署名', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr 1fr',
  rows: 'auto auto auto auto auto 1fr',
  areas: ['h h', 'l1 l2', 'l3 l4', 'st st', 'q q', '. .'],
  boxes: {
    h: { label: '标题', text: '2,000+ 团队在用 MyPrompts' },
    st: { label: '口碑数据', kind: 'strip' },
    l1: { label: 'Logo', kind: 'wordmark' },
    l2: { label: 'Logo', kind: 'wordmark' },
    l3: { label: 'Logo', kind: 'wordmark' },
    l4: { label: 'Logo', kind: 'wordmark' },
    q: { label: '评价横滑', acc: true },
  },
};
