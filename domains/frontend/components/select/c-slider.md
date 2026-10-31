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

- 轨道高 4px，已选段主色；圆钮 16px（触屏点击区 44px），聚焦和拖动时加 4px 浅主色光晕
- 当前值带单位显示在旁边或圆钮上方；需要精确时旁边配数字输入并双向同步
- 优先用原生 input type="range"；自绘时 role="slider" + aria-valuenow / min / max / valuetext
- 键盘：方向键一步，PageUp / PageDown 十步，Home / End 到两端
- 范围滑块两个圆钮不能交叉，并保留最小间距；刻度只标关键值
- 手机上的双端范围滑块：两个圆钮各 44px 热区，拖动时圆钮上方浮出当前值，两钮靠近时后拖的在上层；价格区间这类大跨度的值用对数刻度
- 拖动中实时预览，松手后才提交请求
- 已选段、圆钮和数值读同一个值，在同一帧里更新，三者都不单独加过渡，拖得再快也不会错位
- 数值显示在圆钮上方的气泡里时，换数用上下滚动（同「数字滚动计数」），气泡宽度按最长的值固定
- 可选：快速拖动时圆钮沿拖动方向轻微拉长（不超过 1.15 倍），停下立即恢复
- 自绘滑块可选两处手感：拖过两端时轨道像橡皮筋一样带阻力多拉出一点（位移约为超出量的 0.35 倍，最多 12px），松手弹回；有刻度的滑块松手后带一点惯性、略微冲过再吸附到最近的刻度

## 提示词

在{商品筛选区}加价格区间滑块：轨道 4px，已选段主色，两个 16px 圆钮（触屏点击区 44px），两钮不能交叉、至少相隔 ¥100；上方显示“¥200 – ¥1,500”，旁边两个数字输入与滑块双向同步；方向键一步、PageUp / PageDown 十步、Home / End 到端点，每个圆钮有 aria-valuetext“最低价 200 元”；已选段、圆钮和数值在同一帧更新，不加过渡；拖动时实时预览结果数量，松手才刷新列表；聚焦有光晕；窄屏滑块撑满。

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
