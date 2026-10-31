---
zh: 儿童教育
en: Kids education
aka: 儿童 少儿 启蒙 早教 学习App 家长入口 kids
order: 30
---

## 是什么

明亮的色块、圆滚滚的大按钮和一个陪伴角色，每个按钮都大到孩子一拍就中，图标和语音比文字多；购买、设置这些给大人用的东西，收进一个要验证才能进的家长入口。

## 适合

儿童学习 App，识字、数学和英语启蒙，绘本阅读，少儿编程，早教机构的儿童端页面。

## 不适合

家长端和机构管理后台按成人产品做，用「企业稳重」或「温暖生活方式」；10 岁以上的孩子会嫌幼稚，配色和字号要收敛；面向成人粉丝的萌系周边，用「糖果萌系」。

## 注意

孩子不识字、手指不准、还会乱点：每个能点的地方都配图标和语音，误触了也不会花钱、不会跳出应用。家长入口不能只是一个小按钮，要加一道孩子过不去的验证。

## 要点

- 触控：学龄前按钮 ≥ 72px，学龄段 ≥ 56px，相邻间距 ≥ 16px；只用单击，不依赖双击、长按、精细拖拽和多指手势（家长验证除外）
- 家长入口：购买、设置、外链、分享、广告位都放进家长区；入口放在角落、做小、用中性色，进入前做孩子难以完成的验证，比如长按 3 秒再答一道两位数加法；儿童端不出现支付按钮和外部链接
- 配色：浅天蓝底 #e6f5ff，深海军蓝文字 #1f2a44（12.8:1）；每个科目一种功能色：橙黄 #ffc93c、珊瑚 #ff8a7a、天蓝 #5cc8ff、草绿 #7ed957；色块上一律放深海军蓝字（对比度都 ≥ 6:1），不放白字
- 形状与立体感：圆角 20–28px；按钮底部加 6px 深一号的实色边，做出“能按下去”的样子，按下时 translateY(4px)、底边收到 2px；不用细线框和小图标按钮
- 文字与语音：学龄前以图标加语音为主，按钮被点到时先播读名称；文字 ≥ 20px，识字内容用 ruby 标拼音；标题用圆体，开源可选 Nunito 配中文圆体，后备 "Yuanti SC"、YouYuan、sans-serif
- 反馈：完成或答对给星星加音效，配 600ms 弹性缩放；答错只做 300ms 轻摇和温和的语音提示，不出现红叉和扣分；进度用星星和路线地图表示
- 护眼与时长：连续使用 20 分钟弹出休息提醒，时长上限由家长在家长区设置；不做无尽滑动的信息流
- 动效：弹性缓动 cubic-bezier(.34,1.56,.64,1)，300–500ms；循环的角色待机动画一屏最多 1 个；减少动态效果时改为淡入，角色静止

## 提示词

把{产品}的{页面}做成儿童教育基调：浅天蓝底 #e6f5ff，深海军蓝文字 #1f2a44，每个科目一种功能色（橙黄 #ffc93c、珊瑚 #ff8a7a、天蓝 #5cc8ff、草绿 #7ed957），色块上只放深海军蓝字；按钮至少 72px（学龄段 56px）、间距 16px 以上，圆角 24px，底部 6px 深一号实色边，按下时下沉 4px；只用单击操作，每个按钮配图标，点击时先播读名称，文字 ≥ 20px，识字内容用 ruby 标拼音，标题用圆体（后备 Yuanti SC、YouYuan）；购买、设置、外链、分享全部收进角落的小号家长入口，进入前要长按 3 秒并答一道两位数加法，儿童端不出现支付和外链；答对给星星和 600ms 弹性缩放，答错只轻摇 300ms、不出现红叉；连续使用 20 分钟提醒休息，时长上限由家长设置；动效用 cubic-bezier(.34,1.56,.64,1)，减少动态效果时改为淡入。

## 示例

<style>
:host{container-type:size}
.s{--ink:#1f2a44;--round:Nunito,"Yuanti SC",YouYuan,"Arial Rounded MT Bold","PingFang SC",sans-serif;position:relative;height:100%;display:flex;flex-direction:column;gap:10px;padding:12px 14px 14px;overflow:hidden;background:#e6f5ff;color:var(--ink);font:12px/1.4 var(--round)}
.cl{position:absolute;width:70px;height:22px;border-radius:999px;background:#fff;opacity:.85}
.cl::before{content:"";position:absolute;left:14px;top:-12px;width:32px;height:32px;border-radius:50%;background:inherit}
.cl:nth-of-type(1){left:44%;top:10px}
.cl:nth-of-type(2){right:-20px;top:48%;transform:scale(.7)}
.top{position:relative;display:flex;align-items:center;gap:8px}
.ow{flex:none;width:40px;animation:bob 2.4s ease-in-out infinite alternate}
.bb{position:relative;padding:4px 10px;border-radius:14px;background:#fff;font-size:15px;font-weight:800;white-space:nowrap}
.bb::before{content:"";position:absolute;left:-5px;top:50%;width:10px;height:10px;background:#fff;transform:translateY(-50%) rotate(45deg)}
.sp{margin-left:auto;display:flex;align-items:center;gap:8px}
.star{display:inline-flex;align-items:center;gap:3px;height:26px;padding:0 10px;border-radius:999px;background:#fff;font-size:14px;font-weight:800}
.star svg{width:14px;fill:#ffb400}
.pa{display:inline-flex;align-items:center;gap:3px;height:26px;padding:0 8px;border:1px solid #b8c6d8;border-radius:8px;background:#fff;color:#4a5878;font:600 11px/1 system-ui,"PingFang SC",sans-serif;cursor:pointer}
.pa svg{width:11px;fill:none;stroke:currentColor;stroke-width:2}
.pa:hover{border-color:#4a5878}
.pa:focus-visible,.sub:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.subs{position:relative;flex:1;min-height:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.sub{--c:#ffc93c;--e:#e0a20f;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:72px;border:0;border-bottom:6px solid var(--e);border-radius:24px;background:var(--c);color:var(--ink);font:800 clamp(16px,10cqh,26px)/1.1 var(--round);cursor:pointer;transition:transform .12s,border-bottom-width .12s}
.sub:nth-child(2){--c:#5cc8ff;--e:#2f9bd6}
.sub:nth-child(3){--c:#7ed957;--e:#53b02f}
.sub svg{width:clamp(28px,20cqh,56px);height:auto}
.sub:hover{filter:brightness(1.04)}
.sub:active{transform:translateY(4px);border-bottom-width:2px}
.sub.hop svg{animation:hop .5s cubic-bezier(.34,1.56,.64,1)}
.wk{display:none}
.msg{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%)}
@keyframes bob{to{transform:translateY(-4px)}}
@keyframes hop{40%{transform:scale(1.25) rotate(-6deg)}}
@container (max-width:300px){.s{padding-inline:12px}
.subs{gap:10px}
.bb{font-size:13px}
.star{padding:0 8px}
}
@container (min-height:260px){.s{padding:18px 24px 20px;gap:16px}
.ow{width:56px}
.bb{font-size:20px;padding:6px 14px}
.star{height:32px;font-size:16px}
.pa{height:30px;font-size:12px}
.subs{gap:18px}
.wk{position:relative;display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700}
.wk i{flex:1;height:10px;border-radius:999px;background:#fff}
.wk i b{display:block;width:71%;height:100%;border-radius:inherit;background:#ffc93c}
}
@media (prefers-reduced-motion:reduce){.ow,.sub.hop svg{animation:none}
.sub{transition:none}
}
</style>

<div class="s">
  <i class="cl" aria-hidden="true"></i><i class="cl" aria-hidden="true"></i>
  <div class="top">
    <svg class="ow" viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="27" rx="19" ry="18" fill="#ffb24c"/><path d="M8 14l6 6M40 14l-6 6" stroke="#e08a1e" stroke-width="4" stroke-linecap="round"/><ellipse cx="24" cy="33" rx="11" ry="10" fill="#ffe3b0"/><circle cx="17" cy="22" r="6.5" fill="#fff"/><circle cx="31" cy="22" r="6.5" fill="#fff"/><circle cx="18" cy="23" r="3" fill="#1f2a44"/><circle cx="30" cy="23" r="3" fill="#1f2a44"/><path d="M21 28h6l-3 4z" fill="#ff8a7a"/></svg>
    <span class="bb">今天学什么？</span>
    <div class="sp">
      <span class="star" aria-label="12 颗星"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6.6 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21.2l1.5-7L2 9.4l7-.8z"/></svg>12</span>
      <button type="button" class="pa" aria-label="家长中心，需要长按验证"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg>家长</button>
    </div>
  </div>
  <div class="subs">
    <button type="button" class="sub"><svg viewBox="0 0 48 40" aria-hidden="true"><path d="M24 8C18 4 10 4 4 7v27c6-3 14-3 20 1 6-4 14-4 20-1V7c-6-3-14-3-20 1z" fill="#fff" stroke="#1f2a44" stroke-width="3" stroke-linejoin="round"/><path d="M24 8v27" stroke="#1f2a44" stroke-width="3"/></svg>识字</button>
    <button type="button" class="sub"><svg viewBox="0 0 48 40" aria-hidden="true"><rect x="3" y="20" width="14" height="14" rx="4" fill="#fff" stroke="#1f2a44" stroke-width="3"/><rect x="17" y="6" width="14" height="28" rx="4" fill="#ffc93c" stroke="#1f2a44" stroke-width="3"/><rect x="31" y="14" width="14" height="20" rx="4" fill="#fff" stroke="#1f2a44" stroke-width="3"/></svg>数学</button>
    <button type="button" class="sub"><svg viewBox="0 0 48 40" aria-hidden="true"><path d="M6 4h36a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H20l-9 7v-7H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z" fill="#fff" stroke="#1f2a44" stroke-width="3" stroke-linejoin="round"/><path d="M15 23l5-13 5 13M17 19h6M30 10v13h5a3.5 3.5 0 0 0 0-7h-5" fill="none" stroke="#1f2a44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>英语</button>
  </div>
  <div class="wk" aria-label="本周已学 5 天，共 7 天">本周 5 / 7 天<i><b></b></i></div>
  <p class="msg" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const msg = root.querySelector('.msg');
  root.querySelectorAll('.sub').forEach((b) => b.addEventListener('click', () => {
    b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop');
    msg.textContent = '正在播读：' + b.textContent.trim(); // 真实产品在这里播放语音
  }));
  root.querySelector('.pa').addEventListener('click', () => { msg.textContent = '家长中心：长按 3 秒，再答一道加法题'; });
}
</script>
