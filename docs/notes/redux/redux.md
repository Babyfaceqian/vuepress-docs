# redux
## redux 原理
理解 redux 的实现原理，主要是看 store 对象。store 对象中需要包含以下几个基本的方法：
- getState 获取 state
- dispatch 派发 action
- subscribe 订阅 state 更新

createStore 方法用于创建 store，利用闭包，缓存了两个变量：
- state 状态
- listeners 监听函数队列

createStore 接收一个参数 reducer 方法，该方法接收两个参数，state 和 action，并且返回更新后的 state。reducer 必须符合这样的定义，具体内部实现无关紧要。

combineReducers 方法用于组合拆分的 reducer，主要是为了方便代码组织。
```js
let createStore = (reducer) => {
    let state;
    //获取状态对象
    //存放所有的监听函数
    let listeners = [];
    let getState = () => state;
    //提供一个方法供外部调用派发action
    let dispatch = (action) => {
        //调用管理员reducer得到新的state
        state = reducer(state, action);
        //执行所有的监听函数
        listeners.forEach((l) => l())
    }
    //订阅状态变化事件，当状态改变发生之后执行监听函数
    let subscribe = (listener) => {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter(l !== listener);
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}
let combineReducers=(renducers)=>{
    //传入一个renducers管理组，返回的是一个renducer
    return function(state={},action={}){
        let newState={};
        for(var attr in renducers){
            newState[attr]=renducers[attr](state[attr],action)

        }
        return newState;
    }
}
export {createStore,combineReducers};
```

## react-redux 原理

redux 可以跟很多不同的框架一起使用，其本身没什么依赖。那么，如何在 react 中使用呢？我们不妨思考一下我们需要它提供给我们什么？
- 在指定组件中可以访问到 state
- 在指定组件中可以调用 dispatch 更新 state
- 当 state 改变时，能够触发指定组件的更新

对于这三个需求，react-redux 的实现方式如下：
- 利用高阶组件，将 state 保存到父组件的组件状态中，通过 props 传递给子组件
- 利用高阶组件，将 dispatch 通过 props 传递给子组件
- 在父组件中订阅，当 state 改变时，利用 setState 更新组件状态，从而触发子组件的更新

实现这三个目标最主要的方法是 connect 函数。connect 函数返回一个高阶组件，为了能够在这个高阶组件中获取到 store，react-redux 利用了 react 的 Context API，通过 Provider 组件将 store 保存在 context 中。

```js
// context.js
import React from 'react';
const Context = React.createContext('null');

export default Context;
```

```js
// Provider.js
import React from 'react';
import Context from './context';
export default class Provider extends React.Component {
  render() {
    return <Context.Provider value={{ store: this.props.store }}>{this.props.children}</Context.Provider>
  }
}
```

```js
// connect.js
import React from 'react';
import Context from './context';
const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends React.Component {
    static contextType = Context;
    constructor() {
      super();
      this.state = {};
    }
    componentWillMount() {
      this.setState(mapStateToProps(this.context.store.getState()))
      this.unsubscribe = this.context.store.subscribe(() => {
        this.setState(mapStateToProps(this.context.store.getState()))
      })
    }
    componentWillUnmount() {
      this.unsubscribe();
    }
    render() {
      console.log('state', this.state)
      return <WrappedComponent {...this.state} {...mapDispatchToProps(this.context.store.dispatch)} />
    }
  }
  return Connect;
}

export default connect;
```