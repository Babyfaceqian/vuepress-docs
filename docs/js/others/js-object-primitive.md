# JS对象与原始值的转换
## 原始值转换为对应对象
- 显示转换
```js
String('a'); // string转String对象
Number(1); // number转Number对象
Boolean(true); // boolean转Boolean对象
```
- 隐式转换
```js
let a = 'str';
a.length; // 调用字符串属性或方法时，会先将a转换成String对象（也可称为包装对象），然后获取length属性，执行完后，该包装对象会被销毁
```

## 对象转换为对应原始值
在对象转换为原始值时，会调用toPrimitive方法。该方法接受两个参数:
- input，必选，指要转换的值
- PreferredType, 可选，指要转成的原始值的预期类型。可取的值有"number"，"string"，"default"。

这里只讨论input为Object时，toPrimitive的实现步骤。
1. 如果不传PreferredType，则为"default"，等效于"number"。
2. 如果PreferredType为"number"，转换方法的调用顺序为valueOf、toString
3. 如果PreferredType为"string"，转换方法的调用顺序为toString、valueOf
4. 每个转换方法执行返回结果如果不是Object，则返回，不继续执行；否则继续执行下一个转换方法。
5. 执行完所有转换方法都返回了Object，则会报错。

模拟的代码如下：
```js
let o = {
  valueOf: function () {
    console.log('valueOf');
    return {};
  },
  toString: function () {
    console.log('toString');
    return 1;
  },
  orderNum: ['valueOf', 'toString'],
  orderStr: ['toString', 'valueOf'],
  [Symbol.toPrimitive](PreferredType) {
    let result;
    if (PreferredType == "number") { // number
      for(let i = 0;i < this.orderNum.length;i++) {
        result = this[this.orderNum[i]]();
        if (typeof result !== 'object') {
          return result;
        }
      }
    }
    if (PreferredType == "string") { // string
      for(let i = 0;i < this.orderStr.length;i++) {
        result = this[this.orderStr[i]]();
        if (typeof result !== 'object') {
          return result;
        }
      }
    }
    throw new Error('TypeError: Cannot convert to Primitive!');
  }
};

+o // TypeError: Cannot convert to Primitive!

```

## 参考
[ECMAScript 2015 (6th Edition, ECMA-262)](https://www.ecma-international.org/ecma-262/6.0/#sec-symbol.toprimitive)