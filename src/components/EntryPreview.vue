<script setup lang="ts">
// 条目预览：有实时示例用示例，有布局示意用示意图，纯文字条目画一张文档式预览（清单列勾选项，知识条目列要点，提示词显示开头）
import { computed } from 'vue';
import type { KbEntry } from '../types';
import DemoHost from './DemoHost.vue';
import WireMock from '../mock/WireMock.vue';

const props = defineProps<{ entry: KbEntry; lazy?: boolean; big?: boolean; annotate?: boolean }>();
const isChecklist = computed(() => props.entry.sec === 'checklists');
const isNotes = computed(() => props.entry.sec !== 'prompts' && !!props.entry.rules?.length);
const lines = computed(() => (props.entry.rules ?? []).slice(0, props.big ? 8 : 4));
const snippet = computed(() => props.entry.prompt.replace(/\s+/g, ' ').slice(0, props.big ? 220 : 90));
</script>

<template>
  <DemoHost v-if="entry.demo" :demo="entry.demo" :id="entry.id" :lazy="lazy" />
  <WireMock
    v-else-if="entry.wire"
    :wire="entry.wire"
    :mobile="entry.wireMobile"
    :name="entry.zh"
    :mode="big ? 'detail' : 'card'"
    :annotate="annotate"
  />
  <div v-else class="doc" :class="{ big }">
    <div class="paper">
      <template v-if="isChecklist || isNotes">
        <p v-if="isNotes" class="kicker">要点</p>
        <p v-for="(r, i) in lines" :key="i" class="ck">
          <span :class="isChecklist ? 'box' : 'dot'" aria-hidden="true" />{{ r }}
        </p>
      </template>
      <template v-else>
        <p class="kicker">提示词模板</p>
        <p class="snip">{{ snippet }}…</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.doc {
  height: 100%;
  padding: 16px 16px 0;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--sec, var(--accent)) 10%, var(--surface-muted)),
    var(--surface-muted)
  );
  overflow: hidden;
}
.paper {
  height: 100%;
  padding: 12px 16px;
  border-radius: 10px 10px 0 0;
  background: var(--surface-raised);
  box-shadow: var(--shadow-1);
  display: grid;
  align-content: start;
  gap: 6px;
  overflow: hidden;
}
.kicker {
  margin: 0;
  color: var(--text-secondary);
  font-size: 12px;
  letter-spacing: 0.08em;
}
.snip {
  margin: 0;
  color: var(--text-primary);
  font-size: 13px;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.big .snip {
  -webkit-line-clamp: 8;
}
.ck {
  margin: 0;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  color: var(--text-primary);
  font-size: 12px;
  line-height: 1.5;
}
.ck {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.big .ck {
  -webkit-line-clamp: 2;
  font-size: 13px;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin: 0 10px 0 3px;
  vertical-align: 3px;
  border-radius: 50%;
  background: var(--sec, var(--accent));
}
.box {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  vertical-align: -2px;
  border: 1.5px solid var(--sec, var(--accent));
  border-radius: 3px;
}
</style>
