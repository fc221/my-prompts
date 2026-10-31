import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '20% 1fr',
  rows: '40px 80px 80px 80px 80px 80px 80px 1fr',
  areas: ['c0 sc', 'n1 l1', 'n2 l2', 'n3 l3', 'n4 l4', 'n5 l5', 'n6 l6', '. .'],
  boxes: {
    c0: { label: '资源', kind: 'colhead' },
    sc: '时间刻度（吸顶）',
    n1: { label: '泳道', kind: 'avatar' },
    n2: { label: '泳道', kind: 'avatar' },
    n3: { label: '泳道', kind: 'avatar' },
    n4: { label: '泳道', kind: 'avatar' },
    n5: { label: '泳道', kind: 'avatar' },
    n6: { label: '泳道', kind: 'avatar' },
    l1: {
      inner: {
        cols: '4% 34% 6% 26% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . . . .', '. a . b .', '. . . . .'],
        boxes: { a: { label: '事项', acc: true, kind: 'event' }, b: { label: '', acc: true, kind: 'event' } },
      },
    },
    l2: {
      inner: {
        cols: '18% 44% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . .', '. a .', '. . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' } },
      },
    },
    l3: {
      inner: {
        cols: '8% 22% 14% 40% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . . . .', '. a . b .', '. . . . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' }, b: { label: '', acc: true, kind: 'event' } },
      },
    },
    l4: {
      inner: {
        cols: '40% 48% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . .', '. a .', '. . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' } },
      },
    },
    l5: {
      inner: {
        cols: '10% 30% 8% 30% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . . . .', '. a . b .', '. . . . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' }, b: { label: '', acc: true, kind: 'event' } },
      },
    },
    l6: {
      inner: {
        cols: '28% 36% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . .', '. a .', '. . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' } },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto auto auto 1fr',
  areas: ['nav', 'top', 'h1', 'e1', 'h2', 'e2', '.'],
  boxes: {
    nav: { label: '顶栏 ☰', text: '排期' },
    top: '日期切换',
    h1: '上午',
    e1: { label: '事项列表', acc: true, text: '上午' },
    h2: '下午',
    e2: { label: '事项列表', acc: true, text: '下午' },
  },
};
