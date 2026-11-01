---
zh: 渐进式披露
en: Progressive disclosure
aka: 更多设置 高级选项 折叠设置 分层展示 收起选项
order: 70
---

## 是什么

首屏只留最常用的几项，其余收进“更多”或“高级”，用到时就地展开。示例是一块通知设置：常用三项在外面，其余收在两层里，改过的项数显示在入口上。

## 适合

设置页、长表单、筛选区、发布前的选填项，大多数人只用其中一小部分时。

## 不适合

每个人都必须填的字段，要放在一起比较的内容。折叠的组件写法看「折叠面板」；项目很多时配「可搜索的设置列表」。

## 注意

收起来不等于看不见。藏起来的项有错或被改过，入口上要直接说明，否则用户以为全是默认值。

## 要点

- 按使用频率分层，不按技术分类；首屏只留多数人常用的几项，不展开也能完成任务
- 入口一眼看得到：紧跟在常用项后面，写清“更多设置”和项数，别叫“其他”
- 藏的层数不超过两层：更多、高级；再往深就拆成单独的页面
- 就地展开，不跳页，本次访问内保持展开状态
- 隐藏项改过时入口显示“已改 N 项”；校验不通过时自动展开并定位到出错项
- 搜索命中隐藏项时自动展开并高亮
- 优先用 details 和 summary，自带键盘操作和读屏状态；自己写时按钮加 aria-expanded

## 提示词

重新整理{页面}的{设置项或表单}：按使用频率分层，首屏只留{常用项}，其余收进“更多设置”，极少用的放进里面的“高级”，最多两层。入口紧跟常用项，写明项数；就地展开，用 details 和 summary 实现；隐藏项和默认值不同时入口显示“已改 N 项”；校验出错时自动展开并定位；搜索命中隐藏项时自动展开；用户不展开也能完成{主要任务}。列出每一项放在哪一层和理由。

## 示例

<style>
.st{height:100%;overflow-y:auto;padding:8px 12px;overscroll-behavior:contain;scrollbar-width:none;background:#f5f6f8;color:#1f2329;font:13px/18px system-ui,"PingFang SC",sans-serif}
.st::-webkit-scrollbar{display:none}
.card{max-width:440px;margin:0 auto;border-radius:12px;background:#fff;box-shadow:0 0 0 1px #e3e6eb}
.hd{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin:0;padding:7px 12px;font-weight:600;white-space:nowrap}
.hd small{color:#5b616e;font-size:12px;font-weight:400}
.row{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:36px;padding:0 12px;border-top:1px solid #eef0f3;white-space:nowrap}
.sw{flex:none;position:relative;width:36px;height:22px;padding:0;border:0;border-radius:11px;background:#aeb4bf;cursor:pointer;transition:background-color .16s}
.sw::after{content:"";position:absolute;left:2px;top:2px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(15,23,42,.3);transition:transform .16s}
.sw[aria-checked=true]{background:#3b5bdb}
.sw[aria-checked=true]::after{transform:translateX(14px)}
summary{display:flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border-top:1px solid #eef0f3;color:#2f49b8;font-weight:600;cursor:pointer;list-style:none;white-space:nowrap}
summary::-webkit-details-marker{display:none}
summary svg{flex:none;width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;transition:transform .16s}
details[open]>summary svg{transform:rotate(90deg)}
summary small{margin-left:auto;color:#5b616e;font-size:12px;font-weight:400}
summary b{padding:0 6px;border-radius:9px;background:#fff1e0;color:#a65300;font-size:12px;line-height:18px;font-weight:600}
summary b:empty{display:none}
.adv{margin-left:12px;border-left:2px solid #e3e6eb}
.adv summary{color:#454b57}
summary:focus-visible,.sw:focus-visible{outline:2px solid #3b5bdb;outline-offset:-2px}
@container (min-height:260px){.st{padding:16px}
.row,summary{min-height:40px}
}
@media (prefers-reduced-motion:reduce){.sw,.sw::after,summary svg{transition:none}
}
</style>

<div class="st"><div class="card"><p class="hd">通知 <small role="status"></small></p><div class="row"><span id="a1">新消息提醒</span><button type="button" class="sw" role="switch" aria-labelledby="a1" aria-checked="true"></button></div><div class="row"><span id="a2">提示音</span><button type="button" class="sw" role="switch" aria-labelledby="a2" aria-checked="true"></button></div><div class="row"><span id="a3">夜间免打扰</span><button type="button" class="sw" role="switch" aria-labelledby="a3" aria-checked="false"></button></div><details class="more"><summary><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>更多设置<b></b><small>6 项</small></summary><div class="row"><span id="b1">消息预览</span><button type="button" class="sw" role="switch" aria-labelledby="b1" aria-checked="true" data-def="true"></button></div><div class="row"><span id="b2">振动</span><button type="button" class="sw" role="switch" aria-labelledby="b2" aria-checked="false" data-def="true"></button></div><div class="row"><span id="b3">合并同类通知</span><button type="button" class="sw" role="switch" aria-labelledby="b3" aria-checked="true" data-def="true"></button></div><div class="row"><span id="b4">应用角标</span><button type="button" class="sw" role="switch" aria-labelledby="b4" aria-checked="true" data-def="true"></button></div><details class="adv"><summary><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>高级<small>2 项</small></summary><div class="row"><span id="c1">低电量时延迟推送</span><button type="button" class="sw" role="switch" aria-labelledby="c1" aria-checked="false" data-def="false"></button></div><div class="row"><span id="c2">记录通知日志</span><button type="button" class="sw" role="switch" aria-labelledby="c2" aria-checked="false" data-def="false"></button></div></details></details></div></div>

<script type="module">
export default function demo(root) {
  const sws = [...root.querySelectorAll('.sw')], hidden = sws.filter((s) => s.dataset.def);
  const badge = root.querySelector('.more>summary b'), head = root.querySelector('.hd small'), more = root.querySelector('.more');
  const paint = () => {
    const n = hidden.filter((s) => s.getAttribute('aria-checked') !== s.dataset.def).length;
    badge.textContent = n ? `已改 ${n} 项` : '';
    head.textContent = more.open ? '已展开全部' : '常用 3 项，其余已收起';
  };
  sws.forEach((s) => s.addEventListener('click', () => {
    s.setAttribute('aria-checked', String(s.getAttribute('aria-checked') !== 'true'));
    paint();
  }));
  more.addEventListener('toggle', paint);
  paint();
}
</script>
