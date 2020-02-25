# HTTP
## 简述Http的简单请求和复杂请求
发送简单请求的时候，浏览器不会发送预检请求，如果服务器未返回正确的响应首部，则请求方不会收到任何数据。

满足以下条件的为简单请求：
- 请求方法为：GET、POST、HEAD
- 请求头中，未人为设置CORS安全首部字段集合之外的首部字段、Content-Type为text/plain、multipart/form-data、application/x-www-form-urlencoded

对于复杂请求，浏览器会先发送预检请求，服务器允许该跨域请求后，浏览器才会发送该复杂请求。

## 简述浏览器的同源策略
浏览器的同源策略指的是指浏览器只允许访问来自同一站点的资源，而不是来自其他站点可能存在恶意的资源。这里同源指的是域名、协议、端口都要相同。

浏览器的同源策略主要体现在两个方面：
- 脚本同源策略：禁止对不同源页面 DOM 进行操作。这里主要场景是 iframe 跨域的情况，不同域名的 iframe 是限制互相访问的。可以防止跨站脚本攻击（XSS）。
- 网络同源策略：禁止XMLHttpRequest或fetch向不同源的服务器地址发送http请求。可以防止跨域请求伪造攻击（CSRF）。
- 存储同源策略：禁止访问非同源页面的cookie、localstorage和indexedDB。

## 浏览器有哪些方法实现跨域，它们的优缺点是什么
### CORS（跨域资源共享）
W3C标准，主要使用自定义的HTTP头部CORS安全集合让浏览器和服务器进行沟通。

优点：
- 代码简单，容易维护
- 支持所有类型的http请求

缺点：
- 需要服务器端和浏览器端同时支持，IE10以下存在兼容性问题
- 非简单请求会多发送一次预检请求

### JSONP
利用 script 标签允许跨域访问资源的特点，通过动态创建 script 标签，使用 src 属性进行跨域。

优点：
- 实现简单，兼容性好（兼容低版本IE）

缺点：
- 只支持GET请求

### document.domain + iframe跨域
此方案仅限主域相同，子域不同的跨域应用场景。

实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。

### location.hash + iframe跨域
实现原理： a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。

具体实现：A域：a.html -> B域：b.html -> A域：c.html，a与b不同域只能通过hash值单向通信，b与c也不同域也只能单向通信，但c与a同域，所以c可通过parent.parent访问a页面所有对象。

### window.name + iframe跨域
window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

### postMessage跨域

### 代理跨域（如nginx、nodeJS中间件）

### WebSocket协议跨域