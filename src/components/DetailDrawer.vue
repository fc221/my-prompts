<script setup lang="ts">
// 详情：右侧抽屉（手机全屏）。预览、是什么 / 适合 / 不适合 / 注意、要点、提示词；底部可切上一条 / 下一条
import { computed, nextTick, ref, watch } from 'vue';
import { byId, byZh, domainOf, entries, fullPrompt, sectionOf } from '../kb';
import { copy, openDetail, state, togglePick } from '../state';
import AppIcon from './AppIcon.vue';
import EntryPreview from './EntryPreview.vue';
import LayoutViewer from './LayoutViewer.vue';

const dlg = ref<HTMLDialogElement>();
const annotate = ref(true); // 布局默认显示区域标注
const viewerOpen = ref(false);
const promptEl = ref<HTMLElement>();
// 复制结果在抽屉里播报，按钮文字也短暂变成“已复制”（页面级轻提示在模态外，看不到也读不出）
const note = ref('');
let noteTimer = 0;
async function copyPrompt() {
  if (!e.value) return;
  note.value = await copy(fullPrompt(e.value), promptEl.value);
  clearTimeout(noteTimer);
  noteTimer = window.setTimeout(() => {
    note.value = '';
  }, 2500);
}
const body = ref<HTMLElement>();
const e = computed(() => (state.detail ? byId.get(state.detail) : undefined));
const sec = computed(() => (e.value ? sectionOf(e.value) : undefined));
const picked = computed(() => !!e.value && state.picks.includes(e.value.id));
const rows = computed(() =>
  e.value
    ? (
        [
          ['是什么', e.value.look],
          ['适合', e.value.use],
          ['不适合', e.value.avoid],
          ['注意', e.value.care],
        ] as const
      ).filter(([, v]) => v)
    : [],
);
const siblings = computed(() =>
  e.value ? entries.filter((x) => x.domain === e.value!.domain && x.sec === e.value!.sec) : [],
);
// 纯文字的知识条目：要点就在下面，详情里不再画预览（卡片上的预览只是缩略）
const bare = computed(
  () =>
    !!e.value &&
    !e.value.demo &&
    !e.value.wire &&
    !['prompts', 'checklists'].includes(e.value.sec) &&
    !!e.value.rules?.length,
);
const idx = computed(() => siblings.value.findIndex((x) => x.id === e.value?.id));
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const mark = (s: string) => esc(s).replace(/\{([^}]+)\}/g, '<span class="ph">{$1}</span>');
// 「名称」正好是某个条目时变成链接（同名优先同板块），走 #id 锚点，浏览器后退回到上一条
const link = (s = '') =>
  mark(s).replace(/「([^」]+)」/g, (m, n: string) => {
    const c = byZh.get(n),
      d = e.value?.domain; // 重名时先挑同领域同板块，再挑同领域
    const t = c?.find((x) => x.domain === d && x.sec === e.value?.sec) ?? c?.find((x) => x.domain === d) ?? c?.[0];
    return t && t.id !== e.value?.id ? `<a class="xref" href="#${t.id}">${m}</a>` : m;
  });

watch(
  () => state.detail,
  async (id) => {
    note.value = '';
    viewerOpen.value = false; // 换条目（如浏览器后退）时放大查看还开着，会随旧条目卸载，状态要复位，否则下次点不开
    await nextTick();
    if (id && !dlg.value?.open) dlg.value?.showModal();
    if (!id && dlg.value?.open) dlg.value.close();
    body.value?.scrollTo({ top: 0 });
  },
  { immediate: true },
);

// 示例里按 Esc 是在关示例自己的浮层，不关抽屉
let escInDemo = false;
function onKey(ev: KeyboardEvent) {
  if (ev.key === 'Escape')
    escInDemo = ev.composedPath().some((n) => n instanceof HTMLElement && n.classList.contains('d-demo'));
}
function onCancel(ev: Event) {
  if (escInDemo) ev.preventDefault();
  escInDemo = false;
}
function onClose() {
  state.detail = null;
}
function onBackdrop(ev: MouseEvent) {
  if (ev.target === dlg.value) dlg.value?.close();
}
</script>

<template>
  <dialog
    ref="dlg"
    class="drawer"
    aria-labelledby="d-title"
    @keydown.capture="onKey"
    @cancel="onCancel"
    @close="onClose"
    @click="onBackdrop"
  >
    <div v-if="e && sec" class="in" :style="{ '--sec': sec.color ?? 'var(--accent)' }">
      <header class="dh">
        <span class="tile"><AppIcon :name="sec.icon ?? 'box'" :size="18" /></span>
        <div class="tt">
          <h2 id="d-title">{{ e.zh }}</h2>
          <p>
            <span>{{ sec.name }} · {{ e.cat }}</span
            ><span v-if="e.en" class="en">{{ e.en }}</span>
          </p>
        </div>
        <button type="button" class="icon-btn" aria-label="关闭" @click="dlg?.close()">
          <AppIcon name="x" :size="20" />
        </button>
      </header>

      <div ref="body" class="db">
        <div v-if="e.wire" class="wire-tools">
          <button type="button" class="btn sm" :aria-pressed="annotate" @click="annotate = !annotate">
            <AppIcon :name="annotate ? 'check' : 'layout'" :size="16" />区域标注
          </button>
          <span class="hint">{{ annotate ? '虚线框是各个区域，蓝色实线是这种布局的主体' : '关掉标注看页面原样' }}</span>
          <button type="button" class="btn sm" @click="viewerOpen = true">
            <AppIcon name="expand" :size="16" />放大查看
          </button>
        </div>
        <div
          v-if="!bare"
          :key="e.id"
          class="d-demo"
          :class="{ text: !e.demo && !e.wire, wire: e.wire || e.sec === 'layouts' }"
          role="group"
          aria-label="示例"
        >
          <EntryPreview :entry="e" big :annotate="annotate" />
        </div>
        <dl class="info">
          <template v-for="[k, v] in rows" :key="k"
            ><dt>{{ k }}</dt>
            <dd v-html="link(v)"
          /></template>
        </dl>
        <section v-if="e.rules?.length" class="block">
          <h3>要点</h3>
          <ul class="rules">
            <li v-for="(r, i) in e.rules" :key="i" v-html="link(r)" />
          </ul>
        </section>
        <section class="block">
          <h3>提示词 <small>花括号里的内容换成你的场景</small></h3>
          <div class="prompt">
            <p ref="promptEl" v-html="mark(e.prompt)" />
            <p v-if="domainOf(e.domain).tail" class="tail">复制时会在末尾附上通用要求：{{ domainOf(e.domain).tail }}</p>
          </div>
        </section>
      </div>

      <footer class="df">
        <div class="nav">
          <button
            type="button"
            class="icon-btn"
            aria-label="上一条"
            :disabled="idx <= 0"
            @click="openDetail(siblings[idx - 1].id)"
          >
            <AppIcon name="chevron" :size="18" style="transform: rotate(180deg)" />
          </button>
          <span>{{ idx + 1 }} / {{ siblings.length }}</span>
          <button
            type="button"
            class="icon-btn"
            aria-label="下一条"
            :disabled="idx >= siblings.length - 1"
            @click="openDetail(siblings[idx + 1].id)"
          >
            <AppIcon name="chevron" :size="18" />
          </button>
        </div>
        <button type="button" class="btn" :aria-pressed="picked" :data-pick="e.id" @click="togglePick(e.id)">
          <AppIcon :name="picked ? 'check' : 'plus'" :size="16" />{{ picked ? '已加入组合' : '加入组合' }}
        </button>
        <button type="button" class="btn primary" data-copy @click="copyPrompt">
          <AppIcon :name="note === '已复制到剪贴板' ? 'check' : 'copy'" :size="16" />{{
            note === '已复制到剪贴板' ? '已复制' : '复制提示词'
          }}
        </button>
        <p class="sr-only" role="status">{{ note }}</p>
      </footer>
    </div>
    <LayoutViewer v-if="e?.wire" v-model:open="viewerOpen" v-model:annotate="annotate" :entry="e" />
  </dialog>
</template>

<style scoped>
.drawer {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(760px, 100vw);
  max-width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  padding: 0;
  border: 0;
  border-left: 1px solid var(--border-subtle);
  background: var(--surface-raised);
  color: var(--text-primary);
  box-shadow: var(--shadow-3);
}
.drawer[open] {
  animation: slide 0.26s var(--ease);
}
.drawer::backdrop {
  background: var(--scrim);
  animation: fade 0.2s ease;
}
@keyframes slide {
  from {
    transform: translateX(32px);
    opacity: 0.4;
  }
}
@keyframes fade {
  from {
    opacity: 0;
  }
}
.in {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
.dh {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-4) var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}
.tile {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 10px;
  background: var(--sec);
  color: #fff;
}
.tt {
  flex: 1;
  min-width: 0;
}
.tt h2 {
  margin: 0;
  font-size: 18px;
  line-height: 1.35;
}
.tt p {
  display: flex;
  flex-wrap: wrap;
  gap: 4px var(--space-3);
  margin: 2px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
}
.en {
  font-family: var(--mono);
  font-size: 12px;
}
.db {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--space-6);
  display: grid;
  align-content: start;
  gap: var(--space-6);
}
.d-demo {
  height: 320px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--surface-muted);
}
.d-demo.text {
  height: 240px;
}
.d-demo.wire {
  height: 400px;
}
.wire-tools {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: calc(-1 * var(--space-3));
}
.wire-tools .hint {
  flex: 1;
  min-width: 0;
  color: var(--text-secondary);
  font-size: 13px;
}
.info {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-2) var(--space-4);
  margin: 0;
  font-size: 14px;
}
.info dt {
  color: var(--text-secondary);
}
.info dd {
  margin: 0;
  color: var(--text-primary);
}
.block h3 {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  margin: 0 0 var(--space-3);
  font-size: 15px;
}
.block h3 small {
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 400;
}
.rules {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: var(--space-2);
  color: var(--text-primary);
  font-size: 14px;
}
.rules li::marker {
  color: var(--sec);
}
.prompt {
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-muted);
}
.prompt p {
  margin: 0;
  padding: var(--space-4);
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.prompt .tail {
  padding-top: var(--space-3);
  border-top: 1px dashed var(--border-subtle);
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.7;
}
.db :deep(.xref) {
  color: var(--accent-text);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
  text-underline-offset: 3px;
}
.db :deep(.xref:hover) {
  text-decoration-color: currentColor;
}
.db :deep(.ph) {
  color: var(--accent-text);
  font-weight: 600;
  background: var(--accent-soft);
  border-radius: 4px;
  padding: 0 2px;
}
.df {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-top: 1px solid var(--border-subtle);
  background: var(--surface-raised);
}
.nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-right: auto;
  color: var(--text-secondary);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}
.nav .icon-btn:disabled {
  opacity: 0.35;
  cursor: default;
}
@media (max-width: 639px) {
  .drawer {
    width: 100vw;
    border-left: 0;
  }
  .dh {
    padding-left: var(--space-4);
  }
  .db {
    padding: var(--space-4);
    gap: var(--space-5);
  }
  .d-demo {
    height: 260px;
  }
  .d-demo.wire {
    height: 300px;
  }
  .wire-tools .hint {
    display: none;
  }
  .wire-tools {
    justify-content: space-between;
  }
  .df {
    padding: var(--space-3) var(--space-4);
    flex-wrap: wrap;
  }
  .nav span {
    display: none;
  }
}
</style>
