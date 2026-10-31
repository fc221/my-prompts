<script setup lang="ts">
// 布局示意：先按真实尺寸渲染整页（桌面 1280×800、手机 375×780），再整体缩放到容器里，看起来就是一张真实页面的缩略图。
// mode：card 卡片缩略图（手机框叠在桌面右下角）；detail 详情（桌面、手机并排）；full 放大查看（只显示 device 指定的一端）
// 手机端有抽屉（wireMobile.drawer）时，缩略图和详情只画默认状态（抽屉收起）；放大查看手机时并排画“默认”和“点 ☰ 后”两个状态
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { Wire } from '../types';
import WireGrid from './WireGrid.vue';

const props = withDefaults(
  defineProps<{
    wire: Wire;
    mobile?: Wire;
    name?: string;
    mode?: 'card' | 'detail' | 'full';
    annotate?: boolean;
    device?: 'desk' | 'phone';
  }>(),
  { mode: 'card', device: 'desk' },
);
const DW = 1280,
  DH = 800,
  PW = 375,
  PH = 780;
const stage = ref<HTMLElement>();
const size = ref({ w: 0, h: 0 });
const visible = ref(props.mode !== 'card');
let ro: ResizeObserver | undefined, io: IntersectionObserver | undefined;

const chrome = computed(() => (props.mode === 'card' ? 12 : props.mode === 'detail' ? 18 : 26));
const showDesk = computed(() => props.mode !== 'full' || props.device === 'desk' || !props.mobile);
const showPhone = computed(() => !!props.mobile && (props.mode !== 'full' || props.device === 'phone'));
// 要画的手机状态：false 默认，true 抽屉打开
const states = computed<(boolean | undefined)[]>(() =>
  props.mode === 'full' && props.mobile?.drawer ? [false, true] : [undefined],
);
const cap = computed(() => (states.value.length > 1 ? 30 : 0));
// 各个框的缩放比例和外框尺寸
const layout = computed(() => {
  const { w, h } = size.value;
  if (!w || !h) return null;
  if (props.mode === 'card') {
    const kd = Math.min(w / DW, (h - chrome.value) / DH);
    const kp = (h * 0.7) / PH;
    return { kd, kp };
  }
  if (props.mode === 'detail' && showPhone.value) {
    const kp = (h - 4) / PH,
      pw = PW * kp + 16;
    return { kd: Math.min((w - pw - 16) / DW, (h - chrome.value) / DH), kp };
  }
  const n = states.value.length;
  return {
    kd: Math.min(w / DW, (h - chrome.value) / DH),
    kp: Math.min((w - (n - 1) * 32) / (PW * n), (h - 8 - cap.value) / PH),
  };
});

onMounted(() => {
  ro = new ResizeObserver(([e]) => {
    size.value = { w: e.contentRect.width, h: e.contentRect.height };
  });
  if (stage.value) ro.observe(stage.value);
  if (!visible.value && stage.value) {
    io = new IntersectionObserver(
      (list) => {
        if (list.some((x) => x.isIntersecting)) {
          visible.value = true;
          io?.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(stage.value);
  }
});
onBeforeUnmount(() => {
  ro?.disconnect();
  io?.disconnect();
});
</script>

<template>
  <!-- 示意图是一张图：读屏只读名称，不逐个读里面的示例文案 -->
  <div
    ref="stage"
    class="stage"
    :class="`m-${mode}`"
    role="img"
    :aria-label="`${name ?? '布局'}示意图${mobile ? '，含手机端变形' : ''}`"
  >
    <template v-if="visible && layout">
      <div
        v-if="showDesk"
        class="frame desk"
        :style="{ width: `${DW * layout.kd}px`, height: `${DH * layout.kd + chrome}px` }"
      >
        <div class="chrome" :style="{ height: `${chrome}px` }"><i /><i /><i /><span /></div>
        <div class="vp" :style="{ height: `${DH * layout.kd}px` }">
          <div
            class="canvas desk-c"
            :class="{ ann: annotate }"
            :style="{ width: `${DW}px`, height: `${DH}px`, transform: `scale(${layout.kd})`, '--k': layout.kd }"
          >
            <WireGrid :w="wire" :annotate="annotate" root />
          </div>
        </div>
      </div>
      <template v-if="showPhone">
        <figure v-for="o in states" :key="String(o)" class="pfig">
          <div class="frame phone" :style="{ width: `${PW * layout.kp}px`, height: `${PH * layout.kp}px` }">
            <div
              class="canvas phone-c"
              :class="{ ann: annotate }"
              :style="{ width: `${PW}px`, height: `${PH}px`, transform: `scale(${layout.kp})`, '--k': layout.kp }"
            >
              <WireGrid :w="mobile!" :seed="3" :annotate="annotate" root :open="o" />
            </div>
          </div>
          <figcaption v-if="cap">
            {{
              (
                {
                  bottom: ['收起', '打开底部面板'],
                  left: ['默认', '点 ☰ 打开菜单'],
                  right: ['默认', '打开设置'],
                  center: ['默认', '打开设置'],
                } as const
              )[mobile?.drawer?.side ?? 'left'][o ? 1 : 0]
            }}
          </figcaption>
        </figure>
      </template>
    </template>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 100%;
  padding: 12px;
  background: linear-gradient(180deg, #eef1f6, #e4e9f1);
  color-scheme: light;
  overflow: hidden;
}
.m-detail {
  padding: 16px;
}
.m-full {
  padding: 24px;
  background: transparent;
}
.frame {
  position: relative;
  flex: none;
  overflow: hidden;
  background: #f5f7fa;
}
.desk {
  border-radius: 10px;
  box-shadow:
    0 0 0 1px #d8dde6,
    0 12px 28px -14px rgba(15, 23, 42, 0.35);
}
.chrome {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
  background: #fff;
  border-bottom: 1px solid #e8ebf0;
}
.chrome i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d4d8df;
}
.chrome span {
  margin-left: 10px;
  width: 30%;
  height: 40%;
  max-height: 10px;
  border-radius: 4px;
  background: #eef0f4;
}
.vp {
  position: relative;
  overflow: hidden;
}
/* 画布边距写成变量（--pt 顶部、--px 左右下），抽屉要用它伸到屏幕边缘 */
.canvas {
  --pt: 20px;
  --px: 20px;
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 0 0;
  display: flex;
  padding: var(--pt) var(--px) var(--px);
  background: #f5f7fa;
}
.phone-c {
  --pt: 44px;
  --px: 14px;
}
/* 标注时标签骑在区域边框上：给画布留出边距（换算成屏幕上约 14px），最上面一排的标签不被裁掉 */
.canvas.ann {
  --pt: max(20px, calc(16px / var(--k, 1)));
  --px: max(20px, calc(16px / var(--k, 1)));
}
.phone-c.ann {
  --pt: max(44px, calc(16px / var(--k, 1)));
}
.pfig {
  margin: 0;
  display: grid;
  justify-items: center;
  gap: 10px;
}
.pfig figcaption {
  color: var(--text-secondary, #6b7280);
  font-size: 13px;
  line-height: 20px;
}
.m-full .stage,
.m-full {
  gap: 32px;
}
.phone {
  border-radius: 22px;
  box-shadow:
    0 0 0 3px #1f2937,
    0 14px 30px -12px rgba(15, 23, 42, 0.45);
}
.phone::before {
  content: '';
  position: absolute;
  z-index: 3;
  top: 3%;
  left: 50%;
  width: 30%;
  height: 2.6%;
  transform: translateX(-50%);
  border-radius: 99px;
  background: #1f2937;
}
/* 卡片：手机框叠在桌面框右下角 */
.m-card .pfig {
  display: contents;
}
.m-card .phone {
  position: absolute;
  right: 14px;
  bottom: 10px;
  border-radius: 14px;
  box-shadow:
    0 0 0 2px #1f2937,
    0 10px 22px -8px rgba(15, 23, 42, 0.5);
}
.m-card .desk {
  margin-right: auto;
}
.m-card:has(.phone) .desk {
  margin-left: 0;
}
</style>
