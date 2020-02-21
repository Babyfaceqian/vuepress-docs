# d3与canvas坐标系
## canvas坐标系
### 默认坐标系
canvas中的坐标是从左上角开始的，x轴沿着水平方向（按像素）向右延伸，y轴沿垂直方向向下延伸。左上角坐标为x=0，y=0的点称作原点。在默认坐标系中，每一个点的坐标都是直接映射到一个CSS像素上。
### 当前坐标系
当前坐标系，即经过transform变换后的坐标系。首先要理解canvas绘制图形的基本过程：变换画布 -> 在当前坐标系绘制图形，canvas画布上是没有元素的概念的，所有图形都是基于当前坐标系绘制而成的。
- 位移变换
```javascript
context.translate(100,50)
// 将画布原点分别向右平移100，向下平移50
```
- 旋转变换
```javascript
context.rotate(Math.PI/6)
// 将画布顺时针旋转30度
```
- 缩放变换
```javascript
context.scale(2,2)
// 将画布坐标刻度分别沿x轴、y轴放大两倍
```
## d3
d3是基于svg模型创建元素的，需要使用d3-canvas-transition来将这些元素用canvas绘制到画布上。
```javascript
/** draw方法 */
function draw(node, point) {
    var children = node.countNodes,
        drawer = tagDraws.get(node.tagName),
        factor = node.factor,
        attrs = node.attrs;

    if (drawer === false) return;else if (node.attrs) {
        var ctx = node.context,
            stroke,
            width;

        // save the current context
        ctx.save();
        //
        if (attrs['$opacity'] !== undefined) ctx.globalAlpha = +attrs['$opacity'];
        if (attrs['$stroke-linecap']) ctx.lineCap = attrs['$stroke-linecap'];
        if (attrs['$stroke-linejoin']) ctx.lineJoin = attrs['$stroke-linejoin'];
        if (attrs['$mix-blend-mode']) ctx.globalCompositeOperation = attrs['$mix-blend-mode'];
        transform(node); // 这一步对变换做了转换
        //
        // Stroke
        stroke = node.getValue('stroke');
        if (stroke === 'none') stroke = false;else {
            stroke = getColor(node, node.getValue('stroke'), node.getValue('stroke-opacity'));
            if (stroke) ctx.strokeStyle = stroke;
            if (attrs['$stroke-width'] !== undefined) {
                width = getSize(node.attrs['$stroke-width']);
                if (width) ctx.lineWidth = factor * width;
            }
            stroke = width === 0 ? false : true;
        }
        //
        // Fill
        var fill = getColor(node, node.getValue('fill'), node.getValue('fill-opacity'));
        if (fill) ctx.fillStyle = fill;
        fill === 'none' || !fill ? false : true;
        //
        if (drawer) drawer(node, stroke, fill, point);
        if (children) node.each(function (child) {
            return draw(child, point);
        });
        //
        // restore
        ctx.restore();
    } else if (children) {
        node.each(function (child) {
            return draw(child, point);
        });
    }
}
```
```javascript
/** transform方法 */
var transform = function (node) {
    var x = +(node.attrs.get('x') || 0),
        y = +(node.attrs.get('y') || 0),
        trans = node.attrs.get('transform'),
        ctx = node.context,
        sx,
        sy,
        angle;

    if (typeof trans === 'string') {
        var index1 = trans.indexOf('translate('),
            index2,
            s,
            bits;
        if (index1 > -1) {
            s = trans.substring(index1 + 10);
            index2 = s.indexOf(')');
            bits = s.substring(0, index2).split(',');
            x += +bits[0]; // x加上transform.x
            if (bits.length === 2) y += +bits[1]; // y加上transform.y
        }

        index1 = trans.indexOf('rotate(');
        if (index1 > -1) {
            s = trans.substring(index1 + 7);
            angle = +s.substring(0, s.indexOf(')')); // 旋转角度
        }

        index1 = trans.indexOf('scale(');
        if (index1 > -1) {
            s = trans.substring(index1 + 6);
            index2 = s.indexOf(')');
            bits = s.substring(0, index2).split(',');
            sx = +bits[0]; // x轴缩放比例
            if (bits.length === 2) sy = +bits[1]; // y轴缩放比例
        }
    } else if (trans) {
        x += trans.x;
        y += trans.y;
        sx = trans.k;
    }
    if (sx) {
        sy = sy || sx;
        ctx.scale(sx, sy); // 对画布进行缩放
    }
    if (x || y) ctx.translate(ctx._factor * x, ctx._factor * y); // 对画布进行平移，这里乘了缩放因子
    if (angle && angle === angle) ctx.rotate(conv * angle); // 对画布进行旋转
};
```
由此可见，node.x、transform.x、transform.y都是相对于默认坐标轴的数值，即没有经过变换的值。

## d3缩放变换
