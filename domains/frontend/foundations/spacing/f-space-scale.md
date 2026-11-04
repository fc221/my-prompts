---
zh: 4/8 间距尺度
en: Spacing scale
order: 10
---

## 是什么

间距只取 4 的倍数（4、8、16、24…），不用 10、14 这类值；2 和 6 只给紧贴在一起的微距。

## 适合

所有 margin、padding、gap 与组件尺寸；建立间距令牌时。

## 不适合

不要出现 10、14、18、22 这类尺度外的值，也不要每处临时“看着调”。

## 要点

- 基准 4px，只用 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96
- 2 和 6 只用于紧贴在一起的微距：图标与文字 6、徽标内边距 2 / 6、Tooltip 6 / 8、焦点环偏移 2；1–2px 的视觉微调要写注释
- 令牌分三层：基础尺度（--space-*）→ 关系间距（--gap-tight / item / group / section）→ 内边距（--inset-control-x、--inset-card 等）
- 组件只引用语义令牌，不写裸像素
- 组件本身不带外边距，彼此距离由父容器的 gap 决定
- 窄屏不按比例缩小全部间距，而是在断点处把映射降一档（24 → 16，48 → 32）

## 提示词

为{项目}建立间距令牌：基础尺度 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64；关系间距 --gap-tight 8、--gap-item 16、--gap-group 24、--gap-section 40；内边距 --inset-control-x 12、--inset-card 24；2 和 6 只留给图标与文字、徽标内边距这类微距；组件不写外边距，用父容器 gap；小于 768px 时页面和卡片内边距降到 16；把现有 10 / 14 / 18 等尺度外数值换成最近的尺度值。

## 示例

<style>
.s{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:16px;background:#fff;color:#5b616e;font:12px/1.2 system-ui,"PingFang SC",sans-serif}
.r{display:flex;align-items:flex-end;gap:8px;font-variant-numeric:tabular-nums}
.i{display:flex;flex-direction:column;align-items:center;gap:4px;width:22px}
.i b{width:16px;border-radius:3px;background:#c5d0fa}
.i.k b{background:#3b5bdb}
.i.k{color:#1f2329;font-weight:600}
.lg{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center}
.lg span::before{content:"";display:inline-block;width:10px;height:10px;margin-right:6px;border-radius:2px;background:#3b5bdb;vertical-align:-1px}
.lg span{margin-right:8px}
.lg s{color:#d92d20}
.lg em{font-style:normal}
.s{container-type:inline-size}
@container (max-width:340px){.r{gap:5px}
.s{padding:12px}
}
</style>

<div class="s"><div class="r"></div><div class="lg"><span>四档关系间距常用值</span><s>10</s><s>14</s><s>18</s><s>22</s><em>尺度外，不用</em></div></div>

<script type="module">
export default function demo(root) {
  const key = [8, 16, 24, 40];
  root.querySelector('.r').innerHTML = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map((v) => `<div class="i${key.indexOf(v) >= 0 ? ' k' : ''}"><b style="height:${v}px"></b>${v}</div>`).join('');
}
</script>
