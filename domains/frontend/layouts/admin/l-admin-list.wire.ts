import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr',
  rows: '12% 16% 11% 1fr 11%',
  areas: ['hd', 'flt', 'tool', 'tb', 'pg'],
  boxes: {
    hd: '标题 · 新建',
    flt: {
      inner: {
        cols: '1fr 1fr 1fr 0.8fr',
        rows: '1fr',
        areas: ['f1 f2 f3 btn'],
        boxes: { f1: '条件', f2: '条件', f3: '条件', btn: '查询' },
      },
    },
    tool: '批量操作 · 导出',
    tb: { label: '表格', acc: true },
    pg: { inner: { cols: '1fr 36%', rows: '1fr', areas: ['. p'], boxes: { p: '分页' } } },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto auto auto auto 1fr',
  areas: ['hd', 'fb', 'c1', 'c2', 'c3', 'c4', 'c5', '.'],
  boxes: {
    hd: { label: '顶栏 ☰ · 新建', text: '订单管理' },
    fb: '筛选 (2)',
    c1: { label: '卡片', acc: true, kind: 'record' },
    c2: { label: '卡片', acc: true, kind: 'record' },
    c3: { label: '卡片', acc: true, kind: 'record' },
    c4: { label: '卡片', acc: true, kind: 'record' },
    c5: { label: '卡片', acc: true, kind: 'record' },
  },
};
