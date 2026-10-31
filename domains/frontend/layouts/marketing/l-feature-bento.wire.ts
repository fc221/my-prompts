import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr 1fr',
  rows: '1fr 1fr 1fr',
  areas: ['a a b c', 'a a d d', 'e f f g'],
  boxes: { a: { label: '主能力', acc: true }, b: '能力', c: '能力', d: '能力', e: '能力', f: '能力', g: '能力' },
};
export const wireMobile: Wire = {
  cols: '1fr 1fr',
  rows: '36% 1fr 1fr',
  areas: ['a a', 'b c', 'd d'],
  boxes: { a: { label: '主能力', acc: true }, b: '能力', c: '能力', d: '能力' },
};
