---
zh: 复制回执
en: Copy receipt
aka: 复制反馈 已复制 复制成功提示 剪贴板回执
order: 90
---

## 是什么

点复制后，按钮原地变成对勾和“已复制”，下面滑出一张小回执，写着复制了什么、有多长，几秒后收回，按钮恢复。

## 适合

一屏有多个可复制字段：邀请码、订单号、接口密钥、收款账号、地址，用户要确认复制的是哪一个、内容对不对。

## 不适合

只有一个明显的复制按钮时「图标柔和替换」就够；整段代码的复制看「代码块与可复制字段」；和复制内容无关的全局结果用「轻提示 Toast」；整张单据逐行打印用「收据一行行吐出」。

## 注意

写入成功才显示“已复制”：navigator.clipboard.writeText 是异步的，可能被拒绝（非安全上下文、嵌入页权限），要 await；失败时退回隐藏文本框加 execCommand，还失败就显示“复制失败”并提示手动选中。写入只发生在用户的点击里，页面加载和自动演示不碰剪贴板。

## 要点

- 按钮：图标和文案各自叠在同一格，宽度固定；约 180ms 变绿，临时状态和回执同时结束。
- 回执绝对定位，不推挤下面的内容；外面包一层 overflow: hidden，纸条从字段下沿滑出（transform，约 260ms）。
- 内容三项：复制了哪个字段和时间、内容预览、字符数。长内容中间省略。
- 密钥类内容回执只露首尾，写入剪贴板的是完整值，读屏同样只读掩码。
- 3–4 秒后收回；指针停在回执上暂停计时，移开重新计；Esc 立刻收回；再点一次重新计时并更新时间。
- 同时只有一张回执，点另一个字段时，上一个按钮立刻恢复。
- 按钮 aria-label 写清字段名（“复制邀请码”），结果用 role="status" 播报“已复制邀请码，MP-7K2Q-41XD”，焦点留在按钮上。
- 减少动态效果时回执和按钮直接切换。

## 提示词

给{页面}里的{可复制字段列表}做「复制回执」：每个字段右侧一个宽度固定的复制按钮，aria-label 写清字段名；点击后 await navigator.clipboard.writeText，失败时退回隐藏文本框加 execCommand，都失败才算失败；成功时按钮原地变成绿色的对勾和“已复制”，字段下方滑出一张绝对定位的小回执（260ms，外层 overflow: hidden，不推挤下面的内容），写复制的字段名和时间、内容预览、字符数，{密钥类字段}只露首尾，剪贴板里是完整值；3.2 秒后回执收回、按钮恢复，指针停在回执上暂停计时，Esc 立刻收回，再点重新计时；同时只有一张回执，点别的字段时上一个按钮立刻恢复；失败时按钮显示“失败”，回执提示手动选中复制；结果用 role="status" 播报，焦点留在按钮上；页面加载时不碰剪贴板；减少动态效果时直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:14px 14px 0;background:#eef0ea}
.wrap{position:relative;width:min(100%,430px);margin:0 auto}
.row{position:relative;z-index:1;display:flex;align-items:center;gap:8px;height:42px;margin-bottom:6px;padding:0 6px 0 12px;border-radius:10px;background:#fff;box-shadow:0 1px 2px rgba(30,34,20,.1)}
.row.act{z-index:3}
.lab{flex:none;color:#646a5a;font-size:12px}
code{flex:1;min-width:0;overflow:hidden;color:#20241a;font:500 12px ui-monospace,SFMono-Regular,Menlo,monospace;text-overflow:ellipsis;white-space:nowrap;user-select:all}
.copy{flex:none;display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 9px;border:1px solid #cfd3c6;border-radius:8px;background:#fff;color:#2c3024;font-size:12px;font-weight:600;transition:background-color .18s,border-color .18s,color .18s}
.copy:hover{background:#f4f5f0}
.copy.ok{border-color:#1a7f4b;background:#1a7f4b;color:#fff}
.copy.bad{border-color:#b42318;background:#b42318;color:#fff}
.ic{display:grid;width:14px;height:14px}
.ic svg{grid-area:1/1;width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:opacity .16s,transform .2s,filter .16s}
.ic .y{opacity:0;transform:scale(.6);filter:blur(2px)}
.copy.ok .ic .n{opacity:0;transform:scale(.6);filter:blur(2px)}
.copy.ok .ic .y{opacity:1;transform:none;filter:none}
.tx{display:grid;justify-items:center}
.tx span{grid-area:1/1;opacity:0}
.tx .on{opacity:1}
.sc{position:absolute;left:12px;right:12px;z-index:2;overflow:hidden;pointer-events:none}
.slip{padding:7px 12px 15px;background:#fffdf4;color:#3a3c2e;font-size:11px;line-height:1.5;-webkit-mask:conic-gradient(from -45deg at 50% 100%,#0000,#000 1deg 89deg,#0000 90deg) 0 100%/10px 100%;mask:conic-gradient(from -45deg at 50% 100%,#0000,#000 1deg 89deg,#0000 90deg) 0 100%/10px 100%;transform:translateY(-102%);visibility:hidden;transition:transform .26s cubic-bezier(.2,0,0,1),visibility 0s .26s;pointer-events:auto}
.slip.on{transform:none;visibility:visible;transition:transform .26s cubic-bezier(.2,0,0,1)}
.slip div{display:flex;justify-content:space-between;gap:10px}
.slip b{font-weight:600}
.slip .v{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;white-space:nowrap}
.slip hr{margin:3px 0;border:0;border-top:1px dashed #c8c6b0}
@container (min-height:260px){.st{padding-top:26px}
.row{height:48px;margin-bottom:8px;padding:0 8px 0 14px}
.lab,code{font-size:13px}
.copy{height:34px;padding:0 12px;font-size:13px}
.slip{padding:10px 14px 17px;font-size:12px}
}
</style>

<div class="st"><div class="wrap"><div class="row"><span class="lab">邀请码</span><code>MP-7K2Q-41XD</code><button type="button" class="copy" data-v="MP-7K2Q-41XD" data-n="邀请码" aria-label="复制邀请码"><span class="ic" aria-hidden="true"><svg class="n" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg><svg class="y" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="tx" aria-hidden="true"><span class="on">复制</span><span>已复制</span><span>失败</span></span></button></div><div class="row"><span class="lab">接口密钥</span><code>mp_key_••••9f2a</code><button type="button" class="copy" data-v="mp_key_4c81e07b9f2a" data-n="接口密钥" data-mask="1" aria-label="复制接口密钥"><span class="ic" aria-hidden="true"><svg class="n" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg><svg class="y" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="tx" aria-hidden="true"><span class="on">复制</span><span>已复制</span><span>失败</span></span></button></div><div class="sc" data-clip><div class="slip"><div><b class="ti"></b><span class="tm"></span></div><hr><div><span>内容</span><span class="v"></span></div><div><span class="m1"></span><span class="m2"></span></div></div></div></div><p class="sr" role="status"></p></div>

<script type="module">
const SHOW = 3200;
const mask = (s) => s.slice(0, 7) + '••••' + s.slice(-4); // 密钥类回执只露首尾
export default function demo(root) {
  const btns = [...root.querySelectorAll('.copy')], sc = root.querySelector('.sc'), slip = root.querySelector('.slip'), say = root.querySelector('[role=status]');
  const $ = (q) => slip.querySelector(q);
  let cur = null, tm = 0;
  const label = (b, i) => [...b.querySelectorAll('.tx span')].forEach((s, k) => s.classList.toggle('on', k === i));
  const reset = (b) => { b.classList.remove('ok', 'bad'); b.closest('.row').classList.remove('act'); label(b, 0); };
  const close = () => { clearTimeout(tm); slip.classList.remove('on'); if (cur) reset(cur); cur = null; };
  const arm = () => { clearTimeout(tm); tm = setTimeout(close, SHOW); };
  const write = async (text) => {
    try { await navigator.clipboard.writeText(text); return true; }
    catch { // 剪贴板接口被拒时退回隐藏文本框；两条路都失败才算失败
      const t = document.createElement('textarea'); t.value = text; t.readOnly = true; t.style.cssText = 'position:absolute;opacity:0';
      root.append(t); t.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch { ok = false; }
      t.remove(); return ok;
    }
  };
  const issue = (b, ok) => {
    if (cur && cur !== b) reset(cur);
    cur = b;
    const v = b.dataset.v, shown = b.dataset.mask ? mask(v) : v;
    b.classList.add(ok ? 'ok' : 'bad'); b.classList.remove(ok ? 'bad' : 'ok'); label(b, ok ? 1 : 2);
    $('.ti').textContent = ok ? `已复制${b.dataset.n}` : '复制失败';
    $('.tm').textContent = new Date().toTimeString().slice(0, 8);
    $('.v').textContent = shown;
    $('.m1').textContent = ok ? '长度' : '处理';
    $('.m2').textContent = ok ? `${v.length} 个字符` : '请选中上方内容手动复制';
    const row = b.closest('.row');
    row.classList.add('act');
    sc.style.top = row.offsetTop + row.offsetHeight - 6 + 'px';
    slip.classList.add('on');
    say.textContent = ok ? `已复制${b.dataset.n}，${shown}` : `${b.dataset.n}复制失败，请手动复制`;
    arm();
  };
  btns.forEach((b) => b.addEventListener('click', async () => { const ok = await write(b.dataset.v); issue(b, ok); b.focus(); }));
  slip.addEventListener('pointerenter', () => clearTimeout(tm));
  slip.addEventListener('pointerleave', () => { if (cur) arm(); });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  // 自动演示只走回执动画，不碰用户的剪贴板
  setTimeout(() => { if (root.host.isConnected) issue(btns[1], true); }, 200);
}
</script>
