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

- 一个区域只放一个主按钮（品牌色实心），写具体动作“保存修改”“创建项目”，不写“确定”“提交”
- 次按钮白底 + 1px 控件边框；文字按钮透明底、主色文字，用于表格行内和弱操作
- 高 32px（紧凑 24–28px、宽松 40px、触屏 44px），左右内边距 16px（小号 12px），按钮之间 8px
- 六态齐全：默认、悬停、按下、聚焦环、禁用、加载；悬停和按下比常态更深，不能变浅
- 加载时转圈替换图标、文案改为“保存中…”，宽度预留好不跳动，用 aria-disabled 防重复点击
- 危险实心按钮只出现在确认对话框里；列表里的“删除”入口用中性文字，进入确认后才变红
- 禁用要说明原因：用 aria-disabled 保持可聚焦，在旁边写清怎样才能启用
- 文字用 inline-flex 垂直居中，不靠 padding-top 微调；图标与文字间距 6–8px

## 提示词

给{项目设置页底部}设计按钮层级：主按钮“{保存修改}”品牌色实心，次按钮“取消”白底灰边，行内弱操作用文字按钮，危险红色实心只用在确认框里。高 32px（触屏 44px），左右内边距 16px，间距 8px；默认、悬停、按下、聚焦环、禁用、加载六态齐全，加载时显示转圈和“保存中…”且宽度不变；禁用用 aria-disabled 保持可聚焦并写明原因；窄屏放不下时整组换行，主按钮仍最显眼。

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
