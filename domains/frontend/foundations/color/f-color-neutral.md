---
zh: 中性色与表面层级
en: Neutrals & surfaces
order: 20
---

## 是什么

中性色撑起九成界面：页面、卡片、浮层逐级区分，文字分四档深浅。

## 适合

所有界面的底色、边框、文字层级；先定中性色，再加品牌色。

## 不适合

不要用极浅的灰色写正文来显得“高级”；也不要一个页面里出现五六种临时拼出来的灰。

## 要点

- 表面分四层：surface-page（页面）→ base（区块）→ raised（卡片、输入框）→ overlay（浮层），相邻层只差一点明度
- 文字分四档：主要 ≥ 7:1，次要 ≥ 4.5:1，占位略浅于次要但对输入框底仍 ≥ 4.5:1，禁用只给禁用控件
- 边框分三档：border-subtle 用于卡片与分割线，border-control 用于输入框（≥ 3:1），border-strong 用于控件悬停
- 后台和工具类产品中性色几乎纯灰；官网和风格化页面可以给中性色加一点品牌色相
- 版权、时间戳、辅助说明是要读的信息，至少用次要文字色，不用禁用色
- 彩色或深色色块上的次要文字和边框从该底色同色相派生，不用中性灰
- 普通分组优先用背景差和间距区分，不必到处画线

## 提示词

为{项目}定义中性色令牌：表面四层 surface-page / base / raised / overlay，相邻层只差约 2% 明度；文字四档 text-primary（≥ 7:1）、secondary（≥ 4.5:1）、placeholder、disabled（只给禁用控件）；边框三档 border-subtle / control（≥ 3:1）/ strong；中性色几乎纯灰，{是否加品牌色相}；暗色另给一套同名令牌；组件不写临时灰值。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:24px;padding:16px;background:#fff;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.pg{position:relative;flex:0 1 210px;height:min(150px,100%);padding:24px 12px 12px;border-radius:10px;background:#f5f6f8;border:1px solid #e3e6eb}
em{position:absolute;top:6px;left:10px;font:12px/1 ui-monospace,Menlo,monospace;color:#5b616e;font-style:normal}
.cd{position:relative;height:100%;padding:24px 12px 0;border-radius:8px;background:#fff;border:1px solid #e3e6eb}
.ln{height:8px;width:70%;margin-bottom:8px;border-radius:4px;background:#e9ecf0}
.ln.b{width:50%}
.ov{position:absolute;right:-16px;bottom:-12px;width:62%;padding:24px 10px 2px;border-radius:8px;background:#fff;box-shadow:0 2px 4px rgba(25,35,60,.06),0 10px 24px rgba(25,35,60,.14)}
ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
li{display:flex;align-items:center;gap:8px;white-space:nowrap}
li b{width:12px;height:12px;border-radius:3px}
li span{margin-left:auto;padding-left:12px;font-size:12px;color:#5b616e;font-variant-numeric:tabular-nums}
</style>

<div class="s"><div class="pg"><em>page</em><div class="cd"><em>raised</em><div class="ln"></div><div class="ln b"></div><div class="ov"><em>overlay</em><div class="ln"></div></div></div></div><ul><li><b style="background:#1f2329"></b>主要文字<span>15.8:1</span></li><li style="color:#5b616e"><b style="background:#5b616e"></b>次要文字<span>6.2:1</span></li><li style="color:#6f7581"><b style="background:#6f7581"></b>占位文字<span>4.6:1</span></li><li style="color:#a8adb7"><b style="background:#a8adb7"></b>禁用文字<span>仅控件</span></li></ul></div>
