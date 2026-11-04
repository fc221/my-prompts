---
zh: 竖卡叠放翻看
en: Upright card deck
order: 60
of: l-app-home
---

## 是什么

细长、宽字距的两行标题下，一张竖立的主卡占满列宽，后面两张只露出顶边，上滑或点按钮换下一张。

## 适合

房源、穿搭、作品、菜谱这类一次专心看一个、靠翻看来挑选的场景。

## 不适合

要同时比较多个选项时用网格；内容超过二三十项时一张张翻太慢，加列表视图或筛选。

## 注意

叠在后面的卡只露 10–14px 一条边，露多了会抢主卡；翻页必须有按钮替代手势，并显示“第几张 / 共几张”。

## 要点

- 标题两行、28–32px、300 字重、字距 0.04–0.08em，上方一行小号英文或分类名
- 主卡宽度等于列宽，图片约 4:5、圆角 24px，名称和价格压在图片底部（加渐变遮罩）
- 后面两张缩放到 0.94 / 0.88，各上移 12–14px，只露出顶边
- 上滑超过 60px 或点“下一间”：主卡上移淡出（约 300ms），后面的依次补位
- 卡片下方显示“2 / 5”和按钮；到最后一张时按钮改为“查看全部”或回到第一张
- 减少动态效果时直接切换，不做位移

## 提示词

{产品}首页用「竖卡叠放翻看」：顶部一行小号{分类或英文}，下面两行细长标题“{标题}”30px、300 字重、字距 0.06em；中间一张竖立主卡占满列宽（图片约 4:5、圆角 24px，名称和{价格}压在图片底部的渐变遮罩上），后面两张缩到 0.94 / 0.88、各上移 14px，只露出顶边；上滑超过 60px 或点“下一张”时主卡上移淡出（300ms），后面的依次补位；卡片下方显示“当前 / 总数”；最后一张后按钮改为“查看全部”；减少动态效果时直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/app-phone.css">
<style>
.ph{background:#faf8f5}
.tb{background:#faf8f5;border-top-color:#eee9e1}
.ttl{display:grid;margin:14px 20px 0}
.ttl span{color:#8a8072;font:600 11px/1.6 system-ui,sans-serif;letter-spacing:.2em}
.ttl b{font:300 30px/1.25 system-ui,"PingFang SC",sans-serif;letter-spacing:.06em}
.deck{position:relative;height:350px;margin:14px 20px 0;touch-action:pan-x}
.cd{position:absolute;inset:28px 0 0;border-radius:24px;overflow:hidden;background:#ddd;transform-origin:50% 0;transition:transform .3s cubic-bezier(.2,.8,.2,1),opacity .3s;box-shadow:0 18px 30px -18px rgba(60,40,20,.45)}
.k0{z-index:3}
.k1{z-index:2;transform:translateY(-14px) scale(.94)}
.k2{z-index:1;transform:translateY(-28px) scale(.88)}
.cd.out{transform:translateY(-80px) rotate(-3deg);opacity:0}
.im{position:absolute;inset:0}
.cap{position:absolute;inset:auto 0 0;display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding:48px 18px 18px;background:linear-gradient(180deg,transparent,rgba(20,14,8,.66));color:#fff}
.cap div{display:grid;min-width:0}
.cap b{font-size:20px}
.cap span{font-size:13px;opacity:.9}
.ar{display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:50%;background:#fff;color:#15171c;font-size:18px;opacity:1}
.ctl2{display:flex;justify-content:space-between;align-items:center;margin:14px 20px 20px}
.idx{color:#8a8072;font-variant-numeric:tabular-nums}
.nx{height:40px;padding:0 18px;border-radius:20px;background:#15171c;color:#fff;font-weight:600}
.r1{background:radial-gradient(ellipse at 50% 108%,#f4f1ea 0 30%,transparent 31%),linear-gradient(180deg,transparent 0 64%,#b98b63 64%),linear-gradient(90deg,#e9e1d4 0 28%,#cfe3ef 28% 62%,#e9e1d4 62%)}
.r2{background:linear-gradient(180deg,#d8c3a5 0 18%,transparent 18%),repeating-linear-gradient(180deg,#7b5236 0 6px,transparent 6px 46px),repeating-linear-gradient(90deg,#c45c48 0 9px,#3f6e8c 9px 16px,#e1b04d 16px 25px,#5d7d55 25px 33px,#efe4d2 33px 40px)}
.r3{background:linear-gradient(180deg,#bde0f5 0 30%,#4f9fc9 30% 44%,#f3ece2 44% 72%,#c7a27c 72%)}
.r4{background:linear-gradient(135deg,#efe6d8 0 50%,transparent 50%),linear-gradient(225deg,#e2d4bf 0 50%,transparent 50%),linear-gradient(180deg,#f7f1e7,#c9a982)}
.r5{background:radial-gradient(circle at 30% 62%,#5f8f5a 0 18%,transparent 19%),radial-gradient(circle at 74% 56%,#7aa86c 0 22%,transparent 23%),linear-gradient(180deg,#d7ecf5 0 45%,#e8dfcf 45%)}
</style>

<div class="st"><div class="fr"><div class="ph"><div class="sb" aria-hidden="true"><span>9:41</span><span class="bat"></span></div><div class="scr"><div class="hd"><span class="brand">MyPrompts</span><span class="av" aria-hidden="true">林</span></div><p class="ttl"><span>ROOMS FOR SLOW DAYS</span><b>挑一间</b><b>喜欢的房间</b></p><div class="deck"><article class="cd"><i class="im"></i><div class="cap"><div><b></b><span></span></div><span class="ar" aria-hidden="true">↗</span></div></article><article class="cd"><i class="im"></i><div class="cap"><div><b></b><span></span></div><span class="ar" aria-hidden="true">↗</span></div></article><article class="cd"><i class="im"></i><div class="cap"><div><b></b><span></span></div><span class="ar" aria-hidden="true">↗</span></div></article></div><div class="ctl2"><span class="idx" aria-live="polite"></span><button type="button" class="nx">下一间 ↑</button></div></div><nav class="tb" aria-label="底部导航"><button type="button" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/></svg>发现</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>地图</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/></svg>心愿单</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.8 4.2-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/></svg>我的</button></nav></div></div><ol class="lg" aria-label="版式要点"><li><b>01</b><span>细长、宽字距的两行标题</span></li><li><b>02</b><span>主卡竖立在中间，占满列宽</span></li><li><b>03</b><span>后面两张只露出顶边，提示还有更多</span></li><li><b>04</b><span>上滑或点按钮换下一张</span></li></ol></div>

<script type="module">
import { fit } from '../../_shared/app-phone.ts';

export default function demo(root) {
  fit(root);
  const R = [['朝南卧室', '¥420 / 晚', 'r1'], ['木质书房', '¥360 / 晚', 'r2'], ['海景客厅', '¥580 / 晚', 'r3'], ['斜顶阁楼', '¥310 / 晚', 'r4'], ['庭院套房', '¥690 / 晚', 'r5']];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, st = root.querySelector('.st'), deck = root.querySelector('.deck'), idx = root.querySelector('.idx'), nx = root.querySelector('.nx');
  let order = [...deck.children], top = 0, busy = false;
  const fill = (el, i) => { const r = R[i % R.length]; el.querySelector('.im').className = 'im ' + r[2]; el.querySelector('b').textContent = r[0]; el.querySelector('.cap span').textContent = r[1]; };
  const place = () => order.forEach((el, k) => { el.className = 'cd k' + k; el.style.transform = ''; if (k) el.setAttribute('aria-hidden', 'true'); else el.removeAttribute('aria-hidden'); });
  const label = () => { idx.textContent = `${top % R.length + 1} / ${R.length}`; nx.textContent = top % R.length === R.length - 1 ? '回到第一间 ↺' : '下一间 ↑'; };
  const next = () => {
    if (busy) return;
    busy = true;
    const f = order[0];
    f.style.transform = '';
    f.classList.add('out');
    order = [order[1], order[2], f];
    order[0].className = 'cd k0'; order[1].className = 'cd k1'; order[0].removeAttribute('aria-hidden');
    top++; label();
    setTimeout(() => { f.style.transition = 'none'; fill(f, top + 2); place(); void f.offsetWidth; f.style.transition = ''; busy = false; }, still ? 0 : 300);
  };
  order.forEach((el, k) => fill(el, k)); place(); label();
  nx.addEventListener('click', next);
  // 上滑主卡：跟手上移，超过 60px（按缩放换算）就换下一张，否则回位
  let y0 = null, s = 1;
  deck.addEventListener('pointerdown', (e) => { if (busy) return; y0 = e.clientY; s = +getComputedStyle(st).getPropertyValue('--s') || 1; deck.setPointerCapture(e.pointerId); order[0].style.transition = 'none'; });
  deck.addEventListener('pointermove', (e) => { if (y0 === null) return; const dy = Math.min(0, (e.clientY - y0) / s); order[0].style.transform = `translateY(${dy * .6}px)`; });
  const up = (e) => { if (y0 === null) return; const dy = (e.clientY - y0) / s; y0 = null; order[0].style.transition = ''; if (dy < -60) next(); else order[0].style.transform = ''; };
  deck.addEventListener('pointerup', up); deck.addEventListener('pointercancel', up);
}
</script>
