# Redux
## 谈谈Redux实现机制
- 创建reducer：该纯函数用于接收旧的 state 和 action，根据 action 进行相应计算后返回新的 state。
- 创建action：action是一个简单的 JavaScript 对象，包含 type 和其他自定义的属性。
- 创建store：使用 createStore 创建 store，传入 reducer、preloadState、enhancer，返回包含 dispatch、subscribe、getState、replaceReducer 的 store 对象。
- 订阅state更新：使用 store.subscribe(Listener) 来订阅 state 更新。
- 更新state：调用 store.dispatch 并传入 action，redux 会调用 reducer 函数根据 action.type 进行相应的计算，并返回新的 state；执行所有 Listener。
- 获取state：使用 store.getState() 获取最新的 state。

## 谈谈React-redux的实现机制
- 共享store：使用 react-redux 提供的 Provider 高阶组件，将 store 放在子组件的 context 中。
- 组件绑定：使用 connect 高阶函数将 state 和 dispatch 合并到组件的 props 中。connect 接受 mapStateToProps、mapDispatchToProps 两个参数，mapStateToProps 用来定制要合并到 props 中的属性，mapDispatchToProps 用来定制合并到 props 的 dispatch 函数。被 connect 包装后的组件在 setState 或父组件 render 时对新旧 state 和新旧 props 做一次浅比较，简单来说如果该组件绑定 store 中的 state 没有发生变化，则组件不会因此而更新。