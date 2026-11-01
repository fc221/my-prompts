---
zh: 滑块
en: Slider
aka: 液态滑块 拖动条 range
order: 50
---

## 是什么

拖动圆钮在轨道上取一个值或一段范围，旁边同步显示数值。

## 适合

近似值或范围：音量、亮度、价格区间、相似度阈值，拖动时能即时看到效果。

## 不适合

需要精确值（金额、数量）用数字输入；离散选项少于 5 个用分段控件；只用滑块时读屏用户难以输入精确值，旁边配一个数字输入。

## 要点

- 用组件库的滑块：Element Plus el-slider（min、max、step、range、show-input、show-stops、marks、format-tooltip、range-start-label / range-end-label），Naive UI n-slider（min、max、step、range、marks、format-tooltip、tooltip、show-tooltip），Ant Design Vue a-slider（min、max、step、range、marks、dots、tipFormatter、tooltipOpen）；轨道、圆钮尺寸、键盘（方向键、PageUp / PageDown、Home / End）和 aria-valuenow 由组件负责
- 当前值带单位：用 format-tooltip / format-tooltip / tipFormatter 写“¥200”，默认只显示数字；需要精确时旁边配数字输入并双向同步（Element Plus 单值可直接开 show-input，范围滑块三家都要自己配两个数字输入）
- 拖动中实时预览，松手后才提交请求：Element Plus 用 input 事件预览、change 提交；Naive UI 用 on-update:value 预览、on-dragend 提交；Ant Design Vue 用 change 预览、afterChange 提交
- 范围滑块两个圆钮不能交叉是组件自带的；最小间距（“至少相隔 ¥100”）三家都没有，在更新回调里夹住
- 刻度只标关键值（marks）；要吸附到刻度用 Element Plus step="mark"、Naive UI step="mark"、Ant Design Vue dots
- 焦点样式检查一遍：圆钮聚焦要有 2px 实线环，组件默认只有光晕时用 :focus-visible 补 outline
- 价格区间这类大跨度的值用对数刻度，在 formatter 里换算；拉长、回弹这类手感只在自绘滑块里做，可选，不进默认要求

## 提示词

在{商品筛选区}加价格区间滑块：用项目组件库自带的滑块（Element Plus el-slider range；Naive UI n-slider range；Ant Design Vue a-slider range），不手写轨道和圆钮。范围 {0} 至 {5000}，step {50}；两钮不能交叉，至少相隔 ¥100，在更新回调里夹住；气泡用 format-tooltip / tipFormatter 显示“¥200”；上方显示“¥200 至 ¥1,500”，旁边两个数字输入与滑块双向同步；拖动时实时预览结果数量（input / on-update:value / change），松手才刷新列表（change / on-dragend / afterChange）；每个圆钮有读屏名称“最低价 / 最高价”（Element Plus range-start-label / range-end-label，另两家没有对应属性，渲染后给圆钮补 aria-label）；圆钮聚焦有 2px 实线环；窄屏滑块撑满。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:340px;display:flex;flex-direction:column;gap:20px}
.f{display:flex;flex-direction:column;gap:4px}
.hd{display:flex;justify-content:space-between;align-items:baseline}
output{font-variant-numeric:tabular-nums;color:#3b5bdb;font-weight:500}
input[type=range]{-webkit-appearance:none;appearance:none;display:block;width:100%;height:24px;background:none;cursor:pointer}
input[type=range]:focus-visible{outline:none}
input[type=range]::-webkit-slider-runnable-track{height:4px;background:none}
input[type=range]::-moz-range-track{height:4px;background:none}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;margin-top:-6px;border:2px solid #3b5bdb;border-radius:50%;background:#fff;box-sizing:border-box}
input[type=range]::-moz-range-thumb{width:16px;height:16px;border:2px solid #3b5bdb;border-radius:50%;background:#fff;box-sizing:border-box}
input[type=range]:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 4px #dfe6ff}
input[type=range]:active::-webkit-slider-thumb{box-shadow:0 0 0 4px #dfe6ff}
input[type=range]:focus-visible::-moz-range-thumb{box-shadow:0 0 0 4px #dfe6ff}
input[type=range].one{--p:.75;background:linear-gradient(#3b5bdb,#3b5bdb) left center/calc(var(--p) * (100% - 16px) + 8px) 4px no-repeat,linear-gradient(#e3e6eb,#e3e6eb) center/100% 4px no-repeat}
.dual{position:relative;height:24px;--a:.1;--b:.75}
.dual::before{content:"";position:absolute;left:0;right:0;top:10px;height:4px;border-radius:2px;background:#e3e6eb}
.fill{position:absolute;top:10px;height:4px;background:#3b5bdb;left:calc(var(--a) * (100% - 16px) + 8px);width:calc((var(--b) - var(--a)) * (100% - 16px))}
.dual input{position:absolute;inset:0;pointer-events:none}
.dual input::-webkit-slider-thumb{pointer-events:auto}
.dual input::-moz-range-thumb{pointer-events:auto}
</style>

<div class="s"><div class="w"><div class="f"><div class="hd"><span class="lab">价格区间</span><output class="v"></output></div><div class="dual"><div class="fill"></div><input type="range" min="0" max="2000" step="50" value="200" aria-label="最低价" class="lo"><input type="range" min="0" max="2000" step="50" value="1500" aria-label="最高价" class="hi"></div></div><div class="f"><div class="hd"><label class="lab" for="sim">相似度阈值</label><output class="v2" for="sim"></output></div><input type="range" id="sim" min="0" max="1" step="0.05" value="0.75" class="one"></div></div></div>

<script type="module">
export default function demo(root) {
  const lo = root.querySelector('.lo'), hi = root.querySelector('.hi'), dual = root.querySelector('.dual'), v = root.querySelector('.v'), one = root.querySelector('.one'), v2 = root.querySelector('.v2');
  const f = (n) => '¥' + n.toLocaleString('en-US');
  const upd = (e) => {
    let a = +lo.value, b = +hi.value;
    if (b - a < 100) { if (e && e.target === lo) lo.value = a = b - 100; else hi.value = b = a + 100; a = +lo.value; b = +hi.value; }
    dual.style.setProperty('--a', a / 2000); dual.style.setProperty('--b', b / 2000); v.textContent = f(a) + ' – ' + f(b);
    lo.setAttribute('aria-valuetext', `最低价 ${a} 元`); hi.setAttribute('aria-valuetext', `最高价 ${b} 元`);
  };
  const upd2 = () => { one.style.setProperty('--p', one.value); v2.textContent = (+one.value).toFixed(2); };
  lo.addEventListener('input', upd); hi.addEventListener('input', upd); one.addEventListener('input', upd2);
  upd(); upd2();
}
</script>
