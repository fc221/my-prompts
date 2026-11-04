---
zh: 二次元清爽（冷白）
en: Anime fresh
order: 10
---

## 是什么

冷白底、深藏青描边、樱粉天蓝撞色，硬投影贴纸加网点装饰，明亮有元气。

## 适合

游戏官网、动漫与虚拟主播、ACG 社区、面向年轻人的工具产品。

## 不适合

不要用纯黑描边和文字；装饰不要压在正文上；不要使用他人作品里的角色。

## 要点

- 配色：冷白底 #f5f7ff，深藏青 #1d2452 做文字、描边和硬投影；樱粉 #ff5fa2、天蓝 #39b7ff、柠檬黄 #ffd43b 中选 2–3 个，主色做按钮，其余只做装饰
- 形状：卡片和按钮 2–3px 藏青描边，硬投影 4px 4px 0 #1d2452 统一方向；圆角 12–20px 或切角分格
- 字体：标题用粗圆体或系统粗体加错位投影；正文系统字体 16px / 行高 1.7，放在实底上
- 装饰：网点、速度线、星星、对话气泡一律 aria-hidden，不压正文
- 配图：原创角色立绘或几何化吉祥物，做首屏视觉中心
- 动效：贴纸弹出 scale(0.8 → 1.05 → 1)、悬停轻摇 ±3°、角色待机浮动 4–6px / 3–4s；同屏循环 ≤ 3 处，减少动态效果时全部停止
- 高饱和色块上的文字用藏青，逐一核对对比度 ≥ 4.5:1

## 提示词

把{作品名}官网首页做成二次元清爽风：冷白底 #f5f7ff，深藏青 #1d2452 做文字、2–3px 描边和 4px 4px 0 硬投影；{品牌色}做主按钮，樱粉、天蓝、柠檬黄中再选 1–2 个只作装饰；圆角 16px，标题粗体加错位投影，正文 16px / 1.7 放实底上；首屏以原创角色为中心，配对话气泡和网点（aria-hidden）；贴纸弹出、悬停轻摇 ±3°、角色待机浮动，同屏循环 ≤ 3 处，减少动态效果时停止；窄屏角色移到标题下方并缩小。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:flex;align-items:center;justify-content:center;gap:12px;padding:16px 20px;overflow:hidden;background:#f5f7ff;color:#1d2452;font:12px/1.6 system-ui,"PingFang SC",sans-serif}
.dots{position:absolute;right:0;top:0;width:50%;height:75%;background:radial-gradient(#39b7ff 1.5px,transparent 1.8px) 0 0/10px 10px;opacity:.4;-webkit-mask-image:linear-gradient(225deg,#000,transparent 70%);mask-image:linear-gradient(225deg,#000,transparent 70%)}
.tx{position:relative;flex:1.2;min-width:0;max-width:320px}
.tg{display:inline-block;padding:0 8px;border:2px solid #1d2452;border-radius:999px;background:#ffd43b;font-weight:700;transform:rotate(-3deg)}
h1{margin:6px 0 12px;font-size:clamp(19px,11cqh,36px);line-height:1.25;font-weight:900;text-shadow:2px 2px 0 #ff5fa2}
a{display:inline-flex;height:36px;align-items:center;padding:0 16px;border:3px solid #1d2452;border-radius:14px;background:#39b7ff;color:#1d2452;font-weight:800;box-shadow:4px 4px 0 #1d2452;cursor:pointer;transition:.16s cubic-bezier(.2,0,0,1);transition-property:transform,box-shadow}
a:hover{transform:translate(-2px,-2px) rotate(-2deg);box-shadow:6px 6px 0 #1d2452}
.ch{position:relative;flex:1;max-width:180px;display:flex;flex-direction:column;align-items:center;gap:8px}
.bb{position:relative;padding:4px 12px;border:2px solid #1d2452;border-radius:12px;background:#fff;font-weight:700;white-space:nowrap}
.bb::after{content:"";position:absolute;left:50%;bottom:-7px;width:10px;height:10px;background:#fff;border:solid #1d2452;border-width:0 2px 2px 0;transform:translateX(-50%) rotate(45deg)}
svg{width:min(112px,50cqh);animation:fl 3.6s cubic-bezier(.45,0,.55,1) infinite alternate}
.st{position:absolute;right:4%;top:36%;font-style:normal;font-size:18px;color:#ff5fa2;animation:tw 2.4s cubic-bezier(.45,0,.55,1) infinite}
@keyframes fl{to{transform:translateY(-6px)}
}
@keyframes tw{50%{opacity:.3;transform:scale(.7)}
}
@media (prefers-reduced-motion:reduce){svg,.st{animation:none}
a{transition:none}
a:hover{transform:none}
}
</style>

<div class="s"><div class="dots" aria-hidden="true"></div><div class="tx"><span class="tg">公测开启</span><h1>和小团子一起<br>出发冒险！</h1><a>立即预约</a></div><div class="ch" aria-hidden="true"><div class="bb">今天也要加油哦</div><svg viewBox="0 0 100 90"><g stroke="#1d2452" stroke-width="3" stroke-linecap="round"><path d="M50 19q6-12 16-8M46 66q4 4 8 0" fill="none"/><path d="M16 66C16 34 30 19 50 19s34 15 34 47c0 12-14 18-34 18S16 78 16 66Z" fill="#fff"/></g><g fill="#1d2452"><ellipse cx="38" cy="54" rx="5" ry="7"/><ellipse cx="62" cy="54" rx="5" ry="7"/></g><g fill="#ff5fa2" opacity=".6"><ellipse cx="29" cy="66" rx="6" ry="3"/><ellipse cx="71" cy="66" rx="6" ry="3"/></g></svg><i class="st">✦</i></div></div>
