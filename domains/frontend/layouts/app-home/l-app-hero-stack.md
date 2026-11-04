---
zh: 满版头图 + 浮起信息卡
en: Full-bleed header + floating card
order: 20
of: l-app-home
---

## 是什么

顶部一张满版大图做头部，标题压在图上；一张白色信息卡上移压住图片下沿，卡里只放一行标题、一句说明和一个主按钮。

## 适合

目的地、活动、酒店、展览这类“先被画面吸引、再看关键信息”的详情式首页或详情页。

## 不适合

没有好图时不要用，空洞的大图不如普通列表；信息很多的页面（订单、表单）不适合，叠压会挤掉首屏空间。

## 注意

压在图上的文字要加底部渐变遮罩保证对比度；图上的状态栏和返回按钮用白色，并带半透明底。

## 要点

- 头图高度约屏高的 40%（280–320px），满版不留边，底部 40% 加深色渐变遮罩
- 标题 26–28px 白色压在图左下角，上面一行 12–13px 小字写地点或天数
- 信息卡上移 40–56px 压住图片下沿，圆角 20–24px，阴影带底色、浓度约 12–16%
- 信息卡里只放三样：一行 17–18px 标题、一行 13px 次要色说明（超出一行截断）和一个通栏主按钮；日期、图表这类第二层信息放到卡片下方
- 图上的返回、收藏按钮 36–40px 圆形，白色半透明底加模糊，在任何图上都看得清
- 下方内容用横滑卡片，不再出现第二张大图

## 提示词

{产品}的{页面}用「满版头图 + 浮起信息卡」：顶部满版头图约 300px 高，底部加深色渐变，标题“{标题}”26px 白色压在左下角、上面一行小字写{副信息}；返回和收藏按钮 40px 圆形、白色半透明底带模糊；一张白色信息卡上移 48px 压住图片下沿（圆角 22px、带色相的柔和阴影），卡里放一行标题“{卡片标题}”、一行次要色说明“{一句说明}”和一个通栏主按钮“{主行动}”；下方是横滑的{亮点卡片}；状态栏在图上用白色。

## 示例

<link rel="stylesheet" href="../../_shared/app-phone.css">
<style>
.ph>.sb{position:absolute;inset:0 0 auto;z-index:2;color:#fff}
.hero{position:relative;height:300px;padding-top:44px;background:radial-gradient(circle at 74% 30%,#fff4d6 0 5%,transparent 5.5%),radial-gradient(ellipse 70% 42% at 24% 100%,#c9784f 0 62%,transparent 63%),radial-gradient(ellipse 62% 36% at 88% 100%,#b5664a 0 62%,transparent 63%),radial-gradient(ellipse 90% 30% at 55% 100%,#e0a07a 0 62%,transparent 63%),linear-gradient(180deg,#f6c99a 0,#f2a77f 48%,#9fb9c9 48.5%,#7fa3b8 66%)}
.hero::after{content:"";position:absolute;inset:auto 0 0;height:60%;background:linear-gradient(180deg,transparent,rgba(20,16,12,.62))}
.ib{position:relative;z-index:1;display:flex;justify-content:space-between;padding:6px 16px}
.ib button{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.28);backdrop-filter:blur(8px);color:#fff;font-size:20px;line-height:1}
.ttl{position:absolute;left:20px;bottom:64px;z-index:1;display:grid;color:#fff}
.ttl span{font-size:12px;opacity:.9}
.ttl b{font-size:27px;line-height:1.25}
.info{position:relative;z-index:1;display:grid;gap:6px;margin:-48px 16px 0;padding:16px 16px 14px;border-radius:22px;background:#fff;box-shadow:0 14px 32px -14px rgba(60,40,20,.32)}
.info h2{margin:0;font-size:18px;line-height:1.3}
.info p{margin:0;color:#6b7280;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.go{height:44px;margin-top:6px;border-radius:12px;background:#15171c;color:#fff;font-weight:600;font-size:14px}
.sec{margin:20px 20px 10px;font-weight:700;font-size:16px}
.th{display:flex;gap:12px;padding:0 20px 20px;overflow-x:auto;scrollbar-width:none}
.th figure{flex:none;width:132px;margin:0}
.th i{display:block;height:92px;border-radius:16px}
.th figcaption{margin-top:6px;font-size:13px;font-weight:600}
.g5{background:linear-gradient(180deg,#9fd0ee 0 40%,#f3d36b 40% 70%,#5b6b7b 70%)}
.g6{background:linear-gradient(180deg,#f7b267,#f27d52 55%,#5b3a55)}
.g12{background:radial-gradient(circle at 50% 60%,#f2c14e 0 26%,#d98c2b 27% 34%,transparent 35%),#f4e6d0}
</style>

<div class="st"><div class="fr"><div class="ph"><div class="sb" aria-hidden="true"><span>9:41</span><span class="bat"></span></div><div class="scr"><div class="hero"><div class="ib"><button type="button" aria-label="返回">‹</button><button type="button" aria-label="收藏">♡</button></div><div class="ttl"><span>福建 · 3 天 2 晚</span><b>泉州老城</b></div></div><div class="info"><h2>寺庙、老街和一碗面线糊</h2><p>每天步行约 6 公里，晚上回古城民宿休息</p><button type="button" class="go">查看完整行程</button></div><p class="sec">行程亮点</p><div class="th"><figure><i class="g5"></i><figcaption>开元寺</figcaption></figure><figure><i class="g6"></i><figcaption>西街夜市</figcaption></figure><figure><i class="g12"></i><figcaption>面线糊老店</figcaption></figure></div></div><nav class="tb" aria-label="底部导航"><button type="button" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/></svg>行程</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>发现</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/></svg>收藏</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.8 4.2-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/></svg>我的</button></nav></div></div><ol class="lg" aria-label="版式要点"><li><b>01</b><span>满版大图做头部，标题压在图上</span></li><li><b>02</b><span>信息卡上移，压住图片下沿约 48px</span></li><li><b>03</b><span>卡里只放标题、一句说明和一个主按钮</span></li><li><b>04</b><span>下方是横滑的亮点卡片</span></li></ol></div>

<script type="module">
import { fit } from '../../_shared/app-phone.ts';

export default function demo(root) {
  fit(root);
}
</script>
