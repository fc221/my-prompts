---
zh: 时长与缓动曲线
en: Duration & easing
order: 10
---

## 是什么

四条曲线管全站，时长按场景取 100 / 160 / 240 / 320ms。

## 适合

定义动效令牌；按钮反馈、下拉、弹窗、抽屉、Toast 的过渡。

## 不适合

不要每个组件各调一条贝塞尔曲线；应用界面里单个动效不超过 400ms，位移不用 linear。

## 要点

- --ease-standard cubic-bezier(0.2, 0, 0, 1)：状态切换与位置变化
- --ease-enter (0, 0, 0.2, 1) 先快后慢用于进入；--ease-exit (0.4, 0, 1, 1) 先慢后快用于退出
- --ease-spring (0.34, 1.4, 0.64, 1) 轻微回弹，只给勾选、点赞这类小元素的确认反馈
- 时长：颜色与透明度 100ms，下拉与 Tooltip 160ms，弹窗与 Toast 240ms，抽屉 320ms
- 退出比进入快约 30%；面积越大、距离越远时长越长，但不超过 400ms
- 只动 transform 和 opacity，禁止 transition: all；每天上百次的操作不加进出动画
- linear 只用于加载转圈、进度条、骨架微光这类匀速循环

## 提示词

为{项目}建立动效令牌：标准 cubic-bezier(0.2,0,0,1)、进入 (0,0,0.2,1)、退出 (0.4,0,1,1)、回弹 (0.34,1.4,0.64,1)；时长 100ms（颜色）、160ms（下拉、Tooltip）、240ms（弹窗、Toast）、320ms（抽屉），退出比进入快 30%；只动 transform 与 opacity，禁止 transition: all；减少动态效果时位移和缩放归零、保留透明度过渡；替换组件里散落的曲线和时长。

## 示例

<style>
.s{height:100%;display:grid;place-items:center;padding:12px 16px;background:#fff;color:#1f2329;font:12px/1.2 system-ui,"PingFang SC",sans-serif}
.w{width:100%;max-width:560px;display:grid;gap:8px}
.r{display:flex;align-items:center;gap:12px}
.r span{flex:0 0 72px;color:#5b616e;white-space:nowrap}
.t{position:relative;flex:1;height:16px;border-radius:8px;background:#eef0f4}
.m{position:absolute;top:0;bottom:0;left:0;width:calc(88% - 16px);transform:translateX(-100%)}
.m i{position:absolute;left:100%;top:0;width:16px;height:16px;border-radius:50%;background:#3b5bdb}
.ln i{background:#a8adb7}
.on .m{transform:none;transition:transform var(--d) var(--e)}
button{justify-self:end;height:28px;padding:0 12px;border:1px solid #c9ced6;border-radius:6px;background:#fff;color:#1f2329;font:inherit;cursor:pointer}
button:hover{background:#f5f6f8}
button:focus-visible{outline:2px solid #3b5bdb;outline-offset:2px}
@media (prefers-reduced-motion:reduce){.on .m{transition-duration:0s}
}
</style>

<div class="s"><div class="w"><div class="r" style="--e:cubic-bezier(.2,0,0,1);--d:960ms"><span>标准 240ms</span><div class="t"><div class="m"><i></i></div></div></div><div class="r" style="--e:cubic-bezier(0,0,.2,1);--d:960ms"><span>进入 240ms</span><div class="t"><div class="m"><i></i></div></div></div><div class="r" style="--e:cubic-bezier(.4,0,1,1);--d:640ms"><span>退出 160ms</span><div class="t"><div class="m"><i></i></div></div></div><div class="r" style="--e:cubic-bezier(.34,1.4,.64,1);--d:960ms"><span>回弹 240ms</span><div class="t"><div class="m"><i></i></div></div></div><div class="r ln" style="--e:linear;--d:960ms"><span>线性 对照</span><div class="t"><div class="m"><i></i></div></div></div><button type="button">重播 · 放慢 4 倍</button></div></div>

<script type="module">
export default function demo(root) {
  const w = root.querySelector('.w');
  const play = () => { w.classList.remove('on'); void w.offsetWidth; w.classList.add('on'); };
  root.querySelector('button').onclick = play;
  setTimeout(play, 300);
}
</script>
