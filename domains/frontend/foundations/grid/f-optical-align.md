---
zh: 视觉对齐
en: Optical alignment
aka: 光学对齐 视觉居中 图标重心 播放按钮居中 过冲
order: 60
---

## 是什么

数值居中不等于看起来居中。形状的重心不在外框中心时，要按眼睛看到的位置微调。示例能在数值居中和视觉对齐之间切换，并打开辅助线看差别。

## 适合

图标按钮、播放键、评分星、图标加文字的列表、卡片内外的边距，收尾打磨阶段逐个过。

## 不适合

五种基本对齐看「五种对齐怎么用」；同一行控件高低不齐是布局问题，看「修正控件对齐」。

## 注意

微调量很小，通常 1–3px，只改形状不规则的元素。调整写进图标文件，让图形在画板内就按重心摆好，改一次到处生效；在每个按钮上单独写偏移，换个尺寸就错了。

## 要点

- 播放三角：外框居中时重心偏左。三角重心在离竖边 1/3 宽处，比外框中心偏左 1/6 宽度，往右挪这个量，18px 宽的三角挪约 3px
- 星形：外框居中时偏低，往上提约半径的 10%
- 圆和方并排：同尺寸的圆看起来小，放大约 10%，略超出方形的上下边才显得等大
- 尖角和圆弧也一样：指向某边的箭头、下拉角标，都往尖的反方向轻推一点
- 图标加文字的列表：图标放进同宽的格子，文字才在一条线上
- 左右边距统一：页面标题、列表、卡片用同一组边距，别让每层各缩进几像素
- 同列文字一条线：表单标签、卡片标题、列表文字共用一条左边线
- 验收方法：来回切换看有没有跳动感，再把画面缩小或眯眼看，重心落在中间才算过

## 提示词

给{页面}做视觉对齐：播放三角往右挪自身宽度的 1/6；星形往上提半径的 10%；圆形图标和方形图标并排时放大约 10%；不同宽度的图标放进 {图标格宽度}px 宽的格子，文字起点一致；页面标题、列表、卡片用同一组左右边距 {边距}px；同列文字共用一条左边线。偏移直接改 SVG 里的图形位置，不在组件上加 margin；列出改了哪些图标、各挪了多少。

## 示例

<style>
.st{--on:1;--d:42px;height:100%;display:flex;flex-direction:column;gap:6px;padding:8px 12px;background:#f5f6f8;color:#1f2329;font:12px/16px system-ui,"PingFang SC",sans-serif}
.st button{font:inherit;color:inherit;cursor:pointer}
.st button:focus-visible{outline:2px solid #3b5bdb;outline-offset:1px}
.top{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px}
.seg{display:flex;padding:2px;border-radius:8px;background:#e4e6eb}
.seg button{height:26px;padding:0 10px;border:0;border-radius:6px;background:none;color:#5b616e;white-space:nowrap}
.seg [aria-pressed=true]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.gd{height:30px;padding:0 10px;border:1px solid #d5d9e0;border-radius:8px;background:#fff;color:#5b616e;white-space:nowrap}
.gd[aria-checked=true]{border-color:#3b5bdb;background:#e3e9fd;color:#2f49b8;font-weight:600}
.grid{flex:1;min-height:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:6px}
.t{min-width:0;display:flex;align-items:center;gap:8px;margin:0;padding:4px 8px;border-radius:10px;background:#fff;box-shadow:0 0 0 1px #e3e6eb}
.t figcaption{min-width:0;color:#5b616e}
.vis{flex:none;position:relative;width:var(--d);height:var(--d)}
.dot{position:absolute;inset:0;display:grid;place-items:center;border-radius:50%}
.play{background:#1f2329}
.play svg{width:42%;fill:#fff;transform:translateX(calc(var(--on) * 16%))}
.stargo{background:#f6c344}
.stargo svg{width:60%;fill:#1f2329;transform:translateY(calc(var(--on) * -5%))}
.pair{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:3px}
.pair i{display:block;width:19px;height:19px;background:#3b5bdb}
.pair i+i{border-radius:50%;transform:scale(calc(1 + var(--on) * .1))}
.vis.lst{width:auto;height:auto;display:grid;gap:1px;font-size:11px;line-height:14px;white-space:nowrap}
.lst span{display:flex;align-items:center;gap:4px}
.lst svg{flex:none;fill:#5b616e}
.st[data-v="1"] .lst b{width:18px;display:flex;justify-content:center}
.lst b{font-weight:400;display:flex}
.g{display:none;position:absolute;pointer-events:none;background:#e5484d}
.guide .g{display:block}
.g.h{left:-4px;right:-4px;top:50%;height:1px}
.g.v{top:-4px;bottom:-4px;left:50%;width:1px}
.g.top{left:-4px;right:-4px;top:calc(50% - 10px);height:1px;opacity:.7}
.g.bot{left:-4px;right:-4px;top:calc(50% + 10px);height:1px;opacity:.7}
.g.col{top:-2px;bottom:-2px;left:22px;width:1px}
.play svg,.stargo svg,.pair i+i{transition:transform .16s ease-out}
.note{display:none;margin:0;color:#5b616e}
.msg{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.off{display:none}
.st[data-v="0"] .off{display:inline}
.st[data-v="0"] .on{display:none}
@container (min-height:260px){
.st{--d:72px;gap:10px;padding:12px 16px;font-size:13px;line-height:18px}
.grid{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:auto;align-content:center}
.t{flex-direction:column;justify-content:center;gap:12px;padding:18px 8px;text-align:center}
.note{display:block}
.pair{gap:6px}
.pair i{width:30px;height:30px}
.g.top{top:calc(50% - 15px)}
.g.bot{top:calc(50% + 15px)}
.vis.lst{font-size:13px;line-height:24px}
}
@media (prefers-reduced-motion:reduce){.play svg,.stargo svg,.pair i+i{transition:none}
}
</style>

<div class="st guide" data-v="1"><div class="top"><div class="seg" role="group" aria-label="对齐方式"><button type="button" data-v="0" aria-pressed="false">数值居中</button><button type="button" data-v="1" aria-pressed="true">视觉对齐</button></div><button type="button" class="gd" role="switch" aria-checked="true">辅助线</button></div><div class="grid"><figure class="t"><div class="vis"><div class="dot play"><svg viewBox="0 0 18 20" aria-hidden="true"><path d="M0 0l18 10L0 20z"/></svg></div><i class="g h"></i><i class="g v"></i></div><figcaption><span class="on">三角右移，重心落到圆心</span><span class="off">外框居中，三角偏左</span></figcaption></figure><figure class="t"><div class="vis"><div class="dot stargo"><svg viewBox="0 0 24 23" aria-hidden="true"><path d="M12 0l3.7 7.6 8.3 1.2-6 5.9 1.4 8.3L12 19.1l-7.4 3.9L6 14.7 0 8.8l8.3-1.2z"/></svg></div><i class="g h"></i><i class="g v"></i></div><figcaption><span class="on">星形上提，中心回到圆心</span><span class="off">外框居中，星形偏低</span></figcaption></figure><figure class="t"><div class="vis"><div class="pair" aria-hidden="true"><i></i><i></i></div><i class="g top"></i><i class="g bot"></i></div><figcaption><span class="on">圆放大约 10%，看着才一样大</span><span class="off">同尺寸，圆看着小一圈</span></figcaption></figure><figure class="t"><div class="vis lst" aria-hidden="true"><span><b><svg width="16" height="12" viewBox="0 0 16 12"><rect width="16" height="12" rx="2"/></svg></b>首页</span><span><b><svg width="9" height="12" viewBox="0 0 9 12"><rect width="9" height="12" rx="2"/></svg></b>订单</span><span><b><svg width="13" height="12" viewBox="0 0 13 12"><rect width="13" height="12" rx="6"/></svg></b>设置</span><i class="g col"></i></div><figcaption><span class="on">图标占同宽，文字一条线</span><span class="off">图标宽度不同，文字参差</span></figcaption></figure></div><p class="note">标尺量出来居中，不等于眼睛觉得居中；开关看差别，辅助线是圆心或同列的基准。</p><p class="msg" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), btns = [...root.querySelectorAll('.seg button')], gd = root.querySelector('.gd'), msg = root.querySelector('.msg');
  btns.forEach((b) => b.addEventListener('click', () => {
    const on = b.dataset.v === '1';
    btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    st.dataset.v = b.dataset.v;
    st.style.setProperty('--on', on ? 1 : 0);
    msg.textContent = on ? '已切到视觉对齐' : '已切到数值居中';
  }));
  gd.addEventListener('click', () => {
    const on = gd.getAttribute('aria-checked') !== 'true';
    gd.setAttribute('aria-checked', String(on));
    st.classList.toggle('guide', on);
  });
}
</script>
