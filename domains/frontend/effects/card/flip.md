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
.zone{height:100%;display:grid;place-items:center;background:#f4f5f7;perspective:1000px;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.card{position:relative;width:250px;height:140px;border:0;padding:0;background:none;color:inherit;font:inherit;text-align:left;transform-style:preserve-3d;transition:transform .45s cubic-bezier(.2,0,0,1);cursor:pointer}
.card[aria-pressed=true]{transform:rotateY(180deg)}
.f{position:absolute;inset:0;display:flex;border-radius:14px;-webkit-backface-visibility:hidden;backface-visibility:hidden}
.front{flex-direction:column;justify-content:space-between;padding:14px 16px;background:linear-gradient(135deg,#14532d,#166534 55%,#2d8a4e);color:#ecfdf5;box-shadow:0 8px 20px -10px rgba(20,83,45,.6)}
.row{display:flex;justify-content:space-between;align-items:center;gap:8px}
.br{font-size:12px;letter-spacing:.04em}
.tier{padding:1px 8px;border-radius:999px;background:#fbbf24;color:#422006;font:700 11px/1.6 system-ui;font-style:normal}
.name{font-size:20px;font-weight:700}
.sm{font-size:11px;opacity:.85}
.back{align-items:center;gap:14px;padding:14px 16px;background:#fff;color:#18181b;box-shadow:0 8px 20px -10px rgba(0,0,0,.25);transform:rotateY(180deg)}
.qr{display:grid;flex:none;grid-template-columns:repeat(11,1fr);gap:1px;width:76px;height:76px;padding:4px;border:1px solid #e5e7eb;border-radius:6px;background:#fff}
.qr i{background:#18181b;border-radius:1px}
.qr i.o{background:none}
.bk{display:grid;gap:2px;min-width:0;color:#6b7280;font-size:11px}
.code{font:700 18px/1.2 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#18181b}
.hint{margin-top:4px;color:#2563eb}
@media (prefers-reduced-motion:reduce){.card{transition:none}
}
</style>

<div class="zone"><button type="button" class="card" aria-pressed="false" aria-label="会员卡，点按翻面出示核销码"><span class="f front"><span class="row"><b class="br">MyPrompts 会员</b><em class="tier">金卡</em></span><span class="name">林晓</span><span class="row sm"><span>NO. 0426 8810</span><span>点按翻面出示核销码</span></span></span><span class="f back"><span class="qr" aria-hidden="true"></span><span class="bk"><b class="code">7K2Q 9ZT4</b><span>到店出示核销</span><span>有效期至 2027-03-31</span><span class="hint">点按翻回</span></span></span></button></div>

<script type="module">
export default function demo(root) {
  const c = root.querySelector('.card'), qr = root.querySelector('.qr'), N = 11;
  // 示意二维码：三个角的定位块 + 伪随机点阵
  const box = (r, k) => [[0, 0], [0, N - 7], [N - 7, 0]].find(([y, x]) => r >= y && r < y + 7 && k >= x && k < x + 7);
  const dot = (r, k) => { const b = box(r, k); if (!b) return (r * 7 + k * 13 + r * k) % 5 < 2; const [y, x] = b; return r === y || r === y + 6 || k === x || k === x + 6 || (r >= y + 2 && r <= y + 4 && k >= x + 2 && k <= x + 4); };
  qr.innerHTML = Array.from({ length: N * N }, (_, i) => `<i class="${dot(Math.floor(i / N), i % N) ? '' : 'o'}"></i>`).join('');
  c.onclick = () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true'));
  // 自动演示：翻到背面出示核销码
  setTimeout(() => { if (root.host.isConnected) c.setAttribute('aria-pressed', 'true'); }, 600);
}
</script>
