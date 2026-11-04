---
zh: 菜单展开成卡片
en: Card menu
order: 60
---

## 是什么

顶部一条圆角导航条，点“菜单”后这条导航自己往下长高，里面依次浮出几张不同底色的分类卡片，每张写着栏目名和两三个子入口；再点一次，卡片先退场，导航条再收回原样。

## 适合

栏目只有 3–4 个、每个栏目下还有几个子页面的品牌官网、作品集、小型电商，想让菜单本身也成为一处展示。

## 不适合

栏目多、层级深的后台和文档站改用侧栏或普通下拉菜单；只有两三个链接时直接平铺在导航条上，不必收起来。

## 注意

展开和收起必须是同一个容器在变高，高度按卡片的实际内容测量；不要另弹一个浮层，也不要写死高度，否则标题一换行就被截掉。

## 要点

- 收起时导航条高约 44–52px；展开高度 = 导航条 + 卡片区的实测高度，窗口变窄、卡片换行后用 ResizeObserver 重新量
- 展开：容器高度约 320ms 缓出变高，卡片从下方 14px 处淡入上移，比容器晚 80ms 起步，相邻错开 50ms
- 收起：卡片在 150ms 内先淡出，容器等约 100ms 再收回；两段都用 CSS transition，连点时从当前高度直接反向，不跳到头或尾
- 菜单按钮是带 aria-expanded 的 `<button>`，图标两条线变成叉；收起时卡片区加 inert，Tab 走不到看不见的链接
- Esc 收起，焦点原本在卡片里就送回菜单按钮；点导航条外面的页面也收起
- 容器的 overflow: hidden 会裁掉焦点框：卡片留出内边距，卡片里的链接焦点框贴着文字画
- 减少动态效果时高度直接切换，卡片只做 150ms 淡入

## 提示词

把{产品}的顶部导航做成「菜单展开成卡片」：收起时是一条高 48px 的圆角导航条（左边菜单按钮、中间 Logo、右边主按钮）；点菜单按钮后同一个容器向下变高，里面放{分类数}张不同底色的分类卡片，每张一个栏目名和 2–3 个子链接，卡片从下方 14px 淡入上移、相邻错开 50ms；展开高度按卡片实际内容测量，尺寸变化时重算，不写死；再点一次时卡片先在 150ms 内淡出，容器再收回；高度和卡片都用 CSS transition，连续点击从当前状态反向；按钮用 aria-expanded，收起后卡片区加 inert；Esc 或点导航外部收起，焦点在卡片里时送回菜单按钮；减少动态效果时高度直接切换、卡片只淡入。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;background:#efe6da;color:#2a1d15;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;cursor:pointer}
:focus-visible{outline:2px solid #b4572c;outline-offset:2px}
.hero{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:0 20px 16px;background:linear-gradient(160deg,#f7f0e6,#e9d6bf)}
.hero b{font-size:20px;line-height:1.25}
.hero span{color:#6e5b4c;font-size:12px}
.cup{position:absolute;right:18px;bottom:14px;width:76px;height:76px;border-radius:50%;background:radial-gradient(circle,#5e3520 0 46%,#8a5434 47% 50%,#fbf6ee 51% 64%,#e7d7c3 65%);box-shadow:0 10px 18px rgba(74,44,26,.18)}
.nav{position:absolute;z-index:2;top:10px;left:10px;right:10px;max-width:560px;height:44px;margin:0 auto;border-radius:14px;background:#fffaf3;box-shadow:0 8px 24px rgba(42,29,21,.14),0 0 0 1px rgba(42,29,21,.06);overflow:hidden;transition:height .26s cubic-bezier(.4,0,.2,1) .1s}
.nav.open{transition:height .32s cubic-bezier(.2,0,0,1)}
.bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:44px;padding:0 6px}
.tg{justify-self:start;display:flex;align-items:center;gap:8px;height:32px;padding:0 10px 0 9px;border:0;border-radius:9px;background:none;font-weight:500}
.tg:hover{background:#f3e9dc}
.ic{position:relative;width:14px;height:10px}
.ic::before,.ic::after{content:"";position:absolute;left:0;right:0;height:2px;border-radius:1px;background:currentColor;transition:transform .26s cubic-bezier(.2,0,0,1)}
.ic::before{top:1px}
.ic::after{bottom:1px}
.open .ic::before{transform:translateY(3px) rotate(45deg)}
.open .ic::after{transform:translateY(-3px) rotate(-45deg)}
.logo{font-size:15px;font-weight:700;letter-spacing:.14em}
.cta{justify-self:end;height:30px;padding:0 12px;border:0;border-radius:9px;background:#2a1d15;color:#fff7ec;font-weight:600}
.cta:hover{background:#45301f}
.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:0 6px 6px}
.cd{display:flex;flex-direction:column;min-width:0;padding:9px 10px 8px;border-radius:10px;opacity:0;transform:translateY(14px);transition:opacity .14s,transform .16s cubic-bezier(.4,0,1,1)}
.open .cd{opacity:1;transform:none;transition:opacity .24s calc(.08s + var(--i) * .05s),transform .36s cubic-bezier(.2,0,0,1) calc(.08s + var(--i) * .05s)}
.cd h4{margin:0 0 3px;font-size:13px}
.cd small{display:none}
.cd a{display:flex;align-items:center;gap:5px;padding:1px 2px;margin:0 -2px;border-radius:4px;font-size:12px;white-space:nowrap}
.cd a:hover{text-decoration:underline;text-underline-offset:3px}
.cd a:focus-visible{outline:2px solid currentColor;outline-offset:0}
.cd svg{flex:none;width:9px;height:9px;opacity:.75}
.c1{background:#3b2a20;color:#f6e9d6}
.c2{background:#dcb98f;color:#2a1d15}
.c3{background:#5f6e47;color:#f5f2e6}
@container (min-height:280px){.nav{top:16px}
.bar{height:52px;padding:0 8px}
.cards{gap:8px;padding:0 8px 8px}
.cd{padding:14px 14px 12px}
.cd h4{font-size:15px}
.cd small{display:block;margin-bottom:8px;font-size:12px;opacity:.78}
.cd a{padding:2px;font-size:13px}
.hero{padding:0 32px 28px}
.hero b{font-size:28px}
.hero span{font-size:13px}
.cup{right:40px;bottom:28px;width:120px;height:120px}
}
@media (prefers-reduced-motion:reduce){.nav,.nav.open,.ic::before,.ic::after{transition:none}
.cd,.open .cd{transform:none;transition:opacity .15s}
}
</style>

<div class="st"><div class="hero"><i class="cup" aria-hidden="true"></i><b>秋季新豆上架</b><span>云南保山 · 日晒 · 黑糖与莓果的甜</span></div><nav class="nav" aria-label="主导航"><div class="bar"><button type="button" class="tg" aria-expanded="false" aria-controls="cn-cards"><i class="ic" aria-hidden="true"></i>菜单</button><a href="#" class="logo">MyPrompts</a><button type="button" class="cta">订购</button></div><div class="cards" id="cn-cards"><section class="cd c1" style="--i:0"><h4>咖啡豆</h4><small>每周二烘焙，三天内发出</small><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>单品豆</a><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>拼配豆</a><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>挂耳包</a></section><section class="cd c2" style="--i:1"><h4>门店</h4><small>每天营业到晚上九点</small><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>上海店</a><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>杭州店</a><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>成都店</a></section><section class="cd c3" style="--i:2"><h4>关于</h4><small>从一台小烘焙机开始</small><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>品牌故事</a><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>烘焙日志</a><a href="#"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>联系我们</a></section></div></nav><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const nav = root.querySelector('.nav'), bar = root.querySelector('.bar'), tg = root.querySelector('.tg'), cards = root.querySelector('.cards'), msg = root.querySelector('[role=status]');
  let open = false;
  // 高度按实际内容量：导航条 + 卡片区；卡片换行或尺寸变化时 ResizeObserver 再量一次
  const fit = () => { nav.style.height = bar.offsetHeight + (open ? cards.offsetHeight : 0) + 'px'; };
  const set = (v) => {
    open = v; nav.classList.toggle('open', v); tg.setAttribute('aria-expanded', String(v)); cards.inert = !v; fit();
    msg.textContent = v ? '菜单已展开：咖啡豆、门店、关于' : '菜单已收起';
  };
  tg.addEventListener('click', () => set(!open));
  root.addEventListener('keydown', (e) => { if (e.key !== 'Escape' || !open) return; const inside = cards.contains(root.activeElement); set(false); if (inside) tg.focus(); });
  root.querySelector('.hero').addEventListener('click', () => { if (open) set(false); });
  root.querySelectorAll('.nav a, .cta').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); msg.textContent = '已打开：' + a.textContent.trim(); }));
  new ResizeObserver(fit).observe(cards);
  cards.inert = true; fit();
  setTimeout(() => { if (root.host.isConnected && !open) set(true); }, 500);
}
</script>
