---
zh: 信息密度
en: Density
order: 30
---

## 是什么

紧凑、常规、宽松三档：控件 28/32/40，表格行 36/48/56。

## 适合

后台表格用常规，数据密集的运维工具用紧凑，C 端与官网表单用宽松。

## 不适合

不要同一页面混用多档密度；触屏界面不用紧凑档。

## 要点

- 紧凑：正文 12–14px、控件 24–28px、表单项间距 16px、表格行 36–40px
- 常规（后台默认）：正文 14px、控件 32px、表单项间距 24px、表格行 48–56px
- 宽松：正文 16px、控件 40px（触屏 44–48px）、表单项间距 24px
- 密度是起点不是死高度：多行文字、放大字号、多语言时容器用 min-height 跟着长
- 一页只用一档；需要切换时提供全局密度设置并记住选择
- 视觉图标尺寸和可点击区域分开定义，紧凑档也保证点击区域 ≥ 24px

## 提示词

给{后台}加密度设置：紧凑（正文 13px、控件 28px、表格行 36px）、常规（14px、32px、48px，默认）、宽松（16px、40px、56px）；通过根元素 data-density 切换一组令牌，组件只引用令牌；设置入口放在{位置}并记住选择；触屏设备至少用宽松档，点击区域 ≥ 44px；行高用 min-height，内容换行时自动增高；切换后表格滚动位置和选中行保持不变。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 16px;background:#f5f6f8;color:#1f2329;font:12px/1.2 system-ui,"PingFang SC",sans-serif}
.d{flex:1;max-width:180px;display:flex;flex-direction:column;border-radius:10px;background:#fff;border:1px solid #e3e6eb;overflow:hidden}
em{font-style:normal;font-weight:600;padding:8px 12px 4px}
p{display:flex;align-items:center;justify-content:space-between;margin:0;height:var(--h);padding:0 12px;font-size:var(--f);border-top:1px solid #e3e6eb}
p b{font-weight:400;font-variant-numeric:tabular-nums;color:#5b616e}
small{padding:6px 12px 8px;color:#5b616e;font-size:12px;border-top:1px solid #e3e6eb;white-space:nowrap}
.c{--h:36px;--f:12px}
.m{--h:48px;--f:14px}
.w{--h:56px;--f:16px}
@container (max-width:300px){.s{gap:8px;padding:12px}
p,em,small{padding-left:8px;padding-right:8px}
small{white-space:normal}
}
</style>

<div class="s"><div class="d c"><em>紧凑</em><p>首页<b>86</b></p><p>订单<b>120</b></p><small>行&nbsp;36 · 字&nbsp;12</small></div><div class="d m"><em>常规</em><p>首页<b>86</b></p><p>订单<b>120</b></p><small>行&nbsp;48 · 字&nbsp;14</small></div><div class="d w"><em>宽松</em><p>首页<b>86</b></p><p>订单<b>120</b></p><small>行&nbsp;56 · 字&nbsp;16</small></div></div>
