---
zh: 引用与来源标注
en: Citations & sources
order: 40
---

## 是什么

回答里用上标数字标出出处，末尾列出来源卡片，悬停数字可以预览原文。

## 适合

基于检索、知识库、联网搜索生成的回答，需要用户核对依据的场景。

## 不适合

没有真实来源时不要编造引用；不要把整段链接塞进正文。

## 要点

- 编号紧跟被支持的那句话：11–12px、强调浅底、可聚焦，aria-label 写“来源 1：标题”而不只是数字
- 悬停或聚焦编号显示预览：标题、出处（文件名 + 页码，或站点）、相关原文片段；点击打开原文
- 回答末尾列出来源卡片：编号、标题、出处，先露出 3–5 个，其余折叠
- 编号与卡片一一对应，点编号时对应卡片高亮
- 来自知识库文件的引用能跳到原文的具体位置；窄屏来源卡片单列

## 提示词

给{基于检索的 AI 回答}加「引用与来源标注」：在被支持的句子后放上标编号（11px、强调浅底、可聚焦，aria-label 写“来源 1：{标题}”）；悬停或聚焦编号时弹出预览：标题、出处（文件名 + 页码或站点）、相关原文片段；点击编号高亮回答下方对应的来源卡片并可打开原文；来源卡片列出编号、标题、出处，先露出 3–5 个，其余折叠；没有真实来源时不编造编号；窄屏来源卡片单列。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.msg{position:relative;width:100%;max-width:520px;display:grid;gap:10px}
.ans{font-size:14px;line-height:1.75}
.ref{display:inline-grid;place-items:center;min-width:17px;height:17px;margin:0 2px;padding:0 4px;border:0;border-radius:4px;background:#edf1ff;color:#3b5bdb;font-size:11px;font-weight:600;line-height:1;vertical-align:super}
.ref:hover,.ref[aria-describedby]{background:#3b5bdb;color:#fff}
.pv{position:absolute;z-index:3;width:min(260px,100%);padding:10px 12px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;box-shadow:0 8px 24px rgba(15,17,22,.14);display:grid;gap:2px;font-size:12px;animation:fade .16s}
.pv q{color:#5b616e;line-height:1.5}
.src{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.src li{display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;transition:border-color .2s,background-color .2s}
.src li.hit{border-color:#3b5bdb;background:#edf1ff}
.n{width:18px;height:18px;flex:none;border-radius:4px;background:#f0f2f5;font-size:11px;font-weight:600;display:grid;place-items:center}
.tt{display:grid;min-width:0;font-size:12px;line-height:1.4}
.tt b{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
</style>

<div class="s"><div class="msg"><p class="ans">入职满 1 年不满 10 年，每年有 5 天带薪年假<button class="ref" data-i="0" aria-label="来源 1：员工手册 2026 版">1</button>；满 10 年不满 20 年为 10 天<button class="ref" data-i="1" aria-label="来源 2：带薪年休假规定">2</button>。</p><div class="pv" role="tooltip" id="pv" hidden></div><ol class="src"><li><span class="n">1</span><span class="tt"><b>员工手册 2026 版</b><span class="muted">员工手册.pdf · 第 12 页</span></span></li><li><span class="n">2</span><span class="tt"><b>带薪年休假规定</b><span class="muted">制度库 · 第三条</span></span></li></ol></div></div>

<script type="module">
export default function demo(root) {
  const P = [['员工手册 2026 版', '员工手册.pdf · 第 12 页', '入职满 1 年不满 10 年的员工，每年享有 5 天带薪年假……'], ['带薪年休假规定', '制度库 · 第三条', '已满 10 年不满 20 年的，年休假 10 天……']];
  const msg = root.querySelector('.msg'), pv = root.querySelector('.pv'), refs = root.querySelectorAll('.ref'), lis = root.querySelectorAll('.src li'); let t;
  const clear = () => refs.forEach((r) => r.removeAttribute('aria-describedby'));
  const show = (b) => {
    clearTimeout(t); const p = P[b.dataset.i];
    pv.innerHTML = '<b>' + p[0] + '</b><span class="muted">' + p[1] + '</span><q>' + p[2] + '</q>'; pv.hidden = false; clear(); b.setAttribute('aria-describedby', 'pv');
    const r = b.getBoundingClientRect(), m = msg.getBoundingClientRect();
    pv.style.left = Math.max(0, Math.min(r.left - m.left - 20, m.width - pv.offsetWidth)) + 'px'; pv.style.top = r.bottom - m.top + 6 + 'px';
  };
  const hide = () => { clearTimeout(t); t = setTimeout(() => { pv.hidden = true; clear(); }, 120); };
  refs.forEach((b) => {
    b.addEventListener('pointerenter', () => show(b)); b.addEventListener('pointerleave', hide);
    b.addEventListener('focus', () => show(b)); b.addEventListener('blur', hide);
    b.addEventListener('click', () => lis.forEach((li, k) => li.classList.toggle('hit', String(k) === b.dataset.i)));
  });
  pv.addEventListener('pointerenter', () => clearTimeout(t)); pv.addEventListener('pointerleave', hide);
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pv.hidden) { e.preventDefault(); e.stopPropagation(); pv.hidden = true; clear(); } });
}
</script>
