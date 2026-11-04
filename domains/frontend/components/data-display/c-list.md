---
zh: 列表
en: List
order: 30
---

## 是什么

一条一行纵向排列：左侧头像或图标，中间主次两行文字，右侧时间或状态。

## 适合

逐条浏览、属性少的对象：消息、通知、成员、文件、动态。

## 不适合

要横向比较多个属性用表格；以图片为主用卡片；有层级关系用树。

## 要点

- 用组件库的列表：Naive UI n-list + n-list-item（hoverable、clickable、show-divider，子项 prefix / suffix 插槽，内容用 n-thing 的 title、description、avatar / header-extra / action 插槽）、Ant Design Vue a-list + a-list-item + a-list-item-meta（dataSource、renderItem 插槽、itemLayout、split、loading、pagination、loadMore 插槽，子项 actions / extra 插槽，meta 的 title、description、avatar）；Element Plus 没有现成的列表，用 ul / li 自己排，空态用 el-empty、加载用 el-skeleton
- 结构固定：前置（头像 32–40px 或图标 20px）→ 主文字 14–16px + 次要文字 12–14px 次要色 → 尾部（时间、状态、操作）；行内边距和分割线跟组件（show-divider / split），不另画
- 主文字单行省略，次要文字最多两行；尾部不换行，时间用等宽数字
- 整行可点时用一个链接或按钮包住主区域（Naive UI 开 clickable + hoverable），行内另有操作放 action / actions 插槽，不嵌套可点元素
- 未读用左侧小圆点 + 加粗，并给读屏写“未读”，不只靠颜色
- 长列表用分页或“加载更多”（Ant Design Vue 的 pagination 属性或 loadMore 插槽，Naive UI 在 footer 插槽放按钮）：加载中、到底“没有更多了”、失败重试三态；空列表说明原因并给入口（el-empty / n-empty / a-empty）
- 可选择的列表把复选框放在 prefix 位置

## 提示词

把{消息中心}做成列表：用项目组件库自带的列表（Naive UI n-list hoverable clickable + n-list-item prefix / suffix 插槽 + n-thing title、description；Ant Design Vue a-list :dataSource + a-list-item + a-list-item-meta title、description、avatar；Element Plus 没有现成的，用 ul / li 排，空态 el-empty、加载 el-skeleton），不手写每行的布局。每项左侧 36px 头像，中间标题（14px、单行省略）和摘要（12px 次要色、最多两行），右侧时间（等宽数字、不换行）；未读项左侧小圆点并加粗标题，读屏读出“未读”；行间用组件的分割线，整行可点、悬停浅底、焦点可见，点开后标为已读；行尾“更多”菜单放操作插槽，不嵌套在可点区内；底部“加载更多”有加载中、到底、失败重试三态（Ant Design Vue 用 loadMore 插槽）；空列表用空状态组件说明；窄屏摘要缩为一行。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.ls{align-items:stretch;padding:12px}
.w{list-style:none;width:100%;max-width:440px;margin:0 auto;padding:0;overflow:auto;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
li+li{border-top:1px solid #e3e6eb}
.it{position:relative;display:flex;align-items:flex-start;gap:12px;width:100%;padding:12px 16px 12px 20px;border:0;background:none;text-align:left;cursor:pointer}
.it:hover{background:#f5f6f8}
.it:focus-visible{outline-offset:-2px}
.av{flex:none;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;color:#fff;font-size:14px}
.tx{flex:1;min-width:0;display:flex;flex-direction:column}
.tx b{font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tx small{font-size:12px;line-height:20px;color:#5b616e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
time{flex:none;font-size:12px;line-height:22px;color:#5b616e;font-variant-numeric:tabular-nums}
.un .it::before{content:"";position:absolute;left:8px;top:20px;width:6px;height:6px;border-radius:50%;background:#3b5bdb}
.un b{font-weight:600}
</style>

<div class="s ls"><ul class="w"><li class="un"><button type="button" class="it"><span class="av" style="background:#3b5bdb">王</span><span class="tx"><b><span class="sr">未读，</span>王小明 提交了退款申请</b><small>订单 SO-20931，金额 ¥1,299.00，原因：尺码不合适</small></span><time>14:32</time></button></li><li class="un"><button type="button" class="it"><span class="av" style="background:#0b7285">系</span><span class="tx"><b><span class="sr">未读，</span>报表导出完成</b><small>10 月销售明细.xlsx 已生成，7 天内可下载</small></span><time>13:05</time></button></li><li><button type="button" class="it"><span class="av" style="background:#b54708">李</span><span class="tx"><b>李雪 评论了你的方案</b><small>“首页的筛选区可以再收一收，常用的露出三个就够”</small></span><time>昨天</time></button></li><li><button type="button" class="it"><span class="av" style="background:#12805c">陈</span><span class="tx"><b>陈静 邀请你加入项目</b><small>官网改版 · 设计组</small></span><time>10-21</time></button></li></ul></div>

<script type="module">
export default function demo(root) {
  root.querySelector('.w').addEventListener('click', (e) => { const li = e.target.closest('li'); if (li && li.classList.contains('un')) { li.classList.remove('un'); li.querySelector('.sr').remove(); } });
}
</script>
