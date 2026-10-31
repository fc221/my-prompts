---
zh: 字号阶梯
en: Type scale
order: 10
---

## 是什么

字号只从一组阶梯取值，每档配固定的偶数行高，一屏不超过 4–5 种。

## 适合

定全站字体令牌；页面字号五花八门、层级不清时收敛。

## 不适合

不要出现 13、15、17px 这类阶梯外的字号；界面文字不用 10–11px。

## 要点

- 阶梯 12 / 14 / 16 / 18 / 20 / 24 / 28 / 32，对应行高 20 / 22 / 24 / 26 / 28 / 32 / 36 / 40
- 后台：正文、表格、表单 14，次要说明与表头 12，区块标题 16–18，页面标题 20–24，统计数值 24–32
- 官网另加 40 / 48 / 64 档，大标题行高 1.1–1.2，可用 clamp() 在两档之间流动
- 标题层级之间至少差一档；正文与说明可以只差一档（14 / 12）
- 同一屏字号不超过 4–5 种；界面文字最小 12px
- 移动端正文 ≥ 14px，输入框字号 ≥ 16px，避免聚焦时页面被放大
- 字号写成令牌（--text-sm / base / lg …），组件里不写裸像素

## 提示词

为{项目}建立字号令牌：阶梯 12 / 14 / 16 / 18 / 20 / 24 / 28 / 32，行高 20 / 22 / 24 / 26 / 28 / 32 / 36 / 40；正文 {正文字号}，说明 12，区块标题 16–18 / 600，页面标题 20–24 / 600，数值 24–32 / 600；官网标题用 clamp() 在 32–64 间流动、行高 1.15；同屏不超过 5 种字号，最小 12px；手机输入框 ≥ 16px；文字放大 200% 时容器长高、不裁切。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:16px;background:#fff;color:#1f2329;font-family:system-ui,"PingFang SC",sans-serif}
.r{display:flex;align-items:flex-end;gap:clamp(8px,2.6cqw,24px)}
.i{display:flex;flex-direction:column;align-items:center;gap:8px}
.i b{font-weight:600;line-height:1}
.i span{font:12px/1 ui-monospace,Menlo,monospace;color:#5b616e}
.i.on b,p b{color:#3b5bdb}
p{margin:0;max-width:440px;font-size:12px;line-height:20px;color:#5b616e;text-align:center}
@container (max-width:420px){.i:first-child,.i:last-child{display:none}
}
</style>

<div class="s"><div class="r"></div><p>说明 12 · <b>正文 14</b> · 区块标题 16–18 · 页面标题 20–24 · 数值 24–32</p></div>

<script type="module">
export default function demo(root) {
  const lh = { 12: 20, 14: 22, 16: 24, 18: 26, 20: 28, 24: 32, 28: 36, 32: 40 };
  root.querySelector('.r').innerHTML = Object.keys(lh).map((n) => `<div class="i${n === '14' ? ' on' : ''}"><b style="font-size:${n}px">字</b><span>${n}/${lh[n]}</span></div>`).join('');
}
</script>
