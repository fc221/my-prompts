import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr',
  rows: '440px auto 1fr',
  areas: ['gl bb', 'tb tb', 'dt dt'],
  boxes: {
    gl: { label: '商品图集', kind: 'gallery' },
    bb: { label: '购买区（价格 · 规格 · 按钮）', kind: 'buybox', acc: true },
    tb: { label: '详情 Tab', kind: 'tabs', text: '商品详情|规格参数|评价 612|售后保障' },
    dt: { label: '商品详情', kind: 'image' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '300px auto 1fr auto',
  areas: ['gl', 'bb', '.', 'bar'],
  boxes: {
    gl: { label: '图集（横滑）', kind: 'gallery' },
    bb: { label: '价格 · 名称 · 规格', kind: 'buybox', acc: true },
    bar: { label: '底部购买栏', kind: 'opbtns' },
  },
};
