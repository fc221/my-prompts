---
zh: 大文件分片上传
en: Chunked upload for large files
aka: 分片上传 断点续传 秒传 大文件上传 multipart upload 文件哈希 合并分片 预签名 ETag
order: 30
---

## 是什么

把几百 MB 到几十 GB 的文件切成固定大小的分片分别上传，断网后只补传缺的分片，全部到齐后合并成一个文件。配合文件哈希，同一个文件第二次上传可以直接“秒传”。

## 适合

门店巡检视频、工程图纸、数据导入包、培训课件、安装包这类大文件，以及弱网环境下的移动端上传。

## 不适合

10 MB 以内的图片、发票一次上传就够，见「文件上传与下载」；文件类型校验、存储路径和下载签名看「文件上传与存储」。

## 注意

分片直传对象存储（S3 兼容的 Multipart Upload：CreateMultipartUpload、UploadPart、CompleteMultipartUpload），服务端只负责签名和记账，几十 GB 的流量不经过应用服务器。S3 规定除最后一片外每片至少 5 MiB、最多 10000 片，分片大小要按文件大小算，否则大文件片数超限；其他存储以各自文档为准。没完成的上传会一直占着存储，要设生命周期规则清理。

## 要点

- 量级：文件多在 100 MB 以内、网络稳定，单次预签名 PUT 直传就够；超过约 100 MB 或移动弱网再分片。
- 初始化：客户端先算 SHA-256（浏览器在 Web Worker 里分块增量计算），POST /uploads 带 file_name、size、sha256；同一租户内哈希命中已有文件直接返回 file_id（秒传），跨租户不秒传，避免凭哈希拿到别人的文件。
- 分片大小：默认 8 MiB，文件超过约 70 GiB 时按 文件大小 / 9000 向上取整到 MiB，保证片数在 10000 以内；服务端返回 chunk_size 和 total_parts，客户端照此切片。
- 记账：upload_session(upload_id, user_id, sha256, size, chunk_size, total_parts, storage_upload_id, status 进行中 / 合并中 / 已完成 / 失败 / 已中止, expire_at)，upload_part(upload_id, part_no, etag, size)，主键 (upload_id, part_no)，同一片重复上传覆盖记录；分片按 part_no 记账，先到后到都一样，合并时才按序号排列。
- 上传分片：GET /uploads/:id/parts/:n/url 返回这一片 15 分钟有效的预签名 PUT 地址；客户端用固定大小的并发池，同时在传的分片不超过 3–6 片，连续失败时降到 2 片；单片失败按退避重试 3 次，传完把 part_no 和 ETag 回报服务端；浏览器直传时存储桶的 CORS 要暴露 ETag 头。
- 断点续传：重新进入时 GET /uploads/:id 返回已完成的分片号（以服务端记录或对象存储的 ListParts 为准），客户端只补传缺的。
- 合并：POST /uploads/:id/complete 先核对 1 到 total_parts 的分片都已记账，缺片返回 409 和缺失的序号；齐了就把会话改为合并中并返回 202，由后台任务按 part_no 顺序提交 ETag 列表完成合并，再校验总大小和整体 SHA-256；客户端每 2 秒轮询 GET /uploads/:id，或等合并完成的通知；校验不一致删除对象、会话标为失败并写明原因，成功写 file 表并标为已完成；complete 重复调用只返回当前状态和同一个 file_id。
- 清理：会话 24 小时未完成就标为已中止并调用 AbortMultipartUpload；存储桶配置生命周期规则，7 天后清理所有未完成的分片上传。

## 提示词

在{项目}里实现{文件类型，如巡检视频}的大文件分片上传和断点续传，存储用{对象存储}：先确认量级——单文件大小范围、日上传量、客户端是浏览器还是 App、网络环境、是否需要秒传；文件多在 100 MB 以内且网络稳定时，单次预签名直传就够。再按以下设计：
1. POST /uploads 初始化，带文件名、大小、SHA-256，同租户内哈希命中已有文件直接返回。
2. 分片默认 8 MiB，按文件大小调整保证不超过 10000 片；建 upload_session 和 upload_part 表，主键 (upload_id, part_no)。
3. 每片单独签发 15 分钟有效的预签名 PUT，客户端同时在传不超过 3–6 片、失败退避重试 3 次，传完回报 part_no 和 ETag；按序号记账，不依赖到达顺序。
4. 续传时返回已完成的分片号，只补缺的。
5. complete 确认分片齐全后返回 202，后台任务按序号合并并校验整体哈希，客户端轮询或收通知拿结果；重复调用返回同一个 file_id。
6. 24 小时未完成的会话中止并清理，存储桶配生命周期规则。
最后给出压测和对账方法：上传 5 GB 文件中途断网 3 次仍能完成且哈希一致；50 个客户端并发上传测吞吐；每天核对已完成会话数与 file 表新增数一致，存储里没有超过 7 天的未完成上传。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, seq } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, seq(['客户端', '上传服务', '对象存储'], [
    [0, 1, 'POST /uploads + 哈希'],
    [1, 2, '创建分片上传'],
    [1, 0, '已传 1–37 片', 'r'],
    [0, 2, 'PUT 第 38 片（预签名地址）'],
    [0, 1, '回报序号 + ETag，补完缺片'],
    [0, 1, 'complete → 202 合并中'],
    [1, 2, '后台合并 · 校验整体哈希'],
  ]), { title: '断点续传 · 异步合并' });
}
</script>
