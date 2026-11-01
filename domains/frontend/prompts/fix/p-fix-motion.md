---
zh: 优化动效质感
en: Cheap motion
aka: 动效生硬廉价
tab: 动效
order: 230
---

## 是什么

症状：每个区块同一种淡入上移，弹窗凭空出现，回弹各不相同，看着廉价。

## 要点

- 适合“动效都有、但不高级”的页面。
- 完全没动效的页面改用“页面太素”。
- 想保留的特效写进最后一行。

## 提示词

页面动效生硬、廉价。请按下面的原则重做，宁可少不要乱：
1. 删掉每个区块都一样的淡入上移、每张卡片的悬停上浮、循环的脉冲和闪烁；全页只保留一处主动效（{首屏入场或某个关键场景}）。
2. 弹层从触发它的元素位置长出（transform-origin 设在触发点），关闭时沿原路收回，不在屏幕中央凭空出现。
3. 按钮变加载再变结果、加号变面板这类变化，用同一个元素连续改变宽高和圆角，不换成另一个元素。
4. 全站只用 3–4 条缓动曲线：进入先快后慢、退出先慢后快、轻微回弹只给小元素的确认反馈；时长 150–300ms，退出比进入快约 30%。
5. 只在有因果关系的地方错开 50–100ms（先让位再退场、计数逐层更新），其余同时动。
6. 高频操作（列表切换、快捷键、表格选择）不加进出动画，只做颜色变化。
7. 只动 transform 和 opacity；开启减少动态效果时直接切换。
保留的特效：{没有就写“无”}。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.fx{position:relative}
.ctl{position:absolute;top:5px;right:10px;height:22px;padding:0 8px;font-size:11px}
.c{padding:6px;display:flex;justify-content:center}
.ph{position:relative;width:96px;height:142px;border:2px solid #2b2f36;border-radius:10px;background:#f5f6f8;overflow:hidden;color:#1f2329;font-size:8px;line-height:11px}
.tb{display:flex;justify-content:space-between;align-items:center;height:16px;padding:0 6px;background:#fff;font-size:9px;line-height:16px;font-weight:600}
.tb span{color:#5b616e;font-size:8px;font-weight:400}
.tb b{color:#3b5bdb}
.ls{display:flex;flex-direction:column;gap:4px;padding:6px}
.cd{display:flex;justify-content:space-between;padding:5px 6px;border-radius:5px;background:#fff}
.cd span{color:#5b616e}
.fab{position:absolute;right:8px;bottom:8px;width:18px;height:18px;border-radius:50%;background:#3b5bdb;color:#fff;font-size:14px;line-height:18px;text-align:center}
.pp{position:absolute;padding:3px 0;border-radius:5px;background:#fff;box-shadow:0 2px 8px rgba(15,23,42,.18)}
.pp div{padding:2px 8px;white-space:nowrap}
/* 改前：每张卡片都同样的淡入上移，加号一直脉冲，菜单带回弹地在屏幕中央凭空出现 */
.bad .cd{opacity:0;transform:translateY(10px);transition:opacity .4s,transform .4s}
.bad .on .cd{opacity:1;transform:none}
.bad .on .cd:nth-child(2){transition-delay:.12s}
.bad .on .cd:nth-child(3){transition-delay:.24s}
.bad .fab{animation:pulse 1.2s ease-in-out infinite}
@keyframes pulse{50%{transform:scale(1.18);box-shadow:0 0 0 4px rgba(59,91,219,.25)}}
.bad .pp{left:14px;right:14px;top:44px;opacity:0;transform:scale(.5);transition:transform .5s cubic-bezier(.3,1.6,.5,1),opacity .2s}
.bad .pop .pp{opacity:1;transform:none}
/* 改后：内容直接就位，只留顶栏待办数一处入场；菜单从加号的位置长出来（transform-origin 在触发点），200ms 缓出 */
.good .tb b{opacity:0;transition:opacity .3s}
.good .on .tb b{opacity:1}
.good .pp{right:8px;bottom:30px;opacity:0;transform:scale(.6);transform-origin:100% 100%;transition:transform .2s cubic-bezier(.2,.8,.2,1),opacity .2s}
.good .pop .pp{opacity:1;transform:none}
.rst *{transition:none!important}
@media (prefers-reduced-motion:reduce){.bad .cd,.bad .pp,.good .tb b,.good .pp{transition:none}.bad .fab{animation:none}}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="ph"><div class="tb">工单<span>待办 <b>12</b></span></div><div class="ls"><div class="cd">空调维修<span>朝阳店</span></div><div class="cd">灯箱更换<span>望京店</span></div><div class="cd">门禁故障<span>西单店</span></div></div><div class="fab">+</div><div class="pp"><div>新建工单</div><div>扫码报修</div><div>批量导入</div></div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="ph"><div class="tb">工单<span>待办 <b>12</b></span></div><div class="ls"><div class="cd">空调维修<span>朝阳店</span></div><div class="cd">灯箱更换<span>望京店</span></div><div class="cd">门禁故障<span>西单店</span></div></div><div class="fab">+</div><div class="pp"><div>新建工单</div><div>扫码报修</div><div>批量导入</div></div></div></div></div></section>
  <button type="button" class="ctl">重播</button>
</div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phs = [...root.querySelectorAll('.ph')];
  let ts = [];
  const later = (fn, ms) => ts.push(setTimeout(() => { if (root.host.isConnected) fn(); }, ms));
  const play = () => {
    ts.forEach(clearTimeout); ts = [];
    phs.forEach((p) => { p.classList.add('rst'); p.classList.remove('on', 'pop'); void p.offsetHeight; p.classList.remove('rst'); });
    if (still) { phs.forEach((p) => p.classList.add('on', 'pop')); return; }
    later(() => phs.forEach((p) => p.classList.add('on')), 300);
    later(() => phs.forEach((p) => p.classList.add('pop')), 900);
  };
  root.querySelector('.ctl').addEventListener('click', play);
  play();
}
</script>
