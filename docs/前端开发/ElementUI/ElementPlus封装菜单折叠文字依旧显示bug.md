---
title: vite+vue3+TS+ElementPlus封装菜单折叠文字依旧显示bug
date: 2022-09-14
categories:
  - 前端开发

tags:
  - element
  - bug
---

::: warning 
ElementPlus封装菜单组件，点击折叠后文字依旧显示bug
:::

<!-- more -->

## element-ui菜单栏折叠后文字依旧显示

### 出现问题

- 出现错误代码

```js
<el-menu-item :index="item.index" v-else>
      <el-icon>
        <component v-if="item.icon" :is="item.icon"></component>
      </el-icon>
      <span> {{ item.name }}</span>
</el-menu-item>
```
### 主要原因

- element-plus官方文档是一级菜单的标题也是通过template包裹的，只能说自己粗心，记录下自己的蠢事以后不再犯

### 解决方式

- 标题使用template包裹 `<template #title> {{ item.name }}</template>` 即可解决

```js
<el-menu-item :index="item.index" v-else>
    <el-icon>
      <component v-if="item.icon" :is="item.icon"></component>
    </el-icon>
    <template #title> {{ item.name }}</template>
</el-menu-item>
```
