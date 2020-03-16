# AsyncFunction
AsyncFunction是一个用于创建异步对象的构造函数，在JavaScript中每个异步对象都是AsyncFunction的对象。

但是AsyncFunction不是一个全局对象，不能直接调用，也就是说不能直接通过 `new AsyncFunction()` 创建异步对象。一般使用异步函数表达式来创建异步对象。
```js
// 异步表达式创建异步对象
var fn = async function() {}
```
要想获得AsyncFunction，需要通过访问异步对象的原型对象的构造函数获得。
```js
// 获取AsyncFunction
var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
var fn2 = new AsyncFunction()
```
AsyncFunction构造函数可以接受以下参数：
- arg1, arg2, ... argN：函数的参数名，它们是符合 JavaScript 标示符规范的一个或多个用逗号隔开的字符串。例如 x、theValue、或 a,b。
- functionBody：一段字符串形式的 JavaScript 语句，这些语句组成了新函数的定义。
