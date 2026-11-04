---
zh: 黑白单主角
en: Monochrome with one hero
order: 30
of: l-app-home
---

## 是什么

整页只用黑、白和浅灰：浅灰底上一律白卡片，只有最重要的那一块做成黑底白字，不用第三种颜色也分得清主次。

## 适合

健身、日程、阅读、工具类 App 首页，想要干净有质感，而且有一件“今天最该做的事”。

## 不适合

需要用颜色区分多种状态或分类（交易涨跌、多标签日历）时不适合；品牌色很强的产品别硬套黑白。

## 注意

黑块只能有一块，多了就没有主次；灰底和白卡之间的明度差要够（如 #F3F3F4 和 #FFF），否则卡片糊成一片。

## 要点

- 底色浅灰（约 #F3F3F4），卡片纯白、圆角 20px，不加描边，阴影很淡或不用
- 最重要的一块黑底（#0B0B0C）白字，放在首屏标题下方，里面一个白色实心按钮
- 其余卡片全部白底黑字，靠间距分组（组内 8–12px、组间 20–24px）
- 选中的标签、进度条、标签栏当前项也用黑色，不引入第三种颜色
- 次要文字用 #6B6B70 左右的灰，白底上对比度 ≥ 4.5:1
- 图标统一线性 1.75px，在黑块里反白

## 提示词

{产品}首页用「黑白单主角」：整页只用黑、白和浅灰，底色 #F3F3F4，所有卡片白底、圆角 20px、不加描边；只有最重要的“{今日主任务}”做成黑底白字的大卡片放在标题下方，里面一个白色实心按钮“{主行动}”；其余{次要内容}全部白卡黑字，组内间距 12px、组间 24px；选中的分类标签、进度条和标签栏当前项也用黑色，不引入第三种颜色；次要文字用 #6B6B70；图标线性 1.75px。

## 示例

<link rel="stylesheet" href="../../_shared/app-phone.css">
<style>
.ph{background:#f3f3f4}
.tb{background:#fff}
.hl{display:grid}
.hl span{color:#6b6b70;font-size:12px}
.hl b{font-size:26px;line-height:1.3}
.av{background:#0b0b0c}
.chips button{border-color:#fff;background:#fff;color:#3a3a3f}
.chips button[aria-pressed=true]{border-color:#0b0b0c;background:#0b0b0c}
.main{position:relative;display:grid;justify-items:start;gap:2px;margin:16px 20px 0;padding:20px;border-radius:22px;background:#0b0b0c;color:#fff;overflow:hidden}
.main .k{color:#a9a9ae;font-size:12px}
.main b{font-size:24px}
.main .d{color:#c9c9ce;font-size:13px}
.wb{position:relative;z-index:1;margin-top:14px;height:40px;padding:0 20px;border-radius:20px;background:#fff;color:#0b0b0c;font-weight:700}
.arc{position:absolute;right:-40px;top:-30px;width:170px;height:170px;border:18px solid #2a2a2e;border-radius:50%}
.arc::after{content:"";position:absolute;inset:22px;border:2px solid #3a3a40;border-radius:50%}
.wk{margin:24px 20px 0;padding:16px;border-radius:20px;background:#fff}
.wt{display:flex;justify-content:space-between;align-items:baseline}
.wt span{color:#6b6b70;font-size:12px}
.seg{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin-top:10px}
.seg i{height:8px;border-radius:4px;background:#e6e6e8}
.seg .on{background:#0b0b0c}
.ls{display:grid;gap:8px;margin:12px 20px 20px}
.it{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:20px;background:#fff;text-align:left}
.ic{display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:14px;background:#f3f3f4;font-style:normal;font-weight:700}
.it span{flex:1;min-width:0;display:grid}
.it small{color:#6b6b70;font-size:12px}
.it em{color:#6b6b70;font-style:normal;font-size:20px}
</style>

<div class="st"><div class="fr"><div class="ph"><div class="sb" aria-hidden="true"><span>9:41</span><span class="bat"></span></div><div class="scr"><div class="hd"><div class="hl"><span>10月14日 周二</span><b>今日训练</b></div><span class="av" aria-hidden="true">林</span></div><div class="chips" role="group" aria-label="训练类型"><button type="button" aria-pressed="true">全部</button><button type="button" aria-pressed="false">拉伸</button><button type="button" aria-pressed="false">力量</button><button type="button" aria-pressed="false">有氧</button></div><div class="main"><span class="k">今日推荐</span><b>晨间拉伸</b><span class="d">20 分钟 · 低强度 · 适合久坐</span><button type="button" class="wb">开始训练</button><i class="arc" aria-hidden="true"></i></div><div class="wk"><div class="wt"><b>本周进度</b><span>3 / 5 次</span></div><div class="seg" aria-hidden="true"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i></div></div><div class="ls"><button type="button" class="it"><i class="ic">肩</i><span><b>肩颈放松</b><small>12 分钟 · 坐姿可做</small></span><em>›</em></button><button type="button" class="it"><i class="ic">核</i><span><b>核心激活</b><small>15 分钟 · 需要瑜伽垫</small></span><em>›</em></button><button type="button" class="it"><i class="ic">睡</i><span><b>睡前舒展</b><small>10 分钟 · 放松</small></span><em>›</em></button></div></div><nav class="tb" aria-label="底部导航"><button type="button" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/></svg>今天</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>课程</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/></svg>收藏</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.8 4.2-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/></svg>我的</button></nav></div></div><ol class="lg" aria-label="版式要点"><li><b>01</b><span>整页只用黑、白、浅灰</span></li><li><b>02</b><span>最重要的一块做成黑底白字</span></li><li><b>03</b><span>其余卡片一律白底，用间距分组</span></li><li><b>04</b><span>选中态也用黑色，不引入第三种颜色</span></li></ol></div>

<script type="module">
import { fit, chips } from '../../_shared/app-phone.ts';

export default function demo(root) {
  fit(root); chips(root);
}
</script>
