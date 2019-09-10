# D3 API详解
## API总览
| 内容              | 简介                                       |
| ----------------- | ------------------------------------------ |
| 核心（Core）      | 包括选择器、过渡、数据处理、本地化、颜色等 |
| 比例尺（Scales）  | 在数据编码和视觉编码之间转换               |
| 可缩放矢量图形    | 提供用于创建可伸缩矢量图形的使用工具       |
| 事件（Time）      | 解析或而是花时间，计算日历的事件间隔等。   |
| 布局（Layout）    | 推导定位元素的辅助数据                     |
| 地理（Geography） | 球面坐标，经纬度运算                       |
| 几何（Geometry）  | 提供绘制2D几何图形的实用工具               |
| 行为（Behaviors） | 可重用的交互行为                           |

## selection
- selection.attr(name[,value]) 

`value` 可以为常数、函数，如果为函数，这个函数会有两个参数：`d` 代表当前元素绑定的数据，`i` 代表索引。如果 `value` 参数的值为 `null`，则移除指定的属性。D3中元素的大多数操作都支持多属性设置。
```javascript
selection.attr({
  x: function(d,i) {return d},
  y: 20
})
```

- selection.data([values[,key]])

给当前选定的所有元素依次绑定 `values` 数组中的数据，数据被存储在元素的“__data__”属性中。

- selection.datum([value])

与data的区别是，datum不能使用enter和exit， 能够访问html5自定义数据属性，即data-*属性，充当数据。
```javascript
d3.selectAll('div')
.datum(function() {return this.dataset})
.text(function(d) {return d.username;})
```

- selection.call(function[,arguments...])

为selection调用函数，方便链式操作。

- selection.empty()
  
  如果当前选择为空，则返回true。一个选择是空，意味着它不包含任何元素或就是 `null` 元素。

- selection.node() 

  返回当前选择的第一个非空的元素。如果选择为空，则返回 `null`。

- selection.size()

- transition.attr(name, value)

属性值过渡到value

- transition.attrTween(name, tween)

用指定的补间（tween）函数，过渡指定属性的值。
```javascript
function tween(d, i, a) {
  return d3.interpolateNumber(a, 2*a);
}
```

- transition.styleTween(name, tween[,priority])

用指定的补间函数，过渡指定的css样式的值。可选参数 `priority` 可以被指定为 `null` 或者字符串"important"（没有感叹号）。

- transition.text(value)

替换文本

- transition.tween(name, factory)

给指定的名称（属性和样式名）注册一个自定义的补间函数。
```javascript
d3.select("text").transition()
.duration(7500)
.tween("text", function() {
  var interpolate = d3.interpolate(d3.select(this).text(), 100);
  return function(t) {
    d3.select(this).text(interpolate(t));
  }
})
```

- transition.remove()

在过渡结束时删除选定的元素。

- transition.select(selector)

在当前过渡的每个元素中，选择与指定的选择字符串匹配的第一个元素。

- transition.transition()

在同样的选中元素上创建一个新的过渡，在当前过渡结束后启动。新的过渡继承当前过渡的持续时间和延迟时间。这可以用来定义链式过渡，无需监听过渡结束事件。

- transition.call(function[, arguments...])


调用指定的函数一次，可传入一些可选的参数。call会将当前对象作为第一个参数传入调用的函数中。

- transition.empty()

如果当前过渡的选择是空的，则返回true。

- transition.node()

返回当前过渡选择的第一个飞空元素。如果过渡为空，则返回null。

- transition.size()
  
返回当前过渡选择的元素总数。

- d3.ease(type[,arguments...])

由指定的类型和可选参数返回一个内置的缓动函数。

- d3.timer(function[,delay[,time]])

启动一个自定义动画计时器，重复地调用指定的函数，知道它返回true。

- d3.interpolate(a,b)

返回一个介于a和b之间的默认插值器。
```javascript
svg.select('circle')
  .transition().duration(1000)
  .styleTween('fill', function(d, i, val) {
    return d3.interpolate('green', 'orange');
})
```

- interpolate(t)

对在区间[0, 1]中一个给定的参数t，返回对应的插入值。插值器通常结合比例尺一起使用，将值从定义域映射到值域。
```javascript
var inter = d3.interpolate(1, 10);
console.log('0.5 --> ' + inter(0.5)); // 返回0.5 --> 5.5
```

- d3.interpolateNumber(a, b)

返回一个a、b两个数字之间的数字插值器。返回的插值器相当于：
```javascript 
function interpolate(t) {
  return a * ( 1 - t ) + b * t;
}
```        

- d3.interpolateRound(a, b)

返回一个a和b两个数字之间的数字插值器。返回的结果四舍五入为最近的整数。

- d3.interpolateString(a, b)

返回一个a和b两个字符串之间的字符串插值器；字符串插值器会自动寻找嵌入在a和b里的数字，非数字部分保持不变。例如从'1px'到'10px'。

- d3.interpolateRgb(a, b)

返回一个a和b两种颜色值之间的RGB颜色空间插值器。

- d3.interpolateArray(a, b)

返回一个在两个数组a和b之间的数组插值器。在内部创建一个和b相同长度的数组模板，对于b中的每一个元素，如果在a中存在一个相应的元素，则计算插值，如果没有就用b的值。
```javascript
var interArr = d3.interpolateArray([0,1], [1,10,100]);
interArr(0.5) // 返回[0.5, 5.5, 100]
```

- d3.interpolateObject(a, b)

类似interpolateArray。

- d3.interpolateTransform(a, b)

返回一个由a和b表示的二维仿射变换之间的插值器。每个变换都被分解成一个平移、旋转、x斜切和缩放的标准表示。然后插入这些变换的成分。

```javascript 
var start = d3.transform('translate(240, 240)scale(0)');
var end = d3.transform('translate(480, 480)scale(23)rotate(180)');
var interTrans = d3.interpolateTransform(start, end);
interTrans(0.5)
```

- d3.interpolateZoom(a, b);

返回一个介于两个二位平面视图a和b之间的平滑的插值器。每个视图是由三个数字构成的数组：cx、cy和width定义的。
```javascript
var view = [cx, cy, width];
```

- d3.ascending(a, b)

升序比较器函数，配合d3.sort使用
```javascript 
d3.select('svg').selectAll('text')
.sort(function(a, b) {
  return d3.ascending(a.value, b.value);
})
```

- d3.descending(a,b)

降序比较器函数

- d3.min(array[, accessor])

返回给定数组中自然排序最小的值。如果数组为空，返回undefined。如果指定了accessor参数，等同于咋自己算最小值之前调用了array.map(accessor)方法，即先对每一项元素做处理。不同于内置的Math.min方法，这个方法会忽略未定义的值。

- d3.max(array[, accessor])


