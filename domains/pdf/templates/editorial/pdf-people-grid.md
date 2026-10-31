---
zh: 人物介绍页
en: People grid page
aka: 团队介绍 讲师介绍 教师介绍 年度人物 新员工介绍 成员墙
order: 100
---

## 是什么

跨页或单页的人物网格：页眉是一个大标题加一行副标题，下面 2×2 或 2×3 的模块严格对齐网格，每块一张同尺寸、同底色的人物照，下面是姓名、职务或学科和两行介绍。照片里的人都朝向页面内侧，整页像一面安静的成员墙。它通常是一本手册里的一组页面，封面和其他内页用同一套米白底、点缀色和照片底色。

## 适合

公司画册的团队介绍、学校和培训机构的讲师介绍、年度人物或优秀员工、新员工入职介绍、展览的参展艺术家页。

## 不适合

只介绍一两个人、要讲完整故事的，改用「人物专访跨页」；几十人以上的通讯录式名单用表格排，不必每人一张照片。

## 注意

照片必须统一：同一种底色、同一个裁切比例、头顶到画面上沿的距离一致、肩膀都在同一高度出框，差一点整页就显得乱。介绍文字要等长，每人严格两行，长的删、短的补，否则模块底边参差不齐。

## 要点

- 页面：A4 竖版，跨页 420×297mm；上下边距 16mm，外侧 14mm，中缝两侧各 14mm 不放人脸。
- 网格：每页 2 栏、2 行等高模块，栏间距 10mm、行间距 12mm；跨页时左页第一行整行做页眉，正好占一个模块的高度，左右两页的行线对齐。
- 模块：照片宽满一栏、高约 82mm（接近 1:1 稍竖），下面依次是姓名、职务、两行介绍；姓名和照片间距 6mm，所有模块的文字起点在同一条水平线上。
- 照片：统一换成同一种浅底色（如 #d9e0da 的淡灰绿），头顶留出照片高度的 12%–16%，肩线在下 1/3 处出框；左页的人身体和视线朝右，右页朝左，拍不到就镜像翻转（有文字的衣服不能翻）。
- 字体：页眉大标题思源黑体 Heavy 72–80pt，副标题 16pt 加粗；姓名 16–18pt 粗体，职务 9pt 带 0.08em 字距、用点缀色，介绍 9pt 行距 1.65。
- 配色：米白底 #f5f3ef，正文 #1f1f1f，次要文字 #5b5852，职务用一个点缀色（如 #3e6b5a），照片底色和点缀色同一色系。
- 整套页面：手册封面、目录、人物介绍跨页、续页、封底。封面沿用同一版心和细线页眉（机构名左、学期右），两行 90–100pt 大标题，下面一张占满版心宽、高约 104mm 的大图，底色和人物照同一种淡灰绿，底部三栏索引（课程数、讲师数和所在页码、开课日期）；续页每页固定 4 个模块，顶部只留一行小字页眉；排序按职级或姓氏笔画，在页眉下写明。

## 提示词

为{学校 / 公司}的{手册名称，如 秋季课程手册}做一套带人物介绍页的 PDF（封面 + 人物介绍跨页 + 续页 + 封底），共 {人数} 人，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. A4 竖版组成 420×297mm 跨页，上下边距 16mm、外侧 14mm、中缝两侧 14mm；每页 2 栏 2 行等高模块，栏间距 10mm、行间距 12mm，左页第一行整行做页眉。
2. 页眉：一行小字机构名和学期，思源黑体 Heavy 72–80pt 大标题，16pt 副标题，一段两三行说明，底部一条细线。
3. 每个模块：照片宽满一栏、高约 82mm，下面是姓名（16–18pt 粗体）、职务或学科（9pt 点缀色 {点缀色，如 #3e6b5a}）、两行 9pt 介绍；所有模块文字起点对齐。
4. 照片统一换成同一种浅底色，头顶留白和肩线高度一致；左页人物朝右、右页朝左，不朝内的镜像翻转。
5. 介绍每人严格两行，超出的提示我删减，不缩小字号。
6. 人数超过一个跨页时每页 4 个模块往后排，页眉只在第一页。
7. 封面沿用同一版心、细线页眉和点缀色：两行大标题、一张同色底大图、底部三栏索引，写明人物介绍所在页码。
交付时把封面和人物跨页并排截图，检查所有照片的头顶和肩线、文字起点是否在同一水平线，并列出介绍超过两行的人。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(120% 90% at 30% 20%,#3a3a3c,#1d1d1f 70%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-sp{display:flex;width:420px;height:297px;box-shadow:0 18px 40px -12px rgba(0,0,0,.7)}
.m-pg{position:relative;width:210px;height:297px;padding:16px 14px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:12px 10px;background:#f5f3ef;color:#1f1f1f;font-family:system-ui,"PingFang SC",sans-serif;overflow:hidden}
.m-pg:first-child::after{content:"";position:absolute;inset:0 0 0 auto;width:14px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.08))}
.m-pg+.m-pg::before{content:"";position:absolute;inset:0 auto 0 0;width:14px;background:linear-gradient(90deg,rgba(0,0,0,.1),transparent)}
.m-head{grid-column:1/-1;display:flex;flex-direction:column;border-bottom:.6px solid #1f1f1f}
.m-head small{color:#3e6b5a;font:700 5.2px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.16em}
.m-head h1{margin:14px 0 0;font:900 36px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.02em}
.m-head h2{margin:7px 0 0;font:700 8px/1.3 system-ui,"PingFang SC",sans-serif}
.m-head p{margin:auto 0 8px;width:150px;color:#5b5852;font:500 5.2px/1.7 system-ui,"PingFang SC",sans-serif}
.m-p{margin:0;display:flex;flex-direction:column;min-width:0}
.m-ph{position:relative;height:82px;overflow:hidden;background:radial-gradient(80% 70% at 50% 35%,#e4e8e3,#c9d2cb)}
.m-l .m-ph{transform:scaleX(-1)}
.m-ph::before{content:"";position:absolute;z-index:3;left:6%;right:20%;bottom:-10px;height:46%;border-radius:48% 48% 0 0/64% 64% 0 0;background:var(--c)}
.m-ph::after{content:"";position:absolute;z-index:2;left:calc(50% - 5px);top:48%;width:12px;height:20px;background:var(--s);filter:brightness(.9)}
.m-ph i{position:absolute;z-index:4;left:calc(50% - 14px);top:14%;width:32px;height:37px;border-radius:50%;background:radial-gradient(circle 15px at 62% 66%,var(--s) 97%,transparent 100%),var(--h)}
.m-ph s{position:absolute;z-index:1;left:calc(50% - 17px);top:18%;width:37px;height:44px;border-radius:17px 17px 9px 9px;background:var(--h)}
.m-p b{margin-top:6px;font:800 8.5px/1.2 system-ui,"PingFang SC",sans-serif}
.m-p em{margin-top:2px;color:#3e6b5a;font:700 5.2px/1.3 system-ui,"PingFang SC",sans-serif;font-style:normal;letter-spacing:.08em}
.m-p span{margin-top:3px;color:#5b5852;font:500 5px/1.65 system-ui,"PingFang SC",sans-serif}
.m-run{position:absolute;bottom:6px;color:#8b877f;font:600 4.6px/1 system-ui,sans-serif;letter-spacing:.14em}
.m-set{display:flex;gap:18px}
.m-cv{position:relative;width:210px;height:297px;overflow:hidden;background:#f5f3ef;color:#1f1f1f;font-family:system-ui,"PingFang SC",sans-serif;box-shadow:0 18px 40px -12px rgba(0,0,0,.7)}
.m-cv p,.m-cv h1{margin:0}
.m-top{position:absolute;left:14px;right:14px;top:16px;display:flex;justify-content:space-between;padding-bottom:6px;border-bottom:.6px solid #1f1f1f;color:#3e6b5a;font:700 5.2px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.16em}
.m-cv h1{position:absolute;left:14px;top:36px;font:900 34px/1.05 system-ui,"PingFang SC",sans-serif;letter-spacing:.02em}
.m-cv h1+p{position:absolute;left:14px;top:114px;color:#5b5852;font:500 5.4px/1.7 system-ui,"PingFang SC",sans-serif}
.m-cph{position:absolute;left:14px;right:14px;top:136px;height:104px;overflow:hidden;background:radial-gradient(80% 70% at 40% 35%,#e4e8e3,#c9d2cb)}
.m-cph .m-ph{position:absolute;left:4px;bottom:0;width:86px;height:82px;background:none;transform:scale(1.32);transform-origin:bottom left}
.m-easel{position:absolute;right:20px;bottom:0;width:62px;height:96px;background:linear-gradient(#8a6a4a,#8a6a4a) 50% 100%/3px 46px no-repeat,linear-gradient(#8a6a4a,#8a6a4a) 50% 58px/52px 3px no-repeat}
.m-easel::before{content:"";position:absolute;left:4px;top:0;width:54px;height:58px;transform:rotate(-3deg);box-shadow:0 4px 8px -4px rgba(0,0,0,.35);background:radial-gradient(circle at 34% 36%,#e6b25a 0 11%,transparent 12%),linear-gradient(164deg,transparent 56%,#6f9b7d 57% 74%,#3e6b5a 75%),#fbfaf6}
.m-idx{position:absolute;left:14px;right:14px;bottom:16px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.m-idx div{padding-top:5px;border-top:.6px solid #1f1f1f}
.m-idx b{display:block;font:900 13px/1 system-ui,sans-serif}
.m-idx b small{margin-left:1px;font:700 5.5px/1 system-ui,"PingFang SC",sans-serif}
.m-idx span{display:block;margin-top:3px;color:#3e6b5a;font:700 5px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.08em}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
// 视线朝向页面内侧：左页朝右（m-r），右页朝左（m-l）
const p = (dir, [name, role, text, c, s, h, long]) => `<figure class="m-p ${dir}">
  <div class="m-ph" style="--c:${c};--s:${s};--h:${h}">${long ? '<s></s>' : ''}<i></i></div>
  <b>${name}</b><em>${role}</em><span>${text}</span></figure>`;
const L = [
  ['林知夏', '油画 · 系主任', '油画专业硕士，作品两次入选全国美展，主讲人体写生与色彩。', '#2f3a45', '#e6bf9f', '#2a211c', 1],
  ['周远山', '国画 · 副教授', '画山水二十年，每年春秋带学生进山写生各两周。', '#7b6450', '#d4a283', '#3a3a3a'],
];
const R = [
  ['陈一禾', '平面设计 · 讲师', '做过 40 多家餐饮品牌的视觉更新，主讲字体与版式。', '#e9e5dd', '#e2b593', '#1e1a17'],
  ['许安然', '雕塑 · 讲师', '专注公共空间雕塑，作品立在三座城市的公园和地铁站。', '#56664c', '#c99674', '#2b2420', 1],
  ['宋晴', '插画 · 讲师', '出版绘本 12 本，主讲角色设定、分镜与出版流程。', '#b5523b', '#f0caa9', '#4a3326', 1],
  ['顾明哲', '数字媒体 · 讲师', '做过游戏美术和动态海报，带学生用代码和软件做影像。', '#33363b', '#dcae8c', '#141414'],
];
export default function demo(root) {
  draw(root, `<div class="m-set"><div class="m-cv">
    <p class="m-top"><span>MyPrompts</span><span>2026 秋季</span></p>
    <h1>秋季<br>课程手册</h1><p>速写、油画、国画、设计和数字媒体<br>十二门课，九月一日开课</p>
    <div class="m-cph"><div class="m-ph" style="--c:#3e6b5a;--s:#e6bf9f;--h:#2a211c"><s></s><i></i></div><i class="m-easel"></i></div>
    <div class="m-idx"><div><b>12<small>门</small></b><span>课程</span></div><div><b>6<small>位</small></b><span>讲师 · P04</span></div><div><b>9.1</b><span>开课</span></div></div>
  </div><div class="m-sp">
    <div class="m-pg"><header class="m-head"><small>MyPrompts · 2026 秋季</small><h1>本季讲师</h1><h2>六位老师，陪你从速写走到毕业创作</h2>
      <p>每位讲师每周至少带两次工作室课，课后留一小时答疑。选课前可以在开放日到画室旁听。</p></header>
      ${L.map((x) => p('m-r', x)).join('')}<span class="m-run" style="left:14px">04 · 讲师介绍</span></div>
    <div class="m-pg">${R.map((x) => p('m-l', x)).join('')}<span class="m-run" style="right:14px">TEACHERS · 05</span></div>
  </div></div>`, { center: true, min: 0.25 });
}
</script>
