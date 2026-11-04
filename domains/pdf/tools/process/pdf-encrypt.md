---
zh: 加密与权限
en: Encryption & permissions
aka: PDF加密 打开密码 权限密码 禁止打印 禁止复制 AES-256 解密
order: 100
---

## 是什么

PDF 标准加密有两个密码：打开密码（user password），没有它打不开文件；权限密码（owner password），控制打印、复制、修改、填表这些操作。加密算法用 AES-256。

## 适合

工资条、体检报告、对账单这类发给个人的文件，打开密码通过另一条渠道（短信、App 内）告知；文件要离线流转，又要防止被随手打开。

## 不适合

在线查看的权限控制放在服务端鉴权和短时效下载链接上，看「网页里预览 PDF」；防篡改和证明来源看「数字签名」。

## 注意

只设权限密码、不设打开密码的文件，任何人都能直接打开，内容本身也解得出来；“禁止复制”“禁止打印”只是请阅读器配合，qpdf 之类的工具一条命令就能去掉。真正起保护作用的只有打开密码，而且算法要是 AES-256。

## 要点

- qpdf：qpdf in.pdf out.pdf --encrypt <打开密码> <权限密码> 256 --print=full --modify=none --extract=n --；不加 --allow-weak-crypto 时 qpdf 不会生成弱加密，正好兜底。
- pypdf：writer.encrypt(打开密码, 权限密码, algorithm="AES-256")；不写 algorithm 时用的是不安全的 RC4；AES 需要装 cryptography 依赖。
- PDFKit：生成时传 userPassword、ownerPassword、permissions，并且 pdfVersion 设为 '1.7ext3' 才是 AES-256，默认的 1.3 是 40 位 RC4。
- pdf-lib 不能加密和解密，用它生成的文件交给 qpdf 或 pypdf 再加密。
- 密码：打开密码每份随机生成 8 位以上字母数字；“身份证后 6 位”这类约定规则方便但容易被猜到，只用于低敏感文件。密码不进日志、不出现在命令行参数里（ps 能看到），qpdf 用 @参数文件或改用 pikepdf 传参；密码和文件分渠道发送。
- 处理用户上传的加密文件：qpdf --is-encrypted 返回 0 表示加密；请用户输入密码，在内存里解密处理，结果默认不再带原密码；不提供破解。
- 加密会妨碍归档和检索：PDF/A 不允许加密，需要全文检索的文件保存未加密的原件，对外分发时再加密。

## 提示词

给 {服务} 加一个 PDF 加密功能：{文档类型}（如月度工资条）生成后加打开密码再发给 {接收人}，密码通过 {密码渠道}（如短信）单独告知。
1. 先读现有生成和发送流程；加密放在生成之后、发送之前；有数字签名时确认签名和加密的先后顺序。
2. 用 {qpdf / pikepdf / pypdf}，算法固定 AES-256；打开密码每份随机生成 8 位以上，权限密码由系统保管，权限设为允许打印、禁止修改。
3. 密码不写日志、不出现在命令行参数里；加密后用同一工具验证：没有密码打不开、用密码能打开、页数和原文件一致。
4. 原文件按 {保留策略} 保存在受控存储里，不对外。
5. 用户上传加密文件来处理的场景：先用 qpdf --is-encrypted 判断，请用户输入密码，连续输错 5 次锁定 10 分钟；不做破解。
6. 边界情况：文件已经加密时不重复加密并报告；损坏文件拒绝；超过 {大小上限} MB 的改为后台处理。
最后说明改了哪些文件，并列出在两种常见阅读器里打开的检查结果。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, boxes } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, boxes([
    { t: '打开密码 user', items: ['没有它打不开文件', '每份随机 8 位以上', '真正起保护作用'], acc: true },
    { t: '权限密码 owner', items: ['管打印、复制、修改', '只是请阅读器配合', 'qpdf 一条命令就能去掉'], dash: true },
    { t: 'qpdf', items: ['--encrypt 打开 权限 256', '密码走 @参数文件，不进 ps'] },
    { t: 'pypdf', items: ['algorithm="AES-256"', '不写就是不安全的 RC4'] },
  ], { cols: 2, note: '只设权限密码 = 谁都能打开 · 密码和文件分渠道发' }), { title: '加密与权限 · AES-256' });
}
</script>
