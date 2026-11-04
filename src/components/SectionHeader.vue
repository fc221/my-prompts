<script setup lang="ts">
// 板块头：图标、名称、介绍、统计，以及本板块内的筛选框和分类
import { computed } from 'vue';
import { domainOf, listed } from '../kb';
import { state } from '../state';
import AppIcon from './AppIcon.vue';

const domain = computed(() => domainOf(state.domain));
const section = computed(() => domain.value.sections.find((s) => s.key === state.section)!);
const inSec = computed(() => listed.filter((e) => e.domain === state.domain && e.sec === state.section));
const cats = computed(() => {
  const m = new Map<string, number>();
  for (const e of inSec.value) m.set(e.cat, (m.get(e.cat) ?? 0) + 1);
  return [['全部', inSec.value.length] as const, ...m.entries()];
});
const withDemo = computed(() => inSec.value.filter((e) => e.demo || e.wire).length);
</script>

<template>
  <section class="hd" :style="{ '--sec': section.color ?? 'var(--accent)' }">
    <div class="glow" aria-hidden="true" />
    <span class="deco" aria-hidden="true"><AppIcon :name="section.icon ?? 'box'" :size="168" /></span>
    <div class="row">
      <span class="tile"><AppIcon :name="section.icon ?? 'box'" :size="24" /></span>
      <div class="txt">
        <h1>{{ section.name }}</h1>
        <p class="intro">{{ section.intro }}</p>
      </div>
    </div>
    <dl class="stats">
      <div>
        <dt>条目</dt>
        <dd>{{ inSec.length }}</dd>
      </div>
      <div>
        <dt>分类</dt>
        <dd>{{ cats.length - 1 }}</dd>
      </div>
      <div v-if="withDemo">
        <dt>带示例</dt>
        <dd>{{ withDemo }}</dd>
      </div>
    </dl>
    <div class="tools">
      <label class="filter">
        <AppIcon name="search" :size="16" />
        <span class="sr-only">在本板块中筛选</span>
        <input
          id="kb-filter"
          v-model="state.filter"
          type="search"
          enterkeyhint="search"
          :placeholder="`在「${section.name}」中筛选`"
          autocomplete="off"
        />
      </label>
      <div class="cats" role="group" aria-label="按分类筛选">
        <button
          v-for="[c, n] in cats"
          :key="c"
          type="button"
          :aria-pressed="state.category === c"
          @click="state.category = c"
        >
          {{ c }}<span>{{ n }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hd {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-5);
  padding: var(--space-6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-raised);
  overflow: hidden;
  isolation: isolate;
}
.glow {
  position: absolute;
  inset: -40% -10% auto auto;
  width: 520px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--sec) 16%, transparent), transparent);
  z-index: -1;
}
.deco {
  position: absolute;
  right: -16px;
  top: -24px;
  color: color-mix(in srgb, var(--sec) 10%, transparent);
  z-index: -1;
}
.row {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}
.tile {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: var(--radius-card);
  background: var(--sec);
  color: #fff;
  box-shadow: 0 8px 18px -8px color-mix(in srgb, var(--sec) 80%, transparent);
}
.txt {
  min-width: 0;
}
h1 {
  margin: 0;
  font-size: 28px;
  line-height: 36px;
  letter-spacing: -0.01em;
}
.intro {
  margin: var(--space-1) 0 0;
  max-width: 40em;
  color: var(--text-secondary);
  font-size: 14px;
}
.stats {
  display: flex;
  gap: var(--space-8);
  margin: 0;
}
.stats div {
  display: grid;
  gap: 2px;
}
.stats dt {
  color: var(--text-secondary);
  font-size: 12px;
}
.stats dd {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  font-variant-numeric: tabular-nums;
}
.tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
}
.filter {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 0 1 260px;
  min-width: 0;
  height: var(--control-h);
  padding: 0 12px;
  border: 1px solid var(--border-control);
  border-radius: var(--radius-control);
  background: var(--surface-base);
  color: var(--text-secondary);
}
.filter:focus-within {
  border-color: var(--focus-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.filter input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: 0;
  background: none;
  font-size: 14px;
  color: var(--text-primary);
}
.filter input::placeholder {
  color: var(--text-placeholder);
}
.cats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  min-width: 0;
}
.cats button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--border-control);
  border-radius: 999px;
  background: var(--surface-raised);
  color: var(--text-secondary);
  font-size: 13px;
  transition:
    background-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease),
    border-color var(--dur-fast) var(--ease);
}
.cats button span {
  color: var(--text-secondary);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
@media (hover: hover) {
  .cats button:hover {
    border-color: var(--border-strong);
    color: var(--text-primary);
  }
}
.cats button[aria-pressed='true'] {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--surface-raised);
}
.cats button[aria-pressed='true'] span {
  color: inherit;
  opacity: 0.7;
}
@media (max-width: 639px) {
  .hd {
    padding: var(--space-4);
    gap: var(--space-4);
  }
  .deco,
  .stats {
    display: none;
  }
  .tile {
    width: 40px;
    height: 40px;
  }
  h1 {
    font-size: 24px;
    line-height: 32px;
  }
  .stats dd {
    font-size: 20px;
    line-height: 28px;
  }
  .filter {
    flex: 1 1 100%;
  }
  .filter input {
    font-size: 16px;
  }
  .cats {
    flex-wrap: nowrap;
    overflow-x: auto;
    width: calc(100% + 32px);
    margin: -4px -16px;
    padding: 4px 16px;
    scrollbar-width: none;
  } /* 上下各留 4px，焦点环不被横滑容器裁掉 */
  .cats button {
    flex: none;
  }
}
@media (pointer: coarse) {
  .filter {
    position: relative;
  }
  .filter::before {
    content: '';
    position: absolute;
    inset: -2px 0;
  } /* 热区撑到 44px 高，视觉不变 */
}
</style>
