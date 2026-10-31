---
zh: 点物件进房间各处
en: Explorable room
order: 50
---

## 是什么

首页是一间画出来的工作室，电脑、书架、留言板这些物件就是入口；点一个物件，镜头推近到它跟前，旁边展开对应的内容（作品、关于、联系），返回时镜头再拉回整间房。

## 适合

个人或小工作室官网、活动页这类入口只有 3–5 个、品牌个性比效率更重要的场景。

## 不适合

入口多于 5 个、内容很长，或用户带着明确任务来（查价格、找文档）时，用普通导航和页面；房间不能代替顶部导航。

## 注意

房间只是另一种入口，顶栏里必须有同样的直达链接；手机上不要让人在缩小的图里找指甲盖大小的热点。

## 要点

- 状态分 home → moving-in → focused → moving-out；移动中再点别的物件，从当前位置直接转向（CSS transition 会从当前值接着走），旧的那次结算用计数作废，不叠加动画。
- 镜头是整层房间的 translate + scale（1.3–2.8 倍），把物件中心推到内容面板旁边那块空地的正中，600–800ms 缓入缓出；停稳后再展开面板，焦点移到面板标题。
- 热点按房间图的实际显示区域用百分比定位（图片 object-fit: contain 时要扣掉留白）；每个热点是按钮，带可见小标签，读屏名称写“书架：关于我们”；聚焦期间房间层设 inert，Tab 只在面板和顶栏里走。
- 返回按钮、Esc、浏览器后退（每个入口对应一个 hash 或路由）都能拉回整间房，焦点回到当初点的热点或导航项。
- 素材：固定视角用一张高清房间插画或渲染图（宽 2400px 以上、导出 WebP），物件位置不再变；要绕着房间转、看遮挡关系时才上 3D 模型，并准备同一视角的静态图做回退；白天和夜晚两版要逐像素对齐，不用黑色遮罩假装夜晚。
- 窄于 640px 默认显示入口列表（房间图缩成封面）；减少动态效果时镜头直接切到目标、不推拉；图片或 3D 加载失败时退回普通导航页。

## 提示词

把{产品}首页做成「点物件进房间各处」：首屏是一张固定视角的{房间插画}，把{入口列表}分别对应到房间里的物件（如电脑 = 作品、书架 = 关于、留言板 = 联系）；每个物件上叠一个按百分比定位的热点按钮，带可见小标签，读屏名称写“物件：入口名”；点击或按 Enter 后，整层房间用 translate + scale（1.3–2.8 倍）把物件推到内容面板旁边那块空地的正中，700ms 缓入缓出，停稳后再展开面板并把焦点移到面板标题；移动中再选别的物件时从当前位置直接转向，不叠加动画；聚焦期间房间层设 inert；返回按钮、Esc 和浏览器后退（每个入口一个 hash）都能拉回整间房，焦点回到触发的热点；顶栏保留同样的直达按钮，当前项设 aria-current；窄于 640px 默认显示入口列表，减少动态效果时直接切换、不推拉镜头，图片加载失败时退回普通导航页；不要自动巡游或自动切换白天和夜晚。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:flex;flex-direction:column;background:#efe4d4;color:#2b2420}
.top{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;height:36px;padding:0 10px 0 14px;background:#fbf7f1;border-bottom:1px solid #e6dccd}
.logo{font-size:13px;font-weight:700;letter-spacing:.02em;white-space:nowrap}
nav{display:flex;gap:2px}
nav button{height:26px;padding:0 9px;border:0;border-radius:13px;background:none;color:#6b5f55;font-size:12px;white-space:nowrap}
nav button:hover{background:#f1e8dc;color:#2b2420}
nav button[aria-current=true]{background:#2b2420;color:#fff}
.stage{position:relative;flex:1;min-height:0;overflow:hidden;container-type:size}
.cam{position:absolute;inset:0;transform-origin:0 0;transition:transform .7s cubic-bezier(.65,0,.35,1);background:linear-gradient(180deg,#f4eadc,#ecdcc6 70%,transparent 70%),repeating-linear-gradient(90deg,#c4925f 0 46px,#b9875a 46px 48px)}
.room{position:absolute;top:0;left:50%;width:200cqh;height:100cqh;margin-left:-100cqh}
.room i{position:absolute;display:block}
.win{left:40%;top:10%;width:19%;height:36%;border:3px solid #fffaf2;border-radius:3px;background:linear-gradient(90deg,transparent 48%,#fffaf2 48% 52%,transparent 52%),linear-gradient(180deg,transparent 47%,#fffaf2 47% 53%,transparent 53%),radial-gradient(circle at 72% 68%,#fde68a 0 9%,transparent 10%),linear-gradient(180deg,#a9d4ef,#f6dcc0);box-shadow:0 3px 0 #e3d3bd}
.desk{left:6%;top:57%;width:32%;height:3.4%;border-radius:2px;background:#7a5235}
.leg{top:60%;width:1.4%;height:26%;background:#6a462d}
.mon{left:12%;top:28%;width:18%;height:25%;border:3px solid #23272e;border-radius:4px;background:linear-gradient(#fff,#fff) 12% 22%/34% 40% no-repeat,linear-gradient(#fde68a,#fde68a) 86% 22%/38% 40% no-repeat,linear-gradient(#ffffffaa,#ffffffaa) 50% 84%/76% 18% no-repeat,linear-gradient(135deg,#f9a8d4,#a5b4fc)}
.stand{left:20%;top:53%;width:2%;height:4%;background:#23272e}
.mug{left:32%;top:51.5%;width:2.6%;height:5.6%;border-radius:0 0 3px 3px;background:#e07a5f}
.shelf{left:63%;top:15%;width:17%;height:71%;border:3px solid #8b5e3c;border-radius:2px;background:linear-gradient(#8b5e3c,#8b5e3c) 0 33%/100% 3px no-repeat,linear-gradient(#8b5e3c,#8b5e3c) 0 66.5%/100% 3px no-repeat,repeating-linear-gradient(90deg,#e07a5f 0 9%,#3d405b 9% 15%,#81b29a 15% 24%,#f2cc8f 24% 30%,transparent 30% 36%) 50% 9%/88% 22% no-repeat,repeating-linear-gradient(90deg,#3d405b 0 7%,#f2cc8f 7% 16%,#e07a5f 16% 21%,transparent 21% 27%,#81b29a 27% 35%) 50% 51%/88% 22% no-repeat,repeating-linear-gradient(90deg,#81b29a 0 10%,#e07a5f 10% 15%,#3d405b 15% 24%,transparent 24% 31%) 50% 93%/88% 22% no-repeat,#c99a6b}
.board{left:83%;top:19%;width:11%;height:27%;border:3px solid #8b5e3c;border-radius:2px;background:linear-gradient(#fff7d6,#fff7d6) 18% 22%/42% 32% no-repeat,linear-gradient(#cfe4ff,#cfe4ff) 82% 74%/44% 34% no-repeat,linear-gradient(#ffd9d0,#ffd9d0) 20% 86%/30% 22% no-repeat,#cda577}
.pot{left:52.5%;top:73%;width:5%;height:13%;background:#c4673f;clip-path:polygon(0 0,100% 0,84% 100%,16% 100%)}
.leaf{left:50.5%;top:50%;width:9%;height:25%;background:radial-gradient(ellipse 30% 46% at 30% 56%,#4f8a5b 98%,transparent),radial-gradient(ellipse 30% 50% at 70% 50%,#5f9e6a 98%,transparent),radial-gradient(ellipse 26% 50% at 50% 40%,#3f7a4c 98%,transparent)}
.hs{position:absolute;padding:0;border:0;border-radius:6px;background:none;cursor:pointer}
.hs span{position:absolute;left:50%;top:0;display:flex;align-items:center;gap:4px;height:18px;padding:0 7px 0 4px;border-radius:9px;background:rgba(43,36,32,.86);color:#fff;font-size:11px;white-space:nowrap;transform:translate(-50%,-50%);transition:opacity .2s}
.hs span::before{content:"";width:8px;height:8px;border-radius:50%;background:#ff8a3d;box-shadow:0 0 0 0 rgba(255,138,61,.6);animation:ping 2s infinite}
@keyframes ping{70%{box-shadow:0 0 0 6px rgba(255,138,61,0)}
}
.cam[inert] .hs span{opacity:0}
.hs:hover,.hs:focus-visible{background:rgba(255,255,255,.18);outline:2px solid #e8590c;outline-offset:2px}
.panel{position:absolute;top:8px;right:8px;bottom:8px;width:56%;display:flex;flex-direction:column;gap:6px;padding:10px 12px;border-radius:12px;background:#fffdf9;box-shadow:0 10px 30px rgba(60,40,20,.22);overflow:auto;transition:none}
.panel h3{margin:0;font-size:14px;outline:none}
.panel p{margin:0;color:#6b5f55;font-size:12px;line-height:1.5}
.panel ul{display:grid;gap:2px;margin:0;padding:0;list-style:none}
.panel a{display:flex;justify-content:space-between;gap:8px;padding:2px 0;color:#2b2420;font-size:12px;text-decoration:none;border-bottom:1px solid #f0e8dd}
.panel a small{color:#8a7d72;white-space:nowrap}
.panel a:hover{color:#e8590c}
.panel .back{align-self:flex-start;margin-top:auto;height:28px;padding:0 10px;font-size:12px}
@media (prefers-reduced-motion:reduce){.cam{transition:none}
.hs span::before{animation:none}
}
@container (min-height:260px){.top{height:44px;padding:0 16px 0 20px}
.logo{font-size:15px}
nav button{height:30px;padding:0 12px;font-size:13px}
.panel{top:16px;right:16px;bottom:16px;width:40%;gap:10px;padding:16px 18px}
.panel h3{font-size:17px}
.panel p,.panel a{font-size:13px}
.panel a{padding:5px 0}
.hs span{height:22px;padding:0 9px 0 5px;border-radius:11px;font-size:12px}
}
</style>

<div class="st"><header class="top"><b class="logo">MyPrompts</b><nav aria-label="直达入口"><button type="button" data-k="work">作品</button><button type="button" data-k="about">关于</button><button type="button" data-k="contact">联系</button></nav></header><div class="stage"><div class="cam"><div class="room"><i class="win"></i><i class="leg" style="left:8%"></i><i class="leg" style="left:35%"></i><i class="desk"></i><i class="mon"></i><i class="stand"></i><i class="mug"></i><i class="leaf"></i><i class="pot"></i><i class="shelf"></i><i class="board"></i><button type="button" class="hs" data-k="work" style="left:11%;top:27%;width:20%;height:31%" aria-label="电脑：看作品"><span aria-hidden="true">作品</span></button><button type="button" class="hs" data-k="about" style="left:62%;top:14%;width:19%;height:73%" aria-label="书架：关于我们"><span aria-hidden="true">关于</span></button><button type="button" class="hs" data-k="contact" style="left:82%;top:18%;width:13%;height:30%" aria-label="留言板：联系我们"><span aria-hidden="true">联系</span></button></div></div><section class="panel" hidden aria-labelledby="ph"><h3 id="ph" tabindex="-1"></h3><div class="body"></div><button type="button" class="ctl back">‹ 返回房间</button></section></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const C = {
    work: ['作品 · 3 个案例', '<ul><li><a href="#">松间民宿视觉系统<small>品牌</small></a></li><li><a href="#">早八咖啡点单小程序<small>产品</small></a></li><li><a href="#">城南书展主视觉<small>活动</small></a></li></ul>'],
    about: ['关于我们', '<p>4 个人的小团队，做品牌和数字产品，2019 年开始在杭州工作。</p>'],
    contact: ['联系', '<p><a href="#">hi@nanchuang.example<small>写邮件</small></a></p><p>每周二、四下午可约 30 分钟通话。</p>'],
  };
  const st = root.querySelector('.st'), stage = root.querySelector('.stage'), cam = root.querySelector('.cam'), panel = root.querySelector('.panel'), ph = root.querySelector('#ph'), body = panel.querySelector('.body'), msg = root.querySelector('[role=status]');
  const navs = [...root.querySelectorAll('nav button')], spots = [...root.querySelectorAll('.hs')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, MOVE = 700;
  let state = 'home', key = '', from = null, token = 0;
  // 镜头 = 整个房间层的 translate + scale：把物件中心移到面板左边那块空地的正中，放大到占画面约六成
  const aim = (k) => {
    const el = root.querySelector(`.hs[data-k=${k}]`), room = el.parentNode, W = stage.clientWidth, H = stage.clientHeight;
    const pw = panel.offsetWidth || W * 0.5, fx = (W - pw - 8) / 2, fy = H / 2;
    const ow = el.offsetWidth, oh = el.offsetHeight, cx = room.offsetLeft + el.offsetLeft + ow / 2, cy = el.offsetTop + oh / 2;
    const s = Math.max(1.3, Math.min(2.8, 0.7 * (fx * 2) / ow, 0.62 * H / oh));
    return `translate(${fx - cx * s}px,${fy - cy * s}px) scale(${s})`;
  };
  const mark = (k) => navs.forEach((b) => b.setAttribute('aria-current', String(b.dataset.k === k)));
  const go = (k, by) => {
    if (state === 'focused' && key === k) return;
    const id = ++token; key = k; state = 'moving-in'; if (by) from = by;
    panel.hidden = false; panel.style.visibility = 'hidden'; cam.style.transform = aim(k); panel.hidden = true; panel.style.visibility = ''; // 先量面板宽度，再藏起来等镜头停稳
    cam.inert = true; mark(k); msg.textContent = `正在走向${C[k][0].split(' ')[0]}`;
    // 移动中再选别的物件：CSS 过渡会从当前位置直接转向新目标，旧的这次结算被 token 作废
    setTimeout(() => {
      if (id !== token) return; state = 'focused';
      ph.textContent = C[k][0]; body.innerHTML = C[k][1]; panel.hidden = false; msg.textContent = `已打开：${C[k][0]}`;
      if (by) ph.focus({ preventScroll: true });
    }, reduce ? 0 : MOVE);
  };
  const back = (user) => {
    if (state === 'home' || state === 'moving-out') return;
    const id = ++token; state = 'moving-out'; panel.hidden = true; cam.inert = false; cam.style.transform = ''; mark(''); msg.textContent = '回到房间';
    if (user && from) from.focus({ preventScroll: true });
    setTimeout(() => { if (id === token) state = 'home'; }, reduce ? 0 : MOVE);
  };
  [...navs, ...spots].forEach((b) => b.addEventListener('click', () => go(b.dataset.k, b)));
  root.querySelector('.back').addEventListener('click', () => back(true));
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) { e.preventDefault(); msg.textContent = `打开：${e.target.closest('a').firstChild.textContent}`; } });
  st.addEventListener('keydown', (e) => { if (e.key === 'Escape') back(true); });
  new ResizeObserver(() => { if (state === 'focused' || state === 'moving-in') { cam.style.transition = 'none'; cam.style.transform = aim(key); void cam.offsetWidth; cam.style.transition = ''; } }).observe(stage);
  setTimeout(() => root.host.isConnected && go('work', null), 600);
}
</script>
