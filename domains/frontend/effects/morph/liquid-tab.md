---
zh: 会拉伸的选中块
en: Stretchy indicator
order: 30
---

## 是什么

在标签之间切换时，选中底色不是整块平移：朝目标那一侧的边先冲过去，另一侧的边慢半拍跟上，中途被拉长，到位时收拢并轻轻回弹一下。

## 适合

内容标签、分段切换、底部导航的选中态这类“切过去了”需要一点手感的地方。

## 不适合

跟着鼠标悬停移动用「导航悬停滑块」，等速平移就够；选项多到要横向滚动的标签栏，拉伸会被裁掉，改用底部细线指示；一屏只放一处，不要给所有分段控件都加。

## 注意

变形的只是底色这一层：标签文字、按钮位置和点击区域都不动，切换内容也不等动画结束。

## 要点

- 左右两条边各追自己的目标：朝目标那侧的边用硬弹簧（约 0.2s 到位，过冲 2–4px 再回来），另一侧用软弹簧（约 0.35s，不过冲）；往左切时两条边角色对调。
- 终点按目标标签实际的 offsetLeft 和 offsetWidth 算，不假设等宽；跨两三个标签时拉得更长是对的，但不越出导航容器。
- 连续点击从当前位置和速度接着追，最后停在最后一次点的标签，旧动画不会把底色拉回去；容器尺寸变化时直接对齐，不播动画。
- 选中文字反白用一层 aria-hidden 的白字叠在上面，clip-path 读底色同一组左右边，字色跟着底色边缘走，不会先变白再等底色。
- role="tablist" / "tab" 配 aria-selected，只有选中项在 Tab 序列里；左右方向键切换并移焦，Home / End 到首尾；切换后用 role="status" 播报分类和数量。
- 动画只在有位移时跑，两条边都停稳（误差 < 0.3px）就停掉循环。
- 减少动态效果时底色直接到位，不拉伸、不回弹。

## 提示词

给{标签栏}的选中底色加「会拉伸的选中块」：标签文字和点击区域不动，只有后面那块圆角底色变形；底色的左右两条边分别用 requestAnimationFrame 里的弹簧追目标标签的 offsetLeft 和 offsetLeft + offsetWidth：朝目标方向的那条边刚度约 520、阻尼约 30（约 0.2s 到位、轻微过冲），另一条边刚度约 180、阻尼约 26（约 0.35s、不过冲），往左切时对调，中途被拉长、到位收拢；连续点击从当前位置和速度接着追，停在最后一次的标签，两条边停稳后停掉循环；选中文字反白用一层 aria-hidden 的白字叠在上面，clip-path 读同一组左右边；{标签内容}立即切换，不等动画；role="tablist"/"tab" 配 aria-selected，方向键切换并移焦，Home / End 到首尾，切换后用 role="status" 播报；容器尺寸变化时直接对齐；减少动态效果时直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{padding:10px 12px;background:linear-gradient(#fbf8f3,#f3eee6)}
.app{display:flex;flex-direction:column;gap:8px;max-width:420px;height:100%;margin:0 auto}
.hd{display:flex;align-items:center;justify-content:space-between;gap:8px}
.hd b{font-size:16px;font-weight:700}
.hd small{margin-left:6px;color:#8a8070;font-size:12px;font-weight:400}
.tabs{--l:3px;--r:55px;position:relative;flex:none;display:flex;gap:2px;width:max-content;max-width:100%;padding:3px;border-radius:18px;background:#ece5d9}
.t{flex:none;height:30px;padding:0 13px;border:0;border-radius:15px;background:none;color:#6b6152;font-size:13px;line-height:30px;white-space:nowrap}
.ind,.hi{position:absolute;pointer-events:none}
.ind{z-index:2;top:3px;bottom:3px;left:var(--l);width:calc(var(--r) - var(--l));border-radius:15px;background:#2b2f3a;box-shadow:0 2px 6px rgba(43,47,58,.25)}
.hi{z-index:3;inset:0;display:flex;gap:2px;padding:3px;clip-path:inset(3px calc(100% - var(--r)) 3px var(--l) round 15px)}
.hi .t{color:#fff;font-weight:600}
.tabs button:focus-visible{outline-offset:3px}
.bk{flex:1;min-height:0;display:flex;flex-direction:column;gap:2px;margin:0;padding:0;list-style:none;overflow-y:auto;scrollbar-width:thin}
.bk li{flex:none;display:flex;align-items:center;gap:10px;padding:3px 2px}
.cv{flex:none;width:28px;height:37px;border-radius:3px 6px 6px 3px;background:linear-gradient(90deg,rgba(0,0,0,.18) 0 3px,transparent 3px),linear-gradient(160deg,var(--a),var(--b));box-shadow:0 2px 5px rgba(60,45,20,.18)}
.bk span{flex:1;min-width:0}
.bk b,.bk small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bk b{font-weight:600}
.bk small{color:#8a8070;font-size:12px}
.pg{display:none;height:3px;margin-top:4px;border-radius:2px;background:#e6dfd3}
.pg i{display:block;height:100%;border-radius:inherit;background:#c2410c}
.bk em{flex:none;color:#8a8070;font-size:12px;font-style:normal;font-variant-numeric:tabular-nums}
@container (max-width:320px){.t{padding:0 11px}
}
@container (min-height:260px){.pg{display:block}
.bk li{padding:5px 2px}
.cv{width:30px;height:40px}
}
</style>

<div class="st"><div class="app"><div class="hd"><b>我的书架<small>共 6 本</small></b><button type="button" class="ctl re">重播</button></div><div class="tabs" role="tablist" aria-label="书架分类"><i class="ind" aria-hidden="true"></i><div class="hi" aria-hidden="true"></div></div><ul class="bk" id="lt-p" role="tabpanel"></ul><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const tabs = root.querySelector('.tabs'), hi = root.querySelector('.hi'), list = root.querySelector('.bk'), say = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const B = {
    a: ['雾港来信', '林遥', 62, '#7aa6c2', '#2f4f6b'], b: ['一座山的四季', '程野', 18, '#9cc59a', '#3f6e4a'], c: ['盐田日记', '苏眠', 0, '#f3c98b', '#c0623a'],
    d: ['慢车去北方', '周叙', 0, '#c7b8e8', '#5b4a8f'], e: ['海风收音机', '向晚', -1, '#f5a3a3', '#a63d4f'], f: ['第七个邮差', '季白', -1, '#d8c7a0', '#6b5a3a'],
  };
  const D = [['全部', 'abcdef'], ['在读', 'ab'], ['已读完', 'cd'], ['想读清单', 'ef']];
  tabs.insertAdjacentHTML('afterbegin', D.map(([n], i) => `<button type="button" class="t" role="tab" aria-controls="lt-p" aria-selected="false" tabindex="-1" data-i="${i}">${n}</button>`).join(''));
  hi.innerHTML = D.map(([n]) => `<span class="t">${n}</span>`).join('');
  const btns = [...tabs.querySelectorAll('[role=tab]')];
  const row = (k) => { const [t, a, p, c1, c2] = B[k]; return `<li><i class="cv" style="--a:${c1};--b:${c2}"></i><span><b>${t}</b><small>${a}${p > 0 ? ` · 读到 ${p}%` : ''}</small>${p > 0 ? `<i class="pg"><i style="width:${p}%"></i></i>` : ''}</span><em>${p > 0 ? '在读' : p === 0 ? '已读完' : '想读'}</em></li>`; };
  // 底色左右两条边各是一个弹簧：朝目标那侧硬、另一侧软，于是先拉长再收拢
  const E = [{ x: 3, v: 0, t: 3 }, { x: 55, v: 0, t: 55 }];
  let cur = -1, dir = 1, raf = 0, last = 0, tm = [];
  const draw = () => { tabs.style.setProperty('--l', E[0].x.toFixed(2) + 'px'); tabs.style.setProperty('--r', E[1].x.toFixed(2) + 'px'); };
  const step = (now) => {
    raf = 0;
    if (!root.host.isConnected) return;
    for (let dt = Math.min(0.033, (now - last) / 1000); dt > 0; dt -= 1 / 240) {
      const h = Math.min(dt, 1 / 240);
      E.forEach((e, i) => { const lead = (i === 1) === (dir > 0), k = lead ? 520 : 180, c = lead ? 30 : 26; e.v += (-(e.x - e.t) * k - e.v * c) * h; e.x += e.v * h; });
    }
    last = now;
    if (E.some((e) => Math.abs(e.x - e.t) > 0.3 || Math.abs(e.v) > 0.3)) raf = requestAnimationFrame(step);
    else E.forEach((e) => { e.x = e.t; e.v = 0; });
    draw();
  };
  const aim = (animate) => {
    const b = btns[cur]; E[0].t = b.offsetLeft; E[1].t = b.offsetLeft + b.offsetWidth;
    if (!animate || still) { cancelAnimationFrame(raf); raf = 0; E.forEach((e) => { e.x = e.t; e.v = 0; }); return draw(); }
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); }
  };
  const select = (i, focus, quiet) => {
    if (i === cur) return;
    const first = cur < 0;
    dir = i > cur ? 1 : -1; cur = i;
    btns.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
    list.setAttribute('aria-label', D[i][0]);
    if (focus) btns[i].focus();
    // 内容立即切换，不等底色动画
    list.innerHTML = [...D[i][1]].map(row).join('');
    if (!still && !first) list.animate([{ opacity: 0 }, { opacity: 1 }], 140);
    aim(!first);
    if (!quiet) say.textContent = `${D[i][0]}，${D[i][1].length} 本`;
  };
  btns.forEach((b, i) => b.addEventListener('click', () => select(i)));
  tabs.addEventListener('keydown', (e) => {
    const k = { ArrowRight: cur + 1, ArrowLeft: cur - 1, Home: 0, End: btns.length - 1 }[e.key];
    if (k === undefined) return;
    e.preventDefault(); select((k + btns.length) % btns.length, true);
  });
  new ResizeObserver(() => { if (cur >= 0) aim(false); }).observe(tabs);
  // 演示：从“全部”跨两格切到“已读完”，再退回“在读”
  const play = () => { tm.forEach(clearTimeout); tm = [setTimeout(() => select(2), 500), setTimeout(() => select(1), 1400)]; select(0, false, true); };
  root.querySelector('.re').addEventListener('click', play);
  play();
}
</script>
