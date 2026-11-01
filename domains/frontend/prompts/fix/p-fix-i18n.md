---
zh: 修复多语言排版
en: Layout breaks after translation
aka: 换语言后排版坏了
order: 130
---

## 是什么

症状：换成外文后按钮被撑破或文字被截断，越南语、泰语字母上下的符号被削掉，阿拉伯语页面没有镜像、箭头指反。

## 要点

- 用在翻译接入之后、上线之前；三条可以只发命中的。
- 细节写法见设计板块的「多语言」分类。

## 提示词

{页面}换成外文后排版坏了，请逐条修，不改视觉风格和文案内容：
1. 译文变长：按钮、标签、标签页去掉写死的 width，改成 padding + min-width；一排操作里辅助区按内容定宽，主按钮 flex: 1、min-width: 0；还放不下时先换短说法，再换图标加 aria-label，最后才允许两行，主操作不用省略号。
2. 带声调的文字：去掉固定 height + 等值 line-height 的居中写法，改用上下 padding；正文行高 1.5 以上；装文字的容器不用 overflow: hidden，截断改用 line-clamp。
3. 从右往左：根元素设 dir 和 lang，样式换成逻辑属性；表示方向的图标翻转；号码、金额、代码用 <bdi> 隔离；音视频进度保持从左往右。
改完用加长测试文案和一种从右往左的语言各截一张图，列出改了哪些组件。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px 6px;display:flex;flex-direction:column;gap:9px;font-size:8px;line-height:11px}
.k{color:#8a909c;font-size:7px;line-height:9px;margin-bottom:2px}
.b{display:inline-block;background:#3b5bdb;color:#fff;border-radius:4px;text-align:center;vertical-align:top}
.tabs{display:flex;border-bottom:1px solid #e3e6eb}
.tab{padding:2px 4px 3px;white-space:nowrap;color:#5b616e}
.tab.on{color:#3b5bdb;box-shadow:inset 0 -1.5px #3b5bdb}
.chip{display:inline-block;border:1px solid #c9ced6;border-radius:3px;color:#1f2329;font-size:10px}
.nav{display:flex;justify-content:space-between;align-items:center;height:16px;padding:0 4px;border:1px solid #e3e6eb;border-radius:4px}
.nav span{white-space:nowrap}
.nav i{font-style:normal;color:#3b5bdb}
/* 改前：按钮写死宽度被译文撑成两行、标签页被截断、声调符号被削掉、阿拉伯语没有镜像箭头指反 */
.bad .b{width:44px;padding:3px 4px;line-height:10px;overflow-wrap:anywhere}
.bad .tab{width:40px;overflow:hidden}
.bad .chip{height:13px;padding:0 5px;line-height:13px}
.bad .chip span{display:inline-block;clip-path:inset(3px 0 0 0)}
/* 改后：按钮 padding + min-width 一行放下，标签页按内容定宽，上下 padding 留出声调空间，dir=rtl 镜像 */
.good .b{min-width:44px;padding:0 8px;line-height:16px}
.good .chip{padding:3px 6px;line-height:1.5}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div><div class="k">de · 按钮</div><span class="b">Jetzt bezahlen</span></div><div><div class="k">de · 标签页</div><div class="tabs"><span class="tab on">Übersicht</span><span class="tab">Mitglieder</span></div></div><div><div class="k">vi · 标签</div><span class="chip"><span>Hoàn tất</span></span></div><div><div class="k">ar · 导航</div><div class="nav"><span><i>‹</i> رجوع</span><span>التالي <i>›</i></span></div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div><div class="k">de · 按钮</div><span class="b">Jetzt bezahlen</span></div><div><div class="k">de · 标签页</div><div class="tabs"><span class="tab on">Übersicht</span><span class="tab">Mitglieder</span></div></div><div><div class="k">vi · 标签</div><span class="chip"><span>Hoàn tất</span></span></div><div><div class="k">ar · 导航</div><div class="nav" dir="rtl" lang="ar"><span><i>›</i> رجوع</span><span>التالي <i>‹</i></span></div></div></div></div></section>
</div>
