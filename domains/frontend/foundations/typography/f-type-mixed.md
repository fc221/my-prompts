---
zh: 中英混排
en: CJK & Latin mixing
order: 50
---

## 是什么

中文与英文、数字之间加空格，标题按词组断行，中文不用斜体。

## 适合

所有含英文、数字、品牌名的中文界面与文案。

## 不适合

不要用全角空格或多个空格硬凑；不要让标题末行只剩一两个字。

## 要点

- 中文与英文、数字之间加半角空格（“共 12 件”“用 React 开发”）；数字与单位之间空不空全项目统一
- 全角标点前后不加空格；英文句子里用半角标点
- 标题按词组断行：词组包进 display: inline-block 的 span 或用 <wbr> 标断点，配合 text-wrap: balance
- 主标题 PC ≤ 2 行、手机 ≤ 3 行，任何一行不只剩 1–2 个字，也不以标点开头
- 中文不用斜体或倾斜变形；大号英文标题字距收紧 -0.01 到 -0.02em，中文不收
- 外文片段标注 lang，品牌名和代码标识加 translate="no"

## 提示词

统一{页面}的中英混排：中文与英文、数字之间加半角空格，全角标点前后不加；数字与单位之间的空格全站统一为{空 / 不空}；主标题按词组断行（词组包进 inline-block 的 span 或用 <wbr>），配合 text-wrap: balance，PC ≤ 2 行、手机 ≤ 3 行，不让一行只剩一两个字或以标点开头；中文不用斜体；外文片段标 lang，品牌名加 translate="no"。

## 示例

<style>
.s{height:100%;display:grid;place-items:center;padding:16px;background:#fff;color:#1f2329;font:13px/1.5 system-ui,"PingFang SC",sans-serif}
.g{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(0,1fr);gap:8px 20px;align-items:center}
span{font-size:12px;color:#5b616e}
em{font-style:normal;font-size:12px;font-weight:600}
.x{color:#d92d20}
.o{color:#12805c}
p{margin:0;white-space:nowrap}
.h{font-size:15px;line-height:22px;font-weight:600}
b{font-weight:600}
</style>

<div class="s"><div class="g"><span></span><em class="x">✗ 不推荐</em><em class="o">✓ 推荐</em><span>空格</span><p>共3个API接口</p><p>共 3 个 API 接口</p><span>断行</span><p class="h">让发布更安<br>心</p><p class="h">让发布<br>更安心</p><span>强调</span><p><i>本周新功能</i></p><p><b>本周新功能</b></p></div></div>
