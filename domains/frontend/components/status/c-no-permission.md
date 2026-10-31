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

- 用组件库结果页的 403：Naive UI n-result status="403"（title、description，按钮放 footer 插槽）、Ant Design Vue a-result status="403"（title、subTitle，按钮放 extra 插槽）；Element Plus el-result 没有 403 预设，用 icon="warning" 或在 icon 插槽放锁形图标
- 整页无权限放在布局内容区里，侧栏、顶栏和账号信息照常；区块无权限用小号（n-result size="small"，或 el-empty / a-empty 换成锁形图标加一句说明），其余区块照常
- 标题点名资源，如“没有报表中心的访问权限”；副标题写当前账号和角色、缺少的权限，用户能判断是不是登错了号
- 下一步最多 3 个按钮：申请权限（主）、联系管理员（写出是谁）、切换账号；申请后按钮 disabled 并写“已申请，等待审批”，不能重复提交
- 能提前判断的入口直接禁用（el-button / n-button / a-button 的 disabled），用「文字提示」说明原因；禁用的按钮收不到悬停事件，提示要包在外层元素上
- 敏感资源不透露是否存在，统一显示“不存在或无权访问”，和 404 用同一个页面

## 提示词

做{页面 / 区块}的无权限状态：用项目组件库自带的结果页 403（Naive UI n-result status="403" + title + description，按钮放 footer 插槽；Ant Design Vue a-result status="403" + title + subTitle，按钮放 extra 插槽；Element Plus el-result 没有 403 预设，icon 插槽放锁形图标），不手写，放在布局内容区里，侧栏、顶栏和账号信息照常。标题“没有「{资源名}」的访问权限”，副标题写当前账号与角色和缺少的权限；按钮：申请权限（主）、联系管理员{姓名}、切换账号；申请后按钮 disabled 并写“已申请，等待审批”，不能重复提交；能提前判断的入口直接 disabled 并用文字提示说明原因，提示包在按钮外层；敏感资源统一显示“不存在或无权访问”；窄屏按钮上下堆叠。

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
