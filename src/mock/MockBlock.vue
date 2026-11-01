<script setup lang="ts">
// 示意页面里的一个区域：按 kind 以真实尺寸画出对应界面（真实文案、真实字号），外层整体缩放成缩略图。
// 颜色固定为浅色产品界面，不随网页主题变化；dark 用于深色侧栏、深色首屏、页脚等
import { computed } from 'vue';
import type { MockKind } from '../types';
import { BAR } from './infer';
import {
  ACTIVITY,
  AGENDA,
  BRAND,
  BULLETS,
  CARDS,
  CHAT,
  CODE,
  COMPARE,
  DAYS,
  FACETS,
  FAQ,
  FIELDS,
  FILTER_NAMES,
  FOOTER,
  FORM,
  FORMS,
  SECTIONS,
  HERO,
  KANBAN,
  KPIS,
  LIST,
  LOGOS,
  MODS,
  NAV,
  NOTICES,
  PLANS,
  SESSIONS,
  SET_CATS,
  SET_ROWS,
  SETTINGS,
  RESULTS,
  PRODUCT,
  CART,
  ONBOARD,
  CAL_EVENTS,
  SITE_NAV,
  STEPS,
  SWITCHES,
  TABLE_HEAD,
  TABLE_ROWS,
  TABS,
  TASKS,
  TIMELINE,
} from './scene';

// text：数据里指定的显示文案；inline：放在整条顶栏里（导航横排、不带品牌）
const props = defineProps<{
  kind: MockKind;
  label?: string;
  text?: string;
  acc?: boolean;
  dark?: boolean;
  inline?: boolean;
  center?: boolean;
  fit?: boolean;
  seed: number;
}>();
const pick = <T,>(list: readonly T[], n: number, off = 0) =>
  Array.from({ length: n }, (_, i) => list[(props.seed + off + i) % list.length]);
const kpi = computed(() => KPIS[props.seed % KPIS.length]);
const down = computed(() => kpi.value.delta.startsWith('-'));
const card = computed(() => CARDS[props.seed % CARDS.length]);
const plan = computed(
  () =>
    PLANS[
      /基础/.test(props.label ?? '')
        ? 0
        : /推荐|专业/.test(props.label ?? '')
          ? 1
          : /企业/.test(props.label ?? '')
            ? 2
            : props.seed % PLANS.length
    ],
);
// 图表数据：按 seed 稳定生成
const series = computed(() => Array.from({ length: 7 }, (_, i) => 38 + ((i * 37 + props.seed * 23) % 52)));
const linePts = computed(() => series.value.map((v, i) => `${(i * 600) / 6},${200 - v * 1.7}`).join(' '));
const title = computed(() => props.text || props.label?.replace(/[（(].*$/, '').trim() || '');
const lb = computed(() => props.label ?? '');
const rec = computed(() => TABLE_ROWS[props.seed % TABLE_ROWS.length]);
// 导航：一级模块 / 设置分类 / 官网导航 / 默认的后台侧栏分组；二级菜单和设置分类不重复画品牌
const navGroups = computed(() => {
  if (/一级|模块|展开菜单/.test(lb.value)) return [{ group: '', items: MODS }];
  if (/设置/.test(lb.value)) return [{ group: '设置', items: SETTINGS }];
  if (/二级|页面列表/.test(lb.value))
    return [
      { group: '订单中心', items: ['全部订单', '待发货', '退款售后', '发票管理'] },
      { group: '设置', items: ['订单设置', '物流模板'] },
    ];
  if (props.inline) return [{ group: '', items: SITE_NAV }];
  return NAV;
});
const navBrand = computed(() => !props.inline && !/二级|页面|设置|展开/.test(lb.value));
// 菜单树（手机抽屉里的完整菜单）：模块是父级，当前模块展开列出页面
const navTree = computed(() => /导航树|一级导航（/.test(lb.value));
// 侧栏底部的“主题 / 折叠导航”，抽屉里是“主题 / 关闭导航”
const navFoot = computed(() =>
  props.inline || /设置|一级模块|^一级导航$/.test(lb.value) ? '' : /抽屉/.test(lb.value) ? '关闭导航' : '折叠导航',
);
// 看板列头“待办 3”：名称 + 数量
const segs = computed(() =>
  /已修改/.test(lb.value)
    ? ['全部', '已修改 3']
    : /主题/.test(lb.value)
      ? ['浅色', '深色', '跟随系统']
      : /月付|年付|月 \/ 年/.test(lb.value)
        ? ['月付', '年付 · 省 20%']
        : /状态/.test(lb.value)
          ? ['待办 4', '进行 3', '验收 2', '完成']
          : /日期/.test(lb.value)
            ? ['10-24', '今天', '10-26']
            : ['今天', '昨天', '近 7 天', '近 30 天'],
);
const segOn = computed(() => (/日期/.test(lb.value) ? 1 : 0));
const colhead = computed(() => {
  const m = lb.value.match(/^(\S+)(?: (\d+))?$/);
  return { name: m?.[1] ?? lb.value, n: m?.[2] };
});
// “条”类区域（顶栏、标签栏、工具栏…）和自带外观的区域不画卡片外框
const BARE: MockKind[] = [
  'topbar',
  'tabbar',
  'hero',
  'heading',
  'image',
  'footer',
  'actions',
  'brand',
  'steps',
  'tabs',
  'toc',
  'pagehead',
  'segment',
  'button',
  'btnrow',
  'link',
  'stepitem',
  'bubble',
  'avatar',
  'logos',
  'ruler',
  'search',
  'select',
  'input',
  'filters',
  'toolbar',
  'pager',
  'composer',
  'block',
  'text',
  'linkcol',
  'row',
  'strip',
  'pricing',
  'plan',
  'kanban',
  'code',
  'title',
  'subtitle',
  'btnpair',
  'content',
  'objhead',
  'opbtns',
  'fbar',
  'colhead',
  'agenda',
  'feature',
  'mtop',
  'wordmark',
  'answer',
  'chips',
  'aitop',
  'captcha',
  'bullets',
  'chat',
  'secdesc',
  'byline',
];
const bare = computed(() => BARE.includes(props.kind));
// 条类区域放在自适应高度（auto）的行里：用 inline-size 容器，高度才能由内容撑开（size 容器的内容不撑开自身，行会塌成 0）
const barRow = computed(() => BAR.has(props.kind));
</script>

<template>
  <div
    class="blk"
    :class="[
      `k-${kind}`,
      {
        dark,
        acc,
        bare,
        barrow: barRow || fit,
        inline,
        ctr: center,
        hz: /横条/.test(lb),
        picked: /选中|点击|点进|当前|拖动/.test(lb),
      },
    ]"
  >
    <template v-if="kind === 'nav'">
      <div v-if="navBrand" class="nav-brand">
        <i class="logo">{{ BRAND.slice(0, 1) }}</i
        ><b>{{ BRAND }}</b>
      </div>
      <div v-if="navTree" class="nav-h">
        <template v-for="(m, mi) in MODS" :key="m">
          <span class="nav-i" :class="{ par: mi === 1 }"
            ><i class="ico" />{{ m }}<em class="chev">{{ mi === 1 ? '⌃' : '⌄' }}</em></span
          >
          <span
            v-for="(p, pi) in mi === 1 ? ['全部订单', '待发货', '退款售后', '发票管理'] : []"
            :key="p"
            class="nav-i sub"
            :class="{ on: pi === 1 }"
            >{{ p }}</span
          >
        </template>
      </div>
      <div v-else class="nav-h">
        <template v-for="(g, gi) in navGroups" :key="g.group">
          <p v-if="g.group" class="nav-g">{{ g.group }}</p>
          <span
            v-for="(it, ii) in g.items"
            :key="it"
            class="nav-i"
            :class="{ on: gi === 0 && ii === (g.group === '设置' ? 0 : 1) }"
            ><i class="ico" />{{ it }}</span
          >
        </template>
      </div>
      <div v-if="navFoot" class="nav-foot">
        <i class="nf-i">◐</i><span class="sp" /><span>{{ navFoot === '关闭导航' ? '✕' : '‹' }} {{ navFoot }}</span>
      </div>
    </template>

    <template v-else-if="kind === 'topbar'">
      <i v-if="/☰/.test(lb)" class="mt-i">☰</i>
      <span class="crumb"
        ><span>工作台</span><i>/</i><b>{{ text || '订单管理' }}</b></span
      >
      <span class="sp" />
      <span class="top-search">⌕ 搜索订单、客户</span>
      <i v-if="/新建/.test(lb)" class="ico-btn p">＋</i>
      <i class="ico-btn"
        ><svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" /></svg
      ></i>
      <i v-if="/设置按钮/.test(lb)" class="ico-btn on"
        ><svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 19.8 7.5v9L12 21l-7.8-4.5v-9z" />
          <circle cx="12" cy="12" r="3" /></svg></i
      ><span class="me"><i class="av">林</i><span class="me-n">林晓</span></span>
    </template>

    <template v-else-if="kind === 'tabbar'">
      <span v-for="(t, i) in ['首页', '分类', '消息', '我的']" :key="t" class="tb" :class="{ on: i === 0 }"
        ><i />{{ t }}</span
      >
    </template>

    <template v-else-if="kind === 'kpi'">
      <p class="muted">{{ kpi.label }}</p>
      <b class="big">{{ kpi.value }}</b>
      <p class="delta" :class="{ down }">{{ down ? '▼' : '▲' }} {{ kpi.delta }} <span class="muted">较昨日</span></p>
      <svg class="spark" viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true">
        <polyline :points="series.map((v, i) => `${i * 20},${30 - v / 3.4}`).join(' ')" />
      </svg>
    </template>

    <template v-else-if="kind === 'strip'">
      <span
        v-for="k in /关键数据/.test(lb)
          ? [
              ['待付款', '2'],
              ['待发货', '1'],
              ['待收货', '3'],
              ['退款 / 售后', '0'],
            ]
          : /口碑|成绩/.test(lb)
            ? [
                ['服务团队', '2,000+'],
                ['续费率', '96%'],
                ['平均评分', '4.9 / 5'],
                ['覆盖城市', '120+'],
              ]
            : [
                ['待发货', '36'],
                ['售后中', '8'],
                ['库存预警', '5'],
                ['今日退款', '¥1,260.00'],
                ['新增评价', '42'],
              ]"
        :key="k[0]"
        class="st"
        ><span class="muted">{{ k[0] }}</span
        ><b>{{ k[1] }}</b></span
      >
    </template>

    <template v-else-if="kind === 'line' || kind === 'chart'">
      <div class="card-h">
        <b>{{ text || (kind === 'line' ? '销售趋势' : '渠道分布') }}</b
        ><span v-if="!/占比/.test(lb)" class="legend"><i />本周<i class="l2" />上周</span>
      </div>
      <svg v-if="kind === 'line'" class="plot" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true">
        <line v-for="g in 4" :key="g" x1="0" x2="600" :y1="g * 50" :y2="g * 50" class="grid" />
        <polygon :points="`0,200 ${linePts} 600,200`" class="area" />
        <polyline :points="linePts" class="ln" vector-effect="non-scaling-stroke" />
      </svg>
      <!-- 占比画环形图，分布画按渠道的柱状图 -->
      <div v-else-if="/占比/.test(lb)" class="donut">
        <svg viewBox="0 0 42 42" aria-hidden="true">
          <circle cx="21" cy="21" r="15.915" class="d0" stroke-dasharray="46 54" stroke-dashoffset="25" />
          <circle cx="21" cy="21" r="15.915" class="d1" stroke-dasharray="32 68" stroke-dashoffset="-21" />
          <circle cx="21" cy="21" r="15.915" class="d2" stroke-dasharray="22 78" stroke-dashoffset="-53" />
        </svg>
        <span class="lg"
          ><span
            v-for="(c, i) in [
              ['企业客户', '46%'],
              ['个人客户', '32%'],
              ['代理商', '22%'],
            ]"
            :key="c[0]"
            ><i :class="`d${i}`" />{{ c[0] }}<b>{{ c[1] }}</b></span
          ></span
        >
      </div>
      <div v-else class="bars">
        <span v-for="(v, i) in series" :key="i" class="bar"
          ><i :style="{ height: v + '%' }" :class="{ hi: i === 4 }" /><em>{{
            ['小程序', '门店', '官网', '直播', '分销', '批发', '其他'][i]
          }}</em></span
        >
      </div>
      <div v-if="kind === 'line'" class="axis">
        <span v-for="d in DAYS" :key="d">{{ d }}</span>
      </div>
    </template>

    <template v-else-if="kind === 'table'">
      <div v-if="title && !/^(表格|明细)$/.test(title)" class="card-h">
        <b>{{ title }}</b
        ><span class="muted">共 1,284 条</span>
      </div>
      <table class="tbl">
        <thead>
          <tr>
            <th v-for="h in TABLE_HEAD" :key="h">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in TABLE_ROWS" :key="r[0]">
            <td class="mono">{{ r[0] }}</td>
            <td>{{ r[1] }}</td>
            <td class="num">{{ r[2] }}</td>
            <td>
              <span class="pill" :class="r[3][1]">{{ r[3][0] }}</span>
            </td>
            <td class="muted">{{ r[4] }}</td>
          </tr>
        </tbody>
      </table>
      <div class="cards-m">
        <div v-for="r in TABLE_ROWS.slice(0, 5)" :key="r[0]" class="cm">
          <span
            ><b>{{ r[1] }}</b
            ><span class="muted mono">{{ r[0] }}</span></span
          ><span class="cm-r"
            ><b class="num">{{ r[2] }}</b
            ><span class="pill" :class="r[3][1]">{{ r[3][0] }}</span></span
          >
        </div>
      </div>
    </template>

    <template v-else-if="kind === 'filters'">
      <span class="fld-i"><em>状态</em><span class="sel">全部</span></span>
      <span class="fld-i"><em>渠道</em><span class="sel">全部渠道</span></span>
      <span class="fld-i wide"><em>下单时间</em><span class="sel">2026-10-01 ~ 10-25</span></span>
      <span class="inp-s">⌕ 订单号 / 客户名</span>
      <span class="btn p">查询</span><span class="btn">重置</span>
    </template>

    <!-- 设置分组卡片：顶部组标题 + 说明，字段宽时两列、窄时一列，组底部保存 -->
    <template v-else-if="kind === 'form' && SECTIONS[text ?? '']">
      <div v-if="!/^字段/.test(lb)" class="sec-h">
        <b>{{ SECTIONS[text!][0] }}</b
        ><span class="muted">{{ SECTIONS[text!][1] }}</span>
      </div>
      <div class="fgrid">
        <div v-for="f in FORMS[text!]" :key="f.label" class="frow">
          <label>{{ f.label }}<i v-if="f.req">*</i></label
          ><span class="inp" :class="{ sel: f.select }">{{ f.value }}</span>
        </div>
      </div>
      <div class="frow btns"><span class="btn p">保存</span><span class="btn">取消</span></div>
    </template>
    <template v-else-if="kind === 'form'">
      <span v-if="/底部/.test(lb)" class="handle" />
      <b v-if="/^分组/.test(lb) && text" class="form-t">{{ text }}</b>
      <div v-for="f in FORMS[/属性/.test(lb) ? '属性' : (text ?? '')] ?? FORM" :key="f.label" class="frow">
        <label>{{ f.label }}<i v-if="f.req">*</i></label
        ><span class="inp" :class="{ sel: f.select, area: f.area }">{{ f.value }}</span>
      </div>
      <!-- 分组、分步和属性面板由页面底栏统一保存或自动保存，不在每组里放按钮 -->
      <div v-if="/提交/.test(lb)" class="frow btns sub">
        <span class="btn">重置</span><span class="btn p">提交</span>
      </div>
      <div v-else-if="/详情|^字段$/.test(lb)" class="frow btns">
        <span class="btn p">保存</span><span class="btn">取消</span>
      </div>
    </template>

    <template v-else-if="kind === 'input'">
      <label>{{ title || '账号' }}</label
      ><span class="inp">{{ /密码/.test(title) ? '••••••••' : '请输入' + title }}</span>
    </template>

    <template v-else-if="kind === 'composer'">
      <span class="comp"
        ><span class="muted">给 AI 发送消息，Shift + Enter 换行</span><span class="sp" /><i class="clip">＋</i
        ><i class="send">↑</i></span
      >
    </template>

    <template v-else-if="kind === 'chat'">
      <!-- 只标“回答”的区域只画 AI 的这一条（提问、追问另有区域） -->
      <div v-for="(m, i) in /回答/.test(lb) ? [CHAT[1]] : CHAT" :key="i" class="msg" :class="{ me: m.me }">
        <i v-if="!m.me" class="av ai">AI</i>
        <p>{{ m.text }}<i v-if="/流式/.test(lb)" class="caret" /></p>
      </div>
    </template>

    <template v-else-if="kind === 'bubble'"
      ><div class="msg me">
        <p>{{ CHAT[/追问/.test(lb) ? 2 : 0].text }}</p>
      </div></template
    >
    <template v-else-if="kind === 'search'"
      ><span class="inp-s full">⌕ {{ text || '搜索商品、订单、客户' }}</span></template
    >
    <template v-else-if="kind === 'select'"
      ><span class="fld-i"
        ><em>{{ /^(条件|筛选条件)$/.test(lb) ? FILTER_NAMES[seed % 3] : lb.replace(/[（(].*$/, '') }}</em
        ><span class="sel">{{ text || '全部' }}</span></span
      ></template
    >

    <template v-else-if="kind === 'hero'">
      <span v-if="/品牌/.test(lb)" class="hero-b"
        ><i class="logo">{{ BRAND.slice(0, 1) }}</i
        ><b class="bn">{{ BRAND }}</b></span
      >
      <p class="eyebrow">{{ HERO.eyebrow }}</p>
      <p class="h1">{{ HERO.title }}</p>
      <p class="sub">{{ HERO.sub }}</p>
      <p v-for="b in /品牌/.test(lb) ? BULLETS : []" :key="b" class="bl"><i>✓</i>{{ b }}</p>
      <div v-if="!/品牌|标题/.test(lb)" class="row-btn">
        <span class="btn p lg">{{ HERO.cta[0] }}</span
        ><span class="btn lg">{{ HERO.cta[1] }}</span>
      </div>
    </template>

    <template v-else-if="kind === 'title'"
      ><p class="h1">{{ HERO.title }}</p></template
    >
    <template v-else-if="kind === 'subtitle'"
      ><p class="sub">{{ HERO.sub }}</p></template
    >
    <template v-else-if="kind === 'btnpair'"
      ><span class="btn p lg">{{ HERO.cta[0] }}</span
      ><span class="btn lg">{{ HERO.cta[1] }}</span></template
    >

    <template v-else-if="kind === 'heading'">
      <p class="h2">
        {{
          text || (title && !/^(标题|区块标题|名称)/.test(title) ? title.replace(/ · .*$/, '') : '为什么选择 ' + BRAND)
        }}
      </p>
      <p v-if="/欢迎回来|^标题$/.test(title) || /登录/.test(lb)" class="muted">登录你的 {{ BRAND }} 工作台</p>
      <p v-else-if="/欢迎来到/.test(title)" class="muted">完成下面几步，就能开始用 {{ BRAND }} 管理订单。</p>
    </template>

    <template v-else-if="kind === 'image'">
      <div class="shot" :class="`tone-${seed % 3}`">
        <div class="shot-ui">
          <i class="s-side" />
          <div class="s-main">
            <i class="s-bar" />
            <div class="s-kpis"><i /><i /><i /></div>
            <i class="s-chart" />
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="kind === 'card'">
      <div class="cimg" :class="`tone-${seed % 3}`">
        <i v-if="/能力/.test(lb + (text ?? ''))" class="fi">{{ ['⇄', '◎', '▤', '◷', '⚿', '⌘', '⌂'][seed % 7] }}</i>
        <div v-if="/能力/.test(lb + (text ?? ''))" class="shot-ui mini">
          <i class="s-side" />
          <div class="s-main">
            <i class="s-bar" />
            <div class="s-kpis"><i /><i /><i /></div>
            <i class="s-chart" />
          </div>
        </div>
        <svg v-else class="photo" viewBox="0 0 48 36" aria-hidden="true">
          <circle cx="34" cy="10" r="5" />
          <path d="M0 36 L16 16 L26 27 L32 21 L48 36 Z" />
        </svg>
      </div>
      <b>{{ card.title }}</b>
      <p class="muted">{{ card.desc }}</p>
    </template>

    <template v-else-if="kind === 'list'">
      <div v-if="title && !/^(列表|记录|条目|列表页|结果列表)$/.test(title)" class="card-h">
        <b>{{ title }}</b
        ><span class="muted">查看全部</span>
      </div>
      <div v-for="(it, i) in pick(LIST, 7)" :key="i" class="li" :class="{ on: i === 1 && acc }">
        <i class="av">{{ it.name.slice(0, 1) }}</i
        ><span class="li-t"
          ><b>{{ it.name }}</b
          ><span class="muted">{{ it.desc }}</span></span
        ><span class="muted time">{{ it.time }}</span>
      </div>
    </template>

    <template v-else-if="kind === 'steps'">
      <template v-for="(st, i) in STEPS" :key="st"
        ><span class="step" :class="{ done: i === 0, cur: i === 1 }"
          ><i>{{ i === 0 ? '✓' : i + 1 }}</i
          ><span class="step-n">{{ st }}</span></span
        ><i v-if="i < STEPS.length - 1" class="step-line" :class="{ done: i === 0 }"
      /></template>
    </template>

    <template v-else-if="kind === 'stepitem'">
      <span class="step" :class="{ done: /完成/.test(label ?? ''), cur: /当前/.test(label ?? '') }"
        ><i>{{ /完成/.test(label ?? '') ? '✓' : (label ?? '').slice(0, 1) }}</i
        ><span class="step-n">{{ STEPS[Math.max(0, Number((label ?? '1').slice(0, 1)) - 1)] }}</span></span
      >
    </template>

    <template v-else-if="kind === 'tabs'"
      ><span
        v-for="(t, i) in text?.includes('|')
          ? text.split('|')
          : /设置/.test(lb)
            ? SETTINGS
            : /页内/.test(lb)
              ? ['全部订单', '待发货', '已发货', '售后']
              : /分类/.test(lb)
                ? ['全部', '订单', '客户', '系统', '公告']
                : TABS"
        :key="t"
        class="tab"
        :class="{ on: i === 0 }"
        >{{ t }}</span
      ></template
    >

    <template v-else-if="kind === 'toc'">
      <p class="muted">
        {{
          text?.includes('|')
            ? text.split('|')[0]
            : /锚点|横条/.test(lb)
              ? '本页目录'
              : /设置/.test(lb)
                ? '设置分组'
                : '文档大纲'
        }}
      </p>
      <span
        v-for="(t, i) in text?.includes('|')
          ? text.split('|').slice(1)
          : /设置/.test(lb)
            ? ['常规', '订单', '库存', '支付', '通知', '高级']
            : /锚点|横条/.test(lb)
              ? ['基本信息', '联系方式', '结算信息', '发票信息', '附件']
              : ['概览', '订单与销售', '客户与复购', '华南区物流', '下月计划']"
        :key="t"
        class="toc-i"
        :class="{ on: i === 1 }"
        >{{ t }}</span
      >
    </template>

    <template v-else-if="kind === 'actions'"
      ><span class="btn p">保存</span><span class="btn">取消</span><span class="sp" /><span class="muted"
        >已自动保存 · 14:32</span
      ></template
    >
    <template v-else-if="kind === 'button'"
      ><span
        class="btn"
        :class="{
          p: !/次按钮|上一步|联系|退出/.test(lb),
          lg: !inline,
          full: /^(登录|注册|退出)/.test(lb),
          danger: /退出/.test(lb),
        }"
        >{{
          text ||
          (/^(＋ )?(登录|注册|下一步|上一步|新建|退出)/.test(title)
            ? title.replace(/^＋\s*/, '')
            : /次按钮/.test(lb)
              ? HERO.cta[1]
              : HERO.cta[0])
        }}</span
      ></template
    >
    <template v-else-if="kind === 'btnrow'"
      ><span class="btn lg">企业微信登录</span><span class="btn lg">手机验证码</span></template
    >
    <template v-else-if="kind === 'link'"
      ><span class="muted">还没有账号？</span
      ><b class="a">{{ /注册/.test(title) ? '立即注册' : '免费注册' }}</b></template
    >

    <template v-else-if="kind === 'pricing'">
      <div v-for="(p, i) in PLANS" :key="p.name" class="plan" :class="{ hi: i === 1 }">
        <b>{{ p.name }}</b>
        <p class="price">
          {{ p.price }}<small>{{ p.unit }}</small>
        </p>
        <p v-for="f in p.feats" :key="f" class="feat">✓ {{ f }}</p>
        <span class="btn" :class="{ p: i === 1 }">选择{{ p.name }}</span>
      </div>
    </template>
    <template v-else-if="kind === 'plan'">
      <div class="plan one" :class="{ hi: acc }">
        <b>{{ plan.name }}<span v-if="acc" class="pill info rec">推荐</span></b>
        <p class="price">
          {{ plan.price }}<small>{{ plan.unit }}</small>
        </p>
        <p v-for="f in plan.feats" :key="f" class="feat">✓ {{ f }}</p>
        <span class="btn" :class="{ p: acc }">选择{{ plan.name }}</span>
      </div>
    </template>

    <template v-else-if="kind === 'faq'">
      <div v-for="(q, i) in FAQ" :key="q" class="q">
        <span class="q-h"
          ><b>{{ q }}</b
          ><i>{{ i === 0 ? '−' : '+' }}</i></span
        >
        <p v-if="i === 0" class="muted">新注册账号可免费试用全部功能 14 天，到期后自动转为基础版，数据不会丢失。</p>
      </div>
    </template>
    <template v-else-if="kind === 'row'">
      <span class="q-h one"
        ><b>{{
          /问题/.test(lb)
            ? /[－-]$/.test(lb)
              ? FAQ[0]
              : FAQ[(seed % (FAQ.length - 1)) + 1]
            : lb.replace(/\s*[＋－+-]$/, '')
        }}</b
        ><i>{{ /[－-]$/.test(label ?? '') ? '−' : '+' }}</i></span
      >
    </template>

    <template v-else-if="kind === 'logos'"
      ><span v-for="n in LOGOS" :key="n" class="logo-w">{{ n }}</span></template
    >
    <template v-else-if="kind === 'quote'">
      <span class="qm">“</span><span class="stars">★★★★★</span>
      <p class="qt">
        {{
          [
            '上线两周，月底对账从三天缩短到半天。',
            '库存再也没有超卖过，客服压力小了很多。',
            '每天早上的经营日报，是我打开的第一个页面。',
          ][seed % 3]
        }}{{
          [
            '以前每个月底要三个人对三天账，现在系统自动核对，差异一眼就能看到。',
            '多个渠道的库存实时同步，促销期间也没再出现超卖和补单。',
            '昨天的销售、退款和异常订单都在一页上，开晨会不用再临时拉表。',
          ][seed % 3]
        }}
      </p>
      <span class="who"
        ><i class="av">{{ ['林', '周', '许'][seed % 3] }}</i
        ><span
          ><b>{{ ['林晓', '周以宁', '许然'][seed % 3] }}</b
          ><span class="muted">{{ ['运营负责人', '店长', '创始人'][seed % 3] }}</span></span
        ></span
      >
    </template>

    <template v-else-if="kind === 'footer' && !/页脚/.test(lb)"
      ><p class="ft-b only">© 2026 {{ BRAND }} · 隐私政策 · 服务条款 · 浙 ICP 备 0000000 号</p></template
    >
    <template v-else-if="kind === 'footer'">
      <div class="ft-cols">
        <div v-for="c in FOOTER" :key="c.title" class="ft-c">
          <b>{{ c.title }}</b
          ><span v-for="l in c.links" :key="l">{{ l }}</span>
        </div>
      </div>
      <p class="ft-b">© 2026 {{ BRAND }} · 隐私政策 · 服务条款 · 浙 ICP 备 0000000 号</p>
    </template>
    <template v-else-if="kind === 'linkcol'"
      ><b>{{ title }}</b
      ><span v-for="l in (FOOTER.find((c) => c.title === title) ?? FOOTER[seed % 4]).links" :key="l" class="lk">{{
        l
      }}</span></template
    >

    <template v-else-if="kind === 'cta'"
      ><div class="cta-t">
        <p class="h2">{{ text?.split('|')[0] || '准备好开始了吗？' }}</p>
        <p>{{ text?.split('|')[1] || '14 天免费试用，无需绑定银行卡。' }}</p>
      </div>
      <span class="btn p lg">{{ text?.split('|')[2] || '免费试用' }}</span></template
    >
    <template v-else-if="kind === 'code'">
      <pre class="code"><span v-for="(l, i) in CODE" :key="i" :class="`c${i % 3}`">{{ l }}<br></span></pre>
    </template>

    <template v-else-if="kind === 'profile'">
      <div class="pf">
        <i class="av xl">林</i><span><b>林晓</b><span class="muted">运营负责人 · 杭州</span></span>
      </div>
      <div class="pf-s">
        <span><b>128</b><em>订单</em></span
        ><span><b>36</b><em>收藏</em></span
        ><span><b>4.9</b><em>评分</em></span>
      </div>
    </template>
    <template v-else-if="kind === 'avatar' && /泳道/.test(lb)"
      ><span class="me"
        ><i class="av">{{ TIMELINE[seed % TIMELINE.length].slice(0, 1) }}</i
        ><span>{{ TIMELINE[seed % TIMELINE.length] }}</span></span
      ></template
    >
    <template v-else-if="kind === 'avatar'"
      ><span class="me"><i class="av">林</i><span class="me-n">林晓</span></span></template
    >

    <template v-else-if="kind === 'notice'">
      <div class="card-h">
        <b>{{ title && !/待办|窄栏/.test(title) ? title : '平台公告' }}</b
        ><span class="muted">全部</span>
      </div>
      <p v-for="(n, i) in NOTICES" :key="i" class="nt">
        <span class="pill" :class="i === 0 ? 'danger' : i === 2 ? 'warn' : 'info'">{{ n.tag }}</span
        ><span class="nt-x">{{ n.text }}</span>
      </p>
    </template>

    <template v-else-if="kind === 'timeline'">
      <div v-for="(p, i) in TIMELINE.slice(0, 4)" :key="p" class="lane">
        <span class="lane-n">{{ p }}</span
        ><span class="track"
          ><i
            class="seg"
            :class="`t${i % 3}`"
            :style="{ left: ((i * 13) % 40) + '%', width: 24 + ((i * 17) % 30) + '%' }"
            >{{ ['对账', '发货排期', '客户回访', '月报'][i] }}</i
          ></span
        >
      </div>
    </template>
    <template v-else-if="kind === 'event'"
      ><b>{{ ['十月对账', '发货排期', '客户回访', '经营月报'][seed % 4] }}</b
      ><span class="muted"
        >{{ ['3 天', '2 天', '4 天'][seed % 3] }} · {{ ['进行中', '未开始', '已完成'][seed % 3] }}</span
      ></template
    >
    <template v-else-if="kind === 'ruler'"
      ><span v-for="d in ['10-21', '10-22', '10-23', '10-24', '10-25', '10-26', '10-27']" :key="d">{{
        d
      }}</span></template
    >

    <template v-else-if="kind === 'kanban'">
      <div v-for="c in KANBAN" :key="c.title" class="kc">
        <b
          >{{ c.title }} <em>{{ c.cards.length }}</em></b
        ><span v-for="t in c.cards" :key="t" class="kcard">{{ t }}</span>
      </div>
    </template>

    <!-- 接入文档的正文 -->
    <template v-else-if="kind === 'text' && /快速开始/.test(text ?? '')">
      <b class="tx-t">{{ text }}</b>
      <span class="muted tx-m">更新于 2026-10-20 · 约 5 分钟</span>
      <p class="tx">用开放接口把订单同步到你自己的系统。下面三步完成后，就能收到第一笔订单的回调。</p>
      <b class="tx-h">1. 安装依赖</b>
      <p class="tx">支持 Node.js 18 以上和 Python 3.9 以上。也可以不装 SDK，直接用 HTTP 请求。</p>
      <b class="tx-h">2. 配置密钥</b>
      <ul class="tx-l">
        <li>在“设置 › 开放接口”新建密钥，只在创建时显示一次</li>
        <li>把密钥放进环境变量，不要写进代码仓库</li>
        <li>测试环境和正式环境的密钥分开</li>
      </ul>
      <b class="tx-h">3. 发送第一个请求</b>
    </template>
    <template v-else-if="kind === 'text'">
      <b v-if="text" class="tx-t">{{ text }}</b>
      <span v-if="text" class="muted tx-m">林晓 · 10 月 25 日编辑 · 团队成员可见</span>
      <b v-if="text" class="tx-h">一、订单与销售</b>
      <p class="tx">本月共处理订单 3,826 笔，较上月增长 6.1%。其中复购订单占比 42%，客单价保持在 ¥336 左右。</p>
      <ul v-if="text" class="tx-l">
        <li>小程序订单占比 46%，首次超过门店</li>
        <li>退款率 1.2%，比上月下降 0.4 个百分点</li>
        <li>超过 48 小时未发货的订单 12 笔，集中在华南仓</li>
      </ul>
      <b v-if="text" class="tx-h">二、客户与复购</b>
      <p class="tx">
        华南区受物流影响，平均发货时长增加 0.6 天；建议本周优先处理积压的 12 笔超时订单，并同步通知相关客户。
      </p>
      <p class="tx">下月重点：上线客户分层运营，针对高价值客户推送专属权益，目标复购率提升到 45%。</p>
    </template>

    <template v-else-if="kind === 'brand'"
      ><i class="logo">{{ BRAND.slice(0, 1) }}</i
      ><b class="bn">{{ BRAND }}</b
      ><template v-if="/导航/.test(label ?? '')"
        ><span class="sp" /><span v-for="n in SITE_NAV.slice(0, 4)" :key="n" class="muted sn">{{ n }}</span></template
      ><template v-if="/☰/.test(lb)"><span class="sp" /><i class="mt-i">☰</i></template
      ><span v-if="/联系/.test(label ?? '')" class="contact"
        ><span>400-820-0000</span><span>hello@example.com</span><span>杭州市西湖区文三路 90 号</span></span
      ></template
    >

    <template v-else-if="kind === 'toolbar' && /版本/.test(lb)"
      ><b>订单看板.html</b><span class="pill info">v3</span><span class="sp" /><span class="btn sm">复制</span
      ><span class="btn sm">下载</span><span class="btn sm">全屏</span></template
    >
    <template v-else-if="kind === 'toolbar' && /^工具栏$/.test(lb)"
      ><span class="btn sm">↶</span><span class="btn sm">↷</span><span class="tsep" /><span class="btn sm">正文 ⌄</span
      ><span class="btn sm"><b>B</b></span
      ><span class="btn sm"><i>I</i></span
      ><span class="btn sm">插入 ⌄</span><span class="sp" /><span class="muted">已保存</span
      ><span class="btn sm p">分享</span></template
    >
    <template v-else-if="kind === 'toolbar'"
      ><span class="btn sm">批量操作</span><span class="btn sm">导出</span><span class="btn sm">列设置</span
      ><span class="sp" /><span class="muted">已选 0 项</span></template
    >
    <template v-else-if="kind === 'pager'"
      ><span class="muted">共 1,284 条</span><span class="sp" /><span
        v-for="(p, i) in ['‹', '1', '2', '3', '…', '65', '›']"
        :key="i"
        class="pg"
        :class="{ on: i === 1 }"
        >{{ p }}</span
      ></template
    >
    <template v-else-if="kind === 'danger'"
      ><span><b>删除工作区</b><span class="muted">删除后所有订单和客户数据都无法恢复</span></span
      ><span class="btn danger">删除工作区</span></template
    >
    <template v-else-if="kind === 'segment'"
      ><span class="segs"
        ><span v-for="(t, i) in segs" :key="t" class="sg" :class="{ on: i === segOn }">{{ t }}</span></span
      ></template
    >
    <template v-else-if="kind === 'pagehead'"
      ><span class="ph-t"
        ><p class="h3">订单管理</p>
        <span class="muted">共 1,284 笔订单，今日新增 36 笔</span></span
      ><span class="sp" /><span class="btn">导出</span><span class="btn p">＋ 新建订单</span></template
    >
    <template v-else-if="kind === 'cell'"
      ><b v-if="text?.includes('|')" class="cl-h">{{ text.split('|')[0] }}</b
      ><span
        v-for="c in text?.includes('|')
          ? text.split('|').slice(1)
          : text === '账户'
            ? ['账号与安全', '消息通知', '隐私设置', '关于我们']
            : ['我的订单', '收货地址', '优惠券', '联系客服']"
        :key="c"
        class="cl"
        >{{ c }}<em>›</em></span
      ></template
    >
    <template v-else-if="kind === 'empty'"
      ><i class="ebox" /><b>还没有内容</b><span class="muted">拖动卡片到这里</span></template
    >

    <!-- 通用页面内容：宽时标题行 + 指标 + 表格，窄时标题 + 两个指标 + 卡片列表 -->
    <template v-else-if="kind === 'content'">
      <MockBlock v-if="!/整宽/.test(lb)" kind="pagehead" :seed="seed" />
      <div class="ct-k"><MockBlock v-for="i in 4" :key="i" kind="kpi" :seed="seed + i" /></div>
      <MockBlock kind="table" :seed="seed" class="ct-t" />
    </template>
    <template v-else-if="kind === 'field'"
      ><div v-for="f in FIELDS" :key="f[0]" class="fv">
        <em>{{ f[0] }}</em
        ><span>{{ f[1] }}</span>
      </div></template
    >
    <template v-else-if="kind === 'objhead'">
      <span class="oh"
        ><span class="oh-t"
          ><b>{{ text || 'SO-20931' }}</b
          ><span class="pill ok">已发货</span></span
        ><span class="muted">林知科技 · 创建于 10-25 14:32 · 负责人 林晓</span></span
      >
      <template v-if="/操作/.test(lb)"
        ><span class="sp" /><span class="btn">更多</span><span class="btn p">编辑</span></template
      >
    </template>
    <template v-else-if="kind === 'opbtns'">
      <template v-if="/查询/.test(lb)"><span class="btn p">查询</span><span class="btn">重置</span></template>
      <template v-else-if="/购买/.test(lb)"
        ><span class="icn">☆<em>收藏</em></span
        ><span class="icn">◌<em>客服</em></span
        ><span class="btn lg">加入购物车</span><span class="btn p lg">立即购买</span></template
      >
      <template v-else-if="/底部|主操作/.test(lb)"
        ><span class="btn lg">联系客户</span><span class="btn p lg">{{ text || '确认发货' }}</span></template
      >
      <template v-else><span class="btn">更多</span><span class="btn p">编辑</span></template>
    </template>
    <template v-else-if="kind === 'record'">
      <span class="rc-l"
        ><b>{{ rec[1] }}</b
        ><span class="muted mono">{{ rec[0] }}</span></span
      >
      <span class="rc-r"
        ><b class="num">{{ rec[2] }}</b
        ><span class="pill" :class="rec[3][1]">{{ rec[3][0] }}</span></span
      >
      <span class="rc-m muted">下单 {{ rec[4] }} · {{ ['小程序', '门店', '官网'][seed % 3] }}</span>
    </template>
    <template v-else-if="kind === 'fbar'">
      <span v-for="(c, i) in ['全部', '待发货', '已发货']" :key="c" class="chip" :class="{ on: i === 0 }">{{ c }}</span
      ><span class="sp" /> <span class="btn sm">筛选 · 2</span><span v-if="/排序/.test(lb)" class="btn sm">最新 ⌄</span>
    </template>
    <template v-else-if="kind === 'chips'">
      <span class="chip x">状态：待发货 ×</span><span class="chip x">渠道：小程序 ×</span><b class="a sm">清空</b
      ><span class="sp" /><span class="muted">共 128 条</span><span class="btn sm">最新 ⌄</span>
    </template>
    <template v-else-if="kind === 'facets'">
      <span v-if="/面板/.test(lb)" class="handle" />
      <div class="fc-h"><b>筛选</b><span class="muted">已选 2 项</span></div>
      <div v-for="g in FACETS" :key="g.name" class="fc-g">
        <em>{{ g.name }}</em
        ><span v-for="o in g.opts" :key="o[0]" class="ck" :class="{ on: o[1] }"><i />{{ o[0] }}</span>
      </div>
      <div class="fc-g">
        <em>金额</em><span class="rng"><span class="inp">¥ 最低</span>—<span class="inp">¥ 最高</span></span>
      </div>
      <div v-if="/面板/.test(lb)" class="fc-b">
        <span class="btn lg">重置</span><span class="btn p lg">查看 128 个结果</span>
      </div>
    </template>
    <template v-else-if="kind === 'activity'">
      <div class="card-h"><b>操作记录</b><span class="muted">全部</span></div>
      <div v-for="(a, i) in ACTIVITY" :key="i" class="act">
        <i class="act-d" :class="{ on: i === 0 }" /><span class="act-t"
          ><span
            ><b>{{ a[0] }}</b> {{ a[1] }}</span
          ><span class="muted">{{ a[2] }}</span></span
        >
      </div>
    </template>
    <template v-else-if="kind === 'switches'">
      <div v-if="SECTIONS[text ?? ''] && !/^开关/.test(lb)" class="sec-h">
        <b>{{ SECTIONS[text!][0] }}</b
        ><span class="muted">{{ SECTIONS[text!][1] }}</span>
      </div>
      <div v-for="w in SWITCHES" :key="w[0]" class="sw">
        <span class="sw-t"
          ><b>{{ w[0] }}</b
          ><span class="muted">{{ w[1] }}</span></span
        ><i class="tg" :class="{ on: w[2] }" />
      </div>
    </template>
    <template v-else-if="kind === 'colhead'"
      ><b>{{ colhead.name }}</b
      ><em v-if="colhead.n" class="cnt">{{ colhead.n }}</em
      ><span class="sp" /><i v-if="!/上午|下午|资源/.test(lb)" class="add">＋</i></template
    >
    <template v-else-if="kind === 'task'">
      <b>{{ TASKS[seed % TASKS.length] }}</b>
      <span class="tk-f"
        ><span class="pill" :class="['info', 'warn', 'ok'][seed % 3]">{{ ['订单', '客户', '财务'][seed % 3] }}</span
        ><span class="sp" /><span class="muted">10-{{ 26 + (seed % 4) }}</span
        ><i class="av sm">{{ ['林', '王', '张'][seed % 3] }}</i></span
      >
    </template>
    <template v-else-if="kind === 'agenda'">
      <div v-for="a in AGENDA[text || '上午']" :key="a[0]" class="ag">
        <span class="ag-t">{{ a[0] }}</span
        ><span class="ag-c"
          ><b>{{ a[1] }}</b
          ><span class="muted">{{ a[2] }} · 1 小时</span></span
        >
      </div>
    </template>
    <template v-else-if="kind === 'feature'">
      <p class="eyebrow">{{ ['自动化', '增长', '协作', '洞察', '安全', '集成'][seed % 6] }}</p>
      <p class="h2">{{ CARDS[seed % CARDS.length].title }}</p>
      <p class="sub">{{ CARDS[seed % CARDS.length].desc }}</p>
      <b class="a">了解更多 →</b>
    </template>
    <template v-else-if="kind === 'mtop'"
      ><i class="mt-i">{{ /‹/.test(lb) ? '‹' : /☰/.test(lb) ? '☰' : '' }}</i
      ><b>{{ text || '首页' }}</b
      ><i class="mt-i">⋯</i></template
    >
    <template v-else-if="kind === 'aitop'"
      ><b>{{ text || BRAND + ' 助手' }}</b
      ><span class="mdl">快速模型 ⌄</span><span class="sp" /><span class="btn sm">分享</span></template
    >
    <template v-else-if="kind === 'session'"
      ><b>{{ /当前/.test(lb) ? SESSIONS[0] : SESSIONS[1 + (seed % 3)] }}</b
      ><span class="muted">{{
        /当前/.test(lb) ? '刚刚' : /待确认/.test(lb) ? '等待你确认' : ['昨天', '10-22', '10-20'][seed % 3]
      }}</span
      ><i v-if="/•/.test(lb)" class="dot"
    /></template>
    <template v-else-if="kind === 'artcard'">
      <div class="shot tone-0">
        <div class="shot-ui">
          <i class="s-side" />
          <div class="s-main">
            <i class="s-bar" />
            <div class="s-kpis"><i /><i /><i /></div>
            <i class="s-chart" />
          </div>
        </div>
      </div>
      <div class="af">
        <span><b>订单看板.html</b><span class="muted">v3 · 刚刚生成</span></span
        ><span class="btn sm">打开</span>
      </div>
    </template>
    <template v-else-if="kind === 'compare'">
      <table class="tbl">
        <thead>
          <tr>
            <th>功能</th>
            <th v-for="p in PLANS" :key="p.name">{{ p.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in COMPARE" :key="r[0]">
            <td>{{ r[0] }}</td>
            <td v-for="(c, i) in r.slice(1)" :key="i" class="cmp" :class="{ y: c === '✓' }">{{ c }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else-if="kind === 'wordmark'"
      ><span class="logo-w">{{ LOGOS[seed % LOGOS.length] }}</span></template
    >
    <template v-else-if="kind === 'answer'"
      ><p class="ans">
        新注册账号可免费试用全部功能 14
        天，到期后自动转为基础版，数据不会丢失。试用期间可以随时邀请同事加入，升级后数据和设置全部保留。
      </p></template
    >
    <template v-else-if="kind === 'captcha'"
      ><span class="cap"><i class="cap-k">››</i><span class="muted">向右拖动滑块完成验证</span></span></template
    >
    <template v-else-if="kind === 'bullets'"
      ><p v-for="b in BULLETS" :key="b" class="bl"><i>✓</i>{{ b }}</p></template
    >

    <!-- 设置页：分类卡片列表、入口卡片、分组说明、可搜索的设置项、弹窗标题、界面设置 -->
    <template v-else-if="kind === 'catlist'">
      <div v-for="(c, i) in SET_CATS.slice(0, /4/.test(lb) ? 4 : 3)" :key="c[0]" class="cat" :class="{ on: i === 0 }">
        <span class="cat-t"
          ><b>{{ c[0] }}</b
          ><span class="muted">{{ c[1] }}</span></span
        ><svg class="hex" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5 20.5 7.4v9.2L12 21.5 3.5 16.6V7.4z" />
          <circle cx="12" cy="12" r="3.4" />
        </svg>
      </div>
    </template>
    <template v-else-if="kind === 'catcard'">
      <template v-if="text?.includes('|')"
        ><i class="cc-ic"
          ><svg class="hex" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5 20.5 7.4v9.2L12 21.5 3.5 16.6V7.4z" />
            <circle cx="12" cy="12" r="3.4" /></svg></i
        ><b>{{ text.split('|')[0] }}</b
        ><span class="muted">{{ text.split('|')[1] }}</span
        ><span class="cc-f"
          ><span class="muted">{{ text.split('|')[2] }}</span
          ><em>›</em></span
        ></template
      >
      <template v-else
        ><i class="cc-ic"
          ><svg class="hex" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5 20.5 7.4v9.2L12 21.5 3.5 16.6V7.4z" />
            <circle cx="12" cy="12" r="3.4" /></svg></i
        ><b>{{ SET_CATS[seed % SET_CATS.length][0] }}</b
        ><span class="muted">{{ SET_CATS[seed % SET_CATS.length][1] }}</span>
        <span class="cc-f"
          ><span class="muted">{{ SET_CATS[seed % SET_CATS.length][2] }} 项设置</span><em>›</em></span
        ></template
      >
    </template>
    <template v-else-if="kind === 'secdesc'"
      ><b class="sd-t">{{ SECTIONS[text ?? '']?.[0] ?? text }}</b
      ><span class="muted">{{ SECTIONS[text ?? '']?.[1] }}</span></template
    >
    <template v-else-if="kind === 'setrows'">
      <div v-for="r in SET_ROWS" :key="r.path[1]" class="srow" :class="{ mod: r.mod }">
        <span class="sr-t"
          ><b
            ><span class="muted">{{ r.path[0] }} › </span>{{ r.path[1] }}</b
          ><span class="muted">{{ r.desc }}</span
          ><em v-if="r.mod" class="sr-m">已修改 · <u>恢复默认</u></em></span
        >
        <i v-if="r.ctl === 'toggle'" class="tg" :class="{ on: r.val }" /><span
          v-else
          class="inp sr-c"
          :class="{ sel: r.ctl === 'select' }"
          >{{ r.val }}</span
        >
      </div>
    </template>
    <template v-else-if="kind === 'dlghead'"
      ><b>{{ text || '设置' }}</b
      ><span class="sp" /><i class="mt-i">✕</i></template
    >
    <template v-else-if="kind === 'prefs'">
      <p class="pf-h">主题</p>
      <span class="segs"
        ><span v-for="(t, i) in ['浅色', '深色', '跟随系统']" :key="t" class="sg" :class="{ on: i === 0 }">{{
          t
        }}</span></span
      >
      <span class="dots"
        ><i
          v-for="(c, i) in ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#0f172a']"
          :key="c"
          :style="{ background: c }"
          :class="{ on: i === 0 }"
      /></span>
      <p class="pf-h">布局</p>
      <span class="lps"
        ><span v-for="(n, i) in ['侧边栏', '顶部导航', '综合']" :key="n" class="lp" :class="{ on: i === 0 }"
          ><i class="lp-m" :class="`v${i}`"><span class="a1" /><span class="a2" /></i><em>{{ n }}</em></span
        ></span
      >
      <p class="pf-h">其他</p>
      <div v-for="(w, i) in ['折叠侧栏', '顶部菜单居中', '页面切换动画']" :key="w" class="sw">
        <span class="sw-t"
          ><b>{{ w }}</b></span
        ><i class="tg" :class="{ on: i > 0 }" />
      </div>
      <div class="pf-f">
        <span class="muted">改动立即生效</span><span class="sp" /><span class="btn">恢复默认</span>
      </div>
    </template>

    <!-- 内容页与电商：搜索结果、商品图集、购买区、收货地址、选项卡片、订单汇总、吸底结算、帮助中心头图、新手任务、月历 -->
    <template v-else-if="kind === 'results'">
      <p class="rs-n muted">找到 128 条与“<b>收货地址</b>”相关的结果 · 用时 0.08 秒</p>
      <div v-for="r in RESULTS" :key="r.title" class="rs">
        <span class="rs-p muted"
          ><span class="pill info">{{ r.tag }}</span
          >{{ r.path }}</span
        ><b class="rs-t">{{ r.title }}</b
        ><span class="rs-s">{{ r.snip }}</span>
      </div>
    </template>
    <template v-else-if="kind === 'gallery'">
      <div class="gl-m">
        <svg class="photo" viewBox="0 0 48 36" aria-hidden="true">
          <circle cx="34" cy="10" r="5" />
          <path d="M0 36 L16 16 L26 27 L32 21 L48 36 Z" /></svg
        ><span class="gl-c">1 / 6</span>
      </div>
      <div class="gl-t"><i v-for="n in 5" :key="n" :class="['tone-' + (n % 3), { on: n === 1 }]" /></div>
    </template>
    <template v-else-if="kind === 'buybox'">
      <b class="bb-n">{{ PRODUCT.name }}</b>
      <span class="bb-r muted">★ {{ PRODUCT.rate }} · {{ PRODUCT.sold }}</span>
      <div class="bb-p">
        <b>{{ PRODUCT.price }}</b
        ><s class="muted">{{ PRODUCT.was }}</s
        ><span class="pill danger">限时 8 折</span>
      </div>
      <div v-for="sp in PRODUCT.specs" :key="sp[0]" class="bb-s">
        <em>{{ sp[0] }}</em
        ><span v-for="(o, i) in sp[1]" :key="o" class="ck" :class="{ on: i === sp[2] }">{{ o }}</span>
      </div>
      <div class="bb-s">
        <em>数量</em><span class="qty"><i>−</i><b>1</b><i>＋</i></span
        ><span class="muted">库存 86 件</span>
      </div>
      <div class="bb-b"><span class="btn lg">加入购物车</span><span class="btn p lg">立即购买</span></div>
      <span class="bb-d muted">杭州发货 · 预计明天送达 · 7 天无理由退换</span>
    </template>
    <template v-else-if="kind === 'addr'"
      ><span class="ad-t"
        ><b>林晓　138 0571 6620</b><span class="muted">浙江省杭州市西湖区文三路 90 号 MyPrompts 大厦 12 楼</span></span
      ><span class="a sm">修改</span></template
    >
    <template v-else-if="kind === 'radiocards'">
      <b class="rc-h">{{ /支付/.test(lb) ? '支付方式' : '配送方式' }}</b>
      <div class="rcs">
        <span
          v-for="(o, i) in /支付/.test(lb)
            ? [
                ['微信支付', ''],
                ['支付宝', ''],
                ['对公转账', '1–3 个工作日到账'],
              ]
            : [
                ['标准快递', '免运费 · 2–3 天'],
                ['次日达', '¥12.00 · 明天送达'],
                ['到店自提', '免费 · 文三路门店'],
              ]"
          :key="o[0]"
          class="rcd"
          :class="{ on: i === 0 }"
          ><i class="rd" /><span
            ><b>{{ o[0] }}</b
            ><span v-if="o[1]" class="muted">{{ o[1] }}</span></span
          ></span
        >
      </div>
    </template>
    <template v-else-if="kind === 'summary'">
      <b class="sm-h">订单汇总</b>
      <div v-for="c in CART" :key="c[0]" class="sm-r">
        <span>{{ c[0] }}</span
        ><span class="muted">{{ c[1] }}</span>
      </div>
      <div class="sm-r tl"><span>商品合计</span><span>¥444.00</span></div>
      <div class="sm-r"><span>运费</span><span>¥0.00</span></div>
      <div class="sm-r"><span>优惠券</span><span class="dn">−¥30.00</span></div>
      <div class="sm-r tt"><b>应付</b><b>¥414.00</b></div>
      <span class="btn p lg">提交订单</span>
      <span class="muted sm-n">提交即表示同意《服务协议》</span>
    </template>
    <template v-else-if="kind === 'paybar'"
      ><span class="pb-t"><span class="muted">应付</span><b>¥414.00</b></span
      ><span class="sp" /><span class="btn p lg">{{ text || '提交订单' }}</span></template
    >
    <template v-else-if="kind === 'searchhero'"
      ><p class="h2">{{ text || '有什么可以帮你？' }}</p>
      <span class="inp-s sh-i">⌕ 搜索问题，例如“修改收货地址”</span
      ><span class="muted sh-k">热门：批量发货 · 开发票 · 导入订单 · 退款</span></template
    >
    <template v-else-if="kind === 'checklist'">
      <div class="ob-h"><b>开始使用 MyPrompts</b><span class="muted">已完成 2 / 5</span></div>
      <span class="ob-bar"><i /></span>
      <div v-for="(o, i) in ONBOARD" :key="o[0]" class="ob" :class="{ done: o[2], cur: i === 2 }">
        <i class="ob-c">{{ o[2] ? '✓' : i + 1 }}</i
        ><span class="ob-t"
          ><b>{{ o[0] }}</b
          ><span class="muted">{{ o[1] }}</span></span
        ><span v-if="i === 2" class="btn p">去导入</span><span v-else-if="!o[2]" class="muted ob-l">稍后</span>
      </div>
    </template>
    <template v-else-if="kind === 'byline'"
      ><i class="av">林</i
      ><span class="by-t"><b>林晓</b><span class="muted">运营负责人 · 2026-10-25 · 阅读约 6 分钟</span></span
      ><span class="sp" /><span class="btn sm">分享</span></template
    >
    <template v-else-if="kind === 'calendar'">
      <div class="cal-h">
        <b>2026 年 10 月</b><span class="pg">‹</span><span class="pg">›</span><span class="btn sm">今天</span
        ><span class="sp" /><span class="segs"
          ><span v-for="(t, i) in ['月', '周', '日']" :key="t" class="sg" :class="{ on: i === 0 }">{{ t }}</span></span
        >
      </div>
      <div class="cal-g">
        <span v-for="w in ['一', '二', '三', '四', '五', '六', '日']" :key="w" class="cal-w">周{{ w }}</span
        ><span v-for="d in 35" :key="d" class="cal-d" :class="{ out: d - 3 < 1 || d - 3 > 31, today: d - 3 === 25 }"
          ><em>{{ d - 3 < 1 ? 27 + d : d - 3 > 31 ? d - 34 : d - 3 }}</em
          ><i v-for="ev in CAL_EVENTS[d - 3] ?? []" :key="ev[0]" :class="`t${ev[1]}`">{{ ev[0] }}</i></span
        >
      </div>
    </template>

    <template v-else
      ><span class="solo">{{ label }}</span></template
    >
  </div>
</template>

<style scoped>
/* 真实尺寸的浅色产品界面配色 */
.blk {
  --ink: #111827;
  --text: #374151;
  --mute: #6b7280;
  --line: #e5e7eb;
  --line2: #f0f2f5;
  --surf: #fff;
  --acc: #2563eb;
  --acc-soft: #eef3ff;
  --ok-bg: #dcfce7;
  --ok: #15803d;
  --warn-bg: #fef3c7;
  --warn: #b45309;
  --dan-bg: #fee2e2;
  --dan: #b91c1c;
  --info-bg: #e0ecff;
  --info: #1d4ed8;
  container-type: size;
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  background: var(--surf);
  border: 1px solid var(--line);
  color: var(--text);
  font:
    14px/22px system-ui,
    -apple-system,
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
  font-variant-numeric: tabular-nums;
}
/* 字号阶梯的行高 = 字号 + 8（12→20、14→22、16→24、18→26、20→28、24→32、28→36、32→40）；需要别的行高的地方单独写 */
.blk * {
  line-height: calc(1em + 8px);
}
.blk.bare {
  border-color: transparent;
  background: transparent;
  padding: 0;
}
.blk.barrow {
  container-type: inline-size;
}
.k-strip {
  min-height: 64px;
}
.k-segment {
  min-height: 32px;
}
.blk.dark {
  --ink: #f9fafb;
  --text: #e5e7eb;
  --mute: #9ca3af;
  --line: #374151;
  --line2: #1f2937;
  --surf: #111827;
  --acc-soft: rgba(96, 140, 255, 0.18);
  background: var(--surf);
  color: var(--text);
  border-color: var(--surf);
}
.blk.dark.bare {
  padding: 20px;
}
p {
  margin: 0;
}
b {
  color: var(--ink);
  font-weight: 600;
}
i {
  font-style: normal;
}
.muted {
  color: var(--mute);
}
.sp {
  flex: 1;
}
.mono {
  font-family: ui-monospace, Menlo, monospace;
}
/* 控件高度：桌面 32，手机画布 --tap 44（触控目标）；大号 40、小号 28 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--tap, 32px);
  padding: 4px 16px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--surf);
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  font-weight: 500;
  white-space: nowrap;
  flex: none;
}
.btn.p {
  background: var(--acc);
  border-color: var(--acc);
  color: #fff;
}
.btn.lg {
  min-height: max(40px, var(--tap, 32px));
  padding: 0 20px;
  font-size: 16px;
}
.btn.sm {
  min-height: 28px;
  padding: 0 12px;
}
.btn.danger {
  border-color: #fca5a5;
  color: var(--dan);
}
.pill {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
}
.pill.ok {
  background: var(--ok-bg);
  color: var(--ok);
}
.pill.warn {
  background: var(--warn-bg);
  color: var(--warn);
}
.pill.danger {
  background: var(--dan-bg);
  color: var(--dan);
}
.pill.info {
  background: var(--info-bg);
  color: var(--info);
}
.av {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: none;
  border-radius: 50%;
  background: #dbe4ff;
  color: #3b4ea8;
  font-size: 14px;
  font-weight: 600;
}
.av.sm {
  width: 24px;
  height: 24px;
  font-size: 12px;
}
.av.xl {
  width: 56px;
  height: 56px;
  font-size: 20px;
}
.logo {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: none;
  border-radius: 6px;
  background: var(--acc);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}
.card-h {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: none;
}
.card-h b {
  font-size: 16px;
}
.tone-0 {
  background: linear-gradient(135deg, #dbeafe, #e0e7ff);
}
.tone-1 {
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
}
.tone-2 {
  background: linear-gradient(135deg, #d1fae5, #dbeafe);
}

/* 侧栏：矮宽时排成一行（顶栏里的导航），很窄时只留图标 */
.k-nav {
  padding: 20px 16px;
  gap: 24px;
}
/* 放在整条顶栏里：横排、不带品牌、不画外框 */
.k-nav.inline {
  container-type: inline-size;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 4px;
  background: transparent;
  border-color: transparent;
}
.k-nav.inline .nav-h {
  flex-direction: row;
  gap: 4px;
}
.k-nav.inline .ico {
  display: none;
}
.k-nav.inline .nav-i {
  min-height: 32px;
  padding: 0 12px;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  white-space: nowrap;
}
.nav-brand b {
  font-size: 18px;
}
.nav-h {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav-g {
  margin: 16px 8px 8px;
  color: var(--mute);
  font-size: 12px;
}
.nav-i {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: var(--tap, 40px);
  padding: 0 12px;
  border-radius: 6px;
  color: var(--text);
  white-space: nowrap;
}
.nav-i .ico {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid currentColor;
  opacity: 0.55;
  flex: none;
}
.nav-i.on {
  background: var(--acc-soft);
  color: var(--acc);
  font-weight: 600;
}
.nav-i.on .ico {
  opacity: 1;
}
.nav-i .chev {
  margin-left: auto;
  font-style: normal;
  color: var(--mute);
  font-size: 12px;
}
.nav-i.par {
  color: var(--ink);
  font-weight: 600;
}
.nav-i.sub {
  padding-left: 36px; /* 12 内边距 + 16 图标 + 8 间距：子项文字和父项文字对齐 */
  min-height: var(--tap, 32px);
}
.nav-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding: 12px 8px 0;
  border-top: 1px solid var(--line);
  color: var(--text);
  white-space: nowrap;
  flex: none;
}
.nf-i {
  display: grid;
  place-items: center;
  width: var(--tap, 32px);
  height: var(--tap, 32px);
  border-radius: 50%;
  color: var(--mute);
  font-size: 20px;
}
@container (max-width: 120px) {
  .nav-foot > span {
    display: none;
  }
  .nav-foot {
    justify-content: center;
  }
}
@container (max-height: 120px) {
  .k-nav {
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
    gap: 24px;
    border-right: 0;
  }
  .nav-h {
    flex-direction: row;
    gap: 4px;
  }
  .nav-g {
    display: none;
  }
  .nav-i .ico {
    display: none;
  }
}
@container (max-width: 120px) {
  .nav-brand b,
  .nav-g {
    display: none;
  }
  .nav-i {
    font-size: 0;
    justify-content: center;
    gap: 0;
  }
  .nav-brand {
    justify-content: center;
    padding: 0;
  }
}

/* 顶栏 */
/* 顶栏：和浮动侧栏一样是圆角卡片 */
.k-topbar {
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
  background: var(--surf);
  border: 1px solid var(--line);
  border-radius: 12px;
  min-height: 60px;
}
.crumb {
  display: flex;
  gap: 6px;
  color: var(--mute);
  white-space: nowrap;
}
.crumb i {
  color: #d1d5db;
}
.top-search {
  display: inline-flex;
  align-items: center;
  width: 240px;
  min-height: var(--ctl, 32px);
  padding: 4px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  color: var(--mute);
  white-space: nowrap;
}
.ico-btn {
  display: grid;
  place-items: center;
  width: var(--tap, 32px);
  height: var(--tap, 32px);
  border-radius: 6px;
  border: 1px solid var(--line);
  color: var(--mute);
  flex: none;
  font-size: 20px;
}
.ico-btn svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linejoin: round;
}
.ico-btn.p {
  background: var(--acc);
  border-color: var(--acc);
  color: #fff;
}
.ico-btn.on {
  border-color: var(--acc);
  color: var(--acc);
  background: var(--acc-soft);
}
.me {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: var(--tap, 32px);
  white-space: nowrap;
  color: var(--ink);
  font-weight: 500;
}
/* 手机顶栏：圆角卡片，左边 ☰ 和页面名，右边铃铛、头像 */
@container (max-width: 560px) {
  .k-topbar {
    padding: 0 8px 0 4px;
    gap: 8px;
    min-height: 56px;
  }
  .k-topbar .ico-btn {
    border-color: transparent;
  }
  .k-topbar .ico-btn.p {
    border-color: var(--acc);
  }
  .top-search,
  .crumb > span,
  .crumb > i,
  .k-topbar .me-n {
    display: none;
  }
  .crumb b {
    font-size: 16px;
  }
}

.k-tabbar {
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: var(--surf);
  border-top: 1px solid var(--line);
  border-radius: 0;
  min-height: 56px;
}
.tb {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 4px;
  min-width: 44px;
  min-height: 44px;
  color: var(--mute);
  font-size: 12px;
}
.tb i {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1.5px solid currentColor;
}
.tb.on {
  color: var(--acc);
}
@container (max-width: 90px) {
  .k-tabbar {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 20px;
    gap: 24px;
    border-top: 0;
  }
}

/* 指标 */
.k-kpi {
  gap: 4px;
  justify-content: center;
}
.big {
  color: var(--ink);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.delta {
  color: var(--ok);
  font-size: 13px;
  white-space: nowrap;
}
.delta.down {
  color: var(--dan);
}
.spark {
  width: 100%;
  height: 28px;
  margin-top: 4px;
  flex: none;
}
.spark polyline {
  fill: none;
  stroke: var(--acc);
  stroke-width: 1.6;
  opacity: 0.7;
}
@container (max-height: 130px) {
  .spark {
    display: none;
  }
}
@container (max-height: 90px) {
  .delta {
    display: none;
  }
}
@container (max-width: 180px) {
  .big {
    font-size: 24px;
  }
  .delta .muted {
    display: none;
  }
  .k-kpi {
    padding: 16px;
  }
}
.k-strip {
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  border: 1px solid var(--line);
  background: var(--surf);
  border-radius: 12px;
}
.st {
  flex: 1;
  display: grid;
  gap: 4px;
  padding: 0 16px;
  border-left: 1px solid var(--line);
  white-space: nowrap;
  overflow: hidden;
}
.st:first-child {
  border-left: 0;
}
.st .muted {
  font-size: 12px;
}
.st b {
  font-size: 24px;
}
@container (max-width: 560px) {
  .st:nth-child(n + 4) {
    display: none;
  }
}
@container (max-width: 320px) {
  .st:nth-child(n + 3) {
    display: none;
  }
  .st {
    padding: 0 12px;
  }
}

/* 图表 */
.legend {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--mute);
  font-size: 12px;
  white-space: nowrap;
}
.legend i {
  width: 10px;
  height: 3px;
  border-radius: 2px;
  background: var(--acc);
}
.legend i.l2 {
  background: #cbd5e1;
  margin-left: 8px;
}
.plot {
  flex: 1;
  width: 100%;
  min-height: 0;
}
.grid {
  stroke: var(--line2);
  stroke-width: 1;
}
.area {
  fill: var(--acc-soft);
}
.ln {
  fill: none;
  stroke: var(--acc);
  stroke-width: 2.4;
}
.axis {
  display: flex;
  justify-content: space-between;
  color: var(--mute);
  font-size: 12px;
  flex: none;
}
.bars {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding-top: 8px;
}
.bar {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
}
.bar i {
  width: 100%;
  max-width: 44px;
  border-radius: 6px 6px 0 0;
  background: #c7d7fb;
}
.bar i.hi {
  background: var(--acc);
}
.bar em {
  font-style: normal;
  color: var(--mute);
  font-size: 12px;
  white-space: nowrap;
}
.donut {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
.donut svg {
  height: 100%;
  max-height: 170px;
  aspect-ratio: 1;
  transform: rotate(0deg);
}
.donut circle {
  fill: none;
  stroke-width: 6;
}
.d0 {
  stroke: var(--acc);
  background: var(--acc);
}
.d1 {
  stroke: #7aa2f7;
  background: #7aa2f7;
}
.d2 {
  stroke: #c7d7fb;
  background: #c7d7fb;
}
.donut .lg {
  display: grid;
  gap: 8px;
  font-size: 13px;
  color: var(--text);
}
.donut .lg > span {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.donut .lg i {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}
.donut .lg b {
  margin-left: 4px;
}
@container (max-width: 300px) {
  .donut .lg {
    display: none;
  }
}
@container (max-height: 150px) {
  .axis,
  .bar em,
  .legend {
    display: none;
  }
}
@container (max-width: 320px) {
  .legend {
    display: none;
  }
  .bars {
    gap: 8px;
  }
}

/* 表格：窄框里换成卡片列表 */
.k-table {
  padding: 0;
  gap: 0;
}
.k-table .card-h {
  padding: 16px 20px 8px;
}
.tbl {
  width: 100%;
  border-collapse: collapse;
}
/* 表头、按钮这类必须看得出的强调用 600（f-type-weight） */
.tbl th {
  padding: 12px 16px;
  background: #f8fafc;
  color: var(--mute);
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid var(--line);
}
/* 常规密度：行高 48（表格单元格的 height 是最小高度，状态标签比一行字高也不撑开） */
.tbl td {
  height: 48px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line2);
  white-space: nowrap;
  color: var(--text);
}
.tbl .num {
  text-align: right;
  color: var(--ink);
}
.tbl th:nth-child(3) {
  text-align: right;
}
.cards-m {
  display: none;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
}
.cm {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surf);
}
.cm > span {
  display: grid;
  gap: 4px;
}
.cm-r {
  justify-items: end;
}
@container (max-width: 560px) {
  .tbl,
  .k-table .card-h {
    display: none;
  }
  .cards-m {
    display: flex;
  }
  .k-table {
    background: transparent;
    border-color: transparent;
  }
}

/* 筛选、输入 */
.k-filters {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  align-content: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--surf);
  border: 1px solid var(--line);
  border-radius: 12px;
}
.fld-i {
  display: grid;
  gap: 8px;
}
.fld-i em {
  font-style: normal;
  color: var(--mute);
  font-size: 12px;
}
/* 输入框：桌面 32 / 手机画布 --ctl 40，手机字号 --fs-input 16；上下内边距 = (控件高 − 边框 2 − 行高 22) / 2，文字正好居中，还能用 text-overflow */
.sel,
.inp,
.inp-s {
  display: block;
  min-height: var(--ctl, 32px);
  padding-block: calc((var(--ctl, 32px) - 24px) / 2);
  padding-inline: 12px 32px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: var(--surf);
  color: var(--ink);
  font-size: var(--fs-input, 14px);
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  min-width: 140px;
}
.sel::after {
  content: '⌄';
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  color: var(--mute);
}
.inp {
  padding-inline: 12px;
  min-width: 0;
}
.inp.area {
  min-height: 72px;
  padding-top: 8px;
  white-space: normal;
}
.inp-s {
  color: var(--mute);
  padding-inline: 12px;
  min-width: 200px;
}
.inp-s.full {
  width: 100%;
  min-width: 0;
}
.fld-i.wide .sel {
  min-width: 220px;
}
@container (max-width: 600px) {
  .k-filters > :nth-child(n + 3):not(.btn) {
    display: none;
  }
  .k-filters > .btn:last-child {
    display: none;
  }
  .sel {
    min-width: 96px;
  }
}
.k-select,
.k-input,
.k-search {
  justify-content: center;
}
.k-select.inline .fld-i {
  display: flex;
  align-items: center;
  gap: 8px;
}
.k-select.inline .fld-i em {
  font-size: 14px;
  white-space: nowrap;
}
.k-select.inline .sel {
  flex: 1;
  min-width: 0;
}
.k-input {
  gap: 8px;
}
.k-input label,
.frow label {
  color: var(--ink);
  font-weight: 500;
}

/* 表单项间距：桌面 16（紧凑档），手机画布 --gap-form 20 */
.k-form {
  gap: var(--gap-form, 16px);
}
.sec-h {
  display: grid;
  gap: 4px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line2);
  flex: none;
}
.sec-h b {
  font-size: 16px;
}
.sec-h .muted {
  font-size: 13px;
}
.fgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
}
@container (max-width: 560px) {
  .fgrid {
    grid-template-columns: 1fr;
  }
}
.k-switches:has(.sec-h) {
  padding-top: 20px;
}
.k-form:has(.handle) {
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -10px 30px -12px rgba(15, 23, 42, 0.25);
  padding-top: 12px;
}
.form-t {
  font-size: 16px;
}
.frow {
  display: grid;
  gap: 8px;
}
.frow label i {
  color: var(--dan);
  margin-left: 2px;
}
.frow.btns {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}
/* 高度不够时从后往前藏字段，保存按钮和分组标题始终留着。
   阈值 = 放得下 N 个字段所需的内容区高度 − 1（桌面尺寸）：字段 62（标签 22 + 8 + 控件 32）、第 6 个字段是文本域 102、字段间距 16、按钮行 52（16 + 4 + 32）、标题 40（24 + 16）。
   手机画布控件 40、间距 20，字段更高，这里不另算，手机上会略晚一步藏字段 */
@container (max-height: 543px) {
  .k-form:has(.btns) .frow:not(.btns):nth-of-type(n + 6) {
    display: none;
  }
}
@container (max-height: 491px) {
  .frow:not(.btns):nth-of-type(n + 6) {
    display: none;
  }
}
@container (max-height: 425px) {
  .k-form:has(.btns) .frow:not(.btns):nth-of-type(n + 5) {
    display: none;
  }
}
@container (max-height: 373px) {
  .frow:not(.btns):nth-of-type(n + 5) {
    display: none;
  }
}
@container (max-height: 347px) {
  .k-form:has(.btns) .frow:not(.btns):nth-of-type(n + 4) {
    display: none;
  }
}
@container (max-height: 295px) {
  .frow:not(.btns):nth-of-type(n + 4) {
    display: none;
  }
}
@container (max-height: 269px) {
  .k-form:has(.btns) .frow:not(.btns):nth-of-type(n + 3) {
    display: none;
  }
}
@container (max-height: 257px) {
  .k-form:has(.form-t) .frow:nth-of-type(n + 3) {
    display: none;
  }
}
@container (max-height: 217px) {
  .frow:not(.btns):nth-of-type(n + 3) {
    display: none;
  }
}
@container (max-height: 191px) {
  .k-form:has(.btns) .frow:not(.btns):nth-of-type(n + 2) {
    display: none;
  }
}
@container (max-height: 179px) {
  .k-form:has(.form-t) .frow:nth-of-type(n + 2) {
    display: none;
  }
}
@container (max-height: 139px) {
  .frow:not(.btns):nth-of-type(n + 2) {
    display: none;
  }
}

/* AI 对话 */
.k-composer {
  justify-content: center;
}
.comp {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 8px 0 16px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: var(--surf);
  white-space: nowrap;
  overflow: hidden;
}
.clip,
.send {
  display: grid;
  place-items: center;
  width: var(--tap, 32px);
  height: var(--tap, 32px);
  border-radius: 50%;
  flex: none;
}
.clip {
  border: 1px solid var(--line);
  color: var(--mute);
}
.send {
  background: var(--acc);
  color: #fff;
  font-weight: 700;
}
.k-chat {
  gap: 16px;
  justify-content: flex-end;
}
.caret {
  display: inline-block;
  width: 8px;
  height: 16px;
  margin-left: 4px;
  vertical-align: -3px;
  background: var(--acc);
  border-radius: 1px;
}
.msg {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  max-width: 86%;
}
.msg p {
  padding: 8px 12px;
  border-radius: 12px;
  background: #f3f4f6;
  color: var(--text);
}
.msg.me {
  align-self: flex-end;
}
.msg.me p {
  background: var(--acc);
  color: #fff;
  border-bottom-right-radius: 4px;
}
.av.ai {
  background: #111827;
  color: #fff;
  font-size: 12px;
}
.k-chat .msg:first-child:not(:only-child) {
  display: none;
}
@container (min-height: 380px) {
  .k-chat .msg:first-child:not(:only-child) {
    display: flex;
  }
}
.k-chat:not(:has(.me)) {
  justify-content: flex-start;
}
.k-bubble {
  justify-content: center;
}

/* 官网 */
.k-hero {
  justify-content: center;
  gap: 16px;
  padding: 0 8px;
}
.k-hero.dark {
  padding: 40px;
}
.hero-b {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: auto;
}
.k-hero:has(.hero-b) {
  justify-content: flex-start;
}
.k-hero:not(:has(.row-btn)):not(:has(.hero-b)) {
  justify-content: flex-end;
  padding-bottom: 8px;
}
.k-hero:has(.hero-b) .eyebrow {
  margin-top: auto;
}
.k-hero .bl:last-of-type {
  margin-bottom: auto;
}
.eyebrow {
  color: var(--acc);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.dark .eyebrow {
  color: #93b4ff;
}
.h1 {
  margin: 0;
  color: var(--ink);
  font-size: 40px;
  letter-spacing: -0.02em;
  white-space: pre-line;
}
.sub {
  color: var(--mute);
  font-size: 18px;
  max-width: 30em;
}
.row-btn {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
@container (max-width: 520px) {
  .h1 {
    font-size: 32px;
  }
  .sub {
    font-size: 16px;
  }
}
@container (max-width: 360px) {
  .row-btn .btn:last-child {
    display: none;
  }
}
@container (max-height: 200px) {
  .sub,
  .eyebrow {
    display: none;
  }
  .h1 {
    font-size: 28px;
  }
}
.k-title,
.k-subtitle {
  justify-content: center;
}
.k-btnpair {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
@container (max-width: 360px) {
  .k-btnpair .btn:last-child {
    display: none;
  }
}
.k-heading {
  justify-content: center;
  gap: 8px;
}
.h2 {
  margin: 0;
  color: var(--ink);
  font-size: 24px;
  letter-spacing: -0.01em;
}
.h3 {
  margin: 0;
  color: var(--ink);
  font-size: 20px;
}
@container (max-height: 80px) {
  .k-heading .muted {
    display: none;
  }
  .h2 {
    font-size: 20px;
  }
}
@container (max-width: 360px) {
  .h2 {
    font-size: 20px;
  }
}
.k-image {
  padding: 0;
}
.shot {
  height: 100%;
  border-radius: 12px;
  padding: 7% 7% 0;
  overflow: hidden;
}
.shot-ui {
  display: flex;
  height: 100%;
  border-radius: 12px 12px 0 0;
  background: #fff;
  box-shadow: 0 20px 40px -20px rgba(15, 23, 42, 0.35);
  overflow: hidden;
}
.s-side {
  width: 18%;
  background: #f1f5f9;
}
.s-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6%;
  padding: 5%;
}
.s-bar {
  height: 8%;
  width: 50%;
  border-radius: 6px;
  background: #e5e7eb;
}
.s-kpis {
  display: flex;
  gap: 5%;
  height: 18%;
}
.s-kpis i {
  flex: 1;
  border-radius: 8px;
  background: #eef3ff;
}
.s-chart {
  flex: 1;
  border-radius: 8px;
  background: linear-gradient(180deg, #eef3ff, #fff);
  border: 1px solid #e5e7eb;
}
.k-card {
  padding: 0 0 20px;
  gap: 8px;
}
.k-card > b,
.k-card > p {
  padding: 0 20px;
}
.cimg {
  flex: 1;
  min-height: 40px;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.shot-ui.mini {
  width: 78%;
  height: 78%;
  align-self: end;
  border-radius: 12px 12px 0 0;
}
.photo {
  width: 22%;
  max-width: 72px;
  fill: rgba(255, 255, 255, 0.7);
}
.fi {
  display: none;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #fff;
  color: var(--acc);
  font-size: 24px;
  font-style: normal;
  box-shadow: 0 6px 16px -8px rgba(15, 23, 42, 0.3);
}
@container (max-height: 240px) {
  .shot-ui.mini {
    display: none;
  }
  .fi {
    display: grid;
  }
}
.k-card > p {
  font-size: 13px;
}
@container (max-height: 170px) {
  .k-card > p {
    display: none;
  }
}
.k-cta {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px 40px;
  border-radius: 12px;
  background: linear-gradient(120deg, #1d4ed8, #2563eb);
  border: 0;
}
.k-cta .h2 {
  color: #fff;
}
.k-cta p {
  color: rgba(255, 255, 255, 0.85);
}
.k-cta .btn.p {
  background: #fff;
  color: #1d4ed8;
  border-color: #fff;
}
@container (max-width: 560px) {
  .k-cta {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 24px;
  }
}
.k-logos {
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 24px;
}
.logo-w {
  color: #9ca3af;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
@container (max-width: 560px) {
  .logo-w:nth-child(n + 4) {
    display: none;
  }
}
@container (max-width: 200px) {
  .logo-w:nth-child(n + 2) {
    display: none;
  }
}
.k-quote {
  gap: 16px;
  padding: 24px;
}
.qm {
  color: var(--acc);
  font:
    700 56px/0.6 Georgia,
    serif;
  height: 28px;
}
.stars {
  color: #f59e0b;
  letter-spacing: 2px;
  font-size: 14px;
}
.qt {
  color: var(--ink);
  font-size: 18px;
  line-height: 1.7;
}
.who {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}
.who > span {
  display: grid;
  font-size: 13px;
}
.k-pricing {
  flex-direction: row;
  gap: 24px;
}
.plan {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surf);
  min-width: 0;
}
.plan.hi {
  border-color: var(--acc);
  box-shadow: 0 0 0 2px var(--acc);
}
.price {
  color: var(--ink);
  font-size: 32px;
  font-weight: 600;
}
.price small {
  color: var(--mute);
  font-size: 14px;
  font-weight: 400;
}
.feat {
  color: var(--text);
  font-size: 13px;
}
.plan .btn {
  margin-top: auto;
}
.plan.one {
  height: 100%;
}
.rec {
  margin-left: 8px;
  vertical-align: 2px; /* 标签比套餐名字矮，抬 2px 对齐视觉中心 */
}
@container (max-height: 220px) {
  .plan.one .feat {
    display: none;
  }
}
@container (max-width: 600px) {
  .k-pricing .plan:not(.hi) {
    display: none;
  }
}
.k-faq {
  gap: 0;
  padding: 4px 20px;
}
.q {
  padding: 16px 0;
  border-bottom: 1px solid var(--line2);
  display: grid;
  gap: 8px;
}
.q-h {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.q-h i {
  color: var(--mute);
  font-size: 20px;
}
.k-row {
  justify-content: center;
  min-height: 48px;
  box-shadow: inset 0 -1px var(--line);
}
.k-footer {
  justify-content: space-between;
  gap: 24px;
  padding: 32px 40px;
  background: #f8fafc;
  border: 0;
  border-radius: 0;
}
.k-footer.dark {
  background: #0f172a;
}
.ft-cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.ft-c {
  display: grid;
  gap: 8px;
  align-content: start;
  font-size: 13px;
  color: var(--mute);
}
.ft-b {
  color: var(--mute);
  font-size: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.ft-b.only {
  padding-top: 0;
  border-top: 0;
}
.k-footer:has(.only) {
  justify-content: center;
  padding: 16px 24px;
  border-top: 1px solid var(--line);
}
@container (max-width: 560px) {
  .ft-cols {
    grid-template-columns: repeat(2, 1fr);
  }
  .ft-c:nth-child(n + 3) {
    display: none;
  }
  .k-footer {
    padding: 24px;
  }
}
.k-linkcol {
  gap: 8px;
  padding: 4px 0;
}
.lk {
  color: var(--mute);
  font-size: 13px;
}
.k-code {
  padding: 0;
}
.code {
  flex: 1;
  margin: 0;
  padding: 20px;
  background: #0f172a;
  border-radius: 12px;
  font:
    14px/22px ui-monospace,
    Menlo,
    monospace;
  color: #e2e8f0;
  overflow: hidden;
  white-space: pre;
}
.c0 {
  color: #93c5fd;
}
.c1 {
  color: #e2e8f0;
}
.c2 {
  color: #86efac;
}

/* 资料、公告、时间轴、看板 */
.k-profile {
  gap: 16px;
  justify-content: center;
}
.pf {
  display: flex;
  align-items: center;
  gap: 12px;
}
.pf > span {
  display: grid;
  gap: 4px;
}
.pf b {
  font-size: 18px;
}
.pf-s {
  display: flex;
  justify-content: space-around;
  padding-top: 12px;
  border-top: 1px solid var(--line2);
}
.pf-s span {
  display: grid;
  justify-items: center;
}
.pf-s b {
  font-size: 24px;
}
.pf-s em {
  font-style: normal;
  color: var(--mute);
  font-size: 12px;
}
@container (max-height: 140px) {
  .pf-s {
    display: none;
  }
}
.k-avatar {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.k-avatar:not(.inline) .me:not(:has(.me-n)) {
  margin-right: auto;
}
.k-notice {
  gap: 12px;
}
.nt {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  white-space: nowrap;
  flex: none;
  min-width: 0;
}
.nt-x {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
@container (max-height: 130px) {
  .nt:nth-of-type(n + 2) {
    display: none;
  }
}
.k-timeline {
  gap: 12px;
  justify-content: center;
}
.lane {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lane-n {
  width: 48px;
  flex: none;
  color: var(--ink);
  font-weight: 500;
}
.track {
  position: relative;
  flex: 1;
  height: 32px;
  border-radius: 6px;
  background: #f3f4f6;
}
.seg {
  position: absolute;
  top: 4px;
  bottom: 4px;
  padding: 0 8px;
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
}
.t0 {
  background: var(--acc);
}
.t1 {
  background: #d97706;
}
.t2 {
  background: #059669;
}
.k-event {
  justify-content: center;
  border: 0;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--acc-soft);
  box-shadow: inset 0 0 0 1px #c7d7fb;
}
.k-event .muted {
  font-size: 12px;
}
.k-ruler {
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid var(--line);
  color: var(--mute);
  font-size: 12px;
}
.k-kanban {
  flex-direction: row;
  gap: 16px;
}
.kc {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: #f1f3f6;
  min-width: 0;
}
.kc em {
  font-style: normal;
  color: var(--mute);
  font-weight: 400;
  margin-left: 4px;
}
.kcard {
  padding: 12px;
  border-radius: 12px;
  background: var(--surf);
  border: 1px solid var(--line);
  color: var(--ink);
}
@container (max-width: 560px) {
  .kc:nth-child(n + 2) {
    display: none;
  }
}
.k-list {
  gap: 0;
  padding: 8px 16px;
}
.k-list .card-h {
  padding: 8px 4px;
}
.li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 4px;
  border-bottom: 1px solid var(--line2);
  flex: none;
}
.li.on {
  background: var(--acc-soft);
  border-radius: 6px;
  padding-inline: 8px;
}
.li-t {
  display: grid;
  flex: 1;
  min-width: 0;
}
.li-t .muted {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.time {
  font-size: 12px;
  white-space: nowrap;
}
@container (max-width: 280px) {
  .time {
    display: none;
  }
  .k-list {
    padding: 4px 12px;
  }
}
.k-text {
  gap: 12px;
}
.tx-t {
  font-size: 20px;
}
/* 阅读型正文：16 / 26 */
.tx {
  color: var(--text);
  font-size: 16px;
  line-height: 26px;
}
.tx-m {
  font-size: 12px;
  margin-top: -8px;
}
.tx-h {
  margin-top: 12px;
  font-size: 18px;
}
.tx-l {
  margin: 0;
  padding-left: 20px;
  color: var(--text);
  font-size: 16px;
  line-height: 26px;
}
.k-brand {
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
}
.contact {
  display: grid;
  gap: 8px;
  flex-basis: 100%;
  margin-top: 12px;
  color: var(--mute);
  font-size: 13px;
}
.bn {
  font-size: 18px;
}
.sn {
  margin-left: 24px;
  white-space: nowrap;
}
@container (max-width: 520px) {
  .sn:nth-child(n + 7) {
    display: none;
  }
}
@container (max-width: 420px) {
  .sn {
    display: none;
  }
}

/* 条类 */
.k-steps {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
}
.step {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mute);
  white-space: nowrap;
  font-size: 14px;
}
.step i {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--line);
  font-size: 14px;
  font-weight: 600;
  flex: none;
}
.step.done i {
  background: var(--acc);
  border-color: var(--acc);
  color: #fff;
}
.step.cur {
  color: var(--ink);
  font-weight: 600;
}
.step.cur i {
  border-color: var(--acc);
  color: var(--acc);
}
.step-line {
  flex: 1;
  height: 2px;
  background: var(--line);
  min-width: 16px;
}
.step-line.done {
  background: var(--acc);
}
@container (max-width: 560px) {
  .k-steps .step:not(.cur) .step-n {
    display: none;
  }
}
.k-stepitem.inline {
  border-color: transparent;
  background: transparent;
}
.k-stepitem {
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  background: var(--surf);
  border: 1px solid var(--line);
  border-radius: 12px;
}
.k-tabs {
  flex-direction: row;
  align-items: flex-end;
  gap: 24px;
  padding: 0 4px;
  border-bottom: 1px solid var(--line);
}
.tab {
  padding: 12px 0;
  color: var(--mute);
  white-space: nowrap;
}
.tab.on {
  color: var(--acc);
  font-weight: 600;
  box-shadow: inset 0 -2px var(--acc);
}
@container (max-width: 420px) {
  .k-tabs {
    gap: 16px;
  }
  .tab:nth-child(n + 4) {
    display: none;
  }
}
.k-toc {
  gap: 4px;
  padding: 4px 0;
}
.k-toc > .muted {
  font-size: 12px;
  margin: 0 0 8px 14px; /* 14 = 条目的 2px 左边线 + 12 内边距，和条目文字对齐 */
}
.toc-i {
  padding: 8px 12px;
  border-left: 2px solid var(--line);
  color: var(--mute);
  white-space: nowrap;
}
.toc-i.on {
  border-left-color: var(--acc);
  color: var(--acc);
  font-weight: 600;
}
.k-toc.hz {
  flex-direction: row;
  align-items: flex-end;
  gap: 0;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}
.k-toc.hz > .muted {
  display: none;
}
.hz .toc-i {
  padding: 12px;
  border-left: 0;
}
.hz .toc-i.on {
  box-shadow: inset 0 -2px var(--acc);
}
.k-actions {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  background: var(--surf);
  border-top: 1px solid var(--line);
  border-radius: 0;
  min-height: 60px;
}
@container (max-width: 420px) {
  .k-actions .muted {
    display: none;
  }
}
.k-button,
.k-btnrow,
.k-link {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.k-button {
  justify-content: flex-start;
}
.k-button .btn.full {
  flex: 1;
}
.k-button.inline {
  justify-content: flex-end;
}
@container (max-width: 420px) {
  .k-button:not(.inline) .btn {
    flex: 1;
  }
}
.k-btnrow .btn {
  flex: 1;
}
.a {
  color: var(--acc);
}
.k-toolbar {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.k-toolbar > .muted {
  font-size: 13px;
  white-space: nowrap;
}
.tsep {
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: var(--line);
  flex: none;
}
@container (max-width: 420px) {
  .k-toolbar > .btn:nth-child(n + 5):not(.p),
  .k-toolbar > .muted,
  .tsep {
    display: none;
  }
}
.k-pager {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.pg {
  display: grid;
  place-items: center;
  min-width: var(--tap, 32px);
  height: var(--tap, 32px);
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--surf);
  color: var(--text);
}
.pg.on {
  background: var(--acc);
  border-color: var(--acc);
  color: #fff;
}
@container (max-width: 420px) {
  .k-pager > .muted {
    display: none;
  }
}
.k-danger {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-color: #fecaca;
  background: #fff7f7;
}
.k-danger > span:first-child {
  display: grid;
  gap: 4px;
}
@container (max-width: 420px) {
  .k-danger .muted {
    display: none;
  }
}
/* 分段控件：外层占满一行，灰色轨道包住选项（外层是 inline-size 容器，不能收缩到内容宽度，否则宽度变成 0） */
.k-segment {
  flex-direction: row;
  align-items: center;
}
/* 分段控件：选项 28 + 槽内边距 2 = 32；同心圆角 外 8 = 内 6 + 2 */
.segs {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border-radius: 8px;
  background: #eef0f4;
}
.sg {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 6px;
  color: var(--mute);
  white-space: nowrap;
}
.sg.on {
  background: var(--acc);
  color: #fff;
  font-weight: 500;
}
.k-pagehead {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.ph-t {
  display: grid;
  gap: 4px;
  min-width: 0;
}
.k-pagehead .muted {
  font-size: 13px;
  white-space: nowrap;
}
@container (max-width: 560px) {
  .k-pagehead > .btn:not(.p),
  .k-pagehead .ph-t .muted {
    display: none;
  }
}
.k-cell {
  gap: 0;
  padding: 4px 16px;
}
.cl {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line2);
  color: var(--ink);
  flex: none;
}
.cl:last-child {
  border-bottom: 0;
}
.cl em {
  font-style: normal;
  color: var(--mute);
}
.k-empty {
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-style: dashed;
  border-color: #d1d5db;
  background: transparent;
}
.ebox {
  width: 40px;
  height: 32px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  margin-bottom: 4px;
}
.k-block {
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 12px;
}
.k-block.dark {
  background: rgba(15, 23, 42, 0.55);
}
.k-block.dark .solo {
  display: none;
}
.solo {
  color: var(--mute);
  font-size: 14px;
  text-align: center;
}
/* 居中排版（居中首屏、居中卡片） */
.ctr {
  text-align: center;
  align-items: center;
  justify-content: center;
}

/* 通用页面内容 */
.k-content {
  gap: 24px;
}
.ct-k {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  height: 112px;
  flex: none;
}
.ct-t {
  flex: 1;
}
@container (max-width: 560px) {
  .k-content > .k-pagehead {
    display: none;
  }
  .ct-k {
    grid-template-columns: 1fr 1fr;
    height: 96px;
  }
  .ct-k > :nth-child(n + 3) {
    display: none;
  }
}
/* 只读字段：宽时三列，窄时“名称 — 值”一行一个 */
.k-field {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: start;
  gap: 16px 24px;
  padding: 20px;
}
.fv {
  display: grid;
  gap: 4px;
  min-width: 0;
}
.fv em {
  font-style: normal;
  color: var(--mute);
  font-size: 13px;
}
.fv span {
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@container (max-width: 560px) {
  .k-field {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 4px 16px;
  }
  .fv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    min-height: 48px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line2);
  }
  .fv:last-child {
    border-bottom: 0;
  }
}
/* 对象标题、操作按钮 */
.k-objhead {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.oh {
  display: grid;
  gap: 4px;
  min-width: 0;
}
.oh-t {
  display: flex;
  align-items: center;
  gap: 8px;
}
.oh-t b {
  font-size: 20px;
}
.oh > .muted {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@container (max-width: 420px) {
  .oh-t b {
    font-size: 18px;
  }
  .k-objhead > .btn:not(.p) {
    display: none;
  }
}
.k-opbtns {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
@container (max-width: 420px) {
  .k-opbtns .btn {
    flex: 1;
  }
}
/* 单条记录 */
.k-record {
  display: grid;
  grid-template-columns: 1fr auto;
  align-content: center;
  gap: 4px 12px;
  padding: 16px;
}
.rc-l,
.rc-r {
  display: grid;
  gap: 4px;
  min-width: 0;
}
.rc-r {
  justify-items: end;
}
.rc-m {
  grid-column: 1 / -1;
  padding-top: 8px;
  margin-top: 4px;
  border-top: 1px solid var(--line2);
  font-size: 12px;
}
.k-record.picked {
  border-color: var(--acc);
  box-shadow: 0 0 0 1px var(--acc);
  background: var(--acc-soft);
}
/* 筛选条、已选条件、筛选面板 */
.k-fbar,
.k-chips {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.chip {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: #eef0f4;
  color: var(--text);
  white-space: nowrap;
}
.chip.on {
  background: var(--acc-soft);
  color: var(--acc);
  font-weight: 500;
}
.chip.x {
  background: var(--acc-soft);
  color: var(--acc);
}
.a.sm {
  font-weight: 500;
}
.k-chips .muted {
  font-size: 13px;
  white-space: nowrap;
}
@container (max-width: 360px) {
  .k-fbar .chip:nth-child(3) {
    display: none;
  }
}
.k-facets {
  gap: 24px;
}
.handle {
  align-self: center;
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: #d1d5db;
  flex: none;
}
.fc-h {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.fc-h b {
  font-size: 16px;
}
.fc-h .muted {
  font-size: 13px;
}
.fc-g {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.fc-g em {
  flex-basis: 100%;
  font-style: normal;
  color: var(--ink);
  font-weight: 500;
}
.ck {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: var(--ctl, 32px);
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  color: var(--text);
  white-space: nowrap;
}
.ck i {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid #cbd5e1;
}
.ck.on {
  border-color: var(--acc);
  color: var(--acc);
  background: var(--acc-soft);
}
.ck.on i {
  background: var(--acc);
  border-color: var(--acc);
}
.rng {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mute);
  width: 100%;
}
.rng .inp {
  flex: 1;
  color: var(--mute);
}
.fc-b {
  display: flex;
  gap: 8px;
  margin-top: auto;
}
.fc-b .btn:last-child {
  flex: 1;
}
.k-facets:has(.handle) {
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -10px 30px -12px rgba(15, 23, 42, 0.25);
}
/* 操作记录 */
.k-activity {
  gap: 0;
}
.k-activity .card-h {
  margin-bottom: 12px;
}
.act {
  display: flex;
  gap: 12px;
  position: relative;
  padding-bottom: 16px;
  flex: none;
}
.act:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 14px;
  bottom: 0;
  width: 2px;
  background: var(--line2);
}
.act-d {
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  background: #cbd5e1;
  flex: none;
}
.act-d.on {
  background: var(--acc);
}
.act-t {
  display: grid;
  gap: 4px;
}
.act-t .muted {
  font-size: 12px;
}
/* 设置：开关行 */
.k-switches {
  gap: 0;
  padding: 4px 20px;
}
.sw {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line2);
  flex: none;
}
.sw:last-child {
  border-bottom: 0;
}
/* 高度不够时藏开关行：每行 72（12 + 22 + 4 + 21 + 12 + 1 边线），末行无边线，阈值 = 放得下 N 行的高度 − 1 */
@container (max-height: 286px) {
  .sw:nth-child(n + 4) {
    display: none;
  }
}
@container (max-height: 214px) {
  .sw:nth-child(n + 3) {
    display: none;
  }
}
@container (max-height: 142px) {
  .sw:nth-child(n + 2) {
    display: none;
  }
}
.sw-t {
  display: grid;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.sw-t .muted {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tg {
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 999px;
  background: #d1d5db;
  flex: none;
}
.tg::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.tg.on {
  background: var(--acc);
}
.tg.on::after {
  left: 18px;
}
/* 看板列头、任务卡 */
.k-colhead {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 4px 4px;
}
.k-colhead b {
  font-size: 16px;
}
.cnt {
  font-style: normal;
  padding: 0 8px;
  border-radius: 999px;
  background: #e5e7eb;
  color: var(--text);
  font-size: 12px;
  line-height: 20px;
}
.add {
  color: var(--mute);
  font-size: 20px;
}
.k-task {
  gap: 12px;
  padding: 16px;
}
.k-task > b {
  font-size: 14px;
  font-weight: 500;
}
.tk-f {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.k-task.picked {
  transform: rotate(2deg);
  box-shadow: 0 16px 30px -12px rgba(15, 23, 42, 0.35);
  border-color: var(--acc);
}
/* 日程列表 */
.k-agenda {
  gap: 8px;
}
.ag {
  display: flex;
  gap: 12px;
  flex: none;
}
.ag-t {
  width: 48px;
  flex: none;
  padding-top: 8px;
  color: var(--mute);
  font-size: 13px;
}
.ag-c {
  flex: 1;
  display: grid;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--acc-soft);
  box-shadow: inset 4px 0 var(--acc);
}
.ag-c .muted {
  font-size: 12px;
}
/* 官网功能说明 */
.k-feature {
  justify-content: center;
  gap: 12px;
  padding: 0 16px;
}
@container (max-width: 420px) {
  .k-feature .sub {
    font-size: 14px;
  }
  .k-feature .h2 {
    font-size: 20px;
  }
  .k-feature .eyebrow {
    display: none;
  }
}
/* 手机导航栏、AI 顶栏、会话 */
.k-mtop {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
}
.k-mtop b {
  font-size: 18px;
}
.mt-i {
  display: grid;
  place-items: center;
  width: var(--tap, 32px);
  height: var(--tap, 32px);
  color: var(--ink);
  font-size: 20px;
  flex: none;
}
.k-aitop {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.k-aitop b {
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mdl {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 6px;
  background: #f3f4f6;
  color: var(--text);
  white-space: nowrap;
}
@container (max-width: 420px) {
  .k-aitop .btn {
    display: none;
  }
}
.k-session {
  gap: 4px;
  padding: 8px 12px;
  border-color: transparent;
  background: transparent;
}
.k-session b {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.k-session .muted {
  font-size: 12px;
}
.k-session.picked {
  background: var(--acc-soft);
}
.k-session.picked b {
  color: var(--acc);
}
.dot {
  position: absolute;
  right: 12px;
  top: 16px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f59e0b;
}
/* 产物卡片 */
.k-artcard {
  padding: 0;
  gap: 0;
  overflow: hidden;
}
.k-artcard .shot {
  flex: 1;
  min-height: 0;
  border-radius: 0;
  padding: 6% 8% 0;
}
.af {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  flex: none;
}
.af > span {
  display: grid;
  gap: 4px;
}
.af .muted {
  font-size: 12px;
}
/* 价格对比表 */
.k-compare {
  padding: 0;
}
.cmp {
  text-align: center;
}
.k-compare th:not(:first-child) {
  text-align: center;
}
.cmp.y {
  color: var(--acc);
  font-weight: 600;
}
/* 客户 Logo、展开的回答、滑块验证、卖点 */
.k-wordmark {
  align-items: center;
  justify-content: center;
}
.k-answer {
  padding: 0 20px;
}
.ans {
  color: var(--text);
  font-size: 16px;
  line-height: 26px;
}
.k-captcha {
  justify-content: center;
}
.cap {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  padding-right: 12px;
  border-radius: 6px;
  background: #f3f4f6;
  overflow: hidden;
}
.cap-k {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--surf);
  border: 1px solid var(--line);
  color: var(--acc);
  font-weight: 600;
  flex: none;
}
.k-bullets {
  gap: 12px;
  justify-content: center;
}
.bl {
  display: flex;
  gap: 8px;
  color: var(--text);
}
.bl i {
  color: var(--acc);
  font-weight: 600;
}
.dark .bl i {
  color: #93b4ff;
}

/* 设置页 */
.hex {
  width: 40px;
  height: 40px;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linejoin: round;
}
.k-catlist {
  gap: 0;
  padding: 0;
  overflow: hidden;
}
.cat {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--line2);
  color: #cbd5e1;
  flex: none;
}
.cat:last-child {
  border-bottom: 0;
}
.cat.on {
  background: var(--acc-soft);
  color: #93b4ff;
}
.cat-t {
  display: grid;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.cat-t b {
  font-size: 16px;
}
.cat-t .muted {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.k-catcard {
  gap: 8px;
  padding: 20px;
}
.cc-ic {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: var(--acc-soft);
  color: var(--acc);
}
.cc-ic .hex {
  width: 24px;
  height: 24px;
}
.k-catcard > b {
  font-size: 16px;
}
.k-catcard > .muted {
  font-size: 13px;
}
.cc-f {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--line2);
  font-size: 12px;
}
.cc-f em {
  font-style: normal;
  color: var(--mute);
}
.k-secdesc {
  gap: 4px;
  justify-content: flex-start;
  padding-top: 4px;
}
.sd-t {
  font-size: 16px;
}
.k-secdesc .muted {
  font-size: 13px;
}
.k-setrows {
  gap: 0;
  padding: 4px 0;
}
.srow {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--line2);
  flex: none;
}
.srow:last-child {
  border-bottom: 0;
}
.srow.mod {
  box-shadow: inset 4px 0 var(--acc);
}
.sr-t {
  display: grid;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.sr-t b {
  font-size: 14px;
}
.sr-t > .muted {
  font-size: 13px;
}
.sr-m {
  font-style: normal;
  color: var(--acc);
  font-size: 12px;
}
.sr-m u {
  text-decoration: none;
  font-weight: 500;
}
.sr-c {
  width: 160px;
  flex: none;
}
@container (max-width: 420px) {
  .srow {
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
  }
  .sr-c {
    width: 100%;
  }
}
/* 抽屉里的标题和设置项直接铺在抽屉上，不再套卡片 */
.blk.k-dlghead,
.blk.k-prefs {
  border-color: transparent;
  border-radius: 0;
  background: transparent;
}
.blk.k-dlghead {
  border-bottom-color: var(--line);
}
.k-dlghead {
  flex-direction: row;
  align-items: center;
  padding: 0 4px 16px;
  border-bottom: 1px solid var(--line);
}
.k-dlghead b {
  font-size: 18px;
}
.k-prefs {
  gap: 12px;
  padding: 4px 4px 0;
}
.pf-h {
  color: var(--ink);
  font-weight: 600;
  margin-top: 12px;
}
.k-prefs .segs {
  align-self: flex-start;
}
.dots {
  display: flex;
  gap: 8px;
}
.dots i {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.dots i.on {
  box-shadow:
    0 0 0 2px #fff,
    0 0 0 4px var(--acc);
}
.lps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.lp {
  display: grid;
  gap: 8px;
  justify-items: center;
  font-size: 12px;
  color: var(--text);
}
.lp em {
  font-style: normal;
}
.lp-m {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 6px;
  border: 1.5px solid var(--line);
  background: #f8fafc;
  overflow: hidden;
}
.lp.on .lp-m {
  border-color: var(--acc);
  box-shadow: 0 0 0 1px var(--acc);
}
.lp-m span {
  position: absolute;
  background: #cbd5e1;
  border-radius: 2px;
}
.v0 .a1 {
  left: 4px;
  top: 4px;
  bottom: 4px;
  width: 22%;
}
.v0 .a2 {
  left: 30%;
  right: 4px;
  top: 4px;
  height: 14%;
}
.v1 .a1 {
  left: 4px;
  right: 4px;
  top: 4px;
  height: 14%;
}
.v1 .a2 {
  display: none;
}
.v2 .a1 {
  left: 4px;
  right: 4px;
  top: 4px;
  height: 14%;
}
.v2 .a2 {
  left: 4px;
  top: 24%;
  bottom: 4px;
  width: 22%;
}
.k-prefs .sw {
  padding: 8px 0;
}
.pf-f {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.pf-f {
  align-items: center;
}
.frow.btns.sub {
  padding-top: 16px;
  border-top: 1px solid var(--line2);
}
.cl-h {
  padding: 16px 0 8px;
  font-size: 13px;
  color: var(--mute);
  font-weight: 500;
}

/* 内容页与电商 */
.k-results {
  gap: 0;
  padding: 4px 20px;
}
.rs-n {
  padding: 12px 0;
  font-size: 13px;
}
.rs-n b {
  color: var(--acc);
}
.rs {
  display: grid;
  gap: 4px;
  padding: 16px 0;
  border-top: 1px solid var(--line2);
  flex: none;
}
.rs-p {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.rs-t {
  color: var(--acc);
  font-size: 16px;
}
.rs-s {
  color: var(--text);
  font-size: 13px;
}
.k-gallery {
  padding: 0;
  gap: 8px;
  background: transparent;
  border-color: transparent;
}
.gl-m {
  position: relative;
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #fde7c8, #f6d2a8);
}
.gl-m .photo {
  width: 18%;
  fill: rgba(255, 255, 255, 0.75);
}
.gl-c {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.5);
  color: #fff;
  font-size: 12px;
}
.gl-t {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  flex: none;
}
.gl-t i {
  aspect-ratio: 1;
  border-radius: 6px;
}
.gl-t i.on {
  box-shadow: 0 0 0 2px var(--acc);
}
.k-buybox {
  gap: 12px;
  padding: 4px 0;
  background: transparent;
  border-color: transparent;
}
.bb-n {
  font-size: 24px;
}
.bb-r {
  font-size: 13px;
}
.bb-p {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #fff7ed;
}
.bb-p b {
  color: #c2410c;
  font-size: 32px;
}
.bb-p s {
  font-size: 14px;
}
.bb-s {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.bb-s em {
  width: 48px;
  font-style: normal;
  color: var(--mute);
  font-size: 13px;
}
.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 6px;
  overflow: hidden;
}
.qty i,
.qty b {
  display: grid;
  place-items: center;
  width: var(--ctl, 32px);
  height: var(--ctl, 32px);
}
.qty b {
  border-inline: 1px solid var(--line);
  font-weight: 500;
}
.bb-b {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}
.bb-b .btn {
  flex: 1;
}
.bb-d {
  font-size: 12px;
}
@container (max-width: 420px) {
  .bb-b {
    display: none;
  }
  .bb-n {
    font-size: 18px;
  }
  .bb-p b {
    font-size: 24px;
  }
}
.k-addr {
  flex-direction: row;
  align-items: center;
  gap: 16px;
}
.ad-t {
  display: grid;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.ad-t .muted {
  font-size: 13px;
}
.k-radiocards {
  gap: 12px;
}
.rc-h {
  font-size: 16px;
}
.rcs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.rcd {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
}
.rcd > span {
  display: grid;
  gap: 4px;
}
.rcd .muted {
  font-size: 13px;
}
.rcd.on {
  border-color: var(--acc);
  box-shadow: 0 0 0 1px var(--acc);
  background: var(--acc-soft);
}
.rd {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  border-radius: 50%;
  border: 1.5px solid #cbd5e1;
  flex: none;
}
.rcd.on .rd {
  border: 5px solid var(--acc);
}
@container (max-width: 560px) {
  .rcs {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .rcd {
    padding: 12px;
    align-items: center;
  }
  .rcd .muted {
    display: none;
  }
}
.k-summary {
  gap: 8px;
}
.sm-h {
  font-size: 16px;
  margin-bottom: 4px;
}
.sm-r {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--text);
}
.sm-r.tl {
  padding-top: 12px;
  border-top: 1px solid var(--line2);
}
.sm-r.tt {
  padding: 12px 0 4px;
  border-top: 1px solid var(--line);
  font-size: 16px;
}
.sm-r.tt b:last-child {
  color: #c2410c;
  font-size: 24px;
}
.dn {
  color: var(--ok);
}
.k-summary .btn {
  margin-top: 8px;
}
.sm-n {
  font-size: 12px;
  text-align: center;
}
.k-paybar {
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 -6px 18px -10px rgba(15, 23, 42, 0.3);
}
.pb-t {
  display: grid;
  font-size: 12px;
}
.pb-t b {
  color: #c2410c;
  font-size: 24px;
}
.k-searchhero {
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 24px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #eef3ff, #f5f0ff);
  text-align: center;
}
.sh-i {
  width: min(560px, 100%);
  min-height: 48px;
  padding-block: 12px;
  font-size: 16px;
  text-align: left;
}
.sh-k {
  font-size: 13px;
}
@container (max-width: 420px) {
  .k-searchhero {
    padding: 24px 16px;
  }
  .k-searchhero .h2 {
    font-size: 20px;
  }
}
.k-checklist {
  gap: 12px;
  padding: 24px;
}
.k-byline {
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 4px 0 16px;
  border-bottom: 1px solid var(--line2);
}
.by-t {
  display: grid;
  gap: 4px;
}
.by-t .muted {
  font-size: 13px;
}
.icn {
  display: grid;
  justify-items: center;
  gap: 4px;
  width: 40px;
  color: var(--text);
  font-size: 20px;
  line-height: 1;
  flex: none;
}
.icn em {
  font-style: normal;
  font-size: 12px;
  color: var(--mute);
}
@container (max-width: 420px) {
  .k-opbtns .icn + .btn,
  .k-opbtns .icn ~ .btn {
    flex: 1;
  }
}
.ob-h {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.ob-h b {
  font-size: 18px;
}
.ob-bar {
  height: 6px;
  border-radius: 999px;
  background: var(--line2);
  overflow: hidden;
  flex: none;
}
.ob-bar i {
  display: block;
  width: 40%;
  height: 100%;
  background: var(--acc);
}
.ob {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--line2);
  flex: none;
}
.ob-c {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--line);
  color: var(--mute);
  font-size: 14px;
  font-weight: 600;
  flex: none;
}
.ob.done .ob-c {
  background: var(--ok);
  border-color: var(--ok);
  color: #fff;
}
.ob.done .ob-t b {
  color: var(--mute);
  text-decoration: line-through;
}
.ob.cur .ob-c {
  border-color: var(--acc);
  color: var(--acc);
}
.ob-t {
  display: grid;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.ob-t .muted {
  font-size: 13px;
}
.k-calendar {
  gap: 12px;
  padding: 16px;
}
.cal-h {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cal-h b {
  font-size: 18px;
  margin-right: 8px;
}
.cal-g {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(5, 1fr);
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
.cal-w {
  padding: 8px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  color: var(--mute);
  font-size: 12px;
}
.cal-d {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  min-height: 0;
  overflow: hidden;
}
.cal-d em {
  font-style: normal;
  color: var(--text);
}
.cal-d.out em {
  color: #cbd5e1;
}
.cal-d.today em {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--acc);
  color: #fff;
}
.cal-d i {
  padding: 0 6px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}
.cal-d i.t0 {
  background: var(--acc);
}
.cal-d i.t1 {
  background: #d97706;
}
.cal-d i.t2 {
  background: #059669;
}
</style>
