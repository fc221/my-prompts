import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr',
  rows: '1fr',
  areas: ['pg'],
  boxes: { pg: { label: '背后的页面', kind: 'content' } },
  drawer: {
    side: 'center',
    size: '820px',
    height: '560px',
    open: true,
    box: {
      label: '设置弹窗',
      inner: {
        cols: '190px 1fr',
        rows: 'auto 1fr',
        areas: ['hd hd', 'nav body'],
        boxes: {
          hd: { label: '标题 · 关闭', kind: 'dlghead', text: '偏好设置' },
          nav: { label: '设置分类', kind: 'nav' },
          body: { label: '分组卡片', kind: 'form', acc: true, text: '工作区信息' },
        },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['nav', 'tb', 'f1', 'f2', '.'],
  boxes: {
    nav: { label: '‹ 返回（全屏页面）', kind: 'mtop', text: '偏好设置' },
    tb: { label: '分类 Tab', kind: 'tabs', text: '通用|通知|快捷键|账号' },
    f1: { label: '分组卡片', kind: 'form', acc: true, text: '工作区信息' },
    f2: { label: '分组卡片（开关行）', kind: 'switches', text: '通知' },
  },
};
