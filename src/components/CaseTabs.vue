<script setup lang="ts">
// 案例切换：一条下面的几种用法。卡片里切示例，详情里切示例和文字
import type { KbEntry } from '../types';

defineProps<{ items: KbEntry[]; active: string; big?: boolean }>();
defineEmits<{ pick: [id: string] }>();
</script>

<template>
  <div class="cases" :class="{ big }" role="group" aria-label="案例">
    <button
      v-for="x in items"
      :key="x.id"
      type="button"
      :aria-pressed="x.id === active"
      @click.stop="$emit('pick', x.id)"
    >
      {{ x.tab ?? x.zh }}
    </button>
  </div>
</template>

<style scoped>
.cases {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.cases button {
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--border-control);
  border-radius: 999px;
  background: var(--surface-raised);
  color: var(--text-secondary);
  font-size: 12px;
  white-space: nowrap;
  transition:
    background-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease);
}
.cases.big {
  gap: 6px;
  margin-bottom: var(--space-4);
}
.cases.big button {
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
}
@media (hover: hover) {
  .cases button:hover {
    border-color: var(--border-strong);
    color: var(--text-primary);
  }
}
.cases button[aria-pressed='true'] {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--surface-raised);
}
</style>
