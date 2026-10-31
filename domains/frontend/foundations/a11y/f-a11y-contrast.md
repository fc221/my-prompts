---
zh: 对比度
en: Contrast
order: 10
---

## 是什么

正文对比度 ≥ 4.5:1，大字和控件边界 ≥ 3:1，浅灰字最易不达标。

## 适合

定配色、写文字色、做彩色按钮和徽标时逐项核对。

## 不适合

不要用极浅灰字营造高级感；不要只凭肉眼判断，尤其是彩色底上的白字。

## 要点

- 常规文字 ≥ 4.5:1；大字（≥ 24px，或 ≥ 18.5px 且加粗）≥ 3:1
- 输入框边框、焦点环、图表线条、状态图标等图形 ≥ 3:1
- 次要文字、占位文字也要 ≥ 4.5:1；禁用色只给禁用控件，不给要读的信息
- 半透明叠加、渐变、图片上的文字按实际合成后的颜色核对，最浅处也要达标
- 悬停、按下、聚焦态的对比度不得低于常态
- 浅色品牌色（黄、浅绿、天青）做按钮时改用深色文字
- 信息不只靠颜色传达：错误和状态同时给图标或文字

## 提示词

检查并修复{页面}的颜色对比度：正文和次要文字对背景 ≥ 4.5:1，≥ 24px 的大字 ≥ 3:1，输入框边框、焦点环、图表线条 ≥ 3:1；彩色按钮上的文字逐个核对，浅色品牌色按钮改用深色字；图片、渐变和半透明底上的文字按最浅处核对，必要时加实底或遮罩；悬停和按下态不得比常态更浅；亮色和暗色主题各查一遍，列出修改前后的色值与对比度。

## 示例

<style>
.s{height:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));align-content:center;gap:12px;padding:16px;background:#f5f6f8;font:600 15px/1.4 system-ui,"PingFang SC",sans-serif}
.t{display:grid;gap:8px;justify-items:start;padding:12px;border-radius:10px;border:1px solid #e3e6eb}
.t span{padding:2px 8px;border-radius:999px;background:#fff;font-size:12px;font-weight:600;font-variant-numeric:tabular-nums;box-shadow:inset 0 0 0 1px currentColor}
.ok{color:#0f7352}
.no{color:#b42318}
</style>

<div class="s"><div class="t" data-f="#a3a8b1" data-b="#ffffff">浅灰正文</div><div class="t" data-f="#5b616e" data-b="#ffffff">次要文字</div><div class="t" data-f="#ffffff" data-b="#69db7c">浅绿按钮白字</div><div class="t" data-f="#ffffff" data-b="#3b5bdb">主按钮白字</div></div>

<script type="module">
export default function demo(root) {
  // 按相对亮度公式现场计算对比度
  const lum = (h) => [1, 3, 5].map((i) => { const v = parseInt(h.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
  root.querySelectorAll('.t').forEach((t) => {
    const a = lum(t.dataset.f), b = lum(t.dataset.b), r = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), ok = r >= 4.5;
    t.style.cssText = `color:${t.dataset.f};background:${t.dataset.b}`;
    t.insertAdjacentHTML('beforeend', `<span class="${ok ? 'ok' : 'no'}">${r.toFixed(1)}:1 ${ok ? '达标' : '不达标'}</span>`);
  });
}
</script>
