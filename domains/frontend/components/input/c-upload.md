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

- 上传前写清类型、大小和数量（“PDF、JPG，单个不超过 20 MB，最多 5 个”）
- 拖拽区 1px 虚线框，高 56–120px；拖入时边框和底色变主色，文案换成“松开即可上传”；整块可点击，内部有可聚焦的文件输入，用 accept 限定类型
- 每个文件一行：图标或缩略图、文件名（过长中间省略）、大小、进度条与百分比、取消 / 移除
- 失败的行变危险色并写原因（“超过 20 MB”“网络中断”），可重试的给“重试”；一个失败不清空其他文件
- 进度按真实字节推进、不倒退；完成后显示成功色和“移除”，图片显示缩略图
- 还有文件没传完时，提交按钮写明“还有 2 个文件在上传”；文件误投到页面其他位置时阻止浏览器直接打开它
- 进度条 role="progressbar" 带 aria-valuenow；完成和失败用 role="status" 播报；窄屏拖拽区改成按钮

## 提示词

给{合同附件}做上传组件：上方说明“支持 PDF、JPG，单个不超过 20 MB，最多 5 个”；拖拽区虚线框高 112px，可点击也可拖入，拖入时变主色并提示“松开即可上传”；下方文件列表每行显示文件名（过长中间省略）、大小、进度条和百分比、取消；失败整行危险色并写原因和“重试”；成功显示对勾和“移除”；一个失败不影响其他文件；没传完时提交按钮写明还剩几个；阻止页面其他位置误投放打开文件；进度条 role="progressbar"，结果用 role="status" 播报；窄屏只保留“选择文件”按钮。

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
