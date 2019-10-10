# Function
new Function ([arg1[, arg2[, ...argN]],] functionBody)

## 原型对象
### 属性
- Function.arguments 此属性已被arguments替代。
- Function.caller 获取调用函数的具体对象。非标准
- Function.length 获取函数的接收参数个数。
- Function.name 获取函数的名称。
- Function.displayName 获取函数的display name。非标准
- Function.prototype.constructor
  
### 方法
- Function.prototype.apply()
- Function.prototype.bind()
- Function.prototype.call()
- Function.prototype.isGenerator() 非标准
- Function.prototype.toSource() 非标准
- Function.prototype.toString() 获取函数的实现源码的字符串。覆盖了 Object.prototype.toString 方法。
- 