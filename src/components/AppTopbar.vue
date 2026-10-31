<script setup lang="ts">
// 顶栏：手机上的菜单按钮、当前位置、全局搜索入口、组合入口、仓库链接
import { computed } from 'vue';
import { domainOf, REPO_URL } from '../kb';
import { state, toast } from '../state';
import AppIcon from './AppIcon.vue';

const domain = computed(() => domainOf(state.domain));
const section = computed(() => domain.value.sections.find((s) => s.key === state.section));
const mac = /Mac|iPhone|iPad/.test(navigator.platform);
defineEmits<{ picks: [] }>();
</script>

<template>
  <header class="top">
    <button type="button" class="icon-btn menu" aria-label="打开板块菜单" @click="state.navOpen = true">
      <AppIcon name="menu" :size="20" />
    </button>
    <p class="crumb">
      <span>{{ domain.name }}</span
      ><AppIcon name="chevron" :size="14" /><b>{{ section?.name }}</b>
    </p>
    <button type="button" class="search" @click="state.paletteOpen = true">
      <AppIcon name="search" :size="16" />
      <span class="ph">{{ domain.searchHint ?? '搜索条目' }}</span>
      <kbd>{{ mac ? '⌘' : 'Ctrl' }}</kbd
      ><kbd>K</kbd>
    </button>
    <button
      type="button"
      class="btn picks"
      :class="{ has: state.picks.length }"
      :aria-label="`组合，${state.picks.length} 条`"
      @click="state.picks.length ? $emit('picks') : toast('还没有加入组合的条目：在卡片或详情里点「组合」')"
    >
      <AppIcon name="stack" :size="16" /><span class="pl">组合</span
      ><span v-if="state.picks.length" class="badge">{{ state.picks.length }}</span>
    </button>
    <a
      class="btn gh"
      :href="REPO_URL"
      target="_blank"
      rel="noopener"
      aria-label="GitHub 仓库（新窗口打开）"
      title="GitHub 仓库"
    >
      <AppIcon name="github" :size="16" />
    </a>
  </header>
</template>

<style scoped>
.top {
  position: sticky;
  top: env(safe-area-inset-top, 0px);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: 60px;
  padding: 0 max(var(--space-6), calc((100% - 1480px) / 2 + var(--space-6)));
  background: color-mix(in srgb, var(--surface-page) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-subtle);
}
.menu {
  display: none;
  margin-left: -8px;
}
.crumb {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  white-space: nowrap;
}
.crumb b {
  color: var(--text-primary);
  font-weight: 600;
}
.search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 0 1 380px;
  min-width: 0;
  margin-left: auto;
  height: var(--control-h);
  padding: 0 8px 0 12px;
  border: 1px solid var(--border-control);
  border-radius: 10px;
  background: var(--surface-raised);
  color: var(--text-secondary);
  font-size: 14px;
  text-align: left;
  transition: border-color var(--dur) var(--ease);
}
@media (hover: hover) {
  .search:hover {
    border-color: var(--border-strong);
  }
}
.ph {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-placeholder);
}
.picks {
  gap: 6px;
}
.gh {
  width: var(--control-h);
  padding: 0;
}
.badge {
  min-width: 20px;
  height: 20px;
  padding: 0 8px;
  border-radius: 10px;
  background: var(--surface-muted);
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
}
.picks.has .badge {
  background: var(--accent);
  color: var(--text-on-accent);
}
@media (max-width: 1023px) {
  .menu {
    display: inline-grid;
  }
}
@media (max-width: 639px) {
  .top {
    padding: 0 var(--space-4);
    gap: var(--space-2);
  }
  .crumb span,
  .crumb svg {
    display: none;
  }
  .search {
    flex: 1;
    padding: 0 12px;
  }
  .search kbd {
    display: none;
  }
  .pl,
  .gh {
    display: none;
  } /* 手机顶栏留给搜索，仓库入口在菜单底部和页脚 */
}
</style>
