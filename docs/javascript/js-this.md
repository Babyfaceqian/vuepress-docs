# this分四种情况讨论
1. 在函数中使用
```js
function A() {
  this.name = 'Michael';
}
A(); // this指向全局，在浏览器中指向window
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
```