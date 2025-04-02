# Cookie的构成部分详解

## 1. 名称（Name）与值（Value）  
- **核心标识**：以键值对形式存在，如 `username=JohnDoe`。  
  - **Name**：唯一标识符，区分不同Cookie。  
  - **Value**：存储用户信息（如会话ID、偏好设置等）。  

## 2. 过期时间（Expires/Max-Age）  
- **控制有效期**：  
  - **Expires**：指定具体过期日期（GMT格式），如 `Expires=Thu, 31 Dec 2025 23:59:59 GMT`。  
  - **Max-Age**：定义存活时间（秒），优先级高于`Expires`，如 `Max-Age=604800`（7天）。  
  - **默认会话Cookie**：未设置时，浏览器关闭后失效。  

## 3. 域（Domain）与路径（Path）  
- **作用域控制**：  
  - **Domain**：指定可访问Cookie的域名（如 `.example.com` 允许子域名共享）。  
  - **Path**：限制生效的URL路径（如 `/docs` 仅该路径下请求携带）。  
  - **默认值**：Domain为当前域名，Path为请求路径。  

## 4. 安全属性  
- **Secure**：仅通过HTTPS协议传输。  
- **HttpOnly**：禁止JavaScript访问，防御XSS攻击。  
- **SameSite**：控制跨站请求是否携带Cookie，可选值：  
  - `Strict`：仅同源请求发送。  
  - `Lax`：宽松模式（默认），允许部分安全跨站请求。  
  - `None`：关闭限制（需同时设置`Secure`）。  

## 5. 其他属性与限制  
- **Size限制**：单个Cookie通常不超过4KB，域名下数量有限（如50个）。  
- **存储方式**：  
  - 会话Cookie：内存存储，关闭浏览器后删除。  
  - 持久Cookie：硬盘存储，直至过期。  
- **优先级规则**：浏览器自动匹配最精确的Domain和Path。  

## 6. 完整格式示例  
Set-Cookie: name=user123; Expires=Thu, 31 Dec 2025 23:59:59 GMT; Domain=.example.com; Path=/; Secure; HttpOnly; SameSite=Lax