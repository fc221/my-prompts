---
zh: 粗标题 + 满宽图卡流
en: Bold heading + image feed
order: 10
---

## 是什么

顶部两行粗体大标题，下面是搜索框配深色圆形筛选按钮，列表是一张张满宽大图卡片，名称、参数和箭头按钮在图片下方排成一行。

## 适合

以图片为主、一次只需要看一个对象的浏览型首页：营地、民宿、路线、车型、课程。

## 不适合

需要并排比较价格和参数时用两列网格或列表；图片质量不稳定（用户上传、尺寸不一）时用小图列表，满宽大图会把问题放大。

## 注意

大标题是品牌感的主要来源，控制在两行内；首屏要露出下一张卡片的顶边，让人知道还能往下滑。

## 要点

- 页边距 20px，标题、搜索框、卡片的左边线对齐
- 标题两行以内，30–34px、800 字重、行高 1.1–1.2，不居中
- 搜索框高 44px、圆角 22px；右侧筛选按钮 44px 深色实心圆，和搜索框同高对齐
- 卡片满宽，图片固定 16:10、object-fit: cover、圆角 20–24px；卡片间距 18–24px
- 图片下方一行：名称 16px 粗体单行省略、参数 12–13px 次要色、40px 圆形描边箭头按钮
- 首屏露出第二张卡片的顶边；首张图优先加载、其余懒加载，加载前用浅色占位并保留比例
- 平板宽度改两列网格，标题仍左对齐

## 提示词

{产品}首页用「粗标题 + 满宽图卡流」：页边距 20px；顶部两行粗体大标题“{标题文案}”（32px、800 字重、行高 1.15、左对齐）；下面是 44px 高的圆角搜索框，右侧放一个同样 44px 的深色实心圆形筛选按钮；再下面一排可横滑的分类标签（选中项黑底白字）；列表每项是满宽大图卡片：图片 16:10、圆角 24px，图片下方一行放名称（单行省略）、{卡片参数}和 40px 圆形箭头按钮；卡片间距 20px，首屏露出第二张卡片的顶边；首张图优先加载、其余懒加载并保留比例占位；底部标签栏 56px 加安全区；平板改两列网格。

## 示例

<link rel="stylesheet" href="../../_shared/app-phone.css">
<style>
.big{margin:14px 20px 0;font:800 32px/1.15 system-ui,"PingFang SC",sans-serif;letter-spacing:-.5px}
.sch{display:flex;gap:10px;margin:18px 20px 0}
.search{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:44px;padding:0 14px;border-radius:22px;background:#f1f2f5;color:#80858f;font-size:14px;white-space:nowrap;overflow:hidden}
.search svg,.flt svg,.go svg{width:20px;height:20px;flex:none;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round}
.flt{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#15171c;color:#fff}
.card{margin:18px 20px 0}
.card:last-child{margin-bottom:20px}
.img{position:relative;aspect-ratio:16/10;border-radius:22px;overflow:hidden}
.tag{position:absolute;left:12px;top:12px;padding:3px 10px;border-radius:12px;background:rgba(255,255,255,.9);font-size:12px;font-weight:600}
.row{display:flex;align-items:center;gap:12px;margin-top:10px}
.t{flex:1;min-width:0;display:grid}
.t b{font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.t span{color:#6b7080;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.go{flex:none;display:grid;place-items:center;width:40px;height:40px;border:1px solid #e3e5ea;border-radius:50%}
.g1{background:radial-gradient(circle at 72% 30%,#fff1c1 0 7%,transparent 7.5%),linear-gradient(162deg,transparent 58%,#3b4659 58.5%),linear-gradient(198deg,transparent 52%,#5a6680 52.5%),linear-gradient(180deg,#f9c98b,#f29e74 45%,#b9727c 72%,#6f5a7a)}
.g2{background:linear-gradient(180deg,transparent 64%,#3d7d86 64%,#2b5f67),linear-gradient(170deg,transparent 52%,#2f5a45 52.5%),linear-gradient(192deg,transparent 46%,#4b7d5f 46.5%),linear-gradient(180deg,#c4e4f3,#eef6ef)}
.g3{background:radial-gradient(ellipse at 28% 100%,#c27a45 0 42%,transparent 42.5%),radial-gradient(ellipse at 82% 100%,#dd9c62 0 48%,transparent 48.5%),linear-gradient(180deg,#8cc3e8,#f5dbb0 72%)}
</style>

<div class="st"><div class="fr"><div class="ph"><div class="sb" aria-hidden="true"><span>9:41</span><span class="bat"></span></div><div class="scr"><div class="hd"><span class="brand">MyPrompts</span><span class="av" aria-hidden="true">林</span></div><p class="big">找一处营地<br>过个慢周末</p><div class="sch"><div class="search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>搜索营地、湖泊、城市</div><button type="button" class="flt" aria-label="筛选"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg></button></div><div class="chips" role="group" aria-label="分类"><button type="button" aria-pressed="true">全部</button><button type="button" aria-pressed="false">山野</button><button type="button" aria-pressed="false">湖边</button><button type="button" aria-pressed="false">海岸</button><button type="button" aria-pressed="false">沙漠</button></div><article class="card"><div class="img g1"><span class="tag">本周热门</span></div><div class="row"><div class="t"><b>松林坡营地</b><span>2–4 人 · 车程 1.5 小时 · ¥268 起</span></div><button type="button" class="go" aria-label="查看松林坡营地"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 7l5 5-5 5"/></svg></button></div></article><article class="card"><div class="img g2"><span class="tag">新上架</span></div><div class="row"><div class="t"><b>镜湖木屋</b><span>2 人 · 湖景露台 · ¥420 起</span></div><button type="button" class="go" aria-label="查看镜湖木屋"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 7l5 5-5 5"/></svg></button></div></article><article class="card"><div class="img g3"></div><div class="row"><div class="t"><b>风蚀谷车营</b><span>4 人 · 星空观测 · ¥198 起</span></div><button type="button" class="go" aria-label="查看风蚀谷车营"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 7l5 5-5 5"/></svg></button></div></article></div><nav class="tb" aria-label="底部导航"><button type="button" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/></svg>首页</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>发现</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/></svg>收藏</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.8 4.2-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/></svg>我的</button></nav></div></div><ol class="lg" aria-label="版式要点"><li><b>01</b><span>两行粗体大标题，左对齐</span></li><li><b>02</b><span>搜索框配同高的深色圆形筛选按钮</span></li><li><b>03</b><span>横滑分类标签，选中项黑底白字</span></li><li><b>04</b><span>满宽大图卡，名称、参数、箭头在同一行</span></li><li><b>05</b><span>首屏露出下一张卡片的顶边</span></li></ol></div>

<script type="module">
import { fit, chips } from '../../_shared/app-phone.ts';

export default function demo(root) {
  fit(root); chips(root);
}
</script>
