# js-Number
new Number(value);
>Number 对象主要用于：
>- 如果参数无法被转换为数字，则返回 NaN。
>- 在非构造器上下文中 (如：没有 new 操作符)，Number 能被用来执行类型转换。

## 属性
- Number.EPSILON
两个可表示(representable)数之间的最小间隔。
- Number.MAX_SAFE_INTEGER
JavaScript 中最大的安全整数 (2^53 - 1)。
- Number.MAX_VALUE
能表示的最大正数。最小的负数是 -MAX_VALUE。
- Number.MIN_SAFE_INTEGER
JavaScript 中最小的安全整数 (-(2^53 - 1)).
- Number.MIN_VALUE
能表示的最小正数即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE。
- Number.NaN
特殊的“非数字”值。
- Number.NEGATIVE_INFINITY
特殊的负无穷大值，在溢出时返回该值。
- Number.POSITIVE_INFINITY
特殊的正无穷大值，在溢出时返回该值。
- Number.prototype
  Number 对象上允许的额外属性。

## 方法
- Number.isNaN()
确定传递的值是否是 NaN。
- Number.isFinite()
确定传递的值类型及本身是否是有限数。
- Number.isInteger()
确定传递的值类型是“number”，且是整数。
- Number.isSafeInteger()
确定传递的值是否为安全整数 ( -(2^53 - 1) 至 2^53 - 1之间)。
- Number.parseFloat()
和全局对象 parseFloat() 一样。
- Number.parseInt()
和全局对象 parseInt() 一样。

## 实例方法
- Number.prototype.toExponential(digits)
返回指数表示法，传入小数点后位数进行四舍五入。
- Number.prototype.toFixed(digits)
返回定点表示法，传入小数点后位数进行四舍五入。
- Number.prototype.toLocaleString()
转成本地字符串.
- Number.prototype.toPrecision(x)
返回指定精度的字符串，x为1~100之间（包括）的数（小数只取整数部分）。如果省略了该参数，则调用方法 toString()。ECMA-262只支持1~21之间（包括）的数。
- Number.prototype.toString([radix])
返回指定进制的字符串，radix可选，默认十进制。
- Number.prototype.valueOf()
返回原始值。