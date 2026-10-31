import { nextTick, reactive, watch } from 'vue';
import { byId, domainOf, domains, sectionOf } from './kb';

type Theme = 'system' | 'light' | 'dark';

const read = <T>(k: string, d: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v == null ? d : (JSON.parse(v) as T);
  } catch {
    return d;
  }
};
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* 隐私模式等存储不可用时忽略 */
  }
};

const firstDomain = domainOf(read('kb-domain', domains[0]?.key ?? ''));

export const state = reactive({
  domain: firstDomain.key,
  section: read(`kb-sec-${firstDomain.key}`, firstDomain.sections[0]?.key ?? ''),
  category: '全部',
  filter: '',
  picks: read<string[]>('kb-picks', []).filter((id) => byId.has(id)),
  goal: read('kb-goal', ''),
  detail: null as string | null,
  theme: read<Theme>('kb-theme', 'system'),
  collapsed: read('kb-collapsed', false),
  navOpen: false,
  paletteOpen: false,
  toast: '',
});

if (!domainOf(state.domain).sections.some((s) => s.key === state.section))
  state.section = domainOf(state.domain).sections[0].key;

export function go(domain: string, section?: string) {
  const d = domainOf(domain);
  state.domain = d.key;
  state.section =
    section && d.sections.some((s) => s.key === section) ? section : read(`kb-sec-${d.key}`, d.sections[0].key);
  state.category = '全部';
  state.filter = '';
  state.navOpen = false;
}

export function openDetail(id: string) {
  const e = byId.get(id);
  if (!e) return;
  if (e.domain !== state.domain || e.sec !== state.section) {
    state.domain = e.domain;
    state.section = e.sec;
    state.category = '全部';
    state.filter = '';
  }
  state.detail = id;
}

export function togglePick(id: string) {
  const i = state.picks.indexOf(id);
  i < 0 ? state.picks.push(id) : state.picks.splice(i, 1);
}

let toastTimer = 0;
export function toast(msg: string) {
  state.toast = msg;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    state.toast = '';
  }, 2200);
}

/** 复制到剪贴板；不可用时选中备用元素里的文字，提示手动复制。返回提示文字，弹层里要自己播报（弹层外的轻提示会被模态挡住） */
export async function copy(text: string, fallback?: HTMLElement | null) {
  let msg = '已复制到剪贴板';
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    if (fallback) {
      getSelection()?.selectAllChildren(fallback);
      msg = '已选中文字，按 ⌘C / Ctrl+C 复制';
    } else msg = '复制失败，请打开详情手动选中';
  }
  toast(msg);
  return msg;
}

// 地址栏只用普通 #锚点：#s.领域.板块 或 #条目id（发布环境只保留这种格式）
// 打开详情时压一条历史，手机返回键先关详情；用界面关掉时把这条退掉，历史里不留重复的板块地址
let pushed = false;
function syncHash() {
  const h = state.detail ? `#${state.detail}` : `#s.${state.domain}.${state.section}`;
  if (location.hash === h) return;
  if (state.detail && !pushed) {
    history.pushState(null, '', h);
    pushed = true;
  } else if (!state.detail && pushed) {
    pushed = false;
    history.back();
  } else history.replaceState(null, '', h);
}
function readHash() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (h.startsWith('s.')) {
    pushed = false;
    const [, d, s] = h.split('.');
    if (!domains.some((x) => x.key === d)) return;
    if (d !== state.domain || s !== state.section) go(d, s); // 同一板块只关详情，不清掉筛选
    state.detail = null;
  } else if (byId.has(h)) openDetail(h);
}
readHash();
window.addEventListener('hashchange', readHash);

watch(() => [state.domain, state.section, state.detail], syncHash, { immediate: true });
// 标签页标题跟着当前板块和详情变
watch(
  () => [state.domain, state.section, state.detail],
  () => {
    const e = state.detail ? byId.get(state.detail) : undefined;
    const sec = domainOf(state.domain).sections.find((s) => s.key === state.section);
    document.title = [e?.zh, e ? sectionOf(e).name : sec?.name, '提示词知识库'].filter(Boolean).join(' · ');
  },
  { immediate: true },
);
watch(
  () => state.domain,
  (d) => write('kb-domain', d),
);
watch(
  () => [state.domain, state.section],
  () => write(`kb-sec-${state.domain}`, state.section),
);
watch(
  () => [...state.picks],
  (p) => write('kb-picks', p),
);
watch(
  () => state.goal,
  (g) => write('kb-goal', g),
);
watch(
  () => state.theme,
  (t) => {
    write('kb-theme', t);
    applyTheme(t);
  },
  { immediate: true },
);
watch(
  () => state.collapsed,
  (c) => write('kb-collapsed', c),
);

// ── 主题：圆形扩散切换 ──
const prefersDark = () => matchMedia('(prefers-color-scheme: dark)').matches;
const effective = (t: Theme) => (t === 'system' ? (prefersDark() ? 'dark' : 'light') : t);
function applyTheme(t: Theme) {
  if (t === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
}

/**
 * 切换主题。实际明暗有变化时用 View Transitions 做圆形过渡：切到深色从 origin（点击位置）扩散铺满屏幕（约 450ms），
 * 切回浅色时深色向 origin 收缩消失（约 400ms）；
 * 键盘触发时 origin 传按钮中心。浏览器不支持、减少动态效果、或明暗没变时直接切换。
 */
export function setTheme(t: Theme, origin?: { x: number; y: number }) {
  const changed = effective(t) !== effective(state.theme);
  const vt = (
    document as Document & {
      startViewTransition?: (cb: () => Promise<void> | void) => { ready: Promise<void>; finished: Promise<void> };
    }
  ).startViewTransition;
  if (!changed || !vt || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    state.theme = t;
    return;
  }
  const x = origin?.x ?? innerWidth / 2,
    y = origin?.y ?? innerHeight / 2;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  // 切到深色：新画面从圆心扩散铺满；切回浅色：旧的深色画面向圆心收缩消失（旧快照放上层）
  const expand = effective(t) === 'dark';
  const root = document.documentElement;
  root.classList.toggle('vt-shrink', !expand);
  const transition = vt.call(document, async () => {
    state.theme = t;
    applyTheme(t);
    await nextTick();
  });
  const small = `circle(0px at ${x}px ${y}px)`,
    big = `circle(${r}px at ${x}px ${y}px)`;
  let anim: Animation | undefined;
  transition.ready
    .then(() => {
      anim = root.animate(
        { clipPath: expand ? [small, big] : [big, small] },
        // fill: forwards：动画播完保持最终状态直到过渡层拆除；否则收缩结束那一帧旧的深色快照会整张露出来，看起来闪一下
        {
          duration: expand ? 450 : 400,
          easing: expand ? 'cubic-bezier(.2, 0, 0, 1)' : 'cubic-bezier(.4, 0, .6, 1)',
          fill: 'forwards',
          pseudoElement: expand ? '::view-transition-new(root)' : '::view-transition-old(root)',
        },
      );
    })
    .catch(() => {
      /* 过渡被跳过时主题已经切好 */
    });
  // 过渡结束后取消保持住的动画，免得留到下一次过渡里
  transition.finished.finally(() => {
    root.classList.remove('vt-shrink');
    anim?.cancel();
  });
}

/** 点击事件的扩散圆心：鼠标 / 触摸用指针位置，键盘（detail 为 0）用按钮中心 */
export function originOf(ev: MouseEvent) {
  if (ev.detail > 0 && (ev.clientX || ev.clientY)) return { x: ev.clientX, y: ev.clientY };
  const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

// 测试钩子：校验脚本用它打开指定板块和详情
Object.assign(window, { __kb: { go, openDetail, state, setTheme } });
