---
zh: 标签页的六种样式
en: Six looks for tabs
aka: 标签页的六种样子 标签样式 Tab 样式 选项卡样式 分段切换 步骤标签 缩略图切换
of: c-tabs
tab: 六种样式
order: 41
---

## 是什么

同样是“点一下换内容”，标签可以长成六种样子：细线滑块、卡片式、箭头步骤式、分段控件、文件夹式、缩略图。样子不同，暗示的关系也不同：同级、一体、有先后、同一份内容换视图。示例都能点、能用方向键切。

## 适合

确定要用标签之后，定它长什么样。交互细节看「标签页」，这条只管选样式。

## 不适合

跨业务模块的跳转用「顶栏」或「侧栏导航」；真的要一步步提交的流程用「步骤条」或「分步表单」。

## 注意

样式决定第一眼的含义：箭头会让人以为必须按顺序走，分段控件会让人以为切完数据还是同一份。含义和实际不符时，用户的判断就错了。

## 要点

- 细线滑块：内容同级、页面要干净时用，后台详情页的默认选择；就是组件默认样式：Element Plus el-tabs 不设 type、Naive UI n-tabs type="line"、Ant Design Vue a-tabs type="line"
- 卡片式：标签和面板是同一块内容时用，当前标签和面板同底色、接缝处没有边线，未选中的标签退成灰底；Element Plus type="card"（连面板一起带边框用 "border-card"）、Naive UI type="card"、Ant Design Vue type="card"
- 箭头步骤式：阶段有先后时用，3–5 段首尾相接，已走过的和当前的分色；Ant Design Vue a-steps type="navigation"、Element Plus el-steps simple，Naive UI 没有现成的；宽度不够时改用「步骤条」的圆点样式
- 分段控件：2–4 项、切的是同一份内容的不同视图时用（日 / 周 / 月），白色滑块在同一条灰轨道里移动；Element Plus el-segmented、Naive UI n-tabs type="segment"、Ant Design Vue a-segmented；细节见「按钮组与分段控件」
- 文件夹式：想要档案袋的实物感时用，每个标签一种底色，当前标签和面板同色并盖住相邻标签；三家都没有，在卡片式标签页上覆盖样式；细节见「档案夹标签页」
- 缩略图：内容本身是图片时用，点小图换主图，选中项加 2px 描边，每张小图有文字说明给读屏；组件库没有现成的，用一组按钮自己做
- 切换反馈由组件自带：指示条平移、当前项变色，再给当前项加粗；内容区直接换；减少动态效果时指示条直接到位
- 跟 AI 说清楚三件事：内容之间是什么关系、有几项、切换后是换内容还是换视图

## 提示词

给{产品}的{页面}做标签切换，切的是{标签清单}。这几项的关系是{同级 / 有先后 / 同一份内容的不同视图 / 图片}。按这个规则选样式：有先后用箭头步骤式；同一份内容换视图且不超过 4 项用分段控件；内容是图片用缩略图；同级内容默认细线滑块，要和面板连成一体用卡片式，要档案袋的实物感用文件夹式。告诉我选了哪一种和理由，然后只实现这一种。

选定后用项目组件库对应的类型实现（细线：Element Plus el-tabs / Naive UI n-tabs type="line" / Ant Design Vue a-tabs type="line"；卡片式：三家都是 type="card"；分段控件：el-segmented / n-tabs type="segment" / a-segmented；箭头步骤式：a-steps type="navigation" / el-steps simple），语义、键盘和指示条动画用组件自带的，不手写；当前项同时用颜色和字重区分，内容区直接替换；切走再回来保持原选中；减少动态效果时指示条直接到位。

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
  }
  :where(.x) button {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .x button:focus-visible {
    outline: 2px solid #3b5bdb;
    outline-offset: -2px;
  }
  .x-p {
    margin: 0;
    color: #3d434d;
  }
  .x-list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .x-list button {
    position: relative;
    height: 30px;
    white-space: nowrap;
    color: #5b616e;
  }
  .x-list [aria-selected='true'] {
    color: #1f2329;
    font-weight: 600;
  }

  .x-line {
    position: relative;
    border-bottom: 1px solid #dfe2e8;
  }
  .x-thumb {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 25%;
    height: 2px;
    background: #3b5bdb;
    transform: translateX(calc(var(--i, 0) * 100%));
    transition: transform 0.22s cubic-bezier(0.3, 0.7, 0.2, 1);
  }
  .x-line + .x-p {
    padding: 10px 2px;
  }

  .x-card {
    position: relative;
    top: 1px;
    gap: 2px;
    padding: 0 6px;
  }
  .x-card button {
    border: 1px solid transparent;
    border-bottom: 0;
    border-radius: 6px 6px 0 0;
    background: #e9ebf0;
  }
  .x-card [aria-selected='true'] {
    z-index: 1;
    border-color: #dfe2e8;
    background: #fff;
    color: #2b45b0;
  }
  .x-card + .x-p {
    padding: 10px;
    border: 1px solid #dfe2e8;
    border-radius: 8px;
    background: #fff;
  }

  .x-arrow {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
  }
  .x-arrow button {
    height: 32px;
    margin-right: -7px;
    padding: 0 8px 0 14px;
    background: #e4e7ed;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%);
  }
  .x-arrow button:first-child {
    padding-left: 6px;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%);
  }
  .x-arrow button:last-child {
    margin-right: 0;
  }
  .x-arrow .done {
    background: #c9d3f7;
    color: #24398f;
  }
  .x-arrow [aria-selected='true'] {
    background: #3b5bdb;
    color: #fff;
  }
  .x-arrow button:focus-visible {
    outline: 0;
    background: #1f3cb0;
    color: #fff;
  }
  .x-arrow + .x-p {
    padding: 10px 2px;
  }

  .x-seg {
    position: relative;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 3px;
    border-radius: 9px;
    background: #e4e7ed;
  }
  .x-seg .x-thumb {
    top: 3px;
    bottom: 3px;
    left: 3px;
    width: calc((100% - 6px) / 3);
    height: auto;
    border-radius: 7px;
    background: #fff;
    box-shadow: 0 1px 3px rgb(31 35 41 / 18%);
  }
  .x-seg button {
    z-index: 1;
    height: 26px;
    border-radius: 7px;
  }
  .x-seg + .x-p {
    padding: 10px 2px;
  }

  .x-folder {
    grid-template-columns: repeat(3, minmax(0, 92px));
    padding-left: 8px;
  }
  .x-folder button {
    position: relative;
    top: 1px;
    height: 28px;
    margin-right: -10px;
    padding-right: 8px;
    border-radius: 9px 14px 0 0;
    background: color-mix(in srgb, var(--c) 55%, #fff);
    color: #3d3524;
  }
  .x-folder [aria-selected='true'] {
    z-index: 1;
    top: 0;
    height: 30px;
    background: var(--c);
    color: #2a2412;
  }
  .x-folder + .x-p {
    padding: 12px;
    border-radius: 10px;
    background: var(--c);
    color: #2a2412;
  }

  .x-gallery {
    display: grid;
    grid-template-columns: 136px 44px minmax(0, 1fr);
    gap: 8px;
    height: 104px;
  }
  .x-main {
    border-radius: 8px;
    background: var(--g);
    transition: opacity 0.2s;
  }
  .x-thumbs {
    display: grid;
    gap: 4px;
  }
  .x-thumbs button {
    border: 2px solid transparent;
    border-radius: 7px;
    background: var(--g);
    background-clip: padding-box;
  }
  .x-thumbs [aria-selected='true'] {
    border-color: #3b5bdb;
  }
  .x-gallery .x-p b {
    display: block;
    color: #1f2329;
  }
  .x-gallery .x-p {
    align-self: center;
  }
  @media (prefers-reduced-motion: reduce) {
    .x-thumb,
    .x-main {
      transition: none;
    }
  }
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

// 六种样子共用的切换：点击、左右方向键、Home / End
function tabs(el, data, after) {
  const list = el.querySelector('[role=tablist]');
  const btns = [...list.querySelectorAll('[role=tab]')];
  const panel = el.querySelector('[data-panel]');
  const show = (i, focus) => {
    btns.forEach((b, k) => {
      b.setAttribute('aria-selected', String(k === i));
      b.tabIndex = k === i ? 0 : -1;
    });
    list.style.setProperty('--i', i);
    panel.innerHTML = data[i];
    after?.(i, btns);
    if (focus) btns[i].focus();
  };
  btns.forEach((b, i) => {
    b.addEventListener('click', () => show(i));
    b.addEventListener('keydown', (e) => {
      const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: btns.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault();
      e.stopPropagation();
      show((n + btns.length) % btns.length, true);
    });
  });
  show(0);
}

const bar = (cls, names, thumb = '') =>
  `<div class="x-list ${cls}" role="tablist" aria-label="示例标签">${names
    .map((n) => `<button type="button" role="tab">${n}</button>`)
    .join('')}${thumb}</div>`;
const GOODS = [
  'linear-gradient(135deg,#f3c9a5,#c9764a 60%,#7a3b22)',
  'linear-gradient(160deg,#bcd6c5,#5e9a7f 55%,#2c5b4a)',
  'linear-gradient(120deg,#c8cbe8,#7377bd 55%,#3b3f86)',
];
const FOLDERS = ['#f4d58d', '#b9dcc4', '#f2b8a2'];

export default function demo(root) {
  pick(
    root,
    [
      {
        name: '细线滑块',
        fit: '同级内容，后台详情页最常用',
        html: `<div class="x">${bar('x-line', ['概览', '订单', '发票', '日志'], '<i class="x-thumb"></i>')}<p class="x-p" data-panel></p></div>`,
        init: (el) =>
          tabs(el, ['本月成交 86 单，退款 2 单', '进行中的订单 14 笔', '待开票 5 张', '最近一次改动：今天 09:40']),
      },
      {
        name: '卡片式',
        fit: '标签和内容要连成一块',
        html: `<div class="x">${bar('x-card', ['手机', '平板', '电脑', '手表'])}<p class="x-p" data-panel></p></div>`,
        init: (el) => tabs(el, ['手机端保修 12 个月', '平板端保修 18 个月', '电脑端保修 24 个月', '手表端保修 12 个月']),
      },
      {
        name: '箭头步骤',
        fit: '阶段有先后，一眼看到走到哪',
        html: `<div class="x">${bar('x-arrow', ['需求', '排期', '上线'])}<p class="x-p" data-panel></p></div>`,
        init: (el) =>
          tabs(el, ['收集了 9 条需求', '已排进第 42 周', '灰度 20% 的用户'], (i, btns) =>
            btns.forEach((b, k) => b.classList.toggle('done', k < i)),
          ),
      },
      {
        name: '分段控件',
        fit: '两到四项，切同一份内容的视图',
        html: `<div class="x">${bar('x-seg', ['按日', '按周', '按月'], '<i class="x-thumb"></i>')}<p class="x-p" data-panel></p></div>`,
        init: (el) => tabs(el, ['今日访客 1,280', '本周访客 8,640', '本月访客 36,900']),
      },
      {
        name: '文件夹式',
        fit: '想要档案袋的实物感，内容站常用',
        html: `<div class="x">${bar('x-folder', ['菜谱', '游记', '书单'])}<p class="x-p" data-panel></p></div>`,
        init: (el) =>
          tabs(el, ['收了 32 道家常菜', '记了 7 座小城', '今年读完 18 本'], (i, btns) => {
            btns.forEach((b, k) => b.style.setProperty('--c', FOLDERS[k]));
            el.querySelector('.x').style.setProperty('--c', FOLDERS[i]);
          }),
      },
      {
        name: '缩略图',
        fit: '商品或作品，用小图切主图',
        html: `<div class="x x-gallery"><div class="x-main" role="img" aria-label="商品主图"></div>
          <div class="x-thumbs" role="tablist" aria-label="切换主图">${GOODS.map(
            (g, i) => `<button type="button" role="tab" aria-label="第 ${i + 1} 张" style="--g:${g}"></button>`,
          ).join('')}</div><p class="x-p" data-panel></p></div>`,
        init: (el) =>
          tabs(el, ['<b>釉陶马克杯</b>赭石色', '<b>釉陶马克杯</b>松石绿', '<b>釉陶马克杯</b>暮山紫'], (i) =>
            el.querySelector('.x-main').style.setProperty('--g', GOODS[i]),
          ),
      },
    ],
    '标签页样式',
  );
}
</script>
