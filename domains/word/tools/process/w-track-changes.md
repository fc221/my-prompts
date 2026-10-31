---
zh: 修订与批注
en: Track changes and comments
aka: 修订模式 审阅 批注 接受修订 拒绝修订 比较文档 合并文档 锁定修订 文档检查器 删除个人信息 红线稿
order: 20
---

## 是什么

审阅 → 修订打开后，所有增删改都留下痕迹（谁、什么时候、改了什么），批注写在页边，对方逐条接受或拒绝；两个版本没开修订时，用“比较”生成一份红线稿。合同、制度、论文来回改稿都靠它对齐。

## 适合

合同和协议谈判、制度和方案多人会签、导师批改论文、对外稿件审校。

## 不适合

多人同时在线编辑的草稿用在线协作文档更顺手；自己一个人改稿不必开修订；合同本身的版式看「合同排版」。

## 注意

对外发送前最容易漏的是“看着干净、其实还带修订”：审阅视图选“无标记”时修订只是被隐藏，对方一切到“所有标记”就全看见了。定稿要真正“接受所有修订并停止修订”、删除全部批注，再用文档检查器清掉残留和个人信息。

## 要点

- 先设名字：文件 → 选项 → 常规 → 用户名和缩写，改成“法务部 王律”这类对方认得的名字，修订和批注都用它署名；同时勾选“不管是否登录到 Office 都始终使用这些值”。
- 开关：审阅 → 修订（Ctrl+Shift+E）；不想让对方悄悄关掉，就用“锁定修订”设密码，或在 限制编辑 里选“仅允许修订”。
- 显示：日常看“简单标记”，逐条核对切到“所有标记”；显示标记 → 批注框 里选“在批注框中显示修订”，删除的内容挪到页边，正文更好读。
- 批注：选中文字 → 新建批注（Ctrl+Alt+M），一条批注只说一件事，写清建议怎么改；讨论用“答复”接在下面，处理完点“解决”，别人的批注不直接删。
- 处理修订：审阅 → 下一处，逐条“接受”或“拒绝”；格式修订太多时，在 显示标记 里取消勾选“格式”，只看文字改动。
- 比较与合并：审阅 → 比较 → 比较两个版本，原文档选旧版、修订的文档选新版，生成第三份带修订的文档；几个人各改了一份时用“合并”，把修订汇到一起。
- 定稿：审阅 → 接受 →“接受所有修订并停止修订”，删除 →“删除文档中的所有批注”；再到 文件 → 信息 → 检查问题 → 检查文档，清除批注、修订、版本和个人信息。
- 用代码处理：python-docx 1.2 起能读写批注（Document.add_comment）；修订在 XML 里是 w:ins 和 w:del 节点，库里没有现成接口，批量接受可以用 Word 自动化的 Revisions.AcceptAll，或者自己展开 w:ins、删掉 w:del。

## 提示词

帮我处理 {文档名称} 的修订和批注，这是 {场景，如 和供应商来回改的采购合同第 3 稿}。
1. 先汇总：列出全部修订（修订人、哪一条、原文和新文）和全部批注（批注人、针对哪句话、内容、是否已解决），按条款顺序排列。
2. 把修订分成三类：措辞调整、涉及金额日期期限等实质条款、格式调整；实质条款的修订单独列出来，等我决定。
3. 按我的规则处理：{处理规则，如 格式修订全部接受；“付款期限”“违约金”相关修订先保留}；其余批注逐条起草回复，写明同意或不同意及理由。
4. 定稿版：接受已确认的修订，删除已解决的批注，用文档检查器清除个人信息，另存为“{文件名}_定稿.docx”，原稿保留不动。
5. 如果只有修改前后两个版本、没开修订，先用“比较”生成红线稿再按上面处理；最后列出还没定下来的修订。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-all{display:grid;gap:10px;width:600px}
.m-rb{display:flex;align-items:center;gap:6px;padding:5px 8px;border:1px solid #c9ced6;border-radius:6px;background:#fff;font:10.5px/1.3 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-rb span{padding:3px 8px;border:1px solid #e4e7ec;border-radius:4px;white-space:nowrap}
.m-rb span.on{border-color:#2b579a;background:#e8f0fc;color:#1d3f75;font-weight:650}
.m-rb i{width:1px;height:16px;background:#e4e7ec}
.m-rb em{margin-left:auto;color:#667085;font-style:normal}
.m-doc{display:grid;grid-template-columns:minmax(0,1fr) 196px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25)}
.m-pg{padding:16px 22px 16px 30px;color:#111;font-family:"Songti SC","SimSun",serif}
.m-desk .m-h{margin:0 0 4px;font:700 12px/1.6 "PingFang SC","SimHei",sans-serif}
.m-desk .m-p{position:relative;margin:0 0 6px;font-size:11px;line-height:1.85}
.m-p.ch::before{content:"";position:absolute;left:-14px;top:3px;bottom:3px;border-left:1.5px solid #344054}
.m-del{color:#c2410c;text-decoration:line-through}
.m-ins{color:#c2410c;text-decoration:underline;text-underline-offset:2px}
.m-ins.b{color:#1d4ed8}
.m-an{position:relative;padding:3px 0;background:#eaf1fb;border-bottom:1.5px dashed #5b8def}
.m-mg{display:grid;align-content:start;gap:8px;padding:16px 10px 12px;border-left:1px solid #eaecf0;background:#f8f9fb;font:10px/1.4 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-c{position:relative;padding:6px 8px;border:1px solid #c9d6ea;border-radius:5px;background:#fff}
.m-c b{display:flex;justify-content:space-between;margin-bottom:2px;color:#101828;font-size:10px}
.m-c b em{color:#98a2b3;font-weight:400;font-style:normal}
.m-c.r{margin-left:12px;border-color:#e4e7ec}
.m-c.d{border-color:#f4c9a8;background:#fff8f2}
.m-c.d b{color:#c2410c}
.m-c.ok{opacity:.75}
.m-c.ok b::after{content:"已解决";color:#067647;font-weight:600}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const rb = '<div class="m-rb"><span class="on">修订 · 开</span><span>所有标记 ▾</span><i></i><span>新建批注</span><span>上一处</span><span>下一处</span><span>接受 ▾</span><span>拒绝 ▾</span><i></i><span>比较 ▾</span><em>用户名：采购部 林</em></div>';
  const page = '<div class="m-pg"><p class="m-h">第五条　付款方式</p>'
    + '<p class="m-p ch">5.1　甲方在货物验收合格后 <span class="m-del">7 个工作日</span><span class="m-ins">30 日</span>内，凭乙方开具的增值税专用发票支付货款。</p>'
    + '<p class="m-p ch">5.2　乙方逾期交货的，每逾期一日按合同总价的 <span class="m-del">0.5%</span><span class="m-ins">0.3%</span> 支付违约金<span class="m-ins b">，累计不超过合同总价的 10%</span>。</p>'
    + '<p class="m-p">5.3　甲方付款前，乙方应提供 <span class="m-an">与发票金额一致的送货单</span> 原件。</p>'
    + '<p class="m-h">第六条　质量保证</p><p class="m-p">6.1　质保期自验收合格之日起计算，为期 12 个月。</p></div>';
  const mg = '<div class="m-mg">'
    + '<div class="m-c d"><b>采购部 林<em>10-14 15:02</em></b>删除了：7 个工作日</div>'
    + '<div class="m-c"><b>法务部 王律<em>10-15 09:20</em></b>违约金上限建议写明，避免无限累计。</div>'
    + '<div class="m-c r"><b>采购部 林<em>答复</em></b>同意，已加“累计不超过 10%”。</div>'
    + '<div class="m-c ok"><b>乙方 周经理 </b>送货单是否可用电子版？</div></div>';
  draw(root, '<div class="m-all">' + rb + '<div class="m-doc">' + page + mg + '</div></div>', { center: true, min: 0.4 });
}
</script>
