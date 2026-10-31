import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '38% 1fr',
  rows: '12% 1fr 17%',
  areas: ['ct pt', 'chat pv', 'inp pv'],
  boxes: {
    ct: { label: '对话', kind: 'aitop', text: '生成订单看板' },
    pt: '版本 · 复制 · 全屏',
    chat: '消息流',
    inp: '输入框',
    pv: { label: '产物预览 / 画布', acc: true, kind: 'image' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto 200px auto 1fr auto',
  areas: ['top', 'm1', 'card', 'm2', '.', 'inp'],
  boxes: {
    top: { label: '标题', kind: 'mtop', text: '生成订单看板' },
    m1: '提问',
    card: { label: '产物卡片', acc: true, kind: 'artcard' },
    m2: '回答',
    inp: '输入框',
  },
};
