import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '26% 1fr',
  rows: '12% 1fr 17%',
  areas: ['new top', 'list chat', 'list inp'],
  boxes: {
    new: { label: '＋ 新建', text: '＋ 新对话' },
    top: { label: '会话标题', kind: 'aitop', text: '十月对账差异分析' },
    list: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto 1fr',
        areas: ['r1', 'r2', 'r3', 'r4', '.'],
        boxes: { r1: { label: '当前会话', acc: true }, r2: '会话', r3: '待确认 •', r4: '会话' },
      },
    },
    chat: { label: '对话（居中列）', acc: true },
    inp: '输入框',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '11% 1fr 14%',
  areas: ['top', 'chat', 'inp'],
  boxes: {
    top: { label: '☰ 会话名', kind: 'mtop', text: '十月对账差异分析' },
    chat: { label: '对话', acc: true },
    inp: '输入框',
  },
};
