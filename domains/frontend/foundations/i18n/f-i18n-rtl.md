---
zh: 从右往左的界面
en: Right-to-left layout
order: 30
---

## 是什么

阿拉伯语、希伯来语界面整体从右往左排：布局和带方向的图标跟着镜像，号码、代码和音视频播放进度保持从左往右。

## 适合

要支持阿拉伯语、希伯来语、波斯语、乌尔都语的产品。

## 不适合

不支持这些语言时，不用专门做镜像，但写样式时用逻辑属性仍然更省事。

## 注意

只在根元素加 dir="rtl" 不够：样式里写死的 left、right、margin-left 和 translateX 不会跟着翻，返回箭头也还指着原来的方向。

## 要点

- 根元素设 dir 和 lang；样式用逻辑属性：margin-inline-start、padding-inline、inset-inline-start、border-start-start-radius、text-align: start
- flex 和 grid 会随 dir 自动反向；横向位移和滑入动画在 :dir(rtl) 下反转方向
- 表示方向的图标（返回、前进、展开箭头、列表缩进）在从右往左时水平翻转；对勾、搜索、播放这类不表示方向的图标不翻
- 电话号码、金额、日期、代码、拉丁字母品牌名用 <bdi> 或 unicode-bidi: isolate 隔离，内部仍然从左往右
- 音视频的播放键和进度条保持从左往右；加载进度、步骤条、轮播跟着界面方向
- 用伪本地化或真实译文截图检查：每个页面在两个方向下都看一遍

## 提示词

让{页面}支持从右往左的语言：根元素按语言设 dir 和 lang；样式里的 left / right / margin-left 等全部换成逻辑属性（margin-inline-start、padding-inline、inset-inline-start、text-align: start），横向位移和滑入动画在 :dir(rtl) 下反转；返回、前进、展开箭头等表示方向的图标在从右往左时水平翻转，对勾、搜索、播放不翻；电话号码、金额、日期、代码和品牌名用 <bdi> 隔离；音视频播放键和进度条保持从左往右，加载进度、步骤条、轮播跟着界面方向；加一个切换方向的开关，两个方向各截一张图对比。

## 示例

<style>
.s{height:100%;display:grid;align-content:center;justify-items:center;gap:8px;padding:12px 16px;background:#f5f6f8;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC","Geeza Pro",sans-serif}
.card{width:min(100%,300px);border-radius:12px;background:#fff;border:1px solid #e3e6eb;overflow:hidden}
.hd{display:flex;align-items:center;gap:6px;height:30px;padding-inline:8px 12px;border-bottom:1px solid #eef0f3;font-weight:600}
.r{display:flex;align-items:center;gap:8px;height:30px;padding-inline:12px;border-top:1px solid #f1f3f6}
.hd+.r{border-top:0}
.r .lb{flex:1;min-width:0}
.r bdi{color:#5b616e;font-variant-numeric:tabular-nums}
.dir{flex:none;color:#98a1ad}
/* 表示方向的图标在从右往左时翻转 */
.card:dir(rtl) .dir{transform:scaleX(-1)}
/* 音视频控制始终从左往右 */
.media{display:flex;align-items:center;gap:8px;flex:1;min-width:0;direction:ltr}
.play{flex:none;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#3b5bdb;color:#fff}
.tr{flex:1;height:4px;border-radius:2px;background:linear-gradient(90deg,#3b5bdb 40%,#e3e6eb 40%)}
.media small{color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums}
.msg{margin:0;min-height:17px;font-size:12px;color:#5b616e;text-align:center}
@container (max-height:220px){.msg{display:none}
}
</style>

<div class="s">
  <button type="button" class="ctl">看从右往左</button>
  <div class="card" dir="ltr" lang="en">
    <div class="hd"><svg class="dir" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5"/></svg><span data-t="t"></span></div>
    <div class="r"><span class="lb" data-t="a"></span><svg class="dir" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5"/></svg></div>
    <div class="r"><span class="lb" data-t="p"></span><bdi dir="ltr">+971 50 123 4567</bdi></div>
    <div class="r"><span class="lb" data-t="v"></span><div class="media"><span class="play" aria-hidden="true"><svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor"><path d="M0 0l8 4.5L0 9z"/></svg></span><span class="tr" aria-hidden="true"></span><small>0:17 / 0:42</small></div></div>
  </div>
  <p class="msg" role="status"></p>
</div>

<script type="module">
const T = {
  en: { t: 'Settings', a: 'Account', p: 'Phone', v: 'Voice note' },
  ar: { t: 'الإعدادات', a: 'الحساب', p: 'الهاتف', v: 'رسالة صوتية' },
};
export default function demo(root) {
  const card = root.querySelector('.card'), btn = root.querySelector('.ctl'), msg = root.querySelector('.msg');
  const set = (rtl) => {
    const l = rtl ? 'ar' : 'en';
    card.dir = rtl ? 'rtl' : 'ltr'; card.lang = l;
    card.querySelectorAll('[data-t]').forEach((el) => (el.textContent = T[l][el.dataset.t]));
    btn.textContent = rtl ? '看从左往右' : '看从右往左';
    msg.textContent = rtl ? '布局和箭头镜像；号码和播放进度仍从左往右' : '从左往右';
  };
  btn.onclick = () => set(card.dir !== 'rtl');
  set(false);
  setTimeout(() => root.host.isConnected && set(true), 700);
}
</script>
