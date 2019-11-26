# JS闭包
## 定义
在MDN上的定义：
> 函数与对其状态即词法环境（lexical environment）的引用共同构成闭包（closure）。
> 词法环境根据声明变量的位置来确定该变量可被访问的位置，它包含了这个闭包创建时所能访问的所有局部变量。
最简单的闭包实现：
```js
let closure = (function(){
  let a = 1;
  return function() {
    a++;
  }
})();
```
closure函数包含了对它的词法环境的引用，也就是第一个function创建的词法环境，所以它能够访问到其中的变量和this。