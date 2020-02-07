>ES2015中有四种相等算法：

> - 非严格相等比较 (==)
> - 严格相等比较 (===): 用于  Array.prototype.indexOf, Array.prototype.lastIndexOf, 和 case-matching等。不区分+0与-0，区分NaN和NaN。
> - 同值零: 用于 %TypedArray% 和 ArrayBuffer 构造函数、以及Map和Set操作, 并将用于 ES2016/ES7 中的String.prototype.includes。与同值相等的区别是+0与-0相等。
> - 同值: 用于所有其他地方，Object.is方法判断；同值意味着两者值需要一模一样，如+0只与+0相等，NaN与NaN相等，对象必须引用相等。Object.defineProperty修改不可修改属性时若改为非同值会报错。
> 
> JavaScript提供三种不同的值比较操作：
> - 
> - 严格相等 ("triple equals" 或 "identity")，使用 === , 比较前不进行隐式类型转换。值类型必须全等（除了NaN不等于NaN），对象必须引用相等。
> - 宽松相等 ("double equals") ，使用 ==，比较前进行隐式类型转换成相同类型进行全等比较。原则是，undefined/null与undefined/null比较为true，与Number/String/Boolean比较为false，与Object比较都不相等（除了document.all，其相当于undefined）；String与Number/Boolean比较会转换成Number进行比较，与Object比较会对Object调用Object.toString()进行比较；Number与Number全等比较，与Boolean比较会讲Boolean转换成Number进行比较，与Object比较会对Object调用Object.valueOf()进行比较；Boolean与Boolean全等比较，与Number/String比较都会转换成Number进行比较，与Object比较Boolean会转换成Number并对Object调用Object.valueOf()进行比较；Object与Object全等比较。
> - 以及 Object.is （ECMAScript 2015/ ES6 新特性）