# 前端大规模请求如何限流
## 队列限流
### 一、队列限流实现原理
1. 核心机制
创建请求队列存储待处理任务，通过计数器（如 activeCount ）限制同时执行的请求数量。当正在执行的请求数量未达到最大值时，从队列头部取出任务执行；任务完成后释放计数器，继续处理队列中的下一个请求。
2. 关键参数
    - maxConcurrent ：最大并发数（如4-6个），需结合浏览器同域名请求限制（通常为6）和服务端处理能力设定
    - 队列结构 ：先进先出（FIFO）的数组或链表结构，确保请求处理顺序
### 二、代码实现方案
1. 基础队列控制器，基于 Promise 实现
```js
class RequestQueue {
  constructor(maxConcurrent = 5) {
    this.maxConcurrent = maxConcurrent; // 最大并发数
    this.queue = []; // 请求队列
    this.activeCount = 0; // 当前执行中的请求数
  }

  // 添加请求到队列
  enqueue(requestFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFunction, resolve, reject });
      this.processQueue();
    });
  }

  // 处理队列
  processQueue() {
    while (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
      const { requestFunction, resolve, reject } = this.queue.shift();
      this.activeCount++;
      
      requestFunction()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.activeCount--;
          this.processQueue(); // 递归触发后续处理
        });
    }
  }
}

// 使用示例
const requestQueue = new RequestQueue(3); // 允许3个并发
urls.forEach(url => {
  requestQueue.enqueue(() => fetch(url))
    .then(data => console.log('Success:', data))
    .catch(err => console.error('Failed:', err));
});

```
2. 增强型队列控制器，支持重试和超时控制
```js
class EnhancedQueue extends RequestQueue {
  constructor(maxConcurrent, maxRetry = 2) {
    super(maxConcurrent);
    this.maxRetry = maxRetry; // 失败重试次数
  }

  async processWithRetry(requestFunction, retryCount = 0) {
    try {
      const result = await requestFunction();
      return result;
    } catch (error) {
      if (retryCount < this.maxRetry) {
        return this.processWithRetry(requestFunction, retryCount + 1);
      }
      throw error;
    }
  }
}
```
### 三、场景优化策略
1. 动态并发调整
根据网络状态（如 navigator.connection.effectiveType ）动态调整 maxConcurrent ，2G网络降低至2个并发，5G网络提升至6个并发
2. 优先级队列
对关键请求（如支付接口）设置优先级，使用双队列结构。
```js
pushRequest(task, isHighPriority = false) {
  isHighPriority ? 
    this.highPriorityQueue.push(task) : 
    this.lowPriorityQueue.push(task);
  this.processQueue();
}
```
3. 队列状态可视化
在UI中展示排队状态（如进度条/倒计时），避免用户重复提交
```js
// 队列长度监控
setInterval(() => {
  document.getElementById('queue-count').textContent = requestQueue.queue.length;
}, 1000);
```
### 四、结合限流算法
1. 令牌桶补充机制
定时向队列补充"令牌"（处理权），模拟令牌桶算法
```js
refillBucket() {
  setInterval(() => {
    if (this.activeCount < this.maxConcurrent) {
      this.processQueue();
    }
  }, 1000 / this.maxConcurrent); // 按QPS计算间隔
}
```
2. 滑动窗口计数
记录时间窗口内的请求量，动态调整队列处理速度
```js
const windowSize = 60; // 60秒窗口
let requestTimestamps = [];

function checkRateLimit() {
  const now = Date.now();
  requestTimestamps = requestTimestamps.filter(t => t > now - windowSize*1000);
  return requestTimestamps.length < maxRequestsPerMinute;
}
```