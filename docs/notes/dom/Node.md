# Node
Node 是一个接口，许多 DOM API 对象的类型会从这个接口继承。它允许我们使用相似的方式对待这些不同类型的对象；比如, 继承同一组方法，或者用同样的方式测试。

以下接口都从 Node 继承其方法和属性：

Document, Element, Attr, CharacterData (which Text, Comment, and CDATASection inherit), ProcessingInstruction, DocumentFragment, DocumentType, Notation, Entity, EntityReference

在方法和属性不相关的特定情况下，这些接口可能返回 null。它们可能会抛出异常 - 例如，当将子节点添加到不允许子节点存在的节点时。

## 属性
从其父类型 EventTarget 继承属性。

#### Node.baseURI `只读`
返回一个表示base URL的DOMString。不同语言中的base URL的概念都不一样。 在HTML中，base URL表示协议和域名，以及一直到最后一个'/'之前的文件目录。

比如 `https://www.baidu.com/a/b` 网址下打印 `document.baseURI` 结果 `https://www.baidu.com/a/b`。

#### Node.childNodes `只读`
返回一个包含了该节点所有子节点的**实时**的NodeList。NodeList 是“实时的”意思是，如果该节点的子节点发生了变化，NodeList对象就会自动更新。 

#### Node.firstChild `只读`
返回该节点的第一个子节点Node，如果该节点没有子节点则返回null。

#### Node.isConnected `只读`
返回一个布尔值用来检测该节点是否已连接(直接或者间接)到一个上下文对象上，比如通常DOM情况下的Document对象，或者在shadow DOM情况下的ShadowRoot对象。

#### Node.lastChild `只读`
返回该节点的最后一个子节点Node，如果该节点没有子节点则返回null。

#### Node.nextSibling `只读`
返回与该节点同级的下一个节点 Node，如果没有返回null。

#### Node.nodeName `只读`
返回一个包含该节点名字的DOMString。节点的名字的结构和节点类型不同。比如HTMLElement的名字跟它所关联的标签对应，就比如HTMLAudioElement的就是 'audio' ，Text节点对应的是 '#text' 还有Document节点对应的是 '#document'。

#### Node.nodeType `只读`
返回一个与该节点类型对应的无符号短整型的值，可能的值如下：

| name | value |
| -- | -- |
ELEMENT_NODE | 1
ATTRIBUTE_NODE(不推荐) | 2
TEXT_NODE | 3
CDATA_SECTION_NODE | 4
ENTITY_REFERENCE_NODE(不推荐) | 5
ENTITY_NODE(不推荐) | 6
PROCESSING_INSTRUCTION_NODE | 7
COMMENT_NODE | 8
DOCUMENT_NODE | 9
DOCUMENT_TYPE_NODE | 10
DOCUMENT_FRAGMENT_NODE | 11
NOTATION_NODE(不推荐) | 12

#### Node.nodeValue 
返回或设置当前节点的值。

#### Node.ownerDocument `只读`
返回这个元素属于的 Document对象 。 如果没有Document对象与之关联，返回null。

#### Node.parentNode `只读`
返回一个当前结点 Node的父节点 。如果没有这样的结点,，比如说像这个节点是树结构的顶端或者没有插入一棵树中， 这个属性返回null。

#### Node.parentElement `只读`
返回一个当前节点的父节点 Element 。 如果当前节点没有父节点或者说父节点不是一个元素(Element), 这个属性返回null。

#### Node.previousSibling  `只读`
返回一个当前节点同辈的前一个结点( Node) ，或者返回null（如果不存在这样的一个节点的话）。

#### Node.textContent
返回或设置一个元素内所有子结点及其后代的文本内容。

## 方法
从其父类型 EventTarget 继承方法。

#### Node.appendChild()
将指定的 childNode 参数作为最后一个子节点添加到当前节点。
如果参数引用了 DOM 树上的现有节点，则节点将从当前位置分离，并附加到新位置。

#### Node.cloneNode()
克隆一个 Node，并且可以选择是否克隆这个节点下的所有内容。默认情况下，节点下的内容会被克隆。

#### Node.compareDocumentPosition()
比较当前节点与文档中的另一节点的位置。

#### Node.contains()
返回一个 Boolean 布尔值，来表示传入的节点是否为该节点的后代节点。

#### Node.getRootNode()
返回上下文对象的根结点。如果shadow root节点存在的话，也可以在返回的节点中包含它。

#### Node.hasChildNodes()
返回一个Boolean 布尔值，来表示该元素是否包含有子节点。

#### Node.insertBefore()
在当前节点下增加一个子节点 Node，并使该子节点位于参考节点的前面。

#### Node.isDefaultNamespace()
接受名称空间URI作为参数，Boolean如果名称空间是给定节点上的默认名称空间，则返回true值；否则返回false。

