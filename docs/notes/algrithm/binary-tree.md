# 二叉树
## 概念
> 在计算机科学中，二叉树是每个结点最多有两个子树的树结构。通常子树被称作“左子树”（left subtree）和“右子树”（right subtree）。二叉树常被用于实现二叉查找树和二叉堆。

> ```js
> /**
> * Definition for a binary tree node.
> * function TreeNode(val) {
> *     this.val = val;
> *     this.left = this.right = null;
> * }
> */
> ```
## 遍历
### 四种基本的遍历思想
- 前序遍历：根结点 ---> 左子树 ---> 右子树
- 中序遍历：左子树---> 根结点 ---> 右子树
- 后序遍历：左子树 ---> 右子树 ---> 根结点
- 层次遍历：仅仅需按层次遍历就可以

#### 前序遍历
- 递归版本
```js
function dfs(root) {  
  if (root != null) {  
    console.log(root.val+"  "); // 遍历根节点
    dfs(root.left);  // 遍历左子树
    dfs(root.right);  // 遍历右子树
  }
}
```
- 非递归版本
```js
function dfs(root) {
  const stack = [];
  let pNode = root;
  while(pNode !== null || stack.length > 0) {
    if (pNode !== null) {
      // 当前节点存在
      console.log(pNode.val+"  "); // 遍历根节点
      stack.push(pNode); // 存路径
      pNode = pNode.left; // 从左子树开始向下遍历
    } else {
      // 当前节点不存在
      node = stack.pop(); // 回溯
      pNode = node.right; // 从右子树向下遍历
    }
  }
}
```
#### 中序遍历
- 递归版本
```js
function dfs(root) {  
  if (root != null) {  
    dfs(root.left);  // 遍历左子树
    console.log(root.val+"  "); // 遍历根节点
    dfs(root.right);  // 遍历右子树
  }
}
```
- 非递归版本
```js
function dfs(root) {
  const stack = [];
  let pNode = root;
  while(pNode !== null || stack.length > 0) {
    if (pNode !== null) {
      // 当前节点存在
      stack.push(pNode); // 存路径
      pNode = pNode.left; // 从左子树开始向下遍历
    } else {
      // 当前节点不存在
      node = stack.pop(); // 回溯
      console.log(node.val+"  "); // 遍历根节点
      pNode = node.right; // 从右子树向下遍历
    }
  }
}
```
#### 后序遍历
- 递归版本
```js
function dfs(root) {  
  if (root != null) {  
    dfs(root.left);  // 遍历左子树
    dfs(root.right);  // 遍历右子树
    console.log(root.val+"  "); // 遍历根节点
  }
}
```
- 非递归版本

思路是将前序遍历的调整成 根节点-右子树-左子树 顺序，然后对结果进行反向。
```js
function dfs(root) {
  const stack = [];
  let res = [];
  let pNode = root;
  while(pNode !== null || stack.length > 0) {
    if (pNode !== null) {
      // 当前节点存在
      res.push(pNode.val); // 遍历根节点
      stack.push(pNode); // 存路径
      pNode = pNode.right; // 从左子树开始向下遍历
    } else {
      // 当前节点不存在
      node = stack.pop(); // 回溯
      pNode = node.left; // 从右子树向下遍历
    }
  }
  stack.reverse();
}
```
#### 广度优先遍历
- 递归版本
```js
function bfs(root) {  
  if (root != null) {
    
  }
}
```
- 非递归版本
```js
function bfs(root) {
  stack = [root];
  while(stack.length) {
    let temp = [];
    for (let i=0;i<stack.length;i++) {
      console.log(stack[i].val);
      if (stack[i].left != null) {
        temp.push(stack[i].left);
      }
      if (stack[i].right != null) {
        temp.push(stack[i].right);
      }
    }
    stack = temp;
  }
}
```
#### 深度优先遍历
同上面前中后序遍历。
