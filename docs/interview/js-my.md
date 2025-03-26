---
title: 手写代码
date: 2022-09-27 14:00:00
permalink: /pages/interview/js-my
categories:
  - 面试
  - JS
tags:
  -
---

## 手写代码

```javascript
/**
 * 手写Array的map方法
 * map方法接收一个callback迭代函数和thisArg，返回一个同等长度数组
 * @param {*} callback
 * @param {*} thisArg
 * @returns
 */
Array.prototype.myMap = function (callback, thisArg) {
  // 参数检查
  if (this == null) {
    throw new Error("Array.prototype.myMap called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new Error(callback + "is not a function");
  }

  // 包装原始值
  const array = Object(this);

  const length = array.length > 0 ? array.length : 0;

  const result = new Array(length);
  // 循环迭代
  for (let i = 0; i < array.length; i++) {
    // 判断索引是否存在，考虑稀疏数组
    if (i in array) {
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }
  return result;
};

console.log([1, 2, 3].map((a) => a * 2));

/**
 * 手写Array的reduce方法
 * reduce方法接收一个callback迭代函数，可选初始值，返回一个迭代后的值
 * @param {*} callback
 * @param {*} initialValue
 * @param {*} thisArg
 * @returns
 */
Array.prototype.myReduce = function (callback, initialValue, thisArg) {
  // 参数检查
  if (this == null) {
    throw new Error("Array.prototype.myReduce called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new Error(callback + "is not a function");
  }
  // 包装原始值
  const array = Object(this);
  const length = array.length > 0 ? array.length : 0;
  // 累加器
  let acc;
  let startIndex = 0;

  if (arguments.length >= 2) {
    acc = initialValue;
  } else {
    // 如果没有提供初始值，数组为空，则报错
    if (length === 0) {
      throw new Error("Array is empty with no initialValue");
    }
    // 找到第一个存在的索引
    while (startIndex < length && !(startIndex in array)) {
      startIndex++;
    }
    if (startIndex >= length) {
      // 数组中全部都是空元素
      throw new Error("Array is empty with no initialValue");
    }
    acc = array[startIndex];
    startIndex++;
  }
  // 循环遍历
  for (let i = startIndex; i < length; i++) {
    // 判断索引是否存在，考虑稀疏数组
    if (i in array) {
      acc = callback.call(thisArg, acc, array[i], array);
    }
  }
  return acc;
};

console.log([1, 2, 3].myReduce((prev, cur) => prev + cur));

/**
 * 手写深拷贝代码，利用WeakMap缓存处理对象引用
 * @param {*} obj
 * @param {*} hash
 * @returns
 */
function deepClone(obj, hash = new WeakMap()) {
  // 参数检查
  // 如果参数不是对象，则返回参数本身
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  // 处理日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 处理正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 检测对象引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 处理数组
  if (Array.isArray(obj)) {
    const clonedArr = [];
    hash.set(obj, clonedArr);

    obj.forEach((item, index) => {
      clonedArr[index] = deepClone(item, hash);
    });
    return clonedArr;
  }
  // 处理对象，保留对象的原型
  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clonedObj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      {
        clonedObj[key] = deepClone(obj[key], hash);
      }
    }
  }
  return clonedObj;
}

const original = {
  a: 1,
  b: { c: 2, d: [3, 4, 5] },
  e: new Date(),
  f: /regex/g,
};
const cloned = deepClone(original);
console.log(cloned);
console.log(cloned === original); // false
console.log(cloned.b === original.b); // false
console.log(cloned.b.d === original.b.d); // false

// Promise用法
const promise = new Promise((resolve, reject) => {
  resolve(1);
}).then((onfulfilled, onrejected) => {});

/**
 * 手写Promise对象
 */
class MyPromise {
  constructor(executor) {
    this.state = "pending"; // 定义状态
    this.value = undefined; // 定义resolve的值
    this.reason = undefined; // 定义reject的原因
    this.onFulfilledCallbacks = []; // 存储成功时的回调
    this.onRejectedCallbacks = []; // 存储失败时的回调

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb(this.value));
      }
    };
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb(this.reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    } else if (this.state === "rejected") {
      onRejected(this.reason);
    } else {
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }
    // 处理promise的链式调用，这块比较复杂
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(value) {
    return new MyPromise((_, reject) => reject(value));
  }

  // 所有的promise都resolve了，才完成
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      const result = [];
      promises.forEach((promise, i) => {
        MyPromise.resolve(promise).then((res) => {
          result[i] = res;
          count++;
          if (count === promises.length) resolve(results);
        }, reject);
      });
    });
  }

  // 不管promise成功还是失败，只要全部resolve或reject的，都算完成
  static allSettled(promises) {
    return new MyPromise((resolve) => {
      let count = 0;
      const result = [];
      promises.forEach((p, i) => {
        MyPromise.resolve(p)
          .then(
            (value) => {
              result[i] = { status: "fulfilled", value };
            },
            (reason) => {
              result[i] = { status: "rejected", reason };
            }
          )
          .finally(() => {
            count++;
            if (count === promises.length) resolve(results);
          });
      });
    });
  }

  // 只要有一个完成就可以
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let errors = [];
      promises.forEach((p, i) => {
        MyPromise.resolve(p)
          .then(resolve)
          .catch((err) => {
            errors[i] = err;
            if (errorCount === promises.length) {
              reject(errors);
            }
          });
      });
    });
  }

  // 任意完成就触发
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => {
        MyPromise.resolve(p).then(resolve, reject);
      });
    });
  }
}

/**
 * 手写防抖函数
 * 间隔时间内无论触发多少次，都只执行一次
 */

function debounce(fn) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, 200);
  };
}

/**
 * 手写节流函数
 * 首先触发一次，然后以相同间隔时间触发一次
 */
function throtte(fn) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, 200);
      timer = null;
    }
  };
}

/**
 * 手写for of对对象遍历
 */

Object[Symbol.iterator] = function() {
  let index = 0;
  let keys = Object.keys(this);
  return {
    next: () => {
      if (index < keys.length) {
        index++;
        return {
          value: [keys[index], this[keys[index]]]
          done: false
        }
      } else {
        return {
          value: undefined,
          done: true
        }
      }
    }
  }
}

/**
 * 手写订阅发布
 */

class EventEmitter {
  this.events = {}; // 存储事件和回调函数

  on(eventName, cb) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(cb)
    return () => this.off(eventName, cb);
  }
  emit(eventName, ...rest) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(cb => cb(...rest))
    }
  }
  once(eventName, cb) {
    const wrapper = (...args) => {
      this.off(eventName, cb);
      cb(...args)
    }
    this.on(eventName, wrapper);
  }
  off(eventName, cb) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(callback => callback === cb)
    }
  }
}

/**
 * 使用setTimeout实现setInterval
 */

function mySetInterval(cb, duration) {
  const timer = {
    flag: true
  }
  let clearMySetInterval = () => {
    timer.flag = false;
  }
  function interval() {
    if (timer.flag) {
      cb();
      setTimeout(interval, duration)
    }
  }
  interval(); // 启动定时器
  return clearMySetInterval;
}

/**
 * 手写红绿灯变换
 */

class TravelLightController{
  static RED = 'red';
  static YELLOW = 'yellow';
  static GREEN = 'green';
  constructor() {
    this.light = TravelLightController.RED
  }
  async start() {
    while(true) {
      await this.turnLight(TravelLightController.RED, 5000);
      await this.turnLight(TravelLightController.GREEN, 5000);
      await this.turnLight(TravelLightController.YELLOW, 1000);
    }
  }
}
TravelLightController.prototype.turnLight = async function(light, duration) {
  this.light = light;
  console.log(this.light)
  await new Promise(resolve => setTimeout(resolve, duration));
}

/**
 * 二分法查找数据
 */

function binarySearchLast(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = parseInt((right - left) / 2) + left;
    if (arr[mid] < target) {
      left = mid + 1;
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }
  return -1
}

/**
 * 双向数据绑定
 */
// 方法一，使用Object.defineProperty劫持set和get方法，缺点是需要遍历对象的所有属性
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {return val},
    set(newVal) {
      if (newVal === val) return val;
      val = newVal;
      updateView(); // 更新视图
    }
  })
}
// 方法二，使用ES6的Proxy对象，在vue3中用来实现响应性
const obj = new Proxy({}, {
  get(target, key) {return target[key]},
  set(target, key, value) {
    target[key] = value;
    updateView() // 更新视图
    return true;
  }
})
```
