# js-Array
## Array方法
- Array.from(arrayLike[, mapFn[, thisArg]])
- Array.isArray(obj)
- Array.of(element0[, element1[, ...[, elementN]]])
## 实例属性
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

## Array实例方法
- var new_array = old_array.concat(value1[, value2[, ...[, valueN]]]) 对象引用、值赋值
- arr.copyWithin(target[, start[, end]]) target为负数则从末尾开始计算，如果 target 大于等于 arr.length，将会不发生拷贝，即不会改变原数组大小
- arr.entries() 返回arr的迭代器
- arr.every(callback[, thisArg]) 若收到一个空数组，此方法在一切情况下都会返回 true。
- arr.fill(value[, start[, end]]) 不包括终止索引，value为对象是，填入引用
- var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
- arr.find(callback[, thisArg]) 没有匹配时返回undefined
- arr.keys() 返回一个新的 Array 迭代器对象。索引迭代器会包含那些没有对应元素的索引。
- arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])
- var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg]) 会忽略空值，返回的数组当中仍保留空值
- arr.pop() 返回删除的元素，当数组为空时，返回undefined
- arr.push(element1, ..., elementN)
- arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue]) initialValue作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
- arr.reduceRight(callback[, initialValue])
- arr.reverse() 会改变原数组
- arr.shift() 返回删除的元素，当数组为空时，返回undefined
- arr.slice([begin[, end]]) begin或end为负数时，均从倒数位置开始计算，提取元素不包含end
- arr.some(callback(element[, index[, array]])[, thisArg])
- arr.sort([compareFunction]) 会改变原数组；如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
- array.splice(start[, deleteCount[, item1[, item2[, ...]]]]) 会改变原数组；如果 deleteCount 是 0 或者负数，则不移除元素；返回值是由被删除的元素组成的一个数组。
- arr.toLocaleString([locales[,options]]) 对每个元素进行toLocaleString处理，并返回join()的结果
- arr.toString() 当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。如arr + ""
- arr.unshift(element1, ..., elementN) 返回其 length 属性值
- arr.values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
- arr[Symbol.iterator]() 数组的 iterator 方法，默认情况下与 values() 返回值相同

## 注意事项
- 剩余语法(Rest syntax) 看起来和展开语法完全相同，不同点在于, 剩余参数用于解构数组和对象
- 当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes