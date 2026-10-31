import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr',
  rows: '1fr 240px auto',
  areas: ['prev', 'up', 'ft'],
  boxes: {
    prev: { label: '上一节', kind: 'logos' },
    up: { label: '收尾行动区', kind: 'cta' },
    ft: {
      dark: true,
      inner: {
        cols: '28% 1fr 1fr 1fr 1fr',
        rows: 'auto auto',
        areas: ['br g1 g2 g3 g4', 'lg lg lg lg lg'],
        boxes: {
          br: 'Logo 联系方式',
          g1: { label: '产品', acc: true, kind: 'linkcol' },
          g2: { label: '方案', acc: true, kind: 'linkcol' },
          g3: { label: '资源', acc: true, kind: 'linkcol' },
          g4: { label: '公司', acc: true, kind: 'linkcol' },
          lg: '版权 · 隐私 · 备案',
        },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '1fr auto auto',
  areas: ['prev', 'up', 'ft'],
  boxes: {
    prev: { label: '上一节', kind: 'logos' },
    up: { label: '收尾行动区', kind: 'cta' },
    ft: {
      dark: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto auto',
        areas: ['br', 'g1', 'g2', 'g3', 'g4', 'lg'],
        boxes: {
          br: 'Logo',
          g1: { label: '产品 ＋', acc: true, kind: 'row' },
          g2: { label: '方案 ＋', acc: true, kind: 'row' },
          g3: { label: '资源 ＋', acc: true, kind: 'row' },
          g4: { label: '公司 ＋', acc: true, kind: 'row' },
          lg: '版权 备案',
        },
      },
    },
  },
};
