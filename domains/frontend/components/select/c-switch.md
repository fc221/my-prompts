---
zh: 开关
en: Switch
aka: 弹性开关 切换开关 toggle
order: 40
---

## 是什么

胶囊形滑块，切换即生效；左边写清它控制什么。

## 适合

即时生效的二元设置：通知开关、启用某个功能、显示或隐藏某块内容。

## 不适合

需要点“保存”才生效的选项用复选框；两个选项不是开 / 关关系（按月 / 按年）用单选或分段控件；影响大的操作（停用全部服务）切换前要确认。

## 要点

- 用组件库的开关：Element Plus el-switch（loading、before-change、active-text / inactive-text、inline-prompt、active-value / inactive-value、size），Naive UI n-switch（loading、checked-value / unchecked-value、rubber-band、size、checked / unchecked 插槽），Ant Design Vue a-switch（loading、checkedChildren / unCheckedChildren、checkedValue / unCheckedValue、size）；尺寸、颜色、滑动动画、role="switch" 和 aria-checked 由组件负责
- 设置列表里做成一行：标签和说明在左、开关在右，行高一致，行间用分割线
- 切换即保存：请求中开 loading；失败回滚并就地写原因；成功不弹提示，状态本身就是反馈。Element Plus 用 before-change 返回 Promise，失败就不切换；另两家在更新回调里先改值、开 loading，失败再改回来
- 标签写被控制的东西（“邮件通知”），用表单项的 label 或列表行的标题；active-text、checkedChildren 这类只写“开 / 关”之类的状态词，不拿它代替标签
- 绑定值不是布尔时用 active-value / checked-value / checkedValue 对上后端的 1 / 0 或 "on" / "off"
- 禁用时说明原因（“需要管理员开通”），写在说明文字里
- 按下时拉长、联动开关的轻推是可选项，不进默认要求：Naive UI 的 rubber-band 默认开着，不要就关掉；另两家没有

## 提示词

把{通知设置页}的各项做成开关列表：用项目组件库自带的开关（Element Plus el-switch；Naive UI n-switch；Ant Design Vue a-switch），不手写胶囊和圆钮。每行左侧是标签和一行说明，右侧开关，行间分割线；切换即保存，请求中开 loading，失败自动回滚并在该行写明原因，成功不弹提示（Element Plus 用 before-change 返回 Promise）；无权限的项禁用并在说明里写原因；绑定值对上后端的 {true / false 或 1 / 0}；拉长、回弹等动效{要 / 不要}，默认不要（Naive UI 关掉 rubber-band）；窄屏说明文字换行，开关保持在右侧垂直居中。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{list-style:none;margin:0;padding:0 16px;width:100%;max-width:380px;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
li{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:48px;padding:4px 0}
li+li{border-top:1px solid #e3e6eb}
li div{display:flex;flex-direction:column;min-width:0}
b{font-weight:500;line-height:20px}
.r{display:flex;align-items:center;gap:8px;flex:none}
.sw{position:relative;width:36px;height:20px;padding:0;border:0;border-radius:999px;background:#8a909c;cursor:pointer;transition:background-color .16s}
.sw::after{content:"";position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:transform .22s cubic-bezier(.3,.7,.4,1)}
.sw[aria-checked=true]{background:#3b5bdb}
.sw[aria-checked=true]::after{transform:translateX(16px)}
/* 按下时圆钮朝要去的方向拉长，松手后随切换动画缩回 */
.sw:not([aria-disabled=true]):active::after{transform:scaleX(1.3);transform-origin:left}
.sw[aria-checked=true]:not([aria-disabled=true]):active::after{transform:translateX(16px) scaleX(1.3);transform-origin:right}
.sw[aria-disabled=true]{background:#e3e6eb;cursor:not-allowed}
.sw[aria-disabled=true]::after{box-shadow:none}
.sp{width:14px;height:14px;border:2px solid #e3e6eb;border-top-color:#3b5bdb;border-radius:50%;animation:r .8s linear infinite}
@keyframes r{to{transform:rotate(1turn)}
}
@media (prefers-reduced-motion:reduce){.sw,.sw::after{transition:none}
.sw:active::after{transform:none}
.sw[aria-checked=true]:active::after{transform:translateX(16px)}
.sp{animation-duration:1.6s}
}
</style>

<div class="s"><ul class="w"><li><div><b id="l1">邮件通知</b><span class="help" data-t="有新工单时发邮件">有新工单时发邮件</span></div><span class="r"><span class="sp" hidden></span><button class="sw" type="button" role="switch" aria-checked="true" aria-labelledby="l1"></button></span></li><li><div><b id="l2">短信提醒</b><span class="help" data-t="紧急工单发短信（首次切换模拟失败）">紧急工单发短信（首次切换模拟失败）</span></div><span class="r"><span class="sp" hidden></span><button class="sw" type="button" role="switch" aria-checked="false" aria-labelledby="l2" data-fail></button></span></li><li><div><b id="l3">周报订阅</b><span class="help" id="d3">需要管理员开通</span></div><span class="r"><span class="sp" hidden></span><button class="sw" type="button" role="switch" aria-checked="false" aria-labelledby="l3" aria-describedby="d3" aria-disabled="true"></button></span></li></ul></div>

<script type="module">
export default function demo(root) {
  let failOnce = true;
  root.querySelectorAll('.sw').forEach((s) => s.addEventListener('click', () => {
    if (s.getAttribute('aria-disabled') === 'true' || s.dataset.busy) return;
    const on = s.getAttribute('aria-checked') !== 'true', sp = s.previousElementSibling, st = s.closest('li').querySelector('.help');
    s.setAttribute('aria-checked', String(on)); s.dataset.busy = '1'; sp.hidden = false;
    setTimeout(() => {
      sp.hidden = true; delete s.dataset.busy;
      if (s.hasAttribute('data-fail') && failOnce) { failOnce = false; s.setAttribute('aria-checked', String(!on)); st.textContent = '网络异常，未保存，请重试'; st.classList.add('bad'); }
      else { st.textContent = st.dataset.t.replace('（首次切换模拟失败）', ''); st.classList.remove('bad'); }
    }, 700);
  }));
}
</script>
