import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 760px 1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['. hd .', '. tb .', '. f1 .', '. f2 .', '. . .'],
  boxes: {
    hd: { label: '页面标题', kind: 'heading', text: '设置' },
    tb: { label: '分类 Tab', kind: 'tabs', text: '通用|成员与权限|通知|安全|账单与发票' },
    f1: { label: '分组卡片（标题 + 说明 + 字段）', kind: 'form', acc: true, text: '工作区信息' },
    f2: { label: '分组卡片（开关行）', kind: 'switches', acc: true, text: '通知' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['nav', 'tb', 'f1', 'f2', '.'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '设置' },
    tb: { label: '分类 Tab（横滑）', kind: 'tabs', text: '通用|成员与权限|通知|安全|账单与发票' },
    f1: { label: '分组卡片', kind: 'form', acc: true, text: '工作区信息' },
    f2: { label: '分组卡片（开关行）', kind: 'switches', acc: true, text: '通知' },
  },
};
