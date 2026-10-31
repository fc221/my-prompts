---
zh: 文件上传与下载
en: File upload & download
aka: 文件上传 直传 预签名 分片上传 断点续传 下载 Content-Disposition
order: 70
---

## 是什么

文件进出 API 的几种方式：小文件用 multipart/form-data 直接上传，大文件先拿预签名地址直传对象存储，下载走带 Content-Disposition 的文件流或短期签名链接。

## 适合

报销单的发票照片、工单附件、门店资质、会员导入表格、导出报表的下载。

## 不适合

存储选型、目录规划、病毒扫描和清理看「文件上传与存储」；前端上传组件的交互看「上传」；要生成很久的导出看「长任务异步化」。

## 注意

文件和业务记录分两步关联：先上传拿到 fileId，再在创建报销单时引用它。这样上传失败可以单独重试，没被引用的文件能定期清理。文件类型按文件头判断，扩展名和客户端给的 Content-Type 都能伪造。

## 要点

- 小文件（如 10 MB 以内）：POST /files，multipart/form-data，字段名 file，返回 201 和 id、name、size、contentType；超出大小返回 413，类型不在白名单返回 422。
- 大文件：POST /uploads 申请上传，返回 uploadId、预签名 PUT 地址和过期时间（如 15 分钟）；客户端直传对象存储后调 POST /uploads/:id/complete，服务端核对大小和哈希。
- 超过约 100 MB 或弱网场景用分片上传：每片 5–10 MB，服务端记录已收分片，断线后只补传缺的。
- 校验按业务配置：允许的扩展名、文件头识别出的真实类型、大小上限，如发票只收 jpg、png、pdf，单张 5 MB。
- 业务 API 只收 fileIds，服务端校验文件属于当前用户、尚未被别的记录占用。
- 下载：GET /files/:id/content 返回文件流，带 Content-Type、Content-Length 和 Content-Disposition: attachment，中文名用 filename*=UTF-8'' 加百分号编码，同时给一个 ASCII 的 filename 兜底；大文件支持 Range，返回 206。
- 私有文件给短期签名链接（5–30 分钟有效），每次签发前检查权限；公开文件才用长期 CDN 地址。

## 提示词

给{业务}加附件上传和下载。先读项目现有的存储封装、文件表和权限逻辑，有现成的就复用。
1. 小文件（{大小上限} 以内）：POST /files，multipart/form-data，返回 201 和 id、name、size、contentType；大文件：POST /uploads 返回预签名地址和过期时间，直传后调 POST /uploads/:id/complete 确认。
2. 校验：允许 {允许类型}，按文件头判断真实类型；超出大小返回 413，类型不符返回 422。
3. 业务接口只收 fileIds，校验文件属于当前用户且未被占用；24 小时内没被引用的文件定时清理。
4. 下载：GET /files/:id/content，带 Content-Disposition（filename* 用 UTF-8 编码中文名，另给 ASCII 兜底名），支持 Range；私有文件返回 15 分钟有效的签名链接，签发前检查权限。
5. 测试：超大文件、伪造扩展名、中文文件名下载、越权下载。
最后列出改动文件和需要配置的存储参数。
