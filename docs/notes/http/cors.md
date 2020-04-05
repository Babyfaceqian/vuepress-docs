# Web 跨域
## 常见的跨域解决方案
### 网络跨域
1. jsonp
2. 跨域资源共享（CORS）
3. websocket协议跨域
4. 代理服务器（nginx、node）

### 页面跨域
1. document.domain + iframe
2. location.hash + iframe
3. window.name + iframe
4. postMessage

## 优缺点对比
| 方案 | 优点 | 缺点 | 兼容性 | 实现场景 |
| -- | -- | -- | -- | -- |
jsonp | 兼容性好 | 只支持GET，且需要服务端支持 | 全部 | 需要考虑兼容性的 
CORS | 标准，支持所有方法 | 对配置较为复杂，IE老版本不支持，且需要服务端支持 | IE10以下不支持 |  优先使用
websocket | 长连接，双工 | 实现复杂，依赖网络 | IE支持不好 | 需要服务端推送的
代理服务器 | 无需前端改动 | 实现复杂，额外资源 | 无兼容性问题 | 任何场景

| 方案 | 优点 | 缺点 | 兼容性 | 实现场景 |
| -- | -- | -- | -- | -- |
document.domain + iframe | -- | 需强制设置domain | IE支持不好 | 仅限主域相同，子域不同的页面跨域场景
location.hash + iframe | --  | 需要更改页面hash | 未知 | 仅限页面跨域
window.name + iframe | -- | 需要修改窗口name | IE支持不好 | 仅限页面跨域
postMessage | 安全 | 两个页面协议、端口、主机需要相同 | HTML5 | 仅限页面跨域