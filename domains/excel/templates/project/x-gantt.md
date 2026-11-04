---
zh: 甘特图进度表
en: Gantt chart schedule
aka: 甘特图 项目进度表 进度计划 横道图 项目排期 里程碑 计划与实际 开店筹备
order: 10
---

## 是什么

左边是任务清单（负责人、开始、工期、结束、进度、状态），右边每天一列，用条件格式把计划时段涂成横条、已完成的部分涂深色，今天那一列高亮；改开始日期或工期，横条自动移动，延期的任务自动标红。

## 适合

开店筹备、装修、活动筹办、软件迭代这类几十个任务以内的项目；周会上看进度、谁落后了。

## 不适合

任务上百、依赖关系复杂、多人实时更新的，用项目管理工具；只列待办、不排时间的用「任务清单」。

## 注意

横条全部用条件格式画，时间轴格子里不填字、也不手动涂色，否则改日期后对不上。工期写工作日数，结束日期用 WORKDAY 算并排除节假日，开始日期本身要落在工作日上。

## 要点

- 工作表：参数（项目开始日、节假日表、负责人、状态）、甘特、变更记录。甘特表的任务区占 A–K 列：编号、任务、负责人、开始、工期、结束、进度、状态、类型、基线开始、基线结束；时间轴从 L 列起每天一列，日期在第 4 行，任务从第 5 行起。
- 任务区：开始日期手填，有前置任务的写 =WORKDAY(前置任务的结束日期,1,节假日)，并加验证 =NETWORKDAYS(D5,D5,节假日)=1 挡住周末开工；工期（工作日）和进度 %（验证 0–100%）手填；结束日期 =WORKDAY(D5,E5-1,节假日)；类型 ▾ 任务或里程碑，里程碑工期写 1、任务名前加“◆”。
- 时间轴：L4 =项目开始日，M4 =L4+1 向右拖；自定义格式 d 只显示几号，第 3 行 =IF(OR(L4=项目开始日,DAY(L4)=1),TEXT(L4,"m月"),"") 标月份；列宽约 2.5。
- 横条条件格式应用到 L5:CF60，按这个顺序排：里程碑 =AND($I5="里程碑",L$4=$D5) 深橙；已完成部分 =AND(L$4>=$D5,L$4<$D5+($F5-$D5+1)*$G5) 深色；计划区间 =AND(L$4>=$D5,L$4<=$F5) 浅色；周末 =WEEKDAY(L$4,2)>5 浅灰；今天 =L$4=TODAY() 红色左边框。已完成部分按日历天折算，看个大概足够。
- 状态 =IF(G5=1,"完成",IF(F5<TODAY(),"延期",IF(D5>TODAY(),"未开始","进行中")))，延期整行红字；计划进度 =MIN(1,MAX(0,NETWORKDAYS(D5,TODAY(),节假日)/E5))，实际进度比计划进度落后 10 个百分点以上标黄“落后”。
- 计划与实际：计划定稿时把开始、结束复制到基线两列（粘贴为值），之后只改开始和工期；条件格式 =AND(L$4>=$J5,L$4<=$K5) 画下边框，和横条一比就看出拖了几天；每次改期在变更记录写日期、任务、原计划、新计划、原因。
- 版式：冻结到 K 列和日期行，基线两列可以隐藏；按编号的上下级用“数据 → 组合”折叠子任务；横向 A3 或缩放到一页宽打印；每周例会前由负责人更新进度。

## 提示词

帮我做一份{项目名称，如 新店开业筹备}的甘特图进度表 Excel，项目从 {开始日期} 开始：
1. 参数表：项目开始日、节假日表（{节假日}）、负责人列表（{负责人}）。
2. 任务区：编号、任务、负责人、开始日期、工期（工作日）、结束日期（WORKDAY 排除节假日）、进度、类型（任务或里程碑）、状态；有前置任务的开始日期用前置任务的结束日期推算。先放这些任务：{任务清单与工期}。
3. 右侧时间轴每天一列，显示日期和月份；条件格式画计划横条、已完成的深色部分、今天红线、周末浅灰、里程碑深橙，格子里不填内容。
4. 状态自动判断完成、延期、未开始、进行中，延期整行红字；加基线开始和基线结束两列，基线用下边框显示。
交付时说明哪些列手填、哪些是公式、每周更新只改哪几列，并演示改一个任务的工期后后续任务和横条如何移动。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.xc.m-off{background:#eef0f3}
.xc.m-pl{background:#cfe0f7}
.xc.m-dn{background:#2a6fdb}
.xc.m-ms{background:#d9480f;color:#fff;justify-content:center}
.xc.m-td{background:#e5484d;color:#fff}
</style>

<script type="module">
import { draw, sheet } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  // 时间轴 2026-10-26（周一）起 14 天；今天 10-30
  const days = Array.from({ length: 14 }, (_, i) => new Date(2026, 9, 26 + i));
  const label = (d) => String(d.getDate());
  const md = (d) => (d.getMonth() + 1) + '-' + String(d.getDate()).padStart(2, '0');
  const idx = (s) => days.findIndex((d) => md(d) === s);
  const tasks = [
    ['1', '选址签约', '林晓雯', '10-26', 2, '10-27', 1, '完成'],
    ['2', '证照办理', '苏沐阳', '10-26', 3, '10-28', 0.8, '延期'],
    ['3', '装修设计', '韩若楠', '10-28', 4, '11-02', 0.6, '进行中'],
    ['4', '设备采购', '周启航', '10-29', 5, '11-04', 0.2, '进行中'],
    ['5', '招聘培训', '唐一鸣', '11-02', 5, '11-06', 0, '未开始'],
    ['6', '◆ 试营业', '林晓雯', '11-06', 1, '11-06', 0, '未开始'],
  ];
  const col = (i) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i];
  const marks = { H3: 'bad', B3: 'bad' };
  days.forEach((d, i) => { if (d.getDay() % 6 === 0) marks[col(8 + i) + '1'] = 'off'; });
  marks[col(8 + idx('10-30')) + '1'] = 'td';
  const rows = tasks.map(([no, name, who, s, dur, e, p, st], r) => {
    const a = idx(s), b = idx(e), done = Math.round((b - a + 1) * p);
    const cells = days.map((d, i) => {
      const at = col(8 + i) + (r + 2);
      if (name.startsWith('◆') && i === a) { marks[at] = 'ms'; return '◆'; }
      if (i >= a && i <= b) marks[at] = i < a + done ? 'dn' : 'pl';
      else if (d.getDay() % 6 === 0) marks[at] = 'off';
      return '';
    });
    return [no, name, who, s, String(dur), e, '▮' + Math.round(p * 100) + ' ' + Math.round(p * 100) + '%', st, ...cells];
  });
  draw(root, sheet({
    head: ['编号', '任务', '负责人', '开始', '工期', '结束', '进度', '状态', ...days.map(label)],
    widths: [32, 66, 48, 42, 32, 42, 54, 46, ...days.map(() => 22)],
    rows,
    fx: ['F4', '=WORKDAY(D4,E4-1,节假日)'],
    marks,
    tabs: ['甘特', '变更记录', '参数'],
    freeze: true,
  }), { title: '甘特图 · 10-26 起，横条全由条件格式画，红色表头是今天', min: 0.45 });
}
</script>
