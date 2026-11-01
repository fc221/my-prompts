---
zh: 分节与页码
en: Section breaks and page numbering
aka: 分节符 封面不编页码 页码从第三页开始 罗马数字页码 链接到前一节 首页不同 奇偶页不同 横向页面 第X页共Y页
order: 20
---

## 是什么

用分节符把文档切成几节，每节可以有自己的页码格式、起始页码、页眉页脚、纸张方向和页边距。典型用法：封面不编页码，摘要和目录用 Ⅰ、Ⅱ，正文从 1 开始。

## 适合

论文、标书、报告这类有封面、前置部分和正文的文档；中间夹着横排宽表的文档；双面打印、要求每章从奇数页开始的文档。

## 不适合

只要封面不显示页码、其余从 1 起的短文档，一节加“首页不同”就够了（见要点）；页眉页脚里放什么、怎么美化看「页眉页脚美化」。

## 注意

分节后页眉页脚默认“链接到前一节”，改一节等于改所有节：先在后一节里取消“链接到前一节”（页眉、页脚各有一个开关，要分别取消），再改内容。删除分节符时，前一节会变成后一节的版式，删之前先确认。

## 要点

- 插入：布局 → 分隔符 → 分节符“下一页”，封面末尾、目录末尾各插一个，文档分成“封面 | 摘要和目录 | 正文”三节；开始 → 显示/隐藏编辑标记（Ctrl+Shift+8）能看到“分节符(下一页)”。
- 断开链接：双击第 3 节页脚 → 取消“链接到前一节”，页眉再取消一次；第 2 节同样处理，最后删掉第 1 节（封面）的页码。
- 页码格式：插入 → 页码 → 设置页码格式；第 2 节编号格式选 Ⅰ, Ⅱ, Ⅲ…、起始页码 Ⅰ；第 3 节选 1, 2, 3…、起始页码 1，不选“续前节”。
- 只有封面不编页码：不分节，页眉页脚勾选“首页不同”，页码格式里起始页码设为 0，第二页就显示 1。
- 双面打印：勾选“奇偶页不同”，奇数页页码靠右、偶数页靠左（都在外侧），奇偶页的页眉也分别设置；每章从奇数页开始，就把章前的分节符换成“奇数页”，Word 会自动补空白页。
- 页码带章号：标题用多级列表 1 / 1.1 / 1.1.1 编号（见「多级编号」）后，在设置页码格式里勾选“包含章节号”，页码显示成“2-5”。
- 横排页：宽表前后各插一个“下一页”分节符，只把中间这节的纸张方向改为横向；这一节的页码位置要单独核对。
- “第 X 页 共 Y 页”：X 用 PAGE 域，Y 用 NUMPAGES 域（整篇页数）；只数正文的页数时，Y 改用 SECTIONPAGES，并让正文自成一节。

## 提示词

帮我给{文档名称}分节并设置页码，文档结构是：{结构，如 封面、摘要、目录、正文、参考文献、致谢}。
1. 封面后、目录后各插入“下一页”分节符：封面不显示页码；摘要和目录用罗马数字，从 Ⅰ 开始；正文到致谢用阿拉伯数字，从 1 开始。
2. 每节的页眉和页脚都先取消“链接到前一节”再改；页码放在 {页码位置，如 页脚居中}，字号 {页码字号，如 小五宋体}。
3. 打印方式：{单面或双面}。双面时开启奇偶页不同，页码放外侧，每章用“奇数页”分节符开始。
4. {需要横排的内容，如 第 3 章的门店对比表} 所在页单独成节、改为横向，其余节保持纵向。
5. 完成后按节列出：节号、包含哪些内容、页码格式和起始值；再核对目录里的页码和正文一致。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-row{display:flex;align-items:flex-end;gap:0;font:10px/1.3 system-ui,"PingFang SC",sans-serif}
.m-sec{display:grid;gap:6px}
.m-lab{display:grid;gap:1px;padding:0 2px 5px;border-bottom:2px solid var(--c,#2b579a);color:#344054}
.m-lab b{color:var(--c,#2b579a);font-size:11.5px}
.m-pgs{display:flex;gap:8px}
.m-pg{position:relative;display:grid;align-content:start;gap:4px;width:98px;height:138px;padding:14px 11px 0;background:#fff;box-shadow:0 1px 3px rgba(16,24,40,.12),0 8px 16px -8px rgba(16,24,40,.25)}
.m-pg span{display:block;height:3px;border-radius:2px;background:#dde1e7}
.m-pg span.i{margin-left:8px}
.m-pg .t{margin:0 0 3px;text-align:center;color:#111;font:700 10px/1.3 "PingFang SC","SimHei",sans-serif}
.m-pg .tl{margin:2px 0 3px;color:#111;font:700 9.5px/1.3 "PingFang SC","SimHei",sans-serif}
.m-pg .cv{margin:22px 0 4px;text-align:center;color:#111;font:700 11px/1.4 "Songti SC","SimSun",serif}
.m-pg .im{height:26px;margin:2px 10px;border-radius:2px;background:linear-gradient(135deg,#c9d7ee,#e7edf6)}
.m-ft{position:absolute;left:0;right:0;bottom:0;height:22px;border-top:1px dashed #d0d5dd;display:flex;align-items:center;justify-content:center;color:#111;font:10px/1 "Times New Roman","Songti SC",serif}
.m-ft.no{color:#98a2b3;font:9px/1 system-ui,"PingFang SC",sans-serif}
.m-ft em{position:absolute;left:0;top:-13px;padding:1px 4px;border-radius:2px 2px 0 0;background:var(--c,#2b579a);color:#fff;font:9px/1.2 system-ui,"PingFang SC",sans-serif;font-style:normal;white-space:nowrap}
.m-brk{display:grid;justify-items:center;align-self:stretch;width:30px;margin-top:38px}
.m-brk i{width:0;height:100%;border-left:2px dotted #b54708;position:relative}
.m-brk b{position:absolute;margin-top:24px;padding:3px 1px;background:#fff6ea;color:#b54708;font-size:9.5px;font-weight:600;writing-mode:vertical-rl;letter-spacing:.06em;white-space:nowrap}
.m-desk .m-note{margin:10px 0 0;text-align:center;color:#475467;font:11px/1.4 system-ui,"PingFang SC",sans-serif}
.m-note b{color:#b42318}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const lines = (n) => '<span class="i"></span>' + '<span></span>'.repeat(n);
  const pg = (inner, ft, tab) => '<div class="m-pg">' + inner + '<p class="m-ft' + (ft ? '' : ' no') + '">' + (tab ? '<em>' + tab + '</em>' : '') + (ft || '无页码') + '</p></div>';
  const sec = (c, title, sub, pages) => '<div class="m-sec" style="--c:' + c + '"><p class="m-lab"><b>' + title + '</b>' + sub + '</p><div class="m-pgs">' + pages + '</div></div>';
  const brk = '<div class="m-brk"><i><b>分节符（下一页）</b></i></div>';
  const s1 = sec('#667085', '第 1 节', '封面 · 不编页码', pg('<p class="cv">项目结项报告</p><span style="margin:0 14px"></span><span style="margin:0 22px"></span>', '', '页脚 - 第 1 节 -'));
  const s2 = sec('#7c3aed', '第 2 节', 'Ⅰ, Ⅱ, Ⅲ… 起始 Ⅰ', pg('<p class="t">摘　要</p>' + lines(6), 'Ⅰ', '页脚 - 第 2 节 -') + pg('<p class="t">目　录</p>' + lines(6), 'Ⅱ'));
  const s3 = sec('#2b579a', '第 3 节', '1, 2, 3… 起始 1，不续前节', pg('<p class="tl">第1章　项目概述</p>' + lines(5), '1', '页脚 - 第 3 节 -') + pg(lines(2) + '<div class="im"></div>' + lines(2), '2'));
  draw(root, '<div><div class="m-row">' + s1 + brk + s2 + brk + s3 + '</div><p class="m-note">每节的页眉、页脚都先取消<b>“链接到前一节”</b>，再改页码格式</p></div>', { center: true, min: 0.35 });
}
</script>
