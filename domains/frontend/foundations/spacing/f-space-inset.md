---
zh: 组件内边距
en: Component padding
order: 30
---

## 是什么

按钮左右 16、输入框 12、徽标 2/6、卡片 24；内边距只缩进一次。

## 适合

定义组件尺寸令牌；自己写组件时对照取值。

## 不适合

不要卡片里再套带内边距的容器让内容缩进两次；不要靠 padding-top 微调文字垂直居中。

## 要点

- 按钮左右 16px（小号 12、大号 20），图标与文字 6–8px，按钮之间 8px
- 输入框、选择框左右 12px（紧凑 8），控件内图标离边框 8–12px，文字一侧让出图标宽度
- 徽标上下 2、左右 6；标签上下 2–4、左右 8；Tooltip 6 / 8；Toast 12 / 16
- 卡片、面板 20–24px，紧凑或窄屏 16；卡片头和卡片体左右内边距相同
- 弹窗头部 20 / 24，正文左右 24，底部 16 / 24 / 20
- 文字垂直居中用 inline-flex + align-items: center + 固定高度，不靠 padding-top 微调
- 内边距不叠加：贴边的图片、表格用负边距或满宽区域，内层容器的内边距小于外层

## 提示词

统一{组件库}的内边距：按钮高 32、左右 16（小号 12，大号 20），图标与文字 8；输入框左右 12，内部图标离边 12，文字一侧留出图标位；徽标 2 / 6，标签 4 / 8；卡片与面板 24，窄屏 16；弹窗头 20 / 24、正文左右 24；文字用 inline-flex 垂直居中，不靠 padding 微调；内边距只缩进一次，贴边图片用负边距；文字放大时容器用 min-height 增高，不裁切。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:20px;padding:16px;background:#fff;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.p{--f:#fff;background:linear-gradient(var(--f),var(--f)) content-box,repeating-linear-gradient(45deg,#c5d0fa 0 3px,#eef2ff 3px 7px)}
.cd{position:relative;padding:24px;border-radius:12px;box-shadow:inset 0 0 0 1px #c5d0fa}
.cd small{position:absolute;top:4px;left:8px}
.in{display:grid;gap:4px;width:96px}
.in span{color:#5b616e;font-size:12px}
small{font-size:12px;color:#5b616e;white-space:nowrap}
.col{display:grid;gap:12px}
.it{display:flex;align-items:center;gap:12px}
.btn{--f:#3b5bdb;height:32px;padding:0 16px;display:inline-flex;align-items:center;border-radius:6px;color:#fff;font-weight:600}
.ip{height:32px;width:100px;padding:0 12px;display:inline-flex;align-items:center;border-radius:6px;box-shadow:inset 0 0 0 1px #868c98;color:#5b616e;white-space:nowrap}
.bd{--f:#fef1f0;padding:2px 6px;border-radius:4px;color:#b42318;font-size:12px;line-height:16px;font-weight:600}
.s{container-type:inline-size}
@container (max-width:420px){.s{gap:12px;padding:12px}
.in{width:64px}
.ip{width:76px}
.it{gap:8px}
}
</style>

<div class="s"><div class="cd p"><small>卡片 24</small><div class="in"><b>卡片标题</b><span>内容区</span></div></div><div class="col"><div class="it"><span class="btn p">保存</span><small>按钮 16</small></div><div class="it"><span class="ip p">搜索订单</span><small>输入框 12</small></div><div class="it"><span class="bd p">新</span><small>徽标 2 / 6</small></div></div></div>
