---
zh: 完成庆祝
en: Completion confetti
aka: 点击爆散 撒花 彩带 粒子爆开
order: 110
---

## 是什么

完成一件大事时，从按钮位置喷出一小把彩片，落下淡出；按钮同时变成对勾。

## 适合

首单成交、新手任务全部完成、升级成功这类少见的里程碑。

## 注意

只给少见的大事用，日常操作也庆祝会显得廉价又打扰。

## 提示词

在{完成重要里程碑（首单成交、新手任务全部完成、升级成功）}时加「完成庆祝」：从触发按钮的位置向上喷出 24–40 片小彩片（品牌色 + 两种邻近色），受重力下落并淡出，1 秒内结束；按钮同时变成对勾和“已完成”；每个里程碑只庆祝一次，日常保存不用；彩片层 pointer-events: none 且对读屏隐藏，结果另用文字播报；减少动态效果时只显示对勾和文字。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;display:grid;place-items:center;background:#f5f6f8;color:#1f2329;font:13px/1.5 system-ui,"PingFang SC",sans-serif;overflow:hidden}
.card{display:grid;justify-items:center;gap:6px;width:min(320px,90%);padding:20px;border-radius:16px;background:#fff;box-shadow:0 8px 24px -12px rgba(15,23,42,.25);text-align:center}
.card p{margin:0;color:#5b616e}
.go{height:40px;min-width:140px;padding:0 20px;border:0;border-radius:10px;background:#2563eb;color:#fff;font:600 14px system-ui,"PingFang SC",sans-serif;cursor:pointer;transition:background .2s}
.go.done{background:#16a34a}
.go:focus-visible,.again:focus-visible{outline:2px solid #2563eb;outline-offset:2px}
.msg{min-height:20px;color:#16a34a!important;font-weight:500}
.fx{position:absolute;inset:0;pointer-events:none}
.fx i{position:absolute;width:8px;height:12px;border-radius:2px}
</style>

<div class="st"><div class="card"><b>新手任务</b><p>完成最后一步：发出第一笔订单</p><button type="button" class="go">标记完成</button><p class="msg" role="status"></p><button type="button" class="ctl again" hidden>再看一次</button></div><div class="fx" aria-hidden="true"></div></div>

<script type="module">
export default function demo(root) {
  const go = root.querySelector('.go'), fx = root.querySelector('.fx'), msg = root.querySelector('.msg'), again = root.querySelector('.again'), C = ['#2563eb', '#7c9cf5', '#f59e0b'];
  const burst = () => { const r = go.getBoundingClientRect(), o = root.host.getBoundingClientRect(), x = r.left - o.left + r.width / 2, y = r.top - o.top; for (let i = 0; i < 32; i++) { const p = document.createElement('i'); p.style.left = x + 'px'; p.style.top = y + 'px'; p.style.background = C[i % 3]; fx.appendChild(p); const a = (-90 + (Math.random() - .5) * 120) * Math.PI / 180, v = 90 + Math.random() * 90, dx = Math.cos(a) * v, dy = Math.sin(a) * v; p.animate([{ transform: 'translate(0,0) rotate(0deg)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: .45 }, { transform: `translate(${dx * 1.3}px,${dy + 140}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }], { duration: 950, easing: 'cubic-bezier(.2,.7,.4,1)', fill: 'forwards' }).finished.then(() => p.remove()); } };
  go.addEventListener('click', () => { if (go.classList.contains('done')) return; go.classList.add('done'); go.textContent = '✓ 已完成'; msg.textContent = '新手任务全部完成'; again.hidden = false; if (!matchMedia('(prefers-reduced-motion: reduce)').matches) burst(); });
  again.addEventListener('click', () => { go.classList.remove('done'); go.textContent = '标记完成'; msg.textContent = ''; again.hidden = true; go.focus(); });
}
</script>
