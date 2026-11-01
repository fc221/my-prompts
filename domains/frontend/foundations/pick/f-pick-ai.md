---
zh: AI 功能的六种产品形态
en: Six forms for AI features
aka: AI功能放哪 六种形态 AI 形态 AI 入口 AI 助手放哪 AI 选型 Copilot 侧边助手 划词工具条
order: 60
---

## 是什么

产品要加 AI 时，界面上的形态至少有六种：整页对话、分栏助手、划词浮条、悬浮球、无限画布、无界面。对话框只是其中一种，任务不同，合适的形态也不同。示例里每种都能试。

## 适合

产品要接入 AI 功能，还没想好入口放在哪、长什么样的时候。

## 不适合

已经定了形态，只差细节时去看具体条目：对话页看「单栏对话」，输入区看「对话输入框」。

## 注意

选形态看任务，不看哪种时髦。把一个“总结这一页”的小功能做成整页对话，用户要离开工作现场；把开放式的长对话塞进悬浮小窗，又读不下去。先问用户在 AI 出现时手上正在做什么。

## 要点

- 整页对话：目标还模糊、要来回聊才想清楚时用，AI 就是这一页的主角，输入框固定在底部；细节见「单栏对话」
- 分栏助手：用户在产出东西、边做边问时用，一边是工作区一边是 AI，建议能一键应用到工作区，也能撤销；细节见「对话 + 产物分栏」
- 划词浮条：要融进已有产品、处理一小段内容时用，选中后贴着选区出现三四个动作，改完原地替换
- 悬浮球：哪一页都可能用到、又不想占地方时用，点开是小面板，带当前页相关的快捷动作，能拖开避免挡内容；细节见「吸边悬浮球」
- 无限画布：要发散、把几条思路摊开比较时用，内容是节点和连线，可平移，每个节点都能继续往下问
- 无界面：规则明确、不需要人盯时用，后台做完只留一条结果，给撤销和记录，遇到拿不准的才来问人
- 跟 AI 说清楚四件事：用户当时在做什么、AI 的产出放回哪里、用户怎么确认或撤销、失败了怎么办

## 提示词

给{产品}加 AI 功能，帮用户{任务}。用户当时正在{当前操作}，AI 的产出是{一段话 / 一份文档 / 一批改动 / 一组想法}，要放回{位置}。按这个规则选形态：规则明确、结果可撤销，用无界面；处理选中的一小段内容，用划词浮条；要发散比较多条思路，用无限画布；边做边问且产出放在工作区，用分栏助手；多个页面都要用且任务简短，用悬浮球；目标模糊要聊着想清楚，用整页对话。告诉我选了哪一种和理由，然后只实现这一种。

写清这几件事：AI 生成期间用户能不能继续操作，有“停止”按钮；AI 的改动在确认前和原内容区分开，可以逐条接受或全部撤销；出错时保留用户的输入，说明原因并给重试；结果不确定时明确标出来，让人来决定。新内容用 aria-live 播报；减少动态效果时结果一次性显示。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
  .x {
    position: relative;
    width: 100%;
    max-width: 300px;
    font-size: 12px;
    line-height: 18px;
  }
  @container (min-height: 260px) {
    .x {
      zoom: 1.5;
    }
    .x.x-flat {
      zoom: 1;
    }
  }
  .x.x-flat {
    max-width: none;
    height: 100%;
  }
  :where(.x) button {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .x :focus-visible {
    outline: 2px solid #3b5bdb;
    outline-offset: -2px;
  }
  .x-fr {
    position: relative;
    height: 114px;
    overflow: hidden;
    border: 1px solid #dfe2e8;
    border-radius: 8px;
    background: #fff;
  }
  .x-sk {
    display: block;
    height: 7px;
    margin-bottom: 7px;
    border-radius: 4px;
    background: #e8ebf0;
  }
  .x-note {
    margin: 0;
    color: #5b616e;
    font-size: 11px;
    line-height: 16px;
  }
  .x .x-go {
    flex: none;
    height: 24px;
    padding: 0 10px;
    border-radius: 6px;
    background: #3b5bdb;
    color: #fff;
  }
  .x .x-ghost {
    flex: none;
    height: 22px;
    padding: 0 8px;
    border: 1px solid #cdd2da;
    border-radius: 6px;
    background: #fff;
    white-space: nowrap;
  }

  .x-chat {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .x-msgs {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px 10px;
    overflow-y: auto;
    scrollbar-width: thin;
  }
  .x-m {
    align-self: flex-start;
    max-width: 86%;
    padding: 2px 8px;
    border-radius: 9px;
    background: #f1f3f7;
    line-height: 17px;
  }
  .x-m.me {
    align-self: flex-end;
    background: #3b5bdb;
    color: #fff;
  }
  .x-send {
    display: flex;
    gap: 6px;
    padding: 4px 6px 5px;
    border-top: 1px solid #eef0f3;
  }
  .x-send input {
    flex: 1;
    min-width: 0;
    height: 24px;
    padding: 0 8px;
    border: 1px solid #cdd2da;
    border-radius: 12px;
    background: #fff;
    color: inherit;
    font: inherit;
  }

  .x-duo {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 118px;
    height: 100%;
  }
  .x-doc {
    padding: 7px 9px;
    min-width: 0;
  }
  .x-doc b {
    display: block;
    margin-bottom: 2px;
  }
  .x-doc p {
    margin: 0 0 6px;
    color: #3d434d;
    line-height: 17px;
  }
  .x-doc p.new {
    border-radius: 3px;
    background: #e6f6ea;
  }
  .x-aside {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 6px;
    border-left: 1px solid #e1e4ea;
    background: #f7f8fb;
  }
  .x-aside b {
    color: #2b45b0;
    font-size: 11px;
  }
  .x-aside p {
    margin: 0;
    font-size: 11px;
    line-height: 15px;
  }
  .x-aside .x-go {
    align-self: flex-start;
    height: 22px;
  }

  .x-text {
    padding: 34px 10px 6px;
    line-height: 19px;
  }
  .x-s {
    border-radius: 2px;
    cursor: pointer;
  }
  .x-s.on {
    background: #d6e0ff;
  }
  .x-float {
    position: absolute;
    top: 4px;
    left: 10px;
    display: flex;
    gap: 2px;
    padding: 2px;
    border-radius: 7px;
    background: #24292f;
    box-shadow: 0 4px 12px rgb(31 35 41 / 28%);
    transition: top 0.14s;
  }
  .x-float button {
    height: 22px;
    padding: 0 8px;
    border-radius: 5px;
    color: #fff;
    white-space: nowrap;
  }
  .x-float button:hover {
    background: rgb(255 255 255 / 16%);
  }
  .x-float button:focus-visible {
    outline-color: #fff;
  }
  .x-float i {
    align-self: center;
    padding: 0 4px;
    color: #ffd27a;
    font-style: normal;
  }

  .x-page {
    padding: 9px 10px;
  }
  .x-tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }
  .x-tiles i {
    height: 34px;
    border-radius: 6px;
    background: #eef0f4;
  }
  .x-ball {
    position: absolute;
    right: 8px;
    bottom: 8px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #5b77e3, #8a4fd8);
    color: #fff;
    font-weight: 700;
    box-shadow: 0 4px 12px rgb(91 79 216 / 42%);
  }
  .x-ballpop {
    position: absolute;
    right: 8px;
    bottom: 48px;
    width: 170px;
    padding: 5px;
    border: 1px solid #e1e4ea;
    border-radius: 9px;
    background: #fff;
    box-shadow: 0 6px 18px rgb(31 35 41 / 18%);
    transform-origin: bottom right;
    animation: x-pop 0.16s ease-out;
  }
  @keyframes x-pop {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
  }
  .x-ballpop button {
    display: block;
    width: 100%;
    padding: 1px 6px;
    border-radius: 5px;
    text-align: left;
  }
  .x-ballpop button:hover {
    background: #f1f3f7;
  }

  .x-canvas {
    position: relative;
    height: 100%;
    min-height: 114px;
    overflow: hidden;
    border: 1px solid #dfe2e8;
    border-radius: 8px;
    background-color: #fbfbfd;
    background-image: radial-gradient(#d3d8e2 1px, transparent 1px);
    background-size: 14px 14px;
    background-position: var(--px, 0) var(--py, 0);
    cursor: grab;
    touch-action: none;
  }
  .x-canvas.drag {
    cursor: grabbing;
  }
  .x-world {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(var(--px, 0), var(--py, 0));
    transform-origin: 0 0;
  }
  @container (min-height: 260px) {
    .x-world {
      transform: translate(var(--px, 0), var(--py, 0)) scale(1.5);
    }
  }
  .x-world svg {
    position: absolute;
    overflow: visible;
    width: 1px;
    height: 1px;
  }
  .x-world path {
    fill: none;
    stroke: #a9b5e8;
    stroke-width: 1.5;
  }
  .x-node {
    position: absolute;
    width: 86px;
    padding: 2px 6px;
    border: 1px solid #cfd6ee;
    border-radius: 6px;
    background: #fff;
    text-align: center;
    white-space: nowrap;
    animation: x-pop 0.18s ease-out;
  }
  .x-node.root {
    border-color: #3b5bdb;
    background: #3b5bdb;
    color: #fff;
  }
  .x-more {
    position: absolute;
    right: 6px;
    bottom: 6px;
    height: 24px;
    padding: 0 10px;
    border-radius: 12px;
    background: #24292f;
    color: #fff;
  }
  .x-more:disabled {
    opacity: 0.55;
    cursor: default;
  }

  .x-inbox {
    padding: 2px 10px 0;
  }
  .x-mail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
    border-bottom: 1px solid #eef0f3;
  }
  .x-tag {
    padding: 0 6px;
    border-radius: 4px;
    background: #eef1fd;
    color: #2b45b0;
    font-size: 11px;
    line-height: 16px;
    animation: x-pop 0.18s ease-out;
  }
  .x-done {
    position: absolute;
    right: 8px;
    bottom: 3px;
    left: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    min-height: 22px;
  }
  @media (prefers-reduced-motion: reduce) {
    .x-float,
    .x-ballpop,
    .x-node,
    .x-tag {
      animation: none;
      transition: none;
    }
  }
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const REPLIES = ['几个人去？预算大概多少？', '那选近郊营地，周六去周日回。', '我把装备清单列出来，你看缺什么。'];

function chat(el) {
  const list = el.querySelector('.x-msgs');
  const input = el.querySelector('input');
  let n = 0;
  const add = (t, me) => {
    const m = Object.assign(document.createElement('div'), { className: `x-m ${me ? 'me' : ''}`, textContent: t });
    list.append(m);
    list.scrollTop = list.scrollHeight;
  };
  el.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const t = input.value.trim();
    if (!t) return;
    input.value = '';
    add(t, true);
    setTimeout(() => add(REPLIES[n++ % REPLIES.length]), 420);
  });
}

const OLD = '我们这次的活动主要是想要让更多的用户能够了解到新功能。';
const NEW = '这次活动让更多用户了解新功能。';

function duo(el) {
  const p = el.querySelector('.x-doc p');
  const btn = el.querySelector('.x-aside .x-go');
  const tip = el.querySelector('.x-aside p');
  let on = false;
  btn.addEventListener('click', () => {
    on = !on;
    p.textContent = on ? NEW : OLD;
    p.classList.toggle('new', on);
    btn.textContent = on ? '撤销' : '采用';
    tip.textContent = on ? '已改好，左边高亮的是新内容' : '开头有点啰嗦，改短一点？';
  });
}

const SENT = [
  { 改短: '双层真空，长效保温。', 更正式: '本品采用双层真空结构，保温性能持久。', 翻译: 'A vacuum wall keeps it hot.' },
  { 改短: '杯盖防漏，放包里放心。', 更正式: '杯盖具备防漏设计，便于随身携带。', 翻译: 'The lid never leaks.' },
];

function selection(el) {
  const box = el.querySelector('.x-fr');
  const bar = el.querySelector('.x-float');
  const spans = [...el.querySelectorAll('.x-s')];
  let cur = 1;
  const place = () => {
    spans.forEach((s, i) => {
      s.classList.toggle('on', i === cur);
      s.setAttribute('aria-pressed', String(i === cur));
    });
    const r = box.getBoundingClientRect();
    const top = (spans[cur].getBoundingClientRect().top - r.top) / (r.height / box.offsetHeight);
    bar.style.top = `${Math.max(3, top - 29)}px`;
  };
  spans.forEach((s, i) => {
    const go = () => {
      cur = i;
      place();
    };
    s.addEventListener('click', go);
    s.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      go();
    });
  });
  bar.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    spans[cur].textContent = SENT[cur][b.textContent];
    place();
  });
  place();
}

function ball(el) {
  const btn = el.querySelector('.x-ball');
  const pop = el.querySelector('.x-ballpop');
  const note = el.querySelector('.x-note');
  const set = (on, focus) => {
    pop.hidden = !on;
    btn.setAttribute('aria-expanded', String(on));
    if (focus) btn.focus();
  };
  btn.addEventListener('click', () => set(pop.hidden));
  el.querySelector('.x-fr').addEventListener('keydown', (e) => e.key === 'Escape' && set(false, true));
  pop.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    note.textContent = `已开始：${b.textContent}`;
    set(false, true);
  });
}

const IDEAS = [
  [0, '旧书交换', 116, 8],
  [0, '手作摊位', 116, 66],
  [1, '作者签售', 222, 8],
  [2, '亲子工坊', 222, 66],
  [0, '夜间音乐', 116, 112],
];

function canvas(el) {
  const box = el.querySelector('.x-canvas');
  const world = el.querySelector('.x-world');
  const links = el.querySelector('.x-world svg');
  const more = el.querySelector('.x-more');
  const live = el.querySelector('[role=status]');
  const nodes = [[10, 37]];
  let n = 0;
  let px = 0;
  let py = 0;
  const pan = (x, y) => {
    px = x;
    py = y;
    box.style.setProperty('--px', `${x}px`);
    box.style.setProperty('--py', `${y}px`);
  };
  const grow = () => {
    const [from, text, x, y] = IDEAS[n++];
    const [fx, fy] = nodes[from];
    nodes.push([x, y]);
    const a = `${fx + 86} ${fy + 12}`;
    const b = `${x} ${y + 12}`;
    links.innerHTML += `<path d="M${a} C${fx + 104} ${fy + 12} ${x - 18} ${y + 12} ${b}"/>`;
    world.insertAdjacentHTML('beforeend', `<div class="x-node" style="left:${x}px;top:${y}px">${text}</div>`);
    live.textContent = `新想法：${text}`;
    more.disabled = n === IDEAS.length;
  };
  more.addEventListener('click', grow);
  box.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button')) return;
    box.setPointerCapture(e.pointerId);
    box.dataset.x = e.clientX - px;
    box.dataset.y = e.clientY - py;
    box.classList.add('drag');
  });
  box.addEventListener('pointermove', (e) => {
    if (box.hasPointerCapture(e.pointerId)) pan(e.clientX - box.dataset.x, e.clientY - box.dataset.y);
  });
  box.addEventListener('pointerup', () => box.classList.remove('drag'));
  box.addEventListener('keydown', (e) => {
    const d = { ArrowLeft: [24, 0], ArrowRight: [-24, 0], ArrowUp: [0, 24], ArrowDown: [0, -24] }[e.key];
    if (!d || e.target !== box) return;
    e.preventDefault();
    pan(px + d[0], py + d[1]);
  });
  grow();
  grow();
}

const MAILS = [
  ['三月发票', '财务'],
  ['面试安排', '招聘'],
  ['快递签收', '后勤'],
  ['合同续签', '法务'],
];

function silent(el) {
  const rows = [...el.querySelectorAll('.x-mail')];
  const note = el.querySelector('.x-note');
  const btn = el.querySelector('.x-ghost');
  let timer;
  const clear = () => {
    clearTimeout(timer);
    rows.forEach((r) => r.querySelector('.x-tag')?.remove());
  };
  const run = () => {
    clear();
    btn.hidden = true;
    note.textContent = '后台处理中，不用管它';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0;
    const step = () => {
      if (!btn.isConnected) return;
      if (i === rows.length) {
        note.textContent = `已归类 ${rows.length} 封，发现 1 封要你看`;
        btn.textContent = '撤销';
        btn.hidden = false;
        return;
      }
      rows[i].insertAdjacentHTML('beforeend', `<span class="x-tag">${MAILS[i][1]}</span>`);
      i += 1;
      if (reduce) step();
      else timer = setTimeout(step, 240);
    };
    step();
  };
  btn.addEventListener('click', () => {
    if (btn.textContent === '重新运行') return run();
    clear();
    note.textContent = '已撤销，邮件恢复原样';
    btn.textContent = '重新运行';
  });
  run();
}

export default function demo(root) {
  pick(
    root,
    [
      {
        name: '整页对话',
        fit: '目标还模糊，要来回聊着想清楚',
        html: `<div class="x"><div class="x-fr"><div class="x-chat"><div class="x-msgs" role="log" aria-label="对话记录" tabindex="0">
          <div class="x-m me">想周末带孩子露营</div><div class="x-m">好呀，开车能接受多久？</div></div>
          <form class="x-send"><input aria-label="输入消息" placeholder="接着说点什么"><button type="submit" class="x-go">发送</button></form></div></div></div>`,
        init: chat,
      },
      {
        name: '分栏助手',
        fit: '左边干活右边问，产物一直看得到',
        html: `<div class="x"><div class="x-fr"><div class="x-duo"><div class="x-doc"><b>活动方案</b><p aria-live="polite">${OLD}</p><i class="x-sk" style="width:70%"></i></div>
          <aside class="x-aside" aria-label="AI 助手"><b>助手</b><p>开头有点啰嗦，改短一点？</p><button type="button" class="x-go">采用</button></aside></div></div></div>`,
        init: duo,
      },
      {
        name: '划词浮条',
        fit: '已有产品里顺手改一小段',
        html: `<div class="x"><div class="x-fr"><div class="x-float" role="toolbar" aria-label="选中文字后的操作"><i aria-hidden="true">✦</i><button type="button">改短</button><button type="button">更正式</button><button type="button">翻译</button></div>
          <div class="x-text" aria-live="polite"><span class="x-s" role="button" tabindex="0">这款保温杯用了双层真空，能保温很久。</span><span class="x-s" role="button" tabindex="0">杯盖不容易漏水，放在包里也不用担心。</span></div></div></div>`,
        init: selection,
      },
      {
        name: '悬浮球',
        fit: '哪一页都可能要用，随叫随到',
        html: `<div class="x"><div class="x-fr"><div class="x-page"><i class="x-sk" style="width:60%"></i><div class="x-tiles"><i></i><i></i><i></i></div><p class="x-note" role="status" style="margin-top:6px"></p></div>
          <div class="x-ballpop" role="menu" aria-label="AI 助手"><button type="button" role="menuitem">总结这一页</button><button type="button" role="menuitem">找出异常数据</button></div>
          <button type="button" class="x-ball" aria-haspopup="menu" aria-expanded="true" aria-label="AI 助手">AI</button></div></div>`,
        init: ball,
      },
      {
        name: '无限画布',
        fit: '要发散，把几条思路摊开比较',
        html: `<div class="x x-flat"><div class="x-canvas" data-clip tabindex="0" role="region" aria-label="想法画布，方向键平移"><div class="x-world"><svg aria-hidden="true"></svg><div class="x-node root" style="left:10px;top:37px">周末市集</div></div>
          <button type="button" class="x-more">再想一个</button><span role="status" style="position:absolute;top:0;opacity:0"></span></div></div>`,
        init: canvas,
      },
      {
        name: '无界面',
        fit: '规则明确，做完告诉一声就行',
        html: `<div class="x"><div class="x-fr"><div class="x-inbox">${MAILS.map((m) => `<div class="x-mail"><span>${m[0]}</span></div>`).join('')}</div>
          <div class="x-done"><p class="x-note" role="status"></p><button type="button" class="x-ghost">撤销</button></div></div></div>`,
        init: silent,
      },
    ],
    'AI 形态',
  );
}
</script>
