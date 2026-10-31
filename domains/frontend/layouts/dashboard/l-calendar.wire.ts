import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '240px 1fr',
  rows: '1fr',
  areas: ['side cal'],
  boxes: {
    side: {
      inner: {
        cols: '1fr',
        rows: 'auto auto 1fr',
        areas: ['nw', 'cs', '.'],
        boxes: {
          nw: { label: '＋ 新建日程', kind: 'button', text: '＋ 新建日程' },
          cs: { label: '日历分类（可勾选）', kind: 'cell', text: '我的日历|订单排期|客户回访|团队活动' },
        },
      },
    },
    cal: { label: '月视图', kind: 'calendar', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto auto auto 1fr',
  areas: ['top', 'wk', 'h1', 'e1', 'h2', 'e2', '.'],
  boxes: {
    top: { label: '顶栏 ☰', text: '日程' },
    wk: { label: '日期条', kind: 'segment', text: '' },
    h1: '上午',
    e1: { label: '日程列表', kind: 'agenda', acc: true, text: '上午' },
    h2: '下午',
    e2: { label: '日程列表', kind: 'agenda', acc: true, text: '下午' },
  },
};
