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

HTTP3.0：
采用谷歌QUIC（Quick UDP Internet Connection）协议，从TCP切换到UDP，本质变了。
- 自定义连接机制，以一个64位的随机数作为ID来标识
- 自定义重传机制，解决了TCP重传阻塞的问题
- 无阻塞的多路复用
- 自定义流量控制