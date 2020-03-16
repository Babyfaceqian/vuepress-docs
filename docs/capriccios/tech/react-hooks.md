# React Hooks
使用 React Hooks 意味着将使用 Function 组件代替原来的 Class 组件。官方文档中描述了使用 Function 组件的动机或者说使用其带来的好处。
## 复用状态逻辑
> React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 render props 和 高阶组件。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以在 DevTools 过滤掉它们，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。
>
> 你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。

使用自定义的 Hooks 可以复用组件之间的状态，这是 Class 组件所不能做到的。
## 复杂组件变得难以理解
> 我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 componentDidMount 和 componentDidUpdate 中获取数据。但是，同一个 componentDidMount 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 componentWillUnmount 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。
>
> 在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。
>
> 为了解决这个问题，Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

Class 组件的每个生命周期只能定义一个，在生命周期中往往又有很多不同的逻辑，就如摘要中所说。使用 useEffect 可以拆分生命周期中的逻辑，使得代码更加清晰，测试更加简单。另外，State 的状态逻辑到处都是，很难管理，useReducer 可以提供可预测的状态管理功能。
## 难以理解的 class
> 除了代码复用和代码管理会遇到困难外，我们还发现 class 是学习 React 的一大屏障。你必须去理解 JavaScript 中 this 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。没有稳定的语法提案，这些代码非常冗余。大家可以很好地理解 props，state 和自顶向下的数据流，但对 class 却一筹莫展。即便在有经验的 React 开发者之间，对于函数组件与 class 组件的差异也存在分歧，甚至还要区分两种组件的使用场景。
>
> 另外，React 已经发布五年了，我们希望它能在下一个五年也与时俱进。就像 Svelte，Angular，Glimmer等其它的库展示的那样，组件预编译会带来巨大的潜力。尤其是在它不局限于模板的时候。最近，我们一直在使用 Prepack 来试验 component folding，也取得了初步成效。但是我们发现使用 class 组件会无意中鼓励开发者使用一些让优化措施无效的方案。class 也给目前的工具带来了一些问题。例如，class 不能很好的压缩，并且会使热重载出现不稳定的情况。因此，我们想提供一个使代码更易于优化的 API。
>
> 为了解决这些问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

JavaScript 中的 this 指的是执行上下文，要搞清 this 的指向本来就是一件很复杂的事情。在 Class 组件中 this 基本都是绑定在组件上，变得更像是 Class 组件特有的符号，一来经常需要考虑如何绑定组件，二来往往与其他用途的 this 产生混淆。Function 组件则干脆移除了 this，避免了以上的问题。

Component Folding 是为了优化代码压缩、执行效率。如摘要所说，class 会阻止这类优化。

React 从最一开始就提倡函数组件，只不过为了更接近面向对象编程而做了类组件的妥协。hooks 的出现改变了局面，可以让 React 回归到最初的想法了。
## 渐进策略
> 总结：没有计划从 React 中移除 class。

虽然 hooks 才推出不久，现在的应用又几乎都是使用传统的类组件，但 hooks 完全具有了替代类组件的能力，只要开发人员愿意，完全可以将类组件替换成函数组件，并且使用 hooks 来管理组件。新的应用更不用说了，为什么不用 hooks 呢？
## 其他
抛开 hooks，Function 组件其实有点类似 Class 组件中的 render 函数，两者都是纯函数。Function 组件中定义的变量、函数也可以在 render 函数中定义，一样的效果。

但在 Class 组件中，变量被定义在 state 中，函数被定义在组件实例上。我们要在函数中使用 state 或者 props 都是从 this 当中获取，这样的操作在异步处理时会有隐含的 bug。比如以下一段代码。
```js
class Comp extends React.Component {
    state = {
        value: 0
    }

    handleClick = () => {
        setTimeout(() => alert(this.state.value), 3000);
    }
    handleClick2 = () => {
        this.setState({ value: 1 });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>alert</button>
                <button onClick={this.handleClick2}>changeValue</button>
            </div>
        )
    }
}

```
点击 alert 按钮后立即点击 changeValue 按钮，代码本来预期的是 0，结果 3 秒后打印的是 1。props 也是同理。由于 state 和 props 的改变可能会影响一些异步操作的结果，我们必须利用闭包的特性将这些可能会被修改的值保存下来。
```js
handleClick = () => {
    const value = this.state.value;
    setTimeout(() => alert(this.state.value), 3000);
}
```
这给开发带来很多不便，一是开发人员图方便很容易忘记定义局部变量，二是很多时候开发人员需要在函数顶部定义大量的变量，有些变量甚至是层层解构出来的，这将增加很大一部分的代码。

而 Function 组件直接采用闭包的方式，这些变量几乎只用在组件顶部定义一次就可以让后面的函数直接使用，大大的减少了变量定义的代码。