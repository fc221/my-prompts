---
zh: 阅读进度条
en: Scroll progress bar
order: 10
---

## 是什么

页面顶部一条细线随着滚动从左到右增长，显示读到了哪里。

## 适合

长文章、文档、教程页。

## 注意

只动 transform: scaleX，不动 width。

## 提示词

给{长文章页}加「阅读进度条」：顶部固定一条 3px 高的品牌色细线，宽度随滚动进度从 0 增长到 100%；优先用 CSS 滚动驱动动画（animation-timeline: scroll()），不支持时用 requestAnimationFrame 读取滚动位置；对读屏隐藏。

## 示例

<style>
:host{display:block;height:100%}
.page{position:relative;height:100%;overflow:auto;scrollbar-width:none;background:#fff}
.page::-webkit-scrollbar{display:none}
.bar{position:sticky;top:0;z-index:1;display:block;height:3px;background:#e4572e;transform-origin:left;transform:scaleX(0)}
article{padding:10px 18px 18px;font:14px/1.9 system-ui,"PingFang SC",sans-serif;color:#3f4147}
h4{margin:0 0 6px;font-size:16px;color:#18181b}
p{margin:0 0 10px}
</style>

<div class="page"><i class="bar" aria-hidden="true"></i><article><h4>搬仓这一个月</h4><p>新仓在城西，离高速口三公里。搬之前最担心的是发货时效，结果第一周就把次日达的覆盖率从 78% 做到了 92%。</p><p>变化最大的是分拣。旧仓的分拣线只有一条，高峰期要排到晚上十点；新仓两条线并行，同样的单量七点就能清完。</p><p>也有没想到的问题。供应商的送货车一开始找不到新地址，前三天有六批货送到了旧仓，只能再转运一次。</p><p>库存盘点改成了每周一次的循环盘点，不再停仓整盘。一个月下来差异率 0.3%，比旧仓低了一半。</p><p>下一步是把退货入库也挪过来。现在退货还在旧仓处理，两边的库存要人工对，等系统打通后就能自动合并。</p><p>到底了。</p></article></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), bar = root.querySelector('.bar'), still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  page.addEventListener('scroll', () => requestAnimationFrame(() => { bar.style.transform = 'scaleX(' + page.scrollTop / (page.scrollHeight - page.clientHeight) + ')'; }), { passive: true });
  // 自动演示：读到约 40% 的位置
  setTimeout(() => { if (root.host.isConnected) page.scrollTo({ top: (page.scrollHeight - page.clientHeight) * .4, behavior: still ? 'auto' : 'smooth' }); }, 300);
}
</script>
