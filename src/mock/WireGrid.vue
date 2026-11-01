<script setup lang="ts">
// 示意页面的网格：按 areas 摆放区域，叶子区域交给 MockBlock，带 inner 的递归渲染。
// 只占一行、且全是“条”类区域（顶栏、标签栏、筛选条…）的行改成 auto，按真实高度显示，不按百分比拉伸。
// 所在行全是 auto 的区域按内容高度画（fit），这样数据里用 auto 行 + 末尾 1fr 就能让内容紧凑排列，不被百分比撑出空白。
// 单行嵌套里全是条类区域、并且有 Logo / 导航 / 账号 / 筛选项时，画成一整条白色横栏（顶栏、筛选区），导航横排。
// drawer：盖在页面上的左侧抽屉或底部面板，后面加遮罩；root 时贴到画布边缘（盖住状态栏和边距）。底部面板放单个区块时高度贴内容，size 只是上限。
// annotate：给每个区域画虚线框和名称（主体区域用强调色），标注的字号按缩放比例反向放大，缩略图里也看得清
import { computed } from 'vue';
import type { MockKind, Wire, WireBox } from '../types';
import MockBlock from './MockBlock.vue';
import { BAR, inferKind } from './infer';

// open：抽屉画成打开还是收起；不传时按数据里的 drawer.open（导航抽屉默认收起，页面本身才是手机端的默认样子）
// open 默认 undefined：Vue 会把没传的布尔属性当成 false，那样数据里的 drawer.open 就不起作用
const props = withDefaults(
  defineProps<{
    w: Wire;
    seed?: number;
    annotate?: boolean;
    inline?: boolean;
    dark?: boolean;
    root?: boolean;
    open?: boolean;
  }>(),
  { open: undefined },
);
const SURF = new Set<MockKind>(['brand', 'nav', 'avatar', 'select', 'objhead', 'stepitem']);
const norm = (v: string | WireBox): WireBox => (typeof v === 'string' ? { label: v } : v);
const kindOf = (b: WireBox) => b.kind ?? inferKind(b.label);
const leaves = (w: Wire) => Object.values(w.boxes).map(norm);
// 单行嵌套、全是条类区域（导航在这里算横条）
const isStrip = (w?: Wire) =>
  !!w &&
  (w.rows ?? '1fr').trim().split(/\s+/).length === 1 &&
  leaves(w).every((b) => !b.inner && (BAR.has(kindOf(b)) || kindOf(b) === 'nav'));
const cells = computed(() => props.w.areas.map((r) => r.trim().split(/\s+/)));

const boxes = computed(() =>
  Object.entries(props.w.boxes).map(([area, v], i) => {
    const b = norm(v);
    const strip = isStrip(b.inner);
    return {
      area,
      b,
      kind: kindOf(b),
      seed: (props.seed ?? 0) + i,
      strip,
      surf: strip && leaves(b.inner!).some((c) => SURF.has(kindOf(c))),
      lane: !!b.inner && leaves(b.inner).some((c) => kindOf(c) === 'colhead'),
    };
  }),
);
const tracks = computed(() => {
  const list = (props.w.rows ?? '1fr').trim().split(/\s+(?![^(]*\))/);
  if (list.length !== cells.value.length) return list;
  const span = (name: string) => cells.value.filter((r) => r.includes(name)).length;
  return list.map((t, y) => {
    const own = [...new Set(cells.value[y])].filter((n) => n !== '.' && span(n) === 1);
    const bar =
      own.length > 0 &&
      own.every((n) => {
        const x = boxes.value.find((b) => b.area === n);
        return x && (x.b.inner ? x.strip : BAR.has(x.kind));
      });
    return bar && /%$/.test(t) ? 'auto' : t;
  });
});
const fit = (area: string) => {
  const ys = cells.value.flatMap((r, y) => (r.includes(area) ? [y] : []));
  return ys.length > 0 && ys.every((y) => tracks.value[y] === 'auto');
};
const style = computed(() => ({
  gridTemplateColumns: props.w.cols ?? '1fr',
  gridTemplateRows: tracks.value.join(' '),
  gridTemplateAreas: props.w.areas.map((r) => `'${r}'`).join(' '),
}));
const dr = computed(() => {
  const d = props.w.drawer;
  if (!d || !(props.open ?? d.open)) return null;
  const b = norm(d.box);
  return { b, kind: kindOf(b), side: d.side ?? 'left', size: d.size, height: d.height, seed: (props.seed ?? 0) + 20 };
});
</script>

<template>
  <div class="wg" :style="style">
    <div
      v-for="x in boxes"
      :key="x.area"
      class="cell"
      :class="{
        nest: x.b.inner,
        dark: x.b.inner && x.b.dark,
        surf: x.surf,
        lane: x.lane,
        fit: fit(x.area),
        card: x.b.card,
        ann: annotate && x.b.label,
        acc: x.b.acc,
      }"
      :style="{ gridArea: x.area }"
    >
      <WireGrid
        v-if="x.b.inner"
        :w="x.b.inner"
        :seed="x.seed * 7"
        :annotate="annotate"
        :inline="x.surf"
        :dark="x.b.dark || dark"
      />
      <MockBlock
        v-else
        :kind="x.kind"
        :label="x.b.label"
        :text="x.b.text"
        :acc="x.b.acc"
        :dark="x.b.dark ?? dark"
        :inline="inline"
        :center="x.b.center"
        :fit="fit(x.area)"
        :seed="x.seed"
      />
      <span v-if="annotate && x.b.label" class="tag">{{ x.b.label }}</span>
    </div>
    <template v-if="dr">
      <div class="scrim" :class="{ bleed: root }" />
      <div
        class="cell drawer"
        :class="[
          dr.side,
          { bleed: root, nest: dr.b.inner, dark: dr.b.dark, ann: annotate && dr.b.label, acc: dr.b.acc },
        ]"
        :style="
          dr.side === 'bottom'
            ? dr.b.inner
              ? { height: dr.size }
              : { maxHeight: dr.size }
            : { width: dr.size, height: dr.height }
        "
      >
        <WireGrid v-if="dr.b.inner" :w="dr.b.inner" :seed="dr.seed" :annotate="annotate" :dark="dr.b.dark" />
        <MockBlock v-else :kind="dr.kind" :label="dr.b.label" :text="dr.b.text" :dark="dr.b.dark" :seed="dr.seed" />
        <span v-if="annotate && dr.b.label" class="tag">{{ dr.b.label }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.wg {
  position: relative;
  display: grid;
  gap: 16px;
  flex: 1;
  min-width: 0;
  min-height: 0;
}
/* 单元格也是容器：区域里针对自身宽度的规则（窄时改竖排、换卡片）以单元格宽度为准；inline-size 不限制高度，auto 行照常由内容撑开 */
.cell {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  container-type: inline-size;
}
.cell > :deep(.blk) {
  flex: 1;
}
/* 按内容高度排的区域：内容总高超过画布时不往回压（压了会把内容裁掉），超出部分像长页面一样被屏幕边缘截住 */
.cell.fit {
  min-height: auto;
}
/* 看板列：浅灰底的整列，列头在列里 */
.nest.lane {
  padding: 12px;
  background: #eceff3;
  border-radius: 14px;
}
.nest.lane > .wg {
  gap: 10px;
}
.nest {
  border-radius: 14px;
}
.nest.dark {
  padding: 24px;
  background: #111827;
}
/* 整条横栏（顶栏、筛选区）：白底一条，里面的区域紧凑排列 */
.nest.surf {
  padding: 12px 20px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
.nest.surf > .wg {
  align-items: center;
}
/* 白色卡片（登录卡片、手机屏幕） */
/* 卡片和弹层里的表单不再套一层卡片 */
.nest.card :deep(.k-form),
.drawer :deep(.k-form) {
  border-color: transparent;
  padding: 0;
}
.nest.card {
  padding: 28px 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow:
    0 0 0 1px #e5e7eb,
    0 16px 36px -18px rgba(15, 23, 42, 0.3);
}
/* 抽屉 / 底部面板：盖在页面上，后面是遮罩；贴边时用画布的边距变量（--pt 顶部、--px 左右下）伸到屏幕边缘 */
.scrim {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: rgba(15, 23, 42, 0.45);
}
.scrim.bleed {
  inset: calc(-1 * var(--pt, 0px)) calc(-1 * var(--px, 0px)) calc(-1 * var(--px, 0px));
}
.drawer {
  position: absolute;
  z-index: 4;
  background: #fff;
  border-radius: 0;
}
/* 左侧抽屉：浮动圆角卡片，离屏幕左、下边 12px，顶部让开状态栏 */
.drawer.left {
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 16px;
  box-shadow: 0 16px 40px -12px rgba(15, 23, 42, 0.45);
}
.drawer.left.bleed {
  top: calc(-1 * var(--pt, 0px) + 40px);
  bottom: calc(-1 * var(--px, 0px) + 12px);
  left: calc(-1 * var(--px, 0px) + 12px);
}
.drawer.right {
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: 16px;
  box-shadow: 0 16px 40px -12px rgba(15, 23, 42, 0.45);
}
.drawer.right.bleed {
  top: calc(-1 * var(--pt, 0px) + 12px);
  bottom: calc(-1 * var(--px, 0px) + 12px);
  right: calc(-1 * var(--px, 0px) + 12px);
}
/* 居中弹窗：size 宽、height 高 */
.drawer.center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  box-shadow: 0 24px 60px -16px rgba(15, 23, 42, 0.5);
}
.drawer.bottom {
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 18px 18px 0 0;
  box-shadow: 0 -12px 32px -12px rgba(15, 23, 42, 0.35);
}
.drawer.bottom.bleed {
  left: calc(-1 * var(--px, 0px));
  right: calc(-1 * var(--px, 0px));
  bottom: calc(-1 * var(--px, 0px));
}
.drawer.dark {
  background: #111827;
}
.drawer.nest {
  padding-left: 4px;
  padding-right: 4px;
}
.drawer.nest > .wg {
  padding: 16px;
  gap: 16px;
}
/* 底部面板放单个区块时高度贴内容：区块默认是尺寸型容器，高度不能由内容撑起，这里改成只按宽度查询 */
.drawer.bottom:not(.nest) > :deep(.blk) {
  container-type: inline-size;
  flex: none;
}
/* 底部面板里的表单：把手上下 12px，两侧 16px，底部多留安全区 */
.drawer.bottom > :deep(.k-form) {
  padding: 12px 16px 28px;
}
.drawer.center.nest > .wg,
.drawer.right.nest > .wg {
  padding: 20px;
  gap: 16px;
}
.drawer > :deep(.blk),
.drawer :deep(.k-nav) {
  border-color: transparent;
  border-radius: 0;
  background: transparent;
}
.drawer :deep(.k-nav) {
  padding-left: 4px;
  padding-right: 4px;
}

/* 区域标注：虚线框 + 名称；主体区域实线强调色 + 浅底 */
.ann::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  border: calc(2px / var(--k, 1)) dashed rgba(100, 116, 139, 0.7);
  background: rgba(100, 116, 139, 0.05);
  pointer-events: none;
}
.ann.acc::after {
  border-style: solid;
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.07);
}
.tag {
  position: absolute;
  left: calc(10px / var(--k, 1));
  top: calc(-9px / var(--k, 1));
  z-index: 2;
  max-width: calc(100% - 12px / var(--k, 1));
  padding: calc(1px / var(--k, 1)) calc(7px / var(--k, 1));
  border-radius: calc(5px / var(--k, 1));
  background: #334155;
  color: #fff;
  font:
    600 calc(11px / var(--k, 1)) / 1.5 system-ui,
    'PingFang SC',
    sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}
.ann.acc > .tag {
  background: #2563eb;
}
.drawer.bottom.ann::after {
  border-radius: 18px 18px 0 0;
}
</style>
