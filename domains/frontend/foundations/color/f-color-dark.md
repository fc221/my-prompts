---
zh: 暗色模式
en: Dark mode
order: 40
---

## 是什么

暗色不是反相：页面最暗，卡片、浮层逐级变亮，主按钮保持饱和品牌色。

## 适合

长时间盯屏的控制台、夜间使用的应用、用户系统设为暗色时。

## 不适合

不要用纯黑 #000 做底，也不要用滤镜把亮色页面直接反相。

## 要点

- 暗色用独立色阶：页面 surface-page 最暗（约 #111317），卡片 raised 和浮层 overlay 依次只亮 1–3% 明度
- 层级靠表面明度区分；阴影在暗色里几乎看不见，浮层改加 1px border-subtle 勾边
- 主按钮保持饱和品牌色；链接文字改用暗色色阶的 11 级，对深底 ≥ 4.5:1
- 令牌写三处：亮色、@media (prefers-color-scheme: dark) 下的 :root:not([data-theme="light"])、:root[data-theme="dark"]，同名令牌一个不少
- 声明 color-scheme，让原生控件和滚动条跟随；::selection、caret-color、accent-color、meta theme-color 一起切换
- 同样字重在深底上显得更粗：暗色下字重减一档（500 → 400，600 → 500），避免浅字发胖，大段正文不用 600 以上
- 图片、插画、图表配色在暗色下单独检查，必要时降低亮度或换一套

## 提示词

为{项目}加暗色模式：用独立的暗色色阶，不反相、不用纯黑；页面最暗，卡片、浮层逐级亮 1–3%，层级靠表面明度和 1px 浅边框；主按钮保持饱和品牌色 {品牌色}，链接与强调文字换成对深底 ≥ 4.5:1 的色值；令牌在亮色、系统暗色、data-theme="dark" 三处定义完整；声明 color-scheme，原生控件、滚动条、选中文字、光标跟随主题；暗色下字重减一档；提供跟随系统 / 亮 / 暗三档切换并记住选择。

## 示例

<style>
.s{height:100%;display:flex;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.p{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:8px;padding:12px 16px;background:var(--pg);color:var(--t1)}
.lt{--pg:#f5f6f8;--cd:#fff;--ln:#e3e6eb;--bc:#868c98;--t1:#1f2329;--t2:#5b616e;--in:#fff}
.dk{--pg:#111317;--cd:#1a1d23;--ln:#2c3139;--bc:#6b7380;--t1:#e8eaee;--t2:#a3a9b5;--in:#22262d}
small{font-size:12px;color:var(--t2)}
.c{display:grid;gap:8px;padding:16px;border-radius:12px;background:var(--cd);border:1px solid var(--ln)}
.c b{font-size:15px}
.c span{margin-top:-6px;color:var(--t2);font-size:12px}
.r{display:flex;gap:8px}
.in{flex:1;min-width:0;height:32px;display:flex;align-items:center;padding:0 12px;border-radius:6px;background:var(--in);border:1px solid var(--bc);color:var(--t2);white-space:nowrap;overflow:hidden}
button{height:32px;padding:0 12px;border:0;border-radius:6px;background:#3b5bdb;color:#fff;font:inherit;font-weight:600}
.s{container-type:inline-size}
.c{grid-template-columns:minmax(0,1fr)}
button{flex:none}
@container (max-width:400px){.p{padding:10px}
.c{padding:12px}
.in{padding:0 8px}
button{padding:0 10px}
}
</style>

<div class="s"><div class="p lt"><small>亮色</small><div class="c"><b>本周报告</b><span>已同步 12 个项目</span><div class="r"><div class="in">搜索</div><button>查看</button></div></div></div><div class="p dk"><small>暗色</small><div class="c"><b>本周报告</b><span>已同步 12 个项目</span><div class="r"><div class="in">搜索</div><button>查看</button></div></div></div></div>
