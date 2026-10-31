import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr',
  rows: '1fr 220px 22%',
  areas: ['prev', 'cta', 'foot'],
  boxes: {
    prev: {
      label: '上一节',
      inner: {
        cols: '1fr 1fr 1fr',
        rows: '1fr',
        areas: ['a b c'],
        boxes: { a: '能力卡片', b: '能力卡片', c: '能力卡片' },
      },
    },
    cta: { label: '整宽色块：号召 + 主按钮', acc: true },
    foot: { label: '页脚', dark: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '1fr auto 22%',
  areas: ['prev', 'cta', 'foot'],
  boxes: {
    prev: { label: '上一节', kind: 'card', text: '能力卡片' },
    cta: { label: '号召 按钮', acc: true },
    foot: { label: '页脚', dark: true },
  },
};
