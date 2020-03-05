# Console
## Console.assert()

判断第一个参数是否为真，false 的话抛出异常并且在控制台输出相应信息。

语法：
```
console.assert(assertion, obj1 [, obj2, ..., objN]);
console.assert(assertion, msg [, subst1, ..., substN]); // c-like message formatting
```
用例：
```js
// 输出对象
console.assert(false, {errorMsg: '自定义错误'});
// 输出格式化的错误信息
console.assert(false, 'the word is $s', 'error');
```
## Console.clear()
`非标准`

清空控制台，并输出 Console was cleared

## Console.count()

以参数为标识记录调用的次数，调用时在控制台打印标识以及调用次数。

语法：
```
console.count([label])
```
用例：
```js
console.count("alice"); // alice: 1
console.count("alice"); // alice: 2
```
## Console.countReset()

重置指定标签的计数器值

语法：
```
console.countReset([label]);
```
## Console.debug()

在控制台打印一条 "debug" 级别的消息。

语法：
```
console.debug(对象1 [, 对象2, ..., 对象N]);
console.debug(消息[, 字符串1, ..., 字符串N]);
```

## Console.dir() 
`非标准`

打印一条以三角形符号开头的语句，可以点击三角展开查看对象的属性。

语法：
```
console.dir(object);
```
## Console.dirxml()
`非标准`

打印 XML/HTML 元素表示的指定对象，否则显示 JavaScript 对象视图。

语法：
```
console.dirxml(object);
```
## Console.error()

打印一条错误信息

语法：
```
console.error(obj1 [, obj2, ..., objN]);
console.error(msg [, subst1, ..., substN]);
```
## Console.group()

创建一个新的内联 group, 后续所有打印内容将会以子层级的形式展示。调用 groupEnd()来闭合组。

语法：
```
console.group();
```
## Console.groupEnd()

闭合当前内联 group.

语法：
```
console.groupEnd();
```
## console.groupCollapsed()

创建一个新的内联 group。使用方法和 group() 相同，不同的是，groupCollapsed() 方法打印出来的内容默认是折叠的。

语法：
```
console.groupCollapsed();
```
## Console.info()

打印资讯类说明信息

语法：
```
console.info(obj1 [, obj2, ..., objN]);
console.info(msg [, subst1, ..., substN]);
```
## Console.log()

打印内容的通用方法

语法：
```
console.log(obj1 [, obj2, ..., objN);
console.log(msg [, subst1, ..., substN);
console.log('String: %s, Int: %d,Float: %f, Object: %o', str, ints, floats, obj)
console.log(`temp的值为: ${temp}`)
```
## Console.profile()
`非标准`
## Console.profileEnd()
`非标准`
## Console.table()

将列表型的数据打印成表格。

语法：
```
console.table(data [, columns]);
```
用例：
```js
console.table(["apples", "oranges", "bananas"]);
```
## Console.time()

启动一个以入参作为特定名称的计时器，在显示页面中可同时运行的计时器上限为10,000.

语法：
```
console.time(timerName);
```
用例：
```js
console.time('time');
```
## Console.timeEnd()
`非标准`

结束特定的 计时器 并以豪秒打印其从开始到结束所用的时间。

语法：
```
console.timeEnd(label);
```
## Console.timeLog()

打印特定 计时器 所运行的时间。

语法：
```
console.timeLog(label);
```
## Console.timeStamp()
`非标准`

添加一个标记到浏览器的 Timeline 或 Waterfall 工具。

语法：
```
console.timeStamp(label);
```
## Console.trace()

输出一个堆栈。

语法：
```
console.trace();
```
## Console.warn()

打印一个警告信息

语法：
```
console.warn(obj1 [, obj2, ..., objN]);
console.warn(msg [, subst1, ..., substN]);
```