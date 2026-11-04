---
zh: Shift 范围多选
en: Shift-click range select
order: 50
---

## 是什么

先勾选一行，再按住 Shift 勾选另一行，中间的所有行一起选中（或一起取消）。

## 适合

表格、文件列表、邮件列表、相册等需要一次选很多条的地方。

## 注意

范围的起点是“上一次单独点击的那一行”；跨页时只在当前页内生效，并说明清楚。

## 要点

- 记住上一次不按 Shift 点击的行作为起点；按住 Shift 点另一行时，起点到这一行之间的行都设成这一行的新状态（选中或取消）。
- Shift 范围选择后起点不变，可以继续调整范围的另一端。
- 键盘同样可用：焦点在复选框上时按 Shift + 空格做范围选择。
- 选中数量实时显示“已选 N 项”；第一次使用时在列表上方给一句提示，之后不再打扰。
- Shift 点击会顺带选中文字时，在列表上用 user-select: none 或在 mousedown 时阻止默认行为。

## 提示词

给{列表或表格}加「Shift 范围多选」：记住上一次不按 Shift 点击的行作为起点，按住 Shift 点另一行时，起点到这一行之间都设成这一行的新状态（选中或取消），起点保持不变；焦点在复选框上时 Shift + 空格同样生效；实时显示“已选 N 项”；首次使用在列表上方提示一次“按住 Shift 可以一次选中一段”；避免 Shift 点击时误选中文字。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:12px 18px}
.box{max-width:480px;margin:0 auto}
.tip{margin:0 0 8px;color:#5b616e;font-size:12px}
.bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.n{font-weight:600}
.ls{list-style:none;margin:0;padding:0;border:1px solid #e3e6eb;border-radius:10px;background:#fff;overflow:hidden;user-select:none}
.ls li+li{border-top:1px solid #eef0f3}
.ls label{display:flex;align-items:center;gap:10px;height:34px;padding:0 12px;cursor:pointer}
.ls li.on{background:#edf1ff}
.ls input{width:15px;height:15px;accent-color:#3b5bdb}
.ls em{font-style:normal;margin-left:auto;color:#8a8f99;font-size:12px}
</style>

<div class="st"><div class="box"><p class="tip">按住 Shift 再点另一行，可以一次选中一段</p><div class="bar"><span class="n" role="status">未选择</span><button type="button" class="ctl clr">清除选择</button></div><ul class="ls"></ul></div></div>

<script type="module">
export default function demo(root) {
  const D = ['SO-20931 林知科技', 'SO-20930 陈一鸣', 'SO-20928 杭州云帆', 'SO-20925 周以宁', 'SO-20921 星河传媒', 'SO-20917 苏墨', 'SO-20912 南风咖啡', 'SO-20909 许然'];
  const ls = root.querySelector('.ls'), n = root.querySelector('.n'); let anchor = null;
  ls.innerHTML = D.map((d, i) => `<li><label><input type="checkbox" data-i="${i}">${d.split(' ')[1]}<em>${d.split(' ')[0]}</em></label></li>`).join('');
  const boxes = [...ls.querySelectorAll('input')];
  const sync = () => { boxes.forEach((b) => b.closest('li').classList.toggle('on', b.checked)); const c = boxes.filter((b) => b.checked).length; n.textContent = c ? `已选 ${c} 项` : '未选择'; };
  ls.addEventListener('click', (e) => { const b = e.target.closest('input'); if (!b) return; const i = +b.dataset.i; if (e.shiftKey && anchor !== null) { const [a, z] = [Math.min(anchor, i), Math.max(anchor, i)]; for (let k = a; k <= z; k++) boxes[k].checked = b.checked; } else anchor = i; sync(); });
  root.querySelector('.clr').addEventListener('click', () => { boxes.forEach((b) => { b.checked = false; }); anchor = null; sync(); });
}
</script>
