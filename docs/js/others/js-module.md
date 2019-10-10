# JS模块化开发
## CommonJS规范
CommonJS是服务器端模块的规范，Node.js采用了这个规范。
根据CommonJS规范，一个单独的文件就是一个模块。每一个模块都被其他模块读取，除非定义为global对象的属性。

## AMD 规范
Asynchironous Module Definition, 中文名是“异步模块定义”。
模块将被异步加载，模块加载不影响后面语句的运行。所有依赖某些模块的语句均放置在回调函数中。
AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。

**define() 函数**

AMD规范只定义了一个函数 define，它是全局变量。函数的描述为：

```js
define(id?, dependencies?, factory);
```
**参数说明：**

- id：指定义中模块的名字，可选；如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。

- 依赖dependencies：是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。
依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的长度属性小于3，加载器会选择以函数的长度属性指定的参数个数调用工厂方法。

- 工厂方法factory，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

**Example**

创建一个名为"alpha"的模块，使用了require，exports，和名为"beta"的模块:
```js
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
       exports.verb = function() {
           return beta.verb();
           //Or:
           return require("beta").verb();
       }
   });
```

## CMD规范
Common Module Definition， 通用模块定义。该规范明确了模块的基本书写格式和基本交互规则。该规范是再国内发展出来的。一个模块就是一个文件。AMD是依赖关系前置，CMD是按需加载。
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

**define() 函数**
```js
define(factory);
```
factory 为函数时，表示是模块的构造方法。执行该构造方法，可以得到模块向外提供的接口。factory 方法在执行时，默认会传入三个参数：require、exports 和 module：


```js
define(function(require, exports, module) {

  // 模块代码

});
```

## AMD和CMD的区别
对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。

> AMD:提前执行（异步加载：依赖先执行）+延迟执行
> CMD:延迟执行（运行到需加载，根据顺序执行）
> CMD 推崇依赖就近，AMD 推崇依赖前置。看如下代码：


```js
// CMD
define(function(require, exports, module) {
var a = require('./a')
a.doSomething()
// 此处略去 100 行
var b = require('./b') // 依赖可以就近书写
b.doSomething()
// ... 
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
a.doSomething()
// 此处略去 100 行
b.doSomething()
...
})
```

另外一个区别是：

> - AMD:API根据使用范围有区别，但使用同一个api接口
> - CMD:每个API的职责单一
> - AMD的优点是：异步并行加载，在AMD的规范下，同时异步加载是不会产生错误的。
> - CMD的机制则不同，这种加载方式会产生错误，如果能规范化模块内容形式，也可以

![image](https://segmentfault.com/img/bVkONe)

## ES6模块化

**import, export**

ES6的模块化的基本规则或特点：

1. 每一个模块只加载一次， 每一个JS只执行一次， 如果下次再去加载同目录下同文件，直接从内存中读取。 一个模块就是一个单例，或者说就是一个对象；
1. 每一个模块内声明的变量都是局部变量， 不会污染全局作用域；
1. 模块内部的变量或者函数可以通过export导出；
1. 一个模块可以导入别的模块

## 后记

某届图灵奖获得者说过“构建软件设计的方法有两种：一种是把软件做得很简单以至于明显找不到缺陷；另一种是把它做得很复杂以至于找不到明显的缺陷。”