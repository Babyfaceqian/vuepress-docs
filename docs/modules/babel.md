# Babel
## presets（预设）
Babel 插件的组合，本质上可以完全由各式各样的插件代替，以下是常用的一些预设：
#### [@babel/preset-env](https://www.babeljs.cn/docs/babel-preset-env)
该预设允许开发者使用最新的 `JavaScript` 而无需关心目标环境需要哪些语法转换（以及可选的浏览器 `polyfill`）。

通过设置 `targets` 或 `browserslist` 的方式设置目标环境，如果不设置，默认支持所有 `ECMAScript 2015+` 的代码。也就是说，启用该预设后，除了一些实验中的语法（如装饰器），其他最新的语法都能够转换。

#### [@babel/preset-react](https://www.babeljs.cn/docs/babel-preset-react)
该预设组合了以下 `React` 开发用到的插件：
- @babel/plugin-syntax-jsx
- @babel/plugin-transform-react-jsx
- @babel/plugin-transform-react-display-name

以及开发模式可选：
- @babel/plugin-transform-react-jsx-self
- @babel/plugin-transform-react-jsx-source

#### [@babel/preset-typescript](https://www.babeljs.cn/docs/babel-preset-typescript)

该预设组合了以下 `TypeScript` 开发用到的插件：
- @babel/plugin-transform-typescript

## plugins 插件
#### [@babel/plugin-transform-runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)
作为开发依赖安装；

可以通过重用Babel注入的帮助函数来节省代码大小。
> Babel使用非常小的帮助函数来实现诸如 `_extend.` 之类的常见功能。默认情况下，它会被添加到需要它的每个文件中。这种重复会增大打包文件体积。为了解决这个问题，Babel 将所有的帮助函数都集中到 `@babel/runtime` 模块中，并通过该插件让每个文件从 `@babel/runtime` 引入帮助函数以避免重复。

#### [@babel/plugin-proposal-decorators](https://www.babeljs.cn/docs/babel-plugin-proposal-decorators)
编译 `@` 装饰器，包括类装饰器、方法装饰器。
> 当启用 `@babel/plugin-proposal-class-properties` 插件时，`@babel/plugin-proposal-decorators` 必须放在 `@babel/plugin-proposal-decorators` 前面。
> 当设置 `legacy: true` 时，`@babel/plugin-proposal-class-properties` 必须设置 `loose: true`。

#### [@babel/plugin-proposal-class-properties](https://www.babeljs.cn/docs/babel-plugin-proposal-class-properties)
此插件用于转换静态类属性以及设定初始值的属性。

可配置 `loose`，默认为 `false`，使用 `Object.defineProperty` 方式定义静态属性；设置为 `true`时，使用 `assignment` 方式，如 `Bork.a = 'foo'`。这两者存在着相当大的[区别](https://2ality.com/2012/08/property-definition-assignment.html)。


## 生产依赖
#### [@babel/runtime](https://www.babeljs.cn/docs/babel-runtime)
作为生产依赖安装；

Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，该依赖包含 Babel 运行时所需要的帮助函数以及 `regenerator-runtime`，启用 `@babel/plugin-transform-runtime` 插件后，编译所需要的帮助函数都会从该依赖引入。相比较通过 `core-js` 或者 `@babel/polyfill` 的方式引入帮助函数，这种方式不会污染全局命名空间。