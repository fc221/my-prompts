import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 360px',
  rows: 'auto auto auto auto 1fr',
  areas: ['hd sm', 'ad sm', 'dl sm', 'pm sm', '. sm'],
  boxes: {
    hd: { label: '页面标题', kind: 'heading', text: '确认订单' },
    ad: { label: '收货地址', kind: 'addr' },
    dl: { label: '配送方式（选项卡片）', kind: 'radiocards' },
    pm: { label: '支付方式（选项卡片）', kind: 'radiocards', acc: true },
    sm: { label: '订单汇总（吸顶）', kind: 'summary', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr auto',
  areas: ['top', 'ad', 'dl', 'pm', '.', 'bar'],
  boxes: {
    top: { label: '‹ 返回', kind: 'mtop', text: '确认订单' },
    ad: { label: '收货地址', kind: 'addr' },
    dl: { label: '配送方式', kind: 'radiocards' },
    pm: { label: '支付方式', kind: 'radiocards', acc: true },
    bar: { label: '底部结算栏', kind: 'paybar' },
  },
};
