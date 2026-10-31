---
zh: 头像与头像组
en: Avatar & avatar group
order: 80
---

## 是什么

人员圆形、组织圆角方形；没有图片时显示首字；多人叠排并显示“+N”。

## 适合

评论、成员列表、负责人列、协作者展示。

## 不适合

不要只用头像代表一个人（列表里头像旁写名字）；没有信息量的装饰头像不放。

## 要点

- 用组件库的头像和头像组：Element Plus el-avatar（size、shape、src、error 事件，默认插槽放首字）+ el-avatar-group（size、shape、collapse-avatars、max-collapse-avatars、collapse-avatars-tooltip，2.13 起）、Naive UI n-avatar（size、round、src、fallback-src、color、render-fallback）+ n-avatar-group（options、max、max-style、size，rest 插槽写“+N”）、Ant Design Vue a-avatar（size、shape、src、gap、loadError）+ a-avatar-group（maxCount、maxStyle、maxPopoverTrigger、size、shape）；不手写圆形 img 和负边距
- 尺寸档 24 / 32 / 40（资料页 64），size 直接传数字；人员圆形（默认），组织和应用方形（Element Plus / Ant Design Vue shape="square"，Naive UI 不开 round）
- 图片加载失败回退为姓名首字或默认图标：Element Plus 在 error 事件里切到默认插槽的首字，Naive UI fallback-src 或 render-fallback，Ant Design Vue 默认回退到插槽内容（loadError 返回 false 才关掉）；底色从固定的 6–8 色里按名字取（Naive UI color，其余 style），同一个人始终同色
- 首字白色，与底色对比度 ≥ 4.5:1；首字大小跟组件按尺寸缩放（Ant Design Vue 的 gap 调留白），不自己算
- 头像组叠放和描边由组件处理；最多显示 3–5 个，其余收成“+N”（max-collapse-avatars / max / maxCount），点开或悬停看完整名单（collapse-avatars-tooltip、Ant Design Vue 默认气泡、Naive UI 在 rest 插槽自己加气泡）
- 头像组整体有可访问名称（“协作者：王小明等 7 人”）；列表里头像旁写名字，不只用头像代表一个人
- 在线状态点放右下角：用徽标组件包住头像（el-badge is-dot / n-badge dot / a-badge dot），并有文字等效

## 提示词

给{项目卡片的协作者}做头像组：用项目组件库自带的头像和头像组（Element Plus el-avatar :size="32" + el-avatar-group collapse-avatars :max-collapse-avatars="4" collapse-avatars-tooltip；Naive UI n-avatar-group :options :max="4" :size="32"，rest 插槽写“+N”；Ant Design Vue a-avatar-group :maxCount="4" :size="32"），不手写圆形 img 和负边距。图片加载失败回退为姓名首字（默认插槽 / render-fallback），底色从固定 6 色中按名字取，首字白色且对比度达标；最多显示 4 个，其余显示“+N”，点开或悬停看完整名单；整组可访问名称写“协作者：{姓名} 等 N 人”；在线成员用徽标组件的 dot 包住头像放右下角绿点并有文字说明；组织头像改方形（shape="square"）。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{display:flex;flex-direction:column;gap:20px}
.row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.rel{position:relative}
.av{position:relative;flex:none;display:inline-grid;place-items:center;border-radius:50%;background:var(--c,#5b616e);color:#fff;font-weight:500}
.s24{width:24px;height:24px;font-size:12px}
.s32{width:32px;height:32px;font-size:14px}
.s40{width:40px;height:40px;font-size:16px}
.org{border-radius:10px}
.on{position:absolute;right:-1px;bottom:-1px;width:10px;height:10px;border-radius:50%;background:#12805c;box-shadow:0 0 0 2px #f5f6f8}
.grp{display:inline-flex;padding:0;border:0;border-radius:999px;background:none;cursor:pointer}
.grp .av{box-shadow:0 0 0 2px #f5f6f8}
.grp .av+.av{margin-left:-8px}
.more{background:#e3e6eb;color:#1f2329;font-size:12px}
.pop{position:absolute;top:40px;left:0;z-index:2;display:grid;grid-template-columns:repeat(2,auto);gap:0 16px;margin:0;padding:8px 12px;list-style:none;background:#fff;border:1px solid #e3e6eb;border-radius:8px;box-shadow:0 6px 16px rgba(31,35,41,.12);font-size:13px;line-height:24px}
</style>

<div class="s"><div class="w"><div class="row"><span class="av s24" style="--c:#3b5bdb" aria-label="王小明" role="img">王</span><span class="av s32" style="--c:#12805c" aria-label="李雪" role="img">李</span><span class="av s40" style="--c:#6741d9" role="img" aria-label="陈静，在线">陈<i class="on"></i></span><span class="av s40 org" style="--c:#0b7285" role="img" aria-label="云帆科技（组织）">云</span><span class="help">24 / 32 / 40 · 组织用方形</span></div><div class="row rel"><button type="button" class="grp" aria-label="协作者：王小明等 7 人" aria-expanded="false"><span class="av s32" style="--c:#3b5bdb">王</span><span class="av s32" style="--c:#12805c">李</span><span class="av s32" style="--c:#b54708">张</span><span class="av s32" style="--c:#c2255c">赵</span><span class="av s32 more">+3</span></button><span class="help">点开看完整名单</span><ul class="pop" hidden><li>王小明</li><li>李雪</li><li>张伟</li><li>赵磊</li><li>陈静</li><li>刘洋</li><li>周敏</li></ul></div></div></div>

<script type="module">
export default function demo(root) {
  const g = root.querySelector('.grp'), pop = root.querySelector('.pop');
  const set = (o) => { pop.hidden = !o; g.setAttribute('aria-expanded', String(o)); };
  g.addEventListener('click', () => set(pop.hidden));
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pop.hidden) { set(false); g.focus(); } });
  g.addEventListener('blur', () => set(false));
}
</script>
