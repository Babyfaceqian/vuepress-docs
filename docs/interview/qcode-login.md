# 扫码登录技术实现方案

## 一、核心原理
### 1. UUID身份绑定机制
- **唯一标识生成**：服务端生成全局唯一UUID（如Java的`UUID.randomUUID()`），作为二维码的核心标识
- **状态绑定**：UUID与PC端设备信息（IP、设备指纹等）进行绑定，并存储在Redis（有效期5分钟）
- **状态流转**：二维码包含三种状态：待扫描（未关联）→ 已扫描（关联移动端）→ 已确认（完成登录）

### 2. 双重验证机制
- **临时Token验证**：移动端扫码后获取临时Token（一次性凭证），用于二次确认时验证设备一致性
- **Token传递**：确认登录后生成PC端专属Token，通过WebSocket或轮询返回

---

## 二、技术实现步骤
### 1. Web端流程
1. 生成UUID并存储（Redis）
```java
// 生成UUID并存储（Java示例）
public String generateUUID() {
    String uuid = UUID.randomUUID().toString();
    redisTemplate.opsForValue().set(uuid, "pending", 300, TimeUnit.SECONDS);
    return uuid;
}
```
2. 二维码生成：使用ZXing库生成含UUID的二维码（建议容错率H级）
3. 状态轮询：
    - 短轮询 ：每1秒请求 /check_login?uuid=xxx 接口
    - 长轮询 ：使用WebSocket连接，服务端推送状态变更

### 2. 移动端流程
```js
// UniApp扫码示例
uni.scanCode({
  success: (res) => {
    const uuid = res.result; 
    this.loginWithUUID(uuid); // 调用确认接口
  }
})
```
- 扫码解析 ：解析二维码中的UUID，携带设备ID和用户Token发送至服务端
- 二次确认 ：弹出授权界面，用户点击确认后提交临时Token完成绑定