---
zh: 3D 翻转卡片
en: 3D flip card
aka: 卡片翻面 翻牌
order: 40
---

## 是什么

点击卡片后整张卡片翻过来，背面显示另一组信息。

## 适合

凭证正反面、术语解释卡、价格方案的详细说明。

## 注意

背面内容对读屏同样可读；不要把关键信息只放背面。

## 要点

- 绕 Y 轴翻转 180°，perspective 1000–1200px，400–500ms 缓入缓出；正反两面都设 backface-visibility: hidden，翻到一半不闪出另一面
- 凭证类：正面放名称、日期、座位或数量，并写明“点按翻面出示核销码”；背面放到场要出示的码，等宽字体 28–32px、字距约 0.08em，旁边给复制或放大
- 两面尺寸一致，翻转时外框不变，不挤动周围布局
- 整张卡是按钮（或带“翻面”按钮），aria-pressed 表示当前是哪一面，Enter / 空格可翻；背面有“翻回”入口
- 网格里的卡：先从原位飞到画面中央并放大（FLIP，约 300ms），再翻面；关闭时先翻回、再飞回原位；原位留同尺寸占位，网格不跳，放大后背后加遮罩，Esc 关闭、焦点回到原来的卡
- 减少动态效果时直接切换正反面，不做旋转

## 提示词

把{卡片}做成「3D 翻转卡片」：点击或按 Enter 时绕 Y 轴翻转 180°（perspective 1000px，450ms），正反两面都设 backface-visibility: hidden，背面显示{背面内容}；翻转按钮有 aria-pressed；在网格里时先飞到画面中央放大（300ms）再翻，关闭时翻回再飞回原位，原位留占位；减少动态效果时直接切换正反面。

## 示例

<style>
.zone{height:100%;display:grid;place-items:center;background:#f4f5f7;perspective:1000px}
.card{position:relative;width:220px;height:130px;border:0;padding:0;background:none;transform-style:preserve-3d;transition:transform .45s cubic-bezier(.2,0,0,1);cursor:pointer;font:600 15px system-ui}
.card[aria-pressed=true]{transform:rotateY(180deg)}
.f{position:absolute;inset:0;display:grid;place-items:center;border-radius:14px;backface-visibility:hidden}
.front{background:#fff;color:#18181b;box-shadow:0 4px 16px rgba(0,0,0,.08)}
.back{background:#18181b;color:#fff;transform:rotateY(180deg)}
@media (prefers-reduced-motion:reduce){.card{transition:none}
}
</style>

<div class="zone"><button class="card" aria-pressed="false"><span class="f front">正面 · 点我翻转</span><span class="f back">背面 · 详细信息</span></button></div>

<script type="module">
export default function demo(root) {
  const c = root.querySelector('.card'); c.onclick = () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true'));
}
</script>
