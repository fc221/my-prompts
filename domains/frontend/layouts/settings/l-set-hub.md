---
zh: 设置首页（入口卡片）
en: Settings hub
order: 50
of: l-settings-page
---

## 是什么

设置的首页是一组入口卡片（图标、名称、说明、设置项数），顶部有搜索；点卡片进入这一类的设置页。

## 适合

设置类别很多（8 个以上）、各类之间互不相关的大型后台或平台：系统管理、商家后台、开放平台。

## 不适合

类别少于 6 个时直接用分类导航，多一层入口只会多点一次。

## 要点

- 卡片网格每行 3–4 张，等高；每张放图标（40–44px 浅底）、名称、一句说明和“N 项设置”
- 整张卡片可点（链接），悬停有底色或阴影变化，键盘聚焦有焦点框
- 顶部搜索直接搜到具体设置项，结果标出所在分类并能一步跳到对应位置
- 常用的放前面；可以在卡片下方加“最近修改的设置”，方便回头确认
- 进入二级页后有面包屑或返回，回到首页时保留滚动位置
- 手机上改成分组单元格列表（图标、名称、›），搜索框在最上面

## 提示词

{后台}的设置首页做成「入口卡片」：顶部页面标题和搜索框（直接搜到设置项并标出所在分类）；下面 {入口数} 张入口卡片每行 4 张、等高，每张有 44px 浅底图标、名称、一句说明和“N 项设置”，整张可点并有悬停和焦点样式；卡片下方放“最近修改的设置”列表；点卡片进入该类设置页，二级页带面包屑，返回时保留滚动位置；手机上改成分组单元格列表，搜索在最上面。

## 示意图

```js
export const wire = {
  cols: '1fr 1fr 1fr 1fr',
  rows: 'auto auto auto 1fr',
  areas: ['hd hd sr sr', 'c1 c2 c3 c4', 'c5 c6 c7 c8', 'rc rc rc rc'],
  boxes: {
    hd: { label: '页面标题', kind: 'heading', text: '设置' },
    sr: { label: '搜索设置项', kind: 'search', text: '搜索设置项，例如“发货”' },
    c1: { label: '入口卡片', kind: 'catcard', acc: true },
    c2: { label: '入口卡片', kind: 'catcard' },
    c3: { label: '入口卡片', kind: 'catcard' },
    c4: { label: '入口卡片', kind: 'catcard' },
    c5: { label: '入口卡片', kind: 'catcard' },
    c6: { label: '入口卡片', kind: 'catcard' },
    c7: { label: '入口卡片', kind: 'catcard' },
    c8: { label: '入口卡片', kind: 'catcard' },
    rc: { label: '最近修改的设置', kind: 'setrows' },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['nav', 'sr', 'g1', 'g2', '.'],
  boxes: {
    nav: { label: '顶栏', kind: 'mtop', text: '设置' },
    sr: { label: '搜索设置项', kind: 'search', text: '搜索设置项' },
    g1: { label: '分组单元格', kind: 'cell', acc: true, text: '常用|应用设置|积分与会员|支付与结算' },
    g2: { label: '分组单元格', kind: 'cell', text: '更多|成员与权限|通知|安全|开放接口' },
  },
};
```
