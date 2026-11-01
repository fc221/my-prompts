---
zh: 译文变长
en: Text expansion
order: 10
---

## 是什么

同一句话换成外文往往更长：按钮、标签、导航的宽度跟着文字走，放不下时先换短说法，不让文字被截断或把容器撑破。

## 适合

要上架多个语种的产品，或者文案还会改、长度说不准的界面。

## 不适合

只有中文、文案也固定的内部小工具，不用为此专门改结构。

## 注意

越短的文案涨得越多：一个词的按钮译成德语、俄语常常翻倍，整句话通常多三到四成。按中文宽度把按钮写死，换语言后最先坏的就是主操作。

## 要点

- 按钮、标签、标签页不写 width，用 padding 加 min-width 让宽度跟着文字长
- 一排操作分两种区域：辅助区（图标、价格、次要按钮）按内容定宽，主按钮 flex: 1、min-width: 0 填满剩下的空间
- 放不下时按顺序退：先换成更短的同义说法（如“保存更改”改成“保存”），再改成图标加 aria-label 和提示，最后才允许换成两行；主操作不用省略号截断
- 网格列写 minmax(0, 1fr)，不给会被翻译的文字加 white-space: nowrap 再配固定宽度
- 开发阶段用加长测试文案跑一遍：每条文案拉长一倍左右、加上带重音的字母，截图检查截断、换行和溢出
- 文案不拼接：“共 {数量} 条”这类句子整句交给翻译，语序由翻译决定

## 提示词

让{页面}的按钮、标签和导航经得起译文变长：宽度用 padding + min-width 跟着文字走，不写死 width；底部或弹窗里的一排操作分成辅助区和主按钮，辅助区按内容定宽，主按钮 flex: 1、min-width: 0 填满剩余空间；放不下时先换更短的同义说法，再换成图标加 aria-label，最后才允许两行，主操作不用省略号；网格列用 minmax(0, 1fr)；加一个“加长测试文案”开关，把每条文案拉长一倍并加上重音字母，在 390 / 768 / 1440 宽下检查没有截断和溢出。

## 示例

<style>
.s{height:100%;display:grid;align-content:center;gap:8px;padding:12px 16px;background:#f5f6f8;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.lg{display:flex;align-items:center;gap:4px;justify-self:start;padding:3px;border-radius:9px;background:#e9ecf1}
.lg button{height:26px;padding:0 10px;border:0;border-radius:6px;background:none;color:#475467;font:inherit;font-size:12px;cursor:pointer}
.lg button[aria-pressed="true"]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.lg button:focus-visible,.bar button:focus-visible{outline:2px solid #3b5bdb;outline-offset:2px}
.row{display:grid;grid-template-columns:30px minmax(0,1fr);align-items:center;gap:8px}
.row em{font-style:normal;font-size:12px;font-weight:600}
.x{color:#b42318}
.o{color:#0f7352}
.bar{display:flex;align-items:center;gap:8px;min-width:0;padding:6px;border-radius:10px;background:#fff;border:1px solid #e3e6eb}
.ic{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:8px;background:#f1f3f6;color:#5b616e}
.bar button{min-height:30px;border-radius:8px;font:inherit;font-weight:600;cursor:pointer}
.sec{border:1px solid #c9ced6;background:#fff;color:#1f2329}
.pri{border:0;background:#3b5bdb;color:#fff}
.fix button{width:64px;height:30px;padding:0;white-space:nowrap;overflow:hidden}
.fix .pri{width:84px}
.flex .sec{flex:none;padding:0 12px;white-space:nowrap}
.flex .pri{flex:1;min-width:0;padding:4px 12px;line-height:1.25;text-wrap:balance}
.msg{margin:0;min-height:17px;font-size:12px;color:#5b616e}
@container (max-width:300px){.ic{display:none}
}
</style>

<div class="s">
  <div class="lg" role="group" aria-label="界面语言"><button type="button" data-l="zh" aria-pressed="true">中文</button><button type="button" data-l="en" aria-pressed="false">EN</button><button type="button" data-l="de" aria-pressed="false">DE</button><button type="button" data-l="xx" aria-pressed="false">加长测试</button></div>
  <div class="row"><em class="x">写死</em><div class="bar fix"><span class="ic" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 13.5S2.5 10 2.5 6.2A2.7 2.7 0 0 1 8 4.6a2.7 2.7 0 0 1 5.5 1.6C13.5 10 8 13.5 8 13.5Z"/></svg></span><button type="button" class="sec" data-k="c"></button><button type="button" class="pri" data-k="s"></button></div></div>
  <div class="row"><em class="o">弹性</em><div class="bar flex"><span class="ic" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 13.5S2.5 10 2.5 6.2A2.7 2.7 0 0 1 8 4.6a2.7 2.7 0 0 1 5.5 1.6C13.5 10 8 13.5 8 13.5Z"/></svg></span><button type="button" class="sec" data-k="c"></button><button type="button" class="pri" data-k="s"></button></div></div>
  <p class="msg" role="status"></p>
</div>

<script type="module">
// 每种语言三条：次按钮、主按钮完整说法、主按钮短说法（放不下时换上）
const T = {
  zh: ['取消', '保存更改', '保存'],
  en: ['Cancel', 'Save changes', 'Save'],
  de: ['Abbrechen', 'Änderungen speichern', 'Speichern'],
  xx: ['[Çàñçéł ~~~]', '[Šàvé çĥàñĝéš ~~~~~~]', '[Šàvé ~~]'],
};
const LANG = { zh: 'zh-CN', en: 'en', de: 'de', xx: 'en' };
export default function demo(root) {
  const bars = root.querySelectorAll('.bar'), msg = root.querySelector('.msg'), lgs = root.querySelectorAll('.lg button');
  const set = (l) => {
    const [c, s, short] = T[l];
    lgs.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.l === l)));
    bars.forEach((bar) => { bar.lang = LANG[l]; bar.querySelector('.sec').textContent = c; bar.querySelector('.pri').textContent = s; });
    // 弹性那排：主按钮里最长的词都放不下时换短说法
    const p = root.querySelector('.flex .pri'), wide = (el) => el.scrollWidth > el.clientWidth + 1;
    if (wide(p)) p.textContent = short;
    const cut = wide(root.querySelector('.fix .pri')) || wide(root.querySelector('.fix .sec'));
    msg.textContent = cut ? `写死宽度的按钮被截断；弹性的${p.textContent === short ? '换成了短说法' : '跟着文字变宽'}` : '中文下两种写法看起来一样';
  };
  lgs.forEach((b) => (b.onclick = () => set(b.dataset.l)));
  set('zh');
  setTimeout(() => root.host.isConnected && set('de'), 700);
}
</script>
