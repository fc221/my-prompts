---
zh: 按钮组与分段控件
en: Button group & segmented control
order: 30
---

## 是什么

相关按钮并排成组；分段控件在几个互斥视图之间即时切换。

## 适合

按钮组：同一对象的 2–3 个并列操作；分段控件：2–5 个互斥选项且选中即切换视图（列表 / 卡片、日 / 周 / 月）。

## 不适合

超过 5 个选项用下拉选择；切换整块页面内容用标签页；需要点“保存”才生效的表单选项用单选组。

## 要点

- 用组件库的按钮组和分段控件：Element Plus el-button-group（size、type）和 el-segmented（options、block、size）、Naive UI n-button-group（size、vertical），分段控件用 n-tabs type="segment"（Naive UI 没有单独的分段控件）、Ant Design Vue a-space-compact（block、size）或 a-button-group 和 a-segmented（options、block、size）
- 按钮组同组 2–3 个，多出的收进“更多”；同组同尺寸、同层级，图标要么都有、要么都没有；相邻边框合并是组件自带的，不连体时按钮间距 8px
- 分段控件只给 2–5 个互斥选项且选中即切换视图（列表 / 卡片、日 / 周 / 月）；外圆角 7、内圆角 5、槽内边距 2，和同行控件等高（外框 32px），组件默认值不一致时改主题变量
- 每段 2–6 个字，选中即生效，不配“应用”按钮；需要点“保存”才生效的表单选项改用单选组（el-radio-group type="button"、n-radio-group + n-radio-button、a-radio-group optionType="button"）
- 值用 v-model 绑定，change 时刷新数据，当前视图写进 URL，见「状态放进 URL」
- 窄屏放不下时不换行、不压扁文字：先 block 撑满一行，再放不下改下拉选择

## 提示词

在{报表标题行右侧}放一个分段控件切换“{日 / 周 / 月}”，旁边放按钮组“导出 / 分享 / 更多”：用项目组件库自带的组件（Element Plus el-segmented :options + el-button-group；Naive UI n-tabs type="segment" + n-button-group；Ant Design Vue a-segmented :options + a-space-compact），不手写。分段控件和同行控件等高（32px），槽内边距 2、外圆角 7、内圆角 5，选中段白底加轻阴影，未选段次要文字色，每段 2–6 个字，选中即刷新数据并把当前视图写进 URL；按钮组同尺寸、同层级，相邻边框合并，多出的操作收进“更多”；选项超过 5 个改下拉选择；窄屏不换行、不压扁文字，先 block 撑满一行，再放不下改下拉。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:420px;display:flex;flex-direction:column;gap:8px}
.top{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
.seg{display:inline-flex;gap:2px;padding:2px;border-radius:7px;background:#e3e6eb}
.seg label{position:relative}
.seg input{position:absolute;opacity:0;pointer-events:none}
.seg span{display:inline-flex;align-items:center;height:28px;padding:0 12px;border-radius:5px;color:#5b616e;cursor:pointer}
.seg input:checked+span{background:#fff;color:#1f2329;box-shadow:0 1px 2px rgba(31,35,41,.16)}
.seg input:focus-visible+span{outline:2px solid #3b5bdb;outline-offset:1px}
.grp{display:inline-flex}
.grp .btn{border-radius:0;padding:0 12px}
.grp .btn+.btn{margin-left:-1px}
.grp .btn:first-child{border-radius:6px 0 0 6px}
.grp .btn:last-child{width:32px;padding:0;border-radius:0 6px 6px 0}
.grp .btn:hover,.grp .btn:focus-visible{position:relative;z-index:1}
.out{height:76px;display:flex;align-items:flex-end;gap:6px;padding:10px 12px 0;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
.out i{flex:1;background:#3b5bdb;border-radius:2px 2px 0 0;transition:height .24s}
@media (prefers-reduced-motion:reduce){.out i{transition:none}
}
</style>

<div class="s"><div class="w"><div class="top"><div class="seg" role="radiogroup" aria-label="统计周期"><label><input type="radio" name="p" value="日"><span>日</span></label><label><input type="radio" name="p" value="周" checked><span>周</span></label><label><input type="radio" name="p" value="月"><span>月</span></label></div><div class="grp" role="group" aria-label="报表操作"><button class="btn" type="button">导出</button><button class="btn" type="button">分享</button><button class="btn" type="button" aria-label="更多操作">⋯</button></div></div><div class="out" aria-hidden="true"></div><p class="help cap" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const out = root.querySelector('.out'), cap = root.querySelector('.cap');
  const data = { 日: [5, 7, 4, 8, 6, 9, 7], 周: [6, 8, 7, 9, 5, 8, 10, 9], 月: [7, 5, 8, 6, 9, 8] }, txt = { 日: '近 7 天，按日', 周: '近 8 周，按周', 月: '近 6 个月，按月' };
  const draw = (k) => { out.innerHTML = data[k].map((v) => `<i style="height:${v * 9}%"></i>`).join(''); cap.textContent = '正在看：' + txt[k]; };
  root.querySelectorAll('input').forEach((i) => i.addEventListener('change', () => draw(i.value)));
  draw('周');
}
</script>
