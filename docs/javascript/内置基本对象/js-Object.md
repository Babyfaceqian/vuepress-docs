# js-Object

## 构造函数属性
- Object.length
值为 1。
- Object.prototype
可以为所有 Object 类型的对象添加属性。
## 构造函数方法
- Object.assign()
通过复制一个或多个对象（的可枚举属性）来创建一个新的对象。原始类型会被包装为对象，且null 和 undefined 会被忽略，只有字符串的包装对象才可能有自身可枚举属性。异常会打断后续拷贝任务。对访问器的拷贝需要特殊处理一下。
- Object.create()
使用指定的原型对象和属性创建一个新对象。
- Object.defineProperty()
给对象添加一个属性并指定该属性的配置。
- Object.defineProperties()
给对象添加多个属性并分别指定它们的配置。
- Object.entries()
返回给定对象自身可枚举属性的 [key, value] 数组。
- Object.freeze()
冻结对象：其他代码不能删除或更改任何属性(但不会报错)。
- Object.getOwnPropertyDescriptor()
返回对象指定的属性配置。
- Object.getOwnPropertyNames()
返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。
- Object.getOwnPropertySymbols()
返回一个数组，它包含了指定对象自身所有的符号属性。
- Object.getPrototypeOf()
返回指定对象的原型对象。
- Object.is()
比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。
- Object.isExtensible()
判断对象是否可扩展。
- Object.isFrozen()
判断对象是否已经冻结。
- Object.isSealed()
判断对象是否已经密封。
- Object.keys()
返回一个包含所有给定对象自身可枚举属性名称的数组。
- Object.preventExtensions()
防止对象的任何扩展。
- Object.seal()
防止其他代码删除对象的属性。
- Object.setPrototypeOf()
设置对象的原型（即内部 [[Prototype]] 属性）。
- Object.values()
返回给定对象自身可枚举值的数组。