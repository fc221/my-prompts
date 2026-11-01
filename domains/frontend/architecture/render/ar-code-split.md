---
zh: 代码分割与懒加载
en: Code splitting and lazy loading
aka: 懒加载 动态导入 dynamic import 分包 chunk 打包体积 bundle
order: 30
---

## 是什么

把一个大 bundle 按路由和功能拆成多个按需加载的块：首屏只下载当前页面要用的代码，图表、富文本编辑器、地图这类重模块用到时再加载。

## 适合

首屏 JS 过大、中低端手机打开慢；某个页面引了大库拖累全站；发版后用户报“页面加载失败”（旧 chunk 已被删除）。

## 不适合

整页 HTML 在哪生成看「渲染模式选型」；内容站减少需要执行的 JS 看「水合与孤岛」；图片和字体的体积看「性能」。

## 注意

拆得太碎反而慢：每个 chunk 都是一次请求，几 KB 的小组件单独拆不划算。先用打包分析找到大块，再动手拆。

## 要点

- 先量再拆：用 rollup-plugin-visualizer、@next/bundle-analyzer 或 source-map-explorer 出体积图，记录首屏 JS（gzip 后）基线；首屏 JS 目标控制在 200KB（gzip）以内。
- 第一刀按路由拆：每个页面组件动态 import，布局和全局外壳留在主包。
- 第二刀拆重组件：图表、富文本、代码编辑器、地图、PDF 预览、视频播放器，用 React.lazy、defineAsyncComponent、next/dynamic 或框架自带的懒组件加载，占位保持组件的最终尺寸，避免布局跳动。
- 依赖 window 的库在 SSR 框架里只在客户端加载，模块顶层不访问 window 和 document。
- 预取用户大概率去的下一页：链接进入视口或悬停时预取，首屏关键 chunk 用 modulepreload。
- 动态加载失败要兜底：捕获 chunk 加载错误后重试一次，仍失败就提示“已发布新版本”并刷新；部署时保留上一版静态资源至少一个发布周期。
- 按需引入：组件库和工具库只引用到的部分（lodash-es 单个函数、日期库单个语言包）；共享包的 package.json 写对 sideEffects，汇总导出的入口文件要能被 tree-shaking。
- 在 CI 里设体积预算（size-limit 或构建后脚本检查），首屏 chunk 比基线增长超过 10% 时构建失败。

## 提示词

请给{产品}做代码分割。先跑一次生产构建和打包分析，记下首屏 JS（gzip 后）、最大的 10 个 chunk 及其主要来源，作为基线。
然后按顺序改：
1. 页面级组件全部改成按路由动态加载，外壳和布局留在主包。
2. 找出体积大的重组件（如图表、富文本、地图、预览器），用{框架}的懒加载方式改成用到时再加载，占位保持组件最终尺寸；依赖 window 的库只在客户端加载。
3. 检查整库引入，改成按需引入，确认共享入口能被 tree-shaking。
4. 动态加载失败时重试一次，仍失败提示有新版本并刷新页面。
5. 加体积预算检查，首屏 chunk 超出基线 10% 时构建失败。
只拆分析结果里体积大的模块，几 KB 的小组件保持原样。
完成后汇报改前改后的首屏 JS 体积和 chunk 列表、改了哪些文件；在 4G 限速下验证首页和{重点页面}加载正常、懒加载的组件能正常出现。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: '打包分析', note: '记下首屏 JS 基线' }, { t: '按路由拆', note: '页面动态 import', acc: true }, { t: '拆重组件', note: '图表、富文本、地图' }, { t: '体积预算', note: '超基线 10% 构建失败' }],
    [{ t: '悬停或进入视口', note: '预取下一页' }, { t: '加载 chunk', note: '占位保持最终尺寸' }, { t: '失败重试一次', bad: true, via: '失败' }, { t: '提示新版本', note: '刷新页面' }],
  ]), { title: '先量再拆 · 首屏 JS ≤ 200KB（gzip）' });
}
</script>
