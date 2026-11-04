---
zh: Angular 项目约定
en: Angular project conventions
aka: Angular 独立组件 standalone signals 信号 zoneless 控制流 httpResource
order: 70
---

## 是什么

Angular 项目的约定，以 Angular 22 为准，v20 起的项目都适用：全部用独立组件，状态和输入输出用 signals，模板用内置控制流（@if、@for、@defer），新项目默认不依赖 Zone.js。

## 适合

企业级中后台、需要强约定和依赖注入的长期项目；把 NgModule 时代的老项目迁到独立组件和 signals。

## 不适合

小团队快速试错的项目和内容站，「前端框架怎么选」里有更轻的选项。

## 注意

各版本默认值不同，动手前先确认 package.json 里的版本：v19 起组件默认就是独立组件，不用再写 standalone: true；v20 起官方风格指南建议文件名去掉 .component 这类后缀（user-profile.ts）；v21 起新项目默认 zoneless、单元测试默认用 Vitest；v22 起默认变更检测策略是 OnPush（原来的 Default 改名为 Eager）。老项目沿用已有的文件命名，改名只在整体迁移时统一做。

## 要点

- 目录：src/main.ts（bootstrapApplication）、src/app/app.config.ts（provideRouter、provideHttpClient 和拦截器）、src/app/app.routes.ts；src/app 下按领域分目录（orders/、members/，对应「目录结构」里的 src/features/<领域>），每个领域自带 *.routes.ts、组件和服务；src/app/core 放请求客户端、拦截器和全局状态服务（对应 src/api 和 src/stores）；src/app/shared/ui 放基础组件（对应 src/components/ui）。领域内部按功能放文件，不再细分 components/、services/ 这种类型目录。
- 组件：一个文件一个组件，模板和样式同名（order-list.ts、order-list.html、order-list.css）；输入输出用 input()、input.required()、output()、model()；依赖用 inject() 注入；变更检测用 OnPush。
- 模板：用 @if、@for（必须写 track）、@switch 替代 *ngIf、*ngFor；首屏以下的重组件用 @defer (on viewport) 延迟加载，并写 @placeholder。
- 状态：组件和服务里用 signal、computed；需要随输入重置的可写状态用 linkedSignal；跨组件共享的状态放在 providedIn: 'root' 的服务里，对外只暴露 asReadonly() 的只读 signal；effect 只用来同步到外部（本地存储、日志），派生一律用 computed。
- 数据：HttpClient 封装在功能服务里；读取型请求用 httpResource（v22 起和 resource、rxResource 一样是稳定 API），参数 signal 变化时自动重新请求，加载中、错误和值都是 signal；写操作仍调用 HttpClient 的方法；RxJS 留给事件流、防抖、取消这类场景，和 signal 之间用 toSignal、toObservable 转换。
- 路由：功能路由用 loadChildren 懒加载 *.routes.ts，单个页面用 loadComponent；守卫和解析器写成函数（CanActivateFn、ResolveFn）。
- 样式：组件样式默认封装，全局令牌放 styles.css 的 CSS 变量；需要让父组件改子组件样式时，由子组件暴露 CSS 变量，替代已废弃的 ::ng-deep。
- 命令：ng serve、ng build、ng test（新项目默认 Vitest，老项目可能还是 Karma）、ng lint（angular-eslint）、端到端用 Playwright；生成代码用 ng generate，升级用 ng update，迁移用官方 schematic：@angular/core:standalone、@angular/core:control-flow、@angular/core:signal-input-migration、@angular/core:inject。

## 提示词

请按约定整理{产品}的 Angular 项目。先读 package.json（确认版本）、angular.json、main.ts、路由和典型领域目录，列出：NgModule、*ngIf 和 *ngFor、@Input 和 @Output、构造函数注入所在的位置，是否依赖 Zone.js，用的哪个测试运行器。
约定：
1. 组件全部改为独立组件，用 ng generate @angular/core:standalone 迁移，删掉空的 NgModule。
2. 模板改用内置控制流，@for 写 track，先跑官方 control-flow 迁移再人工检查。
3. 输入输出改为 input()、output()、model()，注入改为 inject()。
4. 状态用 signal 和 computed，共享状态放服务并只暴露只读 signal。
5. 功能路由用 loadChildren 懒加载，守卫写成函数。
6. 目录按领域分，core 放请求客户端和全局状态服务，shared/ui 放基础组件。
7. 变更检测用 OnPush；版本支持且第三方库兼容时，再切换到 zoneless。
每步单独提交，跑 ng build 和 ng test；文件命名沿用现有风格。
完成后汇报改了哪些文件、每类迁移的数量、还没迁的部分和原因。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
src/
  main.ts               bootstrapApplication
  styles.css            全局令牌 CSS 变量
  app/
*   app.config.ts       provideRouter、provideHttpClient
*   app.routes.ts       功能路由 loadChildren 懒加载
    core/               请求客户端、拦截器、全局状态服务
    shared/ui/          基础组件
*   orders/             按领域分，不再分类型目录
      orders.routes.ts  单个页面 loadComponent
      order-list.ts     独立组件，OnPush
      order-list.html   @if、@for 写 track
      order-list.css    样式默认封装
    members/
`), { title: 'Angular 22 · 独立组件 + signals' });
}
</script>
