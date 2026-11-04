---
zh: 代码规范与提交检查
en: Linting and commit checks
aka: ESLint Prettier Biome husky lefthook lint-staged commitlint 代码风格 提交钩子
order: 70
---

## 是什么

用工具自动守住代码风格和常见错误：格式化交给 Prettier 或 Biome，规则检查交给 ESLint（或 Biome、Oxlint），类型检查交给 tsc；提交前只查改动的文件，CI 再全量跑一遍。

## 适合

新项目搭规范；代码评审总在争缩进和引号；老项目想加规则，又怕一次冒出几千个报错。

## 不适合

目录之间的引用规则看「模块边界与依赖方向」；测试怎么分层看「前端测试分层」。

## 注意

格式化和规则检查分开管：用 eslint-config-prettier 关掉 ESLint 里所有格式类规则，否则两个工具会互相改来改去。老项目加新规则先设为 warn 并记录基线，修完再升成 error。

## 要点

- ESLint 用扁平配置 eslint.config.js（ESLint 9 起的默认格式），基础规则加 typescript-eslint 的类型感知规则，再加框架插件（eslint-plugin-react-hooks、eslint-plugin-vue、eslint-plugin-svelte、angular-eslint）。
- 格式化只用一个工具：Prettier（.prettierrc 只写和默认不同的几项，如 printWidth 100、singleQuote）或 Biome 二选一。
- 重点规则：@typescript-eslint/no-floating-promises、react-hooks/exhaustive-deps（React 项目）、未使用变量报错（下划线开头的例外）、no-explicit-any 设为 warn、console.log 报错（console.warn 和 console.error 放行）。
- 提交前钩子：husky 或 lefthook 加 lint-staged，只对暂存文件运行 eslint --fix 和格式化，10 秒内跑完；类型检查和测试放到 CI。
- 提交信息用约定式格式 type(scope): 描述，type 限定为 feat、fix、refactor、perf、test、docs、chore、build、ci，用 commitlint 校验。
- CI 必跑三项：lint（--max-warnings 0，或与基线比较）、typecheck（tsc --noEmit，Vue 用 vue-tsc，Svelte 用 svelte-check）、test，任一失败阻断合并。
- 编辑器统一：.editorconfig 定缩进和换行，仓库附推荐扩展列表，保存时自动格式化。
- 局部关闭规则要写清楚：eslint-disable-next-line 后面跟具体规则名和原因；整文件关闭只用于生成的代码，并把生成目录加进忽略列表。

## 提示词

请为{产品}搭建或整理代码规范和提交检查。先读现有的 ESLint、Prettier、tsconfig、git 钩子和 CI 配置，跑一次全量 lint 和类型检查，把错误数和警告数记为基线。
按规则改：
1. ESLint 改为扁平配置 eslint.config.js，接入 typescript-eslint 类型感知规则和{框架}插件，用 eslint-config-prettier 关掉格式类规则。
2. 格式化只保留 Prettier 或 Biome 其中一个，配置只写和默认值不同的几项。
3. 用 husky 或 lefthook 加 lint-staged，只检查暂存文件，10 秒内完成。
4. 用 commitlint 校验约定式提交信息。
5. CI 跑 lint、类型检查和测试，任一失败阻断合并。
6. 新加的规则先设为 warn 并记基线；能自动修复的先修，剩下的列成清单。
全量格式化产生的改动单独一次提交，和逻辑改动分开。
完成后汇报新增或修改的配置文件、基线前后的错误和警告数；验证：提交一个带 console.log 和格式问题的文件，确认钩子会拦截或自动修复。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: '保存', note: '.editorconfig，自动格式化' }, { t: 'pre-commit', note: 'lint-staged 只查暂存文件', via: '提交', acc: true }, { t: 'commit-msg', note: 'commitlint：type(scope): 描述' }],
    [{ t: 'lint', note: '--max-warnings 0' }, { t: 'typecheck', note: 'tsc --noEmit' }, { t: 'test' }, { t: '阻断合并', note: '任一失败', bad: true, via: '失败' }],
  ]), { title: '本地只查改动，10 秒内 · CI 全量再跑' });
}
</script>
