# react重读笔记
## JSX
- JSX 防止注入攻击
> React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。
- JSX 表示对象
> Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。React.createElement() 会预先执行一些检查，以帮助你编写无错代码。最终转换成这个对象：
```js
// 注意：这是简化过的结构，被称为react元素
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

## 元素渲染
- 使用ReactDOM.render()将react元素渲染到根节点上，一般react只包含一个根节点。
- react元素是不可变对象，一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。
- 只会更新需要更新的部分。

## 组件&Props
- 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。
- Props 的只读性，组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

## 事件处理
- react绑定dom事件与传统html区别是，不能通过return false的方式阻止默认行为，必须显示的使用preventDefault。
- react事件绑定函数的参数e是一个合成事件。
- 想要在事件绑定函数中使用this，必须要先在constructor中使用bind绑定this（或者使用箭头函数）到实例，原因是，react在处理事件绑定函数时，会将其赋值给onclick，而class声明默认严格模式，在严格模式下直接调用函数，函数内的this指向undefined。所以为了防止这种情况，必须要先绑定this。

## 条件渲染

## 列表&Key
- 当渲染列表时，必须指定唯一的key值，特别是要对列表进行修改或排序时；指定唯一key值既能避免bug，又能优化性能，具体参考react diff算法。
- 指定的key属性不会出现在props里面。

## 表单
- 受控与非受控组件
- 受控组件的value如果设置为undefined或null，会变不受控。
- 非受控组件可通过ref来获取更新后组件的value。

## 状态提升

## 组合&继承

## 无障碍
```js
<Fragement> & <></>
```

## 代码分隔
- import() 代码分割的最佳方式是动态引入模块，当使用 Babel 时，你要确保 Babel 能够解析动态 import 语法而不是将其进行转换。对于这一要求你需要 babel-plugin-syntax-dynamic-import 插件。
- React.lazy 
> React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库。它有一个很棒的服务端渲染打包指南。React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。
- Suspense
> 如果在 MyComponent 渲染完成后，包含 OtherComponent 的模块还没有被加载完成，我们可以使用加载指示器为此组件做优雅降级。这里我们使用 Suspense 组件来解决。
- 异常捕获边界（Error boundaries） 如果模块加载失败，可以通过异常捕获组件捕获异常并友好提示用户。
- 基于路由的代码分割，使用React.lazy和React-Router
- 目前React.lazy只支持default exports，即默认导出。

## Context

## 错误边界
> 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。

## Refs转发

## Fragements

## 高阶组件
- 不要在render中使用高阶组件
- 务必复制静态方法
- refs不会被传递，解决方法是React.forwardRef

## 与第三方库协同

## 深入JSX
- Props 默认值为 “True”，但不建议这么做，可能与ES6写法混淆
- 布尔类型、Null 以及 Undefined 将会忽略
> false, null, undefined, and true 是合法的子元素。但它们并不会被渲染。
值得注意的是有一些 “falsy” 值，如数字 0，仍然会被 React 渲染。

## 性能优化
- 使用生产版本
- 使用如webpack等打包工具
- 虚拟化长列表。react-window 和 react-virtualized 是热门的虚拟滚动库。
- shouldComponentUpdate
- 使用不可变数据结构

## Portals
- 一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。
- Portals只是改变了节点位置，但仍存在于React树中，诸如事件冒泡等都不改变。

## 不使用ES6

## 不使用JSX

## 协调（Diff算法）
- 比对不同类型的元素
 - 当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树。
 > 当拆卸一颗树时，对应的 DOM 节点也会被销毁。组件实例将执行 componentWillUnmount() 方法。当建立一颗新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 componentWillMount() 方法，紧接着 componentDidMount() 方法。所有跟之前的树所关联的 state 也会被销毁。
- 比对同一类型的元素
 > 当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。
- 比对同类型的组件元素
 > 当一个组件更新时，组件实例保持不变，这样 state 在跨越不同的渲染时保持一致。React 将更新该组件实例的 props 以跟最新的元素保持一致，并且调用该实例的 componentWillReceiveProps() 和 componentWillUpdate() 方法。下一步，调用 render() 方法，diff 算法将在之前的结果以及新的结果中进行递归。
 - 对子节点进行递归
 > 在默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。是否产生差异参照以上比对算法。不会检测位置是否发生变化。
 > 为了解决以上问题，引入了keys，对于相同keys的组件或元素仅位置发生变化，react会进行移动，不会更新，提高了性能。注意，key默认使用数组下标，那么修改顺序时会修改当前的 key，导致非受控组件的 state（比如输入框）可能相互篡改导致无法预期的变动，所以key最好为唯一值。

## Refs & Dom

## Render Props
> 任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”.
- 将 Render Props 与 React.PureComponent 一起使用时要小心
> 如果你在 render 方法里创建函数，那么使用 render prop 会抵消使用 React.PureComponent 带来的优势。因为浅比较 props 的时候总会得到 false，并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。要避免这种问题，可以将render props函数定义在子组件中，通过传递配置来动态展示内容。

## 静态类型检查

## 严格模式
- 使用<React.StrictMode>包裹想要以严格模式执行的组件
  StrictMode 目前有助于：
  - 识别不安全的生命周期
  - 关于使用过时字符串 ref API 的警告
  - 关于使用废弃的 findDOMNode 方法的警告
  - 检测意外的副作用
  - 检测过时的 context API

## Web Component
> 如果使用 Babel 来转换 class，此代码将不会起作用。请查阅该 issue 了解相关讨论。 在加载 Web Components 前请引入 custom-elements-es5-adapter.js 来解决该 issue。

## React.Component
- 组件的生命周期
> 挂载
> - constructor()
> - static getDerivedStateFromProps()
> - render()
> - componentDidMount()
> 更新
> - static getDerivedStateFromProps()
> - shouldComponentUpdate()
> - render()
> - getSnapshotBeforeUpdate()
> - componentDidUpdate()
> 卸载
> - componentWillUnmount()
> 错误处理
> - static getDerivedStateFromError()
> - componentDidCatch()
- 其他API
  - setState()
  - forceUpdate()
- class属性
  - defaultProps
  - displayName
- 实例属性
  - props
  - state
- render
  > render() 方法是 class 组件中唯一必须实现的方法。
  > render被调用是会检查this.props，this.state的变化并返回以下类型，返回类型为undefined，对象都会报错。
  - React 元素。通常通过 JSX 创建。
  - 数组或 fragments。 使得 render 方法可以返回多个元素。
  - Portals。可以渲染子节点到不同的 DOM 子树中。
  - 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
  - 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && <Child /> 的模式，其中 test 为布尔类型。)
  > render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。
  > 如果 shouldComponentUpdate() 返回 false，则不会调用 render()
- constructor(props)
  > 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
  - 在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。
  - 避免将 props 的值复制给 state
- componentDidMount()
- componentDidUpdate(prevProps, prevState, snapshot)
  - 可以选择在此处进行网络请求
  - 直接调用 setState()，但请注意它必须被包裹在一个条件语件里
  - 如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。
  - 尽量避免使用派生state，即根据props更新state。建议的方式是
    - 完全可控的组件，即通过props控制渲染
    - 有 key 的非可控组件，通过设置不同key，对于相同props的组件也会重新渲染；特别适用于表单
  - 概括
    - 设计组件时，重要的是确定组件是受控组件还是非受控组件。
    - 对于受控组件，不要直接复制（mirror） props 的值到 state 中
    - 对于不受控的组件，当你想在 prop 变化（通常是 ID ）时重置 state 的话，可以选择一下几种方式：
      - 建议: 重置内部所有的初始 state，使用 key 属性
        - 选项一：仅更改某些字段，观察特殊属性的变化（比如 props.userID）。
        - 选项二：使用 ref 调用实例方法。
  - memoize-one，避免重复渲染帮助函数
  - componentWillUnmount()
    - 清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等
  - shouldComponentUpdate(nextProps, nextState)
    - 首次渲染或使用 forceUpdate() 时不会调用该方法
  - static getDerivedStateFromProps()
    > getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。该方法16.4版本有bug。
    - 如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 componentDidUpdate。
    - 如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
    - 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控 代替。
  - getSnapshotBeforeUpdate(prevProps, prevState)
    > getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
  - Error boundaries
    > 如果 class 组件定义了生命周期方法 static getDerivedStateFromError() 或 componentDidCatch() 中的任何一个（或两者），它就成为了 Error boundaries。通过生命周期更新 state 可让组件捕获树中未处理的 JavaScript 错误并展示降级 UI。
    - Error boundaries 仅捕获组件树中以下组件中的错误。但它本身的错误无法捕获。
  - static getDerivedStateFromError(error)
    - 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
    - getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()。
  - componentDidCatch(error, info)
    - componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况

- 其他API
  - setState(updater[, callback])
    - updater可以为带有(state,props)参数的函数，也可以是对象
    - setState会批量更新
    - 如果将setState放在setTimeout或原生事件或Promise回调或请求回调中执行，那么会立即执行render，即使是同一个定时器中的多次setState。原理是这些回调里的setState没有走批量更新的过程。
  - forceUpdate()

- class属性
  - defaultProps
  - displayName，字符串多用于调试消息

## ReactDOM
- ReactDOM.render(element, container[, callback])
  > 在提供的 container 里渲染一个 React 元素，并返回对该组件的引用（或者针对无状态组件返回 null）。如果 React 元素之前已经在 container 里渲染过，这将会对其执行更新操作，并仅会在必要时改变 DOM 以映射最新的 React 元素。如果提供了可选的回调函数，该回调将在组件被渲染或更新之后被执行。
  - ReactDOM.render() 目前会返回对根组件 ReactComponent 实例的引用，需要避免使用，未来有可能异步。
- ReactDOM.hydrate(element, container[, callback])
  > 与 render() 相同，但它用于在 ReactDOMServer 渲染的容器中对 HTML 的内容进行 hydrate 操作。React 会尝试在已有标记上绑定事件监听器。
- ReactDOM.unmountComponentAtNode(container)
  > 从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。
- ReactDOM.findDOMNode(component)。
  - findDOMNode 是一个访问底层 DOM 节点的应急方案（escape hatch）。在大多数情况下，不推荐使用该方法，因为它会破坏组件的抽象结构。严格模式下该方法已弃用。
  - 大多数情况下，你可以绑定一个 ref 到 DOM 节点上，可以完全避免使用 findDOMNode
  - 当组件渲染的内容为 null 或 false 时，findDOMNode 也会返回 null。当组件渲染的是字符串时，findDOMNode 返回的是字符串对应的 DOM 节点。从 React 16 开始，组件可能会返回有多个子节点的 fragment，在这种情况下，findDOMNode 会返回第一个非空子节点对应的 DOM 节点。
- ReactDOM.createPortal(child, container)
  > 创建 portal。Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。

## ReactDOMServer
> ReactDOMServer 对象允许你将组件渲染成静态标记。通常，它被使用在 Node 服务端上
> 下述方法可以被使用在服务端和浏览器环境。
- ReactDOMServer.renderToString(element)
  > 将 React 元素渲染为初始 HTML。React 将返回一个 HTML 字符串。你可以使用此方法在服务端生成 HTML，并在首次请求时将标记下发，以加快页面加载速度，并允许搜索引擎爬取你的页面以达到 SEO 优化的目的。如果你在已有服务端渲染标记的节点上调用 ReactDOM.hydrate() 方法，React 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。
- ReactDOMServer.renderToStaticMarkup(element)
  > 此方法与 renderToString 相似，但此方法不会在 React 内部创建的额外 DOM 属性，例如 data-reactroot。如果你希望把 React 当作静态页面生成器来使用，此方法会非常有用，因为去除额外的属性可以节省一些字节。如果你计划在前端使用 React 以使得标记可交互，请不要使用此方法。你可以在服务端上使用 renderToString 或在前端上使用 ReactDOM.hydrate() 来代替此方法。

> 下述附加方法依赖一个只能在服务端使用的 package（stream）。它们在浏览器中不起作用。
- ReactDOMServer.renderToNodeStream(element)
  > 将一个 React 元素渲染成其初始 HTML。返回一个可输出 HTML 字符串的可读流。通过可读流输出的 HTML 完全等同于 ReactDOMServer.renderToString 返回的 HTML。你可以使用本方法在服务器上生成 HTML，并在初始请求时将标记下发，以加快页面加载速度，并允许搜索引擎抓取你的页面以达到 SEO 优化的目的。如果你在已有服务端渲染标记的节点上调用 ReactDOM.hydrate() 方法，React 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。
- ReactDOMServer.renderToStaticNodeStream(element)
  > 此方法与 renderToNodeStream 相似，但此方法不会在 React 内部创建的额外 DOM 属性，例如 data-reactroot。如果你希望把 React 当作静态页面生成器来使用，此方法会非常有用，因为去除额外的属性可以节省一些字节。通过可读流输出的 HTML，完全等同于 ReactDOMServer.renderToStaticMarkup 返回的 HTML。如果你计划在前端使用 React 以使得标记可交互，请不要使用此方法。你可以在服务端上使用 renderToNodeStream 或在前端上使用 ReactDOM.hydrate() 来代替此方法。

## DOM元素
> 在 React 中，所有的 DOM 特性和属性（包括事件处理）都应该是小驼峰命名的方式。例如，与 HTML 中的 tabindex 属性对应的 React 的属性是 tabIndex。例外的情况是 aria-* 以及 data-* 属性，一律使用小写字母命名。比如, 你依然可以用 aria-label 作为 aria-label。
- 属性差异
  - checked
  - className
  >如果你在 React 中使用 Web Components（这是一种不常见的使用方式），请使用 class 属性代替。
  - dangerouslySetInnerHTML
  > {__html: ''}
  - htmlFor
  > 用于代替for，因为for在js中是关键字
  - selected
  - style
  > 样式不会自动补齐前缀；
  > React 会自动添加 ”px” 后缀到内联样式为数字的属性后。如需使用 ”px” 以外的单位，请将此值设为数字与所需单位组成的字符串。
  - 自定义属性需要全部小写

## 合成事件
> SyntheticEvent 实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()。如果因为某些原因，当你需要使用浏览器的底层事件时，只需要使用 nativeEvent 属性来获取即可。每个 SyntheticEvent 对象都包含以下属性
```js
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```
- 事件池
> SyntheticEvent 是合并而来。这意味着 SyntheticEvent 对象可能会被重用，而且在事件回调函数被调用后，所有的属性都会无效。出于性能考虑，你不能通过异步访问事件。如果你想异步访问事件属性，你需在事件上调用 event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。
- 支持的事件
> React 通过将事件 normalize 以让他们在不同浏览器中拥有一致的属性。以下的事件处理函数在冒泡阶段被触发。如需注册捕获阶段的事件处理函数，则应为事件名添加 Capture。例如，处理捕获阶段的点击事件请使用 onClickCapture，而不是 onClick。
```js
Clipboard Events
Composition Events
Keyboard Events
Focus Events
Form Events
Mouse Events
Pointer Events
Selection Events
Touch Events
UI Events
Wheel Events
Media Events
Image Events
Animation Events
Transition Events
Other Events
```