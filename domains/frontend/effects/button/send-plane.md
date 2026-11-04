---
zh: 纸飞机发送按钮
en: Paper plane send button
aka: 发送动画 发送按钮 飞出图标 发送成功
order: 100
---

## 是什么

点发送后，按钮里的纸飞机起飞，翻一个圈，拖着虚线飞出画面；按钮变成绿色的“已发送”和对勾，停两秒再恢复成发送。

## 适合

邮件、留言、邀请、反馈表单这类一次发送算一件小事、值得回应一下的地方。

## 不适合

高频聊天的每条消息，一条一飞太吵；付款、下单这类有分量的提交用「提交按钮变形」；少见的里程碑用「完成庆祝」。

## 注意

起飞只代表“发出去了”，“已发送”要等请求返回：飞行结束还没结果就停在“发送中”；失败时按钮回到发送并写明原因，输入内容保留。

## 要点

- 轨迹用 offset-path 配 offset-rotate: auto，机头跟着曲线转；路径起点的切线对齐图标朝向，静止和起飞之间不跳角度。
- 约 780ms：前 60% 的时间走完起飞和翻圈，后面加速飞出并缩到 .7。
- 飞机飞出按钮后落在浅色背景上，起飞时换成白色填充加品牌色描边。
- 飞行路线上的容器保持 overflow: visible，只有最外层舞台裁切。
- 虚线尾迹用同一条路径，遮罩里放一条 pathLength="1" 的线按 stroke-dashoffset 揭开，和飞机共用时间曲线；恢复时淡出。
- 按钮宽度固定：发送、发送中、已发送三个文案叠在同一格（grid-area: 1 / 1），切换时不跳。
- 进行中用 aria-disabled="true" 防重复，焦点留在按钮上；按钮的 aria-label 跟状态变，结果用 role="status" 播报“已发送给{收件人}”。
- 恢复时新飞机从左下方滑回，约 240ms。
- 减少动态效果时不起飞，文案和图标直接切换。

## 提示词

把{发送按钮}做成「纸飞机发送按钮」：按钮里文字在左、纸飞机图标在右，宽度固定，发送、发送中、已发送三个文案叠在同一格；点击或回车提交后变成“发送中”，飞机沿 offset-path 飞出（offset-rotate: auto，路径起点切线对齐图标朝向），先翻一个圈再加速飞出画面，约 780ms，飞行时改成白色填充加品牌色描边，路线上的容器保持 overflow: visible，并沿同一路径揭开一条虚线尾迹；请求成功且飞行结束后，按钮变成绿色的“已发送”和对勾，用 role="status" 播报，2.4 秒后尾迹淡出，新飞机从左下方滑回，恢复成发送；请求失败时恢复成发送并显示原因，输入内容保留；进行中用 aria-disabled 防重复；减少动态效果时不飞，文案和图标直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:12px;background:linear-gradient(160deg,#dbeafe,#eef2ff)}
.card{position:relative;display:grid;gap:8px;width:min(100% - 72px,420px);padding:12px 14px;border-radius:14px;background:#fff;box-shadow:0 8px 22px -12px rgba(30,50,110,.35)}
.to{margin:0;color:#5a6276;font-size:12px}
.to b{color:#1b2233;font-weight:600}
.bd{margin:0;color:#1b2233;font-size:13px;line-height:1.5}
.ft{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#5a6276;font-size:12px}
.send{--bg:#2f5fe0;position:relative;flex:none;display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 12px 0 14px;border:0;border-radius:10px;background:var(--bg);color:#fff;font-size:13px;font-weight:600;transition:background-color .2s}
.send[data-s=sent]{--bg:#177245}
.send[aria-disabled=true]{cursor:default}
.ico{position:relative;display:grid;width:18px;height:18px}
.ico svg{grid-area:1/1;width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ok{opacity:0;transform:scale(.6);transition:opacity .18s,transform .22s cubic-bezier(.3,1.4,.6,1)}
.send[data-s=sent] .ok{opacity:1;transform:none}
.pl{transition:fill .12s,stroke .12s;offset-path:path("M9 9C21 -3 48 -18 62 -18C68.6 -18 74 -23.4 74 -30C74 -36.6 68.6 -42 62 -42C55.4 -42 50 -36.6 50 -30C50 -23.4 55.4 -18 62 -18C90 -18 220 -120 520 -430");offset-rotate:auto 45deg;offset-distance:0%;offset-anchor:center;z-index:3}
.send[data-s=fly] .pl{fill:#fff;stroke:#2f5fe0}
.send[data-s=sent] .pl{opacity:0}
.lb{display:grid;justify-items:start}
.lb span{grid-area:1/1;opacity:0;transform:translateY(4px);transition:opacity .16s,transform .2s}
.send[data-s=idle] .l0,.send[data-s=fly] .l1,.send[data-s=sent] .l2{opacity:1;transform:none}
.tr{position:absolute;left:0;top:0;width:18px;height:18px;overflow:visible;pointer-events:none;opacity:0;transition:opacity .3s}
.tr.on{opacity:1}
@container (min-height:260px){.card{gap:12px;padding:18px 20px}
.bd{font-size:15px}
.to,.ft{font-size:13px}
.send{height:40px;padding:0 14px 0 18px;font-size:14px}
}
@media (prefers-reduced-motion:reduce){.tr{display:none}
}
</style>

<div class="st"><form class="card" aria-label="写给苏晚的消息"><p class="to">发给 <b>苏晚</b></p><p class="bd">周五的评审改到下午三点，材料放共享盘了。</p><div class="ft"><span>附件 1 个</span><button type="submit" class="send" data-s="idle" aria-label="发送"><span class="lb" aria-hidden="true"><span class="l0">发送</span><span class="l1">发送中</span><span class="l2">已发送</span></span><span class="ico" aria-hidden="true"><svg class="tr" viewBox="0 0 18 18"><mask id="sp-m" maskUnits="userSpaceOnUse" x="-120" y="-460" width="760" height="520"><path class="rv" d="M9 9C21 -3 48 -18 62 -18C68.6 -18 74 -23.4 74 -30C74 -36.6 68.6 -42 62 -42C55.4 -42 50 -36.6 50 -30C50 -23.4 55.4 -18 62 -18C90 -18 220 -120 520 -430" fill="none" stroke="#fff" stroke-width="10" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></mask><path d="M9 9C21 -3 48 -18 62 -18C68.6 -18 74 -23.4 74 -30C74 -36.6 68.6 -42 62 -42C55.4 -42 50 -36.6 50 -30C50 -23.4 55.4 -18 62 -18C90 -18 220 -120 520 -430" mask="url(#sp-m)" fill="none" stroke="#7c93d8" stroke-width="1.5" stroke-dasharray="2 6"/></svg><svg class="pl" viewBox="0 0 24 24"><path d="M21 3l-6.5 18-4-8.5L2 8.5zM21 3 10.5 12.5"/></svg><svg class="ok" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span></button></div></form><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const form = root.querySelector('form'), btn = root.querySelector('.send'), pl = root.querySelector('.pl'), tr = root.querySelector('.tr'), rv = root.querySelector('.rv'), say = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const set = (s) => { btn.dataset.s = s; if (s === 'idle') btn.removeAttribute('aria-disabled'); else btn.setAttribute('aria-disabled', 'true'); btn.setAttribute('aria-label', { idle: '发送', fly: '发送中', sent: '已发送' }[s]); };
  const later = (ms) => new Promise((r) => setTimeout(r, ms));
  const request = () => later(still ? 300 : 480); // 换成真实请求；飞行和请求谁慢等谁
  const send = async () => {
    if (btn.dataset.s !== 'idle') return;
    set('fly');
    const flight = [request()];
    if (!still) {
      tr.classList.add('on');
      // 前 62% 的时间走完起飞和翻圈（路程的 18%：先向右飞出卡片，在浅色背景上翻圈），剩下的时间加速飞出画面
      const opt = { duration: 780, fill: 'forwards' }, slow = 'cubic-bezier(.3,0,.5,1)', fast = 'cubic-bezier(.5,0,1,.6)';
      const f = pl.animate([{ offsetDistance: '0%', transform: 'scale(1)', easing: slow }, { offsetDistance: '18%', transform: 'scale(1)', offset: 0.62, easing: fast }, { offsetDistance: '100%', transform: 'scale(.7)' }], opt);
      rv.animate([{ strokeDashoffset: 1, easing: slow }, { strokeDashoffset: 0.82, offset: 0.62, easing: fast }, { strokeDashoffset: 0 }], opt);
      flight.push(f.finished);
    }
    await Promise.all(flight);
    if (!root.host.isConnected) return;
    set('sent');
    say.textContent = '已发送给苏晚';
    await later(2400);
    if (!root.host.isConnected) return;
    tr.classList.remove('on');
    pl.getAnimations().forEach((a) => a.cancel());
    rv.getAnimations().forEach((a) => a.cancel());
    set('idle');
    // 恢复时新飞机从左下滑回：先停 120ms 等“已发送”换回“发送”，再滑 240ms；位移不超过图标和文字的间距，不压到文字
    if (!still) pl.animate([{ opacity: 0, transform: 'translate(-6px,10px)' }, { opacity: 0, transform: 'translate(-6px,10px)', offset: 1 / 3 }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'ease-out' });
  };
  form.addEventListener('submit', (e) => { e.preventDefault(); send(); });
  setTimeout(send, 100);
}
</script>
