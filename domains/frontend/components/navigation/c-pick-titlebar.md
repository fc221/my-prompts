---
zh: 手机顶栏的八种样式
en: Mobile title bars compared
aka: 手机顶栏的八种写法 导航栏 标题栏 透明顶栏 搜索顶栏 大标题 左对齐标题 居中标题
of: c-topbar
tab: 手机顶栏
order: 31
---

## 是什么

手机页面顶部一条栏的八种写法：叠在头图上、主副标题、标题即切换入口、搜索框主导、标题加标签、左对齐、居中、折叠大标题。按页面用途、层级、操作放哪、滚动时怎么变来选。

## 适合

新做一个手机页面，或者同一个 App 里顶栏写法各不相同、要统一时。

## 不适合

桌面网站的顶部导航看「顶栏」；折叠的滚动细节看「大标题收成导航栏」；半透明的材质看「毛玻璃导航栏」。

## 注意

写法跟着页面层级走，同一层级的页面用同一种。左上一个返回，右上最多两个图标，再多收进“更多”；顶栏挤不下的操作，往往不属于顶栏。

## 要点

- 叠在头图上：头图是卖点的详情页。一开始透明，图标放半透明深色圆底上；头图快滚走时切成实色并淡入标题，约 160ms，减少动态效果时直接切换
- 主副标题：标题说不全状态时，如阅读的章节、群聊人数、订单进度。副标题一行，小两档，随状态更新
- 标题即切换入口：全页内容取决于当前门店、账户、城市。标题后加向下箭头，点开列出选项，当前项高亮，切换后全页刷新；Esc 关闭，焦点回到标题
- 搜索框主导：搜索是第一动作的首页。框占满中间，左边放定位，右边最多一个图标，占位词写能搜什么
- 标题加标签：一页分几类内容。2–5 个标签紧贴顶栏，滚动时一起吸顶，多了就横滑
- 左对齐：一级页。标题靠左、字号大一档，操作靠右，没有返回键
- 居中：二级页和表单页。左返回、中标题、右一个操作；用三列网格保证标题真正居中，“保存”这类操作用文字按钮，没有改动时禁用
- 折叠大标题：列表型首页。大标题跟内容滚走，顶栏淡入小标题和分隔线；滚回顶部再反过来
- 跟 AI 说清楚四件事：页面用途（首页、列表、详情、表单）；层级（一级还是二级，要不要返回）；操作位置（几个操作，放左还是放右）；滚动变化（不变、变实色、收起、吸顶）

## 提示词

给{产品}的{页面}做手机顶栏。这页是{首页 / 列表 / 详情 / 表单}，属于{一级 / 二级}页，主要操作是{操作}，滚动时{不变 / 要变化}。先判断用哪一种，说明理由后只实现这一种：有大头图的详情页，透明叠在头图上，滚走后变实色并淡入标题；状态要跟着标题看，用主副标题；全页取决于当前门店或账户，标题做成切换入口；搜索是第一动作，搜索框占满中间；一页分几类内容，顶栏下接 2–5 个标签并一起吸顶；一级页标题左对齐、操作靠右；二级页和表单页标题居中，左返回、右一个操作；列表型首页用折叠大标题。顶栏高度{高度}，避开状态栏安全区；右侧图标最多两个，都写读屏名称；标题过长时省略，不压到两侧按钮。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
.x-ph{position:relative;align-self:stretch;width:100%;max-width:320px;display:flex;flex-direction:column;overflow:hidden;border-radius:12px;background:#fff;box-shadow:0 0 0 1px #e3e6eb;font-size:12px;line-height:16px}
.x-ph button{border:0;background:none;color:inherit;font:inherit;cursor:pointer}
.x-ph button:focus-visible,.x-ph input:focus-visible,.x-body:focus-visible{outline:2px solid #3b5bdb;outline-offset:-2px}
.x-bar{position:relative;z-index:2;flex:none;display:flex;align-items:center;gap:2px;height:38px;padding:0 6px;background:#fff;transition:background-color .18s,box-shadow .18s,color .18s}
.x-line{box-shadow:0 1px 0 #e3e6eb}
.x-ic{flex:none;width:28px;height:28px;display:grid;place-items:center;border-radius:14px;transition:background-color .18s}
.x-ic svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.x-t{flex:1;min-width:0;text-align:center;font-size:14px;font-weight:600;white-space:nowrap}
.x-fade{opacity:0;transition:opacity .18s}
.x-body{position:relative;flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.x-body::-webkit-scrollbar{display:none}
.x-li{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0;padding:5px 12px;border-top:1px solid #eef0f3;white-space:nowrap}
.x-li span{color:#5b616e}
.x-chat .x-li span{flex:1;text-align:left}
.x-li i{width:7px;height:7px;border-radius:50%;background:#e5484d}
.x-over .x-bar{position:absolute;left:0;right:0;top:0;background:none;color:#fff}
.x-over .x-ic{background:rgba(15,23,42,.42)}
.x-over .x-t{color:#1f2329}
.x-over.x-solid .x-bar{background:#fff;color:#1f2329;box-shadow:0 1px 0 #e3e6eb}
.x-over.x-solid .x-ic{background:none}
.x-solid .x-fade,.x-small .x-fade{opacity:1}
.x-small .x-bar{box-shadow:0 1px 0 #e3e6eb}
.x-hero{height:96px;display:flex;align-items:flex-end;padding:8px 12px;background:linear-gradient(180deg,rgba(15,23,42,.35),transparent 45%,rgba(15,23,42,.55)),linear-gradient(150deg,#f3a65a,#cf4f7f 55%,#4a3a8f);color:#fff;font-size:15px;font-weight:700}
.x-two{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center}
.x-two b{font-size:13px;line-height:17px}
.x-two small{color:#5b616e;font-size:11px;line-height:14px;font-variant-numeric:tabular-nums}
.x-ch{min-height:66px;padding:6px 12px;border-top:1px solid #eef0f3}
.x-ch b{display:block;margin-bottom:2px}
.x-ch p{margin:0;color:#5b616e}
.x-ph .x-tb{flex:1;min-width:0;display:flex;align-items:center;justify-content:center;gap:2px;height:30px;border-radius:8px;font-size:14px;font-weight:600}
.x-tb svg{width:14px;height:14px;fill:none;stroke:#5b616e;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;transition:transform .16s}
.x-tb[aria-expanded=true] svg{transform:rotate(180deg)}
.x-menu{position:absolute;z-index:3;left:50%;top:38px;width:128px;margin-left:-64px;padding:3px;border-radius:10px;background:#fff;box-shadow:0 0 0 1px rgba(15,23,42,.08),0 10px 22px -8px rgba(15,23,42,.4)}
.x-ph .x-menu button{display:block;width:100%;height:24px;border-radius:6px;text-align:center}
.x-ph .x-menu [aria-current=true]{background:#e3e9fd;color:#2f49b8;font-weight:600}
.x-find{flex:1;min-width:0;height:28px;padding:0 12px;border:0;border-radius:14px;background:#f2f4f7;color:inherit;font:inherit;appearance:none}
.x-city{flex:none;padding:0 6px;font-weight:600}
.x-tags{position:relative;z-index:2;flex:none;display:flex;gap:2px;padding:0 8px;background:#fff;box-shadow:0 1px 0 #e3e6eb}
.x-ph .x-tags button{flex:1;height:26px;font-size:12px;white-space:nowrap;color:#5b616e;box-shadow:none}
.x-ph .x-tags [aria-pressed=true]{color:#3b5bdb;font-weight:600;box-shadow:inset 0 -2px 0 #3b5bdb}
.x-left{flex:1;min-width:0;padding-left:6px;font-size:17px;font-weight:700}
.x-grid{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}
.x-grid .x-t{flex:none}
.x-ph .x-save{justify-self:end;height:28px;padding:0 8px;border-radius:8px;color:#3b5bdb;font-weight:600;white-space:nowrap}
.x-ph .x-save:disabled{color:#6b7280;cursor:default}
.x-field{display:flex;align-items:center;gap:8px;padding:8px 12px;border-top:1px solid #eef0f3}
.x-field span{flex:none;color:#5b616e}
.x-field input{flex:1;min-width:0;height:26px;padding:0 8px;border:0;border-radius:6px;background:#f2f4f7;color:inherit;font:inherit}
.x-big{margin:0;padding:0 12px 6px;font-size:24px;line-height:32px;font-weight:700}
@container (min-height:260px){
.x-ph{font-size:13px;line-height:18px}
.x-hero{height:120px}
.x-li{padding:8px 12px}
.x-ch{min-height:120px}
}
@media (prefers-reduced-motion:reduce){
.x-bar,.x-ic,.x-fade,.x-tb svg{transition:none}
}
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const ICON = {
  back: '<path d="m15 5-7 7 7 7"/>',
  share: '<path d="M12 15V4M8 8l4-4 4 4M5 13v6h14v-6"/>',
  more: '<path d="M5 12h.01M12 12h.01M19 12h.01"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  scan: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5M4 12h16"/>',
  read: '<path d="m4 12 5 5L20 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};
const ic = (name, label, cls = '') => `<button type="button" class="x-ic ${cls}" aria-label="${label}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[name]}</svg></button>`;
const phone = (cls, bar, body, extra = '') =>
  `<div class="x-ph ${cls}"><header class="x-bar">${bar}</header>${extra}<div class="x-body" tabindex="0" role="region" aria-label="页面内容，可滚动">${body}</div></div>`;
const rows = (list) => list.map(([a, b]) => `<p class="x-li">${a}<span>${b}</span></p>`).join('');
const onScroll = (el, fn) => {
  const body = el.querySelector('.x-body');
  body.addEventListener('scroll', () => fn(body.scrollTop, body), { passive: true });
};
const ORDERS = [['杯子套装', '待付款'], ['帆布包', '待发货'], ['台灯', '已完成'], ['收纳盒', '待发货'], ['抱枕', '已完成']];
const STORES = { 河坊街店: [['今日订单', '36'], ['待处理', '4'], ['缺货提醒', '1']], 南山路店: [['今日订单', '21'], ['待处理', '0'], ['缺货提醒', '3']], 凤起路店: [['今日订单', '58'], ['待处理', '7'], ['缺货提醒', '0']] };
const GOODS = [['保温杯', '¥ 79'], ['帆布包', '¥ 45'], ['降噪耳机', '¥ 399'], ['充电宝', '¥ 129'], ['折叠伞', '¥ 59']];
const CHAT = [['小满', '明天几点到？'], ['阿越', '文件收到了'], ['周南', '已转账']];
const NAMES = ['陈以宁', '顾南乔', '何知远', '林见山', '宋清禾', '唐一舟', '许望舒', '叶听澜'];

export default function demo(root) {
  pick(root, [
    {
      name: '叠头图',
      fit: '详情页：叠在头图上，滚走变实色',
      html: phone('x-over', `${ic('back', '返回')}<span class="x-t x-fade">云栖山居</span>${ic('share', '分享')}${ic('more', '更多')}`, `<div class="x-hero">云栖山居 · 往下滚</div>${rows([['房型', '山景大床'], ['评分', '4.9'], ['入住', '14:00 起'], ['退房', '12:00 前'], ['早餐', '含双早'], ['停车', '免费']])}`),
      init: (el) => onScroll(el, (y, body) => el.querySelector('.x-ph').classList.toggle('x-solid', y > body.querySelector('.x-hero').offsetHeight - 44)),
    },
    {
      name: '主副标题',
      fit: '阅读、聊天：标题下补一行状态',
      html: phone('x-line', `${ic('back', '返回')}<div class="x-two"><b>长夜将明</b><small role="status">第 1 章 · 共 4 章</small></div>${ic('more', '更多')}`, ['初到', '来信', '夜航', '天亮'].map((t, i) => `<section class="x-ch"><b>第 ${i + 1} 章 ${t}</b><p>往下滚动，副标题跟着换章。</p></section>`).join('')),
      init(el) {
        const sub = el.querySelector('.x-two small'), secs = [...el.querySelectorAll('.x-ch')];
        onScroll(el, (y) => {
          const n = secs.filter((s) => s.offsetTop <= y + 12).length;
          sub.textContent = `第 ${n} 章 · 共 ${secs.length} 章`;
        });
      },
    },
    {
      name: '标题切换',
      fit: '切门店、切账户：标题就是入口',
      html: phone('x-line', `${ic('back', '返回')}<button type="button" class="x-tb" aria-expanded="false" aria-label="切换门店"><span>河坊街店</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>${ic('more', '更多')}`, '<div class="x-data"></div>', `<div class="x-menu" hidden>${Object.keys(STORES).map((s, i) => `<button type="button" aria-current="${!i}">${s}</button>`).join('')}</div>`),
      init(el) {
        const tb = el.querySelector('.x-tb'), menu = el.querySelector('.x-menu'), data = el.querySelector('.x-data');
        const items = [...menu.children];
        const open = (on) => { menu.hidden = !on; tb.setAttribute('aria-expanded', String(on)); };
        const load = (name) => {
          tb.querySelector('span').textContent = name;
          data.innerHTML = rows(STORES[name]);
          items.forEach((b) => b.setAttribute('aria-current', String(b.textContent === name)));
        };
        tb.addEventListener('click', () => {
          open(menu.hidden);
          if (!menu.hidden) (items.find((b) => b.getAttribute('aria-current') === 'true')).focus();
        });
        items.forEach((b) => b.addEventListener('click', () => { load(b.textContent); open(false); tb.focus(); }));
        el.querySelector('.x-ph').addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && !menu.hidden) { open(false); tb.focus(); }
        });
        load('河坊街店');
      },
    },
    {
      name: '搜索主导',
      fit: '首页、商城：搜索是第一动作',
      html: phone('x-line', `<span class="x-city">杭州</span><input class="x-find" type="text" aria-label="搜索商品" placeholder="搜保温杯、耳机">${ic('scan', '扫一扫')}`, '<div class="x-data"></div>'),
      init(el) {
        const data = el.querySelector('.x-data'), input = el.querySelector('.x-find');
        const paint = () => {
          const q = input.value.trim(), hit = GOODS.filter(([n]) => n.includes(q));
          data.innerHTML = hit.length ? rows(hit) : '<p class="x-li">没有找到，换个词试试</p>';
        };
        input.addEventListener('input', paint);
        paint();
      },
    },
    {
      name: '加标签',
      fit: '一页分几类：顶栏下接一排标签',
      html: phone('', `${ic('back', '返回')}<span class="x-t">我的订单</span>${ic('search', '搜索')}`, '<div class="x-data"></div>', `<div class="x-tags" role="group" aria-label="订单状态">${['全部', '待付款', '待发货', '已完成'].map((t, i) => `<button type="button" aria-pressed="${!i}">${t}</button>`).join('')}</div>`),
      init(el) {
        const data = el.querySelector('.x-data'), tags = [...el.querySelectorAll('.x-tags button')];
        const go = (b) => {
          tags.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          data.innerHTML = rows(ORDERS.filter((o) => b === tags[0] || o[1] === b.textContent));
        };
        tags.forEach((b) => b.addEventListener('click', () => go(b)));
        go(tags[0]);
      },
    },
    {
      name: '左对齐',
      fit: '一级页：标题靠左，操作靠右',
      html: phone('x-line x-chat', `<span class="x-left">消息</span>${ic('read', '全部已读', 'x-all')}${ic('plus', '发起聊天')}`, CHAT.map(([a, b]) => `<p class="x-li">${a}<span>${b}</span><i aria-label="未读"></i></p>`).join('')),
      init: (el) => el.querySelector('.x-all').addEventListener('click', () => el.querySelectorAll('.x-li i').forEach((d) => d.remove())),
    },
    {
      name: '居中',
      fit: '二级页：左返回，中标题，右一个操作',
      html: phone('x-line', `<div class="x-grid" style="flex:1;align-items:center">${ic('back', '返回')}<span class="x-t">编辑资料</span><button type="button" class="x-save">保存</button></div>`, '<label class="x-field"><span>昵称</span><input type="text" value="小满"></label><label class="x-field"><span>城市</span><input type="text" value="杭州"></label>'),
      init(el) {
        const save = el.querySelector('.x-save');
        save.addEventListener('click', () => { save.disabled = true; save.textContent = '已保存'; });
        el.querySelectorAll('input').forEach((i) => i.addEventListener('input', () => { save.disabled = false; save.textContent = '保存'; }));
      },
    },
    {
      name: '折叠大标题',
      fit: '列表首页：大标题滚动收进顶栏',
      html: phone('', `<span style="width:28px"></span><span class="x-t x-fade">通讯录</span>${ic('plus', '添加')}`, `<h3 class="x-big">通讯录</h3>${NAMES.map((n) => `<p class="x-li">${n}</p>`).join('')}`),
      init: (el) => onScroll(el, (y) => el.querySelector('.x-ph').classList.toggle('x-small', y > 28)),
    },
  ], '顶栏写法');
}
</script>
