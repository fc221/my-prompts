---
zh: 打字切词标题
en: Word swap typing
aka: 替换打字 标题换词 单词轮换 打字换词
order: 20
---

## 是什么

一句固定的标题里只有一个词在换：这个词先被选中，整词剪掉，再一个字一个字打出下一个词，前后的文字纹丝不动。

## 适合

首屏主标题要说明产品能处理多种对象：句子主干不变，只换宾语或场景，比如“把合同、简历、周报交给它”。

## 不适合

词在句尾、想要完整的打字和退格过程，用「打字机文字」，它逐字删、逐字打，句子后面没有文字要顾；一句话里的数字或月份随数据更新，用「只动变了的那几个字」，它由数据驱动，没有光标也不循环；几行标题整体换场用「多行标题换场」。

## 注意

词在句子中间，后面的字会跟着词宽跳，所以要先占位：所有候选词隐形叠在同一格里，格宽等于最长的词。候选词字数要接近，差得多时短词后面会空出一截。

## 要点

- 占位：词槽用 inline-grid，候选词 visibility: hidden 全部放在 grid-area: 1 / 1，显示的词叠在同一格、靠左对齐。
- 节奏：停留约 1.5 秒 → 选中高亮 340ms → 整词删除 → 停 180ms → 每字约 95ms 打出。
- 选中态是浅色底块，像双击选词；光标只跟着这个词，1 秒一周期。
- 候选词 3–5 个，放完循环；页面首屏先完整显示第一个词。
- 可视的句子 aria-hidden，另放一句读屏文案，把候选词一次读完：“把会议纪要、招标文件、产品手册交给……”。
- 自动循环超过 5 秒，要给暂停按钮，离开视口时也暂停。
- 减少动态效果时停在第一个词。

## 提示词

把{标题句子}里的{要替换的词}做成「打字切词标题」：候选词 {词1}、{词2}、{词3}，字数尽量接近；用 inline-grid 把所有候选词隐形叠在一格里占位，格宽等于最长的词，换词时其余文字不动；循环节奏：停留 1.5 秒，当前词被选中（浅色底块）340ms，整词一次删掉，停 180ms，再每字 95ms 打出下一个词；词尾有 1 秒一周期的竖线光标；首屏先完整显示第一个词；可视句子对读屏隐藏，另放一句包含全部候选词的完整文案；提供暂停按钮，离开视口时暂停；减少动态效果时停在第一个词。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:flex;flex-direction:column;justify-content:center;gap:12px;padding:14px 20px;background:#fbfaf5;color:#1d1f27}
h3{margin:0;font-size:23px;line-height:1.45;font-weight:750;text-wrap:balance}
.slot{display:inline-grid;margin:0 .12em}
.slot>*{grid-area:1/1;white-space:nowrap}
.gh{visibility:hidden}
.live{color:#c2410c}
.live i{border-radius:3px;font-style:normal}
.live.sel i{background:#fdba74;color:#7c2d12}
.car{display:inline-block;width:2px;height:.95em;margin-left:1px;background:#c2410c;vertical-align:-.1em;animation:wc-b 1s steps(1) infinite}
@keyframes wc-b{50%{opacity:0}
}
.ft{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#6b6a60;font-size:12px}
.pa.ctl{flex:none;height:28px;padding:0 10px;font-size:12px}
@container (min-height:260px){.st{gap:18px;padding:20px 40px}
h3{font-size:34px}
.ft{font-size:13px}
}
@media (prefers-reduced-motion:reduce){.car{display:none}
.pa{display:none}
}
</style>

<div class="st"><h3><span class="sr">把会议纪要、招标文件、产品手册、客服话术交给 MyPrompts，当天定稿</span><span aria-hidden="true">把<span class="slot"><span class="live"><i></i><span class="car"></span></span></span>交给 MyPrompts，当天定稿</span></h3><div class="ft"><span>只换这一个词，整句不挪位</span><button type="button" class="ctl pa" aria-pressed="false">暂停</button></div></div>

<script type="module">
const WORDS = ['会议纪要', '招标文件', '产品手册', '客服话术'];
export default function demo(root) {
  const slot = root.querySelector('.slot'), live = root.querySelector('.live'), w = live.querySelector('i'), pa = root.querySelector('.pa');
  // 所有候选词隐形叠在同一格里，槽宽等于最长的词，换词时后面的字不会动
  slot.prepend(...WORDS.map((t) => { const s = document.createElement('span'); s.className = 'gh'; s.textContent = t; return s; }));
  w.textContent = WORDS[0];
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let paused = false, off = false;
  pa.addEventListener('click', () => { paused = !paused; pa.textContent = paused ? '继续' : '暂停'; pa.setAttribute('aria-pressed', String(paused)); });
  new IntersectionObserver(([e]) => { off = !e.isIntersecting; }).observe(root.host);
  const wait = async (ms) => {
    await new Promise((r) => setTimeout(r, ms));
    while ((paused || off) && root.host.isConnected) await new Promise((r) => setTimeout(r, 150));
  };
  (async () => {
    let hold = 200, i = 0;
    while (root.host.isConnected) {
      await wait(hold); hold = 1500;
      live.classList.add('sel');            // 先选中，让人看清要换的是这个词
      await wait(340);
      live.classList.remove('sel'); w.textContent = ''; // 一刀剪掉，不逐字退格
      await wait(180);
      i = (i + 1) % WORDS.length;
      for (const ch of WORDS[i]) { w.textContent += ch; await wait(95); }
    }
  })();
}
</script>
