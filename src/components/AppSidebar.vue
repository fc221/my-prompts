<script setup lang="ts">
// 侧栏：品牌、按领域分组的板块导航、主题切换、折叠。
// 每个领域是一个可折叠分组，默认展开当前领域；collapsible 只给桌面常驻侧栏用。
// 收起后每个领域只留一个图标，悬停或点击在右侧弹出它的板块（浮层放在顶层，不被侧栏裁切）；领域再多也只占一列图标
import { computed, onMounted, onUnmounted, reactive, ref, useId, watch } from 'vue';
import { domains, listed } from '../kb';
import { go, originOf, setTheme, state } from '../state';
import AppIcon from './AppIcon.vue';

const props = defineProps<{ collapsible?: boolean }>();
const mini = computed(() => !!props.collapsible && state.collapsed);
const uid = useId(); // 常驻侧栏和手机抽屉各一份，分组 id 不能重复
const countOf = (dom: string, sec?: string) => listed.filter((e) => e.domain === dom && (!sec || e.sec === sec)).length;
const open = reactive(new Set([state.domain]));
watch(
  () => state.domain,
  (d) => open.add(d),
);
const toggle = (d: string) => (open.has(d) ? open.delete(d) : open.add(d));
const themes = [
  { k: 'system', icon: 'monitor', name: '跟随系统' },
  { k: 'light', icon: 'sun', name: '浅色' },
  { k: 'dark', icon: 'moon', name: '深色' },
] as const;
const current = computed(() => themes.find((t) => t.k === state.theme) ?? themes[0]);
const next = computed(() => themes[(themes.indexOf(current.value) + 1) % themes.length]);

// 收起时的板块浮层：鼠标移入打开、移开 200ms 后关；点击切换，悬停刚打开时紧接着的那一下点击不关；
// 键盘打开时焦点进第一项（当前板块优先），方向键移动，Esc 关闭并回到图标；点外面关闭
const fly = ref<string | null>(null);
const pops: Record<string, HTMLElement> = {},
  trigs: Record<string, HTMLElement> = {};
let timer = 0,
  hoverAt = 0;
function show(k: string, focus = false) {
  clearTimeout(timer);
  if (fly.value && fly.value !== k) hide();
  const p = pops[k],
    b = trigs[k];
  if (fly.value !== k) {
    p.showPopover();
    const r = b.getBoundingClientRect();
    p.style.left = `${r.right + 8}px`;
    p.style.top = `${Math.max(8, Math.min(r.top - 8, innerHeight - p.offsetHeight - 8))}px`;
    fly.value = k;
  }
  if (focus) (p.querySelector<HTMLElement>('[aria-current]') ?? p.querySelector('button'))?.focus();
}
function hide(back = false) {
  const k = fly.value;
  if (!k) return;
  clearTimeout(timer);
  const p = pops[k],
    inside = p.contains(document.activeElement);
  if (p.matches(':popover-open')) p.hidePopover();
  fly.value = null;
  if (back || inside) trigs[k].focus();
}
function clickTrig(k: string, ev: MouseEvent) {
  if (fly.value !== k) show(k, ev.detail === 0);
  else if (performance.now() - hoverAt > 400) hide();
}
const enter = (k: string, ev: PointerEvent) => {
  if (ev.pointerType !== 'mouse') return;
  clearTimeout(timer);
  if (fly.value !== k) {
    show(k);
    hoverAt = performance.now();
  }
};
const leave = (ev: PointerEvent) => {
  if (ev.pointerType === 'mouse') {
    clearTimeout(timer);
    timer = window.setTimeout(() => hide(), 200);
  }
};
function flyKey(ev: KeyboardEvent) {
  if (ev.key === 'Escape') {
    ev.preventDefault();
    hide(true);
    return;
  }
  const items = [...(ev.currentTarget as HTMLElement).querySelectorAll('button')];
  const i = items.indexOf(document.activeElement as HTMLButtonElement),
    n = items.length;
  const to = { ArrowDown: (i + 1) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[ev.key];
  if (to !== undefined) {
    ev.preventDefault();
    items[to].focus();
  }
}
function pickSec(d: string, s: string) {
  go(d, s);
  hide(true);
}
const outside = (ev: PointerEvent) => {
  const k = fly.value;
  if (k && !pops[k].contains(ev.target as Node) && !trigs[k].contains(ev.target as Node)) hide();
};
onMounted(() => document.addEventListener('pointerdown', outside));
onUnmounted(() => {
  document.removeEventListener('pointerdown', outside);
  clearTimeout(timer);
});
watch(mini, () => {
  fly.value = null;
});
</script>

<template>
  <div class="side" :class="{ mini }">
    <div class="brand">
      <span class="mark" aria-hidden="true"><AppIcon name="book" :size="20" /></span>
      <span v-if="!mini" class="bt"><b>提示词知识库</b><small>规范要点 · 可复制提示词</small></span>
      <span v-else class="sr-only">提示词知识库</span>
    </div>

    <nav class="nav" aria-label="板块">
      <template v-for="d in domains" :key="d.key">
        <template v-if="mini">
          <button
            :ref="
              (el) => {
                if (el) trigs[d.key] = el as HTMLElement;
              }
            "
            type="button"
            class="item"
            :class="{ on: d.key === state.domain }"
            style="--sec: var(--accent)"
            :aria-label="`${d.name}，${d.sections.length} 个板块`"
            :aria-expanded="fly === d.key"
            :aria-controls="`${uid}-${d.key}`"
            @click="clickTrig(d.key, $event)"
            @keydown.esc="hide(true)"
            @pointerenter="enter(d.key, $event)"
            @pointerleave="leave"
          >
            <span class="tile"><AppIcon :name="d.icon ?? 'layers'" :size="16" /></span>
          </button>
          <div
            :id="`${uid}-${d.key}`"
            :ref="
              (el) => {
                if (el) pops[d.key] = el as HTMLElement;
              }
            "
            popover="manual"
            class="fly"
            role="group"
            :aria-label="d.name"
            @keydown="flyKey"
            @pointerenter="enter(d.key, $event)"
            @pointerleave="leave"
          >
            <p class="fh">
              <span>{{ d.name }}</span
              ><span class="n">{{ countOf(d.key) }}</span>
            </p>
            <button
              v-for="s in d.sections"
              :key="s.key"
              type="button"
              class="item"
              :aria-current="d.key === state.domain && s.key === state.section ? 'page' : undefined"
              :style="{ '--sec': s.color ?? 'var(--accent)' }"
              @click="pickSec(d.key, s.key)"
            >
              <span class="tile"><AppIcon :name="s.icon ?? 'box'" :size="16" /></span
              ><span class="name">{{ s.name }}</span
              ><span class="n">{{ countOf(d.key, s.key) }}</span>
            </button>
          </div>
        </template>
        <template v-else>
          <button
            type="button"
            class="group"
            :aria-expanded="open.has(d.key)"
            :aria-controls="`${uid}-${d.key}`"
            @click="toggle(d.key)"
          >
            <AppIcon name="chevron" :size="16" class="chev" /><span class="name">{{ d.name }}</span
            ><span class="n">{{ countOf(d.key) }}</span>
          </button>
          <div v-show="open.has(d.key)" :id="`${uid}-${d.key}`" class="items" role="group" :aria-label="d.name">
            <button
              v-for="s in d.sections"
              :key="s.key"
              type="button"
              class="item"
              :aria-current="d.key === state.domain && s.key === state.section ? 'page' : undefined"
              :style="{ '--sec': s.color ?? 'var(--accent)' }"
              @click="go(d.key, s.key)"
            >
              <span class="tile"><AppIcon :name="s.icon ?? 'box'" :size="16" /></span
              ><span class="name">{{ s.name }}</span
              ><span class="n">{{ countOf(d.key, s.key) }}</span>
            </button>
          </div>
        </template>
      </template>
    </nav>

    <div class="foot">
      <template v-if="!mini">
        <div class="theme" role="group" aria-label="主题">
          <button
            v-for="t in themes"
            :key="t.k"
            type="button"
            class="icon-btn"
            :aria-pressed="state.theme === t.k"
            :aria-label="t.name"
            :title="t.name"
            @click="setTheme(t.k, originOf($event))"
          >
            <AppIcon :name="t.icon" :size="16" />
          </button>
        </div>
        <button
          v-if="collapsible"
          type="button"
          class="icon-btn"
          aria-label="收起侧栏"
          title="收起侧栏"
          @click="state.collapsed = true"
        >
          <AppIcon name="sidebar" :size="20" />
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="icon-btn"
          :aria-label="`主题：${current.name}，切换为${next.name}`"
          :data-tip="`主题：${current.name}`"
          @click="setTheme(next.k, originOf($event))"
        >
          <AppIcon :name="current.icon" :size="20" />
        </button>
        <button
          type="button"
          class="icon-btn"
          aria-label="展开侧栏"
          data-tip="展开侧栏"
          @click="state.collapsed = false"
        >
          <AppIcon name="sidebar-open" :size="20" />
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.side {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  height: 100%;
  padding: var(--space-5) var(--space-3) var(--space-4);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-2);
}
.mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: var(--radius-control);
  background: linear-gradient(140deg, var(--accent), color-mix(in srgb, var(--accent) 55%, #0ea5e9));
  color: var(--text-on-accent);
  box-shadow: 0 6px 14px -6px color-mix(in srgb, var(--accent) 70%, transparent);
}
.bt {
  display: grid;
  line-height: 1.3;
  white-space: nowrap;
}
.bt b {
  font-size: 16px;
}
.bt small {
  color: var(--text-secondary);
  font-size: 12px;
}
/* overflow-x 必须写 hidden：只写 overflow-y: auto 时横向也按 auto 算，展开动画里文字先于面板变宽，会闪出横向滚动条 */
.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-height: 0;
  overflow: hidden auto;
  margin: -4px;
  padding: 4px;
} /* 四周留 4px，焦点环不被滚动容器裁掉 */
.group {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: none;
  height: 32px;
  padding: 0 var(--space-2);
  border: 0;
  border-radius: var(--radius-control);
  background: none;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}
@media (hover: hover) {
  .group:hover {
    background: var(--surface-hover);
    color: var(--text-primary);
  }
}
.chev {
  flex: none;
  transition: transform var(--dur) var(--ease);
}
.group[aria-expanded='true'] .chev {
  transform: rotate(90deg);
}
.group + .items {
  margin-bottom: var(--space-2);
}
.items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.item {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: none;
  height: 40px;
  padding: 0 var(--space-2);
  border: 0;
  border-radius: var(--radius-control);
  background: none;
  color: var(--text-primary);
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  transition: background-color var(--dur-fast) var(--ease);
}
@media (hover: hover) {
  .item:hover {
    background: var(--surface-hover);
  }
}
.item[aria-current='page'] {
  background: color-mix(in srgb, var(--sec) 11%, var(--surface-raised));
  font-weight: 600;
}
.tile {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: none;
  border-radius: var(--radius-control);
  background: color-mix(in srgb, var(--sec) 14%, var(--surface-raised));
  color: var(--sec);
}
.item[aria-current='page'] .tile,
.item.on .tile {
  background: var(--sec);
  color: #fff;
}
.name {
  flex: 1;
  min-width: 0;
}
.n {
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}
.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-2) 0;
  border-top: 1px solid var(--border-subtle);
}
.theme {
  display: flex;
  gap: 2px;
  padding: 4px;
  border-radius: 10px; /* 同心圆角：内 6 + 槽内边距 4 */
  background: var(--surface-muted);
}
.theme .icon-btn {
  width: 32px;
  height: 32px;
}
.theme .icon-btn[aria-pressed='true'] {
  background: var(--surface-raised);
  color: var(--text-primary);
  box-shadow: var(--shadow-1);
}

/* 收起：只留图标，居中排成一列 */
.mini {
  padding-inline: var(--space-3);
  align-items: center;
}
.mini .brand {
  padding: 0;
}
.mini .nav {
  overflow: visible;
  align-items: center;
}
.mini .nav > .item {
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
}
.item[aria-expanded='true'] {
  background: var(--surface-hover);
}
/* 收起时的板块浮层（顶层 popover，位置由脚本按图标定） */
.fly {
  position: fixed;
  inset: auto;
  width: 232px;
  max-height: calc(100dvh - 16px);
  margin: 0;
  padding: var(--space-2);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-overlay);
  color: var(--text-primary);
  box-shadow: var(--shadow-2);
}
.fly:popover-open {
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: fly-in 160ms var(--ease);
}
@keyframes fly-in {
  from {
    opacity: 0;
    transform: translateX(-4px);
  }
}
.fh {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 4px var(--space-2);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
}
.mini .foot {
  flex-direction: column;
  padding: var(--space-3) 0 0;
  align-self: stretch;
}
.mini .foot .icon-btn {
  position: relative;
}
/* 收起时的名称提示：悬停或键盘聚焦时显示在右侧 */
.mini [data-tip]:hover::after,
.mini [data-tip]:focus-visible::after {
  content: attr(data-tip);
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  z-index: 40;
  transform: translateY(-50%);
  padding: 4px 8px;
  border-radius: var(--radius-control);
  background: var(--surface-inverse);
  color: var(--text-inverse);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: var(--shadow-2);
}
@media (pointer: coarse) {
  .group,
  .item {
    height: 44px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fly:popover-open {
    animation: fade 160ms var(--ease);
  }
}
@media (pointer: coarse) {
  .theme .icon-btn::before {
    inset: -6px 0;
  } /* 32px 的主题按钮：上下撑到 44，左右不扩（相邻只隔 2px） */
}
</style>
