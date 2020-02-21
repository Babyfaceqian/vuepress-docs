module.exports = {
  title: 'Qian的技术博客',
  description: '前端笔记',
  navbar: false,
  themeConfig: {
    nav: [
      // { text: '首页', link: '/' },
      { text: '归纳·博文', link: '/articles/' },
      { text: '技术·笔记', link: '/js/' },
      { text: '面试·刷题', link: '/webApp/' },
      { text: '随想·摘要', link: '/webApp/' },
    ],
    sidebar: {
      '/js/': [
        {
          title: '内置对象',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          // sidebarDepth: 2,    // 可选的, 默认值是 1
          children: [
            '',
            '/js/build-in-Object/js-array-empty',
            '/js/build-in-Object/js-array',
            '/js/build-in-Object/js-ArrayBuffer',
            '/js/build-in-Object/js-Boolean',
            '/js/build-in-Object/js-Error',
            '/js/build-in-Object/js-Function',
            '/js/build-in-Object/js-generator',
            '/js/build-in-Object/js-Map',
            '/js/build-in-Object/js-Number',
            '/js/build-in-Object/js-Object',
            '/js/build-in-Object/js-typed-array',
          ]
        },
        {
          title: '其他',
          collapsable: true,
          children: [
            '',
            '/js/others/dom-event',
            '/js/others/js-array',
            '/js/others/js-comparision',
            '/js/others/js-eventLoop',
            '/js/others/js-inherit',
            '/js/others/js-logic-compute',
            '/js/others/js-memory-management',
            '/js/others/js-module',
            '/js/others/js-strict-mode',
            '/js/others/js-this',
            '/js/others/js-binary-storage',
            '/js/others/js-object-primitive',
            '/js/others/js-ecma-specification-type',
            '/js/others/js-lexical-grammar'
          ]
        }
      ],
      '/browser/': [
        {
          title: '浏览器',
          collapsable: true,
          children: [
            '',
            '/browser/browser-process-thread',
            '/browser/when-open-a-url'
          ]
        }
      ],
      '/webApp/': [
        {
          title: '网页应用',
          collapsable: true,
          children: [
            '',
            '/webApp/start',
            '/webApp/nginx-setup',
            '/webApp/node-server',
            '/webApp/react-client',
            '/webApp/travis-deploy'
          ]
        }
      ],
      '/d3/': [
        {
          title: 'D3',
          collapsable: true,
          children: [
            '',
            '/d3/d3-API',
            '/d3/d3-canvas-axis',
            '/d3/d3-react',
          ]
        }
      ],
      '/git/': [
        {
          title: 'Git',
          collapsable: true,
          children: [
            '',
            '/git/git-common-usage',
          ]
        }
      ],
      '/react/': [
        {
          title: 'React',
          collapsable: true,
          children: [
            '',
            '/react/react-note',
            '/react/react-16.12.0-1',
            '/react/react-16.12.0-2',
            '/react/react-16.12.0-3',
            '/react/react-16.12.0-4',
            '/react/react-lifecycle'
          ]
        }
      ],
      '/modules/': [
        {
          title: '库',
          collapsable: true,
          children: [
            '',
            '/modules/time',
            '/modules/utility',
            '/modules/webpack',
            '/modules/server',
            '/modules/node-framework',
            '/modules/http',
            '/modules/file',
            '/modules/babel'
          ]
        }
      ],
      '/tips/': [
        {
          title: 'Tips',
          collapsable: true,
          children: [
            '',
            '/tips/compiler',
            '/tips/tips'
          ]
        }
      ]
    }
  }
}