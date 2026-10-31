---
zh: 海报标题 + 半圆选择盘
en: Poster heading + arc picker
order: 50
---

## 是什么

饱和色底上用方块大字做标题，中间一个只露上半圈的转盘，选中的选项停在指针正下方，下面一个大按钮开始。

## 适合

专注计时、冥想、呼吸训练、点餐份量这类一屏只做一件事、选一个值就开始的页面。

## 不适合

需要输入精确数值或选项超过 8 个时用数字输入或列表；信息多的首页不适合，转盘会占掉大半屏。

## 注意

转盘必须能用键盘左右键调整，并用 role="slider" 读出当前值；拖动松手要吸附到选项，不能停在两项中间。

## 要点

- 整屏铺一个饱和色，文字白色；标题两行、52–60px、900 字重，像海报一样压满宽度
- 转盘只露上半圈（直径约 300px），选项沿圆周排布，当前项转到顶部指针正下方并加粗高亮
- 转盘下方居中显示当前值，48–56px 等宽数字
- 左右拖动旋转转盘，松手吸附到最近的选项（约 400ms 回弹曲线）；左右键每次一项
- 下面一个约 220px 宽的高对比实心按钮，是这一屏唯一的主操作
- 减少动态效果时转盘直接跳到选中项，不做回弹

## 提示词

{产品}的{页面}用「海报标题 + 半圆选择盘」：整屏铺{主色}，文字白色；顶部两行方块大字“{标题}”56px、900 字重；中间一个直径约 300px、只露上半圈的转盘，沿圆周排布{选项列表}，当前选项转到顶部指针正下方并高亮，转盘下方居中显示当前值（52px 等宽数字）；左右拖动旋转、松手吸附到最近选项（400ms 回弹），左右键每次一项，role="slider" 读出当前值；下面一个高对比实心按钮“{主行动}”是唯一的主操作；减少动态效果时直接跳到选中项。

## 示例

<link rel="stylesheet" href="../../_shared/app-phone.css">
<style>
.ph{background:#6c4cf5;color:#fff}
.tb{background:#5b3de6;border-top-color:rgba(255,255,255,.12)}
.tb button{color:#c9bdfd}
.tb [aria-current]{color:#fff}
.av{background:#fff;color:#4c2fd8}
.pt{display:grid;margin:10px 20px 0}
.pt span{font-size:12px;opacity:.8}
.pt b{font:900 58px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:-1px}
.dial{position:relative;height:178px;margin-top:8px;overflow:hidden;touch-action:pan-y;cursor:grab;border-radius:12px}
.ring{position:absolute;left:50%;top:28px;width:300px;height:300px;margin-left:-150px;border:2px dashed rgba(255,255,255,.35);border-radius:50%;transition:transform .4s cubic-bezier(.34,1.3,.64,1)}
.ring::before{content:"";position:absolute;inset:8px;border-radius:50%;background:repeating-conic-gradient(rgba(255,255,255,.45) 0 .7deg,transparent .7deg 8deg);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 10px),#000 calc(100% - 9px));mask:radial-gradient(farthest-side,transparent calc(100% - 10px),#000 calc(100% - 9px))}
.ring span{position:absolute;left:50%;top:50%;font-size:15px;font-weight:600;opacity:.6;transition:opacity .2s}
.ring span.on{opacity:1;font-weight:900;font-size:18px}
.pin{position:absolute;left:50%;top:6px;margin-left:-8px;border:8px solid transparent;border-top:11px solid #d9f99d}
.time{position:absolute;left:0;right:0;bottom:2px;display:grid;justify-items:center;pointer-events:none}
.time b{font:800 52px/1 ui-monospace,Menlo,monospace;letter-spacing:-1px}
.time span{margin-top:4px;font-size:11px;opacity:.75}
.short .pt span,.short .time span{display:none}
.short .pt b{font-size:48px}
.short .dial{height:156px;margin-top:2px}
.short .ring{top:16px}
.go{display:block;width:220px;height:52px;margin:16px auto 0;border-radius:26px;background:#d9f99d;color:#1a1a1a;font-weight:800;font-size:16px}
.stt{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:18px 20px 20px}
.stt div{display:grid;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.12)}
.stt b{font-size:18px}
.stt span{font-size:12px;opacity:.8}
</style>

<div class="st"><div class="fr"><div class="ph"><div class="sb" aria-hidden="true"><span>9:41</span><span class="bat"></span></div><div class="scr"><div class="hd"><span class="brand">MyPrompts</span><span class="av" aria-hidden="true">林</span></div><p class="pt"><span>今日专注</span><b>专注</b><b>一小时</b></p><div class="dial" role="slider" tabindex="0" aria-label="专注时长" aria-valuemin="15" aria-valuemax="90" aria-valuenow="25" aria-valuetext="25 分钟"><div class="ring"></div><i class="pin" aria-hidden="true"></i><div class="time" aria-hidden="true"><b>25:00</b><span>拖动转盘选择时长</span></div></div><button type="button" class="go">开始专注</button><div class="stt"><div><b>7 天</b><span>连续专注</span></div><div><b>6.5 小时</b><span>本周累计</span></div></div></div><nav class="tb" aria-label="底部导航"><button type="button" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/></svg>专注</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>统计</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/></svg>白噪音</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.8 4.2-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/></svg>我的</button></nav></div></div><ol class="lg" aria-label="版式要点"><li><b>01</b><span>顶部方块大字做标题</span></li><li><b>02</b><span>半圆转盘只露上半圈</span></li><li><b>03</b><span>选中的时长停在指针正下方</span></li><li><b>04</b><span>一屏只做一件事：选时长、开始</span></li></ol></div>

<script type="module">
import { fit } from '../../_shared/app-phone.ts';

export default function demo(root) {
  fit(root);
  const OPT = [15, 25, 45, 60, 90], STEP = 30, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const st = root.querySelector('.st'), dial = root.querySelector('.dial'), ring = root.querySelector('.ring'), tm = root.querySelector('.time b');
  ring.innerHTML = OPT.map((m, i) => `<span style="transform:translate(-50%,-50%) rotate(${i * STEP}deg) translateY(-124px)">${m}</span>`).join('');
  const labels = [...ring.children];
  let idx = 1, drag = null;
  const set = (i, anim = true) => {
    idx = Math.max(0, Math.min(OPT.length - 1, i));
    ring.style.transition = anim && !still ? '' : 'none';
    ring.style.transform = `rotate(${-idx * STEP}deg)`;
    labels.forEach((l, j) => l.classList.toggle('on', j === idx));
    tm.textContent = `${OPT[idx]}:00`;
    dial.setAttribute('aria-valuenow', OPT[idx]); dial.setAttribute('aria-valuetext', OPT[idx] + ' 分钟');
  };
  dial.addEventListener('keydown', (e) => {
    const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (k) set(idx + k); else if (e.key === 'Home') set(0); else if (e.key === 'End') set(OPT.length - 1); else return;
    e.preventDefault();
  });
  // 手指位移按缩放比例换算成屏幕内的像素，每 3px 转 1°
  dial.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, a: -idx * STEP, s: +getComputedStyle(st).getPropertyValue('--s') || 1 }; dial.setPointerCapture(e.pointerId); ring.style.transition = 'none'; });
  dial.addEventListener('pointermove', (e) => { if (!drag) return; const a = Math.max(-(OPT.length - 1) * STEP - 12, Math.min(12, drag.a + (e.clientX - drag.x) / drag.s / 3)); ring.style.transform = `rotate(${a}deg)`; drag.now = a; });
  const end = () => { if (!drag) return; const a = drag.now ?? drag.a; drag = null; set(Math.round(-a / STEP)); };
  dial.addEventListener('pointerup', end); dial.addEventListener('pointercancel', end);
  set(1, false);
}
</script>
