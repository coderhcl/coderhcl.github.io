---
title: vite+vue3过渡动画无法触发
date: 2022-07-28
categories:
  - 前端开发

tags:
  - vue
  - Animate.css
  - bug
---

::: warning 
在根组件 App.vue 当中使用了页面过渡动画后出现错误以及解决办法 
:::

<!-- more -->

## 过渡动画无法触发解决办法

### 出现问题

项目使用 vite 脚手架和 vue3，在根组件 App.vue 当中使用了页面过渡动画后出现以下错误

```js
inside <Transition> renders non-element root node that cannot be animated.
```

这句话的意思是：Transition 中的组件渲染无法设置动画的非元素根节点。

### 解决方式

是在 index.vue 当中使用一个`<div>`标签，将 index.vue 所有标签包裹起来即可消除这个错误，主要保证使用动画的节点为根节点，不然没有动画且会出现以上警告。
