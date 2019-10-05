# js-Boolean
- new Boolean([value])
可选，用来初始化 Boolean 对象的值。也可以称为强制转换。
> 如果省略该参数，或者其值为 0、-0、null、false、NaN、undefined、或者空字符串（""），则生成的 Boolean 对象的值为 false
> 如果传入的参数是 DOM 对象  document.all，也会生成值为 false 的 Boolean 对象。任何其他的值，包括值为 "false" 的字符串和任何对象，都会创建一个值为 true 的 Boolean 对象。
```js
var x = new Boolean(false); // 区别于Boolean(false)
if (x) {
  // 这里的代码会被执行
}
```