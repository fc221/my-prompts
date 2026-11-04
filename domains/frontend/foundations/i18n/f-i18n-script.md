---
zh: 带声调的文字
en: Scripts with stacked marks
order: 20
---

## 是什么

越南语、泰语、缅甸语、印地语等文字有叠在字母上下的声调和元音符号，会伸出拉丁字母的高度；行高和容器高度要给它们留出空间。

## 适合

界面要支持东南亚、南亚语言，或者用户名、地址这类内容可能出现这些文字。

## 不适合

只有中英文的界面不必改字号体系，但仍然不要用固定高度裁文字。

## 注意

最常见的写法 height: 16px; line-height: 16px; overflow: hidden，在中文里看不出问题，换成越南语的叠加声调、泰语的声调符号、缅甸语写在字母下方的元音，上下的符号会被削掉一截。

## 要点

- 按钮、标签、徽标用上下 padding 撑高，不用固定 height 加等值 line-height 去居中
- 正文行高用无单位数值，支持这些语言时不低于 1.5；标题不低于 1.3
- 装文字的容器不加 overflow: hidden；要截断时用 line-clamp，并按实际行高留够容器高度
- 输入框用 min-height，不写死 height，内容可能比中文高
- 字体栈给这些语言留回退字体，并在对应字体下实际截图检查
- 元素上标 lang（vi、th、my、hi），浏览器才会选对字形和断行规则

## 提示词

检查{页面}在越南语、泰语、缅甸语下的文字空间：按钮、标签、徽标改用上下 padding 撑高，去掉固定 height + 等值 line-height 的写法；正文行高用无单位 1.5 以上，标题 1.3 以上；装文字的容器去掉 overflow: hidden，需要截断时用 line-clamp 并按行高留够高度；输入框改用 min-height；外文片段标上 lang；用这三种语言各写一条长文案截图，确认字母上下的符号没有被削掉。

## 示例

<style>
.s{height:100%;display:grid;place-items:center;padding:12px 16px;background:#fff;color:#1f2329;font:13px/1.5 system-ui,"PingFang SC",sans-serif}
.g{display:grid;grid-template-columns:auto auto auto;gap:10px 16px;align-items:center}
.g>em{font-style:normal;font-size:12px;font-weight:600}
.x{color:#b42318}
.o{color:#0f7352}
.g>span{font-size:12px;color:#5b616e}
b{justify-self:start;padding:0 10px;border-radius:999px;background:#e8efff;color:#1d4ed8;font-size:15px;font-weight:600;white-space:nowrap}
.bad{height:16px;line-height:16px;overflow:hidden}
.ok{padding-block:4px;line-height:1.5}
@container (max-width:320px){.g{column-gap:8px}
b{padding-inline:8px;font-size:14px}
}
</style>

<div class="s"><div class="g">
  <span></span><em class="x">✗ 写死高度 16px</em><em class="o">✓ 上下内边距撑高</em>
  <span>越南语</span><b class="bad" lang="vi">MIỄN PHÍ</b><b class="ok" lang="vi">MIỄN PHÍ</b>
  <span>泰语</span><b class="bad" lang="th">ซื้อเลย</b><b class="ok" lang="th">ซื้อเลย</b>
  <span>缅甸语</span><b class="bad" lang="my">ယခုဝယ်ပါ</b><b class="ok" lang="my">ယခုဝယ်ပါ</b>
</div></div>
