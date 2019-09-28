# 数组内空值empty详解
当你通过指定数组长度去创建或修改数组或delete操作删除元素的时候的时候，js会为未指定的元素分配一个空值empty，表示未指定元素。例如：
```js
// 通过构造函数创建数组
var a = new Array(3);
console.log(a); // [empty × 3]
// 通过指定数组长度
var b = [1,2,3];
b.length = 5;
console.log(b); // [1, 2, 3, empty × 2]
// 通过删除数组元素
var c = [1,2,3];
delete c[1];
console.log(c); // [1, empty, 3]
```
由于empty表示未赋值元素，所以当使用数组的forEach,map方法时，会被忽略。
```js
b[5] = 5;
console.log(b); // [1, 2, 3, empty × 2, 5]
b.map((item,i) => console.log(i)); // 0, 1, 2, 5
```
当使用find，findIndex方法时，查找到empty元素时，会将undefined作为参数传递给函数。
含有empty元素的数组称之为稀疏数组，它的用处就是占用下标并帮助标识数组的长度。

当我们想要遍历一个长度为n的存在empty元素数组的时候，可以使用for循环，利用数组下标对数组进行遍历。