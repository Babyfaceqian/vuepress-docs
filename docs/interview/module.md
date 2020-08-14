# 模块机制
## AMD-异步模块定义
依赖前置、异步定义，使用define方法，第一个参数接收依赖数组，第二个参数接收回调，在回调中使用导入的方法。

## CMD
依赖就近，通过define方法定义，在什么地方使用，就在什么地方定义，同步。

## CommonJS
通过module.exports定义，浏览器不支持，一般在node端使用。

## UMD
AMD和CommonJS的结合，兼容浏览器与node端。

## ES6
使用import/export关键字，静态分析，在编译时引入模块。需要使用babel编译，结合webpack可以在打包时优化。