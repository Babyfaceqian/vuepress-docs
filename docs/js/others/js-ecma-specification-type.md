# ECMAScript规范类型
除了7种语言类型，还有一些语言的实现者更关心的规范类型。
- List和Record：用于描述函数传参过程。
- Set：主要用于解释字符集等。
- Completion Record：用于描述异常、跳出等语句执行过程。
- Reference：用于描述对象属性访问、delete等。
- Property Descriptor：用于描述对象的属性。
- Lexical Environment和Environment Record：用于描述变量和作用域。
- Data Block：用于描述二进制数据。

[参考ECMAScript-262规范文档](https://www.ecma-international.org/ecma-262/6.0/#sec-completion-record-specification-type)

## Completion Record
Completion Record 表示一条语句执行完之后的结果，它有三个字段：
- [[type]] 表示完成的类型，有 break continue return throw 和 normal 几种类型；
- [[value]] 表示语句的返回值，如果语句没有，则是 empty；
- [[target]] 表示语句的目标，通常是一个 JavaScript 标签

### 控制语句执行顺序
JS 是如何通过 Completion Record 控制语句执行顺序的？以一个语句块为例：
- 如果块内每条语句的 Completion Record 的 [[type]] 都为 normal，则按顺序执行。
```js
// 语句块
{
  var i = 1; // normal, empty, empty
  i++; // normal, 1, empty
  console.log(i) // normal, undefined, empty
} // normal, undefined, empty
```
- 如果其中一条语句 [[type]] 不为 normal， 则整个块的 [[type]] 就会变成非 normal。这就实现了语句的控制。
```js
// 语句块
{
  var i = 1; // normal, empty, empty
  return i; // return, 1, empty
  i++; // normal, 1, empty
  console.log(i) // normal, undefined, empty
} // return, 1, empty
```

### 控制语句
有以下几种控制语句，它们搭配的效果如下：

![控制语句](../images/control-flow.png);

穿透指的是其内部的完成记录会直接影响其外部不为穿透的块语句的完成记录
消费指的是其内部的完成记录会影响其块语句的完成记录