# Function
new Function ([arg1[, arg2[, ...argN]],] functionBody)

## 原型对象
### 属性
- Function.arguments 此属性已被arguments替代。
- Function.caller 获取调用函数的具体对象。非标准
- Function.length 获取函数的接收参数个数。
- Function.name 获取函数的名称。
- Function.displayName 获取函数的display name。非标准
- Function.prototype.constructor
  
### 方法
- Function.prototype.apply()
- Function.prototype.bind()
- Function.prototype.call()
- Function.prototype.isGenerator() 非标准
- Function.prototype.toSource() 非标准
- Function.prototype.toString() 获取函数的实现源码的字符串。覆盖了 Object.prototype.toString 方法。
- 

## 函数声明
函数声明会提升
```js
function fn(){
  //...
}
```
## 函数表达式
命名函数表达式声明的函数名只能在函数内部访问，并且为常量，对其赋值会失败。
```js
// 匿名函数表达式
let a = function () {

}
// 命名函数表达式
let a = function b(){
  b = 1; // 会静默失败，严格模式下会报错
}
// 自执行匿名函数表达式
(function(){

})()
// 自执行命名函数表达式
(function b(){
  b = 1; // 会静默失败，严格模式下会报错
})()
```

## 构造函数调用
函数作为构造函数调用时具体做了哪些步骤？
```js
let fn = new Fn([arg[,arg...]]) // 构造函数可接受多个参数
```
1. 以构造器的prototype属性为原型，创建一个新对象
2. 将this和调用参数传给构造器，执行
3. 如果构造器返回的是对象，则返回，否则返回第一步创建的对象。
等效于以下代码：
```js
let fn = {};
fn.__proto__ = Fn.prototype;
let obj = fn.call(fn[,arg[,arg...]]);
if (typeof obj === 'object') {
  fn = obj;
}
```