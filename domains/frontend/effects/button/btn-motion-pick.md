---
zh: 按钮动效怎么选
en: Choosing button motion
order: 10
---

## 是什么

按钮动效按用途分四类：悬停（告诉人这里能点）、按下（确认点到了）、状态变化（告诉人结果）、庆祝（少见的大事）。先按用途挑类，再在类里挑一种，全站统一。示例是六种常用的悬停和状态动效，可以逐个悬停、聚焦或点按比较。

## 适合

给一个产品定按钮动效规范，或者不知道某个按钮该配什么动效时先来这里查。

## 不适合

同一个按钮叠两三种动效；表格行内、工具栏里的小按钮，它们只需要颜色变化。

## 要点

- 悬停类：方向填色、描边画出、箭头滑入、悬停抬起，以及「悬停扩散填色」「磁吸按钮」「流光边框按钮」。一个产品选一种，写进按钮组件。
- 按下类：「按压回弹」「水波点击」，全站一种。
- 状态类：提交用「提交按钮变形」，上传导出用「进度按钮」，图标切换用「图标柔和替换」，关注、收藏这类开关用文字上翻，两面状态差别大时可用「3D 翻转卡片」的做法翻面。
- 庆祝类：只给少见的大事，用「完成庆祝」。
- 时长：悬停 160–240ms；按下 80–120ms 收、200–300ms 回弹；状态变形 300–500ms；进度跟真实进度走。
- 键盘聚焦给和悬停一样的效果；触屏没有悬停，所以悬停类只是锦上添花，按钮本身的样子要能看出可点。
- 循环类（呼吸光晕、流光）一屏最多一个，只给唯一的主行动，循环 2–3 次后停住。
- 只动 transform 和 opacity；描边画出用 SVG 的描边偏移。减少动态效果时保留颜色和文字变化，去掉位移、缩放和循环。

## 提示词

给{产品}的按钮定一套动效，写进按钮基础组件，全站复用：
1. 悬停（同时用于 :focus-visible）：{方向填色 / 描边画出 / 箭头滑入 / 悬停抬起} 选一种。
   - 方向填色：强调色从左向右铺满（伪元素 scaleX 0→1，220ms），文字同时反白。
   - 描边画出：平时只有文字，悬停时边框从左上角顺时针画一圈（SVG 描边偏移，360ms）。
   - 箭头滑入：文字左移 6px，箭头从左侧 6px 处淡入到位（200ms）。
   - 悬停抬起：上移 3px，底下的阴影层淡入（200ms）。
   触屏设备不启用悬停样式。
2. 按下：缩到 0.97（90ms），松开用回弹曲线 cubic-bezier(.34,1.56,.64,1) 在 260ms 内回到原样。
3. 状态：{提交类按钮} 收成圆圈转圈，完成画对勾再恢复；{上传、导出按钮} 在按钮里显示真实进度；{关注、收藏} 这类开关点按后旧文字上移出去、新文字从下方进来（240ms），用 aria-pressed 表示状态。
4. 只有{唯一主行动}可以加呼吸光晕：光晕从按钮向外扩散并淡出，1.6s 一次，共 3 次后停住。
减少动态效果时只保留颜色和文字变化；按钮在悬停、按下、各状态下宽度不变。

## 示例

<style>
.s{height:100%;display:grid;place-items:center;padding:12px;background:#f6f7f9;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.g{display:grid;grid-template-columns:repeat(3,auto);gap:14px 16px}
.c{display:grid;justify-items:center;gap:6px}
.c small{font-size:11px;color:#5b616e;white-space:nowrap}
.b{position:relative;isolation:isolate;width:80px;height:34px;padding:0;border:1.5px solid #c9ced6;border-radius:8px;background:#fff;color:#1f2329;font:inherit;font-weight:600;cursor:pointer}
.b:focus-visible{outline:2px solid #3a5ccc;outline-offset:3px}
/* 方向填色 */
.fs{overflow:hidden;transition:color .22s,border-color .22s}
.fs::before{content:"";position:absolute;inset:0;z-index:-1;background:#3a5ccc;transform:scaleX(0);transform-origin:left;transition:transform .22s cubic-bezier(.2,0,0,1)}
.fs.on,.fs:focus-visible{color:#fff;border-color:#3a5ccc}
.fs.on::before,.fs:focus-visible::before{transform:scaleX(1)}
/* 描边画出：平时只有文字 */
.bd{border-color:transparent;background:none}
.bd svg{position:absolute;inset:-1.5px;width:calc(100% + 3px);height:calc(100% + 3px);overflow:visible;pointer-events:none}
.bd rect{x:.75px;y:.75px;width:calc(100% - 1.5px);height:calc(100% - 1.5px);rx:8px;fill:none;stroke:#3a5ccc;stroke-width:1.5;stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset .36s cubic-bezier(.4,0,.2,1)}
.bd.on rect,.bd:focus-visible rect{stroke-dashoffset:0}
/* 箭头滑入 */
.ar .l{display:inline-block;transition:transform .2s cubic-bezier(.2,0,0,1)}
.ar .a{position:absolute;right:10px;top:50%;margin-top:-6px;opacity:0;transform:translateX(-6px);transition:opacity .2s,transform .2s cubic-bezier(.2,0,0,1)}
.ar.on .l,.ar:focus-visible .l{transform:translateX(-6px)}
.ar.on .a,.ar:focus-visible .a{opacity:1;transform:none}
/* 悬停抬起：阴影放在伪元素上，只动透明度 */
.lf{box-shadow:0 1px 2px rgba(31,35,41,.08);transition:transform .2s cubic-bezier(.2,0,0,1)}
.lf::after{content:"";position:absolute;inset:-1.5px;z-index:-1;border-radius:inherit;box-shadow:0 10px 18px -6px rgba(31,35,41,.32);opacity:0;transition:opacity .2s}
.lf.on,.lf:focus-visible{transform:translateY(-3px)}
.lf.on::after,.lf:focus-visible::after{opacity:1}
/* 文字上翻：开关按钮 */
.sw .w{display:block;height:1.4em;overflow:hidden}
.sw .k{display:grid;transition:transform .24s cubic-bezier(.2,0,0,1)}
.sw[aria-pressed="true"]{background:#eef1fb;border-color:#b9c4ec;color:#3a5ccc}
.sw[aria-pressed="true"] .k{transform:translateY(-1.4em)}
/* 呼吸光晕：只给唯一主行动，3 次后停 */
.gp{border-color:#3a5ccc;background:#3a5ccc;color:#fff}
.gp::after{content:"";position:absolute;inset:-1.5px;z-index:-1;border-radius:inherit;background:#3a5ccc;opacity:0}
.gp.go::after{animation:gp 1.6s cubic-bezier(.2,0,0,1) 3}
@keyframes gp{from{opacity:.45;transform:scale(1)}to{opacity:0;transform:scale(1.3,1.7)}}
@media (hover:hover){.fs:hover{color:#fff;border-color:#3a5ccc}
.fs:hover::before{transform:scaleX(1)}
.bd:hover rect{stroke-dashoffset:0}
.ar:hover .l{transform:translateX(-6px)}
.ar:hover .a{opacity:1;transform:none}
.lf:hover{transform:translateY(-3px)}
.lf:hover::after{opacity:1}
}
.b:active{transform:scale(.97)}
@container (max-width:300px){.g{gap:12px 10px}
.b{width:78px}
}
@container (min-width:520px){.g{gap:22px 40px}
.b{width:104px;height:40px;font-size:14px}
.c small{font-size:12px}
}
@media (prefers-reduced-motion:reduce){.b,.b *,.b::before,.b::after{transition-property:color,background-color,border-color,opacity,stroke-dashoffset!important}
.lf.on,.lf:focus-visible,.lf:hover,.b:active{transform:none}
.gp.go::after{animation:none}
}
</style>

<div class="s"><div class="g">
  <div class="c"><button type="button" class="b fs">立即开始</button><small>方向填色</small></div>
  <div class="c"><button type="button" class="b bd"><svg aria-hidden="true"><rect pathLength="100"/></svg>查看方案</button><small>描边画出</small></div>
  <div class="c"><button type="button" class="b ar"><span class="l">下一步</span><svg class="a" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"/></svg></button><small>箭头滑入</small></div>
  <div class="c"><button type="button" class="b lf">预约演示</button><small>悬停抬起</small></div>
  <div class="c"><button type="button" class="b sw" aria-pressed="false" aria-label="关注"><span class="w" data-clip><span class="k" aria-hidden="true"><span>关注</span><span>已关注</span></span></span></button><small>文字上翻</small></div>
  <div class="c"><button type="button" class="b gp">免费试用</button><small>呼吸光晕</small></div>
</div></div>

<script type="module">
export default function demo(root) {
  const hov = root.querySelectorAll('.fs,.bd,.ar,.lf'), sw = root.querySelector('.sw'), gp = root.querySelector('.gp');
  const timers = [];
  const later = (ms, f) => timers.push(setTimeout(() => root.host.isConnected && f(), ms));
  // 自动演示：依次亮起四种悬停效果、翻一次开关、光晕呼吸三次；指针一进来就交还给真实悬停
  hov.forEach((b, i) => later(300 + i * 260, () => b.classList.add('on')));
  later(1400, () => sw.setAttribute('aria-pressed', 'true'));
  later(200, () => gp.classList.add('go'));
  const stop = () => { timers.forEach(clearTimeout); hov.forEach((b) => b.classList.remove('on')); };
  root.querySelector('.g').addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') stop(); }, { once: true });
  // 触屏没有悬停：点一下切换效果，方便在手机上看
  hov.forEach((b) => b.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') { timers.forEach(clearTimeout); b.classList.toggle('on'); } }));
  sw.addEventListener('click', () => sw.setAttribute('aria-pressed', String(sw.getAttribute('aria-pressed') !== 'true')));
  gp.addEventListener('animationend', () => gp.classList.remove('go'));
  gp.addEventListener('click', () => { gp.classList.remove('go'); void gp.offsetWidth; gp.classList.add('go'); });
}
</script>
