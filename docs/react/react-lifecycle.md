# React 更新生命周期详解
## React 的更新生命周期
### React.Component
在未手动实现 `shouldComponentUpdate` 方法时， `setState` 和 父组件 `render` 都会直接触发该组件的更新。`setState` 会触发 `render`，父组件 `render` 会触发该组件 `componentWillReceiveProps` 和 `render`。
### React.PureComponent
内置实现了 `shouldComponentUpdate` 方法， 当调用 `setState` 和 父组件 `render` 时，`shouldComponentUpdate` 会对新旧 `state` 或 `props` 做一次浅比较，如果不相等则 `shouldComponentUpdate` 返回 `true` 执行 `render`，反之，`shouldComponentUpdate` 返回 `false`，不执行 `render`。父组件 `render` 一定会触发该组件的 `componentWillReceiveProps`。

```js 
/**
 * Child 是 React.PureComponent
 * 这里需要知道 setState 后 state 的合并是浅拷贝，
 * 也就是 Object.assign({}, oldState, newStateChange) 
 * 或 {...oldState, newStateChange}
 **/ 
class Child extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { a: { b: { d: 1 }, e: {} }, c: 1 };
    this.obj = { a: 1 };
  }
  componentWillReceiveProps() {
    /**
     * 当父组件 render 时，会执行该生命周期，
     * shouldComponentUpdate 会对新旧 props 做浅比较，
     * 如果不相等则返回 true 执行 render，反之，返回 false 不执行 render。
     **/
  }
  handleClick = () => {
    /**
     * 这里我们要改变 this.state.a.b.d 的值，
     * 为了保证组件在引用包含 d 的对象的时候会进行更新，
     * 需要将包含 d 的所有对象进行浅拷贝。由于是浅拷贝，
     * this.state.a.b.e 仍然指向原来的地址，对于只引用
     *  e 的组件，它不会更新，这是相比较深拷贝有优势的地方。
     *   */ 
    let a = {...this.state.a, b: {...this.state.a.b, d: 2}}
    this.setState({ a });
    console.log('this.state.a.b.e === a.b.e', this.state.a.b.e === a.b.e);
  }
  handleClick2 = () => {
    /**
     * 这里将 c 设置为 1，与旧 state 浅比较相等，不会触发 render
     **/
    this.setState({ c: 1 })
  }
  render() {
    console.log('render');
    return (
      <div className={styles.main}>
        <button onClick={this.handleClick}>render Sub</button>
        <button onClick={this.handleClick2}>not render Sub</button>
      </div>
    );
  }
}
```
## 状态管理库对更新生命周期的影响
### react-redux
用 react-redux 的 `connect` 包装后的组件，在接收 `nextProps` 之前，也就是 `componentWillReceiveProps` 生命周期之前会对新旧 `props` 做一次浅比较（对 props 对象的属性做 `===`）。如果比较结果相等，则不触发更新生命周期；反之，则触发全部更新生命周期。
这种优化也相同地体现在对 `store` 状态的更新当中。


### mobx-react
用 `@abserver` 包装组件后，`mobx-react` 也会对新旧 props 做浅比较，与 `react-redux` 相比存在以下区别：

- 它是通过`shouldComponentUpdate` 返回 `false` 的方式避免重复渲染。
- 父组件执行 `render` 时，会先执行 `componentWillReceiveProps`，如果子组件新旧 props 浅比较不一致，执行 `render`，反之，不会执行 `render`。与 `PureComponent` 一致。
- 当 `store` 状态更新时，直接对 `render` 中新旧引用的值或对象做浅比较，如果不相等，则执行 `render`，反之，不执行 `render`。
