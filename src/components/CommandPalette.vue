<script setup lang="ts">
// 全局搜索：⌘K / Ctrl+K 或 / 打开；跨领域、跨板块搜索，方向键选择，回车打开详情
import { computed, nextTick, ref, watch } from 'vue';
import { domainOf, domains, entries, headOf, matches, sectionOf } from '../kb';
import { openDetail, state } from '../state';
import AppIcon from './AppIcon.vue';

const dlg = ref<HTMLDialogElement>();
const input = ref<HTMLInputElement>();
const q = ref('');
const active = ref(0);
const results = computed(() => {
  const s = q.value.trim();
  // 只有示例、文字都跟主条目走的案例不单独列，免得一次命中出现好几行一样的
  const list = entries.filter((e) => matches(e, s) && !(e.of && e.look === headOf(e).look));
  // 当前领域排前面，再按名称命中优先
  return list.sort(
    (a, b) =>
      Number(b.domain === state.domain) - Number(a.domain === state.domain) ||
      Number(b.zh.includes(s)) - Number(a.zh.includes(s)),
  );
});
const shown = computed(() => results.value.slice(0, 60));
watch(q, () => {
  active.value = 0;
});
watch(
  () => state.paletteOpen,
  async (o) => {
    await nextTick();
    if (o && !dlg.value?.open) {
      q.value = '';
      dlg.value?.showModal();
      input.value?.focus();
    }
    if (!o && dlg.value?.open) dlg.value.close();
  },
);
// 先同步关掉面板，焦点回到打开面板前的位置，再开详情；详情关闭后焦点就回到那里，不会掉到 body
function pick(i: number) {
  const e = shown.value[i];
  if (!e) return;
  dlg.value?.close();
  openDetail(e.id);
}
// 方向键和回车挂在整个面板上：点到面板空白处、焦点离开输入框后也能用；输入法选词的回车不算
function onKey(ev: KeyboardEvent) {
  if (ev.isComposing || ev.keyCode === 229) return;
  if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
    ev.preventDefault();
    move(ev.key === 'ArrowDown' ? 1 : -1);
  } else if (ev.key === 'Enter') {
    ev.preventDefault();
    pick(active.value);
  }
}
// 点遮罩关闭；点面板里其他地方把焦点放回输入框，接着打字
function onClick(ev: MouseEvent) {
  if (ev.target === dlg.value) dlg.value.close();
  else if (ev.target !== input.value) input.value?.focus({ preventScroll: true });
}
function move(d: number) {
  const n = shown.value.length;
  if (!n) return;
  active.value = (active.value + d + n) % n;
  nextTick(() => dlg.value?.querySelector(`#pal-${active.value}`)?.scrollIntoView({ block: 'nearest' }));
}
window.addEventListener('keydown', (ev) => {
  const typing = ev.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(ev.target.tagName);
  // 详情或菜单抽屉开着时先关掉它们，不叠第二层模态
  if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') {
    ev.preventDefault();
    if (!state.paletteOpen) {
      state.detail = null;
      state.navOpen = false;
    }
    state.paletteOpen = !state.paletteOpen;
  } else if (ev.key === '/' && !typing && !state.paletteOpen && !state.detail) {
    ev.preventDefault();
    state.paletteOpen = true;
  }
});
</script>

<template>
  <dialog
    ref="dlg"
    class="pal"
    aria-label="搜索全部条目"
    @close="state.paletteOpen = false"
    @click="onClick"
    @keydown="onKey"
  >
    <div class="box">
      <label class="field">
        <AppIcon name="search" :size="18" />
        <span class="sr-only">搜索全部条目</span>
        <input
          ref="input"
          v-model="q"
          type="search"
          placeholder="搜索全部领域的条目，空格分隔多个词"
          enterkeyhint="search"
          role="combobox"
          :aria-expanded="shown.length > 0"
          aria-controls="pal-list"
          :aria-activedescendant="shown.length ? `pal-${active}` : undefined"
          autocomplete="off"
        />
        <kbd>Esc</kbd>
      </label>
      <ul v-if="shown.length" id="pal-list" role="listbox" class="list">
        <li
          v-for="(e, i) in shown"
          :id="`pal-${i}`"
          :key="e.id"
          role="option"
          :aria-selected="i === active"
          :style="{ '--sec': sectionOf(e).color ?? 'var(--accent)' }"
          @mousemove="active = i"
          @click="pick(i)"
        >
          <span class="tile"><AppIcon :name="sectionOf(e).icon ?? 'box'" :size="15" /></span>
          <span class="t"
            ><b>{{ e.of ? `${headOf(e).zh} · ${e.tab ?? e.zh}` : e.zh }}</b
            ><small>{{ e.look }}</small></span
          >
          <span class="where"
            >{{ domains.length > 1 ? domainOf(e.domain).name + ' · ' : '' }}{{ sectionOf(e).name }}</span
          >
        </li>
      </ul>
      <p v-else class="none">没有找到“{{ q }}”，换个词试试，或少输几个字。</p>
      <p class="hint">
        <kbd>↑</kbd><kbd>↓</kbd> 选择　<kbd>↵</kbd> 打开详情　{{
          results.length > shown.length
            ? `显示前 ${shown.length} 条，共 ${results.length} 条`
            : `共 ${results.length} 条`
        }}
      </p>
      <p class="sr-only" role="status">{{ q.trim() ? `找到 ${results.length} 条` : '' }}</p>
    </div>
  </dialog>
</template>

<style scoped>
.pal {
  width: min(640px, calc(100vw - 32px));
  max-height: min(560px, calc(100dvh - 96px));
  margin: 12vh auto auto;
  padding: 0;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-panel);
  background: var(--surface-overlay);
  color: var(--text-primary);
  box-shadow: var(--shadow-3);
  overflow: hidden;
}
.pal::backdrop {
  background: var(--scrim);
}
.box {
  display: flex;
  flex-direction: column;
  max-height: inherit;
}
.field {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--space-3);
  height: 56px;
  padding: 0 var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}
.field input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: 0;
  background: none;
  font-size: 16px;
  color: var(--text-primary);
}
.field input::placeholder {
  color: var(--text-placeholder);
}
.list {
  list-style: none;
  margin: 0;
  padding: var(--space-2);
  overflow-y: auto;
  flex: 1;
}
li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: 10px;
  cursor: pointer;
}
li[aria-selected='true'] {
  background: var(--accent-soft);
}
.tile {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  flex: none;
  border-radius: 8px;
  background: color-mix(in srgb, var(--sec) 14%, var(--surface-raised));
  color: var(--sec);
}
.t {
  display: grid;
  flex: 1;
  min-width: 0;
  line-height: 1.4;
}
.t b {
  font-size: 14px;
  font-weight: 600;
}
.t small {
  color: var(--text-secondary);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.where {
  color: var(--text-secondary);
  font-size: 12px;
  white-space: nowrap;
}
.none {
  margin: 0;
  padding: var(--space-8) var(--space-4);
  color: var(--text-secondary);
  text-align: center;
  font-size: 14px;
}
.hint {
  display: flex;
  flex: none;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: var(--space-2) var(--space-4);
  border-top: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 12px;
}
@media (max-width: 639px) {
  .pal {
    margin-top: 8px;
  }
  .where {
    display: none;
  }
  .hint {
    display: none;
  }
}
</style>
