---
zh: 沿圆圈排的文字
en: Circular text
aka: 环形文字 旋转徽章 圆形文字 弧形文字 circular text
order: 210
---

## 是什么

一句短文字沿圆圈排满一整圈、慢慢旋转，中间放图标或箭头，做成按钮、头像或“向下滚动”提示旁边的小徽章。

## 适合

作品集和活动页的“看作品”“联系我”入口、头像旁的“开放合作”标记、首屏底部的向下滚动提示、价格卡上的限时角标。

## 不适合

要被认真读完的说明文字；超过 20 个字的句子（排一圈太挤）；同一屏放好几个会转的徽章。

## 注意

圈上的字只是装饰：整个徽章可点时，它本身就是 <a> 或 <button>，用 aria-label 写清去向，SVG 整个 aria-hidden。首尾要刚好接上，结尾不留一截空白，也不和开头叠字。

## 要点

- 结构：SVG viewBox 0 0 100 100，<path> 用两段弧画一个整圆（M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0），从 9 点钟顺时针走，字头朝外；<text><textPath href="#id"> 沿它排字，id 在页面里唯一
- 首尾接上：<textPath> 写 textLength = 圆周长（r = 38 时 238.76）和 lengthAdjust="spacing"，字距自动摊满一圈；句子写成“短语 · 短语 · ”，结尾也留一个 ·；最后的空格会被 SVG 吞掉，写成 &nbsp;，首尾的间隔才和中间一样
- 中文字少时把句子重复一遍铺满；先估长度：字数 × 字号 + 每个分隔约 1 个字宽 ≈ 周长，差得多就增减字或调字号，全靠 textLength 撑会变得稀疏或挤成一团
- 尺寸：直径 96–140px，字 12–14px、字重 600；文字和底色对比度 ≥ 4.5:1；中间的图标或箭头 20–24px，放在一个小圆底上
- 只转文字环：旋转加在装字的 SVG 上，中心图标单独一层、不转；12–20 秒一圈，linear、infinite
- 悬停和键盘聚焦时暂停（animation-play-state: paused）或加速二选一；要加速就改 Web Animations 的 playbackRate，直接改 animation-duration 会跳角度
- 可点时整个圆是点击区（触屏不小于 44px），焦点环 2px、偏移 2px，跟着 border-radius: 50% 画成圆
- 减少动态效果时不转；路径从 9 点钟起笔，静止时第一句正好横跨上半圈，读起来顺

## 提示词

做一个「沿圆圈排的文字」徽章，放在{位置}旁边：直径 {直径}px（96–140），SVG viewBox 0 0 100 100 里用两段弧画一个 r = 38、从 9 点钟起笔的圆形 path，<text><textPath> 沿它排“{文字} · ”，字少时重复一遍铺满一圈，结尾的空格写成 &nbsp;；textPath 写 textLength="238.76"、lengthAdjust="spacing" 让首尾刚好接上；字号约 12–14px、字重 600，和底色对比度 ≥ 4.5:1；中心放{图标}，单独一层、不转；文字环 16 秒转一圈，linear 循环，悬停和键盘聚焦时暂停；整个徽章就是{链接或按钮}，aria-label 写“{去向}”，SVG aria-hidden，焦点环 2px、偏移 2px、圆形；path 的 id 页面内唯一；减少动态效果时不转。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:16px;padding:16px 20px;background:#f4f1ea;color:#1c1a14}
.k{margin:0;color:#6b6250;font-size:12px;letter-spacing:.08em}
.t{margin:4px 0 6px;font-size:20px;line-height:1.3;font-weight:700}
.d{margin:0;color:#4f4838;font-size:13px}
.msg{min-height:20px;margin:6px 0 0;color:#7a5a00;font-size:12px}
.bd{--s:104px;position:relative;display:grid;place-items:center;width:var(--s);height:var(--s);border-radius:50%;background:#ffd84d;color:#1c1a14;text-decoration:none}
.bd:focus-visible{outline-color:#1c1a14}
.ring{position:absolute;inset:0;width:100%;height:100%;animation:spin 16s linear infinite}
.ring text{fill:currentColor;font-size:11.5px;font-weight:600}
.bd:hover .ring,.bd:focus-visible .ring{animation-play-state:paused}
.ar{display:grid;place-items:center;width:42%;aspect-ratio:1;border-radius:50%;background:#1c1a14;color:#ffd84d;transition:transform .16s}
.ar svg{width:44%;height:44%;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.bd:hover .ar{transform:translateY(2px)}
@keyframes spin{to{transform:rotate(1turn)}
}
@container (max-width:320px){.st{gap:12px;padding:16px}
}
@container (min-height:260px){.st{grid-template-columns:auto auto;justify-content:center;gap:56px;padding:24px 40px}
.k{font-size:13px}
.t{font-size:28px}
.d{font-size:14px}
.bd{--s:120px}
}
@media (prefers-reduced-motion:reduce){.ring{animation:none}
}
</style>

<div class="st"><div><p class="k">MyPrompts 作品集</p><h2 class="t">把想法做成作品</h2><p class="d">品牌、界面和动效，共 24 个项目</p><p class="msg" role="status"></p></div><a class="bd" href="#works" aria-label="向下滚动到作品"><svg class="ring" viewBox="0 0 100 100" aria-hidden="true"><path id="ct-ring" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" fill="none"/><text><textPath href="#ct-ring" textLength="238.76" lengthAdjust="spacing">向下滚动 · 查看作品 · 向下滚动 · 查看作品 ·&nbsp;</textPath></text></svg><span class="ar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6"/></svg></span></a></div>

<script type="module">
export default function demo(root) {
  const msg = root.querySelector('.msg');
  root.querySelector('.bd').addEventListener('click', (e) => { e.preventDefault(); msg.textContent = '已跳到作品区（演示）'; });
}
</script>
