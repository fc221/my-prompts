---
zh: 糖果萌系
en: Kawaii candy
aka: 萌系 kawaii 糖果色 少女心 果冻按钮 软萌
order: 30
---

## 是什么

草莓牛奶粉的底上飘着白色波点和小星星，按钮像带高光的果冻糖，圆滚滚的小动物表情配腮红，整体没有一根深色描边，甜、软、亮。

## 适合

女性向和萌系的社区、心情日记与打卡、贴纸和表情包商店、甜品与潮玩品牌的活动页、虚拟宠物和轻养成小游戏。

## 不适合

工具、后台和需要严肃感的服务，改用「北欧柔和」或「企业稳重」；要深色描边、硬投影贴纸的元气二次元，用「二次元清爽（冷白）」；奶油底配深棕描边的软萌商品卡，用「二次元奶油」。

## 注意

和另外两种二次元风格的分界是“不描边、靠高光”：轮廓全部用白色或同色系浅边，立体感来自果冻高光和粉色柔光投影。粉色只给大面积底和按钮，正文一律用深莓色，不要把白字放在粉色上。

## 要点

- 配色：草莓牛奶底 #ffe4f1 叠白色波点（radial-gradient，直径 6px、间距 22px），卡片白；正文深莓 #5c1a3d（对底 10.6:1），次要 #8a3a64（6.1:1）；糖果色从草莓粉 #ff8fc0、薄荷 #9fe8cf、薰衣草 #cdb8ff、柠檬 #ffe58a 里选 3 个
- 果冻按钮：纵向渐变（浅到深一档），::before 画一块偏上的白色椭圆高光 70% 不透明，底部 inset 0 -4px 0 rgba(0,0,0,.08)，外层 0 6px 14px 同色 35% 的柔光；按钮上用深莓字（6.5:1）
- 形状：卡片圆角 28px、3px 浅粉边 #ffd1e6；按钮 999px；表情按钮做成 40–48px 的圆形糖果，选中时放大到 1.12 并加 3px 白圈和一圈糖果色外环
- 字体：圆体，推荐 M PLUS Rounded 1c 或 Nunito 配思源黑体，后备 ui-rounded、"PingFang SC"、sans-serif；标题 800、22–36px，正文 15–16px / 1.6，可用 ♡ ☆ 这类符号收尾
- 角色：原创的圆脸小动物，五官只用小黑点眼睛、弧线嘴和椭圆腮红，不描粗边
- 装饰：星星、爱心、波点和糖果条纹，同屏闪烁的不超过 3 个，全部 aria-hidden，不压在正文上
- 动效：点按果冻时纵向压扁 scale(1.08, .9) 再回弹，300ms cubic-bezier(.34,1.56,.64,1)；星星 2.4s 缩放闪烁；减少动态效果时去掉回弹和闪烁
- 窄屏：表情按钮保持 44px 以上、改两行排列，装饰减半，卡片圆角降到 22px

## 提示词

把{产品}的{页面}做成糖果萌系风：草莓牛奶底 #ffe4f1 叠白色波点，卡片白色、圆角 28px、3px 浅粉边 #ffd1e6，全页不用深色描边；正文深莓 #5c1a3d、次要 #8a3a64，糖果色从草莓粉 #ff8fc0、薄荷 #9fe8cf、薰衣草 #cdb8ff 里取；按钮做成果冻：纵向浅到深渐变、偏上一块白色椭圆高光、底部 inset 0 -4px 0 暗边、同色 35% 的 0 6px 14px 柔光，按钮文字用深莓色；字体圆体（Nunito 配思源黑体，后备 ui-rounded、PingFang SC），标题 800；配一只原创圆脸小动物，只有点眼、弧线嘴和腮红；{选项}做成 44px 圆形糖果按钮，选中放大 1.12 加白圈和外环，用 aria-pressed 标出；点按时压扁回弹 300ms，星星装饰同屏最多 3 个闪烁且 aria-hidden，减少动态效果时去掉回弹和闪烁；窄屏选项改两行、卡片圆角 22px。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:grid;place-items:center;padding:12px;overflow:hidden;background:radial-gradient(circle,#fff 3px,transparent 3.5px) 0 0/22px 22px,radial-gradient(circle,#fff 3px,transparent 3.5px) 11px 11px/22px 22px,#ffe4f1;color:#5c1a3d;font:12px/1.5 ui-rounded,"Nunito","PingFang SC",sans-serif}
.st{position:absolute;color:#ff8fc0;font-style:normal;animation:tw 2.4s ease-in-out infinite}
.st.a{left:6%;top:10%;font-size:18px}
.st.b{right:7%;top:16%;font-size:13px;color:#cdb8ff;animation-delay:-.8s}
.st.c{right:10%;bottom:9%;font-size:16px;color:#9fe8cf;animation-delay:-1.6s}
.cd{position:relative;width:min(280px,92%);display:grid;gap:8px;padding:12px 14px 14px;border:3px solid #ffd1e6;border-radius:28px;background:#fff;box-shadow:0 10px 24px rgba(255,111,174,.22)}
.hd{display:flex;align-items:center;gap:8px}
.hd svg{flex:none;width:40px}
.hd b{display:block;font-size:clamp(15px,8.5cqh,24px);line-height:1.2;font-weight:800}
.hd small{color:#8a3a64}
.md{display:flex;justify-content:space-between;gap:6px;padding:0 6px}
.jl{--c1:#ffb3d4;--c2:#ff8fc0;position:relative;overflow:hidden;border:0;background:linear-gradient(var(--c1),var(--c2));color:#5c1a3d;font:inherit;font-weight:800;cursor:pointer;box-shadow:inset 0 -4px 0 rgba(0,0,0,.08),0 6px 14px color-mix(in srgb,var(--c2) 35%,transparent)}
.jl::before{content:"";position:absolute;left:18%;top:8%;width:46%;height:30%;border-radius:50%;background:rgba(255,255,255,.7);pointer-events:none}
.mo{width:40px;height:40px;padding:0;border-radius:50%;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.mo svg{position:relative;width:26px;margin-top:3px}
.mo[aria-pressed=true]{transform:scale(1.12);box-shadow:inset 0 -4px 0 rgba(0,0,0,.08),0 0 0 3px #fff,0 0 0 6px var(--c2)}
.mo.sq{animation:sq .3s cubic-bezier(.34,1.56,.64,1)}
.go{height:32px;border-radius:999px;font-size:13px}
.go::before{left:6%;top:3px;width:22%;height:7px}
.mo::before{left:22%;top:6%;width:38%;height:22%}
.jl:hover{filter:brightness(1.04) saturate(1.1)}
.jl:focus-visible{outline:3px solid #5c1a3d;outline-offset:3px}
.msg{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
@keyframes tw{50%{opacity:.35;transform:scale(.7) rotate(15deg)}
}
@keyframes sq{40%{transform:scale(1.2,.86)}
}
@container (max-width:300px){.cd{border-radius:22px;padding:10px 12px 12px}
.st.b{display:none}
}
@container (min-height:260px){.cd{width:340px;gap:12px;padding:18px 20px 20px}
.hd svg{width:56px}
.hd small{font-size:13px}
.mo{width:52px;height:52px}
.mo svg{width:32px}
.go{height:40px;font-size:15px}
}
@media (prefers-reduced-motion:reduce){.st,.mo.sq{animation:none}
.mo{transition:none}
}
</style>

<div class="s">
  <i class="st a" aria-hidden="true">✦</i><i class="st b" aria-hidden="true">✦</i><i class="st c" aria-hidden="true">♡</i>
  <div class="cd">
    <div class="hd">
      <svg viewBox="0 0 60 60" aria-hidden="true"><ellipse cx="20" cy="16" rx="7" ry="15" fill="#ffd1e6"/><ellipse cx="40" cy="16" rx="7" ry="15" fill="#ffd1e6"/><ellipse cx="20" cy="17" rx="3" ry="10" fill="#ffb3d4"/><ellipse cx="40" cy="17" rx="3" ry="10" fill="#ffb3d4"/><circle cx="30" cy="38" r="20" fill="#fff0f7"/><circle cx="23" cy="37" r="2.4" fill="#5c1a3d"/><circle cx="37" cy="37" r="2.4" fill="#5c1a3d"/><path d="M27 42q3 3 6 0" fill="none" stroke="#5c1a3d" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="18" cy="43" rx="4" ry="2.4" fill="#ff8fc0" opacity=".7"/><ellipse cx="42" cy="43" rx="4" ry="2.4" fill="#ff8fc0" opacity=".7"/></svg>
      <div><b>今天的心情是？</b><small>10 月 29 日 · 周四</small></div>
    </div>
    <div class="md">
      <button type="button" class="jl mo" aria-label="开心" aria-pressed="true"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="10" r="1.6" fill="#5c1a3d"/><circle cx="16" cy="10" r="1.6" fill="#5c1a3d"/><path d="M7 14q5 5 10 0" fill="none" stroke="#5c1a3d" stroke-width="1.8" stroke-linecap="round"/></svg></button>
      <button type="button" class="jl mo" aria-label="平静" aria-pressed="false" style="--c1:#c4f3e3;--c2:#9fe8cf"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10h4M14 10h4M9 15h6" fill="none" stroke="#5c1a3d" stroke-width="1.8" stroke-linecap="round"/></svg></button>
      <button type="button" class="jl mo" aria-label="困困" aria-pressed="false" style="--c1:#e2d6ff;--c2:#cdb8ff"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10q2 2 4 0M14 10q2 2 4 0" fill="none" stroke="#5c1a3d" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16" r="1.8" fill="#5c1a3d"/></svg></button>
      <button type="button" class="jl mo" aria-label="委屈" aria-pressed="false" style="--c1:#fff0b8;--c2:#ffe58a"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="10" r="1.6" fill="#5c1a3d"/><circle cx="16" cy="10" r="1.6" fill="#5c1a3d"/><path d="M8 17q4-4 8 0" fill="none" stroke="#5c1a3d" stroke-width="1.8" stroke-linecap="round"/></svg></button>
    </div>
    <button type="button" class="jl go">记下来 ♡</button>
    <p class="msg" role="status"></p>
  </div>
</div>

<script type="module">
export default function demo(root) {
  const ms = [...root.querySelectorAll('.mo')], msg = root.querySelector('.msg');
  ms.forEach((b) => (b.onclick = () => {
    ms.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    b.classList.remove('sq'); void b.offsetWidth; b.classList.add('sq');
  }));
  const go = root.querySelector('.go');
  go.onclick = () => {
    const on = ms.find((x) => x.getAttribute('aria-pressed') === 'true');
    go.textContent = `记好啦：${on.getAttribute('aria-label')} ☆`; msg.textContent = go.textContent;
  };
}
</script>
