---
zh: 结果页
en: Result page
aka: 成功页 提交成功 操作结果 支付成功 失败页 处理中 result
order: 90
---

## 是什么

提交、付款、导入这类操作做完后的整页反馈：状态图标下面，标题写结果，副标题写接下来会怎样，再给去下一步的按钮。

## 适合

提交审批、付款、开通服务、批量导入这类做完要交代“成了没有、接下来怎样”的操作，分成功、失败、处理中三种。

## 不适合

保存设置、收藏这类当场就能看到结果的小操作用「轻提示 Toast」；页面不存在或服务出错用「404 与异常页」；没有权限用「无权限」。

## 注意

标题回答“成了没有”，副标题回答“接下来怎样”，按钮回答“现在去哪”。三句缺一句，用户就会回头再提交一次，或者打电话来问。

## 要点

- 用组件库的结果页：Element Plus el-result（icon="success" / "error" / "warning" / "info"，title、sub-title，按钮放 extra 插槽；没有内容区，单号放进 sub-title 插槽），Naive UI n-result（status="success" / "error" / "warning" / "info"，title、description，单号放默认插槽，按钮放 footer 插槽），Ant Design Vue a-result（status 取值同上，title、subTitle，单号放默认插槽，按钮放 extra 插槽）；三家都没有“处理中”，用 info 状态，再从 icon 插槽换成时钟图标
- 标题写结果本身，带上对象和关键数字：“已提交报销单”“付款成功 ¥1,280.00”，不写“操作成功”
- 副标题写接下来会发生什么：谁处理（“等待 王敏 审批”）、多久（“预计 1 个工作日内”）、结果怎么通知；单号单独一行，旁边放复制按钮，复制后显示“已复制”，见「代码块与可复制字段」
- 按钮最多两个：主按钮指向最可能的下一步（查看报销单、再提一笔），次按钮回列表或看详情；窄屏上下堆叠，主按钮在上
- 失败：标题写哪件事没成，副标题写原因和怎么改（“发票合计比明细少 ¥36.00，改完再提交”）；主按钮“返回修改”，回到表单时用户填的内容都在；“重试”沿用原来的请求编号，服务端据此去重，不会重复扣款或提交，见「防重复提交」
- 处理中：审核、退款、批量导入这类耗时长的，标题直接写“正在……”，副标题写预计多久、完成后怎么通知、可以先离开；有进度就写“已导入 820 / 1,280 条”，不放一个一直转的圈
- 自动跳转只在确实需要时用，比如付款后回到订单：写“5 秒后回到订单详情”，旁边“不跳转”能停下；读屏只播报一次结果，不逐秒播报倒计时
- 进入结果页用 router.replace，地址带单号：刷新时从服务端读结果，按返回不会回到已提交的表单

## 提示词

把{提交报销单}之后的反馈做成结果页：用项目组件库自带的结果页（Element Plus el-result icon + title + sub-title，按钮放 extra 插槽，单号放 sub-title 插槽；Naive UI n-result status + title + description，单号放默认插槽，按钮放 footer 插槽；Ant Design Vue a-result status + title + subTitle，单号放默认插槽，按钮放 extra 插槽），不手写，放在布局内容区里，导航照常。分三种状态。成功：标题“已提交{报销单}”，副标题写{审批人}审批、预计{1 个工作日}内有结果、结果通知到{消息中心}，单号单独一行，可复制。失败：标题写哪件事没成，副标题写原因和怎么改，主按钮“返回修改”回到表单，已填内容都在；“重试”沿用原请求编号，不重复提交。处理中：用 info 状态并在 icon 插槽放时钟图标（三家都没有处理中），写预计{3 分钟}、完成后怎么通知、可以先离开；有进度写已处理多少、共多少，不放一直转的圈。按钮最多两个：主按钮{查看报销单}，次按钮{回到列表}。需要自动跳转时写“N 秒后回到{订单详情}”并给“不跳转”，读屏只播报一次结果。用 router.replace 进入结果页，地址带单号，刷新从服务端读结果，返回不回到已提交的表单；窄屏按钮上下堆叠，主按钮在上。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:8px}
.pg{width:100%;max-width:560px;height:100%;display:flex;flex-direction:column;gap:6px;padding:8px;background:#fff;border:1px solid #e3e6eb;border-radius:12px}
.seg{align-self:flex-start}
.ct{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.ic{width:22px;height:22px;margin-bottom:4px}
.ct h4{font-size:15px;line-height:20px}
.ct p{color:#5b616e;font-size:12px;line-height:18px}
.ct .meta{display:flex;align-items:center;gap:6px;color:#1f2329;font-variant-numeric:tabular-nums}
.cp{height:18px;padding:0 6px;border:1px solid #d5d9e0;border-radius:4px;background:#fff;color:#3b5bdb;font-size:12px;line-height:16px}
.cp:hover{border-color:#3b5bdb}
.bar{flex:none;width:72px;height:4px;border-radius:2px;background:#e3e6eb;overflow:hidden}
.bar i{display:block;height:100%;background:#3b5bdb;transform:scaleX(var(--p,0));transform-origin:0 50%}
.ac{display:flex;gap:8px;margin-top:6px}
@container (min-height:260px){
.s{padding:12px}
.pg{gap:12px;padding:16px}
.ic{width:40px;height:40px;margin-bottom:8px}
.ct h4{font-size:18px;line-height:26px}
.ct p{font-size:13px;line-height:20px}
.ct .meta{margin-top:4px}
.bar{width:160px}
.ac{margin-top:12px}
.ac .b{height:32px;padding:0 16px;font-size:14px}
}
</style>

<div class="s"><div class="pg"><div class="seg" role="group" aria-label="切换结果"><button type="button" aria-pressed="true">成功</button><button type="button" aria-pressed="false">失败</button><button type="button" aria-pressed="false">处理中</button><button type="button" aria-pressed="false">自动跳转</button></div><div class="ct"></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const ct = root.querySelector('.ct'), sr = root.querySelector('.sr'), seg = [...root.querySelectorAll('.seg button')];
  const ICON = {
    ok: ['#12805c', '<path d="m7.5 12.5 3 3 6-6.5"/>'],
    bad: ['#d92d20', '<path d="m8.5 8.5 7 7m0-7-7 7"/>'],
    wait: ['#3b5bdb', '<path d="M12 7v5l3 2"/>'], // 处理中用静止的时钟，不放转圈
  };
  const icon = (k) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="${ICON[k][0]}"/><g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[k][1]}</g></svg>`;
  const V = [
    { i: 'ok', t: '已提交报销单', d: '等待 王敏 审批，预计 1 个工作日内有结果', m: '<span>单号 BX-1104-0372</span><button type="button" class="cp">复制</button>', a: ['查看报销单', '回到列表'] },
    { i: 'bad', t: '报销单没有提交成功', d: '发票合计比明细少 ¥36.00，改完再提交', m: '<span>已填的 4 条明细都还在</span>', a: ['返回修改', '存为草稿'] },
    { i: 'wait', t: '正在导入 1,280 条明细', d: '预计 3 分钟，完成后发消息通知，可先离开', m: '<span class="bar"><i></i></span><span class="n"></span>', a: ['回到列表', '查看导入记录'] },
    { i: 'ok', t: '付款成功 ¥1,280.00', d: '电子发票 3 个工作日内发到邮箱', m: '<span class="cd"></span><button type="button" class="cp">不跳转</button>', a: ['查看订单', '继续逛逛'] },
  ];
  let t = 0;
  const loop = (ms, fn) => { t = setInterval(() => (ct.isConnected ? fn() : clearInterval(t)), ms); };
  const show = (k) => {
    clearInterval(t);
    seg.forEach((b, j) => b.setAttribute('aria-pressed', String(j === k)));
    const v = V[k];
    ct.innerHTML = `${icon(v.i)}<h4>${v.t}</h4><p>${v.d}</p><p class="meta">${v.m}</p><div class="ac"><button type="button" class="b sm p">${v.a[0]}</button><button type="button" class="b sm">${v.a[1]}</button></div>`;
    sr.textContent = `${v.t}。${v.d}`; // 只播报一次结果
    const cp = ct.querySelector('.cp');
    if (k === 0) cp.addEventListener('click', () => {
      const done = (txt) => () => (cp.textContent = txt);
      navigator.clipboard ? navigator.clipboard.writeText('BX-1104-0372').then(done('已复制'), done('复制失败')) : done('复制失败')();
    });
    if (k === 2) {
      let n = 640;
      const bar = ct.querySelector('.bar i'), num = ct.querySelector('.n');
      const paint = () => { bar.style.setProperty('--p', n / 1280); num.textContent = `已导入 ${n.toLocaleString('en-US')} / 1,280 条`; };
      paint();
      loop(400, () => {
        n = Math.min(1280, n + 32); paint();
        if (n < 1280) return;
        clearInterval(t);
        ct.querySelector('.ic').outerHTML = icon('ok');
        ct.querySelector('h4').textContent = '已导入 1,280 条明细';
        ct.querySelector('p').textContent = '其中 3 条重复，已跳过';
        sr.textContent = '已导入 1,280 条明细，其中 3 条重复，已跳过';
      });
    }
    if (k === 3) {
      let s = 5;
      const cd = ct.querySelector('.cd'), paint = () => (cd.textContent = s ? `${s} 秒后回到订单详情` : '正在回到订单详情…');
      paint();
      loop(1000, () => { s--; paint(); if (!s) { clearInterval(t); cp.hidden = true; } });
      cp.addEventListener('click', () => { clearInterval(t); cd.textContent = '已停止自动跳转'; cp.hidden = true; });
    }
  };
  seg.forEach((b, k) => b.addEventListener('click', () => show(k)));
  show(0);
}
</script>
