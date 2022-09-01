---
title: javascript
date: 2022-08-28
categories:
  - 前端
tags:
  - JavaScript
---

在手写深拷贝之前，首先要弄懂`值类型`和`引用类型`的区别，可以更好的理解为什么需要深拷贝。

## 值类型

- [undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)：`typeof instance === "undefined"`
- [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)：`typeof instance === "boolean"`
- [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)：`typeof instance === "number"`
- [String](https://developer.mozilla.org/zh-CN/docs/Glossary/String)：`typeof instance === "string`
- [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)：`typeof instance === "bigint"`
- [Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol) ：`typeof instance === "symbol"`
- [null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)：`typeof instance === "object"`

## 引用类型

[Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)：`typeof instance === "object"` 包括 new [Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)，new [Array](https://developer.mozilla.org/zh-CN/docs/Glossary/array)，new [Map]( '此页面仍未被本地化, 期待您的翻译!')，new [Set]( '此页面仍未被本地化, 期待您的翻译!')，

## 区别

- 值类型传递的是值，引用类型是地址
- 因为值类型都是比较简单的，占用内存小，所以采用值传递

## 深拷贝 VS 浅拷贝

|        | 值类型                         | 引用类型                       |
| ------ | ------------------------------ | ------------------------------ |
| 浅拷贝 | 修改拷贝后的**不会**影响原先的 | 修改拷贝后的**会**影响原先的   |
| 深拷贝 | 修改拷贝后的**不会**影响原先的 | 修改拷贝后的**不会**影响原先的 |

### 浅拷贝

常见的有

- ...扩展符
- object.assign
- array.slice 本文不实现浅拷贝

### 深拷贝

常见的有

- JSON.parse/JSON.parse

实现深拷贝注意的点

- 注意判断值类型和引用类型
- 注意判断是数组还是对象
- 使用递归（不用也行）

## 深拷贝代码

```js
/**
 * 深拷贝
 * @param {Object} obj
 */
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) return obj

  // 初始化结果集
  const result = Array.isArray(obj) ? [] : {}

  for (key in obj) {
    // 保证key是自己的，不是原型链的
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
```

## 测试

```js
const obj1 = {
  age: 20,
  name: 'xxx',
  arr: [1, 2, 3, 4],
  address: {
    city: 'nanning',
  },
}

const obj2 = deepClone(obj1)
obj2.age = 21
console.log(obj2)
console.log(obj1)
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/662e26c234584420a7aa03ec176eeb85~tplv-k3u1fbpfcp-watermark.image?)

可以看到每个属性都拷贝了过来，而且修改拷贝后的对象`obj2`，并不会影响原来的
