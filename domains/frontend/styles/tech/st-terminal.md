---
zh: 终端命令行
en: Terminal
aka: 命令行风 TUI CLI 黑客风 绿屏 磷光屏
order: 30
---

## 是什么

整页都是等宽字：近黑底上一种磷光绿文字，$ 提示符、闪烁的方块光标、细线框面板和方括号按钮，界面像在终端里运行的程序。

## 适合

命令行工具和开源项目官网、开发者活动页、运维状态页、技术博客、招聘彩蛋页，以及想要“极客感”的 404 和更新日志。

## 不适合

要配真实产品截图、面向企业采购的开发者平台官网，改用「科技深色」；要霓虹、故障和夜城氛围的活动海报，用「赛博霓虹」；满屏图表和读数的监控大屏，用「科幻大屏」。

## 注意

这个风格的全部识别度来自“一种字体、一种颜色、只有字符”：加了圆角卡片、渐变或无衬线标题就变成普通深色页。中文在等宽字体里占两格，对齐表格用 CSS 网格分列，不要靠敲空格。

## 要点

- 配色：近黑底 #0b100c，磷光绿 #4af06a 做正文（对底 12.8:1），暗绿 #2f9e4f 做注释和次要信息（5.6:1），线框 #1f5c33；只加琥珀 #ffb43b 表示警告、红 #ff6b5e 表示错误；也可以整套换成琥珀单色
- 字体：全站等宽，推荐 JetBrains Mono 或 IBM Plex Mono，后备 ui-monospace、"SF Mono"、Menlo、Consolas、"PingFang SC"、monospace；正文 14–15px / 行高 1.6，标题只放大到 20–28px，字重 700，不换字体
- 结构：面板用 1px 线框，标题压在上边框上（像 fieldset 的 legend）；圆角 0、无阴影、无渐变；分隔可以用一行 ─ 或 = 字符
- 提示符和光标：命令行前固定 $ 或 >，结尾放 0.6em 宽的方块光标，steps(1) 每 1s 闪一次
- 按钮：写成 [1] 详情、[q] 退出 这样的方括号文字，悬停和键盘焦点时反白（绿底黑字），数字键直接触发对应操作
- 发光：最多 text-shadow 0 0 6px rgba(74,240,106,.35) 一层；扫描线条纹透明度不超过 6%，只铺在装饰层
- 动效：首屏命令逐字打出，每字 30–50ms，输出逐行出现，整段 1.5s 内结束；减少动态效果时直接显示结果，光标常亮不闪
- 窄屏：面板去掉左右边框只留上下线，长命令在容器内横向滚动，表格最多保留 3 列

## 提示词

把{产品}的{页面}做成终端命令行风：近黑底 #0b100c，全站一种等宽字体（JetBrains Mono，后备 ui-monospace、Menlo、Consolas、PingFang SC），正文磷光绿 #4af06a 14px / 1.6，注释暗绿 #2f9e4f，警告琥珀 #ffb43b、错误红 #ff6b5e，不再加别的颜色；面板用 1px #1f5c33 线框、标题压在上边框，圆角 0、无阴影无渐变；首屏写成一段会话：$ {命令} 逐字打出（每字 40ms），结果逐行出现，最后一行是闪烁的方块光标（steps(1)、1s）；表格用 CSS 网格分列，状态用 ● ▲ ✗ 字符配颜色；操作做成 [1] {操作名} 这样的方括号按钮，悬停和焦点时反白，支持按数字键触发；发光最多一层 6px 文字阴影；减少动态效果时直接显示结果、光标常亮；窄屏面板只留上下线、长命令横向滚动。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;padding:12px 14px 10px;overflow:hidden;background:#0b100c;color:#4af06a;font:11px/1.55 "JetBrains Mono",ui-monospace,"SF Mono",Menlo,Consolas,"PingFang SC",monospace;text-shadow:0 0 6px rgba(74,240,106,.35)}
.s::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(rgba(74,240,106,.05) 0 1px,transparent 1px 3px);pointer-events:none}
.pn{position:relative;height:100%;display:flex;flex-direction:column;padding:8px 10px 6px;border:1px solid #1f5c33}
.lg{position:absolute;left:8px;top:-9px;padding:0 6px;background:#0b100c;font-weight:700}
.tm{position:absolute;right:8px;top:-9px;padding:0 6px;background:#0b100c;color:#2f9e4f}
p{margin:0}
.d{color:#2f9e4f}
.out{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;column-gap:12px;max-width:34em;margin:2px 0 2px 2ch}
.out .h{color:#2f9e4f}
.out .r{text-align:right}
.wn{color:#ffb43b}
.lg2{display:none}
.cur{display:inline-block;width:.6em;height:1.1em;vertical-align:-.2em;background:#4af06a;animation:bk 1s steps(1) infinite}
.mn{display:flex;flex-wrap:wrap;gap:2px 10px;margin-top:auto}
button{padding:0 2px;border:0;background:none;color:#4af06a;font:inherit;text-shadow:inherit;cursor:pointer}
button:hover,button:focus-visible{outline:0;background:#4af06a;color:#0b100c;text-shadow:none}
.msg{position:absolute;right:10px;bottom:6px;color:#2f9e4f}
.out>*,.ln{transition:opacity .05s}
.hide{opacity:0}
@keyframes bk{50%{opacity:0}
}
@container (min-height:260px){.s{padding:18px 20px 14px;font-size:13px}
.pn{padding:12px 16px 10px}
.lg,.tm{top:-10px}
.lg2{display:block}
}
@media (prefers-reduced-motion:reduce){.cur{animation:none}
}
</style>

<div class="s">
  <div class="pn">
    <span class="lg">门店巡检 v2.4</span><span class="tm">14:32</span>
    <p><span class="d">$</span> <span class="ty">shop status --city 杭州</span><b class="cur" aria-hidden="true"></b></p>
    <div class="out">
      <span class="h">门店</span><span class="h">状态</span><span class="h r">今日订单</span>
      <span>西湖店</span><span>● 正常</span><span class="r">1,284</span>
      <span>滨江店</span><span>● 正常</span><span class="r">962</span>
      <span>萧山店</span><span class="wn">▲ 延迟</span><span class="r">311</span>
    </div>
    <p class="ln d"># 3 家门店，1 家响应超过 2s</p>
    <p class="ln lg2"><span class="d">$</span> shop log 萧山店 --tail 2</p>
    <p class="ln lg2 wn">14:31:58 WARN /api/pay 耗时 2.3s</p>
    <p class="ln lg2 d">14:32:04 INFO 补单完成 18 笔</p>
    <p class="ln"><span class="d">$</span> <span class="end"></span></p>
    <div class="mn"><button type="button" data-k="1">[1] 详情</button><button type="button" data-k="2">[2] 日志</button><button type="button" data-k="q">[q] 退出</button></div>
    <p class="msg" role="status"></p>
  </div>
</div>

<script type="module">
export default function demo(root) {
  const ty = root.querySelector('.ty'), cur = root.querySelector('.cur'), end = root.querySelector('.end'), msg = root.querySelector('.msg');
  const cmd = ty.textContent, rows = [...root.querySelectorAll('.out>*:not(.h), .ln')];
  const btns = [...root.querySelectorAll('.mn button')];
  btns.forEach((b) => (b.onclick = () => { msg.textContent = '> ' + b.textContent.slice(4); }));
  root.addEventListener('keydown', (e) => btns.find((b) => b.dataset.k === e.key)?.click());
  const finish = () => { ty.textContent = cmd; rows.forEach((r) => r.classList.remove('hide')); end.after(cur); };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return finish();
  ty.textContent = ''; rows.forEach((r) => r.classList.add('hide'));
  let i = 0;
  const step = () => {
    if (!root.host.isConnected) return;
    if (i < cmd.length) { ty.textContent = cmd.slice(0, ++i); return setTimeout(step, 30); }
    const r = rows.find((x) => x.classList.contains('hide'));
    if (!r) return end.after(cur);
    r.classList.remove('hide'); setTimeout(step, 30);
  };
  setTimeout(step, 200);
}
</script>
