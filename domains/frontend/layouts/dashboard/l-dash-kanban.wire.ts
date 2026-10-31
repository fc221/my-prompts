import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr 1fr',
  rows: '1fr',
  areas: ['c1 c2 c3 c4'],
  boxes: {
    c1: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto 1fr',
        areas: ['h', 'a', 'b', 'c', 'd', '.'],
        boxes: {
          h: '待办 4',
          a: { label: '卡片', kind: 'task' },
          b: { label: '卡片', kind: 'task' },
          c: { label: '卡片', kind: 'task' },
          d: { label: '卡片', kind: 'task' },
        },
      },
    },
    c2: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto 1fr',
        areas: ['h', 'a', 'b', 'c', '.'],
        boxes: {
          h: '进行 3',
          a: { label: '卡片', kind: 'task' },
          b: { label: '拖动中', acc: true, kind: 'task' },
          c: { label: '卡片', kind: 'task' },
        },
      },
    },
    c3: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto 1fr',
        areas: ['h', 'a', 'b', '.'],
        boxes: { h: '验收 2', a: { label: '卡片', kind: 'task' }, b: { label: '卡片', kind: 'task' } },
      },
    },
    c4: { inner: { cols: '1fr', rows: 'auto 120px 1fr', areas: ['h', 'a', '.'], boxes: { h: '完成', a: '空列提示' } } },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto auto 1fr',
  areas: ['top', 'seg', 'a', 'b', 'c', '.'],
  boxes: {
    top: { label: '顶栏 ☰', text: '任务看板' },
    seg: { label: '状态切换', acc: true },
    a: { label: '卡片', kind: 'task' },
    b: { label: '卡片', kind: 'task' },
    c: { label: '卡片', kind: 'task' },
  },
};
