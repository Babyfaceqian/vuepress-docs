# 词法文法
ECMAScript 源码文本会被从左到右扫描，并被转换为一系列的输入元素，包括 token、控制符、行终止符、注释和空白符。ECMAScript 定义了一些关键字、字面量以及行尾分号补全的规则。

## 格式控制符
格式控制符用于控制对源码文本的解释，但是并不会显示出来。

| 编码 | 名称 | 缩写 | 说明 |
| --- | --- | --- | --- |
| U+200C | 零宽度非结合子 | \<ZWNJ\> | 放置在一些经常会被当成连字的字符之间，用于将它们分别以独立形式显示 |
| U+200D | 零宽度结合子 | \<ZWJ\> | 放置在一些通常不会被标记为连字的字符之间，用于将这些字符以连字形式显示 |
| U+FEFF | 字节流方向标识 | \<BOM\> | 在脚本开头使用，除了将脚本标记为Unicode格式以外，还用来标记文本的字节流方向 |

## 空白符
空白符提升了源码的可读性，并将标记 (tokens) 区分开。这些符号通常不影响源码的功能。通常可以用压缩器来移除源码中的空白，减少数据传输量。

| 编码 | 名称 |	缩写 |	说明 |	转义序列 |
| --- | --- | --- | --- | --- |
| U+0009 | 制表符 |	\<HT\> |	水平制表符 |	\t
| U+000B | 垂直制表符 |	\<VT\> |	垂直制表符 |	\v
| U+000C | 分页符 |	\<FF\> |	分页符（Wikipedia） |	\f
| U+0020 | 空格 |	\<SP\> |	空格	 |
| U+00A0 | 无间断空格 |	\<NBSP\> |	在该空格处不会换行	| 
| Others | 其他 Unicode 空白 |	\<USP\> |	Wikipedia上对 Unicode 空白的介绍 |

## 行终止符
除了空白符之外，行终止符也可以提高源码的可读性。不同的是，行终止符可以影响 JavaScript 代码的执行。行终止符也会影响自动分号补全的执行。在正则表达式中，行终止符会被 \s 匹配。

在 ECMAScript 中，只有下列 Unicode 字符会被当成行终止符，其他的行终止符（比如 Next Line、NEL、U+0085 等）都会被当成空白符。

| 编码 | 名称 |	缩写 |	说明 |	转义序列 |
| --- | --- | --- | --- | --- |
| U+000A | 换行符 | \<LF\> | 在UNIX系统中起新行 | \n |
| U+000D | 回车符 | \<CR\> | 在 Commodore 和早期的 Mac 系统中起新行 | \r |
| U+2028 | 行分隔符 | \<LS\> |  |  |
| U+2029 | 段分隔符 | \<PS\> |  |  |

## 注释
注释用来在源码中增加提示、笔记、建议、警告等信息，可以帮助阅读和理解源码。在调试时，可以用来将一段代码屏蔽掉，防止其运行。
- 单行注释
- 多行注释

## 关键字
### ECMAScript 6 中的保留关键字
- break
- case
- catch
- class
- const
- continue
- debugger
- default
- delete
- do
- else
- export
- extends
- finally
- for
- function
- if
- import
- in
- instanceof
- new
- return
- super
- switch
- this
- throw
- try
- typeof
- var
- void
- while
- with
- yield
### 未来保留关键字
在严格模式和非严格模式下都被当成保留关键字：
- enum
只在严格模式下被当成保留关键字
- implements
- interface
- let
- package
- private
- protected
- public
- static
只在模块代码中被当做关键字
- await
### 之前标准中的保留关键字
- abstract
- boolean
- byte
- char
- double
- final
- float
- goto
- int
- long
- native
- short
- synchronized
- transient
- volatile
### 直接量
- 空直接量，null
- 布尔直接量，true/false
- 数值直接量
  - 十进制，1234/0888，慎用0开头
  - 二进制，0b1101/0B1101
  - 八进制，077/0o77/0O77
  - 十六进制，0xFFF/0XFFF
- 对象直接量，{ a: "foo", b: "bar", c: 42 };
- 数组直接量，[1954, 1974, 1990, 2014]
- 字符串直接量，'foo'
- 十六进制转义序列，
  ```js
  '\xA9' // "©"
  ```
- Unicode 转义序列，
  ```js
  '\u00A9' // "©"
  ```
- Unicode 编码转义，ECMAScript 6新增特性。使用Unicode编码转义，任何字符都可以被转义为十六进制编码。最高可以用到0x10FFFF。使用单纯的Unicode转义通常需要写成分开的两半以达到相同的效果。可以参考String.fromCodePoint()和String.prototype.codePointAt()。
  ```js
    '\u{2F804}'
    // 使用单纯 Unicode 转义
    '\uD87E\uDC04'
  ```
- 正则表达式
  ```js
  /ab+c/g
  // 一个空的正则表达式直接量
  // 必须有一个空的非捕获分组
  // 以避免被当成是行注释符号
  /(?:)/
  ```
- 模板直接量
  ```js
  `string text`

  `string text line 1
  string text line 2`

  `string text ${expression} string text`

  tag `string text ${expression} string text`
  ```
### 自动分号补全
一些 JavaScript 语句必须用分号结束，所以会被自动分号补全 (ASI)影响：
- 空语句
- let、const、变量声明
- import、export、模块定义
- 表达式语句
- debugger
- continue、break、throw
- return
- 箭头函数
可以分为以下三种情况：
1. 当出现一个不允许的行终止符或“}”时，会在其之前插入一个分号。
```js
{ 1 2 } 3 

// 将会被 ASI 转换为 

{ 1 2 ;} 3;
```
2. 当遇到token的输入流的末尾并且解析器不能将输入的token流解析成一个单独完整的程序，然后一个分号就会被自动插入到输入流的末尾。
在下面这段中，由于在 b 和 ++ 之间出现了一个行终止符，所以 ++ 未被当成变量 b 的后置运算符。
```js
a = b
++c

// 将被 ASI 转换为

a = b;
++c;
```
3. 当语法的某些产生式使得token合法时，且产生式是有条件限制的产生式，在被限制的token之前会自动插入分号。
有条件限制的产生式：
- 后置运算符（++ 和 --）前不允许插入换行
- 带标签的continue后不允许插入换行
- 带标签的break后不允许插入换行
- 带返回值的return后不允许插入换行
- throw和Exception之间不允许插入换行
- yield、yield*后不允许插入换行
- module
- async管家你后不允许插入换行
- 箭头函数的箭头前不允许插入换行
```js
UpdateExpression :
    LeftHandSideExpression [no LineTerminator here] ++
    LeftHandSideExpression [no LineTerminator here] --

ContinueStatement :
    continue ;
    continue [no LineTerminator here] LabelIdentifier ;

BreakStatement :
    break ;
    break [no LineTerminator here] LabelIdentifier ;

ReturnStatement :
    return ;
    return [no LineTerminator here] Expression ;

ThrowStatement :
    throw [no LineTerminator here] Expression ; 

ArrowFunction :
    ArrowParameters [no LineTerminator here] => ConciseBody

YieldExpression :
    yield [no LineTerminator here] * AssignmentExpression
    yield [no LineTerminator here] AssignmentExpression
```