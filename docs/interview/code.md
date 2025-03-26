# 代码题

## 命名函数表达式函数名称的特点

写出以下代码的打印结果

```js
a = function b() {
  b = 1;
  console.log(b);
};
a();
b();
```

答案: 打印结果是函数 b，报错 b is not defined

解析：命名函数表达式的函数名称是作为函数体内的变量，可以被访问到，但不能被修改，也不能被外部访问到。

## 宏任务、微任务

写出以下代码的打印顺序

```js
process.nextTick(() => {
  console.log("nextTick");
});
Promise.resolve().then(() => {
  console.log("then");
});
setImmediate(() => {
  console.log("setImmediate");
});
console.log("end");
```

答案：end -> nextTick -> then -> setImmediate

解析： process.nextTick、Promise.then 都是微任务，setImmediate 和 console.log('end')是宏任务；宏任务和微任务的执行顺序是，先执行同步代码的宏任务，然后执行该宏任务下的所有微任务，然后执行该宏任务下的宏任务，以此类推。

## Promise.then 函数

写出以下代码的执行结果

```js
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
```

答案：1

解析：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。

## Promise.then 函数

写出以下代码的执行结果

```js
const promise = Promise.resolve().then(() => {
  return promise;
});
promise.catch(console.error);
```

答案：

```
backend.js:6 TypeError: Chaining cycle detected for promise #<Promise>
```

解析：.then 或者 .catch 不能返回自身，否则会造成死循环。

## Promise 的链式调用

写出以下代码的执行结果

```js
const promise = Promise.resolve(1)
  .then((res) => {
    console.log(res);
    return 2;
  })
  .catch((err) => {
    return 3;
  })
  .catch((res) => {
    console.log(res);
  });
```

答案：

```
1
2
```

解析：promise.then 和.catch 都会返回该 promise 对象。

## 连等

写出以下代码的执行结果

```js
function foo() {
  let a = (b = 0);
  a++;
  return a;
}
foo();
console.log(typeof a);
console.log(typeof b);
```

答案：

```js
undefined;
number;
```

解析：连等赋值中，b 被声明为全局变量，a 为局部变量

## async 函数

写出以下代码的执行结果

```js
async function foo() {
  return 1;
}
console.log(foo());
```

答案：打印一个 promise 对象

解析：async 函数会隐式的返回一个 promise 对象，代码中返回的会被作为该 promise 的 resolve 值。

## parseInt

```js
["1", "3", "10"].map(parseInt);
```

答案：

```
[1, NaN, 2]
```

## 用栈实现树的深度遍历和广度遍历。（阿里）

## 设计一个函数，能够实现树型结构数据的遍历和搜索，callback 是一个回调函数，有返回值时，那么终止遍历，返回 callback 的结果，否则遍历整棵树直至结束；（阿里）

function transTree(treeData, callback){
//

}

## 给一个数组和目标值，求数组中和为目标值的所有组合，数组中每个值可以重复使用（阿里）

```js
// 用到了深度优先遍历的算法
// 这里不考虑元素和目标值为非正数的情况，因为这样可能会有无数种可能
function getCombination(arr, targetValue) {
  arr = arr.filter((d) => d > 0);
  let values = []; // 组合
  let indexes = []; // 组合下标
  let valueResult = []; // 组合的集合
  let indexResult = []; // 组合下标的集合
  fn(arr, targetValue, values, indexes, valueResult, indexResult);
  return {
    valueResult,
    indexResult,
  };
}
function fn(arr, sum, values, indexes, valueResult, indexResult) {
  let len = arr.length;
  if (sum === 0) {
    // 和为0则保存组合并停止向下遍历
    valueResult.push(values.slice(0));
    indexResult.push(indexes.slice(0));
    return;
  } else if (sum < 0) {
    // 和超出则停止向下遍历
    return;
  }
  for (let i = 0; i < len; i++) {
    sum -= arr[i];
    values.push(arr[i]);
    indexes.push(i);
    fn(arr, sum, values, indexes, valueResult, indexResult);
    let lastValue = values.pop();
    indexes.pop();
    sum += lastValue;
  }
}
```
