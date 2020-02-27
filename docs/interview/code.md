# 代码题
## 命名函数表达式函数名称的特点

写出以下代码的打印结果
```js
a = function b(){
  b = 1;
  console.log(b)
}
a();
b();
```
答案: 打印结果是函数b，报错b is not defined

解析：命名函数表达式的函数名称是作为函数体内的变量，可以被访问到，但不能被修改，也不能被外部访问到。

## 宏任务、微任务

写出以下代码的打印顺序
```js
process.nextTick(() => {
  console.log('nextTick');
})
Promise.resolve().then(() => {
  console.log('then')
})
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')
```
答案：end -> nextTick -> then -> setImmediate

解析： process.nextTick、Promise.then都是微任务，setImmediate和console.log('end')是宏任务；宏任务和微任务的执行顺序是，先执行同步代码的宏任务，然后执行该宏任务下的所有微任务，然后执行该宏任务下的宏任务，以此类推。

## Promise.then函数

写出以下代码的执行结果
```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```
答案：1

解析：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。

## Promise.then函数

写出以下代码的执行结果
```js
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)
```
答案：
```
backend.js:6 TypeError: Chaining cycle detected for promise #<Promise>
```

解析：.then 或者 .catch 不能返回自身，否则会造成死循环。

## Promise的链式调用

写出以下代码的执行结果
```js
const promise = Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch(err => {
    return 3
  })
  .catch(res => {
    console.log(res)
  })
```
答案：
```
1
2
```
解析：promise.then和.catch都会返回该promise对象。

## 连等

写出以下代码的执行结果
```js
function foo() {
  let a = b = 0;
  a++;
  return a;
}
foo();
console.log(typeof a);
console.log(typeof b);
```
答案：
```js
undefined
number
```
解析：连等赋值中，b被声明为全局变量，a为局部变量

## async函数

写出以下代码的执行结果
```js
async function foo(){
  return 1
}
console.log(foo())
```
答案：打印一个promise对象

解析：async函数会隐式的返回一个promise对象，代码中返回的会被作为该promise的resolve值。

## parseInt

```js
['1', '3', '10'].map(parseInt)
```
答案：
```
[1, NaN, 2]
```