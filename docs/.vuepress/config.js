module.exports = {
  title: 'Notebook',
  description: '前端笔记',
  navbar: false,
  themeConfig: {
    // nav: [
    //   { text: '主页', link: '/' },
    //   { text: '从头搭建一个网站', link: '/startToWebApp/' },
    // ]
    // navbar: false,
    // sidebar: [
    //   {
    //     title: '网站搭建',   // 必要的
    //     path: '/',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [
    //       '/webApp/'
    //     ]
    //   }
    // ],
    sidebar: {
      '/webApp/': [
        '',
        'start',
        'nginx-setup',
        'node-server',
        'react-client',
        'travis-deploy'
      ],
      '/d3/': [
        'd3-API',
        'd3-canvas-axis',
        'd3-react',
      ],
      '/javascript/': [
        'dom-event',
        'js-inherit',
        'js-module',
        'js-this'
      ],
      '/git/': [
        'git-common-usage'
      ],
      '/browser/': [
        'browser-process-thread',
        'when-open-a-url'
      ]
    }
  }
}