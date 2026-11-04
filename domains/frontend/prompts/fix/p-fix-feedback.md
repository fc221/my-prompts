---
zh: 补全操作反馈
en: Missing feedback
aka: 点了没反应
order: 220
---

## 是什么

症状：点按钮后不知道成功没有，提示一闪就没或被挡住，失败时什么也不说。

## 要点

- 列出页面上最重要的几个操作。
- 适合提交、保存、删除、复制等场景。

## 提示词

很多操作点了之后不知道有没有成功。请为每个操作补齐反馈：
1. 按下即时：所有按钮有按下态，点击后 100ms 内要有变化。
2. 进行中：按钮内显示转圈和“{动作}中…”，宽度不变并防重复点击；超过 1 秒的区域显示区域加载；超过 10 秒给进度，或告诉用户“可以离开，完成后通知你”。
3. 成功：和某一行、某个字段相关的结果原位显示（行高亮、“已保存 · 14:32”）；全局结果用轻提示，放在内容区顶部居中，约 3 秒消失；删除、归档用底部撤销条，至少保留 10 秒。
4. 失败：写清原因和怎么办，错误提示不自动消失；表单失败保留输入并定位到出错字段。
5. 位置：提示不放在左下、右下角，不被侧栏、抽屉、软键盘挡住；同一事件只用一种反馈。
6. 读屏：结果用 role="status" 播报，不抢焦点。
需要补反馈的操作：{操作列表}

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px}
.l{color:#5b616e;font-size:10px;line-height:14px}
.i{height:18px;margin:2px 0 6px;padding:0 6px;border:1px solid #c9ced6;border-radius:4px;font-size:9.5px;line-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.b{display:inline-flex;align-items:center;gap:4px;height:18px;padding:0 8px;border-radius:4px;background:#3b5bdb;color:#fff;font-size:9.5px;line-height:18px;white-space:nowrap}
/* 改前：点了按钮，什么都没变 */
.q{margin:6px 0 0;color:#5b616e;font-size:10px;line-height:14px}
/* 改后：按下 → 进行中 → 成功 / 失败，每步都看得见 */
.st{display:flex;align-items:center;gap:5px;font-size:9.5px;line-height:13px}
.st+.st{margin-top:4px}
.st small{flex:none;width:30px;color:#5b616e;font-size:9px}
.pr{background:#2a46b3}
.ld{background:#7a8fe6}
.rg{width:9px;height:9px;border:1.5px solid rgba(255,255,255,.45);border-top-color:#fff;border-radius:50%}
.okk{color:#1f7a4d}
.er{color:#b42318}
.er u{color:#3b5bdb;text-decoration:none}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c"><div class="l">收货地址</div><div class="i">西湖区文三路 28 号</div><span class="b">保存</span><p class="q">点了三下，页面一点变化都没有。保存上了吗？</p></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c"><div class="l">收货地址</div><div class="i">西湖区文三路 28 号</div><div class="st"><small>按下</small><span class="b pr">保存</span></div><div class="st"><small>进行中</small><span class="b ld"><i class="rg"></i>保存中…</span></div><div class="st"><small>成功</small><span class="okk">✓ 已保存 · 14:32</span></div><div class="st"><small>失败</small><span class="er">网络超时 · <u>重试</u></span></div></div></div></section>
</div>
