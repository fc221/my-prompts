import type { Wire } from '#kb';

export const wire: Wire = {
  cols: '240px 1fr 200px',
  rows: 'auto 1fr',
  areas: ['top top top', 'nav body toc'],
  boxes: {
    top: {
      inner: {
        cols: '200px 1fr 420px',
        rows: '1fr',
        areas: ['logo sr links'],
        boxes: { logo: 'Logo', sr: { label: '文档搜索 ⌘K', kind: 'search', text: '搜索文档  ⌘K' }, links: '导航' },
      },
    },
    nav: {
      label: '文档目录',
      kind: 'toc',
      text: '文档目录|快速开始|安装与配置|订单接口|客户接口|Webhook|错误码|更新日志',
    },
    body: {
      inner: {
        cols: '1fr',
        rows: 'auto 200px 1fr',
        areas: ['t', 'c', '.'],
        boxes: {
          t: { label: '正文', kind: 'text', acc: true, text: '快速开始' },
          c: { label: '代码示例', kind: 'code' },
        },
      },
    },
    toc: { label: '本页内容', kind: 'toc', text: '本页内容|安装依赖|配置密钥|发送第一个请求|下一步' },
  },
};
export const wireMobile: Wire = {
  cols: '1fr',
  rows: 'auto auto auto 200px 1fr',
  areas: ['top', 'toc', 'body', 'code', '.'],
  boxes: {
    top: { label: '顶栏 ☰', text: '快速开始' },
    toc: { label: '本页内容（横条）', kind: 'toc', text: '本页内容|安装依赖|配置密钥|发送请求' },
    body: { label: '正文', kind: 'text', acc: true, text: '快速开始' },
    code: { label: '代码示例', kind: 'code' },
  },
  drawer: {
    size: '78%',
    box: {
      label: '文档目录（左侧抽屉）',
      kind: 'toc',
      text: '文档目录|快速开始|安装与配置|订单接口|客户接口|Webhook|错误码',
    },
  },
};
