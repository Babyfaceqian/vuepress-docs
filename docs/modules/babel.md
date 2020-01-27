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
提供完整的 ES5+ 的 `polyfill`，由 `core-js2` 和 `regenerator-runtime` 组成，前者是 js 标准库，包含了不同版本 javascript 语法的实现，后者是 facebook 开源库，用来实现对 generator、async 等函数的支持。只要在入口文件引入 `@babel/polyfill`，就可以使用相应的语法了。

## presets（预设）
Babel 插件的组合，本质上完全可以由各式各样的插件代替，以下是常用的一些预设：
#### [@babel/preset-env](https://www.babeljs.cn/docs/babel-preset-env)
> 该预设允许开发者使用最新的 `JavaScript` 而无需关心目标环境需要哪些语法转换（以及可选的浏览器 `polyfill`）。

通过设置 `targets` 或 `.browserslist` 的方式设置目标环境，如果不设置，默认支持所有 `ECMAScript 2015+` 的代码。也就是说，启用该预设后，除了一些实验中的语法（如装饰器），其他最新的语法都能够转换，目标环境缺失的特性也会被添加。

#### [@babel/preset-react](https://www.babeljs.cn/docs/babel-preset-react)
该预设组合了以下 `React` 开发用到的插件：
- @babel/plugin-syntax-jsx
- @babel/plugin-transform-react-jsx
- @babel/plugin-transform-react-display-name

以及开发模式可选：
- @babel/plugin-transform-react-jsx-self
- babel/plugin-transform-react-jsx-source

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


## runtime
#### [@babel/runtime](https://www.babeljs.cn/docs/babel-runtime)
`@babel/runtime` 类似 `@babel/polyfill`，包含了 `helpers` 和 `regenerator-runtime`，区别在于它提供了模块化的方式引入帮助函数，不会污染全局。

## 如何配置
Babel 7.4.0 版本后，`@babel/polyfill` 被废弃。官方给出的建议是直接在入口文件引入 `core-js2` 中用到的方法 和 `regenerator-runtime`，如：
```js
import 'core-js/features/array/from'; // <- at the top of your entry point
import 'core-js/features/array/flat'; // <- at the top of your entry point
import 'core-js/features/set';        // <- at the top of your entry point
import 'core-js/features/promise';

import 'regenerator-runtime/runtime'
```
当然，如果不能明确知道需要引入哪些方法，还可以直接引入 `core-js`，然后根据`@babel/preset-env` 的配置项 `useBuiltIns` 配置 polyfill（以下情况都需要安装 `core-js2`）。
- useBuiltIns:false(default):此时不对 polyfill 做操作。如果引入 `core-js2`，则无视配置的浏览器兼容，引入所有的 polyfill。
- useBuiltIns:"entry":根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 import 'core-js2'，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill。
- useBuiltIns:"usage":不需要在文件顶部手动引入 `core-js2`，会根据代码中的使用进行按需添加。不会考虑第三方包的 polyfill，如果第三方包未做兼容，可能会存在问题。

> `core-js3` 已经发布，可以将 `core-js2` 替换成 `core-js3` 以支持更多新特性。使用 `@babel/preset-env` 的 配置项 `corejs` 指定。

利用 `@babel/preset-env` 配置 polyfill 的优点是覆盖面广（entry），不用担心遗漏，缺点是全局污染。如果要避免 polyfill 的全局污染，可以使用 `@babel/runtime` 和 `@babel/plugin-transform-runtime`替代。

`@babel/plugin-transform-runtime` 可以将代码中所有的帮助函数定义都从 `@babel/runtime` 中引入，避免重复定义增加包体积。也可以使用 `corejs` 配置项指定使用的 js 标准库版本。

**业务项目建议使用 `@babel/preset-env`，而`@babel/runtime` 适合类库开发。**