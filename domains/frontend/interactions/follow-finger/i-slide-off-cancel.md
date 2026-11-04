---
zh: 按住滑开就取消
en: Slide off to cancel
order: 50
---

## 是什么

按下按钮后手指不抬起、滑出按钮，按下态随之褪去，这时松手什么都不发生；滑回来又恢复按下态。最常见的是聊天里的“按住说话，上滑取消”。

## 适合

按住说话、按住录像、按住连拍这类“按下就开始、松手才提交”的操作；发送、下单这类想给用户最后一次反悔机会的按钮。

## 不适合

删除、清空这类危险操作要的是确认，用「按住确认」或确认对话框。普通按钮直接用原生 click 就自带“滑出再松手不触发”，不要自己改成 pointerup 触发把它弄坏。

## 注意

“手指还在不在按钮上”要用指针的实时坐标和按下时记下的按钮矩形比较，不能靠 pointerleave（设了 setPointerCapture 之后它不会在移出时触发），也不能拿正在缩放的按钮外观来判断。

## 要点

- 命中区 = 按下那一刻的按钮矩形向外扩 20px，之后不随按下态缩放而变
- 手指移出按钮边缘后，按下态在外扩的 20px 里逐渐褪去；越过命中区边界，提示变成危险色“松开手指，取消发送”，滑回来恢复
- 按住说话的提示框放在按钮上方，写明“手指上滑，取消发送”，让人知道往哪边滑
- 输入栏里的按住说话：按下后输入栏原地拉长成录音条，显示时长和跳动的波形；旁边的 + 转 45° 变成 ×，点它同样取消，给不方便滑动的人一个点按出口
- 在命中区内松手提交一次；区外松手、pointercancel、失去指针捕获都按取消处理，只清理状态
- 用 pointerup 提交时屏蔽随后那次 click，避免提交两次；录音不足 1 秒按“时间太短”处理，不发送
- 键盘：聚焦后按住空格开始、松开提交，按住时按 Esc 取消；开始、取消、已发送都用 role="status" 播报
- 减少动态效果时去掉波形跳动和缩放，只换颜色和文字

## 提示词

给{产品}的{按住说话按钮}做「按住滑开就取消」：按下即开始录制，输入栏原地拉长成录音条（显示时长和波形），旁边的 + 转 45° 变成 ×、点它也能取消，按钮上方显示提示框“手指上滑，取消发送”；按下时记下按钮矩形并外扩 20px 作为命中区，之后不随缩放变化；手指移出按钮边缘后按下态在这 20px 内逐渐褪去，越过命中区边界时提示框变危险色并显示“松开手指，取消发送”，滑回来恢复；区内松手提交一次，区外松手、pointercancel、失去指针捕获都按取消处理；不足 1 秒提示“时间太短”不发送；用 pointerup 提交时屏蔽随后的 click；键盘聚焦后按住空格开始、松开提交、Esc 取消；用 role="status" 播报开始、取消、已发送；减少动态效果时不做波形和缩放，只换颜色和文字。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:flex;justify-content:center;gap:14px;padding:10px 12px 0;background:linear-gradient(155deg,#edf1f7,#d9e0ea)}
.dev{position:relative;flex:none;width:188px;height:calc(100% + 30px);padding:5px 5px 0;border-radius:30px 30px 0 0;background:#15171c;box-shadow:0 20px 40px -18px rgba(15,23,42,.55)}
.scr{position:relative;display:flex;flex-direction:column;height:100%;padding-bottom:30px;overflow:hidden;border-radius:25px 25px 0 0;background:#eef0f4}
.sbar{position:relative;flex:none;display:flex;justify-content:space-between;align-items:center;height:24px;padding:0 16px 0 18px;background:#f7f8fa;font-size:10px;font-weight:600}
.sbar::after{content:"";position:absolute;left:50%;top:6px;width:44px;height:13px;margin-left:-22px;border-radius:7px;background:#15171c}
.bat{width:18px;height:9px;padding:1px;border:1.3px solid currentColor;border-radius:3px}
.bat::before{content:"";display:block;width:65%;height:100%;border-radius:1px;background:currentColor}
.hd{flex:none;display:flex;align-items:center;gap:2px;height:28px;padding:0 10px 0 6px;background:#f7f8fa;border-bottom:1px solid #e4e7ec;font-size:12.5px;font-weight:600}
.hd svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.msgs{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;gap:6px;padding:8px;overflow:hidden auto;scrollbar-width:none}
.m{display:flex;align-items:flex-end;gap:5px;max-width:86%}
.m.r{align-self:flex-end}
.av{flex:none;display:grid;place-items:center;width:22px;height:22px;border-radius:7px;background:#f59e0b;color:#fff;font-size:10px;font-style:normal;font-weight:700}
.m p{margin:0;padding:5px 8px;border-radius:10px;background:#fff;font-size:11.5px;line-height:1.4}
.m.r p{background:#2f6bff;color:#fff}
.vc{display:flex;align-items:center;justify-content:flex-end;gap:6px;min-width:var(--w,56px);font-variant-numeric:tabular-nums}
.vc svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round}
.bar{flex:none;display:flex;align-items:center;gap:6px;height:40px;padding:0 8px;background:#f7f8fa;border-top:1px solid #e4e7ec}
.ic{flex:none;display:grid;place-items:center;width:24px;height:24px;border:1.5px solid #3f4652;border-radius:50%;background:none;color:#3f4652}
.ic svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.hold{--k:0;flex:1;min-width:0;height:28px;border:0;border-radius:8px;background:color-mix(in srgb,#c7ccd5 calc(var(--k) * 100%),#fff);color:#1f2329;font-size:12px;font-weight:600;white-space:nowrap;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;box-shadow:0 0 0 1px #e1e4ea}
.ov{position:absolute;left:50%;bottom:52px;z-index:5;display:grid;justify-items:center;gap:4px;width:124px;padding:9px 8px 8px;border-radius:14px;background:rgba(31,35,41,.88);color:#fff;transform:translateX(-50%);pointer-events:none}
.ov.no{background:#e5484d}
.wave{display:flex;align-items:center;gap:3px;height:20px}
.wave i{width:3px;height:40%;border-radius:2px;background:currentColor;animation:wv .9s ease-in-out infinite alternate}
.wave i:nth-child(2n){animation-delay:-.3s}
.wave i:nth-child(3n){animation-delay:-.6s}
@keyframes wv{to{height:100%}
}
.ov.no .wave{display:none}
.ov .xx{display:none;place-items:center;width:20px;height:20px;border:2px solid #fff;border-radius:50%;font-size:11px;font-weight:700;line-height:1}
.ov.no .xx{display:grid}
.ov b{font-size:11px;font-variant-numeric:tabular-nums}
.ov small{font-size:10.5px;opacity:.9;white-space:nowrap}
.side{display:flex;flex:0 1 220px;flex-direction:column;gap:8px;min-width:0;padding:4px 0 12px}
.side .ctl{align-self:flex-start;height:28px;padding:0 10px;font-size:12px}
.cap{display:none;margin:0;color:#5b616e;font-size:12px}
.ro{display:grid;grid-template-columns:auto minmax(0,1fr);gap:1px 8px;align-items:baseline;margin:0;color:#5b616e;font-size:11px}
.ro b{color:#15171c;font:600 13px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums}
.vd{align-self:flex-start;margin:0;padding:0 8px;border-radius:999px;background:#e9ecf1;color:#475467;font-size:11px;line-height:20px;white-space:nowrap}
.vd.rec{background:#dbe7ff;color:#1d4ed8}
.vd.no{background:#fee4e2;color:#b42318}
.msg{margin:0;color:#344054;font-size:11.5px;line-height:1.5}
@container (max-width:310px){.st{gap:10px;padding:10px 10px 0}
.dev{width:170px}
.msg{font-size:11px}
}
@container (min-width:560px){.st{gap:32px}
.dev{width:236px}
.cap{display:block}
.m p{font-size:12.5px}
.ro b{font-size:15px}
.msg{font-size:12.5px}
.side .ctl{order:1}
}
@media (prefers-reduced-motion:reduce){.wave i{height:60%;animation:none}
}
</style>

<div class="st"><div class="dev"><div class="scr"><div class="sbar" aria-hidden="true"><span>21:16</span><span class="bat"></span></div><div class="hd"><svg viewBox="0 0 15 15" aria-hidden="true"><path d="M9.5 3 5 7.5 9.5 12"/></svg>周末露营群（6）</div><div class="msgs"><div class="m"><i class="av">杰</i><p>周六几点出发？</p></div><div class="m r"><p>八点小区北门集合</p></div><div class="m"><i class="av" style="background:#10b981">晴</i><p>我带帐篷，谁带炉子</p></div></div><div class="ov" aria-hidden="true" hidden><span class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="xx">✕</span><b class="tm">0:00</b><small class="hint">手指上滑，取消发送</small></div><div class="bar"><button type="button" class="ic" aria-label="切换到键盘输入"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4h8M2 6.5h8M4 9h4"/></svg></button><button type="button" class="hold" aria-label="按住说话：按住空格录音，松开发送，按 Esc 取消">按住 说话</button><button type="button" class="ic" aria-label="更多"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2.5v7M2.5 6h7"/></svg></button></div></div></div><div class="side"><button type="button" class="ctl rp">重播</button><p class="cap">按住“按住 说话”，不松手往上滑出按钮</p><p class="ro"><span>离开按钮</span><b class="ds">0px</b></p><p class="vd">等待按下</p><p class="msg" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const hold = root.querySelector('.hold'), ov = root.querySelector('.ov'), tmEl = root.querySelector('.tm'), hint = root.querySelector('.hint'), msgs = root.querySelector('.msgs');
  const ds = root.querySelector('.ds'), vd = root.querySelector('.vd'), msg = root.querySelector('.msg');
  const SLOP = 20; // 命中区 = 按下时的按钮矩形外扩 20px
  let rec = null, tm = [];
  const state = (t, c) => { vd.textContent = t; vd.className = 'vd ' + (c || ''); };
  const tick = () => { if (!rec || !root.host.isConnected) return; const s = Math.floor((performance.now() - rec.t0) / 1000); tmEl.textContent = `0:${String(s).padStart(2, '0')}`; rec.timer = setTimeout(tick, 200); };
  const start = (rect) => {
    rec = { t0: performance.now(), rect, inside: true };
    ov.hidden = false; ov.classList.remove('no'); hint.textContent = '手指上滑，取消发送'; hold.style.setProperty('--k', '1'); hold.textContent = '松开 发送';
    state('录音中', 'rec'); ds.textContent = '0px'; msg.textContent = '开始录音，松开发送，上滑或按 Esc 取消'; tick();
  };
  const track = (x, y) => { // 用实时坐标和按下时记下的矩形比较，不靠 pointerleave
    const r = rec.rect, dx = Math.max(r.left - x, 0, x - r.right), dy = Math.max(r.top - y, 0, y - r.bottom), dist = Math.hypot(dx, dy), inside = dist <= SLOP;
    hold.style.setProperty('--k', String(Math.max(0, 1 - dist / SLOP))); // 移出按钮边缘后，按下态在 20px 内褪去
    ds.textContent = Math.round(dist) + 'px';
    if (inside === rec.inside) return;
    rec.inside = inside; ov.classList.toggle('no', !inside); hint.textContent = inside ? '手指上滑，取消发送' : '松开手指，取消发送'; hold.textContent = inside ? '松开 发送' : '松开 取消';
    state(inside ? '录音中' : '松手就取消', inside ? 'rec' : 'no');
  };
  const end = (send) => {
    if (!rec) return;
    const sec = (performance.now() - rec.t0) / 1000; clearTimeout(rec.timer); rec = null;
    ov.hidden = true; hold.style.setProperty('--k', '0'); hold.textContent = '按住 说话';
    if (!send) { state('已取消', 'no'); msg.textContent = '已取消，这段语音没有发出'; return; }
    if (sec < 1) { state('太短', 'no'); msg.textContent = '说话时间太短，没有发送'; return; }
    const n = Math.round(sec), b = document.createElement('div');
    b.className = 'm r'; b.innerHTML = `<p class="vc" style="--w:${Math.min(110, 44 + n * 12)}px">${n}″<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 4.5a2 2 0 0 1 0 3M6.5 3a4 4 0 0 1 0 6M9 1.5a6 6 0 0 1 0 9"/></svg></p>`;
    msgs.append(b); msgs.scrollTop = msgs.scrollHeight;
    state('已发送'); msg.textContent = `已发送 ${n} 秒语音`;
  };
  hold.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || rec) return;
    e.preventDefault(); try { hold.setPointerCapture(e.pointerId); } catch {}
    start(hold.getBoundingClientRect());
  });
  hold.addEventListener('pointermove', (e) => { if (rec && !rec.kb) track(e.clientX, e.clientY); });
  hold.addEventListener('pointerup', (e) => { if (rec && !rec.kb) { track(e.clientX, e.clientY); end(rec.inside); } });
  hold.addEventListener('pointercancel', () => end(false));
  hold.addEventListener('lostpointercapture', () => { if (rec && !rec.kb) end(false); }); // 指针丢了一律按取消
  hold.addEventListener('contextmenu', (e) => e.preventDefault());
  hold.addEventListener('click', (e) => { if (e.detail === 0 && !rec) msg.textContent = '按住空格说话，松开发送'; }); // 指针点按已在 pointerup 处理，这里只给 Enter 一个提示
  hold.addEventListener('keydown', (e) => {
    if (e.key === ' ') { e.preventDefault(); if (!e.repeat && !rec) { start(hold.getBoundingClientRect()); rec.kb = true; } }
    else if (e.key === 'Escape' && rec) { e.preventDefault(); end(false); }
  });
  hold.addEventListener('keyup', (e) => { if (e.key === ' ') { e.preventDefault(); if (rec) end(true); } });
  hold.addEventListener('blur', () => { if (rec?.kb) end(false); });
  // 自动演示：按住说话 → 上滑到取消区 → 滑回来松手发送；再按住 → 上滑松手取消
  const play = () => {
    tm.forEach(clearTimeout); tm = []; if (rec) end(false);
    msgs.querySelectorAll('.vc').forEach((v) => v.closest('.m').remove()); state('等待按下'); msg.textContent = ''; ds.textContent = '0px';
    const at = (fn, t) => tm.push(setTimeout(() => { if (root.host.isConnected) fn(); }, t));
    const r = () => hold.getBoundingClientRect(), fire = (type, y) => hold.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, button: 0, clientX: r().left + r().width / 2, clientY: y }));
    let y = 0;
    const slide = (to, n, t) => { for (let k = 1; k <= n; k++) at(() => fire('pointermove', (y += (to() - y) / (n - k + 1))), t + k * 30); return t + n * 30; };
    let t = 300;
    at(() => { y = r().top + r().height / 2; fire('pointerdown', y); }, t);
    t = slide(() => r().top - 54, 8, t + 1000) + 650;
    t = slide(() => r().top + r().height / 2, 6, t) + 200;
    at(() => fire('pointerup', y), t);
    at(() => { y = r().top + r().height / 2; fire('pointerdown', y); }, (t += 600));
    t = slide(() => r().top - 54, 6, t + 800) + 500;
    at(() => fire('pointerup', y), t);
  };
  root.querySelector('.rp').addEventListener('click', play);
  tm.push(setTimeout(() => { if (root.host.isConnected) play(); }, 60));
}
</script>
