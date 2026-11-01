---
zh: 导航悬停滑块
en: Sliding nav highlight
order: 30
tab: 滑块
---

## 是什么

鼠标在导航项之间移动时，一块圆角底色平滑地滑到当前悬停的项下面，宽度自动变化。

## 适合

官网顶部导航、分段切换、标签页。

## 注意

底色是装饰，当前页仍要有文字层面的标识（aria-current）。

## 提示词

给{顶部导航}加「导航悬停滑块」：导航项后面放一块绝对定位的圆角底色，鼠标悬停或键盘聚焦某一项时，底色用 250ms 缓动移动到该项并改变宽度；移出导航后回到当前页对应的项；减少动态效果时直接跳到位。

## 示例

<style>
:host{display:grid;place-items:center;height:100%;background:#f7f5f2}
nav{position:relative;display:flex;gap:4px;padding:4px;border-radius:999px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.08)}
a{position:relative;z-index:1;padding:8px 14px;border-radius:999px;font:500 14px system-ui;color:#3f4147;text-decoration:none}
a[aria-current]{color:#18181b;font-weight:600}
.pill{position:absolute;top:4px;bottom:4px;left:0;border-radius:999px;background:#ececf0;transition:transform .25s cubic-bezier(.2,0,0,1),width .25s cubic-bezier(.2,0,0,1)}
@media (prefers-reduced-motion:reduce){.pill{transition:none}
}
</style>

<nav><i class="pill"></i><a href="#" aria-current="page">首页</a><a href="#">产品</a><a href="#">定价</a><a href="#">帮助中心</a></nav>

<script type="module">
export default function demo(root) {
  const nav = root.querySelector('nav'), pill = root.querySelector('.pill'), cur = nav.querySelector('[aria-current]'); const to = (a) => { pill.style.width = a.offsetWidth + 'px'; pill.style.transform = 'translateX(' + a.offsetLeft + 'px)'; }; to(cur); nav.querySelectorAll('a').forEach((a) => { a.addEventListener('pointerenter', () => to(a)); a.addEventListener('focus', () => to(a)); a.onclick = (e) => e.preventDefault(); }); nav.addEventListener('pointerleave', () => to(cur));
}
</script>
