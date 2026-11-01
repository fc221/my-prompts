---
zh: 主从联动
en: Master-detail
order: 20
---

## 是什么

左侧列表选中一项，右侧详情立即切换；上下方向键逐条切换，列表位置保持不动。

## 适合

工单、邮件、审核、客服会话等需要连续逐条处理的工作台。

## 不适合

可用宽度小于 1024px 时改成“列表 → 详情”两级页面，不要硬挤两栏。

## 注意

在详情里改了状态，列表对应行要同帧更新，不等刷新。

## 要点

- 左栏 280–360px，右栏占满剩余宽度，两栏独立滚动；当前项有强调底色和左侧 3px 指示条。
- 列表用 listbox 语义，只占一个 Tab 停靠点，上下方向键切换，Home / End 到首尾。
- 切换时只刷新右侧，左侧滚动位置、筛选和选中保持不变；当前项被挡住时滚到可见。
- 详情里的操作（标记已解决、指派）同帧更新左侧对应行的状态。
- 当前对象写进 URL（用 replaceState），刷新后仍选中同一项。
- 详情有未保存修改时，切换前先提示。
- 处理完一条可选“自动切到下一条”。

## 提示词

把{工单 / 审核}页面做成「主从联动」：左侧列表 320px、右侧详情，两栏独立滚动；点击或上下方向键切换当前项，只刷新右侧，左侧滚动位置和筛选不变；当前项高亮并保持可见；在详情里改状态时列表对应行同帧更新；当前对象写进 URL；有未保存修改时切换前提醒；900px 以下改为列表和详情两级页面。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 12px}
.box{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);max-width:640px;height:100%;margin:0 auto;background:#fff;border:1px solid #e3e6eb;border-radius:12px;overflow:hidden}
.list{margin:0;padding:4px;overflow:auto;list-style:none;border-right:1px solid #e3e6eb;outline-offset:-2px}
.list li{position:relative;display:flex;flex-direction:column;justify-content:center;padding:4px 8px 4px 12px;border-radius:6px;line-height:1.4;cursor:pointer}
.list li:hover{background:#f5f6f8}
.list li[aria-selected=true]{background:#edf1ff}
.list li[aria-selected=true]::before{content:"";position:absolute;left:3px;top:8px;bottom:8px;width:3px;border-radius:2px;background:#3b5bdb}
.list b{overflow:hidden;font-weight:500;text-overflow:ellipsis;white-space:nowrap}
.list small{display:flex;align-items:center;gap:4px;color:#5b616e;font-size:12px}
.dot{flex:none;width:6px;height:6px;border-radius:50%;background:#8a909c}
.dot.doing{background:#3b5bdb}
.dot.ok{background:#12805c}
.det{display:flex;flex-direction:column;gap:4px;min-width:0;padding:10px 14px;overflow:auto}
.det h4{margin:0;font-size:15px;line-height:1.4}
.det .m{color:#5b616e;font-size:12px}
.det p{margin:2px 0 0}
.act{display:flex;gap:8px;margin-top:auto;padding-top:8px}
.act button{height:30px;padding:0 12px;border:1px solid #e3e6eb;border-radius:6px;background:#fff;font-size:12px}
.act .pri{border-color:#3b5bdb;background:#3b5bdb;color:#fff}
.act .pri:disabled{border-color:#e6f4ee;background:#e6f4ee;color:#12805c;cursor:default}
.det.fade{animation:in .16s}
@keyframes in{from{opacity:.3}
}
@container (min-width:560px){.list li{padding:8px 10px 8px 14px}
.det{padding:16px 20px}
.det h4{font-size:16px}
}
</style>

<div class="st"><div class="box"><ul class="list" role="listbox" tabindex="0" aria-label="工单，上下方向键切换"></ul><section class="det" aria-live="polite"></section></div></div>

<script type="module">
export default function demo(root) {
  const D = [['T-2318', '退款到账慢', '何小满', '处理中', '退款审核通过 3 天仍未到账，客户希望确认银行处理进度。'], ['T-2317', '发票抬头写错', '林知远', '待处理', '需要把抬头从个人改为公司：杭州云帆科技有限公司。'], ['T-2315', '收不到验证码', '苏墨', '待处理', '绑定手机号时 60 秒内收不到验证码，已尝试 3 次。'], ['T-2312', '账号被锁定', '周以宁', '已解决', '连续输错密码 5 次被锁，已人工解锁并提醒开启两步验证。'], ['T-2309', '关闭自动续费', '陈一鸣', '待处理', '不想自动续费，询问在哪里关闭以及是否影响当前套餐。']];
  const list = root.querySelector('.list'), det = root.querySelector('.det'); let cur = 0;
  const cls = (s) => (s === '已解决' ? 'ok' : s === '处理中' ? 'doing' : '');
  D.forEach(([id, t, who, s], i) => { const li = document.createElement('li'); li.id = 'tk' + i; li.setAttribute('role', 'option'); li.innerHTML = `<b>${t}</b><small><i class="dot ${cls(s)}"></i><span>${s} · ${who}</span></small>`; li.onclick = () => select(i); list.append(li); });
  const items = [...list.children];
  const paintRow = (i) => { const [, , who, s] = D[i]; items[i].querySelector('.dot').className = 'dot ' + cls(s); items[i].querySelector('span').textContent = `${s} · ${who}`; };
  const select = (i) => {
    cur = Math.max(0, Math.min(D.length - 1, i));
    items.forEach((li, k) => li.setAttribute('aria-selected', String(k === cur))); list.setAttribute('aria-activedescendant', 'tk' + cur);
    const li = items[cur]; // 只滚动列表自身，让当前项可见
    if (li.offsetTop < list.scrollTop) list.scrollTop = li.offsetTop - 4; else if (li.offsetTop + li.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = li.offsetTop + li.offsetHeight - list.clientHeight + 4;
    const [id, t, who, s, desc] = D[cur];
    det.innerHTML = `<h4>${t}</h4><span class="m">${id} · ${who} · ${s}</span><p>${desc}</p><div class="act"><button type="button" class="pri"${s === '已解决' ? ' disabled' : ''}>${s === '已解决' ? '已解决' : '标记已解决'}</button><button type="button">转给同事</button></div>`;
    det.classList.remove('fade'); void det.offsetWidth; det.classList.add('fade');
    det.querySelector('.pri').onclick = () => { D[cur][3] = '已解决'; paintRow(cur); select(cur); }; // 详情改状态，列表同帧更新
  };
  list.addEventListener('keydown', (e) => {
    const k = { ArrowDown: cur + 1, ArrowUp: cur - 1, Home: 0, End: D.length - 1 }[e.key];
    if (k === undefined) return; e.preventDefault(); select(k);
  });
  select(0);
}
</script>
