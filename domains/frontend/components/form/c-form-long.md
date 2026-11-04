---
zh: 复杂长表单
en: Long form
order: 20
---

## 是什么

字段按主题分成带标题的卡片，侧边锚点目录跟随滚动，底部吸底操作栏。

## 适合

16–30 个字段、内容超过两屏的新建或编辑页：商品发布、合同录入、复杂配置。

## 不适合

不要把长表单塞进弹窗；有先后依赖或超过 30 个字段改分步向导；不到 15 个字段用单列加组标题即可，不套卡片。

## 要点

- 用组件库的表单，一个 el-form / n-form / a-form 包住全部卡片，字段仍用 el-form-item prop、n-form-item path、a-form-item name 挂在同一个 model 上；不要按卡片拆成多个表单，否则提交时没法一次校验
- 每张卡片一个主题，用 el-card / n-card / a-card 带标题和一句说明，卡内单列；卡片间距 24px、内边距 24px（窄屏 16px）；一组超过约 7 个字段就拆
- 5 组及以上加吸顶锚点目录（Element Plus el-anchor + el-anchor-link、Naive UI n-anchor + n-anchor-link、Ant Design Vue a-anchor + a-anchor-link），宽 160–200px，滚动高亮由组件处理；有错误或必填未填的组在目录项上标出
- 超过一屏用吸底操作栏：高 56–64px，背景通栏，内容与表单列同宽同左边缘；主按钮在最左，状态文字（“已保存草稿 · 14:32”）紧跟其后
- 低频项收进末尾“高级设置”，用折叠面板（el-collapse / n-collapse / a-collapse）默认收起；里面的字段要保持挂载才会参与校验（Naive UI display-directive="show"，Ant Design Vue forceRender）；有改动或错误时折叠标题显示数量，提交出错时把它加进展开列表自动展开
- 提交按钮不禁用：点击后调表单的 validate()，失败时滚动并聚焦第一个错误（Element Plus scroll-to-error、Ant Design Vue scrollToFirstError；Naive UI 在 validate 的回调里拿到 errors 自己滚）；3 个以上错误时顶部给可点击的错误汇总，目录对应项标红
- 自动保存草稿，离开前提示未保存的修改；组标题设 scroll-margin-top，免得被吸顶栏挡住
- 窄屏目录收成顶部横向滚动条，表单单列

## 提示词

把{商品发布页}做成复杂长表单：用项目组件库自带的表单，一个表单包住全部卡片（Element Plus el-form + el-form-item prop；Naive UI n-form + n-form-item path；Ant Design Vue a-form + a-form-item name），不按卡片拆成多个表单。字段按“基本信息 / 价格库存 / 图文详情 / 物流 / 售后”分成 5 张带标题的卡片，卡内单列，卡片间距 24px、内边距 24px；左侧 180px 吸顶锚点目录（el-anchor / n-anchor / a-anchor），滚动时高亮当前组并标出有错误的组；底部 56px 吸底操作栏，内容与表单列左对齐，“发布商品”主按钮在最左，旁边显示“已保存草稿 · 14:32”；提交时调 validate()，滚动并聚焦第一个错误（scroll-to-error / scrollToFirstError），3 个以上错误时顶部给可点击汇总；末尾“高级设置”用折叠面板默认收起，字段保持挂载，出错自动展开；自动保存草稿；窄屏目录改为顶部横向标签。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.lf{align-items:stretch;gap:12px;padding:12px}
.toc{flex:none;width:92px;display:flex;flex-direction:column}
.toc a{display:flex;align-items:center;justify-content:space-between;height:28px;padding:0 8px;border-left:2px solid #e3e6eb;color:#5b616e;font-size:13px;text-decoration:none;white-space:nowrap}
.toc a:hover{color:#1f2329}
.toc a.on{border-color:#3b5bdb;background:#edf1ff;color:#3b5bdb;font-weight:500}
.dot{width:6px;height:6px;border-radius:50%;background:#d92d20}
.main{flex:1;min-width:0;display:flex;flex-direction:column;background:#fff;border:1px solid #e3e6eb;border-radius:8px;overflow:hidden}
.sc{position:relative;flex:1;min-height:0;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:12px;background:#f5f6f8}
section{display:flex;flex-direction:column;gap:8px;padding:12px;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
h4{margin:0;font-size:14px;line-height:22px;font-weight:600}
h4:focus{outline:none}
.fl{display:grid;grid-template-columns:64px minmax(0,1fr);align-items:center;gap:8px;font-size:13px}
.fl span{color:#5b616e}
.fl .inp{height:28px;padding:0 8px}
section .help{margin:-4px 0 0 72px}
.bar{display:flex;align-items:center;gap:8px;height:48px;padding:0 12px;border-top:1px solid #e3e6eb}
.bar .btn{height:30px;padding:0 12px}
@container (max-width:440px){.xs{display:none}
}
@container (max-width:320px){.toc{display:none}
}
</style>

<div class="s lf"><nav class="toc" aria-label="表单分组"><a href="#g1" class="on">基本信息</a><a href="#g2">价格库存<i class="dot" title="有 1 个错误"></i></a><a href="#g3">图文详情</a><a href="#g4">物流</a><a href="#g5">售后</a></nav><div class="main"><div class="sc"><section id="g1"><h4 tabindex="-1">基本信息</h4><label class="fl"><span>商品名称</span><input class="inp" value="轻量羽绒服"></label><label class="fl"><span>类目</span><input class="inp" value="服装 / 外套"></label></section><section id="g2"><h4 tabindex="-1">价格库存</h4><label class="fl"><span>售价</span><input class="inp err" id="price" placeholder="例如 399" aria-invalid="true" aria-describedby="pe"></label><p class="help bad" id="pe">请填写售价</p><label class="fl"><span>库存</span><input class="inp" value="120"></label></section><section id="g3"><h4 tabindex="-1">图文详情</h4><label class="fl"><span>主图</span><input class="inp" value="已上传 3 张"></label></section><section id="g4"><h4 tabindex="-1">物流</h4><label class="fl"><span>运费模板</span><input class="inp" value="全国包邮"></label></section><section id="g5"><h4 tabindex="-1">售后</h4><label class="fl"><span>退货</span><input class="inp" value="7 天无理由"></label></section></div><div class="bar"><button class="btn pri go" type="button">发布商品</button><button class="btn" type="button">存草稿</button><span class="help xs">已保存草稿 · 14:32</span></div></div></div>

<script type="module">
export default function demo(root) {
  const sc = root.querySelector('.sc'), links = [...root.querySelectorAll('.toc a')], secs = [...root.querySelectorAll('section')];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const spy = () => { let k = 0; secs.forEach((s, i) => { if (s.offsetTop - sc.scrollTop <= 24) k = i; }); if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2) k = secs.length - 1; links.forEach((a, i) => a.classList.toggle('on', i === k)); };
  const jump = (s, el) => { sc.scrollTo({ top: s.offsetTop - 12, behavior: still ? 'auto' : 'smooth' }); (el || s.querySelector('h4')).focus({ preventScroll: true }); };
  sc.addEventListener('scroll', spy);
  links.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); jump(secs[i]); }));
  root.querySelector('.go').addEventListener('click', () => jump(secs[1], root.querySelector('#price')));
  root.querySelector('#price').addEventListener('input', (e) => { const ok = !!e.target.value.trim(); e.target.classList.toggle('err', !ok); e.target.setAttribute('aria-invalid', String(!ok)); root.querySelector('#pe').hidden = ok; root.querySelector('.dot').hidden = ok; });
}
</script>
