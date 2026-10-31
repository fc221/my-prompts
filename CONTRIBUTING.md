# 参与贡献

欢迎补充条目、示例和新领域。内容写在 Markdown 文件里，一条一个文件，按“领域 → 板块 → 分类 → 条目”分目录存放。文件放进对应目录就会出现在网页上：不用改网页代码，也不用在任何地方登记。

## 目录结构

```
domains/
  frontend/                    领域：前端（另有 backend/、api/、pdf/、word/、excel/，结构相同）
    _domain.md                 领域：名称、顺序、搜索提示；正文“## 说明”“## 通用要求”
    _shared/                   示例共用的样式（.css）和小工具（.ts），下划线开头，不是板块
    layouts/                   板块：目录名就是板块 key
      _section.md              板块：名称、图标、颜色、顺序；正文是板块介绍
      app-home/                分类：目录名用英文短名
        _category.md           分类：名称、顺序
        l-app-bento.md         条目：一条一个文件，文件名就是条目 id；文字、示意图和实时示例都在里面
        …
      settings/
        l-set-hub.md
        …
      admin/ …
    components/ effects/ interactions/ architecture/ foundations/ styles/ prompts/ checklists/
src/
  adapter/content.ts           解析和组装：把上面这些文件变成网页数据（网页和校验脚本共用）
  adapter/index.ts             内容适配层 '#kb'，内容里的 .ts 文件从这里引类型
  types.ts                     数据结构：条目、示例、布局示意图的字段
scripts/
  validate.mjs                 校验数据和目录结构；--browser 在无头浏览器里挂载示例
  demo-harness.mjs             示例测试台：测一条或一个分类（不用打包）
```

**顺序**：板块、分类、条目都按头部的 `order` 排，数字小的在前；没写 `order` 的排在最后，再按目录名或文件名排。现有内容按 10、20、30… 编号，插到中间时取中间值（如 15），后面的不用重新编号。

前端领域的板块和条目 id 前缀：

| 板块     | 目录           | id 前缀 |
| -------- | -------------- | ------- |
| 设计     | `foundations`  | `f-`    |
| 风格     | `styles`       | `st-`   |
| 布局     | `layouts`      | `l-`    |
| 组件     | `components`   | `c-`    |
| 特效     | `effects`      | 无前缀  |
| 交互     | `interactions` | `i-`    |
| 框架设计 | `architecture` | `ar-`   |
| 提示词   | `prompts`      | `p-`    |
| 自查清单 | `checklists`   | `k-`    |

其他领域的条目 id 前缀：后端 `be-`（提示词 `be-p-`），API `api-`（提示词 `api-p-`），PDF `pdf-`，Word `w-`（提示词 `w-p-`），Excel `x-`（提示词 `x-p-`）。

## 放到哪

动手前先定两件事：这条内容归哪个板块，已有条目能不能容下它。

| 内容是什么                               | 放进     | 例子                         |
| ---------------------------------------- | -------- | ---------------------------- |
| 全站通用的规则和判断依据，不绑定某个控件 | 设计     | 字号阶梯、筛选的查询时机     |
| 一套完整的视觉语言                       | 风格     | 瑞士网格                     |
| 一整页或一个区块的骨架                   | 布局     | 列表页（筛选 + 表格）        |
| 一个可复用的控件，连同它的各种模式       | 组件     | 树形控件（展示、单选、多选） |
| 几种控件之间怎么挑                       | 设计     | 消息提示的七档强度           |
| 去掉后功能不变的视觉动效                 | 特效     | 打字机文字                   |
| 一段操作过程：手势、联动、状态反馈       | 交互     | 拖拽排序、乐观更新           |
| 工程上的结构和约定                       | 框架设计 | 目录结构                     |
| 复制给 AI 直接用的整段任务               | 提示词   | 整站翻新                     |
| 逐项核对的检查表                         | 自查清单 | 交付前总清单                 |

- **一个控件一条**：同一控件的不同模式写成主条目加案例（头部 `of`），不另开一条。日期范围、月份选择都是「日期与时间选择」的案例；“一种控件有几种样子”的对比（如「标签页的六种样式」）也是那个控件的案例，跨几种控件的对比才放进设计板块的「怎么选」。
- **一个症状一条**：提示词按症状归组，去掉配色的 AI 味是「去掉整页 AI 感」的案例；只是条件不同的提示词不另开一条。
- **先补再加**：已有条目容得下的新规则补进它的要点，新叫法写进 `aka`。主体和适用场景都不同才新开一条。
- **规则跟着控件走**：同一类控件的行为要一致。改了标签的显示规则，用到它的「树形控件」「多选与标签输入」一起改。
- **分类看主体**：特效先看由什么驱动，滚动驱动的归“滚动”，形状本身在变的归“形态变化”，页面切换归“光标与转场”，其余按作用的对象归“文字”“图片”“按钮”等。
- **同类挨着放**：分类内按主题排 `order`，相关条目相邻，不按收录先后追加到末尾。

## 加一条

在分类目录里新建 `<id>.md`，文件名就是条目 id：小写字母数字和连字符，全库唯一。板块和分类由所在目录决定，不用写。

`domains/frontend/interactions/feedback/i-example.md`：

```md
---
zh: 中文名
en: English name
order: 40
---

## 是什么

一句话：是什么、长什么样。

## 适合

适合什么场景。

## 不适合

不适合什么场景，以及改用什么。

## 注意

最容易做错的地方。

## 要点

- 要点每条一句，具体到数值、状态、键盘和读屏、减少动态效果时怎么办
- 一条一行，用“- ”开头

## 提示词

复制给 AI 直接能用的一段话，要替换的对象写成 {占位}。
```

- 头部写在两行 `---` 之间，每行 `键: 值`，只认 `zh`、`en`、`aka`、`order`、`of`、`tab`、`preview`。`aka` 是别名，写别处常见的叫法（空格分隔），只参与搜索，比如「图标柔和替换」写 `aka: 汉堡变叉 菜单图标变叉`。`of`、`tab`、`preview` 见下面“一条下面放几个案例”。
- 正文里用「名称」提到别的条目时，名称和那一条的 `zh` 一字不差，详情页会把它变成可点的链接。
- 文字段落只能用这六个标题：`## 是什么`、`## 适合`、`## 不适合`、`## 注意`、`## 要点`、`## 提示词`。不需要的段落直接不写；第一个标题之前不要写正文。另外两个段落放代码：`## 示意图`（见下）和 `## 示例`（必须是最后一段，见下）。
- 必填：`zh`、`## 是什么`、`## 提示词`。
- 提示词里写 `{{要点}}`，会展开成编号的要点清单。自查清单用它保证清单和提示词一致，写法见 `checklists/` 里的条目。

放错层级、缺 `_category.md`、用了不认识的段落或头部字段，`npm run check` 都会报出来。

### 一条下面放几个案例

同一个控件的不同模式、同一个症状的几种情况，写成一条主条目加几个案例，网页上是一张卡片、一排可切换的按钮，像组件库文档里的多个例子：

```md
---
zh: 日期范围
of: c-date
tab: 日期范围
order: 64
---
```

- `of` 写主条目的 id，必须在同一个分类里；`tab` 是切换按钮上的字，不写就用 `zh`。
- 案例和主条目放在同一个分类目录里，自己是一个 `.md`。没写的段落跟主条目走：只想换示例、文字和提示词都一样时，`.md` 里只写头部就行。
- 案例不单独出现在列表、统计和分类数里，搜索命中案例时卡片直接切到它。
- 主条目自己有示例时是第一个案例，给它也写一个 `tab`。
- `preview: <id>` 借用另一条的示例或示意图当预览，用在整页提示词这类自己没有界面可画的条目上，比如「后台列表页」借「列表页（筛选 + 表格）」的示意图。

### 实时示例：`## 示例`

条目最后一段 `## 示例` 就是它的实时示例，可以不写。共用样式、样式、结构和脚本按下面的样子写在这一段里：

```html
<link rel="stylesheet" href="../../_shared/interactions-base.css" />
<style>
  .st {
    padding: 10px 14px;
  }
  .msg {
    margin: 0;
    font-size: 12px;
  }
</style>

<div class="st">
  <button type="button" class="ctl">重播</button>
  <p class="msg" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const msg = root.querySelector('.msg');
  root.querySelector('.ctl').addEventListener('click', () => {
    msg.textContent = '已重播';
  });
}
</script>
```

- `## 示例` 之后的全部内容都算示例，所以它必须是最后一段。构建时这样拆：`<link rel="stylesheet" href="…">` 引入的共用样式放在最前，`<style>` 里的样式接在后面；`<script type="module">` 里 `export default function demo(root)` 是示例脚本；其余部分是示例结构。这三种标签照上面的样子写，不要加别的属性，否则认不出来。
- 只有结构和样式、不需要脚本的示例，可以不写 `<script>`。
- `export default` 必须顶格写：构建和校验都按行首匹配，缩进了示例就挂不上。
- 「怎么选」这类“一种东西有几种做法”的条目用 `_shared/pick.ts`：`pick(root, [{ name, fit, html, init }])` 生成一排种类和当前种类的小样，样式用 `<link>` 引入 `_shared/pick.css`。
- 示例在 Shadow DOM 里渲染，`demo(root)` 拿到的是影子根。示例自带底色和字体，不受网页主题影响。
- 同一组示例共用的样式基底放在 `_shared/*.css`，用 `<link>` 引入；共用的小工具放在 `_shared/*.ts`，在脚本里 `import { fit } from '../../_shared/app-phone.ts'`（要写 `.ts` 后缀）。
- 示例要构建时才接上脚本，写示例时用 `demo-harness` 或 `npm run dev` 看。
- 示例框的高度是固定的：列表卡片 196px（宽约 296–360px），详情 320px（布局板块是 400px）。几种尺寸都要能看、能用、不裁字：窄的时候用 `@container` 查询收紧；网格列写 `minmax(0, 1fr)`。示例宿主本身是尺寸容器，`@container` 里写根元素（如 `.st`）也会生效。
- 测试台会查文字有没有被裁切、有没有撑出自己的框。跑马灯、滑开露出按钮的列表项、横滑时露出半张的卡片这类故意裁切的效果，在裁切的容器上加 `data-clip`，测试台就跳过里面的文字。
- 减少动态效果时，共用样式会给所有属性加一个极短的过渡，改完尺寸或位置马上测量会拿到旧值；需要“改完就量”的元素单独写 `transition: none`。
- 挂载后最好自动演示一次，停在能说明效果的状态，缩略图才不会一片空白。
- 重播、模拟操作这类控制按钮用 `class="ctl"`，外观由宿主统一提供。其他 `<button>` 要自己写完整样式，不能露出浏览器默认的灰按钮。
- 不引用外部资源（图片、字体、CDN）：照片用 CSS 渐变画，图标用内联 SVG。不用 `position: fixed`、`alert`、`eval`、`new Function`。
- 定时器和 `requestAnimationFrame` 循环要在 `!root.host.isConnected` 时停止。
- 支持减少动态效果，键盘能操作，状态变化用 `role="status"` 播报。手势要有按钮或键盘替代。

### 提示词的预览

提示词条目的示例画“改前 / 改后”（需求整理类画“你说的 / AI 整理出来的”），用共用外壳 `_shared/fix.css`：

```html
<link rel="stylesheet" href="../../_shared/fix.css" />
<style>
  .c {
    padding: 8px;
  }
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c">…</div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c">…</div></div></section>
</div>
```

两栏是同一块界面、同样的内容，只有问题处不同。按 11px 字、每栏约 150×155px 画，详情里会放大。纯静态就够，症状要动起来才看得出的再写脚本。

### 文字条目的示意图

架构、后端、API、PDF 这类没有界面可演示的条目，示例用共用的画图工具 `domains/frontend/_shared/diagram.ts`（样式 `diagram.css`）画一张示意图。用法见文件开头和每个函数上面的注释：

```html
<link rel="stylesheet" href="../../../frontend/_shared/diagram.css" />

<script type="module">
import { draw, tree } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(
    root,
    tree(`
src/
  app/          路由和全局 Provider
* features/     按业务领域分
`),
    { title: '目录结构' },
  );
}
</script>
```

- 前端条目写 `../../_shared/`，其他领域写 `../../../frontend/_shared/`。
- 图的种类：`tree` 目录树、`stack` 分层、`rings` 同心层、`flow` 流程、`seq` 时序、`boxes` 模块格、`code` / `http` 代码和报文、`page` PDF 页面。两张都短时可以并排：`draw(root, [a, b])`。
- `draw` 会按示例框缩放，卡片里放不下时裁掉底部并渐隐，所以最要紧的内容放在上面。
- 报文里的地址写相对路径（校验禁止 `http://`、`https://`）。

### 布局示意图：`## 示意图`

`## 示意图` 段里放一个 ```js 围栏，导出 `wire`（和可选的 `wireMobile`）：

````md
## 示意图

```js
export const wire = {
  cols: '200px 1fr',
  rows: 'auto 1fr',
  areas: ['hd hd', 'nav main'],
  boxes: {
    hd: { label: '页面标题', kind: 'heading', text: '设置' },
    nav: { label: '分类导航' },
    main: { label: '设置表单', acc: true },
  },
};
// 手机版（可选）：export const wireMobile = { … };
```
````

示意图是一个 CSS 网格。每个区域写一个短标签，网页按标签画出对应的迷你界面，推断规则在 `src/mock/infer.ts`。

- 围栏里只导出 `wire` 和 `wireMobile`，字段见 `src/types.ts` 的 `Wire`。
- 同一个词在不同场景意思不同时，直接写 `kind`（如登录页的“账号”写 `kind: 'input'`）。
- `text` 是画面里显示的文案；`acc: true` 描边高亮主体区域；`inner` 嵌套子网格；`drawer` 画抽屉或底部面板。
- 靠构图和配色出效果、示意图画不出来的页面（如 App 首页），改写 `## 示例`，写法参照 `layouts/app-home/`。

## 加分类、板块、领域

**加分类**：在板块目录里新建一个目录（英文短名，如 `app-control/`），放一个 `_category.md`，再把条目放进去：

```md
---
name: App 控件
order: 90
---
```

**加板块**：在领域目录里建一个子目录（目录名就是板块 key），放 `_section.md`，正文是板块介绍：

```md
---
name: 图表
icon: stack
color: '#0ea5e9'
order: 90
---

一两句话介绍这个板块。
```

图标名见 `src/components/AppIcon.vue`。

**加领域**（如 PDF）：新建 `domains/pdf/_domain.md`：

```md
---
name: PDF
icon: box
order: 2
searchHint: 搜索 PDF 条目，如 合并、加水印
---

## 说明

一两句话介绍这个领域。

## 通用要求

单条复制时自动附在提示词后面的底线要求。
```

条目 id 用领域自己的前缀（如 `pdf-`）。网页会自动发现新领域，它在侧栏里是一个可折叠的分组，板块列在分组下面；侧栏收起时整个领域只显示 `icon` 一个图标，悬停或点击弹出它的板块。

## `#kb` 适配层

网页只认 `src/types.ts` 里摊平后的数据，把目录里的文件变成这份数据的是 `src/adapter/content.ts`。`package.json` 的 `imports` 把 `'#kb'` 指到 `src/adapter/index.ts`，导出：

- `buildDomains`：按目录组装“领域 → 板块 → 分类 → 条目”，按 `order` 排序，给条目补上 `sec`、`cat`，结构问题收进 `problems`。网页加载器 `src/kb.ts` 和校验脚本共用它。
- `parseEntry`、`splitFrontmatter`、`splitSections`：解析条目 Markdown。
- `splitExtras`：把条目文件拆成文字、`## 示例` 和 `## 示意图` 三部分；`parseDemoHtml`：再把示例拆成结构、样式和脚本。构建时由 `vite.config.ts` 里的 `kb-content` 插件按 `?entry` / `?demo` / `?wire` 三种查询调用，校验脚本和测试台也用它们。
- 类型：`Entry`、`Demo`、`Wire`、`WireBox`、`MockKind` 等。内容里的 `.ts` 文件只从 `'#kb'` 引类型，不直接引用网页源码。

要给条目加一种新的段落，先改 `content.ts` 的 `splitExtras`，再在 `vite.config.ts`（插件）和 `scripts/validate.mjs`（目录扫描）里各加一处读取。

## TypeScript 约定

- 内容里的 `.ts` 只有两种：布局示意图 `*.wire.ts` 和 `_shared/*.ts` 小工具。示例 HTML 里的脚本是普通 JS，不做类型检查。
- 校验脚本和测试台用 Node 直接运行 `.ts`，只能用能直接擦除的写法：类型用 `import type`，不用 `enum`、`namespace`、构造函数参数属性。
- 本地文件 import 要写 `.ts` 后缀。
- 内容里的 `.ts` 单独用 `tsconfig.domains.json` 做类型检查：`Wire` 的字段、`kind` 等结构严格检查；`_shared/` 里的 DOM 脚本放宽，不要求处处判空。

## 内容约定

- 内容自己写，不照搬别人的标题、示例文案和数值。
- 条目名写用途，能看出“做什么 + 对象”，如“优化后台查询体验”。症状放进 `aka` 和“是什么”，搜索照样能找到。
- 示例里的品牌位（logo、产品名、文档落款、作品集和简历署名）统一写 MyPrompts；订单客户、员工表这类多条数据用互不相同的名字。
- 提示词写法（按生成测试总结）：
  - **占位统一叫法**：产品名一律写 `{产品}`；数量写清是什么，如 `{套餐数}`、`{步数}`，不要都写 `{N}`。
  - **界面上的运行时数字不加花括号**：“已选 N 项”里的 N 是实际数量，写成 N。
  - **写清楚会被猜的细节**：比较口径、时间范围、按钮语义（“重置”是恢复默认还是恢复到上次提交）、键盘怎么触发、错误提示怎么关。
  - **规则之间不打架**：不要同时要求“表头吸顶”和“横向滚动”这类做不到的组合。和常用条目组合时说法要一致。
  - **不重复底线**：单条复制会自动附上领域的通用要求（对比度、横向溢出等）。组合复制会在开头加“我要做的是……”并列出本次涉及的占位。条目里不用重复写这些。

## 提交前自测

```
npm run check                                                        # 字段、id、禁用词、示意图网格、目录结构（放错层级、认不出的文件、缺 _category.md、不认识的段落）
npm run build                                                        # 网页和内容两套类型检查 + 打包
npm run format                                                       # 统一代码格式；domains 下的 .md 和示例 .html 不参与（见 .prettierignore）
node scripts/demo-harness.mjs domains/frontend/interactions/feedback/i-example.html /tmp/kb-demo [--tests 测试.mjs] [--reduce]   # 也可以传 .md 或整个分类目录
node scripts/validate.mjs --browser frontend.interactions --shots /tmp/kb-shots --detail
```

`demo-harness` 把一条（或整个分类）的示例挂到卡片、窄卡片、详情三种尺寸，报告 JS 错误、文字被裁切和默认样式按钮，并给每个条目截图。`--tests` 可以写操作测试：`export default { 'i-example': async (root, sleep) => '状态描述' }`。

## Issue 和 Pull Request

**Issue**：选“问题反馈”或“内容建议”模板。提之前先在[网站](https://fc221.github.io/my-prompts/)上搜一下，确认条目是否已有。

**分支**：

- `main` 是线上版本，合并后自动部署到网站。只能通过 PR 合并，不能直接推送。
- `beta` 是开发分支，日常改动都进这里，攒够一批后开 `beta` → `main` 的 PR。
- 外部贡献从 `beta` 拉分支，PR 的目标选 `beta`，不要选 `main`。

**Pull Request**：

- 一个 PR 只做一件事。比如只加一个分类的条目，不顺手重排别的内容。`beta` → `main` 的 PR 是一批改动，不受这条限制。
- 标题就是合并提交的标题，写成“类型：说明”，类型有内容、修复、功能、文档、工程，如 `内容：新增工资条模板`、`修复：窄卡片标题被裁切`。
- 只用 Merge commit 合并。Squash 会让 `beta` 和 `main` 的历史分叉，下一次 PR 又带上旧改动。
- 合并到 `main` 后把 `beta` 快进到 `main`：`git checkout beta && git pull --ff-only origin main && git push`。
- 提交信息不加 `Co-Authored-By`。
- 改了示例或界面要附截图。
- CI 会跑 `prettier --check`、`npm run check`、`npm run build`，合并到 `main` 必须全部通过。
