

# React 16.12.0 源码解读（三）之更新组件
## reconcileChildFibers
这个方法根据不同的元素类型对要渲染的组件做 reconcile
```js
function reconcileChildFibers(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any,
    expirationTime: ExpirationTime,
  ): Fiber | null {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.

    // Handle top level unkeyed fragments as if they were arrays.
    // This leads to an ambiguity between <>{[...]}</> and <>...</>.
    // We treat the ambiguous cases above the same.
    // 省略代码

    // Handle object types
    const isObject = typeof newChild === 'object' && newChild !== null;

    if (isObject) {
      switch (newChild.$$typeof) { // REACT_ELEMENT_TYPE
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconcileSingleElement(
              returnFiber,
              currentFirstChild,
              newChild,
              expirationTime,
            ),
          ); // 返回子元素
        case REACT_PORTAL_TYPE:
          return placeSingleChild(
            reconcileSinglePortal(
              returnFiber,
              currentFirstChild,
              newChild,
              expirationTime,
            ),
          );
      }
    }
  // 省略其他类型处理代码
  }
```
# reconcileSingleElement
```js
function reconcileSingleElement(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    element: ReactElement,
    expirationTime: ExpirationTime,
  ): Fiber {
    const key = element.key; // null
    let child = currentFirstChild; // null
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      // 省略代码
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
      // 省略代码
    } else {
      const created = createFiberFromElement(
        element,
        returnFiber.mode, // 8
        expirationTime,
      );
      created.ref = coerceRef(returnFiber, currentFirstChild, element); // null
      created.return = returnFiber;
      return created;
    }
  }
```
## createFiberFromElement
```js
function createFiberFromElement(element, mode, expirationTime) {
  var owner = null;

  {
    owner = element._owner; // null
  }

  var type = element.type;
  var key = element.key; // null
  var pendingProps = element.props; // {}
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime);

  {
    fiber._debugSource = element._source;
    fiber._debugOwner = element._owner;
  }

  return fiber;
}
```
## createFiberFromTypeAndProps
```js
function createFiberFromTypeAndProps(type, // React$ElementType
key, pendingProps, owner, mode, expirationTime) {
  var fiber;
  var fiberTag = IndeterminateComponent; // 2
  // The resolved type is set if we know what the final type will be. I.e. it's not lazy.

  var resolvedType = type; // App() 是一个函数，react组件的本质是一个函数

  if (typeof type === 'function') {
    if (shouldConstruct(type)) { // false
      // 省略代码
    } else {
      {
        resolvedType = resolveFunctionForHotReloading(resolvedType); // 返回 type
      }
    }
  } else if (typeof type === 'string') {
    // 省略代码
  } else {    
    // 省略代码
  }

  fiber = createFiber(fiberTag, pendingProps, key, mode);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.expirationTime = expirationTime;
  return fiber;
}
```
## shouldConstruct
```js
function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}
```
## placeSingleChild
```js
function placeSingleChild(newFiber) {
    // This is simpler for the single child case. We only need to do a
    // placement for inserting new children.
    if (shouldTrackSideEffects && newFiber.alternate === null) { // shouldTrackSideEffects = true
      newFiber.effectTag = Placement; // 2
    }
    return newFiber;
}
```