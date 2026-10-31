---
zh: 日期加时间
en: Date with time
aka: 日期时间选择 精确到分钟 定时发布 预约时间
of: c-date
tab: 日期时间
order: 62
---

## 是什么

选日子的同时选几点几分，框里写“2026-10-25 14:30”。

## 适合

定时发布、预约到点、提醒时间、生效时刻这类要精确到分钟的地方。

## 不适合

只要日子用单日期；手机上只挑几点几分用「滚轮时间选择」。

## 要点

- 日历选日子，旁边两个下拉选时和分，分钟按 5 分钟一档，够用还不用翻太久
- “此刻”一键填当前时间，“确定”才写回输入框，中途关掉面板不改原值
- 跨时区业务在框旁写明时区

## 提示词

在{定时发布}加日期时间选择：触发框显示“2026-10-25 14:30”，面板左边日历选日子，右边两个下拉选时和分，分钟 5 分钟一档；底部“此刻”填当前时间，“确定”写回输入框，中途关闭不改原值；今天有标记，不可选日期置灰并提示原因；方向键在日历里移动，Esc 关闭并还焦点；写明时区；窄屏改为底部面板。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<link rel="stylesheet" href="../../_shared/calendar.css">
<style>
.w{display:flex;align-items:flex-start;gap:12px;width:100%;max-width:440px;padding:8px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;box-shadow:0 4px 12px rgba(31,35,41,.08);font-size:12px;line-height:18px}
.side{flex:0 0 128px;min-width:0;display:flex;flex-direction:column;gap:6px}
.f{display:flex;align-items:center;height:32px;padding:0 6px;border:1px solid #3b5bdb;border-radius:6px;font-variant-numeric:tabular-nums;white-space:nowrap}
.t{display:flex;align-items:center;gap:4px}
.t select{flex:1;min-width:0;height:28px;padding:0 2px;border:1px solid #c9ced6;border-radius:6px;background:#fff;font-size:12px;font-variant-numeric:tabular-nums}
.act{display:flex;gap:4px}
.act button{flex:1;height:26px;padding:0;border:1px solid #c9ced6;border-radius:6px;background:#fff;font-size:12px;cursor:pointer}
.act .ok{border-color:#3b5bdb;background:#3b5bdb;color:#fff}
.c{flex:1}
.c.cal{--cal-row:20px}
@container (min-width:560px){.c.cal{--cal-row:26px}}
</style>

<div class="s"><div class="w"><div class="side"><span class="lab">发布时间</span><div class="f" aria-live="polite"></div><div class="t"><select aria-label="时" class="hh"></select><span aria-hidden="true">:</span><select aria-label="分" class="mm"></select></div><div class="act"><button type="button" class="now">此刻</button><button type="button" class="ok">确定</button></div><p class="help" role="status"></p></div><div class="c"></div></div></div>

<script type="module">
import { calendar, TODAY } from '../../_shared/calendar.ts';
export default function demo(root) {
  const q = (s) => root.querySelector(s), f = q('.f'), hh = q('.hh'), mm = q('.mm'), st = q('[role=status]');
  const pad = (n) => String(n).padStart(2, '0');
  hh.innerHTML = Array.from({ length: 24 }, (_, i) => `<option>${pad(i)}</option>`).join('');
  mm.innerHTML = Array.from({ length: 12 }, (_, i) => `<option>${pad(i * 5)}</option>`).join('');
  hh.value = '14'; mm.value = '30';
  const show = () => { f.textContent = `${cal.get()[0]} ${hh.value}:${mm.value}`; st.textContent = ''; };
  const cal = calendar(q('.c'), { value: [TODAY, TODAY], onChange: show });
  hh.addEventListener('change', show); mm.addEventListener('change', show);
  q('.now').addEventListener('click', () => { cal.set(TODAY, TODAY); hh.value = '09'; mm.value = '45'; show(); });
  q('.ok').addEventListener('click', () => { st.textContent = '已写回输入框'; });
  show();
}
</script>
