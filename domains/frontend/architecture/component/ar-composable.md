---
zh: 逻辑复用
en: Hooks & composables
aka: 自定义 Hook 组合式函数 composable custom hook mixin VueUse
order: 40
---

## 是什么

把不带界面的逻辑（分页、倒计时、轮询、权限判断、窗口尺寸、本地存储读写）抽成 React 自定义 Hook 或 Vue 组合式函数，几个组件共用一份实现，组件里只剩“用什么”和“怎么显示”。

## 适合

同一段“状态 + 副作用”组合出现在多个组件里；组件里脚本远比模板长；Vue 2 遗留的 mixin 要迁移。

## 不适合

带界面结构的复用抽组件，判断看「什么时候抽组件」；行为加无样式结构看「无头组件」；请求和缓存交给「服务端状态缓存」；多个页面共享同一份数据放「全局状态库」。

## 注意

hook / 组合式函数每调用一次就是一份独立的状态，不是单例。两个组件各调一次 useCart() 不会自动同步；要共享就把状态提到上层（Context / provide-inject 或 store）。

## 要点

- 命名 useXxx，一个文件一个，文件名与函数名一致（useCountdown.ts）；通用的放 src/hooks（React）或 src/composables（Vue），只属于某个领域的放 src/features/<领域>/hooks 或 composables。
- 同一段逻辑出现第 3 次再抽；只出现 2 次时先复制，并在两处注释里互相指向。
- 返回值：两个以内可以像 useState 一样返回数组，更多就返回对象，字段名自解释（data、loading、error、refresh）。
- Vue 的组合式函数返回 ref 而不是 reactive，调用方解构不丢响应性；参数接受 ref、getter 或普通值（MaybeRefOrGetter），内部用 toValue() 读取，并在 watch 里跟随变化（Vue 3.3 起）。
- React 的 hook 参数变化靠依赖数组触发；只在回调里读最新值、不该触发重跑的，用 ref 保存，或用 useEffectEvent（React 19.2 起）。
- 副作用成对清理：定时器、事件监听、订阅，React 在 effect 的返回函数里清，Vue 在 onScopeDispose 里清（在组件和 effectScope 里都有效）。
- 结果通过返回值或传入的回调交给组件，由组件决定弹提示、跳路由、改全局 store，这样同一个 hook 才能在不同页面复用；单个超过 150 行或返回超过 8 个字段就拆。
- 已装的工具库有的直接用：Vue 项目先查 VueUse，React 项目先查已装的 hooks 库（usehooks-ts、react-use 等）；防抖这种几行能写完的，不为它新装库。

## 提示词

在 {产品} 前端里找出重复的逻辑，抽成 {React 自定义 Hook / Vue 组合式函数}，行为不变：
1. 搜索重复出现的“状态 + 副作用”组合（倒计时、分页、轮询、窗口尺寸、本地存储读写、权限判断等），列出每种出现的文件和次数；同时检查项目已装的 VueUse 或 hooks 库是否已经提供。
2. 只抽出现 3 次及以上的；通用的放 src/hooks 或 src/composables，领域专属的放 src/features/<领域> 下；命名 useXxx，返回对象，Vue 返回 ref。
3. 替换全部调用处：初始值、触发时机、清理时机和错误处理与原来一致；弹提示、跳路由留在组件里。
4. 给每个新 hook 写最小的单元测试：初始值、参数变化后的结果、卸载后已清理。
5. 汇报新建了哪些 hook、替换了多少处、哪些重复因为只出现 2 次暂不处理。
