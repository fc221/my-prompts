---
zh: 由虚到实的标题
en: Blur-in heading
order: 40
---

## 是什么

标题一开始是模糊、半透明、略微偏下的，按短语依次对焦、变清楚、落回原位，像相机镜头慢慢合焦；不到一秒全部看清，之后不再动。

## 适合

首屏的一句核心标语、章节开头的短标题，想要柔和、安静的入场。

## 不适合

长段落，或一屏里多处同时用（模糊滤镜开销大）；需要马上读到的信息不要糊着出现。想要更利落的入场用「标题逐行浮现」。

## 注意

模糊只是过程：动画结束时必须彻底去掉 filter，不能残留一点发虚；也不要让人干等着看糊字，整句控制在 1 秒内。

## 要点

- 按短语或词拆分（中文 2–4 个字一组），不要逐字乱飞；拆出来的视觉副本对读屏隐藏，另放一份完整标题
- 起始：blur(8–12px)、不透明度 0.15 左右、下移 6–8px；结束：清晰、完全不透明、回到原位
- 单组约 600ms、缓出，组间错开 80–100ms，整句 1 秒内看清
- 用 Web Animations 或关键帧，不用 fill: forwards 留住终态，动画结束后元素回到没有滤镜的原始样式
- 只播一次；重播或重新进入时先取消上一轮，不叠加计时器
- 减少动态效果时直接显示清晰文字

## 提示词

给{首屏标语}做「由虚到实的标题」入场：标题按短语拆成几组（中文 2–4 字一组），每组从 blur(10px)、不透明度 0.15、下移 8px 过渡到清晰原位，单组 600ms 缓出，组间错开 90ms，整句 1 秒内完成；动画结束后彻底去掉 filter，不留残余模糊；拆分出的视觉副本对读屏隐藏，保留一份完整标题文本；只播一次，重播前先取消上一轮；减少动态效果时直接显示。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;display:flex;flex-direction:column;justify-content:center;padding:0 22px 8px;background:#fbf9f5;color:#1d1b18;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.glow{position:absolute;right:-50px;top:-60px;width:210px;height:210px;border-radius:50%;background:radial-gradient(circle at 40% 40%,#ffd7a8,#f9b4c8 45%,#c9c3ff 75%);filter:blur(26px);opacity:.75}
.kk{position:relative;display:flex;align-items:center;gap:6px;margin:0 0 8px;color:#7d6c55;font-size:12px;letter-spacing:.06em}
.kk i{width:6px;height:6px;border-radius:2px;background:#f08a5d}
.tt{position:relative;margin:0;font-size:25px;line-height:1.3;font-weight:700}
.w{display:inline-block}
.sub{position:relative;margin:10px 0 0;color:#625b52;font-size:12.5px}
.re{position:absolute;right:14px;bottom:14px}
@container (max-width:310px){.tt{font-size:23px}
}
@container (min-height:280px){.st{padding:0 44px 12px}
.glow{right:-60px;top:-120px;width:360px;height:360px}
.kk{font-size:13px}
.tt{font-size:42px;line-height:1.25}
.sub{font-size:14px}
.re{right:24px;bottom:20px}
}
</style>

<div class="st"><i class="glow" aria-hidden="true"></i><p class="kk"><i aria-hidden="true"></i>MyPrompts · 新版本</p><h3 class="tt"><span class="sr">把散落的灵感，收进一本会生长的笔记</span><span aria-hidden="true"><span class="w">把散落的</span><span class="w">灵感，</span><br><span class="w">收进一本</span><span class="w">会生长的</span><span class="w">笔记</span></span></h3><p class="sub">想到就记，系统自动按主题归到一起</p><button type="button" class="ctl re">重播</button></div>

<script type="module">
export default function demo(root) {
  const ws = [...root.querySelectorAll('.w')], sub = root.querySelector('.sub');
  const play = () => {
    [...ws, sub].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // fill: backwards 只管等待期间的起始样子；结束后回到原始样式，不留 filter
    ws.forEach((w, i) => w.animate([{ filter: 'blur(10px)', opacity: 0.15, transform: 'translateY(8px)' }, { filter: 'blur(0)', opacity: 1, transform: 'none' }], { duration: 600, delay: i * 90, easing: 'cubic-bezier(.2,0,0,1)', fill: 'backwards' }));
    sub.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: ws.length * 90 + 200, fill: 'backwards' });
  };
  root.querySelector('.re').addEventListener('click', play);
  play();
}
</script>
