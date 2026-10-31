---
zh: 通配符查找替换
en: Wildcard find and replace
aka: 通配符 查找替换 批量替换 删除空行 删除多余空格 ^p ^13 \1 批量套样式 手动换行 清理格式
order: 40
---

## 是什么

查找和替换（Ctrl+H → 更多）里勾选“使用通配符”后，可以按模式查找：任意字符、字符范围、重复次数、分组，替换时再用 \1、\2 把分组重新拼起来。从网页、PDF、聊天记录粘贴来的文档，几秒钟就能清掉空行、空格和手敲编号，还能把找到的段落批量套上样式。

## 适合

接手格式混乱的长文档，套样式之前先清理；统一日期、单位、标点的写法；把手敲“一、”“（一）”的段落批量设成标题样式。

## 不适合

规则复杂、要批量处理很多文件的，用脚本处理，看「读取与提取内容」；只替换一个固定词语的，不必开通配符。

## 注意

通配符模式下 ( ) [ ] * ? @ < > ! \ 都是特殊字符，要找它们本身得在前面加反斜杠（如 \( ）；查找框里段落标记写 ^13（^p 在这里不能用），替换框里照常写 ^p。全部替换前先点“在以下项中查找 → 主文档”看命中了多少、命中了什么；替换结果不对，Ctrl+Z 一步撤销。

## 要点

- 符号：? 任意一个字符；* 任意多个字符（到最近的下一个目标为止）；[ ] 其中之一，如 [0-9]、[一-龥]（汉字）；[! ] 不在其中；@ 前一个字符重复一次或多次；( ) 分组，替换里用 \1、\2 引用；^& 代表找到的全部内容；需要精确次数时用花括号写次数（n 次、n 到 m 次、至少 n 次）。
- 删多余空行：查找 ^13 加“至少 2 次”的次数限定，替换为 ^p；粘贴来的手动换行（↓）先在普通模式下把 ^l 替换成 ^p。
- 删段首空格：查找 ^13[ 　]@（方括号里一个半角空格、一个全角空格），替换为 ^p，缩进交给样式里的首行缩进。
- 删汉字之间的空格：查找 ([一-龥]) ([一-龥])，替换为 \1\2；连续几个字之间的空格一遍会漏掉一半，执行两遍。
- 日期统一：查找 ([0-9]@)-([0-9]@)-([0-9]@)，替换为 \1年\2月\3日；电话、编号也可能命中，先看一遍命中结果。
- 批量套样式：查找 [一二三四五六七八九十]@、*^13，替换为 ^&，再点“格式 → 样式”选标题 1，命中的段落都变成标题 1；随后删掉手敲的“一、”，编号交给「多级编号」。
- 只改格式：查找内容留空，点“格式”指定条件（如字体为楷体、字号 14），替换为里指定新样式；也可以先选中全部命中，再在样式库里点一下。
- 常用规则存成一页“替换清单”，或录成宏绑到快捷键，整理同类文档时照单执行。

## 提示词

帮我清理{文档名称}的格式：先用查找替换处理，再套样式，文字内容不变。请给出逐条规则，标明是否勾选“使用通配符”，按顺序执行：
1. 普通模式：手动换行 ^l 替换为段落标记 ^p。
2. 通配符模式：连续 2 个以上的段落标记合并成一个；删除段首的半角和全角空格；删除汉字之间的空格（执行两遍）。
3. 日期统一写成“{日期格式，如 2026年10月9日}”；{其他统一规则，如 “万元”前不留空格、英文括号改为中文括号}。
4. 以“一、”“（一）”“1.”开头的段落分别套标题 1、标题 2、标题 3，然后删掉这些手敲编号，改用多级列表自动编号。
5. 每条规则写明查找内容、替换为、要设的格式，并提醒我替换前先核对命中数。文档很长或要处理 {文件数量} 个文件时，改写成一个 VBA 宏或 python-docx 脚本，执行前先备份原文件。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:16px;align-items:flex-start}
.m-l{display:grid;gap:10px;width:300px}
.m-dlg{border:1px solid #c9ced6;border-radius:6px;background:#fff;color:#344054;font:11px/1.35 system-ui,"PingFang SC",sans-serif;box-shadow:0 8px 22px -10px rgba(16,24,40,.35);overflow:hidden}
.m-dlg>p{margin:0;padding:6px 10px;border-bottom:1px solid #e4e7ec;background:#f6f7f9;color:#101828;font-weight:650}
.m-tabs{display:flex;gap:14px;padding:6px 10px 0;border-bottom:1px solid #e4e7ec}
.m-tabs span{padding-bottom:4px;color:#667085}
.m-tabs span.on{color:#2b579a;font-weight:650;box-shadow:inset 0 -2px #2b579a}
.m-fm{display:grid;grid-template-columns:52px minmax(0,1fr);gap:6px 8px;align-items:center;padding:9px 10px 6px}
.m-fm b{font-weight:400;color:#475467}
.m-fm code{display:block;padding:3px 6px;border:1px solid #d0d5dd;border-radius:3px;background:#fff;color:#101828;font:11.5px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap;overflow:hidden}
.m-fm code.on{border-color:#2b579a;box-shadow:0 0 0 2px rgba(43,87,154,.15)}
.m-ck{display:flex;align-items:center;gap:6px;padding:0 10px 8px 70px;color:#101828}
.m-ck::before{content:"✓";display:grid;place-items:center;width:12px;height:12px;border-radius:2px;background:#2b579a;color:#fff;font-size:9px}
.m-bt{display:flex;justify-content:flex-end;gap:6px;padding:7px 10px;border-top:1px solid #e4e7ec;background:#fafbfc}
.m-bt span{padding:2px 9px;border:1px solid #d0d5dd;border-radius:4px;background:#fff;color:#344054}
.m-bt span.pri{border-color:#2b579a;background:#2b579a;color:#fff}
.m-ba{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:6px;padding:8px 10px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1);font:11.5px/1.5 "Songti SC","SimSun",serif;color:#111}
.m-ba s{color:#b42318;text-decoration-color:rgba(180,35,24,.5)}
.m-ba u{color:#1d3f75;text-decoration:none;background:#eaf1fb;padding:0 2px}
.m-ba i{color:#98a2b3;font:12px/1 system-ui;font-style:normal}
.m-cs{width:286px;border:1px solid #c9ced6;border-radius:6px;background:#fff;color:#344054;font:10.5px/1.35 system-ui,"PingFang SC",sans-serif;overflow:hidden}
.m-cs>p{margin:0;padding:6px 10px;border-bottom:1px solid #e4e7ec;background:#f6f7f9;color:#101828;font-weight:650;font-size:11px}
.m-r{display:grid;gap:2px;padding:6px 10px;border-bottom:1px solid #f0f2f5}
.m-r code{color:#101828;font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap}
.m-r code em{color:#2b579a;font-style:normal}
.m-r span{color:#667085}
.m-r code i{color:#b54708;font-style:normal}
.m-sym{display:flex;flex-wrap:wrap;gap:4px 10px;padding:7px 10px;color:#475467}
.m-sym b{color:#2b579a;font:600 11px/1 ui-monospace,Menlo,monospace}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const dlg = '<div class="m-dlg"><p>查找和替换</p><div class="m-tabs"><span>查找</span><span class="on">替换</span><span>定位</span></div><div class="m-fm">'
    + '<b>查找内容</b><code class="on">([0-9]@)-([0-9]@)-([0-9]@)</code><b>替换为</b><code>\\1年\\2月\\3日</code></div><p class="m-ck">使用通配符</p>'
    + '<div class="m-bt"><span>查找下一处</span><span>替换</span><span class="pri">全部替换</span></div></div>';
  const ba = '<div class="m-ba"><span>签约日期 <s>2026-10-9</s></span><i>→</i><span>签约日期 <u>2026年10月9日</u></span></div>';
  const rows = [
    ['^13{2,}', '^p', '多个空行合成一个'],
    ['^13[<i>␣□</i>]@', '^p', '删段首空格（␣ 半角，□ 全角）'],
    ['([一-龥])<i>␣</i>([一-龥])', '\\1\\2', '删汉字之间的空格，做两遍'],
    ['[一二三四五六七八九十]@、*^13', '^& + 标题 1', '手敲“一、”的段落套标题 1'],
  ];
  const cs = '<div class="m-cs"><p>常用规则（勾选使用通配符）</p>' + rows.map(([f, r, t]) => '<div class="m-r"><code>' + f + '　<em>→</em>　' + r + '</code><span>' + t + '</span></div>').join('')
    + '<div class="m-sym"><span><b>?</b> 一个字符</span><span><b>*</b> 任意串</span><span><b>@</b> 重复</span><span><b>[ ]</b> 其中之一</span><span><b>( )</b> 分组 \\1</span><span><b>\\</b> 转义</span></div></div>';
  draw(root, '<div class="m-wrap"><div class="m-l">' + dlg + ba + '</div>' + cs + '</div>', { center: true, min: 0.35 });
}
</script>
