# Javascript 继承
```js
/**
 * 原型链继承
 * 缺点：
 * 1. 不能通过对new B()传参设置A的实例
 * 2. 不能多继承，因为只有一个prototype对象
 * 3. A中的属性和方法都直接挂在B.prototype上，对所有B的实例都是共享的
 */
function A() {
  this.name = 'Michael';
}
A.prototype = {
  setName: function(name) {
    this.name = name;
  }
}
function B() {
  this.age = 30;
}
B.prototype = new A();
B.prototype.constructor = B;
B.prototype.setAge = function(age) {
  this.age = age;
}
/**
 * 借用构造函数继承
 * 优点：
 * 1. A的构造函数的属性都挂在B的实例上，每次new B()生成的属性不共享
 * 2. 可传参
 * 3. 可多继承
 * 缺点：
 * 1. B的实例只是它自己的实例，没有与父类建立联系
 * 2. 只继承了父类构造函数的属性，没有继承父类的prototype
 * 3. 占用内存，无法服用
 */
function A(name) {
  this.name = name;
}
function C(sex) {
  this.sex = sex;
}
function B(name, sex) {
  A.call(this, name); // 修改A中this指向并执行
  C.call(this, sex);
  this.age = 30;
}
B.prototype.setAge = function(age) {
  this.age = age;
}
/**
 * 组合继承（伪经典模式）
 * 优点：
 * 1. A的构造函数的属性都挂在B的构造函数
 * 2. 可传参
 * 3. 可多继承
 * 4. 获得父类的prototype
 * 缺点：
 * 1. 父类的构造函数执行了两遍
 * 2. B的属性和B的prototype中的属性可能重名，导致后者被屏蔽
 * 3. 没有prototype的多继承
 */
function A() {
  this.name = 'Michael';
}
function C() {
  this.age = 30;
}
function B() {
  A.apply(this, arguments); // 修改A中this指向并执行，传参
  C.apply(this, arguments);
  this.age = 30;
}
B.prototype = new A();
B.prototype.constructor = B;
B.prototype.setAge = function(age) {
  this.age = age;
}
/**
 * 组合寄生（完美继承）
 */
function A() {
  this.name = 'Michael';
}
A.prototype = {
  setName: function(name) {
    this.name = name;
  }
}
function C() {
  this.age = 30;
}
function B() {
  A.apply(this, arguments); // 修改A中this指向并执行
  C.apply(this, arguments);
  this.age = 30;
}
// 方法一
// B.prototype.__proto__ = A.prototype; // 老的浏览器不能直接访问__proto__，可以使用下面的代替
// 方法二
// function F() {} // 创建一个空函数
// F.prototype = A.prototype; // 将F的prototype设置成A.prototype
// var f = new F(); // 生成一个空对象，并且该对象的__proto__指向A.prototype
// f.constructor = B; // 重定向constructor
// B.prototype = f;
// 方法三
B.prototype = Object.create(A.prototype) // 这种方式同上，返回一个继承与A原型对象的对象，ES5支持
B.prototype.constructor = B;

B.prototype.setAge = function(age) {
  this.age = age;
}

/**
 * ES6 实现完美继承
 * 优点：
 * 1. 代码简洁
 * 2. 会将prototype上的方法设置为不可写、不可枚举
 */
class A {
  constructor() {
    this.name = 'Michael';
  }
  setName(name){
    this.name = name;
  }
}
class B extends A{
  constructor() {
    super(); // 执行A的构造函数获取到A的构造函数中的属性
    this.age = 32;
  }
  setAge(age){
    this.age = age;
  }
}
```