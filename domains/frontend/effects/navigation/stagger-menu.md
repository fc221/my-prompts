---
zh: 层层滑入的全屏菜单
en: Layered fullscreen menu
order: 80
---

## 是什么

点“菜单”后，两层不同颜色的色块从屏幕一侧接连滑进来，最后一层菜单面板盖满页面，几个大字导航再一行行从下方升起；关闭时按相反的顺序退回去。

## 适合

视觉表达强的作品集、品牌官网、活动站，导航项不多（4–6 个），希望菜单本身也有气场。

## 不适合

需要频繁切换页面的工具类产品（每次打开都要等一段动画）；入口多或有层级时改用侧栏或「菜单展开成卡片」。

## 注意

这是一个模态层：打开后背后的页面不能被 Tab 到、不能滚动，关闭按钮一直在原位可点；动画放到一半再点关闭，要能立刻从当前位置反向，不能等它播完。

## 要点

- 两层装饰色块加一层面板，从右侧 translateX(100%) 滑入，各层错开 60ms，单层约 500ms，缓出曲线
- 导航大字每行套一个 overflow: hidden 的裁切框，文字从 translateY(100%) 升起；面板快到位时开始，行间错开 50ms
- 关闭：文字 150ms 先淡出，面板和色块按相反顺序退回，总时长比打开短（约 400ms）
- “菜单 / 关闭”是同一个按钮，固定在原位、层级最高，文案和 aria-expanded 一起变；打开时背后页面加 inert 并锁住滚动，Tab 只在按钮和菜单链接之间循环
- Esc 关闭，焦点留在按钮上；点菜单里的链接跳转后，要把遮罩、inert 和滚动锁都清掉
- 全部用 CSS transition，打开一半时点关闭会从当前位置反向
- 减少动态效果时不滑动，面板 150ms 淡入，文字直接显示

## 提示词

给{作品集网站}做「层层滑入的全屏菜单」：右上角“菜单”按钮点开后，两层不同颜色的色块和一层菜单面板依次从右侧滑入盖满屏幕（各层错开 60ms，单层约 500ms，缓出），面板里{导航项数}个大字导航每行放在裁切框里，从下方逐行升起、错开 50ms；关闭时文字先淡出，面板和色块按相反顺序退回，总时长约 400ms；菜单按钮固定在原位、层级最高，打开后文案变成“关闭”并更新 aria-expanded；打开时背后页面加 inert、锁住滚动，Tab 只在按钮和菜单链接之间循环，Esc 关闭；全部用 CSS transition，动画中途可直接反向；点链接跳转后清掉遮罩和滚动锁；减少动态效果时面板只做淡入。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;background:#efede6;color:#14201a;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid #2f6b4f;outline-offset:2px}
.pg{position:absolute;inset:0;display:flex;flex-direction:column;padding:14px 16px 16px}
.logo{align-self:flex-start;font-size:13px;font-weight:800;letter-spacing:.16em}
.img{position:absolute;right:16px;top:50px;bottom:16px;width:36%;border-radius:4px;background:repeating-linear-gradient(90deg,transparent 0 14px,rgba(20,32,26,.18) 14px 16px),repeating-linear-gradient(180deg,#d6d1c4 0 18px,#c4beaf 18px 20px);box-shadow:inset 0 -40px 0 #9ea893}
.pg h3{position:relative;max-width:58%;margin:auto 0 0;font-size:22px;line-height:1.25;text-wrap:balance}
.pg p{position:relative;margin:6px 0 0;color:#56605a;font-size:12px}
.tg{position:absolute;z-index:5;top:10px;right:12px;display:flex;align-items:center;gap:8px;height:32px;padding:0 12px 0 14px;border:1px solid rgba(20,32,26,.22);border-radius:999px;background:rgba(239,237,230,.85);color:#14201a;font:inherit;font-weight:600;cursor:pointer;transition:color .3s,background-color .3s,border-color .3s}
.tg:hover{background:#fff}
.open .tg{color:#efede6;background:rgba(15,26,20,.5);border-color:rgba(239,237,230,.35)}
.open .tg:focus-visible{outline-color:#c8f169}
.ic{position:relative;width:14px;height:8px}
.ic::before,.ic::after{content:"";position:absolute;left:0;right:0;height:2px;border-radius:1px;background:currentColor;transition:transform .3s cubic-bezier(.2,0,0,1)}
.ic::before{top:0}
.ic::after{bottom:0}
.open .ic::before{transform:translateY(3px) rotate(45deg)}
.open .ic::after{transform:translateY(-3px) rotate(-45deg)}
.ly,.pn{position:absolute;inset:0;transform:translateX(101%);transition:transform .36s cubic-bezier(.7,0,.84,0) var(--dc)}
.open .ly,.open .pn{transform:none;transition:transform .5s cubic-bezier(.16,1,.3,1) var(--do)}
.l1{z-index:2;background:#c8f169;--do:0s;--dc:.12s}
.l2{z-index:3;background:#2f6b4f;--do:.06s;--dc:.06s}
.pn{z-index:4;display:flex;flex-direction:column;padding:50px 18px 14px;background:#0f1a14;color:#efede6;--do:.12s;--dc:0s;visibility:hidden;transition:transform .36s cubic-bezier(.7,0,.84,0),visibility 0s .4s}
.open .pn{visibility:visible;transition:transform .5s cubic-bezier(.16,1,.3,1) .12s,visibility 0s}
.pn ol{display:flex;flex-direction:column;gap:2px;margin:0;padding:0;list-style:none}
.pn li{overflow:hidden;margin:0 -4px;padding:2px 4px}
.pn a{display:flex;align-items:baseline;gap:10px;width:max-content;font-size:20px;font-weight:700;line-height:1.2;opacity:0;transform:translateY(110%);transition:transform .2s cubic-bezier(.4,0,1,1),opacity .15s}
.open .pn a{opacity:1;transform:none;transition:transform .55s cubic-bezier(.16,1,.3,1) calc(.3s + var(--i) * .05s),opacity .2s calc(.3s + var(--i) * .05s)}
.pn a:hover span{color:#c8f169}
.pn a:focus-visible{outline:2px solid #c8f169;outline-offset:0;border-radius:2px}
.pn small{min-width:1.6em;color:#c8f169;font-size:11px;font-weight:600;font-variant-numeric:tabular-nums}
.ft{position:absolute;right:18px;bottom:12px;margin:0;color:#93a59a;font-size:11px}
.ft span+span{display:none}
@container (max-width:310px){.pg h3{font-size:20px}
}
@container (min-height:280px){.pg{padding:18px 24px 24px}
.img{right:24px;top:60px;bottom:24px}
.pg h3{font-size:34px}
.pg p{font-size:13px}
.tg{top:14px;right:20px}
.pn{padding:68px 36px 22px}
.pn ol{gap:4px}
.pn a{font-size:36px;gap:14px}
.pn small{font-size:13px}
.ft{position:static;display:flex;justify-content:space-between;margin-top:auto;font-size:12px}
.ft span+span{display:inline}
}
@media (prefers-reduced-motion:reduce){.tg,.ic::before,.ic::after{transition:none}
.ly,.open .ly{display:none}
.pn,.open .pn{transform:none;opacity:0;transition:opacity .15s,visibility 0s .15s}
.open .pn{opacity:1;transition:opacity .15s,visibility 0s}
.pn a,.open .pn a{opacity:1;transform:none;transition:none}
}
</style>

<div class="st"><div class="pg"><b class="logo">MyPrompts</b><i class="img" aria-hidden="true"></i><h3>让房子<br>慢慢变老</h3><p>住宅 · 社区 · 旧建筑改造</p></div><button type="button" class="tg" aria-expanded="false" aria-controls="sm-panel"><span class="lb">菜单</span><i class="ic" aria-hidden="true"></i></button><i class="ly l1" aria-hidden="true"></i><i class="ly l2" aria-hidden="true"></i><nav class="pn" id="sm-panel" aria-label="主菜单"><ol><li><a href="#" style="--i:0"><small>01</small><span>项目</span></a></li><li><a href="#" style="--i:1"><small>02</small><span>事务所</span></a></li><li><a href="#" style="--i:2"><small>03</small><span>观点</span></a></li><li><a href="#" style="--i:3"><small>04</small><span>联系</span></a></li></ol><p class="ft"><span>上海 · 杭州</span><span>正在招聘 3 个职位</span></p></nav><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), tg = root.querySelector('.tg'), lb = tg.querySelector('.lb'), pg = root.querySelector('.pg'), pn = root.querySelector('.pn'), links = [...pn.querySelectorAll('a')], msg = root.querySelector('[role=status]');
  let open = false;
  // 模态：打开时背后页面 inert（真实页面还要锁住 body 滚动），关闭后全部还原
  const set = (v) => {
    open = v; st.classList.toggle('open', v); tg.setAttribute('aria-expanded', String(v)); lb.textContent = v ? '关闭' : '菜单'; pn.inert = !v; pg.inert = v;
    msg.textContent = v ? '菜单已打开' : '菜单已关闭';
  };
  tg.addEventListener('click', () => set(!open));
  root.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') { set(false); tg.focus(); return; }
    if (e.key !== 'Tab') return;
    const f = [tg, ...links], i = f.indexOf(root.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  });
  links.forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); set(false); tg.focus(); msg.textContent = '已前往：' + a.querySelector('span').textContent; }));
  pn.inert = true;
  setTimeout(() => { if (root.host.isConnected && !open) set(true); }, 500);
}
</script>
