import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 2.1fr 1fr',
  rows: '1fr 1fr 1fr 16%',
  areas: ['l1 main r1', 'l2 main r2', 'l3 main r3', 'l4 tl r4'],
  boxes: {
    main: { label: '画布 · 主视图', acc: true, text: '园区实时分布' },
    tl: '时间刻度',
    l1: '关键数据',
    l2: '趋势',
    l3: '关键数据',
    l4: '关键数据',
    r1: '提醒',
    r2: '列表',
    r3: '分布',
    r4: '关键数据',
  },
};
export const wireMobile: Wire = {
  cols: '1fr 1fr',
  rows: 'auto 40% 9% 1fr 1fr',
  areas: ['top top', 'main main', 'tl tl', 'l1 r1', 'l2 r2'],
  boxes: {
    top: { label: '顶栏 ☰', text: '园区值守' },
    main: { label: '画布 · 主视图', acc: true, text: '园区实时分布' },
    tl: '时间刻度',
    l1: '关键数据',
    r1: '提醒',
    l2: '趋势',
    r2: '列表',
  },
};
