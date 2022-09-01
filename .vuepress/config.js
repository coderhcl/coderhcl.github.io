const navConf = require('./config/nav.js')
module.exports = {
  title: 'HCLBlog',
  description: 'hcl的个人博客随手记',
  dest: 'public',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/avatar.png' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    noFoundPageByTencent: false,
    subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    nav: navConf,
    blogConfig: {
      category: {
        location: 2,
        text: '分类',
      },
      tag: {
        location: 3,
        text: '标签',
      },
    },
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com',
      },
    ],
    logo: '/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: 'HCL',
    authorAvatar: '/avatar.png',
    // record: 'xxxx',
    startYear: '2020',
  },

  markdown: {
    lineNumbers: true,
  },
}
