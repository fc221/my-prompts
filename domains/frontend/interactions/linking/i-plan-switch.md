---
zh: 套餐联动切换
en: Linked plan switcher
aka: 定价切换 会员套餐切换 价格滚动 套餐卡片 pricing toggle
order: 50
---

## 是什么

一张卡片配一组套餐选项：切换时滑块滑到新选项，卡片底色、价格的每一位数字、权益列表的每一行各自过渡，看得出到底变了什么。

## 适合

App 内的会员开通页、付费弹层、手机窄屏的定价区，同一时间只看一个套餐、又想让人感受到差别的地方。

## 不适合

要把几档并排逐项比较用「价格对比」；月付、年付这种只改价格的开关，把价格数字滚一下就够了。

## 注意

整张卡淡入淡出，人只看到闪了一下，说不出差别。权益行固定不动、只换值：每一行都留在原位，变的是右边的数和勾选状态，高度不变，按钮也不会被顶走。

## 要点

- 选项用原生 radio，方向键可切；选中滑块用 transform 移动，320ms 带一点回弹，切换期间也能接着点
- 颜色：卡片底色、滑块、按钮文字共用一个颜色变量，各自 360ms 过渡，同时到位；文字和底色的对比度在每一档都要达标
- 价格：每一位是一条 0–9 的竖条，用 translateY 滚到目标数字，520ms 缓出；等宽数字，位数变化时用宽度过渡收起或展开最高位；竖条对读屏隐藏，另放一份完整文字
- 权益：所有档位用同一组行；值上滑换新（旧值 200ms 出、新值 340ms 进），行与行错开 50ms；勾和横线用 stroke-dashoffset 画出，不含的行降低透明度并写“不含”
- 中途再切：动画都靠 CSS 过渡，从当前位置接着走；旧文字节点及时清掉，不叠成一堆
- 按钮文案跟着变（“当前套餐”“升级专业版”），当前档不可再次购买，用 aria-disabled 并写明原因
- 切换后用 role="status" 播报一次完整摘要：“专业版，每月 68 元，项目 30 个……”
- 减少动态效果时颜色和数字直接换

## 提示词

给{会员开通页}做「套餐联动切换」：顶部是{套餐数}档分段选项（原生 radio，方向键可切），选中滑块用 transform 320ms 滑动；下方一张卡，左边价格和购买按钮，右边固定的权益行（{权益列表}）；切换时卡片底色、滑块和按钮文字共用一个颜色变量同时过渡 360ms；价格每一位是 0–9 的竖条，translateY 滚到新数字（520ms 缓出，等宽数字），位数变化时最高位用宽度过渡收起或展开；权益行不增不减，值上滑换新，行与行错开 50ms，不含的行画横线、写“不含”并降低透明度；按钮文案跟着变，当前档写“当前套餐”并设 aria-disabled；中途再切从当前状态接着过渡；竖条对读屏隐藏，用 role="status" 播报完整摘要（套餐名、价格、各项权益）；减少动态效果时直接换。价格、权益数据来自{数据来源}。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{padding:10px 12px}
.box{--c:#344054;display:grid;grid-template-rows:auto minmax(0,1fr);gap:8px;height:100%;max-width:520px;margin:0 auto}
.seg{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));height:32px;padding:3px;border-radius:10px;background:#e6e9ee}
.th{position:absolute;left:3px;top:3px;bottom:3px;width:calc((100% - 6px)/3);border-radius:8px;background:var(--c);transform:translateX(calc(var(--i,0)*100%));transition:transform .32s cubic-bezier(.3,1.25,.5,1),background-color .36s}
.seg label{position:relative;display:grid;place-items:center;border-radius:8px;color:#475467;font-size:12.5px;font-weight:600;cursor:pointer;transition:color .2s}
.seg label:has(:checked){color:#fff}
.seg label:has(:focus-visible){outline:2px solid #3b5bdb;outline-offset:2px}
.seg input{position:absolute;inset:0;margin:0;opacity:0;cursor:pointer}
.cd{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:12px;align-items:center;min-height:0;padding:10px 12px;border-radius:14px;background:var(--c);color:#fff;transition:background-color .36s}
.l{display:grid;gap:4px;min-width:0}
.nm{display:grid;overflow:hidden;margin:0;font-size:12px;line-height:18px;opacity:.86}
.pr{display:flex;align-items:flex-end;margin:0;font-size:34px;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums}
.pr em{margin:0 2px 5px 0;font-size:15px;font-style:normal}
.pr small{margin:0 0 4px 3px;font-size:12px;font-weight:500;opacity:.86}
.dg{display:block;flex:none;width:.6em;height:1.1em;overflow:hidden;transition:width .36s,opacity .2s}
.dg.off{width:0;opacity:0}
.sp{display:block;transform:translateY(calc(var(--n,0)*-1.1em));transition:transform .52s cubic-bezier(.2,.8,.2,1)}
.sp i{display:block;height:1.1em;font-style:normal;line-height:1.1em;text-align:center}
.go{display:grid;width:100%;height:30px;place-items:center;overflow:hidden;padding:0 8px;border:0;border-radius:8px;background:#fff;color:var(--c);font-size:12.5px;font-weight:600;transition:color .36s}
.go.cur{background:rgba(255,255,255,.18);color:#fff;cursor:default}
.go:focus-visible{outline-color:#fff}
.rs{display:grid;gap:3px;min-width:0;margin:0;padding:0;list-style:none}
.rs li{display:flex;align-items:center;gap:6px;min-width:0;height:22px;font-size:12px;transition:opacity .28s}
.rs li.no{opacity:.62}
.rs svg{flex:none;width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.rs path{stroke-dasharray:16;stroke-dashoffset:0;transition:stroke-dashoffset .3s calc(var(--r)*50ms)}
.rs .no .ck{stroke-dashoffset:16}
.rs .dh{stroke-dasharray:none;opacity:0;transition:opacity .2s}
.rs .no .dh{opacity:1}
.rs span{flex:none}
.v{display:grid;height:20px;overflow:hidden;line-height:20px;font-weight:600;white-space:nowrap}
.v b,.nm b,.go b{grid-area:1/1;font-weight:inherit}
.in{animation:vin .34s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--r,0)*50ms)}
.out{animation:vout .2s ease-in both;animation-delay:calc(var(--r,0)*50ms)}
@keyframes vin{from{opacity:0;transform:translateY(100%)}
}
@keyframes vout{to{opacity:0;transform:translateY(-100%)}
}
@container (min-width:560px){.cd{gap:32px;padding:14px 24px}
.pr{font-size:44px}
.pr em{font-size:18px;margin-bottom:7px}
.pr small{font-size:13px;margin-bottom:7px}
.nm{font-size:13px}
.go{height:34px;font-size:13px}
.rs{gap:8px}
.rs li{font-size:13px}
}
</style>

<div class="st"><div class="box"><div class="seg" role="radiogroup" aria-label="选择套餐"><i class="th"></i><label><input type="radio" name="plan" value="0" checked>基础版</label><label><input type="radio" name="plan" value="1">专业版</label><label><input type="radio" name="plan" value="2">团队版</label></div><div class="cd"><div class="l"><p class="nm" aria-hidden="true"></p><p class="pr" aria-hidden="true"><em>¥</em><span class="dg" data-clip></span><span class="dg" data-clip></span><span class="dg" data-clip></span><small>/月</small></p><button type="button" class="go"></button></div><ul class="rs"></ul></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const PLAN = [
    { n: '基础版', tip: '个人试用', p: 0, c: '#344054', go: '当前套餐', v: ['3 个', '1 人', '2 GB', '不含'] },
    { n: '专业版', tip: '小团队首选', p: 68, c: '#3b5bdb', go: '升级专业版', v: ['30 个', '5 人', '100 GB', '含'] },
    { n: '团队版', tip: '全公司协作', p: 198, c: '#0f766e', go: '升级团队版', v: ['不限', '50 人', '1 TB', '含'] },
  ];
  const ROW = ['项目', '成员', '存储', '批量导出'];
  const box = root.querySelector('.box'), th = root.querySelector('.th'), dgs = [...root.querySelectorAll('.dg')], rs = root.querySelector('.rs'), nm = root.querySelector('.nm'), go = root.querySelector('.go'), sr = root.querySelector('.sr'), radios = [...root.querySelectorAll('input')];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  dgs.forEach((d) => { d.innerHTML = `<span class="sp">${[...'0123456789'].map((n) => `<i>${n}</i>`).join('')}</span>`; });
  rs.innerHTML = ROW.map((k, i) => `<li style="--r:${i}"><svg viewBox="0 0 14 14" aria-hidden="true"><path class="ck" d="M2.5 7.5l3 3 6-6.5"/><path class="dh" d="M3 7h8"/></svg><span>${k}</span><span class="v"></span></li>`).join('');
  const lis = [...rs.children], vs = lis.map((l) => l.querySelector('.v'));
  // 文字原地上滑换新：行不增不减，版面不跳
  const swap = (el, t, r) => {
    const old = [...el.children]; if (old.at(-1)?.textContent === t) return;
    if (still) return el.replaceChildren(Object.assign(document.createElement('b'), { textContent: t }));
    old.slice(0, -1).forEach((o) => o.remove());
    const was = old.at(-1); if (was) { was.className = 'out'; setTimeout(() => was.remove(), 500); }
    const b = Object.assign(document.createElement('b'), { textContent: t, className: was ? 'in' : '' }); if (r) b.style.setProperty('--r', r); el.append(b);
  };
  const apply = (i) => {
    const P = PLAN[i], s = String(P.p).padStart(3, ' ');
    box.style.setProperty('--c', P.c); th.style.setProperty('--i', i);
    dgs.forEach((d, k) => { d.classList.toggle('off', s[k] === ' '); if (s[k] !== ' ') d.style.setProperty('--n', s[k]); });
    swap(nm, P.tip); swap(go, P.go); go.classList.toggle('cur', i === 0); go.setAttribute('aria-disabled', i === 0);
    vs.forEach((v, r) => { swap(v, P.v[r], r); lis[r].classList.toggle('no', P.v[r] === '不含'); });
    sr.textContent = `${P.n}，每月 ${P.p} 元，` + ROW.map((k, r) => `${k}${P.v[r]}`).join('，');
  };
  let touched = false;
  radios.forEach((r, i) => r.addEventListener('change', () => { touched = true; apply(i); }));
  go.addEventListener('click', () => { const i = radios.findIndex((r) => r.checked); if (i) sr.textContent = `已选${PLAN[i].n}，下一步确认付款方式`; });
  apply(0);
  setTimeout(() => { if (root.host.isConnected && !touched) { radios[1].checked = true; apply(1); } }, 500);
}
</script>
