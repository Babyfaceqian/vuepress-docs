# JavaScript 脚本与模块
JavaScript 有两种源文件，一种叫做脚本，一种叫做模块。在ES5和之前的版本中，只有脚本这种源文件类型。ES6引入了模块机制。
区别：
- 脚本可以由浏览器或者 node 环境引入执行，而模块只能由 JavaScript 代码用 import 引入。
- 模块需要通过 export 导出，在别处 import 引用才能执行。而脚本可以直接执行。
- 浏览器在引入脚本时，type 为 script，在引入模块时，需要将 type 改为 module。

## 脚本、模块和函数体
这里的函数体包括普通函数、异步函数、生成器函数、异步生成器函数。
### 预处理
JavaScript 执行前，会对脚本、模块和函数体中的语句进行预处理。预处理将会提前处理var、函数声明、class、const 和 let 这些语句，以确定其中变量的意义。

#### var 声明
var 声明永远作用于脚本、模块和函数体这个级别，在预处理阶段，不关心赋值的部分，只管在当前作用域声明这个变量。当 JavaScript 对 var 声明进行提前时，会将它提前到离它最近的函数体或模块或脚本。
```js
var a = 1;

function foo() {
  var o = {a:3}
  with(o) {
    var a = 2;
  }
  console.log(o.a)
  console.log(a)
}

foo()
// 结果为2，undefined；
```
#### function 声明
function 声明的行为原本跟 var 非常相似，但是在最新的 JavaScript 标准中，对它进行了一定的修改。
在全局（脚本、模块和函数体），function 声明表现跟 var 相似，不同之处在于，functoin 声明不但在作用域加入变量，还会给它赋值，即声明和赋值都提前了。

function 声明出现在 if 等语句中时，只会提前声明，不会提前赋值。

#### class 声明
class 声明在全局的行为跟 function 和 var 都不一样。
- 在全局作用域下，class 声明会被提前，但访问时会抛错。
- 在 if 等语句中，class 声明不会穿透语句。

### 指令序言
脚本和模块都支持一种特别的语法，叫做指令序言（Directive Prologs）。
```js
"use strict";
function f() {
  console.log(this);
}
f.call(null);
```
"use strict"是JavaScript标准中规定的唯一一种指令序言。设计指令序言的目的是，留给 JavaScript 的引擎和实现者一些统一的表达方式，在静态扫描时指定 JavaScript 代码的一些特性。
JavaScript 的指令序言是只有一个字符串直接量的表达式语句，它只能出现在脚本、模块和函数体的最前面。