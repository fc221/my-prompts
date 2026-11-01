<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { listed, matchesAny, REPO_URL } from './kb';
import type { KbEntry } from './types';
import { state } from './state';
import AppIcon from './components/AppIcon.vue';
import AppSidebar from './components/AppSidebar.vue';
import AppTopbar from './components/AppTopbar.vue';
import SectionHeader from './components/SectionHeader.vue';
import EntryCard from './components/EntryCard.vue';
import DetailDrawer from './components/DetailDrawer.vue';
import PickTray from './components/PickTray.vue';
import CommandPalette from './components/CommandPalette.vue';

const trayOpen = ref(false);
const shown = computed(() =>
  listed.filter(
    (e) =>
      e.domain === state.domain &&
      e.sec === state.section &&
      (state.category === '全部' || e.cat === state.category) &&
      matchesAny(e, state.filter.trim()),
  ),
);
// 条目已按分类排好：连续同分类的归一组，「全部」时每组上面写分类名
const groups = computed(() =>
  shown.value.reduce<{ cat: string; items: KbEntry[] }[]>((g, e) => {
    if (g.at(-1)?.cat !== e.cat) g.push({ cat: e.cat, items: [] });
    g.at(-1)!.items.push(e);
    return g;
  }, []),
);
function clearFilters() {
  state.category = '全部';
  state.filter = '';
}
// 空结果时写清当前条件；筛选时播报结果数
const conds = computed(() =>
  [state.filter.trim() && `「${state.filter.trim()}」`, state.category !== '全部' && `「${state.category}」分类`]
    .filter(Boolean)
    .join(' + '),
);

// 手机：板块菜单抽屉
const navDlg = ref<HTMLDialogElement>();
watch(
  () => state.navOpen,
  async (o) => {
    await nextTick();
    if (o && !navDlg.value?.open) {
      navDlg.value?.showModal();
      navDlg.value?.focus(); // showModal 默认聚焦第一个分类，手机上会显示焦点框
    }
    if (!o && navDlg.value?.open) navDlg.value.close();
  },
);
// 切换板块后回到顶部
watch(
  () => [state.domain, state.section],
  () => window.scrollTo({ top: 0 }),
);

// 侧栏折叠动画（FLIP）：布局宽度一次切到位，右侧卡片只重排一次；
// 侧栏外观面板（绝对定位、不占布局）动画宽度，内容区用 transform 从旧位置滑到新位置，两者同步
const railPanel = ref<HTMLElement>();
const mainEl = ref<HTMLElement>();
watch(
  () => state.collapsed,
  async () => {
    const panel = railPanel.value,
      main = mainEl.value;
    if (!panel || !main || !panel.offsetParent || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const left0 = main.getBoundingClientRect().left,
      w0 = panel.getBoundingClientRect().width;
    await nextTick();
    const left1 = main.getBoundingClientRect().left,
      w1 = panel.getBoundingClientRect().width;
    const timing = { duration: 240, easing: 'cubic-bezier(.2, 0, 0, 1)' };
    panel.classList.add('animating');
    main.animate([{ transform: `translateX(${left0 - left1}px)` }, { transform: 'translateX(0)' }], timing);
    panel
      .animate([{ width: `${w0}px` }, { width: `${w1}px` }], timing)
      .finished.finally(() => panel.classList.remove('animating'));
  },
  { flush: 'pre' },
); // pre：在页面更新前量旧位置
</script>

<template>
  <div class="app">
    <aside class="rail" :class="{ mini: state.collapsed }">
      <div ref="railPanel" class="rail-panel"><AppSidebar collapsible /></div>
    </aside>
    <div ref="mainEl" class="main">
      <AppTopbar @picks="trayOpen = !trayOpen" />
      <main class="content" :class="{ tray: state.picks.length }">
        <SectionHeader />
        <template v-if="shown.length">
          <section v-for="g in groups" :key="g.cat" class="group" :aria-label="g.cat">
            <h2 v-if="state.category === '全部'" class="gh">
              {{ g.cat }}<span>{{ g.items.length }}</span>
            </h2>
            <div class="grid"><EntryCard v-for="e in g.items" :key="e.id" :entry="e" /></div>
          </section>
        </template>
        <div v-else class="empty">
          <p>
            <b>没有符合{{ conds }}的条目</b>换个关键词，或清除筛选看本板块全部条目。
          </p>
          <button type="button" class="btn" @click="clearFilters">清除筛选</button>
        </div>
        <p class="sr-only" role="status">{{ conds ? `符合${conds}的有 ${shown.length} 条` : '' }}</p>
      </main>
      <footer class="site-foot" :class="{ tray: state.picks.length }">
        <p>
          MyPrompts · © 2026 fc221 ·
          <a :href="`${REPO_URL}/blob/main/LICENSE`" target="_blank" rel="noopener">MIT 协议</a>
        </p>
        <nav aria-label="项目链接">
          <a :href="REPO_URL" target="_blank" rel="noopener"><AppIcon name="github" :size="16" />GitHub 仓库</a>
          <a :href="`${REPO_URL}/issues/new/choose`" target="_blank" rel="noopener">反馈问题</a>
          <a :href="`${REPO_URL}/blob/main/CONTRIBUTING.md`" target="_blank" rel="noopener">参与贡献</a>
        </nav>
      </footer>
    </div>

    <dialog
      ref="navDlg"
      tabindex="-1"
      class="navdrawer"
      aria-label="板块菜单"
      @close="state.navOpen = false"
      @click="(ev) => ev.target === navDlg && navDlg?.close()"
    >
      <AppSidebar />
    </dialog>
    <DetailDrawer />
    <PickTray v-model:open="trayOpen" />
    <CommandPalette />
    <div class="toast" role="status" aria-live="polite">
      <span v-if="state.toast">{{ state.toast }}</span>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  min-height: 100dvh;
  overflow-x: clip;
} /* 折叠动画时内容区短暂超出右边，不出现横向滚动 */
.rail {
  position: sticky;
  top: max(12px, env(safe-area-inset-top, 0px));
  z-index: 22;
  flex: none;
  width: var(--sidebar-w);
  height: calc(100dvh - 24px);
  margin: 12px 0 12px max(12px, env(safe-area-inset-left, 0px));
}
/* 外观面板绝对定位：动画它的宽度只影响侧栏自己，不让右侧逐帧重排 */
.rail-panel {
  position: absolute;
  inset: 0 auto 0 0;
  width: 100%;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-card);
  background: var(--surface-raised);
} /* 0 级面板：只用边框，不加投影 */
.rail-panel.animating {
  overflow: hidden;
}
.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding-block: var(--space-6) var(--space-10);
  padding-left: max(24px, env(safe-area-inset-left, 0px));
  padding-right: max(24px, env(safe-area-inset-right, 0px));
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-6);
  align-content: start;
} /* minmax(0, 1fr)：不让横滑的分类条把整页撑宽 */
.content.tray {
  padding-bottom: 120px;
} /* 右下角的组合托盘约 64px 高、离底 24px，最后一行卡片的按钮不能被它挡住 */
.site-foot {
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding-block: var(--space-4) var(--space-5);
  padding-left: max(24px, env(safe-area-inset-left, 0px));
  padding-right: max(24px, env(safe-area-inset-right, 0px));
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2) var(--space-5);
  border-top: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 13px;
}
.site-foot.tray {
  padding-bottom: 96px;
} /* 组合托盘浮在右下角，页脚链接不能被它挡住 */
.site-foot p {
  margin: 0;
}
.site-foot nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-4);
}
.site-foot a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 24px;
  color: inherit;
}
@media (hover: hover) {
  .site-foot a:hover {
    color: var(--text-primary);
    text-decoration: underline;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: var(--space-6);
}
.group {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}
.gh {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  margin: var(--space-2) 0 0;
  font-size: 16px;
  line-height: 24px;
}
.gh span {
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}
.empty {
  display: grid;
  justify-items: center;
  gap: var(--space-4);
  padding: var(--space-10) var(--space-4);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-card);
  color: var(--text-secondary);
  text-align: center;
  font-size: 14px;
}
.empty p {
  margin: 0;
  display: grid;
  gap: var(--space-1);
}
.empty b {
  color: var(--text-primary);
  font-size: 16px;
  line-height: 24px;
}
.navdrawer {
  position: fixed;
  inset: 0 auto 0 0;
  width: min(300px, 86vw);
  max-width: none;
  height: 100dvh;
  max-height: none;
  margin: 0;
  padding: 0 0 env(safe-area-inset-bottom, 0px);
  border: 0;
  border-right: 1px solid var(--border-subtle);
  background: var(--surface-raised);
  color: var(--text-primary);
  box-shadow: var(--shadow-3);
}
.navdrawer:focus {
  outline: none;
} /* 打开时焦点落在面板本身，不落到第一个分类上 */
.navdrawer::backdrop {
  background: var(--scrim);
}
.navdrawer[open] {
  animation: from-left 240ms var(--ease);
}
@keyframes from-left {
  from {
    transform: translateX(-24px);
    opacity: 0.5;
  }
}
.toast {
  position: fixed;
  top: max(72px, calc(env(safe-area-inset-top, 0px) + 72px));
  left: 50%;
  z-index: 60;
  transform: translateX(-50%);
  pointer-events: none;
}
.toast span {
  display: block;
  padding: 12px 16px;
  border-radius: 999px;
  background: var(--surface-inverse);
  color: var(--text-inverse);
  font-size: 14px;
  box-shadow: var(--shadow-2);
  animation: pop 240ms var(--ease);
}
@keyframes pop {
  from {
    transform: translateY(-6px);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .navdrawer[open],
  .toast span {
    animation: fade 160ms var(--ease);
  }
}
.rail.mini {
  width: 72px;
}
@media (max-width: 1023px) {
  .rail {
    display: none;
  }
}
@media (max-width: 639px) {
  .content {
    padding-block: var(--space-4) 96px;
    padding-left: max(16px, env(safe-area-inset-left, 0px));
    padding-right: max(16px, env(safe-area-inset-right, 0px));
    gap: var(--space-4);
  }
  .grid {
    gap: var(--space-4);
  }
}
</style>
