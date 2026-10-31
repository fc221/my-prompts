import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '22% 1fr',
  rows: 'auto 1fr',
  areas: ['side top', 'side main'],
  boxes: {
    side: { label: '侧栏导航', kind: 'nav' },
    top: { label: '顶栏（右上角设置按钮）' },
    main: { label: '内容', kind: 'content' },
  },
  drawer: {
    side: 'right',
    size: '340px',
    open: true,
    box: {
      label: '界面设置抽屉',
      inner: {
        cols: '1fr',
        rows: 'auto 1fr',
        areas: ['hd', 'pf'],
        boxes: {
          hd: { label: '标题 · 关闭', kind: 'dlghead', text: '界面设置' },
          pf: { label: '主题 · 布局 · 开关', kind: 'prefs', acc: true },
        },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['top', 'main'],
  boxes: { top: '顶栏 ☰', main: { label: '内容', kind: 'content' } },
  drawer: {
    side: 'bottom',
    size: '78%',
    open: true,
    box: {
      label: '界面设置（底部面板）',
      inner: {
        cols: '1fr',
        rows: 'auto 1fr',
        areas: ['hd', 'pf'],
        boxes: {
          hd: { label: '标题 · 关闭', kind: 'dlghead', text: '界面设置' },
          pf: { label: '主题 · 布局 · 开关', kind: 'prefs', acc: true },
        },
      },
    },
  },
};
