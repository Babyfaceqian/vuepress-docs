# js数组
## 属性
**length**

表示数组元素个数。

如何修改？
- 直接对其赋值为n，
  - 如果n不为`number`类型，会先对其进行隐式转换（`Number(n)`）后再赋值；
  - 如果转换后仍不是`number`类型，会报`Invalid array length`；
  - 如果`length` > `n`，会保留前n位数组元素；
  - 如果`length` == `n`，则不变；
  - 如果`length` < `n`， 则会再数组后面添加`n` - `length`个空值`empty`。
- 通过数组方法增删元素。

## Array方法
- Array.from(arrayLike[, mapFn[, thisArg]])
- Array.isArray(obj)
- Array.of(element0[, element1[, ...[, elementN]]])
## Array实例方法
- var new_array = old_array.concat(value1[, value2[, ...[, valueN]]]) 对象引用、值赋值
- arr.copyWithin(target[, start[, end]]) target为负数则从末尾开始计算，如果 target 大于等于 arr.length，将会不发生拷贝，即不会改变原数组大小
- arr.entries() 返回arr的迭代器
- arr.every(callback[, thisArg]) 若收到一个空数组，此方法在一切情况下都会返回 true。
- arr.fill(value[, start[, end]]) 不包括终止索引，value为对象是，填入引用
- var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
- arr.find(callback[, thisArg]) 没有匹配时返回undefined
- 
### 遍历方法
**arr.forEach(callback[, thisArg]);**
数组概念重点：
- 方括号中的索引会通过`toString`隐式转换成字符串，所以`arr["1"]`和`arr["01"]`不是同一个元素
- 可迭代对象：同时满足可迭代协议和迭代器协议的对象。
  - String, Array, TypedArray, Map and Set 是所有内置可迭代对象， 因为它们的原型对象都有一个 @@iterator 方法. 
  - 许多 API 接受可迭代对象（作为参数，译注）, 例如：Map([iterable]), WeakMap([iterable]), Set([iterable]) and WeakSet([iterable])。另外还有 Promise.all(iterable), Promise.race(iterable) 以及 Array.from().
  - 一些语句和表达式是预料会用于可迭代对象，比如 for-of 循环，spread operator, yield* 和 destructuring assignment。
  - 如果一个可迭代对象的 @@iterator 方法不是返回一个迭代器对象，那么它就是一个 non-well-formed 可迭代对象 。使用它可能会发生如下的运行时异常或者 buggy 行为。
```js
/*
可迭代对象
可迭代协议：一个对象必须实现 @@iterator 方法, 意思是这个对象（或者它原型链 prototype chain 上的某个对象）必须有一个名字是 Symbol.iterator 的属性
迭代器协议：实现了一个 next() 的方法
*/
var myIterator = {
    nextIndex: 0,
    next: function(){
           return this.nextIndex < array.length ?
               {value: array[this.nextIndex++], done: false} :
               {done: true};
    },
    [Symbol.iterator]: function() { return this }
}
// ES6
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable]; // [1, 2, 3]
// 修改已有对象的迭代行为
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

// 简单迭代器
// 无穷迭代器
// 生成器式迭代器
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
- ...展开语法，只能用于可迭代对象。
- 剩余语法(Rest syntax) 看起来和展开语法完全相同，不同点在于, 剩余参数用于解构数组和对象
- 当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes