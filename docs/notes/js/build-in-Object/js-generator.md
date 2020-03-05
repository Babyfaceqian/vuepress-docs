# Generator 和 Iterator

生成器和迭代器更多的是对ES6而言的，封装了异步任务。

## 生成器

生成器（generator function）是用于生成迭代器的函数。

## 迭代器

迭代器（iterator）是由生成器（generator function）返回的对象。

迭代器必须满足**迭代器协议**：实现了一个 next() 的方法，该方法必须返回一个带有done和value属性的 IteratorResult 对象。

## 可迭代对象

可迭代对象（iterable对象）是指能够作为参数传入生成器，返回迭代器的对象。JS中的可迭代对象有 Array，Map，Set，String，TypedArray，arguments，NodeList 对象等等。

可迭代对象必须满足**可迭代协议**：一个对象必须实现 @@iterator 方法, 意思是这个对象（或者它原型链 prototype chain 上的某个对象）必须有一个名字是 Symbol.iterator 的属性。

## 迭代器实现方式
```js
// ES5
// 简易迭代器
// 生成器
function createIterator(items) {
  return {
    nextIndex: 0,
    next: function() {
      return this.nextIndex < items.length ? 
      {value: items[this.nextIndex++], done: false} :
      {done: true}
    }
  }
}
// 迭代器
var myIterator = createIterator([1,2,3]);
myIterator.next(); // {value: 1, done: false}

// ES6
// 1. generator生成器
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable]; // [1, 2, 3]
// 或
function* createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
var myIterable = createIterator();
[...myIterable]; // [1, 2, 3]

// 2. 内建生成器
Array.prototype.entries() // 返回 value 为[index, element] 的迭代器
Array.prototype.keys() // 返回 value 为 index 的迭代器
Array.prototype.values() // 返回 value 为 element 的迭代器
Map.prototype.entries() // 返回 value 为 [key, value] 的迭代器
Map.prototype.keys() // 返回 value 为 key 的迭代器
Map.prototype.values() // 返回 value 为 value 的迭代器
Map.prototype[@@iterator]() // 返回 value 为 [key, value] 的迭代器
```
## 修改已有对象的迭代行为
```js
var someString = new String("hi");          // need to construct a String object explicitly to avoid auto-boxing

someString[Symbol.iterator] = function() {
  return { // this is the iterator object, returning a single element, the string "bye"
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};
```
## 迭代器使用
```js
let a = [1, 2, 3];
let it = a.entries();
// 1. for...of
// for...of用于迭代可迭代对象，迭代器因为拥有Symbol.iterator属性，故也能在for...of中使用
for (let [index, value] of it ) {
  console.log(index, value)
}
// 2. next
it.next(); // {value: [0, 1], done: false}
it.next(); // {value: [1, 2], done: false}
it.next(); // {value: [2, 3], done: false}
it.next(); // {value: undefined, done: true}
// 3. ...扩展符
[...it]
// 4. Map
new Map(it)
```

## Generator语法

Generator 函数与普通的函数相比在写法上有两个地方不同：
- 函数名前加 *
- 函数内部可用 `yield` 关键字，其用来暂停和恢复一个生成器函数，调用 `next` 会执行到对应的 `yield`

yield 表达式
```
[rv] = yield [expression];
```
expression：定义通过迭代器协议从生成器函数返回的值。如果省略，则返回undefined。

rv：返回传递给生成器的next()方法的可选值，以恢复其执行。可以理解为恢复执行后 next 方法传入的参数。


生成器对象有三个原型方法。
- Generator.prototype.next(): 返回一个由 `yield` 表达式生成的值。
- Generator.prototype.return(): 返回给定的值并结束生成器。
- Generator.prototype.throw(): 向生成器抛出一个错误。
```js
function *createIterator() {
  console.log('start');
  let first = yield 1;
  let second = yield first + 2;    // 4 + 2
  yield second + 3;                // 5 + 3
}
let myIterator = createIterator(); // 这步不同于普通函数，不会执行函数体内代码，而是返回一个迭代器，故不会打印start。
console.log(myIterator.next().value) // 打印start，执行 yield 1，即将 IteratorResult 的 value 设置为1；暂停
console.log(myIterator.next(10).value) // 恢复执行，将next方法传入的参数赋值给 first，执行 yield first + 2，并将 value 设置为 12；暂停
console.log(myIterator.return(10).value) // 将 done 设置为 true，将 value 设置为 return 的参数，即10
```

## 无穷迭代器
```js
function* makeSimpleGenerator(array){
    var nextIndex = 0;
    
    while(nextIndex < array.length){
        yield array[nextIndex++];
    }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

console.log(gen.next().value); // 'yo'
console.log(gen.next().value); // 'ya'
console.log(gen.next().done);  // true
```