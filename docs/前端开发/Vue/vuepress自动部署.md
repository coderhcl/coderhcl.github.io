---
title: vuepress自动部署
date: 2022-09-01
categories:
  - 前端开发

tags:
  - vuepress
---

::: tip 
使用 github page 和 vuepress 实现博客静态部署 
:::

<!-- more -->

## 开始

- 1、在 github 创建一个以 `****.github.io`的仓库
- 2、然后通过`git`把仓库克隆到本地，把 vuepress 写好的代码放进去
- 3、在根目录添加`.gitignore`文件，输入以下代码，忽略一些文件的上传
  ```js
  node_modules/ 
  public/ 
  package-lock.json
  ```
- 4、在根目录添加`deploy.sh`文件，输入以下代码

  ```bash
  npm run build

  cd public

  git init
  git add -A
  git commit -m 'deploy'

  git push -f https://github.com/******/*****.github.io.git master

  cd ../

  rm -rf public
  ```

- 5、在根目录添加 push.sh 文件夹,把全部源代码提交到 blogcode 这个分支上
  ```bash
  git add .
  git commit -m 'push'
  git push origin blogcode
  ```
- 6、每一次提交的时候只要点击 deploy 就可以自动打包提交并部署，点击 push 就把源码提交到仓库

## 注意

- 在点击 push 文件之前，一定要创建一个分支 blogcode，并选择分支，不然可能 push 失败

  ```bash
  git checkout -b blogcode
  ```
