---
title: vue自动引入api以及自动加载组件等配置
date: 2022-09-07
categories:
  - 前端开发

tags:
  - vue
  - element
  - ts
  - 插件
---

::: tip 
使用 unplugin-auto-import 和 unplugin-vue-components 插件实现自动引入和自动加载的配置 
:::

<!-- more -->

## 自动引入

使用 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)可以自动导入 api，不需要 import。

没有使用时

```js
import { ref, computed } from 'vue'
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

使用插件后

```js
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

### 安装扩展

首先安装扩展包

```bash
yarn add -D unplugin-auto-import
#or
npm i unplugin-auto-import
```

### vite.config.ts

下面是修改 vite.config.js 配置文件，来增加对 vue 与 vue-router 的 api 自动引用

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      //为true时在项目根目录自动创建
      dts: 'types/auto-imports.d.ts',
    }),
  ],
})
```

### tsconfig

接下来在 tsconfig.json 中引入生成的类型声明文件，当执行 yarn dev 时会根据上面定义的 dts 选项自动生成类型声明文件 types/auto-imports.d.ts

```js
"include": [
  ...
  "types/**/*.ts"
]
```

### 使用示例

现在在 vue 组件与.ts 文件中使用 ref 等 vue 的 api，就不需要 import 了

```js
const user = ref('hhhh')
```

### element plus

Element plus 与 ant design 也提示了针对该插件的支持，配置好后也不需要 import api 了。

下面是 element plus 的 vite.config.ts 的配置项

```js
import { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function (plugins: Plugin[]) {
  plugins.push(
    AutoImport({
      //引入element plus自动api支持
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
      //为true时在项目根目录自动创建
      dts: 'types/auto-imports.d.ts',
    }),
  )
}
```

现在我们可以直接使用 element plus 的 api，而不需要 import 进来再使用了

```js
ElMessage.success('success')
```

不过有些依赖的 css 会识别不到造成样式错误，建议在 index.html 项目模板中引入样式

```html
<link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
```

## 自动加载组件

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)可以自动按需要加载组件，我们常用的 ant design 、element plus 已经基于该插件实现了按需加载。

### 安装配置

下面我们通过配置 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)插件来实现自动 import 组件，节省我们 import 的代码

### 安装插件

首先安装需要的扩展包

```bash
yarn add -D unplugin-vue-components
```

### vite.config.ts

下面在 vite 中配置组件的按需自动加载

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      //自动加载的组件目录，默认值为 ['src/components']
      dirs: ['src/components'],
      //组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,
      //指定类型声明文件，为true时在项目根目录创建
      dts: 'types/components.d.ts',
    }),
  ],
})
```

### tsconfig.json

接下来在 tsconfig.json 中引入生成的类型声明文件，当执行 yarn dev 时会根据上面定义的 dts 选项自动生成类型声明文件 types/components.d.ts

```js
"include": [
  ...
  "types/**/*.ts"
]
```

### 组件重名

插件的默认配置会加载 components 目录中的组件，所以当存在相同名称的组件 user.vue 时，会报下面的错误

```bash
[unplugin-vue-components] component "User"(xxxxx/user.vue) has naming conflicts with other components, ignored.
```

我们可以声明组件的注册名称包含目录，这样组件包含目录前缀来避免组件重名

```js
Components({
  resolvers: [ElementPlusResolver()],
  directoryAsNamespace: true,
  dts: true,
})
```

### 使用示例

运行 yarn dev 命令后，我们现在可以在组件中直接使用 src/components 中的组件，而不需要 import 引入组件了。

因为定义了 `directoryAsNamespace` 选项，所以实际使用的组件名称前要加上目录名，vscode 也会自动根据 TS 类型进行提示的

```js
<EditorEditor />
```

### element plus

Element plus 与 ant design 也提示了针对该插件的支持，配置好后也不需要 import 组件了。

下面是 element plus 的 vite.config.ts 的配置项

```js
import { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function (plugins: Plugin[]) {
  plugins.push(
    Components({
      dirs: ['src/components'],
      directoryAsNamespace: true,
      //为true时在项目根目录自动创建
      dts: 'types/components.d.ts',
      //引入element plus自动组件支持
      resolvers: [ElementPlusResolver()],
    }),
  )
}
```

现在我们可以直接使用 element plus 的组件了，而不需要 import 进来再使用了

```html
<el-button type="primary" size="default">hcl</el-button>
```

有些依赖的 css 会识别不到造成样式错误，建议在 index.html 项目模板中引入样式

```html
<link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
```


#### 文章节选来自 `https://doc.houdunren.com/vue/`