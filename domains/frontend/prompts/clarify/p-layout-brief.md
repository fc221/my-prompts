---
zh: 用三句话描述版面
en: Three-line layout brief
aka: 版面三句话
order: 70
---

## 是什么

描述靠画面取胜的区块时，用三句话把画面说定：图怎么放、字怎么排、颜色给谁。比“高级一点、有设计感”更容易让 AI 做出你脑子里的样子。

## 适合

官网首屏、落地页、作品集、活动页，心里有大致画面但说不清时。

## 不适合

后台、表单、表格这类以操作为主的页面，用「提示词填空公式」写骨架和组件规格。

## 要点

- 图：几张、放哪、多大、什么比例、彩色还是去色。
- 字：多大、几行、哪个词换色或描边、和图怎么叠。
- 色：强调色只给一处，其余用黑白灰或图片自带的颜色。
- 每句写到能照着画出草图；画不出来的部分先找一张参考图，用「照参考图做页面」拆。
- 一个区块三句话；多个区块分别写，再补一句区块之间怎么过渡。

## 提示词

请按下面三句话实现{页面或区块}，其余细节按这三句话的气质补齐，并在回复开头列出你补的假设：
【图】{张数、位置、尺寸和比例、是否去色，如“右侧一张 4:5 竖图占版面 45% 宽，左侧留白”}
【字】{标题字号和行数、哪个词换色或描边、和图的关系，如“标题 88px 两行，压住竖图左边缘约 40px，第二行最后两个字用强调色”}
【色】{强调色只用在哪一处，如“全页只有标题里那两个字和主按钮用强调色”}

写法参考（换成你的内容）：
- 图：一张 21:9 的全宽照片放在首屏下半部，上半部是纯色留白。字：标题 72px 一行居中放在留白里，下面一行 18px 副标题。色：只有主按钮用强调色，照片保持原色。
- 图：三张圆角方图沿对角线错落，从左上到右下逐张变大。字：标题左对齐占左半边，第二个词用 2px 描边字。色：强调色只给描边字和底部的价格。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:6px 8px}
.say{margin:0;padding:6px 8px;border-radius:8px 8px 8px 2px;background:#eef0f3;font-size:11px;line-height:16px}
.q{margin:5px 0 0;color:#5b616e;font-size:10px;line-height:14px}
/* 左：AI 的默认答案——居中标题加按钮 */
.gen{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;height:54px;margin-top:6px;border:1px dashed #c9ced6;border-radius:5px}
.gen i{display:block;height:6px;border-radius:3px;background:#d5d9e0}
/* 右：三句话 + 照着画出的区块 */
.t{display:grid;grid-template-columns:auto minmax(0,1fr);gap:1px 5px;margin:0 0 5px;font-size:9.5px;line-height:13px}
.t dt{color:#3b5bdb;font-weight:600}
.t dd{margin:0}
/* 固定 104×62，保证标题真的压住 4:5 竖图的左边缘 */
.mk{position:relative;width:104px;height:62px;margin:0 auto;border:1px solid #e3e6eb;border-radius:5px;background:#fff;overflow:hidden}
.mk .im{position:absolute;right:5px;top:5px;width:40px;height:50px;border-radius:2px;background:#b9a48c}
.mk h5{position:absolute;left:7px;top:8px;margin:0;font-size:14px;line-height:16px;font-weight:700;color:#1f2329;white-space:nowrap}
.mk h5 em{font-style:normal;color:#e4572e}
.mk .bt{position:absolute;left:7px;bottom:6px;padding:0 6px;border-radius:3px;background:#e4572e;color:#fff;font-size:8px;line-height:12px}
</style>

<div class="fx">
  <section class="fx-p"><h4>只说气质</h4><div class="fx-b"><div class="fx-z c"><p class="say">首屏高级一点、有设计感。</p><div class="gen"><i style="width:60%"></i><i style="width:40%;height:4px"></i><i style="width:22px;height:9px;background:#8a909c"></i></div><p class="q">图、字、色都没说，AI 只会居中一个标题。</p></div></div></section>
  <section class="fx-p ok"><h4>三句话说定</h4><div class="fx-b"><div class="fx-z c"><dl class="t"><dt>图</dt><dd>右侧 4:5 竖图占 40%</dd><dt>字</dt><dd>标题两行，压住竖图左缘</dd><dt>色</dt><dd>只给末两字和主按钮</dd></dl><div class="mk"><div class="im"></div><h5>住进山里<br>慢<em>下来</em></h5><span class="bt">预订</span></div></div></div></section>
</div>
