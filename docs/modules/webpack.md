# Webpack 相关
## 插件
### js 压缩
#### terser-webpack-plugin
该插件采用 `terser` 作为解析和压缩 Javascript 的工具。

webpack 的 production 模式下默认启用的 `uglifyjs-webpack-plugin` 插件，其采用的 `uglify-js` 工具不支持 ES6+，且支持 ES6+ 的 `uglify-es` 已经停止维护。

`terser` 是从 `uglify-es` folk 而来，保留了大部分的 API 和对 `uglify-js` 的兼容，支持 ES6+。

### css 压缩
#### optimize-css-assets-webpack-plugin
默认采用 `cssnano` 作为解析和压缩 css 的工具。`cssnano` 是写在PostCSS生态系统之上的现代模块化压缩工具。

该插件解决了 `extract-text-webpack-plugin` CSS打包重复问题，

### 多线程转换
#### happyPack
可以让 webpack 多线程编译，提高编译速度，请优先考虑 `thread-loader`。

### 缓存编译
#### autodll-webpack-plugin
将那些不会修改的 npm 包的编译结果分开打包，并缓存起来，供 bundle 文件引用。

## Loader
#### source-map-loader
> source-map-loader从所有JavaScript条目中提取现有的源映射。这包括内联源映射以及通过URL链接的源映射。所有源地图数据都将传递到webpack，以按照webpack.config.js中的选项devtool指定的选定源地图样式进行处理。

> 当使用具有自己的源映射的第三方库时，此加载器特别有用。如果未将其提取并处理到webpack包的源地图中，则浏览器可能会误解源地图数据。source-map-loader允许webpack跨库维护源地图数据的连续性，从而保持调试的简便性。

> source-map-loader将从任何JavaScript文件中提取，包括node_modules目录中的文件。注意设置包含和排除规则条件以最大程度地提高捆绑性能。

#### thread-loader
多线程加载器，将其放在其他加载器之前。支持多线程、线程池、预热。
注意：尽量只用在高开销的loader。