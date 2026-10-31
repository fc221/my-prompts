---
zh: 纯净文档风
en: Plain docs
aka: 文档站 帮助中心 docs 技术文档 知识库样式
order: 70
---

## 是什么

白底、一种无衬线字体、左边目录树右边本页目录，正文限宽在 72ch 以内，层级只靠字号和 1px 细线，代码块和提示框是页面上仅有的色块。

## 适合

开发者文档、API 参考、帮助中心、内部知识库、更新日志、服务协议和隐私政策这类要长时间阅读和反复查找的页面。

## 不适合

营销首页和产品介绍，改用「企业稳重」；深色的开发者产品官网，用「科技深色」；讲故事的长文和专题，用「编辑杂志风」。

## 注意

纯净不等于没有层级：h2 前留足 2.5em、下方一条 1px 线，扫一眼就能分节。最容易乱的是提示框，种类只留提示、注意、危险三种，每种固定一个颜色，全站一致。

## 要点

- 配色：白底 #ffffff，正文 #1f2937（14.7:1），次要 #4b5563（7.6:1），分隔线 #e5e7eb；链接 #1d4ed8（6.7:1）常驻下划线；提示框只有三种：提示 #eff6ff 底配 #1d4ed8 左边线，注意 #fffbeb 配 #b45309，危险 #fef2f2 配 #b91c1c
- 字体：正文 Inter 或 IBM Plex Sans 配思源黑体，后备 system-ui、-apple-system、"PingFang SC"、"Microsoft YaHei"、sans-serif，16px / 1.75；标题全是同一字体 600，h1 30px、h2 22px、h3 18px；代码用 ui-monospace、"SF Mono"、Menlo、Consolas、monospace，0.875em
- 版式：左侧导航 260px、正文最大宽度 72ch、右侧本页目录 200px；1280px 以下收起右栏，900px 以下左栏改成顶部按钮打开的抽屉
- 代码：行内代码 #f3f4f6 底加 1px #e5e7eb 边、圆角 4px；代码块 #f6f8fa 底、圆角 8px、14px / 1.6，右上角放复制按钮，长行横向滚动不折行
- 导航：分组标题 12px、#6b7280、字距 0.06em；当前页文字 #1d4ed8、600，左侧 2px 竖线，用 aria-current="page" 标出；右侧目录用 IntersectionObserver 跟着滚动高亮当前小节
- 修饰：圆角只给代码块和提示框（6–8px）；无阴影、无渐变、无插画；标题悬停时右侧露出井号锚点链接，可以复制本节地址
- 动效：只有导航分组展开 150ms ease-out 和锚点跳转的 scroll-behavior: smooth；减少动态效果时都改成直接跳转
- 窄屏：正文满宽、左右各 20px 边距，本页目录折叠到标题下方，表格和代码块各自横向滚动，正文不出现横向滚动条

## 提示词

把{产品}的{文档 / 帮助中心}做成纯净文档风：白底，正文 #1f2937、次要 #4b5563、分隔线 #e5e7eb，链接 #1d4ed8 常驻下划线；全站一种无衬线字体（Inter 配思源黑体，后备 system-ui、PingFang SC），正文 16px / 1.75，h1 30px、h2 22px、h3 18px 都是 600，h2 前留 2.5em、下方 1px 线；三栏：左导航 260px（当前页蓝字加 2px 竖线、aria-current="page"），正文最大 72ch，右侧本页目录随滚动高亮；行内代码 #f3f4f6 底、1px 边、4px 圆角，代码块 #f6f8fa 底、8px 圆角、带复制按钮、长行横向滚动；提示框只做提示、注意、危险三种，浅色底加 3px 左边线；无阴影、无渐变、无插画；标题悬停露出锚点链接；1280px 以下收起右栏，900px 以下左栏改抽屉；减少动态效果时锚点直接跳转。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:grid;grid-template-columns:minmax(0,28%) minmax(0,1fr);background:#fff;color:#1f2937;font:12px/1.7 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
nav{display:flex;flex-direction:column;gap:1px;padding:12px 8px 12px 14px;border-right:1px solid #e5e7eb;overflow:hidden}
nav small{margin:6px 0 2px;font-size:11px;letter-spacing:.06em;color:#6b7280}
nav small:first-child{margin-top:0}
nav button{padding:1px 0 1px 8px;border:0;border-left:2px solid transparent;background:none;color:#4b5563;font:inherit;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}
nav button:hover{color:#1f2937}
nav button[aria-current=page]{border-left-color:#1d4ed8;color:#1d4ed8;font-weight:600}
button:focus-visible{outline:2px solid #1d4ed8;outline-offset:1px;border-radius:2px}
main{min-width:0;display:flex;gap:20px;padding:12px 16px 12px 18px}
article{flex:1;min-width:0;max-width:72ch}
.bc{margin:0;font-size:11px;color:#6b7280}
h1{margin:0 0 4px;font-size:clamp(16px,9cqh,24px);line-height:1.35;font-weight:600}
p{margin:0 0 8px}
code{padding:0 4px;border:1px solid #e5e7eb;border-radius:4px;background:#f3f4f6;font:.92em ui-monospace,"SF Mono",Menlo,Consolas,monospace}
.lk{color:#1d4ed8;text-decoration:underline;text-underline-offset:2px}
.tip{padding:4px 10px;border-left:3px solid #1d4ed8;border-radius:0 6px 6px 0;background:#eff6ff;color:#1e3a8a}
.tip b{margin-right:6px}
pre,.toc,h2{display:none}
h2{margin:14px 0 0;padding-bottom:4px;border-bottom:1px solid #e5e7eb;font-size:15px;font-weight:600}
pre{position:relative;margin:10px 0 0;padding:8px 12px;border-radius:8px;background:#f6f8fa;font:12px/1.6 ui-monospace,"SF Mono",Menlo,Consolas,monospace;overflow-x:auto}
pre i{font-style:normal;color:#4b5563}
.cp{position:absolute;right:6px;top:6px;padding:0 8px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;color:#4b5563;font:11px/20px system-ui,"PingFang SC",sans-serif;cursor:pointer}
.cp:hover{border-color:#cbd0d8;color:#1f2937}
.toc{flex:0 0 120px;flex-direction:column;gap:2px;padding-left:12px;border-left:1px solid #e5e7eb;font-size:11px;color:#4b5563}
.toc b{color:#1f2937;font-weight:600}
.toc .on{color:#1d4ed8}
@container (max-width:300px){.s{grid-template-columns:minmax(0,32%) minmax(0,1fr)}
main{padding-left:12px}
}
@container (min-height:260px){.s{font-size:13px}
nav{padding:16px 10px 16px 18px}
main{padding:16px 20px}
h1{margin-bottom:6px}
pre,h2{display:block}
.toc{display:flex}
}
</style>

<div class="s">
  <nav aria-label="文档目录"><small>开始</small><button type="button">快速上手</button><button type="button" aria-current="page">接口鉴权</button><button type="button">错误码</button><small>参考</small><button type="button">订单 API</button><button type="button">门店 API</button></nav>
  <main>
    <article>
      <p class="bc">开发指南 / 接口鉴权</p>
      <h1>接口鉴权</h1>
      <p>每个请求在 <code>Authorization</code> 头里带上访问令牌，令牌 2 小时后过期，用<span class="lk">刷新令牌</span>换新。</p>
      <div class="tip"><b>提示</b>令牌过期时返回 401。</div>
      <pre><button type="button" class="cp">复制</button><i>$</i> curl /v1/orders \
  -H "Authorization: Bearer $TOKEN"</pre>
      <h2>获取令牌</h2>
    </article>
    <aside class="toc" aria-label="本页目录"><b>本页目录</b><span class="on">获取令牌</span><span>刷新令牌</span><span>签名规则</span><span>常见错误</span></aside>
  </main>
</div>

<script type="module">
export default function demo(root) {
  const bs = [...root.querySelectorAll('nav button')], cp = root.querySelector('.cp');
  bs.forEach((b) => (b.onclick = () => bs.forEach((x) => (x === b ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')))));
  cp.onclick = () => { cp.textContent = '已复制'; };
}
</script>
