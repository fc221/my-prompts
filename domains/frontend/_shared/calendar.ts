// 日期类示例共用：日历面板 calendar() 和范围选择 rangePicker()。
// 值都是 'YYYY-MM-DD' 字符串，可以直接比大小。今天写死，缩略图才稳定。样式在 calendar.css
export const TODAY = '2026-10-25';

const pad = (n: number) => String(n).padStart(2, '0');
export const iso = (y: number, m: number, d: number) => {
  const x = new Date(y, m, d);
  return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`;
};
const parts = (s: string) => s.split('-').map(Number);
export const addDays = (s: string, n: number) => {
  const [y, m, d] = parts(s);
  return iso(y, m - 1, d + n);
};
const addMonths = (ym: string, n: number) => iso(parts(ym)[0], parts(ym)[1] - 1 + n, 1).slice(0, 7);
export const dayDiff = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);

const ARROW = (d: string) =>
  `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
const NAV: Record<string, [string, string]> = {
  '-12': ['上一年', 'M8 4 4 8l4 4M12 4 8 8l4 4'],
  '-1': ['上一月', 'M10 4 6 8l4 4'],
  '1': ['下一月', 'M6 4l4 4-4 4'],
  '12': ['下一年', 'M4 4l4 4-4 4M8 4l4 4-4 4'],
};
const nav = (k: string) =>
  `<button type="button" data-go="${k}" aria-label="${NAV[k][0]}">${ARROW(NAV[k][1])}</button>`;
const WEEK = [...'一二三四五六日'].map((d) => `<b>${d}</b>`).join('');

export interface CalOptions {
  /** 并排几个月，宽度变化时重新计算 */
  months?: () => number;
  range?: boolean;
  value?: [string, string?];
  min?: string;
  max?: string;
  /** 范围最多多少天 */
  maxDays?: number;
  /** picking：已选开始日，正在等结束日 */
  onChange?: (a: string, b: string, picking: boolean) => void;
}

export function calendar(el: HTMLElement, o: CalOptions = {}) {
  let [a = '', b = ''] = o.value ?? [];
  let picking = false,
    hover = '',
    shownN = 0,
    view = '';
  const count = () => o.months?.() ?? 1;
  // 有上限时结束日所在的月放在最右，往前看得到更多可选日期
  const aim = () => {
    view = o.max ? addMonths((b || a || o.max).slice(0, 7), 1 - count()) : (a || TODAY).slice(0, 7);
  };
  const why = (d: string) => {
    if (o.max && d > o.max) return '不能晚于今天';
    if (o.min && d < o.min) return '不能早于最早日期';
    if (o.maxDays && picking && Math.abs(dayDiff(a, d)) >= o.maxDays) return `最多选 ${o.maxDays} 天`;
    return '';
  };
  const paint = () => {
    const end = picking ? hover || a : b;
    const [lo, hi] = o.range ? (a && end && end < a ? [end, a] : [a, end]) : [a, a];
    const anchor = a || TODAY;
    const tab = el.querySelector(`[data-d="${anchor}"]`) ?? el.querySelector('[data-d]');
    el.querySelectorAll<HTMLElement>('[data-d]').forEach((x) => {
      const d = x.dataset.d!,
        off = why(d),
        on = d === lo || d === hi;
      x.className = [d === lo && 'a', d === hi && 'b', lo && hi && d > lo && d < hi && 'in', d === TODAY && 'now']
        .filter(Boolean)
        .join(' ');
      x.setAttribute('aria-pressed', String(on));
      if (off) x.setAttribute('aria-disabled', 'true');
      else x.removeAttribute('aria-disabled');
      x.title = off;
      x.tabIndex = x === tab ? 0 : -1;
    });
  };
  const month = (k: number, n: number) => {
    const [y, m] = parts(view),
      first = new Date(y, m - 1 + k, 1),
      Y = first.getFullYear(),
      M = first.getMonth(),
      lead = (first.getDay() + 6) % 7,
      len = new Date(Y, M + 1, 0).getDate();
    const days = Array.from({ length: len }, (_, i) => {
      const d = iso(Y, M, i + 1);
      return `<button type="button" data-d="${d}" aria-label="${M + 1} 月 ${i + 1} 日${d === TODAY ? '，今天' : ''}"><span>${i + 1}</span></button>`;
    }).join('');
    const left = k === 0 ? nav('-12') + nav('-1') : '<i></i><i></i>',
      right = k === n - 1 ? nav('1') + nav('12') : '<i></i><i></i>';
    return `<div class="cal-m" role="group" aria-label="${Y} 年 ${M + 1} 月"><div class="cal-h">${left}<b>${Y} 年 ${M + 1} 月</b>${right}</div><div class="cal-g">${WEEK}${'<i></i>'.repeat(lead)}${days}${'<i></i>'.repeat(42 - lead - len)}</div></div>`;
  };
  const draw = () => {
    shownN = count();
    el.innerHTML = Array.from({ length: shownN }, (_, k) => month(k, shownN)).join('');
    paint();
  };
  const emit = () => o.onChange?.(a, b, picking);
  const reveal = (d: string) => {
    const ym = d.slice(0, 7),
      last = addMonths(view, shownN - 1);
    if (ym < view) view = ym;
    else if (ym > last) view = addMonths(ym, 1 - shownN);
    else return;
    draw();
  };
  el.classList.add('cal');
  el.addEventListener('click', (e) => {
    const t = e.target as HTMLElement,
      go = t.closest<HTMLElement>('[data-go]'),
      day = t.closest<HTMLElement>('[data-d]');
    if (go) {
      view = addMonths(view, +go.dataset.go!);
      draw();
    }
    if (!day || day.hasAttribute('aria-disabled')) return;
    const d = day.dataset.d!;
    if (!o.range) a = b = d;
    else if (!picking) {
      a = d;
      b = '';
      picking = true;
    } else {
      [a, b] = d < a ? [d, a] : [a, d];
      picking = false;
    }
    hover = '';
    paint();
    emit();
  });
  el.addEventListener('mouseover', (e) => {
    const d = (e.target as HTMLElement).closest<HTMLElement>('[data-d]')?.dataset.d;
    if (picking && d && !why(d) && d !== hover) {
      hover = d;
      paint();
    }
  });
  el.addEventListener('keydown', (e) => {
    const d = (e.target as HTMLElement).closest<HTMLElement>('[data-d]')?.dataset.d;
    const by = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!d || !by) return;
    e.preventDefault();
    const t = addDays(d, by);
    reveal(t);
    if (picking && !why(t)) {
      hover = t;
      paint();
    }
    el.querySelector<HTMLElement>(`[data-d="${t}"]`)?.focus();
  });
  aim();
  draw();
  new ResizeObserver(() => {
    if (count() !== shownN) {
      aim();
      draw();
    }
  }).observe(el);
  return {
    get: () => [a, b] as const,
    set(x = '', y = '') {
      [a, b] = [x, y];
      picking = false;
      hover = '';
      aim();
      draw();
    },
    /** 下一次点击改哪一端：0 重新选开始，1 只改结束 */
    edit(k: number) {
      picking = k === 1 && !!a;
      paint();
    },
    picking: () => picking,
  };
}

export interface Preset {
  name: string;
  range: [string, string];
  /** 底部说明，没写就按起止日期算 */
  note?: string;
}
export interface RangeOptions {
  presets?: Preset[];
  value?: [string, string];
  max?: string;
  maxDays?: number;
}

const spanNote = (a: string, b: string) => {
  if (!a || !b) return a ? '再选结束日期' : '先选开始日期';
  const n = dayDiff(a, b) + 1;
  return `共 ${n} 天${b === TODAY ? '，含今天' : b < TODAY ? '，不含今天' : ''}`;
};

/** 范围选择：一个框写两端，面板并排两个月；有快捷选项时放在面板左侧。卡片宽度放不下时快捷选项版收成一个月 */
export function rangePicker(root: any, o: RangeOptions = {}) {
  const host = root.querySelector('.rp');
  const tabs = o.presets?.length
    ? `<div class="pre" role="group" aria-label="快捷选项">${o.presets.map((p, i) => `<button type="button" data-p="${i}">${p.name}</button>`).join('')}</div>`
    : '';
  host.innerHTML = `<div class="rf" role="group" aria-label="日期范围"><button type="button" data-k="0"></button><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M10 5l3 3-3 3"/></svg><button type="button" data-k="1"></button></div><div class="rb">${tabs}<div class="c"></div></div><div class="rft"><span role="status"></span><button type="button" class="clr">清除</button><button type="button" class="ok">确认</button></div>`;
  const [btnA, btnB] = host.querySelectorAll('.rf button') as NodeListOf<HTMLElement>,
    note = host.querySelector('.rft span') as HTMLElement,
    pre = [...host.querySelectorAll('.pre button')] as HTMLElement[];
  let used = o.presets?.findIndex((p) => p.range[0] === o.value?.[0] && p.range[1] === o.value?.[1]) ?? -1;
  const paint = () => {
    const [a, b] = cal.get(),
      picking = cal.picking();
    btnA.textContent = a || '开始日期';
    btnB.textContent = b || '结束日期';
    btnA.classList.toggle('ph', !a);
    btnB.classList.toggle('ph', !b);
    btnA.setAttribute('aria-current', String(!picking));
    btnB.setAttribute('aria-current', String(picking));
    pre.forEach((x, i) => x.setAttribute('aria-pressed', String(i === used)));
    note.textContent = (used >= 0 && o.presets![used].note) || spanNote(a, b);
  };
  const cal = calendar(host.querySelector('.c'), {
    range: true,
    value: o.value,
    max: o.max,
    maxDays: o.maxDays,
    months: () => (host.clientWidth >= 520 || !o.presets ? 2 : 1),
    onChange() {
      used = -1;
      paint();
    },
  });
  host.addEventListener('click', (e: MouseEvent) => {
    const t = e.target as HTMLElement,
      p = t.closest<HTMLElement>('[data-p]'),
      k = t.closest<HTMLElement>('[data-k]');
    if (p) {
      used = +p.dataset.p!;
      cal.set(...o.presets![used].range);
    }
    if (k) cal.edit(+k.dataset.k!);
    if (t.closest('.clr')) {
      used = -1;
      cal.set();
    }
    if (t.closest('.ok')) {
      const [a, b] = cal.get();
      note.textContent = a && b ? `已应用 ${a} 至 ${b}` : '先选完起止日期';
      return;
    }
    if (p || k || t.closest('.clr')) paint();
  });
  paint();
  return cal;
}
