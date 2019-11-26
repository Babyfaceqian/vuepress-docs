# JavaScript 语句
声明型语句和普通语句最大的区别就是，声明型语句响应预处理过程，普通语句只有执行过程
## 普通语句
- 语句块
- 空语句
- 表达式语句
- if语句
- switch语句
- 循环语句
  - for循环
  - for in循环
  - for of循环
  - for await of循环
  - while循环
  - do while循环
- return语句
- break语句
- continue语句
- with语句
- throw语句
- try语句
- debugger语句

## 声明型语句
- var语句
- let语句
- const语句
- class语句
- 函数声明
  - 普通函数声明
  - async函数声明
  - generator函数声明
  - async generator函数声明

### async generator函数声明
看个有趣的例子
```js
function sleep(duration) {
  return new Promise(function(resolve,reject) {
    setTimeout(resolve,duration);
  })
}
async function* foo() {
  i = 0;
  while(true) {
    await sleep(1000);
    yield i++;
  }
}
for await(let e of foo()) {
  console.log(e);
}
```