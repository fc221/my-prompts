<script setup lang="ts">
// 组合面板：右下角浮出，列出已选条目，可逐条移除，一键复制合成后的提示词
import { computed } from 'vue';
import { byId, combinePrompts, sectionOf } from '../kb';
import { copy, openDetail, state, togglePick } from '../state';
import AppIcon from './AppIcon.vue';

const open = defineModel<boolean>('open', { default: false });
const items = computed(() => state.picks.map((id) => byId.get(id)).filter((e) => !!e));
</script>

<template>
  <div v-if="state.picks.length" class="tray" :class="{ open }" role="region" aria-label="组合提示词">
    <div class="bar">
      <button type="button" class="toggle" :aria-expanded="open" aria-controls="tray-list" @click="open = !open">
        <span class="count">{{ state.picks.length }}</span>
        <span class="tt">已选条目<small>合成一段提示词</small></span>
        <AppIcon name="up" :size="16" class="chev" />
      </button>
      <button type="button" class="btn primary sm" @click="copy(combinePrompts(state.picks, state.goal))">
        <AppIcon name="copy" :size="16" />复制组合
      </button>
    </div>
    <div v-show="open" id="tray-list" class="list">
      <label class="goal"
        ><span>我要做的是</span
        ><input v-model="state.goal" type="text" placeholder="例如：订单管理后台的列表页（可不填）"
      /></label>
      <ul>
        <li v-for="e in items" :key="e!.id" :style="{ '--sec': sectionOf(e!).color ?? 'var(--accent)' }">
          <span class="dot" aria-hidden="true" />
          <button type="button" class="name" @click="openDetail(e!.id)">{{ e!.zh }}</button>
          <span class="sec">{{ sectionOf(e!).name }}</span>
          <button type="button" class="icon-btn rm" :aria-label="`移除 ${e!.zh}`" @click="togglePick(e!.id)">
            <AppIcon name="x" :size="16" />
          </button>
        </li>
      </ul>
      <div class="foot">
        <button type="button" class="btn ghost sm" @click="state.picks.splice(0)">
          <AppIcon name="trash" :size="16" />清空
        </button>
        <span>按板块顺序合成，开头写清要做什么，末尾附通用要求</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tray {
  position: fixed;
  right: max(var(--space-6), env(safe-area-inset-right, 0px));
  bottom: max(var(--space-6), env(safe-area-inset-bottom, 0px));
  z-index: 30;
  width: 340px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-overlay);
  box-shadow: var(--shadow-2);
  overflow: hidden;
}
.bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3) var(--space-2) var(--space-2);
}
.toggle {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  border: 0;
  border-radius: var(--radius-control);
  background: none;
  text-align: left;
}
@media (hover: hover) {
  .toggle:hover {
    background: var(--surface-hover);
  }
}
.count {
  display: grid;
  place-items: center;
  min-width: 28px;
  height: 28px;
  padding: 0 6px;
  border-radius: var(--radius-control);
  background: var(--accent);
  color: var(--text-on-accent);
  font-weight: 600;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}
.tt {
  display: grid;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
}
.tt small {
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
}
.chev {
  margin-left: auto;
  color: var(--text-secondary);
  transition: transform var(--dur) var(--ease);
}
.open .chev {
  transform: rotate(180deg);
}
.list {
  border-top: 1px solid var(--border-subtle);
}
.goal {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-3) var(--space-1);
  font-size: 12px;
  color: var(--text-secondary);
}
.goal input {
  height: var(--control-h);
  padding: 0 12px;
  border: 1px solid var(--border-control);
  border-radius: var(--radius-control);
  background: var(--surface-page);
  color: var(--text-primary);
  font: inherit;
  font-size: 16px;
}
@media (min-width: 640px) {
  .goal input {
    font-size: 14px;
  }
}
ul {
  list-style: none;
  margin: 0;
  padding: var(--space-2);
  max-height: 280px;
  overflow-y: auto;
}
li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 2px 4px 2px 8px;
  border-radius: var(--radius-control);
}
@media (hover: hover) {
  li:hover {
    background: var(--surface-hover);
  }
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sec);
  flex: none;
}
.name {
  flex: 1;
  min-width: 0;
  padding: 8px 0;
  border: 0;
  background: none;
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (hover: hover) {
  .name:hover {
    color: var(--accent-text);
  }
}
.sec {
  color: var(--text-secondary);
  font-size: 12px;
  white-space: nowrap;
}
.rm {
  width: 28px;
  height: 28px;
}
@media (pointer: coarse) {
  li + li {
    margin-top: var(--space-2);
  }
  .name {
    min-height: 44px;
  }
  .rm {
    width: 44px;
    height: 44px;
  }
}
.foot {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-top: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 12px;
}
@media (max-width: 639px) {
  .tray {
    left: var(--space-3);
    right: var(--space-3);
    bottom: max(var(--space-3), env(safe-area-inset-bottom, 0px));
    width: auto;
  }
}
</style>
