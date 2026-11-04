---
zh: 电商大促
en: E-commerce promotion
aka: 大促 会场 双11 618 秒杀 活动页 促销
order: 10
---

## 是什么

红色主视觉、超大的到手价、分块走秒的倒计时和一排优惠券，信息按“到手价 → 优惠 → 倒计时 → 按钮”排出层级，热闹，但每一层都一眼看得清。

## 适合

双 11、618、年货节这类会场页，限时秒杀和品牌日，拼团活动页，App 首页的大促皮肤。

## 不适合

日常的商品详情和品牌官网，大促结束后皮肤要能一键撤掉；高端品牌，改用「奢华高定」；医疗、药品和面向孩子的产品不用倒计时这类催促手段，见「医疗健康」「儿童教育」。

## 注意

价格要算得清、写得真：到手价按什么口径算、划线价代表什么，都写在价格旁边。倒计时以服务端时间为准，不能拿本机时间随便减；结束那一刻，价格和按钮要一起变。

## 要点

- 配色：主红 #e0301e 到深红 #c8102e 的渐变做头图和主按钮，白字对两端都 ≥ 4.5:1；橙 #ff6a00 只做光晕和氛围，不承载白字；金黄 #ffd84d 配深棕 #5c3b00 做利益点标签；商品区白底，价格红 #d4141f（5.4:1）
- 价格层级：同一张卡片只有到手价最大，数字 28–56px、900、tabular-nums，¥ 符号和小数部分缩到 55–60%；旁边小字写口径（“券后”“到手”）；划线价 12–14px #737373，并标明含义（日常价、吊牌价），说不清含义的不显示
- 到手价口径：售价 − 店铺券 − 平台券 − 满减，只算用户当前能领到的券；券还没领时写“领券后 ¥399”，不直接把券后价当售价
- 倒计时：时、分、秒分块显示，数字用 tabular-nums 防抖；接口同时返回 endTime 和 serverNow，前端算出和本机的时差再走秒，只换文字不做整块动画；容器 role="timer"，不逐秒播报，只在剩 5 分钟和结束时用 role="status" 提示；归零后按钮变“已结束”，并重新拉一次价格
- 优惠券：券面用 radial-gradient 在两侧挖出半圆缺口，面额 20–24px 粗体、门槛 12px；分“立即领取 / 已领取 / 已抢光”三种状态，后两种转灰并写明原因
- 主按钮：高 44–48px、胶囊形、红渐变白字，文案带价格（“¥399 立即抢”）；一屏只有一个主按钮；库存条写“已抢 78%”，剩余低于 10% 才出现“即将售罄”
- 氛围装饰：红包、金币、礼盒、彩带一屏最多 4 处，只放在头图区，商品卡片保持纯白；金币雨这类氛围动画只在首屏播一次，3 秒内结束
- 动效与窄屏：主按钮可做 1 → 1.04 的呼吸缩放，1.2s ease-in-out 循环，减少动态效果时停止；窄屏商品两列，网格写 minmax(0, 1fr)，价格不换行，商品名两行截断，购买栏吸底

## 提示词

把{产品}的{活动名}会场做成电商大促基调：头图和主按钮用 #e0301e 到 #c8102e 的红渐变配白字，橙 #ff6a00 只做光晕，利益点标签用金黄 #ffd84d 配深棕 #5c3b00，商品卡片纯白，价格红 #d4141f；每张卡片只有到手价最大（数字 32px、900、tabular-nums，¥ 和小数缩到 55%），旁边注明“券后”或“到手”，划线价 13px #737373 并标明“日常价”；到手价按售价减店铺券、平台券、满减计算，券没领时写“领券后 ¥N”；倒计时时分秒分块、等宽数字，用接口返回的 endTime 和 serverNow 校准，role="timer" 不逐秒播报，剩 5 分钟和结束时提示，归零后按钮改成“已结束”并刷新价格；优惠券做出半圆缺口，区分立即领取、已领取、已抢光；一屏一个主按钮，48px 高胶囊形、文案带价格，可做 1.04 呼吸缩放；氛围装饰最多 4 处、只在头图区；减少动态效果时停掉呼吸和氛围动画；窄屏两列商品、价格不换行、购买栏吸底。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:flex;flex-direction:column;gap:8px;padding:10px;overflow:hidden;background:radial-gradient(26% 46% at 54% 0,rgba(255,106,0,.75),transparent 70%),linear-gradient(160deg,#e0301e,#c8102e 60%);color:#222;font:12px/1.4 system-ui,"PingFang SC",sans-serif;font-variant-numeric:tabular-nums}
header{position:relative;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 4px;color:#fff}
.ttl{font:900 clamp(16px,10cqh,30px)/1.2 system-ui,"PingFang SC",sans-serif;letter-spacing:.02em;white-space:nowrap}
.coin{position:absolute;left:48%;top:-2px;width:18px;height:18px;border-radius:50%;background:radial-gradient(circle,#ffe58a 0 40%,#f5b81c 42% 58%,#ffe58a 60%);box-shadow:0 0 0 1px #d99a0b}
.coin+.coin{left:58%;top:12px;width:12px;height:12px}
.cd{display:flex;align-items:center;gap:3px;white-space:nowrap}
.cd span{margin-right:2px}
.cd i{min-width:20px;padding:2px 0;border-radius:4px;background:#fff;color:#c8102e;font:800 12px/1.2 system-ui,sans-serif;font-style:normal;text-align:center}
.card{flex:1;min-height:0;display:grid;grid-template-columns:30% minmax(0,1fr);gap:10px;padding:10px;border-radius:12px;background:#fff}
.img{position:relative;display:grid;place-items:center;align-self:stretch;border-radius:8px;background:#f4f4f6;overflow:hidden}
.img svg{width:70%}
.tag{position:absolute;left:0;top:0;padding:1px 6px;border-radius:8px 0 8px 0;background:#c8102e;color:#fff;font-size:11px;font-weight:700}
.stock{position:absolute;left:6px;right:6px;bottom:6px;display:grid;gap:2px;color:#5c3b00;font-size:10px;font-weight:700}
.stock b{display:block;height:4px;border-radius:2px;background:#ffe6b3}
.stock b i{display:block;width:78%;height:100%;border-radius:2px;background:linear-gradient(90deg,#ff6a00,#e0301e)}
.info{display:flex;flex-direction:column;justify-content:space-between;min-width:0}
.nm{margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600}
.cps{display:flex;gap:4px;overflow:hidden}
.cp{flex:none;padding:0 8px;border:1px dashed #e0301e;border-radius:3px;background:radial-gradient(circle at 0 50%,#fff 3px,transparent 3.5px),radial-gradient(circle at 100% 50%,#fff 3px,transparent 3.5px),#fff3e0;color:#c8102e;font-size:11px;font-weight:700;line-height:18px}
.cp.y{border-color:#d99a0b;background:#ffd84d;color:#5c3b00}
.pr{display:flex;flex-wrap:wrap;align-items:baseline;gap:0 4px;white-space:nowrap;color:#d4141f}
.pr small{font-weight:700}
.pr b{font:900 clamp(24px,15cqh,48px)/1 system-ui,sans-serif;letter-spacing:-.02em}
.pr em{font-size:55%;font-style:normal}
.pr s{color:#737373;font-size:12px}
.st{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%)}
.calc{display:none;margin:0;color:#737373;font-size:12px}
a{display:flex;align-items:center;justify-content:center;height:32px;border-radius:999px;background:linear-gradient(90deg,#e0301e,#c8102e);color:#fff;font-weight:800;font-size:13px;text-decoration:none;animation:breathe 1.2s ease-in-out infinite alternate}
a:hover{background:#b80d24}
a:focus-visible{outline:2px solid #c8102e;outline-offset:3px}
a.end{background:#bdbdbd;color:#333;animation:none}
@keyframes breathe{to{transform:scale(1.04)}}
@container (max-width:300px){.s{padding:8px}
.coin{display:none}
.card{gap:8px;padding:8px}
.cp+.cp{display:none}
}
@container (min-height:260px){.s{padding:14px 16px;gap:12px}
.cd{font-size:13px}
.cd i{min-width:26px;font-size:15px}
.card{padding:16px;gap:18px;grid-template-columns:28% minmax(0,1fr)}
.nm{font-size:15px}
.cp{font-size:13px;line-height:24px;padding:0 12px}
.stock{font-size:12px;left:10px;right:10px;bottom:10px}
.pr s{font-size:13px}
.calc{display:block}
a{height:44px;font-size:16px}
}
@media (prefers-reduced-motion:reduce){a{animation:none}
}
</style>

<div class="s">
  <header>
    <b class="ttl">11.11 狂欢夜</b>
    <i class="coin" aria-hidden="true"></i><i class="coin" aria-hidden="true"></i>
    <div class="cd" role="timer" aria-label="距本场结束"><span>距结束</span><i>02</i>:<i>18</i>:<i>45</i></div>
  </header>
  <div class="card">
    <div class="img" role="img" aria-label="降噪耳机，已抢 78%">
      <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M20 62V46a30 30 0 0 1 60 0v16" fill="none" stroke="#2b2b33" stroke-width="7" stroke-linecap="round"/><rect x="10" y="52" width="20" height="30" rx="8" fill="#2b2b33"/><rect x="70" y="52" width="20" height="30" rx="8" fill="#2b2b33"/><rect x="15" y="58" width="6" height="18" rx="3" fill="#e0301e"/></svg>
      <span class="tag">直降 200</span>
      <span class="stock" aria-hidden="true">已抢 78%<b><i></i></b></span>
    </div>
    <div class="info">
      <p class="nm">降噪耳机 Pro 2 · 官方旗舰店</p>
      <div class="cps"><span class="cp">店铺券 ¥150</span><span class="cp y">满 300 减 50</span></div>
      <div class="pr"><small>券后</small><b><em>¥</em>399<em>.00</em></b><s>日常价 ¥599</s></div>
      <p class="calc">599 − 店铺券 150 − 满减 50 = 到手 399</p>
      <a href="#">¥399 立即抢</a>
      <p class="st" role="status"></p>
    </div>
  </div>
</div>

<script type="module">
export default function demo(root) {
  const cells = root.querySelectorAll('.cd i'), btn = root.querySelector('a'), st = root.querySelector('.st');
  // 示例从 2:18:45 开始走；真实页面用接口的 endTime 减去（本机时间 + 与 serverNow 的时差）
  const end = Date.now() + (2 * 3600 + 18 * 60 + 45) * 1000;
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    if (!root.host.isConnected) return clearInterval(t);
    const left = Math.max(0, Math.round((end - Date.now()) / 1000));
    [left / 3600, (left % 3600) / 60, left % 60].forEach((v, i) => { cells[i].textContent = pad(Math.floor(v)); });
    if (left === 300) { st.textContent = '距结束还剩 5 分钟'; }
    if (!left) { clearInterval(t); btn.textContent = '已结束'; btn.classList.add('end'); st.textContent = '本场已结束'; }
  };
  const t = setInterval(tick, 1000);
}
</script>
