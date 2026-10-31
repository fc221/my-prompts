import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr',
  rows: '14% 11% 1fr',
  areas: ['top', 'tabs', 'main'],
  boxes: {
    top: {
      inner: {
        cols: '18% 1fr 18%',
        rows: '1fr',
        areas: ['logo nav acct'],
        boxes: { logo: 'Logo', nav: '一级导航', acct: '账号' },
      },
    },
    tabs: '页内 Tabs',
    main: { label: '内容区（整宽）', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['top', 'main'],
  boxes: { top: '顶栏 ☰', main: { label: '内容', acc: true } },
  drawer: { size: '70%', box: { label: '一级导航（左侧抽屉）', kind: 'nav' } },
};
