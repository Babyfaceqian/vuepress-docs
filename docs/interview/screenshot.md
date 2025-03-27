# 前端如何实现截图
## 一、基于第三方库的截图方案
1. html2canvas
```js
import html2canvas from 'html2canvas';
const element = document.getElementById('target');
html2canvas(element).then(canvas => {
    const imgUrl = canvas.toDataURL('image/png');
    // 下载或展示图片
});
```
2. dom-to-image
```js
import domtoimage from 'dom-to-image';
domtoimage.toPng(element).then(imgUrl => {
    // 处理图片
});
```
3. js-web-screen-shot （新兴工具）
在使用WebRTC时，需要用户授权访问摄像头和麦克风。这是因为WebRTC API需要访问设备的媒体流，包括摄像头和麦克风。
```js
import { capture } from 'js-web-screen-shot';
capture(element).then(imgUrl => {
    // 处理图片
});
```

## 二、原生 API 方案
1. Canvas + toDataURL
```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = element.offsetWidth;
canvas.height = element.offsetHeight;
ctx.drawImage(element, 0, 0);
const imgUrl = canvas.toDataURL('image/png');
```
2. Blob 对象 + URL.createObjectURL
```js
canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screenshot.png';
    a.click();
});
```

## 三、服务端方案（Node.js）
1. Puppeteer

## 四、跨端场景适配
1. 微信小程序
wx.canvasToTempFilePath
2. React/Vue 框架集成
在 Vue 中可封装组件调用 HTML2Canvas，通过 ref 获取目标 DOM

| 方案 | 优点 | 缺点 | 适用场景 |
| --- | --- | --- | --- |
| HTML2Canvas | 支持复杂 DOM 结构 | 性能差，跨域限制 | 用户操作结果保存、报告生成 |
| DOM-to-Image | 输出质量高，轻量 | CSS 支持有限 | 静态内容分享卡片 |
| Puppeteer | 完整页面渲染，跨域支持 | 依赖服务端环境 | 自动化测试、服务端批量截图 |
| Canvas API | 高性能，灵活绘制 | 需手动实现 DOM 渲染逻辑 | 图表生成、简单图形绘制 |
| js-web-screen-shot | 纯前端，快捷键支持 | 新兴工具，社区资源较少 | 需要快速集成的轻量项目 |
