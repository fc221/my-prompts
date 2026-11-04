---
zh: 圆泡弹出菜单
en: Bubble menu
order: 70
---

## 是什么

点右上角的圆形菜单按钮，几颗颜色各异的胶囊“气泡”从中间依次弹出来，轻轻回弹一下后停稳，每颗是一个导航入口；再点一次或按 Esc 就收回去。

## 适合

入口只有 4–6 个、想带一点俏皮感的个人主页、插画或摄影作品集、活动页。

## 不适合

入口超过 6 个或需要分组的站点改用「菜单展开成卡片」或侧栏；工具类产品和后台用普通下拉菜单，不需要这种表演。

## 注意

气泡弹出后必须停住：不漂浮、不跟着鼠标晃，看到哪里就点得到哪里；气泡大小跟着文字走，标签长就把胶囊拉宽，不要缩小字号。

## 要点

- 每颗气泡高至少 40px、左右内边距 16px 以上、文字 16px 起；横竖间距 ≥ 8px，任何屏宽下都不重叠，放不下就换行
- 弹出：从 0.5 倍、透明开始放大到原尺寸，用带回弹的曲线（如 cubic-bezier(.34,1.56,.64,1)）约 400ms，相邻错开 40–50ms
- 收起：不错开，150ms 内一起缩小淡出；都用 CSS transition，连点时从当前状态直接反向
- 可以给每颗气泡 ±4° 以内的固定倾角增加手作感，停稳后角度和位置都不再变
- 打开时背后铺一层半透明底色，把气泡和页面内容分开；点这层底色也能收起
- 菜单按钮带 aria-expanded 和 aria-controls，图标变成叉；Esc 收起，焦点在气泡上时送回按钮；收起后整组气泡加 inert
- 减少动态效果时去掉缩放和回弹，只做 150ms 淡入淡出

## 提示词

给{个人主页}做「圆泡弹出菜单」：右上角一个 40px 的圆形菜单按钮，点开后页面铺一层半透明底色，{入口数}个导航入口以胶囊气泡的形式在中间依次弹出（从 0.5 倍放大到原尺寸，带轻微回弹，约 400ms，相邻错开 45ms），每颗不同底色、高至少 40px、文字 16px 起、互不重叠，可带 ±4° 以内的固定倾角，停稳后不再移动；再点按钮、点底色或按 Esc 时 150ms 内一起缩小淡出，焦点在气泡上时送回按钮；按钮用 aria-expanded，收起后气泡组加 inert；全部用 CSS transition，连点可直接反向；减少动态效果时只做淡入淡出。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;background:#fdf6ec;color:#2b2238;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid #5b3fd6;outline-offset:3px}
.hd{position:absolute;z-index:3;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;height:52px;padding:0 12px 0 16px}
.me{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;border-radius:6px}
.me i{width:22px;height:22px;border-radius:50%;background:conic-gradient(#ffb547,#ff6f91,#7c6cff,#3fd0c9,#ffb547)}
.tg{display:grid;place-items:center;width:40px;height:40px;padding:0;border:0;border-radius:50%;background:#2b2238;color:#fff;cursor:pointer;box-shadow:0 4px 12px rgba(43,34,56,.25)}
.tg:hover{background:#3d3150}
.ic{position:relative;width:16px;height:10px}
.ic::before,.ic::after{content:"";position:absolute;left:0;right:0;height:2px;border-radius:1px;background:currentColor;transition:transform .26s cubic-bezier(.2,0,0,1)}
.ic::before{top:0}
.ic::after{bottom:0}
.open .ic::before{transform:translateY(4px) rotate(45deg)}
.open .ic::after{transform:translateY(-4px) rotate(-45deg)}
.pg{position:absolute;inset:52px 12px 12px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:8px}
.pg i{border-radius:12px}
.pg i:nth-child(1){background:radial-gradient(circle at 70% 30%,#ffe08a 0 14%,transparent 15%),linear-gradient(180deg,#9ad0ff,#cfe9ff 60%,#7cc4a0 61%)}
.pg i:nth-child(2){background:radial-gradient(circle at 40% 60%,#ff8fab 0 22%,transparent 23%),linear-gradient(135deg,#ffe3d1,#ffc4d6)}
.pg i:nth-child(3){background:linear-gradient(90deg,#3d2f5a 0 30%,#7c6cff 30% 60%,#c9c0ff 60%)}
.pg i:nth-child(4){background:radial-gradient(circle at 50% 110%,#3fd0c9 0 40%,transparent 41%),linear-gradient(180deg,#fff1c9,#ffd9a0)}
.pg i:nth-child(5){background:conic-gradient(from 200deg at 50% 60%,#ffb547,#ff6f91,#ffb547)}
.pg i:nth-child(6){background:linear-gradient(160deg,#2b2238,#5b4a80)}
.scrim{position:absolute;inset:0;z-index:1;background:rgba(253,246,236,.8);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;visibility:hidden;transition:opacity .2s,visibility 0s .2s}
.open .scrim{opacity:1;visibility:visible;transition:opacity .25s}
.bm{position:absolute;z-index:2;inset:52px 12px 12px;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:10px 8px;visibility:hidden;transition:visibility 0s .18s}
.open .bm{visibility:visible;transition:none}
.bm a{display:inline-flex;align-items:center;height:40px;padding:0 18px;border-radius:999px;font-size:15px;font-weight:600;box-shadow:0 6px 16px rgba(43,34,56,.14);opacity:0;transform:scale(.5) rotate(var(--r));transition:transform .15s cubic-bezier(.4,0,1,1),opacity .15s}
.open .bm a{opacity:1;transform:rotate(var(--r));transition:transform .42s cubic-bezier(.34,1.56,.64,1) calc(var(--i) * 45ms),opacity .18s calc(var(--i) * 45ms)}
.bm a:hover{box-shadow:0 8px 20px rgba(43,34,56,.22)}
.b1{background:#ffcf5c;color:#3a2600}
.b2{background:#ff9fb8;color:#3d0f22}
.b3{background:#bdb3ff;color:#1e1450}
.b4{background:#7de3cf;color:#08352d}
.b5{background:#2b2238;color:#fff}
@container (max-width:310px){.bm a{padding:0 14px;font-size:14px}
}
@container (min-height:280px){.hd{height:64px;padding:0 20px 0 24px}
.me{font-size:16px}
.pg{inset:64px 20px 20px;gap:12px}
.bm{inset:64px 20px 20px;gap:16px 12px}
.bm a{height:52px;padding:0 26px;font-size:19px}
}
@media (prefers-reduced-motion:reduce){.ic::before,.ic::after{transition:none}
.bm a,.open .bm a{transform:rotate(var(--r));transition:opacity .15s}
}
</style>

<div class="st"><div class="pg" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><header class="hd"><a href="#" class="me"><i aria-hidden="true"></i>MyPrompts · 插画</a><button type="button" class="tg" aria-expanded="false" aria-controls="bm-list" aria-label="菜单"><i class="ic" aria-hidden="true"></i></button></header><div class="scrim" aria-hidden="true"></div><nav class="bm" id="bm-list" aria-label="主菜单"><a href="#" class="b1" style="--i:0;--r:-4deg">作品集</a><a href="#" class="b2" style="--i:1;--r:3deg">约稿须知</a><a href="#" class="b3" style="--i:2;--r:-2deg">绘画日记</a><a href="#" class="b4" style="--i:3;--r:4deg">小店</a><a href="#" class="b5" style="--i:4;--r:-3deg">联系我</a></nav><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), tg = root.querySelector('.tg'), bm = root.querySelector('.bm'), msg = root.querySelector('[role=status]');
  let open = false;
  const set = (v) => {
    open = v; st.classList.toggle('open', v); tg.setAttribute('aria-expanded', String(v)); tg.setAttribute('aria-label', v ? '关闭菜单' : '菜单'); bm.inert = !v;
    msg.textContent = v ? '菜单已打开，5 个入口' : '菜单已关闭';
  };
  tg.addEventListener('click', () => set(!open));
  root.querySelector('.scrim').addEventListener('click', () => set(false));
  root.addEventListener('keydown', (e) => { if (e.key !== 'Escape' || !open) return; const inside = bm.contains(root.activeElement); set(false); if (inside) tg.focus(); });
  bm.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); set(false); tg.focus(); msg.textContent = '已前往：' + a.textContent; }));
  root.querySelector('.me').addEventListener('click', (e) => e.preventDefault());
  bm.inert = true;
  setTimeout(() => { if (root.host.isConnected && !open) set(true); }, 500);
}
</script>
