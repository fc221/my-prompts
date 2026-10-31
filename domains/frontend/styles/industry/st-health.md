---
zh: 医疗健康
en: Healthcare
aka: 医疗 健康 问诊 挂号 体检报告 医院 适老化
order: 20
---

## 是什么

白底、清爽的医疗蓝、大字号高对比、规整的卡片分组，指标异常用颜色、箭头和文字三重标出；整页先求看得懂、信得过，再求好看。

## 适合

在线问诊和挂号、体检与检验报告、医院和诊所官网、慢病管理和健康记录 App、药房与医保服务。

## 不适合

养生、瑜伽这类重氛围的健康消费品牌，用「自然有机」；医院内部的医生工作站和管理后台，信息密度更高，用「企业稳重」；任何医疗场景都不要套「电商大促」的倒计时和限时抢购。

## 注意

信任感来自信息完整，不来自装饰：医生的职称、执业机构、费用、隐私说明这些该有的都有，比一张温馨插画更让人放心。医疗广告受法规约束，“根治”“包好”“100% 有效”这类绝对化说法不能出现。

## 要点

- 配色：底 #f5f8fa、卡片白，主色医疗蓝 #0a5c99（配白字 7:1）；正文 #1d2b36（14:1）、次要 #4a5a67（7:1），正文对比度按 7:1 要求；大面积不用红色，红色只留给异常和急救提示
- 可读性：正文 ≥ 16px、行高 1.6–1.75，面向中老年的页面正文 18px，并提供调大字号的入口；数字用 tabular-nums，单位紧跟数值（6.4 mmol/L）；触控目标 ≥ 44×44px
- 指标状态：异常同时用颜色、箭头图标和文字表达（“↑ 偏高”），不只靠红绿区分；偏高、偏低用 #b42318 配浅底 #fef3f2，正常用 #067647 配 #ecfdf3；参考范围紧挨着数值写
- 信任信息：医生卡片写全姓名、职称、科室、执业机构，并能查看执业资质；挂号费、问诊费在支付前完整列出；收集健康数据的页面写明用途，并给出隐私说明入口
- 用语和节奏：不写绝对化的疗效说法，不用倒计时、限时抢购来催促就医和购药；问诊入口固定显示“胸痛、呼吸困难等紧急情况请立即拨打 120”
- 字体与形状：系统黑体（苹方、微软雅黑）或思源黑体，标题 600，不用 800 以上的重字重和装饰字体；圆角 12–16px，阴影只用 0 1px 3px rgba(16,40,60,.08)；分组靠卡片和小标题
- 动效：只做操作反馈，150–200ms ease-out，不放装饰性动画；减少动态效果时去掉过渡
- 窄屏：单列；主要操作按钮满宽、48px 高，放在底部拇指区；报告指标一行一个，数值和状态同行不换行

## 提示词

把{产品}的{页面}做成医疗健康基调：底色 #f5f8fa、卡片白，主色医疗蓝 #0a5c99，正文 #1d2b36、次要 #4a5a67，正文对比度达到 7:1，红色只用于异常和急救提示；正文 ≥ 16px、行高 1.7，面向中老年用户时正文改为 18px 并提供调大字号的入口；触控目标 ≥ 44px；指标异常用颜色、箭头和文字三重表达（偏高偏低 #b42318 配 #fef3f2，正常 #067647 配 #ecfdf3），参考范围紧挨数值，数字 tabular-nums、单位紧跟数值；医生信息写全姓名、职称、科室、执业机构并可查资质，费用在支付前完整列出，收集健康数据时写明用途和隐私说明；不写绝对化疗效用语，不用倒计时和限时抢购，问诊入口固定显示 120 急救提示；系统黑体、标题 600，圆角 14px，阴影 0 1px 3px rgba(16,40,60,.08)；动效只做 150–200ms 的操作反馈；窄屏单列、主按钮满宽 48px 放在底部。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:grid;grid-template-columns:minmax(0,1fr);gap:12px;padding:10px;overflow:hidden;background:#f5f8fa;color:#1d2b36;font:12px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;font-variant-numeric:tabular-nums}
.cd{display:flex;flex-direction:column;gap:8px;min-width:0;padding:10px 12px 12px;border-radius:14px;background:#fff;box-shadow:0 1px 3px rgba(16,40,60,.08)}
header{display:flex;align-items:center;gap:8px;white-space:nowrap}
header b{font-size:14px;font-weight:600}
.ic{flex:none;display:grid;place-items:center;width:22px;height:22px;border-radius:6px;background:#e3eef7}
.ic svg{width:12px;fill:#0a5c99}
header span{color:#4a5a67}
.ok{margin-left:auto;padding:0 8px;border-radius:999px;background:#ecfdf3;color:#067647;font-weight:600}
ul{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-around;margin:0;padding:0;list-style:none}
li{display:grid;grid-template-columns:minmax(0,1fr) auto 52px;grid-template-areas:"k v st" "r v st";align-items:center;column-gap:10px;padding:2px 0;white-space:nowrap}
li+li{border-top:1px solid #e6ecf0}
.k{grid-area:k;font-weight:600}
.r{grid-area:r;color:#4a5a67;font-size:11px}
.v{grid-area:v;font-size:16px;font-weight:600}
.v small{margin-left:2px;color:#4a5a67;font-size:11px;font-weight:400}
.st{grid-area:st;justify-self:end;display:inline-flex;align-items:center;gap:2px;padding:0 6px;border-radius:6px;font-weight:600}
.hi{background:#fef3f2;color:#b42318}
.nm{background:#ecfdf3;color:#067647}
li.more{display:none}
a{display:flex;align-items:center;justify-content:center;height:34px;border-radius:10px;background:#0a5c99;color:#fff;font-size:13px;font-weight:600;text-decoration:none;transition:background-color .15s ease-out}
a:hover{background:#084b7d}
a:focus-visible{outline:3px solid #0a5c99;outline-offset:2px}
.dr{display:none}
.dr .who{display:flex;align-items:center;gap:10px}
.av{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#e3eef7;color:#0a5c99;font-size:18px;font-weight:600}
.dr p{margin:0;color:#4a5a67}
.dr b{color:#1d2b36;font-size:15px;font-weight:600}
.fee{display:flex;justify-content:space-between;padding:8px 0;border-block:1px solid #e6ecf0}
.fee b{font-size:14px}
.dr a{background:#fff;border:1px solid #0a5c99;color:#0a5c99}
.dr a:hover{background:#eef5fb}
.dr .sos{padding:6px 8px;border-radius:8px;background:#fef3f2;color:#b42318}
@container (min-height:260px){.s{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);padding:16px;gap:14px;font-size:14px}
.cd{padding:16px 18px;gap:12px}
header b{font-size:17px}
.ic{width:28px;height:28px}
.ic svg{width:15px}
li{grid-template-columns:minmax(0,1fr) auto 64px;padding:4px 0}
.r{font-size:12px}
.v{font-size:20px}
.v small{font-size:12px}
li.more{display:grid}
a{height:44px;font-size:15px}
.dr{display:flex}
}
@media (prefers-reduced-motion:reduce){a{transition:none}
}
</style>

<div class="s">
  <section class="cd" aria-label="体检报告摘要">
    <header><i class="ic" aria-hidden="true"><svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="14" rx="1"/><rect x="1" y="6" width="14" height="4" rx="1"/></svg></i><b>体检报告</b><span>2026-10-12</span><span class="ok">已出报告</span></header>
    <ul>
      <li><span class="k">空腹血糖</span><span class="r">参考 3.9–6.1</span><span class="v">6.4<small>mmol/L</small></span><span class="st hi">↑ 偏高</span></li>
      <li><span class="k">总胆固醇</span><span class="r">参考 &lt; 5.2</span><span class="v">4.6<small>mmol/L</small></span><span class="st nm">✓ 正常</span></li>
      <li class="more"><span class="k">血压</span><span class="r">参考 &lt; 140/90</span><span class="v">118/76<small>mmHg</small></span><span class="st nm">✓ 正常</span></li>
    </ul>
    <a href="#">咨询医生解读报告</a>
  </section>
  <aside class="cd dr" aria-label="解读医生">
    <div class="who"><span class="av" aria-hidden="true">王</span><p><b>王静怡</b> 主任医师<br>内分泌科 · 市第一人民医院</p></div>
    <div class="fee"><span>图文问诊</span><b>¥39 / 次</b></div>
    <a href="#">查看执业资质</a>
    <p class="sos">胸痛、呼吸困难等紧急情况请立即拨打 120</p>
  </aside>
</div>
