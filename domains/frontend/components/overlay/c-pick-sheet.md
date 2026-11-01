---
zh: 底部面板的六种用途
en: Bottom sheet use cases
aka: 半屏弹窗 动作面板 分享面板 规格选择 筛选面板 评论面板 可拖面板
of: c-bottom-sheet
tab: 六种用途
order: 41
---

## 是什么

同样从屏幕底部升起，按用途分六种：动作列表、分享、规格选择、筛选、评论、可拖高度。用途一变，内容、高度、能不能拖、怎么确认和关闭都跟着变。示例里每种都能操作到底。

## 适合

手机页面要弹一层次级内容时，先定它属于哪一种，再谈样式。

## 不适合

面板本身的把手、高度档、防滚动穿透看「底部面板」；字段多、要长时间填写的改用独立页面；筛选页的完整做法看「底部面板承载筛选」；地图联动的细节看「不挡地图的底部面板」。

## 注意

最常见的错是一个模板套到底：动作列表多出“确定”按钮，筛选点一项就关，评论盖上遮罩挡住视频。先回答两个问题：选完要不要确认；背后内容要不要继续看。

## 要点

- 六种都用组件库的底部抽屉做底：Element Plus el-drawer direction="btt"（size、modal、footer 插槽），Naive UI n-drawer placement="bottom"（height、show-mask、resizable）加 n-drawer-content（footer 插槽），Ant Design Vue a-drawer placement="bottom"（height、mask、footer 插槽）；用途只决定高度、要不要遮罩、footer 放什么、点一项之后关不关，基础配置见「底部面板」
- 动作列表：2 至 6 个动作，一列按钮。高度按行数算（48px × 条数 + 取消 + 安全区），不能拖；点一项立刻执行并把 v-model 置 false；危险动作用危险色文字，底部单独放“取消”，点遮罩等于取消（mask-closable / maskClosable 保持默认开）
- 分享：一排 4 至 5 个渠道，再多就横滑。高度按内容，不能拖；点渠道就关闭并用「轻提示 Toast」说结果
- 规格选择：颜色、尺码这类决定下单内容的选项。高度按内容，无货项置灰；价格和主按钮放 footer 插槽常驻，点主按钮才生效；关闭时选择作废，开 destroy-on-close（Naive UI 默认 display-directive="if"），下次打开回到初始规格
- 筛选：多个条件组合。高度 60%，内容长时内部滚动；footer 固定“重置”和“查看 N 家”，数字随选择实时变；“重置”只清空面板，点“查看”才应用到列表，关闭时丢弃这次改动；完整做法见「底部面板承载筛选」
- 评论：边看边聊。高度 60% 至 70%，去掉遮罩（Element Plus modal=false 加 modal-penetrable，Naive UI show-mask=false，Ant Design Vue mask=false），背后视频继续播、还能点；输入框放 footer 插槽，随软键盘上移；右上角关闭，发送后面板留着
- 可拖高度：参考背景找东西，如地图找店。无遮罩；Naive UI 和 Element Plus 开 resizable 能拖边缘改高度，Ant Design Vue 没有现成的；贴底 / 半屏 / 接近全屏的吸附档位三家都没有，要吸附自己写，并让把手能点按切档、方向键调档，见「不挡地图的底部面板」
- 不能拖的面板不画把手；Esc、焦点进面板和关闭后回到触发按钮由组件负责
- 跟 AI 说清楚五件事：用途；里面放什么；高度（按内容算的值还是几档）；能不能拖；怎么确认和关闭（点一项就收、点按钮才生效、点遮罩算取消还是保留）

## 提示词

在{产品}的{页面}用底部面板承载{内容}，用户在这里要{完成什么}。底板用项目组件库自带的抽屉改成底部（Element Plus el-drawer direction="btt"；Naive UI n-drawer placement="bottom" + n-drawer-content；Ant Design Vue a-drawer placement="bottom"），不手写面板和遮罩。先判断属于哪一种，说明理由后只实现这一种：执行一个动作，用动作列表（高度按行数算，不能拖，点一项就执行并关闭，底部单独放取消）；发给别人，用分享面板（一排渠道，点完关闭并提示）；决定下单内容，用规格选择（footer 插槽常驻价格和主按钮，点主按钮才生效，关闭作废）；组合多个条件，用筛选面板（高度 60%，footer 固定重置和“查看 N 个结果”，数字实时变，点查看才应用）；背后内容要继续看，用评论式面板（高度 65%，去掉遮罩：modal=false + modal-penetrable / show-mask=false / mask=false，输入框放 footer 随键盘上移）；要边看背景边翻列表，用可拖面板（无遮罩，Naive UI / Element Plus 开 resizable，{三档高度}吸附自己写）。高度都要显式写，三家都不会随内容自适应；点遮罩时{取消 / 保留本次选择}；可拖时才在 header 插槽画把手；Esc、焦点进出由组件负责。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
.x-sc{position:relative;align-self:stretch;width:100%;max-width:320px;overflow:hidden;border-radius:12px;background:#fff;box-shadow:0 0 0 1px #e3e6eb;font-size:12px;line-height:16px}
.x-sc button{border:0;background:none;color:inherit;font:inherit;cursor:pointer}
.x-sc button:focus-visible,.x-sc input:focus-visible{outline:2px solid #3b5bdb;outline-offset:-2px}
.x-pg{position:absolute;inset:0;display:flex;flex-direction:column;gap:5px;padding:8px 12px}
.x-pg b{font-size:13px}
.x-pg i{display:block;height:7px;border-radius:4px;background:#eceef2}
.x-pg i:nth-of-type(2){width:72%}
.x-msg{margin:auto 0 0;color:#3b5bdb;font-weight:600}
.x-msg:empty{display:none}
.x-sc .x-re{align-self:flex-start;height:28px;padding:0 12px;border-radius:14px;background:#1f2329;color:#fff;font-weight:600}
.x-scrim{position:absolute;inset:0;background:rgba(15,23,42,.42);transition:opacity .2s}
.x-sh{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;border-radius:12px 12px 0 0;background:#fff;box-shadow:0 -6px 16px -8px rgba(15,23,42,.35);transition:transform .26s cubic-bezier(.2,.8,.2,1),visibility 0s}
.x-sh:focus{outline:none}
.x-off .x-sh{transform:translateY(102%);visibility:hidden;transition:transform .16s ease-in,visibility 0s .16s}
.x-off .x-scrim{opacity:0;pointer-events:none}
.x-act{padding:4px 8px}
.x-sc .x-act button{display:block;width:100%;height:26px;border-radius:6px;text-align:center}
.x-sc .x-act button:hover{background:#f2f4f7}
.x-sc .x-act .x-del{color:#c92a2a}
.x-sc .x-act .x-cc{margin-top:4px;border-top:1px solid #eef0f3;border-radius:0;color:#5b616e}
.x-share{display:flex;justify-content:space-between;padding:8px 8px 6px}
.x-sc .x-share button{width:48px;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:11px;line-height:14px;color:#454b57}
.x-share span{width:34px;height:34px;display:grid;place-items:center;border-radius:50%;background:#eef1f7;color:#3b5bdb}
.x-share svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.x-form{display:flex;flex-direction:column;gap:3px;padding:5px 10px 6px}
.x-opt{display:flex;align-items:center;gap:4px;min-height:24px}
.x-opt>span{flex:none;width:30px;color:#5b616e}
.x-sc .x-opt button{height:24px;padding:0 9px;border-radius:12px;box-shadow:inset 0 0 0 1px #d5d9e0;white-space:nowrap}
.x-sc .x-opt [aria-pressed=true]{background:#e3e9fd;color:#2f49b8;font-weight:600;box-shadow:inset 0 0 0 1px #3b5bdb}
.x-sc .x-opt button:disabled{color:#8a909c;box-shadow:none;text-decoration:line-through;cursor:not-allowed}
.x-foot{display:flex;align-items:center;gap:8px;white-space:nowrap}
.x-foot strong{flex:1;font-size:14px;font-variant-numeric:tabular-nums}
.x-sc .x-foot .x-ok{height:26px;padding:0 12px;border-radius:14px;background:#3b5bdb;color:#fff;font-weight:600}
.x-sc .x-foot .x-rs{height:26px;padding:0 10px;color:#5b616e}
.x-sc .x-foot .x-ok.x-grow{flex:1}
.x-sc .x-x{position:absolute;right:4px;top:4px;width:24px;height:24px;border-radius:12px;color:#5b616e;font-size:15px;line-height:1}
.x-vid .x-pg{padding:0;background:linear-gradient(150deg,#27304f,#6d4aa6 55%,#e08a5f);color:#fff}
.x-vid .x-pg b{padding:8px 12px 0;font-size:12px}
.x-vid .x-msg{color:#fff;padding:0 12px}
.x-sc.x-vid .x-re{margin:0 0 8px 12px;background:#fff;color:#1f2329}
.x-prog{position:absolute;left:0;right:0;top:0;height:3px;background:rgba(255,255,255,.28);overflow:hidden}
.x-prog::after{content:"";display:block;height:100%;background:#fff;transform-origin:0 50%;animation:x-pl 14s linear infinite}
@keyframes x-pl{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.x-vid .x-sh{height:72%}
.x-ch{flex:none;padding:4px 10px 0;font-weight:600}
.x-cm{flex:1;min-height:0;overflow-y:auto;padding:0 10px;overscroll-behavior:contain;scrollbar-width:none}
.x-cm p{margin:0 0 2px;color:#454b57;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.x-cm em{font-style:normal;color:#5b616e}
.x-in{flex:none;display:flex;gap:4px;padding:2px 8px 4px}
.x-in input{flex:1;min-width:0;height:26px;padding:0 10px;border:0;border-radius:13px;background:#f2f4f7;color:inherit;font:inherit}
.x-sc .x-in button{flex:none;height:26px;padding:0 10px;border-radius:13px;background:#3b5bdb;color:#fff;font-weight:600}
.x-map{position:absolute;inset:0;background:linear-gradient(90deg,transparent 32%,#fff 32% 35%,transparent 35% 70%,#fff 70% 72%,transparent 72%),linear-gradient(0deg,transparent 48%,#fff 48% 52%,transparent 52%),linear-gradient(135deg,#dcefd9,#d4e6f7)}
.x-map i{position:absolute;left:58%;top:22%;width:12px;height:12px;border:3px solid #fff;border-radius:50%;background:#c92a2a;box-shadow:0 1px 3px rgba(15,23,42,.4)}
.x-drag .x-sh{top:6%;bottom:auto;height:94%;transform:translateY(var(--y,36%))}
.x-sc .x-hd{flex:none;width:100%;height:24px;display:grid;place-items:center;border-radius:12px 12px 0 0;cursor:grab;touch-action:none}
.x-hd::after{content:"";width:36px;height:4px;border-radius:2px;background:#c5cad3}
.x-ttl{margin:0;padding:0 12px 4px;font-weight:600}
.x-st{flex:1;min-height:0;overflow-y:auto;margin:0;padding:0 12px;list-style:none;overscroll-behavior:contain;scrollbar-width:none}
.x-st li{display:flex;justify-content:space-between;gap:8px;padding:4px 0;border-top:1px solid #eef0f3;white-space:nowrap}
.x-st span{color:#5b616e}
.x-no-tr{transition:none!important}
@container (min-height:260px){
.x-sc{font-size:13px;line-height:18px}
.x-sc .x-act button{height:38px}
.x-share{padding:14px 10px 12px}
.x-form{gap:8px;padding:12px}
.x-sc .x-foot .x-ok,.x-sc .x-foot .x-rs{height:32px}
.x-in{padding:4px 8px 8px}
.x-vid .x-sh{height:62%}
.x-cm p{margin-bottom:6px}
}
@media (prefers-reduced-motion:reduce){
.x-sh,.x-scrim,.x-off .x-sh{transition:none}
.x-prog::after{animation:none;transform:scaleX(.4)}
}
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const screen = (cls, label, page, body) =>
  `<div class="x-sc ${cls}"><div class="x-pg">${page}<p class="x-msg" role="status"></p><button type="button" class="x-re" hidden>打开面板</button></div>${cls.includes('x-free') ? '' : '<div class="x-scrim"></div>'}<section class="x-sh" role="dialog" aria-label="${label}" tabindex="-1">${body}</section></div>`;
const LINES = '<i></i><i></i>';
const wire = (el) => {
  const box = el.querySelector('.x-sc'), sh = box.querySelector('.x-sh'), re = box.querySelector('.x-re'), msg = box.querySelector('.x-msg');
  const close = (text = '已关闭，什么都没改') => {
    box.classList.add('x-off');
    msg.textContent = text;
    re.hidden = false;
    re.focus();
  };
  re.addEventListener('click', () => {
    box.classList.remove('x-off');
    msg.textContent = '';
    re.hidden = true;
    sh.focus();
  });
  box.querySelector('.x-scrim')?.addEventListener('click', () => close());
  box.querySelector('.x-x')?.addEventListener('click', () => close());
  box.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  return close;
};
const single = (el, group, onPick) => {
  const btns = [...el.querySelectorAll(`${group} button`)];
  btns.forEach((b) => b.addEventListener('click', () => {
    btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    onPick?.();
  }));
};
const ICON = {
  链接: '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
  海报: '<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m5 18 5-5 3 3 2-2 4 4"/>',
  短信: '<path d="M4 5h16v11H9l-4 4v-4H4z"/>',
  邮件: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  二维码: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2z"/>',
};
const HIGH = [['贴底', 68], ['半屏', 36], ['接近全屏', 0]];

function initDrag(el) {
  const sh = el.querySelector('.x-sh'), hd = el.querySelector('.x-hd');
  let cur = 1, from = null, base = 0, moved = false;
  const go = (i) => {
    cur = Math.max(0, Math.min(HIGH.length - 1, i));
    sh.style.setProperty('--y', HIGH[cur][1] + '%');
    hd.setAttribute('aria-label', `调整面板高度，当前${HIGH[cur][0]}`);
  };
  hd.addEventListener('pointerdown', (e) => {
    hd.setPointerCapture(e.pointerId);
    from = e.clientY;
    base = HIGH[cur][1];
    moved = false;
    sh.classList.add('x-no-tr');
  });
  hd.addEventListener('pointermove', (e) => {
    if (from === null) return;
    const dy = e.clientY - from;
    moved ||= Math.abs(dy) > 4;
    sh.style.setProperty('--y', Math.max(0, Math.min(68, base + (dy / sh.offsetHeight) * 100)) + '%');
  });
  hd.addEventListener('pointerup', () => {
    if (from === null) return;
    from = null;
    sh.classList.remove('x-no-tr');
    if (!moved) return;
    const y = parseFloat(sh.style.getPropertyValue('--y'));
    go(HIGH.reduce((best, h, i) => (Math.abs(h[1] - y) < Math.abs(HIGH[best][1] - y) ? i : best), 0));
  });
  hd.addEventListener('click', () => { if (!moved) go((cur + 1) % HIGH.length); moved = false; }); // 点把手和回车都轮换一档，替代拖动
  hd.addEventListener('keydown', (e) => {
    const step = { ArrowUp: 1, ArrowDown: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    go(cur + step);
  });
  go(1);
}

export default function demo(root) {
  pick(root, [
    {
      name: '动作列表',
      fit: '更多操作：点一项就收起',
      html: screen('', '更多操作', `<b>十一月周报</b>${LINES}`, `<div class="x-act"><button type="button" data-r="已置顶">置顶</button><button type="button" class="x-del" data-r="已移到回收站">删除</button><button type="button" class="x-cc" data-r="已取消">取消</button></div>`),
      init(el) {
        const close = wire(el);
        el.querySelectorAll('[data-r]').forEach((b) => b.addEventListener('click', () => close(b.dataset.r)));
      },
    },
    {
      name: '分享',
      fit: '发给别人：一排渠道，点完就收',
      html: screen('', '分享', `<b>入门指南</b>${LINES}`, `<div class="x-share">${Object.entries(ICON).map(([k, d]) => `<button type="button" data-r="${k}"><span><svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg></span>${k}</button>`).join('')}</div>`),
      init(el) {
        const close = wire(el);
        el.querySelectorAll('[data-r]').forEach((b) => b.addEventListener('click', () => close(`已用${b.dataset.r}分享`)));
      },
    },
    {
      name: '规格',
      fit: '下单选颜色尺码：点确认才生效',
      html: screen('', '选择规格', `<b>棉麻衬衫</b>${LINES}`, `<div class="x-form"><button type="button" class="x-x" aria-label="关闭">×</button><div class="x-opt x-c"><span>颜色</span><button type="button" aria-pressed="true">雾蓝</button><button type="button" aria-pressed="false">杏白</button></div><div class="x-opt x-s"><span>尺码</span><button type="button" aria-pressed="false">S</button><button type="button" aria-pressed="true">M</button><button type="button" aria-pressed="false">L</button><button type="button" disabled aria-label="XL 无货">XL</button></div><div class="x-foot"><strong>¥ 129</strong><button type="button" class="x-ok">加入购物车</button></div></div>`),
      init(el) {
        const close = wire(el);
        single(el, '.x-c');
        single(el, '.x-s');
        el.querySelector('.x-ok').addEventListener('click', () => {
          const v = [...el.querySelectorAll('[aria-pressed=true]')].map((b) => b.textContent).join(' ');
          close(`已加入：${v}`);
        });
      },
    },
    {
      name: '筛选',
      fit: '条件多：点“查看”才应用',
      html: screen('', '筛选', `<b>全部门店</b>${LINES}`, `<div class="x-form"><div class="x-opt x-fl"><span>距离</span><button type="button" aria-pressed="true">3 公里内</button><button type="button" aria-pressed="false">可外送</button></div><div class="x-opt x-fl"><span>评分</span><button type="button" aria-pressed="false">4.5 以上</button><button type="button" aria-pressed="false">营业中</button></div><div class="x-foot"><button type="button" class="x-rs">重置</button><button type="button" class="x-ok x-grow"></button></div></div>`),
      init(el) {
        const close = wire(el);
        const chips = [...el.querySelectorAll('.x-fl button')], ok = el.querySelector('.x-ok');
        const paint = () => {
          const n = chips.filter((b) => b.getAttribute('aria-pressed') === 'true').length;
          ok.textContent = `查看 ${48 - n * 11} 家`;
        };
        chips.forEach((b) => b.addEventListener('click', () => {
          b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
          paint();
        }));
        el.querySelector('.x-rs').addEventListener('click', () => {
          chips.forEach((b) => b.setAttribute('aria-pressed', 'false'));
          paint();
        });
        ok.addEventListener('click', () => close(`已应用：${ok.textContent.slice(3)}`));
        paint();
      },
    },
    {
      name: '评论',
      fit: '边看边聊：背后视频继续播',
      html: screen('x-free x-vid', '评论', `<div class="x-prog" aria-hidden="true"></div><b>春日骑行 · 播放中</b>`, `<button type="button" class="x-x" aria-label="关闭">×</button><div class="x-ch">评论 128</div><div class="x-cm" tabindex="0" aria-label="评论列表"><p><em>小满：</em>第二段的路好美</p><p><em>阿越：</em>求路线</p><p><em>周南：</em>收藏了</p></div><form class="x-in"><input type="text" aria-label="写评论" placeholder="说点什么"><button type="submit">发送</button></form>`),
      init(el) {
        wire(el);
        const list = el.querySelector('.x-cm'), input = el.querySelector('.x-in input');
        el.querySelector('.x-in').addEventListener('submit', (e) => {
          e.preventDefault();
          const p = document.createElement('p');
          p.textContent = '我：' + (input.value.trim() || '赞');
          list.prepend(p);
          input.value = '';
        });
      },
    },
    {
      name: '可拖高度',
      fit: '地图找店：拖低看图，拖高看列表',
      html: screen('x-free x-drag', '附近门店', '<div class="x-map" aria-hidden="true"><i></i></div>', `<button type="button" class="x-hd"></button><p class="x-ttl">附近 4 家门店</p><ul class="x-st" tabindex="0" aria-label="门店列表"><li>河坊街店<span>320 米</span></li><li>南山路店<span>680 米</span></li><li>凤起路店<span>1.2 公里</span></li><li>文三路店<span>2.4 公里</span></li></ul>`),
      init: initDrag,
    },
  ]);
}
</script>
