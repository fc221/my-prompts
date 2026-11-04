---
zh: 一屏一问的偏好收集
en: One-question-per-screen quiz
order: 110
---

## 是什么

首次使用时收集偏好，每屏只问一个问题，用标签式选项作答，顶部分段进度跟着点亮，换题时内容左右滑入。

## 适合

新用户的兴趣、目标、水平收集，3–5 个问题，每题选项不超过 8 个。

## 不适合

字段之间要对照着填，或超过 5 个问题时，用普通表单或步骤条；实名、地址这类必填资料不要放进可跳过的偏好收集。

## 注意

随时可以跳过，跳过后用合理默认值并告诉用户去哪里补；返回上一题保留已选。

## 要点

- 一屏一个问题：标题 16px，下面是标签式选项（高 32–36px 胶囊），用原生 checkbox / radio 实现，选中后整块填充主色。
- 没选够时“下一步”禁用，旁边写清原因（“还差 1 个”“请选一项”）；选满上限时其余选项禁用并写“最多选 3 个”。
- 顶部分段进度：已答和当前题的分段点亮（transform: scaleX 过渡 300ms），右上角常驻“跳过”。
- 换题时新内容沿前进方向平移 24px 并淡入，约 240ms；返回时方向相反，已选的保留。
- 换题后焦点移到新题标题（tabindex="-1"），标题里带读屏文字“第 2 / 3 题”。
- 最后一屏显示汇总，可以返回修改；跳过的题写“未选，可在 我的 › 偏好 里补充”。
- 减少动态效果时去掉平移，直接换内容。

## 提示词

为{产品}的首次使用做「一屏一问的偏好收集」，共 {题数} 题：每屏只问一题，标题下是标签式选项（原生 checkbox / radio 做成胶囊，选中整块填充主色），写明单选或多选及数量要求；没选够时“下一步”禁用并在旁边写原因，选满上限时其余选项禁用；顶部分段进度随题目点亮，右上角常驻“跳过”；换题时内容沿前进方向平移 24px 并淡入（240ms），返回方向相反且保留已选；换题后焦点移到新标题；最后一屏显示汇总，跳过的题写明去哪里补；减少动态效果时去掉平移，直接换内容。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{padding:10px 14px}
.ob{display:flex;flex-direction:column;gap:6px;height:100%;max-width:460px;margin:0 auto}
.top{flex:none;display:flex;align-items:center;gap:10px;height:28px}
.bk{flex:none;display:grid;place-items:center;width:28px;height:28px;padding:0;border:0;border-radius:50%;background:transparent}
.bk:hover{background:#e9ecf1}
.bk svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.seg{flex:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}
.seg i{position:relative;height:4px;overflow:hidden;border-radius:2px;background:#e3e6eb}
.seg i::after{content:"";position:absolute;inset:0;background:#3b5bdb;transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.2,0,0,1)}
.seg i.on::after{transform:none}
.skip{flex:none;height:28px;padding:0 6px;border:0;border-radius:6px;background:none;color:#5b616e;font-size:12px}
.skip:hover{color:#1f2329}
.bd{flex:1;min-height:0}
.bd h3{margin:0 0 8px;font-size:15px;line-height:22px}
.bd h3:focus{outline:none}
.bd h3:focus-visible{outline:2px solid #3b5bdb;outline-offset:2px}
.sub{display:none;margin:-4px 0 12px;color:#5b616e;font-size:12px}
.ops{display:flex;flex-wrap:wrap;gap:6px}
.op{position:relative;display:inline-flex}
.op input{position:absolute;width:1px;height:1px;margin:0;opacity:0;pointer-events:none}
.op span{display:inline-flex;align-items:center;height:32px;padding:0 14px;border:1px solid #d5d9e0;border-radius:999px;background:#fff;white-space:nowrap;cursor:pointer;transition:background-color .16s,border-color .16s,color .16s}
.op input:checked+span{border-color:#3b5bdb;background:#3b5bdb;color:#fff}
.op input:focus-visible+span{outline:2px solid #3b5bdb;outline-offset:2px}
.op input:disabled+span{border-color:#e3e6eb;background:#f5f6f8;color:#a3a9b4;cursor:not-allowed}
.fwd{animation:ssr .24s cubic-bezier(.2,0,0,1)}
.back{animation:ssl .24s cubic-bezier(.2,0,0,1)}
@keyframes ssr{from{opacity:0;transform:translateX(24px)}
}
@keyframes ssl{from{opacity:0;transform:translateX(-24px)}
}
dl{display:grid;gap:4px;margin:0}
dl div{display:flex;gap:12px;min-width:0;line-height:22px}
dt{flex:none;color:#5b616e;font-size:12px}
dd{min-width:0;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
dd.no{color:#8a8f99;font-size:12px}
.ft{flex:none;display:flex;align-items:center;justify-content:space-between;gap:10px}
.why{min-width:0;overflow:hidden;color:#5b616e;font-size:12px;text-overflow:ellipsis;white-space:nowrap}
.nx{flex:none;height:34px;padding:0 18px;border:0;border-radius:999px;background:#3b5bdb;color:#fff;font-weight:600}
.nx:disabled{background:#e3e6eb;color:#8a8f99;cursor:not-allowed}
@container (min-height:220px){.sub{display:block}
.bd h3{font-size:17px;line-height:26px}
.op span{height:36px;padding:0 16px}
.ob{gap:10px}
}
@container (min-width:560px){.ob{justify-content:center;gap:16px}
.bd{flex:none}
}
</style>

<div class="st"><div class="ob"><div class="top"><button type="button" class="bk" aria-label="上一步"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg></button><div class="seg" aria-hidden="true"><i></i><i></i><i></i></div><button type="button" class="skip">跳过</button></div><div class="bd"></div><div class="ft"><span class="why" id="ss-why"></span><button type="button" class="nx" aria-describedby="ss-why">下一步</button></div></div></div>

<script type="module">
export default function demo(root) {
  const Q = [
    { t: '你平时主要做哪些运动？', k: '运动', min: 2, max: 6, o: ['跑步', '骑行', '游泳', '瑜伽', '力量训练', '徒步'] },
    { t: '一周大概练几次？', k: '频率', single: true, min: 1, max: 1, o: ['1–2 次', '3–4 次', '5 次以上', '还没固定'] },
    { t: '想先看到哪类内容？', k: '内容', min: 1, max: 3, o: ['训练计划', '装备测评', '饮食搭配', '伤病恢复', '路线推荐'] },
  ];
  const bd = root.querySelector('.bd'), nx = root.querySelector('.nx'), why = root.querySelector('.why'), bk = root.querySelector('.bk'), skip = root.querySelector('.skip'), segs = [...root.querySelectorAll('.seg i')];
  const ans = Q.map(() => []); let step = 0;
  const sync = () => {
    if (step === Q.length) { why.textContent = '首页会按这些偏好推荐'; nx.disabled = false; nx.textContent = '重新体验'; return; }
    const q = Q[step], n = ans[step].length, lack = q.min - n;
    bd.querySelectorAll('input').forEach((i) => { i.disabled = !q.single && !i.checked && n >= q.max; });
    nx.disabled = lack > 0; nx.textContent = step === Q.length - 1 ? '完成' : '下一步';
    why.textContent = q.single ? (n ? '单选' : '单选，请选一项') : lack > 0 ? `多选，还差 ${lack} 个` : n >= q.max && q.max < q.o.length ? `最多选 ${q.max} 个` : `已选 ${n} 个`;
  };
  const render = (dir, focus) => {
    const done = step === Q.length;
    segs.forEach((s, i) => s.classList.toggle('on', i <= step));
    bk.style.visibility = step ? '' : 'hidden'; skip.style.visibility = done ? 'hidden' : '';
    if (done) {
      bd.innerHTML = `<h3 tabindex="-1">偏好已保存</h3><dl>${Q.map((q, i) => `<div><dt>${q.k}</dt><dd${ans[i].length ? '' : ' class="no"'}>${ans[i].join('、') || '未选，可在 我的 › 偏好 里补充'}</dd></div>`).join('')}</dl>`;
    } else {
      const q = Q[step];
      bd.innerHTML = `<h3 id="ss-q" tabindex="-1"><span class="sr">第 ${step + 1} / ${Q.length} 题，</span>${q.t}</h3><p class="sub">选好后首页会优先推荐相关内容，之后也能改</p><div class="ops" role="${q.single ? 'radiogroup' : 'group'}" aria-labelledby="ss-q">${q.o.map((o) => `<label class="op"><input type="${q.single ? 'radio' : 'checkbox'}" name="ss${step}" value="${o}"${ans[step].includes(o) ? ' checked' : ''}><span>${o}</span></label>`).join('')}</div>`;
    }
    if (dir) { bd.classList.remove('fwd', 'back'); void bd.offsetWidth; bd.classList.add(dir); }
    sync();
    if (focus) bd.querySelector('h3').focus({ preventScroll: true }); // 只在真人操作时移焦点，自动演示不抢焦点
  };
  bd.addEventListener('change', () => { ans[step] = [...bd.querySelectorAll('input:checked')].map((i) => i.value); sync(); });
  nx.addEventListener('click', (e) => { if (step === Q.length) { ans.forEach((a) => { a.length = 0; }); step = 0; render('back', e.isTrusted); return; } step++; render('fwd', e.isTrusted); });
  bk.addEventListener('click', (e) => { step--; render('back', e.isTrusted); });
  skip.addEventListener('click', (e) => { step = Q.length; render('fwd', e.isTrusted); });
  render();
  const auto = (ms, s, fn) => setTimeout(() => { if (root.host.isConnected && step === s) fn(); }, ms);
  const pick = (v) => () => bd.querySelector(`input[value="${v}"]`).click();
  auto(250, 0, pick('跑步')); auto(500, 0, pick('骑行')); auto(750, 0, () => nx.click()); auto(1100, 1, pick('3–4 次'));
}
</script>
