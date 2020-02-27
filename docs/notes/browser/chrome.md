# Chrome浏览器
## 谷歌逐步替换Chrome的CORS实现
[官方链接](https://www.chromium.org/Home/loading/oor-cors)
2020年1月6日谷歌推出了新的CORS实施方案，名为 OOR-CORS（Out Of Render CORS），取代旧的CORS方案以解决其存在的一些安全问题。谷歌会在几周内逐步替换 Chrome （版本79开始） 中旧的 CORS 实现。对于WebView，稍后将启用它，以便基于WebView的应用程序可以安全地迁移。它可能会在Chrome 81上发生。

新的CORS实施方案带来了以下主要变化：
1. 资源计时API不将CORS预检请求计为单独的条目；

换句话说用于跨域预检的OPTIONS请求将不会出现在developer tools的network中；如果想要查看该请求，我们可以在 chrome://net-export/ 抓取 chrome 内部网络事件日志，并在https://netlog-viewer.appspot... 中打开查看。另外我们也可以使用 fiddler 或 wireshark 等软件抓包。
2. &lt;img crossorigin = anonymous&gt;的跨域重定向不再发送Cookie；

使用旧版CORS，即使在跨域重定向之后，Chrome仍存在一个发送Cookie的错误，尽管这违反了规范。一旦推出OOR-CORS，便不会。
3. XHR的Intent：// ...失败将调度readystatechange和错误事件（仅适用于Android）

使用旧版CORS，Android Chrome会出现一个错误，即在没有通知通过XHR提取intent：//时出现任何错误的情况下，无法静默失败。一旦OOR-CORS推出，它将正确地调度readystatechange和错误事件。 对于其他APIS，图像加载，Fetch API等，它可以正确地报告直到今天以及从现在开始的错误。
4. 扩展程序的webRequest API（仅台式机）

宣布了API更改。有关详细信息，请参见[API文档chrome.webRequest](https://developer.chrome.com/extensions/webRequest)。该文档中有3个主要更改，解释为“从Chrome 79开始”。
5. 内部修改的请求也将遵循CORS协议

使用旧版CORS，内部修改的请求未正确遵循CORS协议。例如，Chrome有时会在企业用途中为访问控制注入额外的头部。在这种情况下，即使修改后的请求不符合“简单请求”条件，Chrome也不会发送CORS预检信息。但是，一旦完全启用OOR-CORS，Chrome就会严格遵循CORS协议，即使该请求已通过中间代码进行了尽可能的修改。这也会影响Chrome扩展程序，部分已宣布的API更改与此强制实施有关。此行为更改可能会影响Chrome扩展程序，该扩展程序会拦截并修改对Google服务的请求或Google服务的响应。
6. BUG 从Chrome 79中被CORB + CORS阻止的允许列出的内容脚本重定向

参见  [crbug.com/ 1034408](https://bugs.chromium.org/p/chromium/issues/detail?id=1034408)。Chrome 79的原始CORS实施存在暂时性故障。此问题将通过启用OOR-CORS或更新到Chrome 80来解决。
7. CSS -webkit-mask开始使用来自Chrome 79的启用了CORS的请求

请参阅[crbug.com/ 786507](https://bugs.chromium.org/p/chromium/issues/detail?id=786507)和[crbug.com/ 1034942](https://bugs.chromium.org/p/chromium/issues/detail?id=1034942)。如果其他无请求请求也请求了相同的URL，并且服务器不关心HTTP缓存，则将导致观察到CORS相关错误。提取规范中的[CORS协议和HTTP缓存部分](https://fetch.spec.whatwg.org/#cors-protocol-and-http-caches)将帮助您了解问题。

8. 扩展程序的背景页面的原始头部已从Chrome 80更改（可能会因中断很多而推迟？）

参见[crbug.com/ 1036458](https://bugs.chromium.org/p/chromium/issues/detail?id=1036458)。当Chrome从扩展程序的后台页面发送请求并需要Origin头部时，已设置chrome-extensions：// &lt;extensions id&gt;。但是从Chrome 80开始，将使用目标URL的来源。