import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '1fr 1fr 1fr',
  rows: '1fr auto auto 8px 400px 1fr',
  areas: ['. . .', '. h .', '. s .', '. . .', 'c1 c2 c3', '. . .'],
  boxes: {
    h: { label: '区块标题', center: true },
    s: { label: '一句说明', center: true },
    c1: { label: '能力卡片', acc: true },
    c2: { label: '能力卡片', acc: true },
    c3: { label: '能力卡片', acc: true },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: '13% 1fr 1fr 1fr',
  areas: ['h', 'c1', 'c2', 'c3'],
  boxes: {
    h: '区块标题',
    c1: { label: '能力卡片', acc: true },
    c2: { label: '能力卡片', acc: true },
    c3: { label: '能力卡片', acc: true },
  },
};
