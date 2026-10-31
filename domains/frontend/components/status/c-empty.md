---
zh: 空状态
en: Empty state
order: 40
---

## 是什么

区域里没有内容时，用一个简洁图标、一句原因和下一步按钮代替一片空白。

## 适合

首次使用还没有数据、搜索或筛选没有结果、内容已经全部处理完。

## 不适合

不用大幅卡通插画堆砌；不要只写“暂无数据”；完全没有数据时不显示搜索和筛选。

## 要点

- 首次使用：说明这里会放什么 + “新建 / 导入”入口，隐藏搜索和筛选
- 无结果：显示当前关键词和筛选条件 + “清除筛选”，保留用户的输入
- 已清空：一句肯定的话（“都处理完了”），可以不放按钮
- 线性单色图标 40–64px，标题 15–16px，说明 13–14px 次要文字，最多两行
- 在区域内垂直居中，占位高度接近正常内容，避免页面跳动；主按钮只放一个，次要入口用文字链接

## 提示词

给{列表或区域}设计「空状态」，分三种：首次使用——说明这里会放什么 + “新建{对象}”主按钮和“导入”文字链接，隐藏搜索和筛选；无结果——显示当前关键词和筛选条件 + “清除筛选”，保留输入；已清空——一句肯定的话（如“都处理完了”），不放按钮。线性单色图标 48px，标题 16px，说明 13px 次要文字最多两行，在区域内垂直居中，占位高度接近正常内容；不用卡通插画，不只写“暂无数据”。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.box{width:100%;max-width:440px;height:100%;padding:8px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:flex;flex-direction:column}
.seg{align-self:flex-end}
.em{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-align:center}
.em svg{width:32px;height:32px;margin-bottom:4px;color:#8a909c}
.em b{font-size:15px}
.em p{font-size:13px;color:#5b616e}
.ac{display:flex;gap:8px;margin-top:6px}
</style>

<div class="s"><div class="box"><div class="seg" role="group" aria-label="切换示例状态"><button aria-pressed="true">首次使用</button><button aria-pressed="false">无结果</button><button aria-pressed="false">已清空</button></div><div class="em" role="status"></div></div></div>

<script type="module">
import { I } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const V = [
    [I.folder, '还没有项目', '项目用来归集文档和成员', '<button class="b p">新建项目</button><button class="b t">导入</button>'],
    [I.search, '没有找到“合同 2025”', '换个关键词，或清除筛选条件', '<button class="b">清除筛选</button>'],
    [I.ok, '待办都处理完了', '新的待办会出现在这里', ''],
  ];
  const em = root.querySelector('.em'), seg = [...root.querySelectorAll('.seg button')];
  const show = (k) => { seg.forEach((b, j) => b.setAttribute('aria-pressed', String(j === k))); const v = V[k]; em.innerHTML = v[0] + '<b>' + v[1] + '</b><p>' + v[2] + '</p>' + (v[3] ? '<div class="ac">' + v[3] + '</div>' : ''); };
  seg.forEach((b, k) => b.addEventListener('click', () => show(k)));
  show(0);
}
</script>
