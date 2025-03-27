# 图片懒加载的实现方式
1. 原生HTML的 loading="lazy" 属性
直接在`<img>`标签中添加`loading="lazy"`属性，浏览器会自动延迟加载未进入视口的图片。此方法无需JavaScript，代码简洁，但需注意浏览器兼容性（Chrome 76+支持，部分旧浏览器不兼容）。其他可选值包括：
- eager：立即加载图片，即使未进入视口。
- auto：根据浏览器策略自动选择加载方式。
这种方式实现简单，但是如果需要占位图的话，可能仍然需要其他实现方式。
```html
<img src="actual-image.jpg" loading="lazy" width="100" height="100">
```
2. 基于 offsetTop 和滚动距离的计算
```js
if (el.offsetTop < window.innerHeight + window.scrollY) {
    // 加载图片
}
```
3. getBoundingClientRect() 方法
通过 getBoundingClientRect() 获取元素相对于视口的位置，判断其是否在可视区域内：
```js
const rect = el.getBoundingClientRect();
if (rect.top < window.innerHeight && rect.bottom > 0) {
    // 加载图片
}
```
4. IntersectionObserver API（推荐）
现代浏览器提供的异步观察元素可见性的API，无需手动计算或监听滚动事件，性能更优：
```js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
    });
});
// 观察所有带data-src属性的图片
document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
```
此方法自动处理交叉检测，支持配置阈值（如元素可见50%时触发），是当前主流方案。

5. 第三方库/框架插件
例如Vue的 vue-lazyload 插件，通过自定义指令简化实现：
```js
// main.js中引入
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);

// 模板中使用v-lazy指令
<img v-lazy="imageUrl">
```