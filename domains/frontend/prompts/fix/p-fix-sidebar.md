---
zh: 优化侧栏细节
en: Polish a clumsy sidebar
aka: 侧栏看着别扭
order: 170
---

## 是什么

症状：侧栏功能齐全，但标题、菜单、账号区左右对不齐，图标忽大忽小，行挤在一起，看不出哪几项是一组。

## 要点

- 只理尺寸和间距，内容、配色、交互都不动；适合“功能对、样子别扭”的侧栏。
- 附一张现状截图效果更好。
- 要重新设计结构（分组、收起、二级菜单）改用「侧栏导航」。

## 提示词

侧栏看着别扭。请只理顺尺寸和间距，不改菜单内容、配色和交互：
1. 左右对齐：侧栏左右内边距统一（如 12px）；顶部标题区、组名、菜单项、底部账号区的图标和文字落在同一条左边线上，右侧的数字徽标、箭头也对齐同一条右边线。
2. 图标比文字略小：文字 14px 时图标 16–18px，全栏同一尺寸、同一线宽；图标与文字的间距全栏一致（如 10px）。
3. 行要松、好点：菜单项高 36–40px，文字垂直居中，整行都是点击区域，不只是文字那一截。
4. 靠间距分组：同组菜单项之间 2–4px，组与组之间 20–24px，组间距要明显大于组内间距；组名 12px 次要色，离下方菜单近、离上方远；不靠分割线区分。
5. 收成少数几个值：字号只用 12 / 14（标题可用 16），间距只用 4 的倍数；菜单项、当前项高亮底、悬停底用同一个圆角（6–8px）和同样的左右缩进；搜索框、账号卡片、提示卡这些同级面板圆角一致。
6. 底部账号区和菜单区左右留白相同，头像中心和菜单图标中心对齐。
7. 改完截前后对比图，逐条列出改了哪些尺寸和间距，并确认内容和配色没有变。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:0}
.sb{position:relative;width:120px;max-width:100%;height:100%;background:#f7f8fa;border-right:1px solid #e3e6eb;color:#1f2329;font-size:9px;line-height:12px}
.lg{display:flex;align-items:center;gap:6px;font-weight:600}
.lg i{display:block;flex:none;border-radius:3px;background:#3b5bdb}
.gl{color:#8a909c;font-size:8px}
.it{display:flex;align-items:center;gap:6px;color:#3a3f48;white-space:nowrap}
.it i{display:block;flex:none;border:1.5px solid currentColor;border-radius:2px}
.it i.r{border-radius:50%}
.it.on{background:#e7ecfb;color:#3b5bdb;font-weight:600}
.it em{margin-left:auto;padding:0 3px;border-radius:5px;background:#e03131;color:#fff;font-style:normal;font-size:7px;line-height:10px}
.ac{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:6px;border-top:1px solid #e3e6eb}
.ac i{display:block;flex:none;border-radius:50%;background:linear-gradient(135deg,#74c0fc,#3b5bdb)}
/* 改前：左边线不齐、图标忽大忽小、行挤在一起、靠分割线分组、徽标没靠右、头像和图标对不上 */
.bad .lg{padding:5px 4px}
.bad .lg i{width:12px;height:12px}
.bad .gl{padding:3px 10px 1px}
.bad .it{height:14px;padding:0 6px 0 8px}
.bad .it:nth-child(3){padding-left:5px}
.bad .it:nth-child(3) i{width:10px;height:10px}
.bad .it:nth-child(4) i{width:6px;height:6px}
.bad .it:nth-child(4) em{margin-right:10px}
.bad .it:nth-child(7){padding-left:11px;gap:3px}
.bad .it:nth-child(8) i{width:9px;height:9px;border-width:1px}
.bad .dv{height:1px;margin:3px 0;background:#e3e6eb}
.bad .ac{padding:4px 3px}
.bad .ac i{width:14px;height:14px}
/* 改后：左右内边距 8，图标统一 8px，行高 16 整行可点，组内 2 组间 10，徽标靠右，头像中心对齐图标中心 */
.good .lg{height:20px;padding:0 8px}
.good .lg i{width:10px;height:10px;margin:0 -1px}
.good .gl{padding:8px 8px 2px}
.good .it{height:16px;margin:0 4px;padding:0 4px;border-radius:5px}
.good .it+.it{margin-top:2px}
.good .it i{width:8px;height:8px}
.good .ac{height:22px;padding:0 8px}
.good .ac i{width:12px;height:12px;margin-left:-2px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="sb"><div class="lg"><i></i>门店后台</div><div class="it on"><i></i>概览</div><div class="it"><i class="r"></i>会员</div><div class="it"><i></i>工单<em>3</em></div><div class="dv"></div><div class="gl">设置</div><div class="it"><i></i>门店</div><div class="it"><i class="r"></i>账号</div><div class="ac"><i></i>王店长</div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="sb"><div class="lg"><i></i>门店后台</div><div class="it on"><i></i>概览</div><div class="it"><i class="r"></i>会员</div><div class="it"><i></i>工单<em>3</em></div><div class="gl">设置</div><div class="it"><i></i>门店</div><div class="it"><i class="r"></i>账号</div><div class="ac"><i></i>王店长</div></div></div></div></section>
</div>
