---
zh: 优化暗色模式
en: Ugly dark mode
aka: 暗色模式难看
order: 240
---

## 是什么

症状：暗色下发灰发脏，卡片和背景分不清，品牌色刺眼或发暗，阴影看不见。

## 要点

- 把当前亮色的颜色变量一起贴进去。
- 暗色单独定义，不许用滤镜反相。
- 改完逐项核对文字对比度。

## 提示词

暗色模式很难看，请单独设计一套暗色，不要用滤镜或简单反相：
1. 背景不用纯黑，用很深的灰（如 #111216）；卡片、弹层逐级变亮（相邻层只差一点明度），靠表面明度区分层级，而不是到处加边框。
2. 边框用低对比的细线；暗色下阴影基本看不见，浮层改用更亮的表面加细边框。
3. 文字不用纯白：主文字约 #eceef2，次要文字约 #9aa0ab，都核对对比度 ≥ 4.5:1。
4. 强调色：主按钮仍用饱和的品牌色；链接和小字用提亮后的品牌色以保证可读。
5. 状态色、图表色按暗色背景重新调亮度，不直接沿用亮色值。
6. 图片和插图避免大片纯白，必要时降低亮度。
7. 声明 color-scheme: dark，让滚动条、表单控件、选中文字颜色跟随主题；切换主题时不闪白。
当前颜色变量：{亮色变量}
输出暗色变量表，并说明每个值的用途。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{position:relative;padding:8px;font-size:10px;line-height:14px}
.hd{display:flex;align-items:center;justify-content:space-between;font-size:11px;line-height:16px;font-weight:600}
.lk{font-size:10px;font-weight:400}
.cd{margin-top:6px;padding:6px;border-radius:6px}
.tl{display:flex;align-items:center;gap:6px;font-weight:600}
.st{font-size:9px;line-height:14px;font-weight:400}
.mt{margin-top:2px;font-size:9px;line-height:12px}
.im{height:22px;margin-top:6px;border-radius:4px}
.bt{display:inline-block;margin-top:6px;padding:0 8px;border-radius:4px;background:#3b5bdb;color:#fff;line-height:18px}
.pp{position:absolute;top:60px;right:8px;width:58px;padding:3px 0;border-radius:6px;font-size:9px;line-height:14px}
.pp div{padding:0 7px}
/* 改前的暗色：灰黑脏底，卡片靠粗边框才和底色分开，纯白文字配过暗的次要字，亮色下的链接蓝和状态色直接拿来用，图片大片纯白，阴影看不见 */
.bad{background:#1c1c1c;color:#fff}
.bad .lk{color:#1d4ed8}
.bad .cd{background:#242424;border:1px solid #5a5a5a;box-shadow:0 6px 16px rgba(0,0,0,.5)}
.bad .st{padding:0 5px;border-radius:3px;background:#fef3c7;color:#b45309}
.bad .mt{color:#666}
.bad .im{background:#f4f4f4}
.bad .pp{background:#242424;border:1px solid #5a5a5a;box-shadow:0 8px 20px rgba(0,0,0,.6)}
/* 改后的暗色：深灰底，卡片、浮层逐级变亮，细边框，文字 #eceef2 / #9aa0ab，链接用提亮的品牌色，状态色和图片按暗色重调 */
.good{background:#111216;color:#eceef2}
.good .lk{color:#8ab4ff}
.good .cd{background:#1a1c22;border:1px solid rgba(255,255,255,.08)}
.good .st{color:#e6b85c}
.good .st::before{content:'';display:inline-block;width:5px;height:5px;margin-right:4px;border-radius:50%;background:#e6b85c;vertical-align:1px}
.good .mt{color:#9aa0ab}
.good .im{background:linear-gradient(135deg,#3b4a66,#262b36)}
.good .pp{background:#262a33;border:1px solid rgba(255,255,255,.12)}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前的暗色</h4><div class="fx-b"><div class="fx-z c bad"><div class="hd">工单中心<span class="lk">查看全部</span></div><div class="cd"><div class="tl">显示屏黑屏<span class="st">处理中</span></div><div class="mt">#2041 · 西湖店</div><div class="im"></div></div><span class="bt">新建工单</span><div class="pp"><div>转交</div><div>关闭工单</div></div></div></div></section>
  <section class="fx-p ok"><h4>改后的暗色</h4><div class="fx-b"><div class="fx-z c good"><div class="hd">工单中心<span class="lk">查看全部</span></div><div class="cd"><div class="tl">显示屏黑屏<span class="st">处理中</span></div><div class="mt">#2041 · 西湖店</div><div class="im"></div></div><span class="bt">新建工单</span><div class="pp"><div>转交</div><div>关闭工单</div></div></div></div></section>
</div>
