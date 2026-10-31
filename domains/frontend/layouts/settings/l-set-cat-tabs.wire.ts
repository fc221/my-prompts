import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '300px 1fr',
  rows: 'auto 1fr',
  areas: ['cat panel', '. .'],
  boxes: {
    cat: { label: '分类卡片（名称 + 说明 + 图标）', kind: 'catlist' },
    panel: {
      label: '当前分类的设置',
      acc: true,
      card: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto',
        areas: ['tb', 'fm'],
        boxes: {
          tb: { label: '页内 Tab', kind: 'tabs', text: '积分配置|充值配置|客服配置' },
          fm: { label: '表单 · 重置 / 提交', kind: 'form', text: '积分配置' },
        },
      },
    },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto 1fr',
  areas: ['nav', 'tb', 'fm', '.'],
  boxes: {
    nav: { label: '‹ 返回分类', kind: 'mtop', text: '应用设置' },
    tb: { label: '页内 Tab', kind: 'tabs', text: '积分配置|充值配置|客服配置' },
    fm: { label: '表单 · 重置 / 提交', kind: 'form', acc: true, text: '积分配置' },
  },
};
