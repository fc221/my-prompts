---
zh: 月份、季度与年份
en: Month, quarter & year
aka: 月份选择 季度选择 年份选择 账期 月度筛选
of: c-date
tab: 月份季度
order: 68
---

## 是什么

不用选到哪一天时，面板换成月份、季度或年份的网格，框里写“2026-10”“2026 Q4”“2026”。

## 适合

账期、月报、季度报表、年度统计、信用卡有效期这类不关心具体哪一天的地方。

## 不适合

要选到某一天用单日期；手机上用滚轮或月份网格，见「手机上选日期的六种控件」。

## 要点

- 网格四列，当前月份、季度或年份加粗，选中项主色实心
- 月份和季度页翻一年，年份页翻十二年
- 提交的值带上粒度，“2026 Q4”和“2026-10”不能混用同一个字段

## 提示词

给{账单筛选}加月份选择：触发框写“2026-10”，面板是 3 行 4 列的月份网格，顶部翻年，当前月份加粗，选中项主色实心；需要时切到季度或年份，提交的值带上粒度；方向键在网格里移动，Esc 关闭并还焦点。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{display:flex;flex-direction:column;gap:6px;width:100%;max-width:300px;padding:8px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;box-shadow:0 4px 12px rgba(31,35,41,.08);font-size:12px;line-height:18px}
.top{display:flex;align-items:center;gap:8px}
.f{flex:1;min-width:0;height:28px;padding:0 8px;border:1px solid #3b5bdb;border-radius:6px;line-height:26px;font-variant-numeric:tabular-nums;white-space:nowrap}
.seg{flex:none;display:inline-flex;padding:2px;background:#e8ebf0;border-radius:7px}
.seg button{height:24px;padding:0 8px;border:0;border-radius:5px;background:none;color:#5b616e;font-size:12px;cursor:pointer}
.seg [aria-pressed=true]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(31,35,41,.12)}
.hd{display:flex;align-items:center;justify-content:space-between;height:20px;font-weight:600}
.hd button{width:22px;height:20px;padding:0;border:0;border-radius:4px;background:none;color:#5b616e;cursor:pointer}
.hd button:hover{background:#f0f2f5}
.g{display:grid;gap:2px}
.g button{height:24px;padding:0;border:0;border-radius:4px;background:none;font-size:12px;cursor:pointer}
.g button:hover{background:#f0f2f5}
.g [aria-pressed=true]{background:#3b5bdb;color:#fff}
.g .now{font-weight:700}
@container (min-width:560px){.g button{height:34px}}
</style>

<div class="s"><div class="w"><div class="top"><div class="f" aria-live="polite"></div><div class="seg" role="group" aria-label="粒度"><button type="button" data-m="m">月</button><button type="button" data-m="q">季度</button><button type="button" data-m="y">年</button></div></div><div class="hd"><button type="button" class="pv" aria-label="上一页">‹</button><span class="tt"></span><button type="button" class="nx" aria-label="下一页">›</button></div><div class="g"></div></div></div>

<script type="module">
export default function demo(root) {
  const q = (s) => root.querySelector(s), f = q('.f'), g = q('.g'), tt = q('.tt');
  let mode = 'm', year = 2026, val = { m: '2026-10', q: '2026 Q4', y: '2026' };
  const cols = { m: 4, q: 4, y: 4 };
  const cells = () => mode === 'm' ? Array.from({ length: 12 }, (_, i) => [`${year}-${String(i + 1).padStart(2, '0')}`, `${i + 1} 月`]) : mode === 'q' ? [1, 2, 3, 4].map((n) => [`${year} Q${n}`, `Q${n}`]) : Array.from({ length: 12 }, (_, i) => { const y = Math.floor(year / 12) * 12 + i; return [String(y), String(y)]; });
  const draw = () => {
    const list = cells(); g.style.gridTemplateColumns = `repeat(${cols[mode]},minmax(0,1fr))`;
    g.innerHTML = list.map(([k, t]) => `<button type="button" data-k="${k}" aria-pressed="${k === val[mode]}" class="${k.startsWith('2026-10') || k === '2026 Q4' || k === '2026' ? 'now' : ''}">${t}</button>`).join('');
    tt.textContent = mode === 'y' ? `${list[0][0]} ~ ${list.at(-1)[0]}` : `${year} 年`;
    f.textContent = val[mode];
    root.querySelectorAll('.seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === mode)));
  };
  q('.seg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { mode = b.dataset.m; draw(); } });
  g.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { val[mode] = b.dataset.k; draw(); } });
  const page = (n) => { year += n * (mode === 'y' ? 12 : 1); draw(); };
  q('.pv').addEventListener('click', () => page(-1)); q('.nx').addEventListener('click', () => page(1));
  draw();
}
</script>
