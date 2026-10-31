<script setup lang="ts">
// 实时示例：渲染在 Shadow DOM 里，样式与网页隔离；lazy 时进入视口才挂载
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { Demo } from '../types';

const props = defineProps<{ demo: Demo; id: string; lazy?: boolean }>();
const host = ref<HTMLElement>();
let io: IntersectionObserver | undefined;
// 示例里的控制按钮（重播、模拟操作、切换状态）统一用 class="ctl"（只认 button，示例里别的元素同名不受影响），外观和知识库的次要按钮一致，不用浏览器默认样式；排在示例自己的样式之前，示例可以覆盖位置
const CTL =
  ':where(button).ctl{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 14px;border:1px solid #d0d5dd;border-radius:8px;background:#fff;color:#1f2937;font:500 13px/1 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;box-shadow:0 1px 2px rgba(16,24,40,.06);transition:background-color .15s,border-color .15s}:where(button).ctl:hover{background:#f5f6f8;border-color:#c4cad4}:where(button).ctl:active{background:#eceff3}:where(button).ctl:focus-visible{outline:2px solid #2563eb;outline-offset:2px}';

function mount() {
  const el = host.value;
  if (!el) return;
  const root = el.shadowRoot ?? el.attachShadow({ mode: 'open' });
  // 宿主也是尺寸容器：示例在 @container 里写根元素本身（如 .st）时才有容器可查
  root.innerHTML = `<style>:host{display:block;height:100%;overflow:hidden;color-scheme:light;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}${CTL}${props.demo.css}</style>${props.demo.html}`;
  try {
    props.demo.js?.(root);
  } catch (err) {
    console.error(props.id, err);
  }
}

onMounted(() => {
  if (!props.lazy) return mount();
  io = new IntersectionObserver(
    (list) => {
      if (list.some((x) => x.isIntersecting)) {
        io?.disconnect();
        mount();
      }
    },
    { rootMargin: '240px' },
  );
  if (host.value) io.observe(host.value);
});
onBeforeUnmount(() => io?.disconnect());
</script>

<template>
  <div ref="host" class="demo-host" />
</template>

<style scoped>
.demo-host {
  height: 100%;
}
</style>
