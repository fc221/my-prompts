import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '32% 1fr',
  rows: '1fr auto auto auto auto auto auto auto 1fr',
  areas: ['. .', 'h q1', 'ct q2', '. a2', '. q3', '. q4', '. q5', '. q6', '. .'],
  boxes: {
    h: { label: '区块标题', text: '常见问题' },
    ct: { label: '联系入口', text: '联系客服' },
    q1: '问题 ＋',
    q2: { label: '问题 －', acc: true },
    a2: { label: '展开的回答', kind: 'answer' },
    q3: '问题 ＋',
    q4: '问题 ＋',
    q5: '问题 ＋',
    q6: '问题 ＋',
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto auto auto auto 1fr',
  areas: ['h', 'q1', 'q2', 'a2', 'q3', 'ct', '.'],
  boxes: {
    h: { label: '标题', text: '常见问题' },
    q1: '问题 ＋',
    q2: { label: '问题 －', acc: true },
    a2: { label: '回答', kind: 'answer' },
    q3: '问题 ＋',
    ct: { label: '联系', text: '联系客服' },
  },
};
