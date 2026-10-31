---
zh: 页内横幅提示
en: Inline alert / Banner
order: 100
---

## 是什么

页面或区块顶部的一条浅色提示条，常驻显示，不挡任何操作。

## 适合

当前页面或区域的持续状态：试用期剩余、数据同步延迟、即将维护、表单整体的错误汇总。

## 不适合

一闪而过的结果用轻提示；字段级错误放在字段下方；不要每次打开页面都无差别弹出同一条。

## 要点

- 放在相关内容正上方，宽度同所在区域；单行高 40–48px，内边距 10–12px 16px
- 四种语气：信息、成功、警告、错误；浅色底 + 同色描边 + 语义图标 + 正文色文字，不只靠颜色
- 一句话说清状态，最多带一个操作（“立即续费”“查看详情”）
- 可关闭的关闭后记住，不反复出现；错误汇总在问题解决前不可关闭
- 出现时把下方内容推下去，而不是浮在内容上；关闭时高度平滑收起
- 错误类用 role="alert"，其余用 role="status"

## 提示词

在{页面或区块}顶部加「页内横幅提示」说明{持续状态}：宽同所在区域，单行高 40–48px，浅色底 + 同色描边 + 语义图标 + 正文色文字，分信息、成功、警告、错误四种；一句话说状态，最多一个操作链接；可关闭的关闭后记住不再出现，关闭时高度平滑收起；出现时把下方内容推下去而不是盖住；错误用 role="alert"，其他用 role="status"；窄屏文字换行、关闭按钮保持在右侧。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.area{width:100%;max-width:520px;display:grid}
.w{display:grid;grid-template-rows:1fr;transition:grid-template-rows .24s cubic-bezier(.2,0,0,1),opacity .16s}
.w.gone{grid-template-rows:0fr;opacity:0}
.al{min-height:0;overflow:hidden;display:flex;align-items:center;gap:10px;padding:0 6px 0 12px;margin-bottom:8px;border:1px solid;border-radius:8px;font-size:13px;transition:margin .24s}
.w.gone .al{margin-bottom:0;border-width:0}
.al svg{flex:none}
.al p{flex:1;padding:9px 0}
.info{background:#edf1ff;border-color:#d3dcfb}
.info svg{color:#3b5bdb}
.warn{background:#fff6e8;border-color:#f5d9ad}
.warn svg{color:#b54708}
.err{background:#fdeeec;border-color:#f6cdc8}
.err svg{color:#d92d20}
.lk{margin-left:4px;padding:0;border:0;background:none;color:#3b5bdb;text-decoration:underline;font-size:13px}
.al .x{width:28px;height:28px;font-size:18px}
.reset{justify-self:center}
@media (prefers-reduced-motion:reduce){.w,.al{transition:opacity .16s}
}
</style>

<div class="s"><div class="area"><div class="w"><div class="al info" role="status"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg><p>数据每 10 分钟同步一次。</p><button class="x" aria-label="关闭提示">×</button></div></div><div class="w"><div class="al warn" role="status"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></svg><p>试用期剩余 3 天。<button class="lk">立即续费</button></p><button class="x" aria-label="关闭提示">×</button></div></div><div class="w"><div class="al err" role="alert"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg><p>2 个字段未通过校验，请检查。</p></div></div><button class="b t sm reset" hidden>恢复示例</button></div></div>

<script type="module">
export default function demo(root) {
  const reset = root.querySelector('.reset');
  root.querySelectorAll('.al .x').forEach((x) => x.addEventListener('click', () => { x.closest('.w').classList.add('gone'); x.closest('.al').inert = true; reset.hidden = false; reset.focus(); }));
  reset.addEventListener('click', () => { root.querySelectorAll('.w').forEach((w) => { w.classList.remove('gone'); w.firstChild.inert = false; }); reset.hidden = true; });
}
</script>
