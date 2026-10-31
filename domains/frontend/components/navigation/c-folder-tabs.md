---
zh: 档案夹标签页
en: Folder tabs
order: 35
---

## 是什么

标签画成一叠前后错开的档案夹，每个夹子的标签耳朵错开露在上方；点哪个，那个夹子就滑到最前面，其余的各往后退一档、颜色加深一档。

## 适合

3–5 个同级分类、想要一点实体感的场景：项目档案、作品集分章、资料卡、笔记分区。

## 不适合

后台里高频切换的视图，或者分类超过 5 个，用「标签页」。

## 要点

- 耳朵宽度固定、横向错开排开，彼此不遮挡，每一个都能直接点到。
- 最前面的夹子白底；往后每退一档上移 8px、底色加深一档，前后关系一眼看得出；最前面的耳朵和夹身同色，中间没有分割线。
- 切换时选中的夹子立即放到最上层，从原来的位置下滑到最前，其他夹子各退一档；约 300ms，只动 transform 和底色。
- 语义仍是标签页：tablist / tab / tabpanel 和 aria-selected；左右方向键按耳朵的排列顺序切换，Home / End 到首尾，只有当前耳朵在 Tab 序列里。
- 后面几夹的内容设 hidden，只渲染最前面这一夹。
- 容器放不下全部耳朵时退回普通「标签页」的样子；减少动态效果时直接换位。

## 提示词

把{资料分类，如 合同 / 发票 / 图纸 / 往来}做成「档案夹标签页」：3–5 个夹子前后叠放，每个夹子顶部有一枚固定宽度的耳朵，耳朵横向错开排开、互不遮挡；最前面的夹子白底，往后每退一档上移 8px、底色加深一档，最前面的耳朵与夹身同色相连；点击耳朵后该夹子立即置顶并从原位置下滑到最前，其余各退一档，300ms，只动 transform 和底色；使用 tablist / tab / tabpanel 与 aria-selected，左右方向键按耳朵顺序切换，Home / End 到首尾，只有当前耳朵可被 Tab 聚焦；后面几夹的内容设 hidden；容器放不下全部耳朵时改为普通标签页；减少动态效果时直接换位。

## 示例

<style>
.s{height:100%;padding:12px;box-sizing:border-box;background:#eef0f3;color:#1f2329;font:13px/1.45 system-ui,"PingFang SC",sans-serif}
.fd{--ew:64px;position:relative;height:100%}
/* 每退一档上移 8px：最深那夹的耳朵从顶上 24px 处开始 */
.ears{position:absolute;inset:0 0 auto 0;height:50px;z-index:20;pointer-events:none}
.ears button{--d:0;position:absolute;top:24px;left:calc(var(--i) * (var(--ew) + 4px));width:var(--ew);height:27px;padding:0;border:1px solid #cfd5de;border-bottom:0;border-radius:8px 8px 0 0;background:var(--c,#fff);color:#5b616e;font:inherit;font-size:12px;cursor:pointer;pointer-events:auto;transform:translateY(calc(var(--d) * -8px));transition:transform .3s cubic-bezier(.2,0,0,1),background-color .3s}
.ears button[aria-selected="true"]{color:#1f2329;font-weight:600}
.ears button:focus-visible{outline:2px solid #3b5bdb;outline-offset:2px}
.body{--d:0;position:absolute;inset:50px 0 0 0;border:1px solid #cfd5de;border-radius:10px;background:var(--c,#fff);box-shadow:0 2px 6px rgba(31,35,41,.06);transform:translateY(calc(var(--d) * -8px));transition:transform .3s cubic-bezier(.2,0,0,1),background-color .3s}
/* 第一枚耳朵贴着左边，它那夹的左上角不做圆角 */
.body:nth-child(2){border-top-left-radius:0}
.pn{height:100%;box-sizing:border-box;padding:10px 12px;overflow:hidden}
.pn:focus-visible{outline:2px solid #3b5bdb;outline-offset:-2px;border-radius:10px}
.pn h4{margin:0 0 6px;font-size:13px}
.pn ul{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.pn li{display:flex;justify-content:space-between;gap:8px;font-size:12px}
.pn li span{color:#5b616e;white-space:nowrap}
@container (min-width:520px){.fd{--ew:88px}
.ears button{font-size:13px}
.pn{padding:14px 18px}
.pn h4{font-size:15px;margin-bottom:10px}
.pn li{font-size:13px}
}
@media (prefers-reduced-motion:reduce){.ears button,.body{transition:none}
}
</style>

<div class="s"><div class="fd">
  <div class="ears" role="tablist" aria-label="滨江书店翻新 · 档案">
    <button type="button" role="tab" id="ft-t0" aria-controls="ft-p0" style="--i:0">合同</button>
    <button type="button" role="tab" id="ft-t1" aria-controls="ft-p1" style="--i:1">发票</button>
    <button type="button" role="tab" id="ft-t2" aria-controls="ft-p2" style="--i:2">图纸</button>
    <button type="button" role="tab" id="ft-t3" aria-controls="ft-p3" style="--i:3">往来</button>
  </div>
  <div class="body"><div class="pn" role="tabpanel" id="ft-p0" aria-labelledby="ft-t0" tabindex="0"><h4>合同</h4><ul><li>施工合同<span>已签 · 10 月 12 日</span></li><li>设计委托书<span>已签 · 9 月 28 日</span></li></ul></div></div>
  <div class="body"><div class="pn" role="tabpanel" id="ft-p1" aria-labelledby="ft-t1" tabindex="0"><h4>发票</h4><ul><li>首付款<span>¥48,000 · 已开</span></li><li>进度款<span>待开</span></li></ul></div></div>
  <div class="body"><div class="pn" role="tabpanel" id="ft-p2" aria-labelledby="ft-t2" tabindex="0"><h4>图纸</h4><ul><li>平面布置图 v3<span>10 月 20 日</span></li><li>灯光点位图<span>10 月 18 日</span></li></ul></div></div>
  <div class="body"><div class="pn" role="tabpanel" id="ft-p3" aria-labelledby="ft-t3" tabindex="0"><h4>往来</h4><ul><li>物业：夜间施工许可<span>已回复</span></li><li>业主：书架高 2.1 m<span>已确认</span></li></ul></div></div>
</div></div>

<script type="module">
const TINT = ['#fff', '#eef1f6', '#e1e6ee', '#d4dae4'];
export default function demo(root) {
  const tabs = [...root.querySelectorAll('[role=tab]')], bodies = [...root.querySelectorAll('.body')];
  let stack = tabs.map((_, i) => i); // 从前到后
  const sel = (k, focus) => {
    stack = [k, ...stack.filter((x) => x !== k)];
    tabs.forEach((t, i) => {
      const d = stack.indexOf(i), on = d === 0;
      for (const el of [t, bodies[i]]) { el.style.setProperty('--d', d); el.style.setProperty('--c', TINT[d]); }
      bodies[i].style.zIndex = 10 - d;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      bodies[i].firstElementChild.hidden = !on;
    });
    if (focus) tabs[k].focus();
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => sel(i)));
  root.querySelector('.ears').addEventListener('keydown', (e) => {
    const i = tabs.indexOf(e.target), n = tabs.length;
    const to = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (to !== undefined) { e.preventDefault(); sel(to, true); }
  });
  sel(0);
  setTimeout(() => root.host.isConnected && stack[0] === 0 && sel(2), 700);
}
</script>
