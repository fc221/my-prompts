---
zh: 日期与时间选择
en: Date & time picker
aka: 日期选择器 日历选择 选日期
tab: 单日期
order: 60
---

## 是什么

输入框配日历面板选日期。同一个控件按要选的内容分几种：单个日期、日期加时间、日期范围、月份和年份；选范围时面板并排展开两个月，快捷选项放在面板里。

## 适合

选一个日子：预约日期、截止日期、生效日期、开票日期。

## 不适合

生日、证件日期这类远期已知日期直接键入或用三个短输入框，不让人在日历里翻几十年；只要年份或月份时用月份粒度的选择器。

## 要点

- 用组件库自带的日期选择器，不手写日历：Element Plus el-date-picker（type="date"、value-format="YYYY-MM-DD"），Naive UI n-date-picker（type="date"），Ant Design Vue a-date-picker（valueFormat="YYYY-MM-DD"）
- 占位写格式 YYYY-MM-DD，允许直接键入；绑定值统一用字符串，不把 Date 对象或时间戳直接传给接口
- 有业务默认值（今天、下一个工作日）就填上，不留空让人翻
- 不可选的日期用组件的禁用回调（disabled-date / is-date-disabled / disabledDate）置灰，悬停或旁边文字说明原因（“不能晚于今天”）
- 跨时区业务在旁边写明时区（UTC+8）
- 窄屏优先原生 date 输入或底部面板

## 提示词

在{表单的开票日期}加日期选择：用项目组件库自带的日期选择器（Element Plus el-date-picker type="date" value-format="YYYY-MM-DD"；Naive UI n-date-picker type="date"；Ant Design Vue a-date-picker valueFormat="YYYY-MM-DD"），不手写日历。占位写 YYYY-MM-DD，允许直接键入，格式错时在框下提示；默认值{今天或业务默认}；不可选日期用组件的禁用回调置灰并说明原因（“不能晚于今天”）；绑定值用 YYYY-MM-DD 字符串；跨时区写明时区；窄屏改原生 date 输入或底部面板。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<link rel="stylesheet" href="../../_shared/calendar.css">
<style>
.w{display:flex;align-items:flex-start;gap:12px;width:100%;max-width:420px;padding:8px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;box-shadow:0 4px 12px rgba(31,35,41,.08);font-size:12px;line-height:18px}
.side{flex:0 0 112px;min-width:0;display:flex;flex-direction:column;gap:4px}
.f{display:flex;align-items:center;gap:4px;height:32px;padding:0 8px;border:1px solid #c9ced6;border-radius:6px;color:#5b616e}
.f:focus-within{border-color:#3b5bdb}
.f input{flex:1;min-width:0;width:100%;padding:0;border:0;outline:0;background:none;color:#1f2329;font-size:12px;font-variant-numeric:tabular-nums}
.c{flex:1}
.c.cal{--cal-row:20px}
@container (min-width:560px){.c.cal{--cal-row:26px}}
</style>

<div class="s"><div class="w"><div class="side"><label class="lab" for="d">开票日期</label><div class="f"><input id="d" inputmode="numeric" placeholder="YYYY-MM-DD" aria-describedby="h"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2.5" y="3.5" width="11" height="10" rx="1.5"/><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3"/></svg></div><p class="help" id="h" role="status"></p></div><div class="c"></div></div></div>

<script type="module">
import { calendar, TODAY } from '../../_shared/calendar.ts';
export default function demo(root) {
  const d = root.querySelector('#d'), h = root.querySelector('#h');
  const cal = calendar(root.querySelector('.c'), { value: [TODAY, TODAY], onChange(a) { d.value = a; h.textContent = '可以直接输入'; } });
  d.value = TODAY; h.textContent = '可以直接输入';
  d.addEventListener('change', () => {
    const ok = /^\d{4}-\d{2}-\d{2}$/.test(d.value) && !Number.isNaN(Date.parse(d.value));
    h.textContent = ok ? '可以直接输入' : '格式写成 2026-10-25';
    if (ok) cal.set(d.value, d.value);
  });
}
</script>
