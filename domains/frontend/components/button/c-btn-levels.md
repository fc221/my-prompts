---
zh: 按钮层级
en: Button hierarchy
order: 10
---

## 是什么

主、次、文字、危险四级按钮，按动作的重要程度分配视觉重量。

## 适合

任何需要用户触发动作的地方；同一区域有多个动作时，用层级分出主次。

## 不适合

跳转到别的页面用链接而不是按钮；一个区域放两个主按钮会让人不知道点哪个，次要的降为次按钮或文字按钮。

## 要点

- 用组件库的按钮：Element Plus el-button（type、plain、text、link、loading、disabled、size、native-type）、Naive UI n-button（type、secondary、tertiary、quaternary、text、loading、disabled、size、attr-type）、Ant Design Vue a-button（type、danger、ghost、loading、disabled、size、htmlType）
- 四级对应：主按钮 type="primary"；次按钮 Element Plus 默认样式、Naive UI 默认或 secondary、Ant Design Vue type="default"；文字按钮 el-button text / n-button text 或 quaternary / a-button type="text"；危险 el-button type="danger" / n-button type="error" / a-button danger
- 一个区域只放一个主按钮，写具体动作“保存修改”“创建项目”，不写“确定”“提交”
- 尺寸用组件的档位（default / medium / middle，触屏 large），不手改高度；按钮之间 8px，由父容器的 gap 控制
- 加载用 loading 属性，同时把文案改成“保存中…”，宽度预留好不跳动；提交中再次点击直接忽略，不重复提交
- 危险实心按钮只出现在确认对话框里；列表里的“删除”入口用中性文字按钮，进入确认后才变红
- 禁用要说明原因：组件的 disabled 不能聚焦、不出提示，在旁边写清怎样才能启用
- 表单里的提交按钮设 native-type / attr-type / htmlType="submit"，其他按钮保持 button，不然回车会误触发
- 六态（默认、悬停、按下、聚焦环、禁用、加载）组件自带，不重写

## 提示词

给{项目设置页底部}设计按钮层级：用项目组件库自带的按钮（Element Plus el-button；Naive UI n-button；Ant Design Vue a-button），不手写样式。主按钮“{保存修改}”type="primary"，一个区域只放一个；次按钮“取消”用默认样式；行内弱操作用文字按钮（text / quaternary / type="text"）；危险红色实心只用在确认对话框里，列表里的“删除”入口用中性文字；尺寸用组件的默认档（触屏用 large），按钮间距 8px；加载用 loading 属性并把文案改为“保存中…”，宽度不变，提交中再次点击直接忽略；禁用要在旁边写明原因；表单的提交按钮设 native-type / attr-type / htmlType="submit"，其他按钮保持 button；窄屏放不下时整组换行，主按钮仍最显眼。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{display:flex;flex-direction:column;align-items:center;gap:12px}
.g{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 8px}
.g>div{display:flex;flex-direction:column;align-items:center;gap:4px}
.g span{font-size:12px;line-height:20px;color:#5b616e}
#save{min-width:112px}
.dng{background:#d92d20;border-color:#d92d20;color:#fff}
.dng:hover{background:#b42318;border-color:#b42318}
.btn:active{transform:translateY(1px)}
.off,.off:hover{background:#e3e6eb;border-color:#e3e6eb;color:#8a909c;cursor:not-allowed;transform:none}
.dis{display:flex;align-items:center;gap:8px}
.busy{cursor:progress}
@container (max-width:320px){.g .btn{padding:0 12px}
#save{min-width:100px}
}
@container (max-width:280px){.g{gap:12px 4px}
.g .btn{padding:0 10px}
#save{min-width:88px}
}
.spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.45);border-top-color:#fff;border-radius:50%;animation:r .8s linear infinite}
@keyframes r{to{transform:rotate(1turn)}
}
@media (prefers-reduced-motion:reduce){.spin{animation-duration:1.6s}
}
</style>

<div class="s"><div class="w"><div class="g"><div><button class="btn pri" id="save" type="button">保存修改</button><span>主按钮</span></div><div><button class="btn" type="button">取消</button><span>次按钮</span></div><div><button class="btn txt" type="button">预览</button><span>文字按钮</span></div><div><button class="btn dng" type="button">删除</button><span>危险按钮</span></div></div><div class="dis"><button class="btn pri off" type="button" aria-disabled="true" aria-describedby="why">发布</button><span class="help" id="why">填写标题后才能发布</span></div><p class="help st" role="status">点“保存修改”看加载态</p></div></div>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('#save'), st = root.querySelector('.st');
  b.addEventListener('click', () => {
    if (b.getAttribute('aria-disabled') === 'true') return;
    b.setAttribute('aria-disabled', 'true'); b.classList.add('busy');
    b.innerHTML = '<span class="spin" aria-hidden="true"></span>保存中…'; st.textContent = '保存中…';
    setTimeout(() => { b.removeAttribute('aria-disabled'); b.classList.remove('busy'); b.textContent = '保存修改'; st.textContent = '已保存 · 刚刚'; }, 1400);
  });
}
</script>
