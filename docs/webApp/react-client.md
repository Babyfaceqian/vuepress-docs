# React前端环境搭建
## 安装依赖
package.json
```javascript
{
  // ...
  "dependencies": {
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-router": "^4.3.1",
    "react-router-dom": "^4.3.1",
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^7.1.4",
    "babel-plugin-import": "^1.8.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "clean-webpack-plugin": "^0.1.19",
    "copy-webpack-plugin": "^4.5.3",
    "css-loader": "^0.28.11",
    "eslint": "^4.19.1",
    "eslint-loader": "^2.0.0",
    "eslint-plugin-react": "^7.10.0",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.0.4",
    "less-loader": "^4.1.0",
    "style-loader": "^0.21.0",
    "webpack": "^4.14.0",
    "webpack-cli": "^3.0.8",
    "webpack-dev-server": "^3.1.4"
  }
}

```
首先看下我们需要用到哪些依赖。
```javascript
"react": "^16.4.1",
"react-dom": "^16.4.1",
"react-router": "^4.3.1",
"react-router-dom": "^4.3.1",
```
`react`，`react-router`是必不可少的。react 16版本增加了很多新的特性，比较常用的有以下三个。

* Error Boundary
* render方法新增返回类型
* Portals

react-router 版本4相比版本3修改比较大，主要是写法上有很大的不同，后面我们会讲到。
```javascript
"babel-core": "^6.26.3",
"babel-plugin-import": "^1.8.0",
"babel-preset-env": "^1.7.0",
"babel-preset-react": "^6.24.1",
"babel-preset-stage-0": "^6.24.1",
```
`babel`用于转译es6语法。
`babel-core`编译器核心，提供了转译的API。
`babel-plugin-import`babel插件，实现组件按需加载。
`babel-preset-env`根据目标环境自动启用需要的babel插件，合并了原来的`babel-preset-es2015`等等。
`babel-preset-react`转译jsx文件，也就是react。
`babel-preset-stage-0`法力无边的stage-0，支持ES7的一些新特性。
```javascript
"babel-loader": "^7.1.4",
"clean-webpack-plugin": "^0.1.19",
"copy-webpack-plugin": "^4.5.3",
"css-loader": "^0.28.11",
"eslint-loader": "^2.0.0",
"extract-text-webpack-plugin": "^4.0.0-beta.0",
"html-webpack-plugin": "^3.2.0",
"less-loader": "^4.1.0",
"style-loader": "^0.21.0",
"webpack": "^4.14.0",
"webpack-cli": "^3.0.8",
"webpack-dev-server": "^3.1.4"
```

`babel-loader`，`css-loader`，`less-loader`，`style-loader`，`eslint-loader`都是webpack要用到的对应的加载器。
`clean-webpack-plugin`在打包前清除打包路径下的文件。
`copy-webpack-plugin`将资源拷贝到打包路径下。
`extract-text-webpack-plugin`分模块打包。
`html-webpack-plugin`输出自定义的html文件。
```javascript
"less": "^3.0.4",
```
`less`将less转译为css的编译器。

## 目录结构
```javascript
├── README.md
├── package.json
├── src
│   ├── components  // 自定义组件目录
│   ├── config  // 配置文件目录
│   ├── containers  // 页面组件目录
│   ├── entries // 入口文件目录
│   │   ├── index.js
│   │   ├── index.template.html
│   ├── resources   // 静态资源目录
│   └── utils   // 方法工具目录
├── webpack.config.js   // webpack配置文件
└── .eslintrc.js    // eslint配置文件
```
## webpack配置
webpack.config.js
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SOURCE_PATH = path.resolve(__dirname, './src');
const ENTRY_PATH = SOURCE_PATH + '/entries/';
// the path(s) that should be cleaned
let pathsToClean = [
    'dist',
]

// the clean options to use
let cleanOptions = {
    root: __dirname, // absolute path to your webpack root folder
    // exclude: ['shared.js'],
    verbose: true, // Write logs to console.
}

var configFunc = (env, argv) => {

    const config = {
        entry: ENTRY_PATH + "index.jsx",
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, './dist'),
            filename: '[hash].bundle.js'
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0'],
                        plugins: [
                            ["import", {
                                "libraryName": "antd",
                                "libraryDirectory": "es",
                                "style": 'css', // or 'css'
                            }]
                        ]
                    }
                },
                {
                    test: /\.jsx$/,
                    loader: 'eslint-loader',
                    enforce: "pre",
                    include: [path.resolve(__dirname, 'src')], // 指定检查的目录
                    // options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                    //     formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                    // }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: [/src/],
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: {
                                    // '@primary-color': '#1DA57A'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: [/node_modules/],
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[local]_[hash:base64:8]'
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: {
                                    // '@primary-color': '#1DA57A'
                                }
                            }
                        }
                    ]
                },

            ]

        },
        devServer: {
            publicPath: '/',
            historyApiFallback: true,
            // proxy: {
            //     '/': {
            //         bypass: function (req, res, proxyOptions) {
            //             console.log('Skipping proxy for browser request.')
            //             return '/index.html'
            //         }
            //     }
            // }
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json'], //表示这几种文件的后缀名可以省略，按照从前到后的方式来进行补全
            alias: {
                components: SOURCE_PATH + '/components',
                resources: SOURCE_PATH + '/resources',
                utils: SOURCE_PATH + '/utils'
            }
        },
        plugins: [
            // new webpack.optimize.UglifyJsPlugin({    // in webpack4, it will be enabled when mode is production.
            //     test: /\.js($|\?)/i,
            //     cache: true,
            //     parallel: true,  // Enable parallelization. Default number of concurrent runs: os.cpus().length - 1.
            //     sourceMap: true
            // }),
            new HtmlWebpackPlugin({ // 将js, css文件引入html中
                title: "张黔的博客",
                filename: 'index.html',
                template: ENTRY_PATH + 'index.template.html',
                inject: 'body',
                hash: false // will append like bundle.js?[hash] if true, instead, we configure the hash in output.
            }),
            new extractTextWebpackPlugin('[hash].css'),
            new CleanWebpackPlugin(pathsToClean, cleanOptions),
            new CopyWebpackPlugin([{
                    from: SOURCE_PATH + '/resources/js',
                    to: 'resources/js'
                },
                {
                    from: SOURCE_PATH + '/resources/styles/code',
                    to: 'resources/styles/code'
                }
            ])
        ]
    };

    if (argv.mode === 'development') {
        config.devtool = 'source-map'; // debug in browser
    }

    /**
     * Provides process.env.NODE_ENV with value production. 
     * Enables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, 
     * NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and UglifyJsPlugin.
     */
    if (argv.mode === 'production') {
        //...
    }
    return config;

}

/**
 * instead of exporting config, 
 * we export a function which requires argv from cli and return config. So we can change config according to mode.
 */
module.exports = configFunc;

```
大部分配置大家可以都在网上轻易获取到，其中需要注意的几个地方是
1. 路由配置
```javascript
/*
 ...
*/
output: {
            publicPath: '/',
            // ...
        }
/*
 ...
*/
devServer: {
            publicPath: '/',
            historyApiFallback: true,
            // ...
          }
```
这里配置`historyApiFallback`是因为前端路由采用`BrowserRouter`时（[为甚么采用BrowserRouter而不是HashRouter](http://)），不在根路由下刷新页面会报**404 not Found**，因为获取不到index.html。配置historyApiFallback为true，访问任何路由的时候都会返回根目录的index.html。同时还要配置`output.publicPath:'/'`，确保打包后的静态文件保存在在根目录。
2. 按需加载
```javascript
{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        resets: ['env', 'react', 'stage-0'],
        plugins: [
          ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": 'css', // or 'less'
          }]
        ]
     }
}
```
上面代码是对antd的按需加载配置，主要用到了`babel-plugin-import`插件。

## package.json配置
```javascript
"scripts": {
    "start": "webpack-dev-server --config webpack.config.js --mode=development",
    "build": "webpack --config webpack.config.js --mode=production",
}
```
1. 开发环境中设置 `mode=development`，可以启用sourcemap便于调试，webpack.config.js中我们已经加入了这个逻辑。
2. 打包的时候设置 `mode=production`会自动启用webpack.optimize.UglifyJsPlugin的代码压缩功能，这是webpack v4自带的。

## index.template.html
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
        <%= htmlWebpackPlugin.options.title %>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="root"></div>
</body>

</html>
```
`<%= htmlWebpackPlugin.options.title %>`会被替换成webpack.config.js中配置的title。
```javascript
new HtmlWebpackPlugin({ // 将js, css文件引入html中
                title: "张黔的博客",
                filename: 'index.html',
                template: ENTRY_PATH + 'index.template.html',
                inject: 'body',
                hash: false // will append like bundle.js?[hash] if true, instead, we configure the hash in output.
            })
```
## react-router使用
entries/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import Layout from '../containers/Layout/Layout';
import 'resources/styles/theme.less';
let browserRouter = (
  <BrowserRouter>
    <Switch>
      <Route path="/blog" component={Layout} />
      <Redirect exact strict from="/" to="/blog/category/all" />
    </Switch>
  </BrowserRouter >
);
ReactDOM.render(browserRouter, document.getElementById('root'));

```
Layout.js
```javascript
render() {
    return (
      <div className={styles.layout}>
        <Header />
        <Main>
          <Route path="/blog/category/:id" component={HomePage} />
          <Route path={'/blog/article/:id'} component={ArticlePage} />
          <Route path="/blog/edit" component={ArticleEdit} />
        </Main>
        <Footer />
      </div>
    );
  }
```
react-router v4版本组件可以从`react-router-dom`中导入，`<Route>`组件可以像普通的 React 组件一样嵌套在任何地方。
`Layout`组件的render方法返回了`Header` `Main` `Footer`组件和嵌套的子路由。当访问根目录时，页面会直接跳转到`/blog/category/all`路由，该路由匹配到了`Layout`和`HomePage`组件，于是`Header` `Main` `Footer`和`HomePage`会一起渲染出来。当路由改变成`/blog/category/javascript`时，仍然这样渲染。
这样就是实现了页面的局部切换。

## eslint配置
.eslintrc.js
```javascript
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
```
这里我们用到了之前安装的`babel-eslint`，`eslint-plugin-react`插件，前者是让 ESLint 用 Babel 作为解释器，后者让 ESLint 支持 React 语法。
eslint 详细的配置请参考[eslint官网](https://eslint.org/docs/user-guide/configuring)

至此，前端开发环境基本已经搭建好。接下来我们封装一些常用的方法。
## 常用方法
utils/index.js
```javascript
/** proxy中配置了后端代理，根据路由前缀不同而匹配不同的host地址 */
import proxy from '../config/proxy';
/** fetchGet方法 */
const fetchGet = (url, data) => {
  let _url = url;
  Object.keys(proxy).forEach((it) => {
    if (_url.startsWith(it)) {
      _url = proxy[it].host + '/' + _url;
    }
  });
  _url = encodeURL(_url, data);
  fetch(_url)

  const headers = {
    'Content-Type': 'application/json'
  };
  const _fetch = fetch(_url, {
    method: 'GET',
    headers: headers
  }).then((res) => {
    return res.json();
  });
  return _fetch;
}
/** fetchPost方法 */
const fetchPost = (url, data = {}) => {
  let _url = url;
  Object.keys(proxy).forEach((it) => {
    if (_url.startsWith(it)) {
      _url = proxy[it].host + '/' + _url;
    }
  });
  const headers = {
    "Content-Type": "application/json"
  };
  const body = typeof data === 'string' ? data : JSON.stringify(data);
  const _fetch = fetch(_url, {
    method: 'POST',
    headers: headers,
    body: body
  }).then((res) => {
    return res.json();
  });;
  return _fetch;
}
/** 将object组合成get请求的参数字符串 */
const encodeURL = (url, obj) => {
  if (!obj) {
    return url;
  }
  let arr = [],
    str = '';
  Object.keys(obj).forEach((it) => {
    let pair = it + '=' + (obj[it] || '');
    arr.push(pair);
  });
  if (arr.length) {
    str = '?' + arr.join('&');
  }
  return url + str;
}
```
config/proxy.js
```javascript
const proxy = {
  'api': {
    host: 'http://localhost:8080'
  }
}
export default proxy;
```

## 源码仓库
[https://github.com/Babyfaceqian/zhangqiantech](https://github.com/Babyfaceqian/zhangqiantech)
