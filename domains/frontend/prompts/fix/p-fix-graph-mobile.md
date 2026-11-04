---
zh: 把关系图搬到手机上
en: Relationship graph on mobile
aka: 拓扑图手机版 链路图 依赖图移动端 节点图 复杂图表手机适配
of: p-fix-mobile
tab: 关系图
order: 112
---

## 是什么

症状：电脑上满屏连线的关系图（系统调用链路、服务依赖、组织结构）直接缩到手机上，节点和字挤成一团，连线交叉看不出谁连着谁，悬停提示也点不出来。手机版只回答“哪里出了问题、该找谁”：连线换成分组列表，悬停换成点开的半屏面板。

## 要点

- 先删功能再搬：编辑节点、拖动布局、批量操作留在电脑版，手机上只看状态、找负责人
- 颜色只给异常：正常节点一律灰色，红色只用在异常上，并配图标和文字（“超时”“无响应”），不只靠颜色区分
- 节点按业务分组收成卡片，卡片标题旁写“异常 2 · 正常 5”；有异常的组排最前并默认展开，全部正常的组收起
- 图改成按层级缩进的列表，每层缩进 16px，超过 3 层点进下一屏；顶部保留两级路径（“支付链路 › 支付网关”），点路径回上一级；每行高至少 44px，整行可点
- 悬停改点按：点节点从底部弹出半屏面板，只放状态、负责人（能直接打电话或发消息）、上游和下游，点上下游跳到那个节点；下滑、关闭按钮、系统返回都能关，打开时用 history.pushState 记一条，返回键先关面板，不会直接离开页面
- 电脑版顺手整理：主链路从左到右摆成一条直线，减少交叉；指向同一个节点的多条线合并成一条并标数量；点中节点时高亮它的整条上下游链路，其余变淡

## 提示词

{产品}的{关系图，如服务调用链路图}在手机上缩成一团，请单独做手机版，不要把电脑版的图缩小：
1. 先删功能：编辑节点、拖动布局、批量操作只留在电脑版；手机版只回答“哪里出了问题、该找谁”。
2. 配色：正常节点一律灰色，红色只给异常，并配图标和文字写明异常类型（超时、无响应、错误率高），不只靠颜色。
3. 分组：节点按{业务分组，如支付、订单、库存}收成卡片，卡片上写异常和正常的数量；有异常的组排最前、默认展开，全部正常的组收起。
4. 图改列表：按层级缩进（每层 16px），超过 3 层点进下一屏；顶部保留两级路径，点路径回上一级；每行高至少 44px，整行可点。
5. 悬停改点按：点节点从底部弹出半屏面板，只放状态、负责人（能直接联系）、上游和下游，点上下游跳到对应节点；下滑、关闭按钮、系统返回都能关（打开时 push 一条历史记录），关闭后回到原来的滚动位置。
6. 电脑版顺手整理：主链路摆成一条直线、减少交叉；指向同一节点的多条连线合并并标数量；点中节点时高亮整条上下游链路，其余变淡。
在 360 / 390 宽检查，列出删掉了哪些功能、分成了哪几组。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:6px;display:flex;justify-content:center}
.ph{position:relative;width:104px;height:142px;border:2px solid #2b2f36;border-radius:10px;background:#fff;overflow:hidden;font-size:7px;line-height:9px;color:#1f2329}
.tb{display:flex;align-items:center;gap:3px;height:13px;padding:0 5px;white-space:nowrap}
/* 改前：电脑版的图直接缩小，满屏连线、五颜六色，编辑工具还在 */
.bad .tb{background:#1f2329;color:#fff;font-size:8px}
.bad .tb span{flex:1}
.bad .tb i{width:6px;height:6px;border-radius:1px;background:#8a909c}
.bad svg{display:block;width:100%;height:125px}
/* 改后：顶部两级路径，按业务分组的列表，正常一律灰色，点节点弹半屏面板 */
.good .tb{border-bottom:1px solid #eef0f3;color:#5b616e}
.good .tb b{color:#1f2329}
.ls{display:flex;flex-direction:column;gap:2px;padding:3px 4px}
.gp{padding:0 3px;border:1px solid #e3e6eb;border-radius:4px}
.gh{display:flex;align-items:center;gap:3px;height:10px;white-space:nowrap}
.gh b{flex:1}
.gh span{color:#5b616e}
.gh .er{color:#c92a2a}
.nd{display:flex;align-items:center;gap:2px;height:9px;border-top:1px solid #f1f3f5;color:#5b616e;white-space:nowrap}
.nd i{flex:none;width:5px;height:5px;border-radius:50%;background:#adb5bd}
.nd em{margin-left:auto;font-style:normal}
.nd.er{color:#1f2329}
.nd.er i{width:0;height:0;border-radius:0;background:none;border:3px solid transparent;border-bottom:5px solid #c92a2a;border-top:0}
.nd.er em{color:#c92a2a;font-weight:600}
.nd.sub{padding-left:6px}
.nd.on{margin:0 -3px;padding-right:3px;padding-left:3px;background:#fff0f0}
.scr{position:absolute;inset:0;background:rgba(15,23,42,.16)}
.sh{position:absolute;left:0;right:0;bottom:0;padding:2px 5px 3px;border-radius:6px 6px 0 0;background:#fff;box-shadow:0 -3px 8px rgba(15,23,42,.18)}
.sh::before{content:"";display:block;width:14px;height:2px;margin:0 auto 1px;border-radius:1px;background:#c5cad3}
.st{display:flex;align-items:center;justify-content:space-between;font-weight:600}
.st span{color:#5b616e;font-weight:400}
.sh dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:0 4px;margin:0}
.sh dt{color:#5b616e}
.sh dd{margin:0;white-space:nowrap}
.sh .er{color:#c92a2a;font-weight:600}
.sh .lk{color:#3b5bdb}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="ph"><div class="tb"><span>调用链路</span><i></i><i></i><i></i></div><svg viewBox="0 0 100 124" aria-hidden="true"><g stroke="#b6bcc6" stroke-width=".6"><path d="M50 14 20 30M50 14 80 28M50 14 35 52M50 14 68 50M20 30 35 52M20 30 52 72M80 28 68 50M80 28 14 70M80 28 28 92M35 52 52 72M35 52 28 92M35 52 64 94M68 50 86 70M68 50 14 70M14 70 64 94M52 72 88 102M52 72 10 108M86 70 45 112M28 92 45 112M64 94 88 102M20 30 64 94M80 28 10 108M14 70 86 70"/></g><g stroke="#fff" stroke-width=".8"><circle cx="50" cy="14" r="4" fill="#4dabf7"/><circle cx="20" cy="30" r="4" fill="#69db7c"/><circle cx="80" cy="28" r="4" fill="#ffa94d"/><circle cx="35" cy="52" r="4" fill="#e03131"/><circle cx="68" cy="50" r="4" fill="#f783ac"/><circle cx="14" cy="70" r="4" fill="#9775fa"/><circle cx="52" cy="72" r="4" fill="#ff8787"/><circle cx="86" cy="70" r="4" fill="#ffd43b"/><circle cx="28" cy="92" r="4" fill="#e03131"/><circle cx="64" cy="94" r="4" fill="#ffa8a8"/><circle cx="88" cy="102" r="4" fill="#74c0fc"/><circle cx="45" cy="112" r="4" fill="#63e6be"/><circle cx="10" cy="108" r="4" fill="#fab005"/></g><g fill="#5b616e" font-size="4.5"><text x="55" y="12">网关</text><text x="9" y="25">收银台</text><text x="72" y="21">订单</text><text x="26" y="60">支付网关</text><text x="71" y="45">库存</text><text x="4" y="78">账户</text><text x="55" y="80">风控</text><text x="79" y="78">通知</text><text x="18" y="100">银行通道</text><text x="57" y="102">清结算</text><text x="80" y="111">对账</text><text x="48" y="120">日志</text><text x="3" y="116">短信</text></g></svg></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="ph"><div class="tb">全部 › <b>支付链路</b></div><div class="ls"><div class="gp"><div class="gh"><b>支付</b><span class="er">异常 2</span><span>正常 5</span></div><div class="nd er on"><i></i>支付网关<em>超时</em></div><div class="nd er sub"><i></i>银行通道<em>无响应</em></div><div class="nd"><i></i>收银台<em>正常</em></div></div><div class="gp"><div class="gh"><b>订单</b><span>正常 9</span></div></div><div class="gp"><div class="gh"><b>库存</b><span>正常 6</span></div></div></div><div class="scr"></div><div class="sh"><div class="st">支付网关<span>×</span></div><dl><dt>状态</dt><dd class="er">超时 32%</dd><dt>负责人</dt><dd>周岚 <span class="lk">拨打</span></dd><dt>上游</dt><dd>收银台</dd><dt>下游</dt><dd>银行通道</dd></dl></div></div></div></div></section>
</div>
