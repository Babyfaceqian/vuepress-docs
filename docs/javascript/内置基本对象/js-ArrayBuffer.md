# js-ArrayBuffer
> ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
## 方法
- ArrayBuffer.isView(arg) 
- ArrayBuffer.transfer(oldBuffer [, newByteLength])
- ArrayBuffer.slice()
## 实例属性
- ArrayBuffer.prototype.constructor
- ArrayBuffer.prototype.byteLength
数组的字节大小。在数组创建时确定，并且不可变更。只读。
## 实例方法
ArrayBuffer.prototype.slice()