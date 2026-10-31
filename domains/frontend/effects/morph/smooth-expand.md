---
zh: 高度平滑展开
en: Smooth height expand
order: 10
---

## 是什么

点一下标题，内容区的高度从 0 平滑展开到正好合适，收起时同样平滑，没有跳动。

## 适合

折叠面板、常见问题、“展开更多”、筛选区的高级条件。

## 注意

不要用 max-height: 9999px 的写法，收起时会先停顿一下再动。

## 提示词

给{折叠面板 / 展开更多}加「高度平滑展开」：用 grid-template-rows 从 0fr 过渡到 1fr（内层 min-height: 0; overflow: hidden），约 260ms、减速曲线，不写死高度；支持的浏览器也可以用 interpolate-size: allow-keywords 直接过渡 height: auto；收起后内容 visibility: hidden，不能被 Tab 聚焦；触发按钮带 aria-expanded 和 aria-controls；减少动态效果时直接显示和隐藏。

## 示例

<style>
:host{display:block;height:100%}
.st{height:100%;overflow:auto;padding:14px 18px;background:#f5f6f8;color:#1f2329;font:13px/1.6 system-ui,"PingFang SC",sans-serif}
.acc{max-width:560px;margin:0 auto;border:1px solid #e3e6eb;border-radius:12px;background:#fff}
.it+.it{border-top:1px solid #eef0f3}
.it button{display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 16px;border:0;background:none;font:600 14px system-ui,"PingFang SC",sans-serif;color:inherit;text-align:left;cursor:pointer}
.it button i{font-style:normal;color:#8a8f99;transition:transform .26s cubic-bezier(.2,0,0,1)}
.it.open button i{transform:rotate(180deg)}
.rv{display:grid;grid-template-rows:0fr;transition:grid-template-rows .26s cubic-bezier(.2,0,0,1)}
.rv>div{min-height:0;overflow:hidden;visibility:hidden;transition:visibility 0s .26s}
.it.open .rv{grid-template-rows:1fr}
.it.open .rv>div{visibility:visible;transition:none}
.rv p{margin:0;padding:0 16px 14px;color:#5b616e}
.it button:focus-visible{outline:2px solid #2563eb;outline-offset:-2px;border-radius:12px}
@media (prefers-reduced-motion:reduce){.rv,.rv>div,.it button i{transition:none}
}
</style>

<div class="st"><div class="acc"><div class="it open"><button type="button" aria-expanded="true" aria-controls="p1">可以免费试用多久？<i>⌄</i></button><div class="rv" id="p1"><div><p>新注册账号可免费试用全部功能 14 天，到期后自动转为基础版，数据不会丢失。</p></div></div></div><div class="it"><button type="button" aria-expanded="false" aria-controls="p2">支持开具发票吗？<i>⌄</i></button><div class="rv" id="p2"><div><p>支持电子普通发票和专用发票，在“设置 › 账单与发票”里填写抬头后，每月 5 日自动开具。</p></div></div></div><div class="it"><button type="button" aria-expanded="false" aria-controls="p3">能导入已有的订单数据吗？<i>⌄</i></button><div class="rv" id="p3"><div><p>可以用表格导入，也可以通过开放接口同步，单次最多 5 万行。</p></div></div></div></div></div>

<script type="module">
export default function demo(root) {
  root.querySelectorAll('.it button').forEach((b) => b.addEventListener('click', () => { const it = b.parentNode, open = !it.classList.contains('open'); it.classList.toggle('open', open); b.setAttribute('aria-expanded', String(open)); }));
}
</script>
