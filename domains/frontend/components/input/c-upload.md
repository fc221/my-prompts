---
zh: 上传
en: File upload
aka: 拖拽上传 文件上传 附件上传
order: 70
---

## 是什么

拖拽或点击选择文件，逐个显示进度，失败的写明原因并可重试。

## 适合

附件、图片、导入表格、证件照等需要用户提供文件的地方。

## 不适合

只需要一个链接或一段文字时别让人上传文件；批量导入数据时还要给模板下载和导入结果页，而不只是一个上传框。

## 注意

拖拽只是增强，点击选择文件必须同样可用；手机上没有拖拽，点击是主路径。

## 要点

- 用组件库的上传：Element Plus el-upload（action 或 http-request、drag、accept、limit + on-exceed、before-upload、v-model:file-list、on-error、tip 插槽、file 插槽），Naive UI n-upload + n-upload-dragger（action 或 custom-request、accept、max、on-before-upload、v-model:file-list、on-error、show-retry-button），Ant Design Vue a-upload / a-upload-dragger（action 或 customRequest、accept、maxCount、beforeUpload、v-model:file-list、showUploadList、itemRender）；拖拽区、文件列表、进度条、取消和移除都是组件自带的
- 上传前写清类型、大小和数量（“PDF、JPG，单个不超过 20 MB，最多 5 个”）：放在 tip 插槽或拖拽区文案里，并用 accept 限定类型、limit / max / maxCount 限定数量
- 大小和类型校验在 before-upload / on-before-upload / beforeUpload 里返回 false 并就地说明原因；Ant Design Vue 返回 false 文件仍会留在列表里，不想显示就返回 Upload.LIST_IGNORE
- 失败的行写原因（“超过 20 MB”“网络中断”）并给“重试”：Naive UI 自带 show-retry-button 和 on-retry；另两家没有，在 file 插槽 / itemRender 里加重试按钮，只重传那一个文件；一个失败不清空其他文件
- 拖入时的高亮、进度按真实字节推进、完成后的成功态由组件负责；图片要缩略图开列表类型（Element Plus 和 Ant Design Vue list-type="picture"，Naive UI list-type="image"）
- 还有文件没传完时，提交按钮写明“还有 2 个文件在上传”，看 file-list 里的 status；文件误投到页面其他位置时阻止浏览器直接打开它（window 的 dragover / drop 上 preventDefault）
- 窄屏拖拽区改成“选择文件”按钮，拖拽只是增强

## 提示词

给{合同附件}做上传：用项目组件库自带的上传组件（Element Plus el-upload drag；Naive UI n-upload + n-upload-dragger；Ant Design Vue a-upload-dragger），不手写拖拽区和文件列表。说明文字“支持 PDF、JPG，单个不超过 20 MB，最多 5 个”放在 tip 插槽或拖拽区里；accept 限定 .pdf,.jpg，数量用 limit / max / maxCount = 5；大小在 before-upload / on-before-upload / beforeUpload 里校验，超出时返回 false 并就地提示（Ant Design Vue 返回 Upload.LIST_IGNORE）；失败整行写原因和“重试”（Naive UI 用自带的重试按钮，另两家在 file 插槽 / itemRender 里加），一个失败不影响其他文件；没传完时提交按钮写明还剩几个；阻止页面其他位置误投放打开文件；窄屏只保留“选择文件”按钮。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:380px;display:flex;flex-direction:column;gap:8px}
.dz{display:flex;align-items:center;gap:12px;height:56px;padding:0 16px;border:1px dashed #c9ced6;border-radius:8px;background:#fff;cursor:pointer}
.dz:hover,.dz.on{border-color:#3b5bdb;background:#edf1ff}
.dz:focus-within{outline:2px solid #3b5bdb;outline-offset:2px}
.ic{display:flex;color:#3b5bdb}
.tx{display:flex;flex-direction:column;min-width:0}
.tx b{font-weight:500;line-height:20px}
.tx u{color:#3b5bdb;text-decoration:none}
.tx small{font-size:12px;line-height:20px;color:#5b616e}
.fl{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}
.fl li{display:flex;align-items:center;gap:8px;height:40px;padding:0 4px 0 12px;background:#fff;border:1px solid #e3e6eb;border-radius:6px}
.mid{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}
.nm{display:flex;justify-content:space-between;gap:8px;font-size:13px;line-height:18px}
.nm span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.nm small{flex:none;font-size:12px;color:#5b616e;font-variant-numeric:tabular-nums}
.bar{height:4px;border-radius:2px;background:#e3e6eb;overflow:hidden}
.bar i{display:block;height:100%;width:0;background:#3b5bdb;transition:width .2s}
.act{height:28px;padding:0 8px;border:0;border-radius:4px;background:none;color:#5b616e;cursor:pointer}
.act:hover{background:#f5f6f8;color:#1f2329}
.fail{border-color:#f1c4c0!important;background:#fff7f6!important}
.fail .nm small{color:#d92d20}
.fail .bar i{background:#d92d20}
.fail .act{color:#3b5bdb}
.done .bar i{background:#12805c}
.done .nm small{color:#12805c}
</style>

<div class="s"><div class="w"><label class="dz"><input type="file" multiple class="sr"><span class="ic"><svg viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 10.5V3M4.5 6L8 2.5 11.5 6M3 13.5h10"/></svg></span><span class="tx"><b>拖拽文件到这里，或<u>点击选择</u></b><small>PDF、JPG，单个不超过 20 MB</small></span></label><ul class="fl"></ul><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const fl = root.querySelector('.fl'), dz = root.querySelector('.dz'), inp = root.querySelector('input'), st = root.querySelector('[role=status]');
  const run = (li, size, fail) => {
    let p = 0; li.className = ''; const sm = li.querySelector('small'), bar = li.querySelector('.bar'), i = li.querySelector('i'), b = li.querySelector('.act'), name = li.querySelector('span').textContent;
    b.textContent = '取消'; b.onclick = () => li.remove();
    const tick = () => {
      if (!root.host.isConnected || !li.isConnected) return;
      p = Math.min(100, p + 8 + Math.floor(Math.random() * 10));
      if (fail && p > 55) { li.className = 'fail'; sm.textContent = '网络中断'; b.textContent = '重试'; b.onclick = () => run(li, size, false); st.textContent = name + ' 上传失败：网络中断'; return; }
      i.style.width = p + '%'; bar.setAttribute('aria-valuenow', p); sm.textContent = p < 100 ? p + '%' : '✓ ' + size;
      if (p < 100) setTimeout(tick, 300); else { li.className = 'done'; b.textContent = '移除'; b.onclick = () => li.remove(); st.textContent = name + ' 上传完成'; }
    };
    tick();
  };
  const add = (name, bytes, fail) => {
    const li = document.createElement('li'), size = (bytes / 1048576).toFixed(1) + ' MB';
    li.innerHTML = '<div class="mid"><div class="nm"><span></span><small></small></div><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div></div><button type="button" class="act"></button>';
    li.querySelector('span').textContent = name; li.querySelector('.bar').setAttribute('aria-label', name + ' 上传进度'); fl.prepend(li);
    while (fl.children.length > 2) fl.lastElementChild.remove();
    if (bytes > 20 * 1048576) { li.className = 'fail'; li.querySelector('small').textContent = '超过 20 MB'; const b = li.querySelector('.act'); b.textContent = '移除'; b.onclick = () => li.remove(); st.textContent = name + ' 超过 20 MB，未上传'; return; }
    run(li, size, fail);
  };
  const take = (files) => [...files].slice(0, 2).forEach((f) => add(f.name, f.size, false));
  inp.addEventListener('change', () => { take(inp.files); inp.value = ''; });
  dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('on'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('on'));
  dz.addEventListener('drop', (e) => { e.preventDefault(); dz.classList.remove('on'); take(e.dataTransfer.files); });
  add('营业执照扫描件.jpg', 1.8 * 1048576, true); add('2026 年度服务合同（盖章版）.pdf', 2.4 * 1048576, false);
}
</script>
