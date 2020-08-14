# react diff算法
  
传统 diff 算法的复杂度为 O(n^3)，显然这是无法满足性能要求的。React 通过制定大胆的策略，将 O(n^3) 复杂度的问题转换成 O(n) 复杂度的问题。

## diff 策略
- tree diff - 新旧树分层比较，从上至下，如节点不相同，则直接替换它及它下面的整棵树，该节点比较继续下面两种算法。
- component diff - 判断是否是同一种类型的 React 组件，不是，则替换，
- element diff