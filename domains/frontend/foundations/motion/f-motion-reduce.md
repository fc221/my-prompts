---
zh: 减少动态效果
en: Reduced motion
order: 20
---

## 是什么

系统开启“减少动态效果”时，去掉位移、缩放、视差和循环，只保留淡入淡出。

## 适合

所有带动画的页面与组件，尤其是入场动画、视差、自动轮播、循环装饰。

## 不适合

不要用全局 0.01ms 一刀切掉所有过渡；也不要让加载转圈停住，看起来像卡死。

## 要点

- 用 @media (prefers-reduced-motion: reduce) 在令牌层把位移、缩放、视差距离置零，透明度和颜色过渡保留
- 关闭视差、自动轮播、循环装饰动画、逐字动画和大面积模糊
- 加载转圈和进度条继续运动（可放慢），骨架屏微光可以停
- 首屏入场直接显示最终状态，内容和功能完整保留
- JS 动画先用 matchMedia 读取该设置，并监听变化
- 超过 5 秒的自动播放动画提供暂停按钮，与系统设置无关

## 提示词

为{项目}支持减少动态效果：在 @media (prefers-reduced-motion: reduce) 里把 --motion-distance、--motion-scale 等令牌归零，透明度和颜色过渡保留 160ms；关闭视差、自动轮播、循环装饰和逐字动画，入场直接显示最终状态；加载转圈继续转但放慢一半，骨架屏微光停止；JS 动画用 matchMedia 判断并监听切换；超过 5 秒的自动动画提供暂停按钮；开启该设置后逐页检查一遍。

## 示例

<style>
.s{height:100%;display:flex;gap:16px;padding:16px;background:#f5f6f8;color:#5b616e;font:12px/1.2 system-ui,"PingFang SC",sans-serif}
.p{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:12px;background:#fff;border:1px solid #e3e6eb}
em{font-style:normal;font-weight:600;color:#1f2329}
.st{flex:1;display:grid;place-items:center}
.cd{width:80%;max-width:200px;display:grid;gap:6px;padding:12px;border-radius:8px;background:#fff;box-shadow:0 2px 4px rgba(24,36,80,.06),0 8px 20px rgba(24,36,80,.12);opacity:0;transition:opacity .24s,transform .24s cubic-bezier(0,0,.2,1)}
.cd b,.cd i{height:8px;border-radius:4px}
.cd b{width:60%;background:#3b5bdb}
.cd i{background:#e3e6eb}
.cd i+i{width:75%}
.n{transform:translateY(24px) scale(.92)}
.on .cd{opacity:1;transform:none}
.ld{display:flex;align-items:center;gap:8px;white-space:nowrap;overflow:hidden}
.sp{flex:none;width:16px;height:16px;border-radius:50%;border:2px solid #e3e6eb;border-top-color:#3b5bdb;animation:sp .8s linear infinite}
.sp.slow{animation-duration:1.6s}
@keyframes sp{to{transform:rotate(360deg)}
}
@media (prefers-reduced-motion:reduce){.n{transform:none}
.sp{animation-duration:1.6s}
}
</style>

<div class="s"><div class="p"><em>常规</em><div class="st"><div class="cd n"><b></b><i></i><i></i></div></div><span class="ld"><i class="sp"></i>加载中</span></div><div class="p"><em>减少动态效果</em><div class="st"><div class="cd"><b></b><i></i><i></i></div></div><span class="ld"><i class="sp slow"></i>加载中（放慢，不停）</span></div></div>

<script type="module">
export default function demo(root) {
  const s = root.querySelector('.s');
  // 卡片移除后停止循环
  const loop = () => { if (!root.host.isConnected) return; s.classList.toggle('on'); setTimeout(loop, s.classList.contains('on') ? 1800 : 700); };
  setTimeout(loop, 200);
}
</script>
