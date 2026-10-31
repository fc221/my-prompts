import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 300px 640px 1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['. hd hd .', '. t1 f1 .', '. t2 f2 .', '. t3 dz .', '. . . .'],
  boxes: {
    hd: { label: '页面标题', kind: 'heading', text: '工作区设置' },
    t1: { label: '组标题 + 说明', kind: 'secdesc', text: '工作区信息' },
    f1: { label: '字段（卡片）', kind: 'form', acc: true, text: '工作区信息' },
    t2: { label: '组标题 + 说明', kind: 'secdesc', text: '通知' },
    f2: { label: '开关行（卡片）', kind: 'switches', acc: true, text: '通知' },
    t3: { label: '组标题 + 说明', kind: 'secdesc', text: '危险操作' },
    dz: '危险操作',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto auto 1fr',
  areas: ['nav', 't1', 'f1', 't2', 'f2', '.'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '工作区设置' },
    t1: { label: '组标题 + 说明', kind: 'secdesc', text: '工作区信息' },
    f1: { label: '字段（卡片）', kind: 'form', acc: true, text: '工作区信息' },
    t2: { label: '组标题 + 说明', kind: 'secdesc', text: '通知' },
    f2: { label: '开关行（卡片）', kind: 'switches', acc: true, text: '通知' },
  },
};
