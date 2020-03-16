# XMLHttpRequest
## 属性
### XMLHttpRequest.onreadystatechange
### XMLHttpRequest.readyState
> XMLHttpRequest.readyState 属性返回一个 XMLHttpRequest  代理当前所处的状态。

| 值 |	状态 |	描述 |
| -- | -- | -- |
0	| UNSENT |	代理被创建，但尚未调用 open() 方法。
1	| OPENED |	open() 方法已经被调用。
2	| HEADERS_RECEIVED |	send() 方法已经被调用，并且头部和状态已经可获得。
3	| LOADING |	下载中； responseText 属性已经包含部分数据。
4	| DONE |	下载操作已完成。
### XMLHttpRequest.response 
### XMLHttpRequest.responseText
### XMLHttpRequest.responseType
> XMLHttpRequest.responseType 属性是一个枚举类型的属性，返回响应数据的类型。它允许我们手动的设置返回数据的类型。如果我们将它设置为一个空字符串，它将使用默认的"text"类型。如果服务器返回的数据类型和前端设置的不同，则返回null。

可选类型有：
- ""：空，则默认为"text"
- "arraybuffer"：response 是一个包含二进制数据的 JavaScript ArrayBuffer 。
- "blob"：response 是一个包含二进制数据的 Blob 对象 。
- "document"：response 是一个 HTML Document 或 XML XMLDocument ，这取决于接收到的数据的 MIME 类型。请参阅 HTML in XMLHttpRequest 以了解使用 XHR 获取 HTML 内容的更多信息。
- "json"：response 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
- "text"：response 是包含在 DOMString 对象中的文本。
### XMLHttpRequest.responseURL
### XMLHttpRequest.responseXML
### XMLHttpRequest.status
### XMLHttpRequest.statusText 
### XMLHttpRequest.timeout
### XMLHttpRequest.upload 
### XMLHttpRequest.withCredentials
## 方法
### XMLHttpRequest.abort()
### XMLHttpRequest.getAllResponseHeaders()
### XMLHttpRequest.getResponseHeader()
### XMLHttpRequest.open()
### XMLHttpRequest.overrideMimeType()
### XMLHttpRequest.send()
### XMLHttpRequest.setRequestHeader()