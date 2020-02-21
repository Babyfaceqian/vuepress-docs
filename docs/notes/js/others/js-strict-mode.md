# js-strict-mode
- 无法在不定义的情况下创建全局变量，会报错
- 会使引起静默失败(silently fail,注:不报错也没有任何效果)的赋值操作抛出异常
- 在严格模式下, 试图删除不可删除的属性时会抛出异常(之前这种操作不会产生任何效果)
- 对象属性重名，以前会报错，在ES6之后只会覆盖不会报错
- 函数参数重名会报语法错误
- 严格模式禁止八进制数字语法，在ES6下支持为一个数字加"0o"的前缀来表示八进制数
- 设置primitive值的属性会报错，primitive值在js中有string, number, bigint, boolean, null, undefined, and symbol。

- 严格模式禁用 with
- eval 不再为上层范围(surrounding scope,注:包围eval代码块的范围)引入新变量
- 禁止删除声明变量

- 名称 eval 和 arguments 不能通过程序语法被绑定(be bound)或赋值
- 参数的值不会随 arguments 对象的值的改变而变化
- 不再支持 arguments.callee

- 通过this传递给一个函数的值不会被强制转换为一个对象，如果没有指定this，默认为undefined。
- fun.caller和fun.arguments都是不可删除的属性而且在存值、取值时都会报错
- 严格模式下的arguments不会再提供访问与调用这个函数相关的变量的途径，如arguments.caller
- 一部分字符变成了保留的关键字，这些字符包括implements, interface, let, package, private, protected, public, static和yield，不能再用这些名字作为变量名或者形参名

- 严格模式禁止了不在脚本或者函数层面上的函数声明，实测不会报错，但尽量不用，为了为未来ECMAScript铺平道路
```js
"use strict";
if (true) {
  function f() { } // !!! 语法错误
  f();
}

for (var i = 0; i < 5; i++) {
  function f2() { } // !!! 语法错误
  f2();
}

function baz() { // 合法
  function eit() { } // 同样合法
}
```

## 浏览器的严格模式
> 主流浏览器现在实现了严格模式。但是不要盲目的依赖它，因为市场上仍然有大量的浏览器版本只部分支持严格模式或者根本就不支持（比如IE10之前的版本）。严格模式改变了语义。依赖这些改变可能会导致没有实现严格模式的浏览器中出现问题或者错误。谨慎地使用严格模式，通过检测相关代码的功能保证严格模式不出问题。最后，记得在支持或者不支持严格模式的浏览器中测试你的代码。如果你只在不支持严格模式的浏览器中测试，那么在支持的浏览器中就很有可能出问题，反之亦然。