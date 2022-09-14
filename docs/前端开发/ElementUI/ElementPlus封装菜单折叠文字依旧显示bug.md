---
title: vite+vue3+TS+ElementPlus封装菜单折叠文字依旧显示bug
date: 2022-09-14
categories:
  - 前端开发

tags:
  - element-ui
  - bug
---

::: warning 
ElementPlus 封装菜单组件，点击折叠后文字依旧显示的 bug 
:::

<!-- more -->

## element-ui 菜单栏折叠后文字依旧显示

### 出现的错误

- 菜单栏缩放依旧有宽度
- 菜单栏缩放文字依旧显示

#### 出现错误代码
```js
<el-menu-item :index="item.index" v-else>
      <el-icon>
        <component v-if="item.icon" :is="item.icon"></component>
      </el-icon>
      <span> {{ item.name }}</span>
</el-menu-item>
```
### 主要原因

- element-plus 官方文档为：一级菜单的标题也是通过 `<template #title></template>` 包裹的
- 只能说自己粗心，记录下自己的蠢事以后不再犯

### 解决办法
```js
<el-menu-item :index="item.index" v-else>
    <el-icon>
      <component v-if="item.icon" :is="item.icon"></component>
    </el-icon>
    <template #title> {{ item.name }}</template>
</el-menu-item>
```

