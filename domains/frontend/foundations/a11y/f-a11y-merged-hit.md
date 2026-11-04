---
zh: 合并热区，不留死缝
en: Merged tap area
order: 10
of: f-a11y-target
tab: 合并热区
---

## 是什么

头像、名称、副标题指向同一个地方时，整块做成一个点击区域，中间的空隙也能点；而不是各绑一个事件，缝里点了没反应。

## 适合

信息流作者栏、列表行、缩略图加标题的卡片、带图标的设置项这类“几个元素一起表示同一个去处”的地方。

## 不适合

块里还有别的独立操作（关注、更多）时，这些按钮单独做热区并放在整块链接外面（链接里不能套按钮）；去处不同的元素不要硬合并。

## 注意

整块是一个链接时，名称要包含主要文字（读屏读“林知远的主页”），里面的头像 alt 设为空，避免重复朗读。

## 要点

- 同一去处的头像、名称、副标题包进一个 a 或 button，热区覆盖它们之间的空隙，不给每个元素单独绑点击
- 块内的独立操作（关注、更多）放在链接外面的兄弟节点上，热区 ≥ 44×44，和整块间隔 ≥ 8px 或用分隔线隔开
- 要“整张卡可点、卡里还有按钮”时，用标题链接的 ::after 铺满卡片，内部按钮用 position: relative 和 z-index 抬到上层
- 按下时整块一起给按下态（背景加深），让人知道点中的是整块
- 相邻两个不同去处的热区要么紧挨着，要么间隔 ≥ 8px 且各自 ≥ 44px；不要留 2–6px 这种点了没反应、又看不出是间隔的缝
- 验收：给可点元素加 outline 显示热区，在 390px 宽下逐个点块内的空隙，都应有响应

## 提示词

检查{页面}里{作者栏或列表行}的点击区域：头像、名称、副标题指向同一个去处时，整块包进一个链接，热区覆盖它们之间的空隙，不要各绑一个点击事件；块里的独立操作（{独立操作}）放在链接外面，热区 ≥ 44×44，和整块间隔 ≥ 8px；需要整卡可点时用标题链接的 ::after 铺满卡片，内部按钮抬到上层；按下时整块一起变深；链接名称写成“{名称}的主页”，头像 alt 为空；相邻两个不同去处的热区不留 2–6px 的死缝。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css" />
<style>
  .st {
    padding: 10px 14px;
  }
  .box {
    max-width: 460px;
    height: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    gap: 8px;
  }
  .top {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .top b {
    flex: 1;
    min-width: 0;
    font-size: 13px;
  }
  .top .ctl {
    height: 28px;
    padding: 0 10px;
    font-size: 12px;
  }
  .row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px 6px 10px;
    border: 1px solid #e3e6eb;
    border-radius: 12px;
    background: #fff;
  }
  .lb {
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
    color: #98a2b3;
    font-size: 11px;
  }
  .au {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    border-radius: 10px;
    color: inherit;
    text-decoration: none;
  }
  .av {
    display: grid;
    place-items: center;
    flex: none;
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 50%;
    background: #e0e7ff;
    color: #3538cd;
    font-weight: 700;
  }
  .gap,
  .gp {
    flex: none;
    width: 10px;
    align-self: stretch;
  }
  .nm {
    display: grid;
    justify-items: start;
    min-width: 0;
    padding: 2px 4px;
    border: 0;
    background: none;
    text-align: left;
  }
  .nm b {
    font-size: 14px;
  }
  .nm small {
    color: #667085;
    font-size: 12px;
  }
  .more {
    flex: none;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 10px;
    background: none;
    color: #667085;
    font-size: 18px;
  }
  .one:active,
  .one.down {
    background: #f2f4f7;
  }
  .t:active {
    background: #f2f4f7;
  }
  .st.hit .t {
    outline: 2px dashed #12b76a;
    outline-offset: -2px;
  }
  .st.hit .bad .gap {
    background: repeating-linear-gradient(
      45deg,
      #fda29b 0 3px,
      transparent 3px 6px
    );
    border-radius: 3px;
  }
  .gap.flash {
    background: #f04438 !important;
  }
  .one.flash {
    background: #d1fadf !important;
  }
  .msg {
    margin: 0;
    color: #475467;
    font-size: 12px;
  }
  .msg b {
    color: #b42318;
  }
  .msg em {
    color: #067647;
    font-style: normal;
    font-weight: 600;
  }
  @container (max-width:400px) {
    .lb {
      display: none;
    }
  }
</style>

<div class="st">
  <div class="box">
    <div class="top">
      <b>同一个去处</b
      ><label class="sw"
        ><input type="checkbox" class="show" checked /><i></i>显示热区</label
      ><button type="button" class="ctl sim">点一下缝</button>
    </div>
    <div class="row bad">
      <span class="lb">分开绑定</span>
      <div class="au">
        <button type="button" class="av t">林</button
        ><span class="gap" aria-hidden="true"></span
        ><button type="button" class="nm t">
          <b>林知远</b><small>昨天 21:04 · 苏州</small>
        </button>
      </div>
      <button type="button" class="more t" aria-label="更多">⋯</button>
    </div>
    <div class="row good">
      <span class="lb">整块热区</span
      ><a href="#" class="au t one" aria-label="林知远的主页"
        ><span class="av" aria-hidden="true">林</span
        ><span class="gp" aria-hidden="true"></span
        ><span class="nm"
          ><b>林知远</b><small>昨天 21:04 · 苏州</small></span
        ></a
      ><button type="button" class="more t" aria-label="更多">⋯</button>
    </div>
    <p class="msg" role="status">点两行头像和名字之间的缝试试</p>
  </div>
</div>

<script type="module">
  export default function demo(root) {
    const st = root.querySelector(".st"),
      show = root.querySelector(".show"),
      msg = root.querySelector(".msg"),
      gap = root.querySelector(".bad .gap"),
      one = root.querySelector(".one");
    const flash = (el) => {
      el.classList.remove("flash");
      void el.offsetWidth;
      el.classList.add("flash");
      setTimeout(() => el.classList.remove("flash"), 500);
    };
    show.addEventListener("change", () =>
      st.classList.toggle("hit", show.checked),
    );
    st.classList.add("hit");
    gap.addEventListener("pointerdown", () => {
      flash(gap);
      msg.innerHTML = "<b>点在缝里：没有反应</b>，用户以为没点中，会再点一次";
    });
    root.querySelectorAll(".bad .av,.bad .nm").forEach((b) =>
      b.addEventListener("click", () => {
        msg.textContent = "打开了林知远的主页（分开绑定：要点准头像或名字）";
      }),
    );
    one.addEventListener("click", (e) => {
      e.preventDefault();
      flash(one);
      msg.innerHTML = "<em>打开了林知远的主页</em>：整块都能点，包括中间的缝";
    });
    root.querySelectorAll(".more").forEach((b) =>
      b.addEventListener("click", () => {
        msg.textContent = "打开了“更多”菜单（独立操作，单独的热区）";
      }),
    );
    const sim = () => {
      gap.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      setTimeout(() => {
        flash(one);
        msg.innerHTML =
          "<b>上面点在缝里没反应</b>；<em>下面整块热区照样打开主页</em>";
      }, 700);
    };
    root.querySelector(".sim").addEventListener("click", sim);
    setTimeout(sim, 500);
  }
</script>
