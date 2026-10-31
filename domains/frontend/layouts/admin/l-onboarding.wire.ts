import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 340px',
  rows: 'auto auto 1fr',
  areas: ['hd hd', 'ck vd', 'ck hp'],
  boxes: {
    hd: { label: '欢迎语', kind: 'heading', text: '欢迎来到 MyPrompts，林晓' },
    ck: { label: '任务清单（进度 + 当前一步）', kind: 'checklist', acc: true },
    vd: { label: '入门视频', kind: 'image' },
    hp: { label: '帮助入口', kind: 'cell', text: '需要帮助？|阅读快速开始文档|观看 3 分钟入门视频|预约一对一演示' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['top', 'hd', 'ck', 'hp', '.'],
  boxes: {
    top: { label: '顶栏 ☰', text: '开始使用' },
    hd: { label: '欢迎语', kind: 'heading', text: '欢迎来到 MyPrompts' },
    ck: { label: '任务清单', kind: 'checklist', acc: true },
    hp: { label: '帮助入口', kind: 'cell', text: '需要帮助？|快速开始文档|入门视频|预约演示' },
  },
};
