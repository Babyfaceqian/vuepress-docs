# d3与react
## 职责
1. d3负责calculate
2. react负责render

## 需要使用d3渲染的情况
1. transition
2. axes
3. brushes

## 配合
1. 将svg元素写在react的render方法下
2. 将data保存在state当中，并在render中使用
3. 在willReceiveProps函数中监听props变化，获取到最新数据并处理得到data，然后更新state
4. 在didUpdate函数中处理需要d3渲染的操作