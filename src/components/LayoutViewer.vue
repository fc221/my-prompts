<script setup lang="ts">
// 布局放大查看：全屏显示示意页面，可切换桌面 / 手机、开关区域标注。Esc 或关闭按钮退出
import { nextTick, ref, watch } from 'vue';
import type { KbEntry } from '../types';
import WireMock from '../mock/WireMock.vue';
import AppIcon from './AppIcon.vue';

const props = defineProps<{ entry: KbEntry }>();
const open = defineModel<boolean>('open', { default: false });
const annotate = defineModel<boolean>('annotate', { default: true });
const device = ref<'desk' | 'phone'>('desk');
const dlg = ref<HTMLDialogElement>();
watch(open, async (o) => {
  await nextTick();
  if (o && !dlg.value?.open) {
    device.value = 'desk';
    dlg.value?.showModal();
  }
  if (!o && dlg.value?.open) dlg.value.close();
});
</script>

<template>
  <dialog ref="dlg" class="viewer" :aria-label="`${props.entry.zh}放大查看`" @close="open = false">
    <header class="vh">
      <b>{{ entry.zh }}</b>
      <div v-if="entry.wireMobile" class="seg" role="group" aria-label="设备">
        <button type="button" :aria-pressed="device === 'desk'" @click="device = 'desk'">
          <AppIcon name="monitor" :size="16" />桌面
        </button>
        <button type="button" :aria-pressed="device === 'phone'" @click="device = 'phone'">
          <AppIcon name="stack" :size="16" />手机
        </button>
      </div>
      <button type="button" class="btn sm" :aria-pressed="annotate" @click="annotate = !annotate">
        <AppIcon :name="annotate ? 'check' : 'layout'" :size="16" />区域标注
      </button>
      <span class="sp" />
      <button type="button" class="icon-btn" aria-label="关闭放大查看" @click="open = false">
        <AppIcon name="x" :size="20" />
      </button>
    </header>
    <div v-if="open && entry.wire" class="vb">
      <WireMock
        :wire="entry.wire"
        :mobile="entry.wireMobile"
        :name="entry.zh"
        mode="full"
        :device="device"
        :annotate="annotate"
      />
    </div>
  </dialog>
</template>

<style scoped>
.viewer {
  width: 100vw;
  max-width: 100vw;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  padding: 0;
  border: 0;
  background: var(--surface-page);
  color: var(--text-primary);
}
.viewer::backdrop {
  background: var(--scrim);
}
.viewer[open] {
  display: flex;
  flex-direction: column;
  animation: fade 240ms var(--ease);
}
.vh {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4) var(--space-3) var(--space-6);
  padding-top: max(var(--space-3), env(safe-area-inset-top, 0px));
  border-bottom: 1px solid var(--border-subtle);
  background: var(--surface-raised);
}
.vh b {
  font-size: 16px;
  white-space: nowrap;
}
.sp {
  flex: 1;
}
.seg {
  display: flex;
  gap: 2px;
  padding: 4px;
  border-radius: 10px; /* 同心圆角：内 6 + 槽内边距 4 */
  background: var(--surface-muted);
}
.seg button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: var(--radius-control);
  background: none;
  color: var(--text-secondary);
  font-size: 13px;
}
.seg button[aria-pressed='true'] {
  background: var(--surface-raised);
  color: var(--text-primary);
  font-weight: 600;
  box-shadow: var(--shadow-1);
}
.vb {
  flex: 1;
  min-height: 0;
}
@media (max-width: 639px) {
  .vh {
    flex-wrap: wrap;
    padding-left: var(--space-4);
  }
}
</style>
