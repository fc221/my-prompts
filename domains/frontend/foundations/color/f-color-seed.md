---
zh: 由品牌色生成色阶与语义令牌
en: Color scale & tokens
order: 10
---

## 是什么

从一个品牌色派生 12 级色阶，再映射成按钮、文字、边框等语义令牌。

## 适合

新项目建立配色；已有页面颜色散乱、近似色太多需要收敛时。

## 不适合

不要拿取色器从品牌色手调十几个近似色；组件里不写十六进制色值，只引用语义名。

## 要点

- 色阶用途固定：1–2 级页面背景，3–5 级组件底色（常态 / 悬停 / 选中），6–8 级边框，9 级实心按钮，10 级按钮悬停，11 级低对比文字，12 级高对比文字
- 组件只引用语义令牌（accent、accent-text、accent-soft、border-control 等），不写色值
- 按钮底用 9 级 accent 配 text-on-accent，链接和强调文字用 11 级 accent-text，两者不混用
- 品牌色在一屏里的面积约 10% 以内：主按钮、当前项、链接、焦点
- 暗色另生成一套色阶，同名令牌换值，不做反相
- 每个“文字 / 底色”组合都核对对比度：正文 ≥ 4.5:1，控件边界与焦点 ≥ 3:1
- 想调颜色就换种子色重新生成，不手改单个色阶

## 提示词

为{项目}建立配色令牌：以品牌色 {品牌色} 为种子生成 12 级色阶（明暗各一套），中性色和四种状态色同样处理；映射成语义令牌（surface、text、border、accent、accent-text、accent-soft、focus-ring）；主按钮用 accent，链接用 accent-text；正文对比度 ≥ 4.5:1、边界与焦点 ≥ 3:1；输出亮色、系统暗色、data-theme="dark" 三块变量，组件只引用语义名。

## 示例

<style>
.s{--c:#3b5bdb;--s3:color-mix(in oklab,var(--c) 16%,#fff);--s7:color-mix(in oklab,var(--c) 60%,#fff);--s11:color-mix(in oklab,var(--c),#000 32%);height:100%;display:grid;place-items:center;padding:12px 16px;background:#f5f6f8;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.w{width:100%;max-width:560px;display:grid;gap:8px}
.top{display:flex;align-items:center;gap:8px;color:#5b616e}
.top small{margin-left:auto;font-size:12px}
.top button{width:22px;height:22px;padding:0;border:2px solid #fff;border-radius:50%;background:var(--k);box-shadow:0 0 0 1px #c9ced6;cursor:pointer}
.top button[aria-pressed=true]{box-shadow:0 0 0 2px #1f2329}
.top button:focus-visible{outline:2px solid #1f2329;outline-offset:3px}
.bar{display:flex;gap:2px;height:40px;border-radius:8px;overflow:hidden}
.bar span{flex:1;display:grid;place-items:center;font-size:12px;color:#1f2329}
.bar span:nth-child(n+8){color:#fff}
.lab{display:flex;gap:4px;font-size:12px;color:#5b616e;text-align:center}
.lab span{border-top:2px solid #d5d9e0;padding-top:2px}
.ex{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.ex b{height:32px;padding:0 16px;display:inline-flex;align-items:center;border-radius:6px;background:var(--c);color:#fff;font-weight:600}
.ex a{color:var(--s11);text-decoration:underline;text-underline-offset:.2em}
.ex i{height:28px;padding:0 12px;display:inline-flex;align-items:center;border-radius:6px;font-style:normal;background:var(--s3);color:var(--s11);box-shadow:inset 0 0 0 1px var(--s7)}
</style>

<div class="s"><div class="w"><div class="top"><span>种子色</span><button style="--k:#3b5bdb" aria-label="品蓝" aria-pressed="true"></button><button style="--k:#0f9d8a" aria-label="青绿" aria-pressed="false"></button><button style="--k:#9c3d6b" aria-label="梅子" aria-pressed="false"></button><small>点色块切换</small></div><div class="bar"></div><div class="lab"><span style="flex:2">背景</span><span style="flex:3">组件底</span><span style="flex:3">边框</span><span style="flex:2">实心</span><span style="flex:2">文字</span></div><div class="ex"><b>主按钮</b><a>链接文字</a><i>选中底</i></div></div></div>

<script type="module">
export default function demo(root) {
  const s = root.querySelector('.s'), btns = root.querySelectorAll('.top button');
  // 1–8 级与白色混合，9 级就是种子色，10–12 级与黑色混合
  const mix = [5, 10, 16, 24, 34, 46, 60, 78, 100, -12, -32, -58];
  root.querySelector('.bar').innerHTML = mix.map((m, i) => `<span style="background:${m > 0 ? `color-mix(in oklab,var(--c) ${m}%,#fff)` : `color-mix(in oklab,var(--c),#000 ${-m}%)`}">${i + 1}</span>`).join('');
  btns.forEach((b) => (b.onclick = () => {
    s.style.setProperty('--c', b.style.getPropertyValue('--k'));
    btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));
}
</script>
