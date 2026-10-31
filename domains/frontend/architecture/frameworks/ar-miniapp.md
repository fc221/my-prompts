---
zh: 小程序与跨端
en: Mini programs and cross-platform
aka: 微信小程序 原生小程序 uni-app Taro 跨端 分包 多端
order: 90
---

## 是什么

做小程序时先在原生小程序、uni-app（Vue）、Taro（React，也支持 Vue）之间选型，再按各自的目录和配置约定组织页面、分包、请求和状态。

## 适合

新建微信小程序或多端小程序；同一套业务要同时出微信、支付宝等多家小程序，或再加 H5 / App；整理主包超限、页面散乱的小程序项目。

## 不适合

纯 H5 活动页用 Web 技术栈即可，见「前端框架怎么选」；重度依赖原生能力的 App 不在本条范围。

## 注意

跨端框架能省掉重复的页面代码，但抹不平平台差异：登录、支付、分享、订阅消息在各平台的 API 都不一样，要集中到一个适配层里，用条件编译或平台变量处理。微信小程序主包和单个分包都不能超过 2MB，所有分包合计不超过 20MB（以平台当前限制为准），立项时就规划好分包。

## 要点

- 选型：只做微信、要贴近平台能力和性能（Skyline 渲染、原生组件）→ 原生小程序加 TypeScript；团队会 Vue、要多端（含 App）→ uni-app（Vue 3 + Vite）；团队会 React、要多端或复用已有 React 代码 → Taro。选跨端前，在每个目标平台上把关键页面实测一遍。
- 原生目录：app.json（pages、subPackages、tabBar、preloadRule）、app.ts、app.wxss；pages/<页面>/index 下 .ts、.wxml、.wxss、.json 四个文件一组；components/、按业务命名的分包目录、api/（请求层）、stores/、utils/、project.config.json。
- uni-app 目录（CLI 项目都在 src/ 下）：pages.json（页面路由、分包、tabBar、导航栏，相当于 app.json 的页面部分）、manifest.json（各平台 appid 和配置）、App.vue、main.ts、pages/、components/（符合 easycom 规则时免手动引入）、api/（请求层）、stores/（Pinia）、static/、uni_modules/（插件）、uni.scss；平台差异用 #ifdef MP-WEIXIN 这类条件编译注释。
- Taro 目录：config/index.ts（编译配置，开发和生产分开）、src/app.config.ts（页面和分包）、src/app.ts、src/pages/<页面>/index.tsx 加同目录的 index.config.ts（页面配置）、src/components、src/api（请求层）、src/stores；平台判断用 process.env.TARO_ENV。
- 分包：主包只放 tabBar 页面和公共基础代码；按业务模块分包（订单、会员、门店各一个），用 preloadRule 预下载下一步可能进入的分包；图片放 CDN，不打进包里。
- 请求和登录：统一封装 wx.request / uni.request / Taro.request，处理基地址、超时、令牌注入和 401 后重新登录（wx.login 拿 code，后端换会话）；同时有多个请求返回 401 时只触发一次重新登录，其余排队重放。
- 状态和缓存：页面间少量共享用全局 store（原生可用 MobX 小程序绑定，uni-app 用 Pinia，Taro 用 Zustand 等）；本地缓存只存小体量、丢了能重新获取的数据（如登录令牌、最近选择的门店），手机号、身份证号这类个人信息不落本地。
- 命令和发布：原生项目用开发者工具或 miniprogram-ci 上传；uni-app 用 dev:mp-weixin、build:mp-weixin；Taro 用 dev:weapp、build:weapp；每次发版前看一遍代码依赖分析里的包体积。

## 提示词

请为{产品}做小程序选型或整理，目标平台是{目标平台}。先读现状（已有项目读 app.json / pages.json / app.config.ts、目录树、请求封装和包体积分析），列出：框架和版本、页面数量、主包和各分包体积、登录和请求的写法、平台差异代码散落在哪些文件。
新项目先选型：只做微信选原生加 TypeScript；团队会 Vue 且要多端选 uni-app；团队会 React 且要多端选 Taro；写明理由。
整理时按约定：
1. 主包只留 tabBar 页面和公共代码，其他按业务模块分包并配置 preloadRule，图片移到 CDN，主包控制在 2MB 以内并留出余量。
2. 请求统一封装：基地址、超时、令牌注入，多个 401 只触发一次重新登录。
3. 平台差异集中到一个适配层，用条件编译或平台变量处理。
4. 页面间共享状态用全局 store，敏感信息不存本地缓存。
5. 目录和配置文件按所选框架的约定放。
完成后汇报改了哪些文件、改前改后主包和分包体积；在开发者工具和真机上验证登录、首页和{关键流程}。
