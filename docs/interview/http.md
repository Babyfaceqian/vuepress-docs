# HTTP
## HTTP的GET、POST方法的区别
1. GET请求在浏览器回退和刷新时是无害的，而POST请求会告知用户数据会被重新提交；
2. GET请求可以收藏为书签，POST请求不可以收藏为书签；
3. GET请求可以被缓存，POST请求不可以被缓存，除非在响应头中包含合适的Cache-Control/Expires字段，但是不建议缓存POST请求，其不满足幂等性，每次调用都会对服务器资源造成影响；
4. GET请求一般不具有请求体，因此只能进行url编码，而POST请求支持多种编码方式；
5. GET请求的参数可以被保留的浏览器的历史中，POST请求不会保留；
6. GET请求因为是想URL添加数据，不同的浏览器厂商，代理服务器，web服务器都可能会有自己的长度限制，而POST请求无长度限制；
7. GET请求只允许ASCII字符，POST请求无限制，支持二进制数据；
8. GET请求的安全性较差，数据被暴露在浏览器的URL中，所以不能用来传递敏感信息，POST请求的安全性较好，数据不会暴露在URL中；
9. GET请求具有幂等性（多次请求不会对资源造成影响），POST请求不幂等；
10. GET请求一般不具有请求体，请求中一般不包含100-continue协议，所以只会发一次请求，而POST请求在发送数据到服务端之前允许双方“握手”，客户端先发送Expect：100-continue消息，询问服务端是否愿意接受数据，接收到服务端正确的100-continue应答后才会将请求体发送给服务端，服务端在响应200返回数据。

## 介绍下HTTP0.9、1.0、1.1、2.0、3.0协议的区别
HTTP0.9:
- 请求由单行指令构成，只支持GET方法
- 响应只包含文档本身
- 只支持HTML文件

HTTP1.0：
- 构建可扩展
- 添加协议版本信息
- 添加状态码
- 引入HTTP头
- 支持除纯文本HTML文件以外其他类型文档

HTTP1.1：
- TCP连接可复用
- 增加管线化技术，允许在第一个响应回来之前发送第二个请求，以降低通信延迟
- 支持响应分块
- 引入额外的缓存控制机制
- 引入内容协商机制，包括语言，编码，类型等，并允许客户端和服务端之间约定以最合适的内容进行交换
- 添加Host头，能够使不同域名配置再同一个IP地址的服务器上

HTTP2.0：
- 文本协议转为二进制协议
- TCP连接复用，移除了HTTP/1.x中顺序和阻塞的约束
- 压缩了headers。
- 允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求
- 基本只支持https

HTTP3.0：
采用谷歌QUIC（Quick UDP Internet Connection）协议，从TCP切换到UDP，本质变了。
- 自定义连接机制，以一个64位的随机数作为ID来标识
- 自定义重传机制，解决了TCP重传阻塞的问题
- 无阻塞的多路复用
- 自定义流量控制
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

## http与https区别
### 区别
1. https需要CA证书
2. http明文传输，https采用ssl加密
3. https端口443，http端口80
4. http无状态，https是带身份认证的
### 优缺点
1. HTTPS 协议握手阶段比较费时，会使页面的加载时间延长近。
2. HTTPS 连接缓存不如 HTTP 高效，会增加数据开销，甚至已有的安全措施也会因此而受到影响。
3. HTTPS 协议的安全是有范围的，在黑客攻击、拒绝服务攻击和服务器劫持等方面几乎起不到什么作用。
4. SSL 证书通常需要绑定 IP，不能在同一 IP 上绑定多个域名，IPv4 资源不可能支撑这个消耗。
5. 成本增加。部署 HTTPS 后，因为 HTTPS 协议的工作要增加额外的计算资源消耗，例如 SSL 协议加密算法和 SSL 交互次数将占用一定的计算资源和服务器成本。
6. HTTPS 协议的加密范围也比较有限。最关键的，SSL 证书的信用链体系并不安全，特别是在某些国家可以控制 CA 根证书的情况下，中间人攻击一样可行。