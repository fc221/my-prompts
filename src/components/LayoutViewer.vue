<script setup lang="ts">
// 布局放大查看：全屏显示示意页面，可切换案例、桌面 / 手机、开关区域标注。Esc 或关闭按钮退出
import { computed, nextTick, ref, watch } from 'vue';
import type { KbEntry } from '../types';
import { casesOf, headOf } from '../kb';
import { openDetail } from '../state';
import WireMock from '../mock/WireMock.vue';
import { isFrame } from '../mock/infer';
import AppIcon from './AppIcon.vue';
import CaseTabs from './CaseTabs.vue';

const props = defineProps<{ entry: KbEntry }>();
const cases = computed(() => casesOf(props.entry));
const head = computed(() => headOf(props.entry));
const open = defineModel<boolean>('open', { default: false });
const annotate = defineModel<boolean>('annotate', { default: true });
// 外观：贴边（默认）或卡片式，只对带侧栏、顶栏这类框架的示意图有意义
const floating = defineModel<boolean>('floating', { default: false });
const frameWire = computed(() => isFrame(props.entry.wire));
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
      <b>{{ head.zh }}</b>
      <CaseTabs v-if="cases.length" :items="cases" :active="entry.id" @pick="openDetail" />
      <div v-if="entry.wireMobile" class="seg" role="group" aria-label="设备">
        <button type="button" :aria-pressed="device === 'desk'" @click="device = 'desk'">
          <AppIcon name="monitor" :size="16" />桌面
        </button>
        <button type="button" :aria-pressed="device === 'phone'" @click="device = 'phone'">
          <AppIcon name="stack" :size="16" />手机
        </button>
      </div>
      <div v-if="frameWire && device === 'desk'" class="seg" role="group" aria-label="外观">
        <button type="button" :aria-pressed="!floating" @click="floating = false">贴边</button>
        <button type="button" :aria-pressed="floating" @click="floating = true">卡片式</button>
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
        :floating="floating"
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
  flex-wrap: wrap;
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
.vb {
  flex: 1;
  min-height: 0;
}
@media (max-width: 639px) {
  .vh {
    padding-left: var(--space-4);
  }
}
</style>
