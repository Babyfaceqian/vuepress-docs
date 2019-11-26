# this关键字
[this](https://segmentfault.com/a/1190000020223897)
## this关键字的机制
在 JavaScript 标准中，为函数规定了用来保存定义时上下文的私有属性[[Environment]]。
当一个函数执行时，会创建一条新的执行环境记录，记录的外层词法环境（outer lexical environment）会被设置成函数的[[Environment]]。这个动作就是切换上下文。

对于this，JavaScript标准定义了[[thisMode]]私有属性。其有三个取值：
- lexical：表示从定义时上下文中找this，对应了箭头函数。
- global：表示当this为undefined时，取全局对象，对应了普通函数。
- strict：当严格模式时使用，this严格按照调用时传入的值，可能为null或者undefined。

函数创建新的执行上下文中的词法环境记录时，会根据[[thisMode]]来标记新纪录的[[ThisBindingStatus]]私有属性。
代码执行遇到this时，会逐层检查当前词法环境记录中[[thisBindingStatus]]，当找到this的环境记录时获取this的值。
## this指向
- if 箭头函数，this指向函数被创建时的上下文环境
- if 普通函数，
  - if 由new调用，指向新创建的对象。
  - else if 由call或者apply或者bind调用，绑定到指定的对象
  - else if 由上下文对象调用，绑定到那个上下文对象。
  - else 在严格模式下绑定到undefined，否者绑定到全局对象
1. 在函数中使用
```js
function A() {
  this.name = 'Michael';
}
A(); // this指向全局，在浏览器中指向window；

class B {
  function fn(){
    console.log(this);
  }
}
let b = new B();
let { fn } = b;
fn(); // ES6的class默认为严格模式，this指向undefined。
```
2. 当做构造函数使用
```js
function A() {
  this.name = 'Michael';
}
var a = new A(); // this指向实例a
```
3. 在对象的方法中使用
```js
var a = {
  setName: function(name) {
    this.name = name;
  };
}
a.setName('michael') // this指向实例a
```
4. apply和call指定this
```js
function setName(age) {
  console.log(this.name + age);
}
function a() {
  this.name = 'Michael';
}
setName.call(a, 20) // Michael20
5. bind
function a() {
  console.log(this);
}
let o = {};
let b = a.bind(o);
b(); // o，bind生成的函数this值不能再修改
6. 箭头函数
let o = {
  fn(){
    console.log(this);
    return () => console.log(this);
  }
}
let b = o.fn();
b(); // o，箭头函数的this值不能再被修改
```