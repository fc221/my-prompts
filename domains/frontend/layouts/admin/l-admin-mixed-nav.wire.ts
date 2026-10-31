import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '22% 1fr',
  rows: '14% 1fr',
  areas: ['top top', 'side main'],
  boxes: {
    top: {
      inner: {
        cols: '18% 1fr 18%',
        rows: '1fr',
        areas: ['logo mods acct'],
        boxes: { logo: 'Logo', mods: '一级模块', acct: '账号' },
      },
    },
    side: '二级菜单',
    main: { label: '内容区', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['top', 'main'],
  boxes: { top: '顶栏 ☰', main: { label: '内容', acc: true } },
  drawer: { size: '70%', box: { label: '导航树（左侧抽屉）', kind: 'nav' } },
};
