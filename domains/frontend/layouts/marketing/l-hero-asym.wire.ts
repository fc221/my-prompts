import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '38% 1fr',
  rows: '13% 1fr 20%',
  areas: ['nav img', 'txt img', 'cta img'],
  boxes: {
    nav: 'Logo · 导航',
    txt: { label: '大标题', acc: true, kind: 'hero' },
    cta: '主按钮',
    img: { label: '大图（顶到边缘）', dark: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '48% 1fr 13%',
  areas: ['img', 'txt', 'cta'],
  boxes: { img: { label: '竖版大图', dark: true }, txt: { label: '标题', acc: true, kind: 'hero' }, cta: '按钮' },
};
