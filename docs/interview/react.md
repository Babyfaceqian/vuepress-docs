# React
## 谈谈React事件机制
- 合成事件：React使用合成事件替换浏览器的原生事件，合成事件是 SyntheticEvent 包装器生成的实例，原生事件被放在该实例的 nativeEvent 下。合成事件实现了原生事件的接口，包括stopPropagation() 和 preventDefault()，并且兼容所有浏览器（如ie和chrome的事件绑定函数addEventListener，attachEvent）。
- 事件注册：几乎所有的事件根据不同类型绑定在 document 上而不是具体的 dom 节点上，好处是每种类型的事件只绑定一次，减少内存消耗。
- 事件存储：React将所有事件按照事件类型分类存储为不同的 `map` 对象，每个 `map`对象中按照 `组件id`-`回调函数` 的方式存储回调函数。
- 事件合成：React会根据不同的事件类型使用不同的合成对象，如鼠标单击事件-SyntheticMouseEvent，这些特定的合成对象都是继承自SyntheticEvent。
- 事件冒泡：由于事件都绑定在 document 上，必须利用浏览器的事件冒泡冒泡到 document 上才能触发事件。如果某个节点绑定了原生事件并且阻止了事件冒泡，则不会触发合成事件。而合成事件阻止冒泡是不会阻止原生事件的触发的。
- 事件派发：在React里所有事件的触发都是通过 `dispatchEvent` 方法统一进行派发的，根据事件类型获取 `map` 对象，然后根据当前的 `组件id` 获取回调函数。

需要注意的几个点：
- SyntheticEvent 是合并而来。这意味着 SyntheticEvent 对象可能会被重用，而且在事件回调函数被调用后，所有的属性都会无效。出于性能考虑，你不能通过异步访问事件。如果你想异步访问事件属性，你需在事件上调用 event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。
- 如需注册捕获阶段的事件处理函数，则应为事件名添加 Capture。例如，处理捕获阶段的点击事件请使用 onClickCapture，而不是 onClick。web安全性