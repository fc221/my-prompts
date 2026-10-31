<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { KbEntry } from '../types';
import { casesOf, fullPrompt, matches, sectionOf } from '../kb';
import { copy, openDetail, state, togglePick } from '../state';
import AppIcon from './AppIcon.vue';
import CaseTabs from './CaseTabs.vue';
import EntryPreview from './EntryPreview.vue';

const props = defineProps<{ entry: KbEntry }>();
const cases = computed(() => casesOf(props.entry));
const chosen = ref<string>();
// 当前案例：决定示例、一句话和复制的提示词；标题始终是主条目
const cur = computed(() => cases.value.find((x) => x.id === chosen.value) ?? cases.value[0] ?? props.entry);
// 筛选命中某个案例时直接切过去
watch(
  () => state.filter,
  (q) => {
    const s = q.trim().toLowerCase();
    // 先按案例的名称匹配，再按全文匹配；主条目自己命中不算，否则“月份”会先停在主条目上
    const named = cases.value.find((c) => c.of && [c.zh, c.tab, c.aka].join(' ').toLowerCase().includes(s));
    chosen.value = s ? (named ?? cases.value.find((c) => c.of && matches(c, s)))?.id : undefined;
  },
  { immediate: true }, // 筛选变化时列表会重建卡片，新实例也要切到命中的案例
);
const picked = computed(() => state.picks.includes(cur.value.id));
const color = computed(() => sectionOf(props.entry).color ?? 'var(--accent)');
</script>

<template>
  <article :id="entry.id" class="card" :style="{ '--sec': color }">
    <div class="demo" :class="{ text: !cur.demo && !cur.wire }" role="group" :aria-label="`${entry.zh}示例`">
      <EntryPreview :key="cur.id" :entry="cur" lazy />
    </div>
    <div class="body">
      <CaseTabs v-if="cases.length" :items="cases" :active="cur.id" @pick="chosen = $event" />
      <div class="head">
        <h2>
          <button type="button" class="title" @click="openDetail(cur.id)">{{ entry.zh }}</button>
        </h2>
        <span class="tag">{{ entry.cat }}</span>
      </div>
      <p v-if="entry.en" class="en">{{ entry.en }}</p>
      <p class="look">{{ cur.look }}</p>
      <div class="actions">
        <button type="button" class="btn ghost sm more" @click="openDetail(cur.id)">查看详情</button>
        <button
          type="button"
          class="btn sm pick"
          :aria-pressed="picked"
          :data-pick="cur.id"
          @click="togglePick(cur.id)"
        >
          <AppIcon :name="picked ? 'check' : 'plus'" :size="16" />{{ picked ? '已加入' : '组合' }}
        </button>
        <button type="button" class="btn sm primary" data-copy @click="copy(fullPrompt(cur))">
          <AppIcon name="copy" :size="16" />复制提示词
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  content-visibility: auto;
  contain-intrinsic-size: auto 420px; /* 屏幕外的卡片不参与排版，折叠侧栏、切换板块更快 */
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-raised);
  overflow: hidden;
  transition:
    transform var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease),
    border-color var(--dur) var(--ease);
}
@media (hover: hover) {
  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-2);
    border-color: color-mix(in srgb, var(--sec) 45%, var(--border-subtle));
  }
}
.demo {
  height: 196px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--surface-muted);
}
.demo.text {
  height: 150px;
}
.body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  flex: 1;
  min-width: 0;
}
.head {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}
h2 {
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 16px;
  line-height: 1.4;
}
.title {
  min-width: 24px;
  min-height: 26px;
  padding: 2px 0;
  border: 0;
  background: none;
  font: inherit;
  font-weight: 600;
  text-align: left;
  color: var(--text-primary);
}
@media (hover: hover) {
  .title:hover {
    color: var(--accent-text);
  }
}
.tag {
  flex: none;
  padding: 0 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--sec) 12%, var(--surface-raised));
  color: color-mix(in srgb, var(--sec) 58%, var(--text-primary));
  font-size: 12px;
  line-height: 22px;
  white-space: nowrap;
}
.en {
  margin: -4px 0 0;
  color: var(--text-secondary);
  font: 12px/1.4 var(--mono);
}
.look {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}
.actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-2);
}
.more {
  margin-right: auto;
  padding: 0 8px;
  margin-left: -8px;
}
</style>
