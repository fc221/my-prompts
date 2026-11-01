---
zh: 填空下划线与对齐
en: Fill-in underlines and alignment
aka: 下划线对不齐 填空横线 制表位 前导符 调整宽度 分散对齐 封面信息栏 签字栏 落款对齐 空格对齐
order: 10
---

## 是什么

表单、封面信息栏、签字栏里的“姓名：______”和成列的标签，用制表位、带下划线的制表符、无框线表格和“调整宽度”来对齐：每条横线的终点在同一位置，填进字后长度不变，换台电脑也不乱。

## 适合

论文和申报书封面的信息栏、申请表、登记表、合同签署栏、“____年__月__日”这类日期行、试卷的姓名班级栏。

## 不适合

格子多、打印后手填的登记表直接画表格，看「表格排版」；公文落款的“右空四字”看「公文格式」。

## 注意

用空格敲出来的对齐只在你这台电脑上看着齐：中西文空格宽度不同，字体一换、填进几个字，横线就长短不一，后面的文字也被顶走。横线和列对齐交给制表位，标签宽度交给“调整宽度”，整段不出现连续空格。

## 要点

- 先看标记：开始 → 显示/隐藏编辑标记（Ctrl+Shift+8），空格显示为“·”、制表符显示为“→”，连续的“·”就是要改的地方；标尺上的 └ ┘ ┴ 是制表位。
- 打印后手填的横线：段落 → 制表位，在横线终点（如 120mm）设一个右对齐制表位，前导符选第 4 种实线“____”；输入“姓名：”后按 Tab，横线自动画到终点。
- 电子填写的横线：输入“姓名：”后按 Tab 到终点，只选中这个制表符加下划线（Ctrl+U）；之后在制表符前面打字，字也带下划线，横线总长度不变。
- 标签等宽：“学院”“学号”“指导教师”字数不同，选中标签 → 开始 → 中文版式 → 调整宽度，统一设为 4 字符；表格里的标签也可以用分散对齐（Ctrl+Shift+J）。
- 封面信息栏最稳的做法：2 列无框线表格，左列放标签（调整宽度 4 字符），右列只留 0.75 磅下框线、内容居中，表格整体居中。
- 两栏签字区：甲乙双方写在同一段里，用版心中点处的左对齐制表位分开；“甲方（盖章）：”“法定代表人：”“日期：”几行用同一个制表位，第二列自然对齐。
- 日期行“____年__月__日”：每个空用带下划线的制表符或固定数量的全角空格，几处日期的长度保持一致；落款整段用右对齐加右缩进来定位。
- 数字列：金额、分数这类纵向排列的数字用小数点对齐制表位，小数点上下对齐。

## 提示词

帮我把{文档名称}里的{区域，如 封面信息栏和签字栏}改成规范对齐，文字内容不变。
1. 先打开编辑标记，找出所有用连续空格、一串下划线字符来对齐的地方，列给我看。
2. 封面信息栏用 2 列无框线表格：左列标签 {标签列表，如 学院、专业、学生姓名、学号、指导教师}，统一调整宽度为 {标签宽度，默认 4 字符}；右列只留 0.75 磅下框线，内容居中；列宽 {列宽，如 30mm 和 70mm}，表格整体居中。
3. 正文里的填空横线：打印后手填的用右对齐制表位加实线前导符，终点在 {横线终点，如 版心右边缘}；电子填写的给制表符加下划线。
4. 签字区：甲乙两方用版心中点的左对齐制表位分成两列，盖章、签字、日期几行用同一个制表位；日期统一写成“____年__月__日”。
5. 改完后整段不再有连续空格；最后说明用到了哪些制表位（位置、对齐方式、前导符）。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-two{display:flex;gap:16px;align-items:stretch}
.m-pn{display:flex;flex-direction:column;width:268px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font-family:"Songti SC","SimSun",serif}
.m-tag{display:flex;align-items:center;gap:6px;padding:6px 12px;border-bottom:1px solid #eaecf0;font:650 11.5px/1.3 system-ui,"PingFang SC",sans-serif}
.m-tag i{display:grid;place-items:center;width:16px;height:16px;border-radius:50%;color:#fff;font:700 10px/1 system-ui;font-style:normal}
.m-bad .m-tag{color:#b42318}
.m-bad .m-tag i{background:#d92d20}
.m-ok .m-tag{color:#1d3f75}
.m-ok .m-tag i{background:#2b579a}
.m-ru{position:relative;height:14px;margin:6px 16px 0;border-bottom:1px solid #c4cad3;background:repeating-linear-gradient(90deg,#c4cad3 0 1px,transparent 1px 10px) bottom/100% 4px no-repeat;color:#2b579a;font:700 11px/1 system-ui}
.m-ru b{position:absolute;bottom:-1px;transform:translateX(-50%)}
.m-bd{display:grid;gap:7px;padding:10px 16px 0;font-size:12px;line-height:1.5}
.m-ln{display:flex;align-items:flex-end;white-space:nowrap}
.m-dot{color:#e0857c;letter-spacing:-.05em}
.m-u{display:inline-block;border-bottom:1px solid #111;height:1.2em}
.m-lb{display:inline-block;width:4em;text-align:justify;text-align-last:justify}
.m-f{position:relative;flex:1;border-bottom:1px solid #111;text-align:center;color:#1d3f75;font-family:"STKaiti","KaiTi",serif}
.m-f::after{content:"→";position:absolute;right:0;bottom:1px;color:#9fb4d6;font:10px/1 system-ui}
.m-sg{display:grid;gap:4px;margin-top:6px;padding-top:8px;border-top:1px dashed #e4e7ec;font-size:11px}
.m-c2{display:inline-block}
.m-t{color:#9fb4d6;font:10px/1 system-ui;display:inline-block}
.m-desk .m-cap{margin:auto 0 0;padding:8px 12px;color:#667085;font:10.5px/1.4 system-ui,"PingFang SC",sans-serif}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const d = (n) => '<span class="m-dot">' + '·'.repeat(n) + '</span>';
  const u = (w) => '<span class="m-u" style="width:' + w + 'px"></span>';
  const bad = '<div class="m-pn m-bad"><p class="m-tag"><i>✕</i>错 · 空格和下划线字符</p><div class="m-bd">'
    + '<p class="m-ln">学' + d(3) + '院：' + u(150) + '</p>'
    + '<p class="m-ln">学生姓名：' + u(118) + '</p>'
    + '<p class="m-ln">学' + d(3) + '号：' + u(138) + '</p>'
    + '<p class="m-ln">指导教师：' + u(160) + '</p>'
    + '<div class="m-sg"><p class="m-ln">甲方（盖章）：' + d(9) + '乙方（盖章）：</p><p class="m-ln">日期：' + d(14) + '日期：</p></div>'
    + '</div><p class="m-cap">换个字体、填进名字，横线就长短不一</p></div>';
  const f = (lb, v) => '<p class="m-ln"><span class="m-lb">' + lb + '</span>：<span class="m-f">' + v + '</span></p>';
  const ok = '<div class="m-pn m-ok"><p class="m-tag"><i>✓</i>对 · 制表位 + 调整宽度</p><div class="m-ru"><b style="left:50%">└</b><b style="left:100%">┘</b></div><div class="m-bd">'
    + f('学院', '信息工程学院') + f('学生姓名', '林知夏') + f('学号', '2022110437') + f('指导教师', '周启明 副教授')
    + '<div class="m-sg"><p class="m-ln"><span style="width:50%;display:inline-block">甲方（盖章）：<span class="m-t">→</span></span>乙方（盖章）：</p><p class="m-ln"><span style="width:50%;display:inline-block">日期：<span class="m-t">→</span></span>日期：</p></div>'
    + '</div><p class="m-cap">标签调整宽度 4 字符；横线终点、第二列都对着同一个制表位</p></div>';
  draw(root, '<div class="m-two">' + bad + ok + '</div>', { center: true, min: 0.35 });
}
</script>
