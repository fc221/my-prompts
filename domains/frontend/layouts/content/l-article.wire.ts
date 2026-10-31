import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 680px 1fr',
  rows: 'auto auto 300px auto 1fr',
  areas: ['. hd .', '. by .', '. cv .', '. bd .', '. . .'],
  boxes: {
    hd: { label: '标题', kind: 'heading', text: '十月经营复盘：复购率提升到 42% 的三件事' },
    by: { label: '作者 · 日期 · 阅读时长', kind: 'byline' },
    cv: { label: '封面图', kind: 'image' },
    bd: { label: '正文', kind: 'text', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto 200px auto 1fr',
  areas: ['top', 'hd', 'by', 'cv', 'bd', '.'],
  boxes: {
    top: { label: '‹ 返回', kind: 'mtop', text: '文章' },
    hd: { label: '标题', kind: 'heading', text: '十月经营复盘：复购率提升到 42% 的三件事' },
    by: { label: '作者 · 日期', kind: 'byline' },
    cv: { label: '封面图', kind: 'image' },
    bd: { label: '正文', kind: 'text', acc: true },
  },
};
