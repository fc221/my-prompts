---
zh: 3D 倾斜卡片
en: 3D tilt card
order: 10
---

## 是什么

鼠标在卡片上移动时，卡片朝鼠标方向微微倾斜，表面有一道跟着鼠标走的高光。

## 适合

会员卡、产品卡、作品集封面等少量主角卡片。

## 注意

属于装饰特效，同屏只用一处；不要用在表单、表格里。

## 要点

- 卡面上的图案、镭射纹单独做一层，位移是卡片倾斜位移的 1.5–2 倍（同方向），看起来卡有厚度；文字层跟卡片走，保持清楚。

## 提示词

给{主角卡片}加「3D 倾斜」：鼠标在卡片上移动时，按位置让卡片绕 X / Y 轴倾斜最多 8°（perspective 800px），表面叠一层跟随鼠标的径向高光，卡面图案层的位移是卡片倾斜位移的 1.5–2 倍以表现厚度；离开后 400ms 平滑回正；触屏上按住时朝手指方向倾斜最多 4° 并缩到 0.97，高光聚到按下的位置，松手回正；减少动态效果时不倾斜。

## 示例

<style>
.zone{height:100%;display:grid;place-items:center;background:#0f1115;perspective:800px}
.card{--rx:0deg;--ry:0deg;--gx:50%;--gy:50%;--s:1;width:240px;height:150px;border-radius:16px;padding:20px;box-sizing:border-box;color:#fff;font-family:system-ui;background:radial-gradient(circle at var(--gx) var(--gy),rgba(255,255,255,.35),transparent 45%),linear-gradient(135deg,#334155,#0f172a);transform:rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--s));transition:transform .4s cubic-bezier(.2,0,0,1);-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;display:flex;flex-direction:column;justify-content:space-between}
b{font-size:18px}
small{opacity:.8}
</style>

<div class="zone"><div class="card"><b>MyPrompts 专业版</b><small>本月订单 3,826 笔</small></div></div>

<script type="module">
export default function demo(root) {
  const c = root.querySelector('.card'); if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const set = (e, deg, s) => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; c.style.setProperty('--ry', (x - .5) * deg * 2 + 'deg'); c.style.setProperty('--rx', (.5 - y) * deg * 2 + 'deg'); c.style.setProperty('--gx', x * 100 + '%'); c.style.setProperty('--gy', y * 100 + '%'); c.style.setProperty('--s', s); };
  const reset = () => { c.style.transition = ''; c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.style.setProperty('--s', 1); };
  // 鼠标：跟随指针，最多 8°
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    c.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; c.style.transition = 'none'; set(e, 8, 1); });
    c.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch') reset(); });
  }
  // 触屏：按住时朝手指倾斜最多 4° 并缩到 0.97，高光聚到按下的位置；松手或被系统取消时回正
  c.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'touch') return; c.style.transition = 'transform .15s cubic-bezier(.2,0,0,1)'; set(e, 4, .97); });
  for (const t of ['pointerup', 'pointercancel']) c.addEventListener(t, (e) => { if (e.pointerType === 'touch') reset(); });
}
</script>
