# typed-array
JavaScript类型化数组是一种类似数组的对象，并提供了一种用于访问原始二进制数据的机制。 
- ArrayBuffer 是一种数据类型，用来表示一个通用的、固定长度的二进制数据缓冲区。
- DataView 是一种底层接口，它提供有可以操作缓冲区中任意数据的读写接口。

## 使用类型数组的Web APIEdit节
- FileReader.prototype.readAsArrayBuffer()
FileReader.prototype.readAsArrayBuffer() 读取对应的Blob 或 File的内容
- XMLHttpRequest.prototype.send()
XMLHttpRequest 实例的 send() 方法现在使用支持类型化数组和 ArrayBuffer 对象作为参数。
- ImageData.data
是一个 Uint8ClampedArray 对象，用来描述包含按照RGBA序列的颜色数据的一维数组，其值的范围在0到255（包含255）之间。