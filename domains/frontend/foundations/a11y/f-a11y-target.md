---
zh: 触控目标
en: Touch targets
order: 30
tab: 尺寸
---

## 是什么

触屏可点区域至少 44×44，图标再小也把热区撑大，相邻目标间隔 8px。

## 适合

移动端按钮、关闭图标、列表操作、表格行内操作、分页。

## 不适合

不要让 16px 的图标只有 16px 的热区；不要把几个小图标挤在一起。

## 要点

- 触屏可点击区域 ≥ 44×44px；桌面指针 ≥ 24×24px，常用操作做到 32px 以上
- 视觉可以小、热区要大：用 padding 或 ::before 扩大点击范围，不改图标尺寸
- 相邻可点目标之间至少 8px，热区不重叠
- 整行可点的列表项把整行做成一个链接或按钮，而不是只有文字可点
- 指向同一去处的几个元素（头像 + 名称）合成一个热区，中间不留点了没反应的缝（见交互「合并热区，不留死缝」）
- 热区不要贴着可横滑区域的边缘，离开 ≥ 16px，按下后移动不到 10px 仍算点按（见交互「点击与滑动让位」）
- 危险操作的按钮和常用按钮拉开距离，避免误触
- 移动端主操作放在拇指容易够到的下半屏

## 提示词

检查{页面}的点击区域：触屏下所有可点元素热区 ≥ 44×44px，桌面 ≥ 24×24px；小图标用 padding 或 ::before 扩大热区，视觉尺寸不变；相邻目标间距 ≥ 8px、热区不重叠；列表行整行可点；删除等危险操作与常用操作拉开距离；纯图标按钮补 aria-label；在 390px 宽和 200% 缩放下检查不误触、不重叠。

## 示例

<style>
.s{height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:20px;padding:16px;background:#fff;color:#1f2329;font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.r{display:flex;align-items:center;gap:20px;width:100%;max-width:440px}
.g{display:flex;flex:none}
small{line-height:1.4}
.no{color:#d92d20}
.ok{color:#12805c}
svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.x{position:relative;gap:4px;width:148px;justify-content:center}
.x i{display:grid;place-items:center;width:16px;height:16px;outline:1px dashed #d92d20}
.x::after{content:"";position:absolute;left:50%;top:50%;width:44px;height:44px;margin:-22px;border-radius:50%;background:rgba(217,45,32,.16)}
.o{gap:8px}
.o button{width:44px;height:44px;display:grid;place-items:center;border:0;border-radius:8px;background:transparent;color:#1f2329;outline:1px dashed #12805c;outline-offset:-1px;cursor:pointer}
.o button svg{width:20px;height:20px}
.o button:hover{background:#f0f2f5}
.o button:focus-visible{outline:2px solid #3b5bdb;outline-offset:2px}
</style>

<div class="s"><div class="r"><div class="g x" aria-hidden="true"></div><small class="no">✗ 热区 16、间距 4：一个指尖盖住三个</small></div><div class="r"><div class="g o"></div><small class="ok">✓ 图标 20、热区 44、间距 8</small></div></div>

<script type="module">
export default function demo(root) {
  const ic = [['编辑', 'M4 20h4L19 9l-4-4L4 16z'], ['复制', 'M8 8h12v12H8zM16 8V4H4v12h4'], ['删除', 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13']];
  const svg = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  root.querySelector('.x').innerHTML = ic.map(([, d]) => `<i>${svg(d)}</i>`).join('');
  root.querySelector('.o').innerHTML = ic.map(([n, d]) => `<button type="button" aria-label="${n}">${svg(d)}</button>`).join('');
}
</script>
