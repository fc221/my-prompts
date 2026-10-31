import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '240px 1fr',
  rows: 'auto auto 1fr',
  areas: ['sr sr', 'tb tb', 'fc rs'],
  boxes: {
    sr: { label: '搜索框（保留关键词）', kind: 'search', text: '收货地址' },
    tb: { label: '类型 Tab（带数量）', kind: 'tabs', text: '全部 128|文档 46|订单 52|客户 18|设置 12' },
    fc: { label: '筛选侧栏', kind: 'facets' },
    rs: { label: '结果列表（命中词高亮）', kind: 'results', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto 1fr',
  areas: ['sr', 'tb', 'fb', 'rs'],
  boxes: {
    sr: { label: '搜索框', kind: 'search', text: '收货地址' },
    tb: { label: '类型 Tab（横滑）', kind: 'tabs', text: '全部 128|文档 46|订单 52|客户 18' },
    fb: '筛选 (2)',
    rs: { label: '结果列表', kind: 'results', acc: true },
  },
};
