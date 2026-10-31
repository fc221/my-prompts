import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr',
  rows: '1fr 1fr 30%',
  areas: ['main main s1', 'main main s2', 'b1 b2 b3'],
  boxes: {
    main: { label: '主模块 · 核心问题', acc: true, text: '本周销售趋势' },
    s1: '次要',
    s2: '次要',
    b1: '次要',
    b2: '次要',
    b3: '次要',
  },
};
export const wireMobile: Wire = {
  cols: '1fr 1fr',
  rows: 'auto 40% 1fr 1fr',
  areas: ['top top', 'main main', 's1 s2', 's3 s4'],
  boxes: {
    top: { label: '顶栏 ☰', text: '经营概览' },
    main: { label: '主模块', acc: true, text: '本周销售趋势' },
    s1: '次要',
    s2: '次要',
    s3: '次要',
    s4: '次要',
  },
};
