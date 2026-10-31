import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 27%',
  rows: 'auto auto auto 1fr',
  areas: ['head head', 'desc side', 'tabs side', 'sec side'],
  boxes: {
    head: { inner: { cols: '1fr 24%', rows: '1fr', areas: ['t op'], boxes: { t: '名称 · 状态', op: '操作' } } },
    desc: { label: '字段（3 列）', kind: 'field' },
    tabs: 'Tabs',
    sec: { label: '关联记录', acc: true },
    side: '时间线',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr auto',
  areas: ['nav', 'head', 'desc', 'tabs', 'sec', 'bar'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '订单详情' },
    head: '名称 状态',
    desc: { label: '字段单列', kind: 'field' },
    tabs: 'Tabs',
    sec: { label: '关联', acc: true },
    bar: '主操作',
  },
};
