# JavaScript 表达式语句
## PrimaryExpression 主要表达式
它是表达式的最小单位，它所涉及的语法结构也是优先级最高的。
- 直接量
```js
'abc';
123;
null
true;
false
```
- 对象直接量
```js
({})
(function(){})
(class{})
[];
/abc/g;
```
需要注意的是，在语法层面，function、{ 和 class 开头的表达式语句与声明语句有语法冲突，所以，我们想要使用这样的表达式，必须加上括号来会比语法冲突。
在 JavaScript 标准中，这些机构有的被称作直接量（Literal），有的被称作表达式（**Expression）。
- this 或者变量
```js
this;
myVar;
```
任何表达式加上圆括号，都被认为是 Primary Expression，这个机制使得圆括号称为改变运算优先顺序的手段。

## MemberExpression 成员表达式
成员表达式通常用于访问对象成员的。它有几种形式：
- 属性访问
```js
a.b;
a["b"];
new.target; // 新语法，用于判断它所在函数是否是被 new 调用
super.b; // super 则是构造哈书中，用于访问父类的属性的语法
```

- 带函数的模板
```js
f`a${b}c`; // 表示把模板的各个部分算好后传递给函数f，由f处理并返回结果。不写f的情况下模板字符串在计算完后会将结果作为参数传递给默认函数，该函数会将各个部分连接起来。
```
- 带参数列表的new运算
```js
new Cls();
```
注意，不带参数列表的 new 运算优先级更低，不属于 Member Expression。

## NewExpression New 表达式
它的基本形式是 Member Expression 加上 new。
```js
new new Cls(1);
// 等价于
new (new Cls(1));
// 而不是
new (new Cls)(1)
```

## CallExpression 函数调用表达式
它的基本形式是 Member Expression 后寄一个括号里的参数列表，或者可以用上 super 关键字代替 Member Expression。
```js
// 简单的
a.b(c);
super();
// 更复杂的
a.b(c)(d)(e);
a.b(c)[3];
a.b(c).d;
a.b(c)`xyz`;
```
## LeftHandSideExporession 左值表达式
New Expression 和 Call Expression 统称为 LeftHandSideExporession，左值表达式。
左值表达式就是可以放到等号左边的表达式。
```js
a() = b;
```
这样的用法其实是符合语法的，知识，原生的 JavaScript 函数，返回的值都不能被赋值。因此多数时候，我们看到的赋值将会是 Call Expression 的其他形式，如：
```js
a().c = b;
```
左值表达式最经典的用法是用于构成赋值表达式。

## AssignmentExpression 赋值表达式
最简单的
```js
a = b
```
等号是可以嵌套的
```js
a = b = c = d;
// 右结合，等价于
a = (b = (c = d));
```
还有
```js
a += b
a = b + c
```

## Expression 表达式
赋值表达式可以构成 Expression 表达式的一部分。在 JavaScript 中，表达式就是用逗号运算符连接的赋值表达式。
在 JavaScript 中，比赋值运算优先级更低的是逗号运算符。
```js
a = b, b = 1, null;
```
逗号分隔的表达式会顺次执行，就像不同的表达式语句一样。“整个表达式的结果”就是“最后一个逗号后的表达式结果”。这里为 null。

> 右值表达式，在 JavaScript 中，叫做条件表达式（ConditionalExpression）。JavaScript 标准也规定了左值表达式同时都是条件表达式，此外，左值表达式也可以通过跟一定的运算符组合，逐级构成更复杂的结构，直到成为条件表达式。
> 对于右值表达式来说，可以理解为以左值表达式为最小单位开始构成的。

## 更新表达式 UpdateExpression
左值表达式搭配 ++ -- 运算符，可以形成更新表达式。在 ES2018 中，跟早期版本有所不同，前后自增自减运算被放到了同一优先级。
```js
--a;
++a;
a--;
a++;
```

## 一元运算表达式 UnaryExpression
更新表达式搭配一元运算符，可以形成一元运算表达式。
```js
delete a.b
void a;
typeof a;
- a;
~ a;
! a;
await a;
```

## 乘方表达式 ExponentiationExpression
一元表达式搭配 ** 运算符，可以形成乘方表达式。
```js
++i ** 30
2 ** 30 // 正确
-2 ** 30 // 报错，-2 这样的医院表达式，是不可以放入乘方表达式的，如果需要表达类似的逻辑，必须加括号。
```
这里需要注意一下结合性，** 运算时右结合，跟其它正常的运算符不一样。

## 乘法表达式 MultiplicativeExpression
乘法表达式有三种运算符，他们的优先级是一样的。乘方表达式搭配这三种运算符可以构成乘法表达式。
```js
*
/
%
```

## 加法表达式 AdditiveExpression
加法表达式是由乘法表达式用加号或者减号连接构成的。

## 移位表达式 ShiftExpression
移位表达式由加法表达式构成，移位是一种位运算，分成三种：
```js
<< // 向左移位
>> // 向右移位
>>> // 无符号向右移位
```
移位运算把操作数看做二进制表示的整数，然后移动特定位数。所以左移n位相当于乘以 2 的 n 次方，右移 n 位 相当于除以 2 取整 n 次。
普通移位会保证正负数。无符号移位会把减号视为符号位1，同时参与移位：
```js
-1 >>> 1
```
在 JavaScript 中，二进制操作整数并不能提高性能。

## 关系表达式 RelationalExpression
移位表达式可以构成关系表达式，这里的关系表达式就是大于、小于、大于等于、小于等于等运算符号连接，统称为关系运算。
```js
<=
>=
<
>
instanceOf
in
```
需要注意的是 <= 和 >= 完全是针对数字的，所以并不等价于 < 或 ==，例如：
```js
null <= undefined // false
null == undefined // true
```

## 相等表达式 EqualityExpression
在语法上，相等表达式是由关系表达式用相等比较运算符（如 ==）连接构成的。
```js
a instanceOf "object" == true
```
相等表达式由四种运算符和关系表达式构成：
```js
==
!=
===
!==
```

## 位运算表达式
位运算表达式含有三种：
- 按位与表达式 BitwiseANDExpression
- 按位异或表达式 BitwiseANDExpression
- 按位或表达式 BitwiseORExpression

按位与表达式由按位与运算符（&）连接按位异或表达式构成，按位与表达式把操作数视为二进制整数，然后把两个操作数按位做与运算。

按位异或表达式由按位异或运算符（^）连接按位与表达式构成，按位异或表达式把操作数视为二进制整数，然后把两个操作数按位做异或运算。异或两位相同时得 0，两位不同时得 1。异或运算有个特征，那就是两次异或运算相当于取消。

按位或表达式由按位或运算符（|）连接相等表达式构成，按位或表达式把操作数视为二进制整数，然后把两个操作数按位做或运算。按位或运算常常被用在一种叫Bitmask的技术上。

## 逻辑与表达式和逻辑或表达式
逻辑与表达式由按位或表达式经过逻辑与运算符连接构成，逻辑或表达式则由逻辑与表达式经逻辑或运算符连接构成。
这里需要注意的是，这两种表达式都不会做类型转换，所以尽管是逻辑与运算，但是最终的结果可能是其他类型。
逻辑表达式具有短路的特性。

## 条件表达式 ConditionalExpression
条件表达式由逻辑或表达式和条件运算符构成，条件运算符又称三目运算符，它有三个部分，由两个运算符 ? 和 : 配合使用。

# 参考
[new.target](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target)
[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)