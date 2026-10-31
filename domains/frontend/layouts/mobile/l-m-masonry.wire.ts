import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr 1fr',
  rows: '1fr 1fr 1fr 1fr 1fr 1fr',
  areas: ['a d g j', 'a d g j', 'a e g k', 'b e h k', 'b e h l', 'c f h l'],
  boxes: {
    a: { label: '图文', acc: true },
    b: { label: '', acc: true },
    c: { label: '', acc: true },
    d: { label: '', acc: true },
    e: { label: '图文', acc: true },
    f: { label: '', acc: true },
    g: { label: '', acc: true },
    h: { label: '图文', acc: true },
    j: { label: '', acc: true },
    k: { label: '', acc: true },
    l: { label: '', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr 1fr',
  rows: '11% 1fr 1fr 1fr 1fr 1fr 1fr',
  areas: ['top top', 'a d', 'a d', 'a e', 'b e', 'b e', 'c f'],
  boxes: {
    top: '搜索 分类',
    a: { label: '', acc: true },
    b: { label: '', acc: true },
    c: { label: '', acc: true },
    d: { label: '', acc: true },
    e: { label: '', acc: true },
    f: { label: '', acc: true },
  },
};
