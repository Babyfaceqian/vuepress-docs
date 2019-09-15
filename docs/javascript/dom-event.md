## 所有事件都会有的属性 （非IE）
| 属性/方法                  | 类型         | 读/写 | 说明                                                                          |
| -------------------------- | ------------ | ----- | ----------------------------------------------------------------------------- |
| bubbles                    | Boolean      | 只读  | 表明事件是否冒泡                                                              |
| cancelable                 | Boolean      | 只读  | 表明是否可以取消事件的默认行为                                                |
| currentTarget              | Element      | 只读  | 其事件处理程序当前正在处理事件的那个元素                                      |
| defaultPrevented           | Boolean      | 只读  | 为true表示已经调用了preventDefault()                                          |
| detail                     | Integer      | 只读  | 与事件相关的细节信息                                                          |
| eventPhase                 | Integer      | 只读  | 调用事件处理程序的阶段：1表示捕获阶段，2表示处于目标，3表示冒泡阶段           |
| preventDefault()           | Function     | 只读  | 取消事件的默认行为。如果cancelable是true，则可以使用这个方法。                |
| stopImmediatePropagation() | Function     | 只读  | 取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用                    |
| stopPropagation            | Function     | 只读  | 取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法             |
| target                     | Element      | 只读  | 事件的目标                                                                    |
| trusted                    | Boolean      | 只读  | 为true表示事件是浏览器生成的。为false表示事件是由开发人员通过JavaScript创建的 |
| type                       | String       | 只读  | 被触发的事件的类型                                                            |
| view                       | AbstractView | 只读  | 与事件关联的抽象视图。等同于发生事件的window对象                              |

注意事项：
- currentTarget是指事件处理函数绑定的元素，即在哪个元素上处理事件；target是指事件作用的目标元素。例如，点击button（target），事件冒泡到document.body（currentTarget）被处理。
- 事件处理程序内部的对象this始终指向currentTarget的值。

## 事件类型
### UI（User Interface，用户界面）事件
- DOMActivate，表示元素已经被用户操作激活，不建议使用
- load：window/frame/img/object。
- unload：window/frame/object。
- abort：在用户停止下载过程时，如果嵌入的内容没有加载完，则在`<object>`元素上面触发。
- error：window/img/object/frame
- select：input/texterea
- resize：当窗口或框架的大小变化时在window或框架上面触发
- scroll：当用户滚动带滚动条的元素中的内容时，在该元素上面触发。`<body>`元素中包含所加页面的滚动条。
- 