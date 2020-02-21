module.exports = {
  title: 'Qian的技术博客',
  description: '前端笔记',
  navbar: false,
  themeConfig: {
    nav: [
      { text: '归纳·博文', link: '/articles/' },
      { text: '技术·笔记', link: '/notes/' },
      { text: '面试·刷题', link: '/interview/' },
      { text: '随想·摘要', link: '/capriccios/' },
    ],
    sidebar: {
      '/articles/': [
        {
          title: '网站搭建',
          collapsable: true,
          children:[
            '/articles/webApp/start',
            '/articles/webApp/nginx-setup',
            '/articles/webApp/node-server',
            '/articles/webApp/react-client',
            '/articles/webApp/travis-deploy'
          ]
        }
      ],
      '/notes/': [
        {
          title: 'JavaScript内置对象',
          collapsable: true,
          children: [
            '/notes/js/build-in-Object/js-array-empty',
            '/notes/js/build-in-Object/js-array',
            '/notes/js/build-in-Object/js-ArrayBuffer',
            '/notes/js/build-in-Object/js-Boolean',
            '/notes/js/build-in-Object/js-Error',
            '/notes/js/build-in-Object/js-Function',
            '/notes/js/build-in-Object/js-generator',
            '/notes/js/build-in-Object/js-Map',
            '/notes/js/build-in-Object/js-Number',
            '/notes/js/build-in-Object/js-Object',
            '/notes/js/build-in-Object/js-typed-array',
          ]
        },
        {
          title: 'JavaScript其他',
          collapsable: true,
          children: [
            '/notes/js/others/dom-event',
            '/notes/js/others/js-array',
            '/notes/js/others/js-comparision',
            '/notes/js/others/js-eventLoop',
            '/notes/js/others/js-inherit',
            '/notes/js/others/js-logic-compute',
            '/notes/js/others/js-memory-management',
            '/notes/js/others/js-module',
            '/notes/js/others/js-strict-mode',
            '/notes/js/others/js-this',
            '/notes/js/others/js-binary-storage',
            '/notes/js/others/js-object-primitive',
            '/notes/js/others/js-ecma-specification-type',
            '/notes/js/others/js-lexical-grammar'
          ]
        },
        {
          title: '浏览器',
          collapsable: true,
          children: [
            '/notes/browser/browser-process-thread',
            '/notes/browser/when-open-a-url'
          ]
        },
        {
          title: 'D3',
          collapsable: true,
          children: [
            '/notes/d3/d3-API',
            '/notes/d3/d3-canvas-axis',
            '/notes/d3/d3-react',
          ]
        },
        {
          title: 'Git',
          collapsable: true,
          children: [
            '/notes/git/git-common-usage',
          ]
        },
        {
          title: '库',
          collapsable: true,
          children: [
            '/notes/modules/time',
            '/notes/modules/utility',
            '/notes/modules/webpack',
            '/notes/modules/server',
            '/notes/modules/node-framework',
            '/notes/modules/http',
            '/notes/modules/file',
            '/notes/modules/babel'
          ]
        },
        {
          title: 'React',
          collapsable: true,
          children: [
            '/notes/react/react-note',
            '/notes/react/react-16.12.0-1',
            '/notes/react/react-16.12.0-2',
            '/notes/react/react-16.12.0-3',
            '/notes/react/react-16.12.0-4',
            '/notes/react/react-lifecycle'
          ]
        },
        {
          title: 'TypeScript',
          collapsable: true,
          children: [
            '/notes/typescript/typescript-note'
          ]
        },
        {
          title: 'Tips',
          collapsable: true,
          children: [
            '/notes/tips/compiler',
            '/notes/tips/tips'
          ]
        }
      ],
      '/interview/': [
        {
          title: '面试题',
          collapsable: true,
          children: [
            '/interview/react',
            '/interview/redux'
          ]
        }
      ]
    }
  }
}