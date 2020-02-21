# React 16.12.0 源码解读（二）之任务调度
## beginWork
该方法接收三个参数：
- `current`
- `workInProgress`
- `renderExpirationTime`

返回 `Fiber` 对象或 `null`。
```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderExpirationTime: ExpirationTime,
): Fiber | null {
  const updateExpirationTime = workInProgress.expirationTime;

  if (__DEV__) {
    // 先不考虑 dev 环境
  }

  if (current !== null) {
    const oldProps = current.memoizedProps; // null
    const newProps = workInProgress.pendingProps; // null

    if (
      oldProps !== newProps ||
      hasLegacyContextChanged() ||
      // Force a re-render if the implementation changed due to hot reload:
      (__DEV__ ? workInProgress.type !== current.type : false)
    ) {
      // 省略代码
    } else if (updateExpirationTime < renderExpirationTime) { // 两个时间相等
      // 省略代码
    } else {
      // An update was scheduled on this fiber, but there are no new props
      // nor legacy context. Set this to false. If an update queue or context
      // consumer produces a changed value, it will set this to true. Otherwise,
      // the component will assume the children have not changed and bail out.
      didReceiveUpdate = false;
    }
  } else {
    // 省略代码
  }

  // Before entering the begin phase, clear the expiration time.
  workInProgress.expirationTime = NoWork; // 0
  // 首次渲染为 hostRoot
  switch (workInProgress.tag) {
    // 省略代码
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderExpirationTime); // 返回子元素
    case IndeterminateComponent:
      {
        return mountIndeterminateComponent(current$$1, workInProgress, workInProgress.type, renderExpirationTime);
      }
    }
  }
}
```
## updateHostRoot

```js
function updateHostRoot(current, workInProgress, renderExpirationTime) {
  pushHostRootContext(workInProgress);
  const updateQueue = workInProgress.updateQueue;
  
  const nextProps = workInProgress.pendingProps; // null
  const prevState = workInProgress.memoizedState; // null
  const prevChildren = prevState !== null ? prevState.element : null; // null
  processUpdateQueue(
    workInProgress,
    updateQueue,
    nextProps,
    null,
    renderExpirationTime,
  );
  const nextState = workInProgress.memoizedState; // 整合后的 state，其中包含 element
  // Caution: React DevTools currently depends on this property
  // being called "element".
  const nextChildren = nextState.element;
  if (nextChildren === prevChildren) { // prevChildren = null
    // If the state is the same as before, that's a bailout because we had
    // no work that expires at this time.
    // 省略代码
  }
  const root: FiberRoot = workInProgress.stateNode;
  if (root.hydrate && enterHydrationState(workInProgress)) {
    // 省略代码
  } else {
    // Otherwise reset hydration state in case we aborted and resumed another
    // root.
    reconcileChildren(
      current,
      workInProgress,
      nextChildren,
      renderExpirationTime,
    );
    resetHydrationState(); // 忽略
  }
  return workInProgress.child; // 返回子元素
}
```
## pushHostRootContext
将 `hostRoot` 的上下文推入栈。
```js
function pushHostRootContext(workInProgress) {
  const root = (workInProgress.stateNode: FiberRoot);
  if (root.pendingContext) { // null
    // 省略代码
  } else if (root.context) { // 空对象
    // Should always be set
    pushTopLevelContextObject(workInProgress, root.context, false);
  }
  pushHostContainer(workInProgress, root.containerInfo);
}
```
```js
function pushTopLevelContextObject(
  fiber: Fiber,
  context: Object,
  didChange: boolean,
): void {
  if (disableLegacyContext) { // false
    return;
  } else {
    // 省略代码

    push(contextStackCursor, context, fiber); // contextStackCursor = {current: {}}，context = {}，执行后 index变为 0
    push(didPerformWorkStackCursor, didChange, fiber); // didPerformWorkStackCursor = {current: false}，didChange = false，执行后 index 变为 1
  }
}
```
## push
`push` 和 `pop` 方法的组合用来控制执行栈及执行栈的指针。
```js
function push<T>(cursor: StackCursor<T>, value: T, fiber: Fiber): void {
  index++; // index 初始值为 -1

  valueStack[index] = cursor.current; // {}

  if (__DEV__) {
    fiberStack[index] = fiber;
  }

  cursor.current = value;
}
```
```js
function pushHostContainer(fiber: Fiber, nextRootInstance: Container) {
  // Push current root instance onto the stack;
  // This allows us to reset root when portals are popped.
  push(rootInstanceStackCursor, nextRootInstance, fiber); // rootInstanceStackCursor = {current = {}}，nextRootInstance 为 container 节点
  // Track the context and the Fiber that provided it.
  // This enables us to pop only Fibers that provide unique contexts.
  push(contextFiberStackCursor, fiber, fiber); // contextFiberStackCursor = {current = {}}

  // Finally, we need to push the host context to the stack.
  // However, we can't just call getRootHostContext() and push it because
  // we'd have a different number of entries on the stack depending on
  // whether getRootHostContext() throws somewhere in renderer code or not.
  // So we push an empty value first. This lets us safely unwind on errors.
  push(contextStackCursor, NO_CONTEXT, fiber); // contextStackCursor = {current = {}}, NO_CONTEXT = {}
  const nextRootContext = getRootHostContext(nextRootInstance);
  // Now that we know this function doesn't throw, replace it.
  pop(contextStackCursor, fiber); // contextStackCursor = {current: {}}
  push(contextStackCursor, nextRootContext, fiber); // contextStackCursor = {current: {}}
}
```
## getRootHostContext
```js
function getRootHostContext(rootContainerInstance) {
      var type;
      var namespace;
      var nodeType = rootContainerInstance.nodeType; // 1

      switch (nodeType) {
        // 省略代码
        default: // 处理命名空间相关代码
          {
            var container = nodeType === COMMENT_NODE ? rootContainerInstance.parentNode : rootContainerInstance; // COMMENT_NODE = 8
            var ownNamespace = container.namespaceURI || null;
            type = container.tagName; // "DIV"，这里是容器节点的类型
            namespace = getChildNamespace(ownNamespace, type);
            break;
          }
      }

      {
        var validatedTag = type.toLowerCase(); // "div"
        var ancestorInfo = updatedAncestorInfo(null, validatedTag);
        return {
          namespace: namespace,
          ancestorInfo: ancestorInfo
        };
      }
      return namespace;
    }
```
## pop
```js
function pop<T>(cursor: StackCursor<T>, fiber: Fiber): void {
  // 省略代码
  if (__DEV__) {
    if (fiber !== fiberStack[index]) {
      warningWithoutStack(false, 'Unexpected Fiber popped.');
    }
  }

  cursor.current = valueStack[index];

  valueStack[index] = null;

  if (__DEV__) {
    fiberStack[index] = null;
  }

  index--;
}
```
## processUpdateQueue
处理 `updateQueue`。
```js
function processUpdateQueue<State>(
  workInProgress: Fiber,
  queue: UpdateQueue<State>,
  props: any,
  instance: any,
  renderExpirationTime: ExpirationTime,
): void {
  hasForceUpdate = false;

  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue); // 如果 workInProgress.alternate.updateQueue === queue，则 workInProgress.updateQueue = cloneUpdateQueue(queue)，一个基于 queue 的新的 updateQueue 对象
  // If the work-in-progress queue is equal to the current queue,
  // we need to clone it first.

  if (__DEV__) {
    currentlyProcessingQueue = queue;
  }

  // These values may change as we process the queue.
  let newBaseState = queue.baseState; // null
  let newFirstUpdate = null; // null
  let newExpirationTime = NoWork; // 0

  // Iterate through the list of updates to compute the result.
  let update = queue.firstUpdate; // 这里的 update 已经设置了以下值 
  // expirationTime: 1073741823
  // payload: {element: {…}}
  // priority: 97

  let resultState = newBaseState; // null
  while (update !== null) {
    const updateExpirationTime = update.expirationTime;
    if (updateExpirationTime < renderExpirationTime) {
      // 省略代码，两个时间是相等的
    } else {
      // This update does have sufficient priority.

      // Mark the event time of this update as relevant to this render pass.
      // TODO: This should ideally use the true event time of this update rather than
      // its priority which is a derived and not reverseable value.
      // TODO: We should skip this update if it was already committed but currently
      // we have no way of detecting the difference between a committed and suspended
      // update here.
      markRenderEventTimeAndConfig(updateExpirationTime, update.suspenseConfig); // 啥也没干

      // Process it and compute a new result.
      resultState = getStateFromUpdate(
        workInProgress,
        queue,
        update,
        resultState,
        props,
        instance,
      );
      const callback = update.callback;
      if (callback !== null) {
        workInProgress.effectTag |= Callback;
        // Set this to null, in case it was mutated during an aborted render.
        update.nextEffect = null;
        if (queue.lastEffect === null) {
          queue.firstEffect = queue.lastEffect = update;
        } else {
          queue.lastEffect.nextEffect = update;
          queue.lastEffect = update;
        }
      }
    }
    // Continue to the next update.
    update = update.next;
  }

  // Separately, iterate though the list of captured updates.
  let newFirstCapturedUpdate = null;
  update = queue.firstCapturedUpdate;
  while (update !== null) {
    const updateExpirationTime = update.expirationTime;
    if (updateExpirationTime < renderExpirationTime) {
      // 省略代码
    } else {
      // This update does have sufficient priority. Process it and compute
      // a new result.
      resultState = getStateFromUpdate(
        workInProgress,
        queue,
        update,
        resultState,
        props,
        instance,
      ); // 获得整合后的状态（整合payload对象）
      const callback = update.callback; // null
      
      // 省略 callback 相关代码
    }
    update = update.next; // null
  }

  if (newFirstUpdate === null) {
    queue.lastUpdate = null;
  }
  if (newFirstCapturedUpdate === null) {
    queue.lastCapturedUpdate = null;
  } else {
    workInProgress.effectTag |= Callback;
  }
  if (newFirstUpdate === null && newFirstCapturedUpdate === null) {
    // We processed every update, without skipping. That means the new base
    // state is the same as the result state.
    newBaseState = resultState;
  }

  queue.baseState = newBaseState;
  queue.firstUpdate = newFirstUpdate; // null
  queue.firstCapturedUpdate = newFirstCapturedUpdate; // null

  // Set the remaining expiration time to be whatever is remaining in the queue.
  // This should be fine because the only two other things that contribute to
  // expiration time are props and context. We're already in the middle of the
  // begin phase by the time we start processing the queue, so we've already
  // dealt with the props. Context in components that specify
  // shouldComponentUpdate is tricky; but we'll have to account for
  // that regardless.
  markUnprocessedUpdateTime(newExpirationTime);
  workInProgress.expirationTime = newExpirationTime; // 0
  workInProgress.memoizedState = resultState;

  if (__DEV__) {
    currentlyProcessingQueue = null;
  }
}
```
```js
function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
  switch (update.tag) { // 0
    // 省略代码
    case UpdateState: // 0
      {
        var _payload = update.payload; // { element }
        var partialState;

        if (typeof _payload === 'function') {
          // 省略代码
        } else {
          // Partial state object
          partialState = _payload;
        }

        // 省略代码

        return _assign({}, prevState, partialState); // 整合payload
      }

  }

  return prevState;
}
```
## reconcileChildren
```js
function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderExpirationTime: ExpirationTime,
) {
  if (current === null) {
    // 省略代码
  } else {
    // If the current child is the same as the work in progress, it means that
    // we haven't yet started any work on these children. Therefore, we use
    // the clone algorithm to create a copy of all the current children.

    // If we had any progressed work already, that is invalid at this point so
    // let's throw it out.
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderExpirationTime,
    ); // 返回一个子元素的 fiberNode 对象
  }
}
```
## mountIndeterminateComponent
处理非容器组件
```js
function mountIndeterminateComponent(
  _current,
  workInProgress,
  Component,
  renderExpirationTime,
) {
  if (_current !== null) {
    // 省略代码
  }

  const props = workInProgress.pendingProps; // {}
  let context;
  if (!disableLegacyContext) { // false
    const unmaskedContext = getUnmaskedContext(
      workInProgress,
      Component,
      false,
    );
    context = getMaskedContext(workInProgress, unmaskedContext); // {}
  }

  prepareToReadContext(workInProgress, renderExpirationTime); // 读取上下文，先忽略
  let value;

  if (__DEV__) {
      // 省略代码

    if (workInProgress.mode & StrictMode) {
      // 省略严格模式代码
    }

    ReactCurrentOwner.current = workInProgress;
    value = renderWithHooks(
      null,
      workInProgress,
      Component,
      props,
      context,
      renderExpirationTime,
    ); // 返回 children
  } else {
    value = renderWithHooks(
      null,
      workInProgress,
      Component,
      props,
      context,
      renderExpirationTime,
    );
  }
  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;

  if (
    typeof value === 'object' &&
    value !== null &&
    typeof value.render === 'function' &&
    value.$$typeof === undefined
  ) {
    // Proceed under the assumption that this is a class instance
    workInProgress.tag = ClassComponent;

    // Throw out any hooks that were used.
    resetHooks();

    // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.
    let hasContext = false;
    if (isLegacyContextProvider(Component)) {
      hasContext = true;
      pushLegacyContextProvider(workInProgress);
    } else {
      hasContext = false;
    }

    workInProgress.memoizedState =
      value.state !== null && value.state !== undefined ? value.state : null;

    const getDerivedStateFromProps = Component.getDerivedStateFromProps;
    if (typeof getDerivedStateFromProps === 'function') {
      applyDerivedStateFromProps(
        workInProgress,
        Component,
        getDerivedStateFromProps,
        props,
      );
    }

    adoptClassInstance(workInProgress, value);
    mountClassInstance(workInProgress, Component, props, renderExpirationTime);
    return finishClassComponent(
      null,
      workInProgress,
      Component,
      true,
      hasContext,
      renderExpirationTime,
    );
  } else {
    // Proceed under the assumption that this is a function component
    workInProgress.tag = FunctionComponent; // 先假设正在处理的元素是一个 FunctionComponent
    // 省略
    reconcileChildren(null, workInProgress, value, renderExpirationTime);
    if (__DEV__) {
      validateFunctionComponentInDev(workInProgress, Component);
    }
    return workInProgress.child;
  }
}
```
## renderWithHooks
```js
export function renderWithHooks(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: any,
  props: any,
  refOrContext: any,
  nextRenderExpirationTime: ExpirationTime,
): any {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber = workInProgress;
  nextCurrentHook = current !== null ? current.memoizedState : null; // null

  // 省略代码

  // The following should have already been reset
  // currentHook = null;
  // workInProgressHook = null;

  // remainingExpirationTime = NoWork;
  // componentUpdateQueue = null;

  // didScheduleRenderPhaseUpdate = false;
  // renderPhaseUpdates = null;
  // numberOfReRenders = 0;
  // sideEffectTag = 0;

  // TODO Warn if no hooks are used at all during mount, then some are used during update.
  // Currently we will identify the update render as a mount because nextCurrentHook === null.
  // This is tricky because it's valid for certain types of components (e.g. React.lazy)

  // Using nextCurrentHook to differentiate between mount/update only works if at least one stateful hook is used.
  // Non-stateful hooks (e.g. context) don't get added to memoizedState,
  // so nextCurrentHook would be null during updates and mounts.
  if (__DEV__) {
    if (nextCurrentHook !== null) {
      // 省略代码
    } else if (hookTypesDev !== null) {
      // 省略代码
    } else {
      ReactCurrentDispatcher.current = HooksDispatcherOnMountInDEV; // hooks API 对象
    }
  } else {
    ReactCurrentDispatcher.current =
      nextCurrentHook === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
  }

  // 这里的 Component 是外部传入的 type，
  // 比如一个函数组件 App，那么 type 就是 App 函数。
  // 执行该函数时，会创建它返回的 React 元素。
  let children = Component(props, refOrContext); 

    // 省略代码
  }

  // We can assume the previous dispatcher is always this one, since we set it
  // at the beginning of the render phase and there's no re-entrancy.
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  const renderedWork: Fiber = (currentlyRenderingFiber: any);

  renderedWork.memoizedState = firstWorkInProgressHook; // null
  renderedWork.expirationTime = remainingExpirationTime; // 0
  renderedWork.updateQueue = (componentUpdateQueue: any); // null
  renderedWork.effectTag |= sideEffectTag; // 2

  // This check uses currentHook so that it works the same in DEV and prod bundles.
  // hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.
  const didRenderTooFewHooks =
    currentHook !== null && currentHook.next !== null; // false

  renderExpirationTime = NoWork;
  currentlyRenderingFiber = null;

  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;

  if (__DEV__) {
    currentHookNameInDev = null;
    hookTypesDev = null;
    hookTypesUpdateIndexDev = -1;
  }

  remainingExpirationTime = NoWork;
  componentUpdateQueue = null;
  sideEffectTag = 0;

  // These were reset above
  // didScheduleRenderPhaseUpdate = false;
  // renderPhaseUpdates = null;
  // numberOfReRenders = 0;

  return children;
}
```
## adoptClassInstance
```js
function adoptClassInstance(workInProgress: Fiber, instance: any): void {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  // The instance needs access to the fiber so that it can schedule updates
  setInstance(instance, workInProgress);
  if (__DEV__) {
    instance._reactInternalInstance = fakeInternalInstance;
  }
}
```
## classComponentUpdater
重写 `classComponent` 的方法
```js
const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    const fiber = getInstance(inst); // 获得实例对应的 fiber 对象
    const currentTime = requestCurrentTimeForUpdate();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );

    const update = createUpdate(expirationTime, suspenseConfig); // 创建 update 对象
    update.payload = payload;
    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, 'setState');
      }
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
  enqueueReplaceState(inst, payload, callback) {
    const fiber = getInstance(inst);
    const currentTime = requestCurrentTimeForUpdate();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );

    const update = createUpdate(expirationTime, suspenseConfig);
    update.tag = ReplaceState;
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, 'replaceState');
      }
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
  enqueueForceUpdate(inst, callback) {
    const fiber = getInstance(inst);
    const currentTime = requestCurrentTimeForUpdate();
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
      currentTime,
      fiber,
      suspenseConfig,
    );

    const update = createUpdate(expirationTime, suspenseConfig);
    update.tag = ForceUpdate;

    if (callback !== undefined && callback !== null) {
      if (__DEV__) {
        warnOnInvalidCallback(callback, 'forceUpdate');
      }
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
};
```