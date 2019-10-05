# js-generator
生成器对象是由一个 generator function 返回的,并且它符合可迭代协议和迭代器协议。

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

...展开语法，只能用于可迭代对象。