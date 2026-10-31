---
zh: 无权限
en: No permission
order: 60
---

## 是什么

没有访问权限时，保留导航和身份信息，说明为什么看不到、怎样获得权限。

## 适合

用户进入没有权限的页面、区块，或点到没有权限的操作。

## 不适合

不要直接跳回首页或伪装成 404（敏感资源除外）；能提前判断的入口直接置灰说明，不要等点了才告诉用户。

## 要点

- 写明当前账号和角色、缺少的权限、资源名称
- 给出下一步：申请权限、联系管理员（写出是谁）、切换账号
- 保留侧栏、顶栏和账号信息，用户可以去别处
- 申请后显示“已申请，等待审批”，避免重复提交
- 无权限的按钮用 aria-disabled 并说明原因，而不是隐藏起来让人找不到
- 敏感资源可以不透露是否存在，统一显示“不存在或无权访问”

## 提示词

设计「无权限」状态：用户进入无权访问的{页面 / 区块}时，保留侧栏、顶栏和账号信息，内容区显示锁形图标 + “没有「{资源名}」的访问权限” + 当前账号与角色 + 下一步（申请权限、联系管理员{姓名}、切换账号）；申请后按钮变为“已申请，等待审批”且不能重复提交；能提前判断的入口直接用 aria-disabled 置灰并说明原因；敏感资源统一显示“不存在或无权访问”；窄屏按钮上下堆叠。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.app{width:100%;max-width:560px;height:100%;display:flex;background:#fff;border:1px solid #e3e6eb;border-radius:10px;overflow:hidden}
.rail{flex:none;width:44px;padding:8px 0;display:flex;flex-direction:column;align-items:center;gap:6px;border-right:1px solid #e3e6eb;color:#5b616e;font-size:14px}
.rail span{width:30px;height:30px;display:grid;place-items:center;border-radius:6px}
.rail .on{background:#edf1ff;color:#3b5bdb}
.rail .me{margin-top:auto;border-radius:50%;background:#f0f2f5;font-size:12px}
.main{flex:1;min-width:0;display:grid;place-items:center;padding:12px}
.box{display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}
.box svg{width:30px;height:30px;margin-bottom:2px;color:#8a909c}
.box b{font-size:15px}
.box p{line-height:1.6}
.ac{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:8px}
</style>

<div class="s"><div class="app"><div class="rail" aria-hidden="true"><span>▦</span><span class="on">▤</span><span>◎</span><span class="me">林</span></div><div class="main"><div class="box"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><b>没有「财务报表」的访问权限</b><p class="muted">当前账号 lin@example.com（运营）<br>可向管理员 张伟 申请</p><div class="ac"><button class="b p ask">申请权限</button><button class="b">切换账号</button></div></div></div></div></div>

<script type="module">
export default function demo(root) {
  const ask = root.querySelector('.ask');
  ask.addEventListener('click', () => { if (ask.getAttribute('aria-disabled')) return; ask.setAttribute('aria-disabled', 'true'); ask.textContent = '已申请，等待张伟审批'; });
}
</script>
