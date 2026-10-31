// 知识库数据结构：网页使用的摊平数据。内容作者写的是 src/adapter 里的 EntryInput 等（不用写 sec、cat），由 adaptDomain 转成这里的结构；校验见 scripts/validate.mjs。

/** 布局示意图里的一个区域：标签决定画什么迷你界面（也可用 kind 指定），acc 描边高亮主体，dark 深色块，inner 嵌套子网格 */
export interface WireBox {
  label?: string;
  kind?: MockKind;
  acc?: boolean;
  dark?: boolean;
  /** 区域里显示的文案（标签只用于标注，画面里要显示别的标题时写这个） */
  text?: string;
  /** 嵌套区域画成白色卡片（登录卡片、手机屏幕） */
  card?: boolean;
  /** 文字和按钮居中（居中首屏、居中卡片） */
  center?: boolean;
  inner?: Wire;
}

/** 示意图：CSS grid 的列、行和区域名；boxes 的键对应 areas 里的区域名 */
export interface Wire {
  cols?: string;
  rows?: string;
  areas: string[];
  boxes: Record<string, string | WireBox>;
  /** 盖在页面上的抽屉（左 / 右侧，size 是宽度）、底部面板（bottom，size 是高度）或居中弹窗（center，size 宽、height 高），后面自动加遮罩；open 表示缩略图里默认画成打开（面板就是这个布局要展示的东西时） */
  drawer?: {
    side?: 'left' | 'right' | 'bottom' | 'center';
    size: string;
    height?: string;
    box: string | WireBox;
    open?: boolean;
  };
}

/** 实时示例：在 Shadow DOM 里渲染，自带背景和颜色；js 拿到影子根，持续循环要在 root.host 断开后停止 */
export interface Demo {
  html: string;
  css: string;
  js?: (root: ShadowRoot) => void;
}

export interface Entry {
  /** 小写字母数字和连字符，全库唯一；各领域用自己的前缀 */
  id: string;
  /** 板块 key：由条目所在的板块目录决定，adapter 补上 */
  sec: string;
  /** 分类名：由条目所在的分类文件决定，adapter 补上 */
  cat: string;
  zh: string;
  en?: string;
  /** 别名：别处常见的叫法，空格分隔，只用于搜索 */
  aka?: string;
  /** 一句话：是什么 / 长什么样 */
  look: string;
  use?: string;
  avoid?: string;
  care?: string;
  /** 要点，每条一句，具体到数值和状态 */
  rules?: string[];
  /** 复制即用的提示词，需要替换的对象写成 {占位} */
  prompt: string;
  demo?: Demo;
  wire?: Wire;
  wireMobile?: Wire;
}

export interface Section {
  key: string;
  name: string;
  intro: string;
  /** 图标名，见 src/components/AppIcon.vue */
  icon?: string;
  /** 板块色：图标块和卡片悬停描边 */
  color?: string;
}

export interface Domain {
  key: string;
  name: string;
  order?: number;
  /** 侧栏收起时分组的图标，见 src/components/AppIcon.vue */
  icon?: string;
  desc: string;
  searchHint?: string;
  /** 组合提示词末尾附上的通用要求 */
  tail?: string;
  sections: Section[];
  entries: Entry[];
}

/** 加载后的条目：带上领域 key */
export interface KbEntry extends Entry {
  domain: string;
}

export type MockKind =
  | 'nav'
  | 'topbar'
  | 'tabbar'
  | 'kpi'
  | 'strip'
  | 'line'
  | 'chart'
  | 'table'
  | 'filters'
  | 'form'
  | 'composer'
  | 'chat'
  | 'search'
  | 'hero'
  | 'heading'
  | 'image'
  | 'card'
  | 'list'
  | 'steps'
  | 'tabs'
  | 'toc'
  | 'actions'
  | 'button'
  | 'pricing'
  | 'faq'
  | 'logos'
  | 'footer'
  | 'cta'
  | 'code'
  | 'profile'
  | 'notice'
  | 'timeline'
  | 'kanban'
  | 'text'
  | 'brand'
  | 'block'
  | 'toolbar'
  | 'pager'
  | 'danger'
  | 'select'
  | 'segment'
  | 'plan'
  | 'pagehead'
  | 'stepitem'
  | 'row'
  | 'bubble'
  | 'avatar'
  | 'cell'
  | 'btnrow'
  | 'empty'
  | 'event'
  | 'ruler'
  | 'input'
  | 'link'
  | 'linkcol'
  | 'quote'
  | 'title'
  | 'subtitle'
  | 'btnpair'
  | 'content'
  | 'field'
  | 'objhead'
  | 'opbtns'
  | 'record'
  | 'fbar'
  | 'activity'
  | 'switches'
  | 'colhead'
  | 'task'
  | 'agenda'
  | 'feature'
  | 'mtop'
  | 'compare'
  | 'wordmark'
  | 'answer'
  | 'facets'
  | 'chips'
  | 'aitop'
  | 'session'
  | 'artcard'
  | 'captcha'
  | 'bullets'
  | 'catlist'
  | 'catcard'
  | 'secdesc'
  | 'setrows'
  | 'dlghead'
  | 'prefs'
  | 'results'
  | 'gallery'
  | 'buybox'
  | 'addr'
  | 'radiocards'
  | 'summary'
  | 'paybar'
  | 'searchhero'
  | 'checklist'
  | 'calendar'
  | 'byline';
