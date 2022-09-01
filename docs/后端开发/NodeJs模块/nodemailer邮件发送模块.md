---
title: NodeJs邮件发送模块
date: 2022-05-26
categories:
  - 前端开发

tags:
  - NodeJs
  - nodemailer模块
---

:::tip 
可用于通过邮箱来进行登陆验证 
:::

<!-- more -->

## 使用

### 安装

```js
npm i nodemailer --save
# or
yarn add nodemailer
```

### 使用

- 这里通过发送随机数字到邮箱并存入后台数据库，然后用户收到邮箱验证码进行验证的过程，

```js
const nodemailer = require('nodemailer')
// 获取随机六位数字
let code = Math.floor(Math.random() * 900000) + 100000
// 建立一个smtp链接
let transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  secureConnection: true,
  port: 465,
  auth: {
    user: 'hu*******@163.com',
     //发件人邮箱的授权码 需要在自己的邮箱设置中生成,并不是邮件的登录密码
    pass: 'XWBZ*******AZXD',
  },
})
// 配置一个相关参数，这里发送给自己一份以防发送过多给拦截为垃圾信息
let options = {
  from: 'hu********@163.com',
  to: `hu*******@163.com,${req.body.email}`,
  subject: '【个人财务管理系统】',
  html: `
      <div style="width: 600px; margin: 30px auto">
        <h1 style="text-align: center">欢迎使用个人财务管理系统</h1>
        <p
          style="font-size: 24px; display: block; text-align: center; color: red"
        >
          <strong>验证码：${code}</strong>
        </p>
        <p>验证码15分钟有效，请及时输入</p>
        <i style="color: #00bfff"
          >此邮件为系统自动发送，请勿回复！若您没有进行注册，请忽略</i
        >
        <p style="text-align: right">--个人财务管理系统官方</p>
      </div>`,
}

// 发送之前把前端传过来的email 和 自动生成的 code 存在数据库中，
// 数据库为usercode 字段：email，code，createtime，如果当前时间减去创建时间＞15分钟就删除该字段

// 发送验证码
transporter.sendMail(options, function (err, msg) {
  if (err) {
    console.log(err)
  } else {
    res.send({
      code: 1,
      data: {
        result: msg,
        message: '发送成功,请稍后！',
      },
    })
    transporter.close()
  }
})
```

### 结尾

- 这边记录下来以后写后台登陆操作就可以使用邮箱来登陆验证了。
