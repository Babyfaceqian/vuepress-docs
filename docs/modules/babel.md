# Babel
> Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。
> - 语法转换
> - 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
> - 源码转换 (codemods)
> - 更多！

最常用的是前两点，**语法转换**和**特性添加**。语法转换是将 ES6+ 的**语法糖**转换成低版本的代码实现方式，如箭头函数；而特性添加，是为了补全目标环境中**缺失（未实现）的特性**，如 `Promise` 和 `includes`。

## core（核心）
#### @babel/core
Babel 的核心转换库，会根据配置转换语法。

## polyfill
#### @babel/polyfill
提供完整的 ES5+ 的 `polyfill`.
> Babel 7.4.0 版本后，`@babel/polyfill` 被废弃，

## presets（预设）
Babel 插件的组合，本质上完全可以由各式各样的插件代替，以下是常用的一些预设：
#### [@babel/preset-env](https://www.babeljs.cn/docs/babel-preset-env)
> 该预设允许开发者使用最新的 `JavaScript` 而无需关心目标环境需要哪些语法转换（以及可选的浏览器 `polyfill`）。

通过设置 `targets` 或 `.browserslist` 的方式设置目标环境，如果不设置，默认支持所有 `ECMAScript 2015+` 的代码。也就是说，启用该预设后，除了一些实验中的语法（如装饰器），其他最新的语法都能够转换，目标环境缺失的特性也会被添加。

相关配置：

##### useBuiltIns
> "usage" | "entry" | false, 默认为 false.
>
> 该选项决定了 `@babel/preset-env` 如何处理 `polyfills`。
>
> 当设置为 `usage` 或 `entry` 时，`@babel-preset-env` 会引入 `core-js` 模块。
>
> Since @babel/polyfill was deprecated in 7.4.0, we recommend directly adding core-js and setting the version via the corejs option.


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