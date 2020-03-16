# ArrayBuffer
> ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

## Why ArrayBuffer
> JS里的Array，因为有很多功能，而且是不限制类型的，或者它还可能是稀疏的……总之这个Array是“托管”的，它内部有比较复杂的实现。
而如果你从XHR、File API、Canvas等等各种地方，读取了一大串字节流，如果用JS里的Array去存，又浪费，又低效。
于是为了配合这些新的API增强JS的二进制处理能力，就有了ArrayBuffer。
>
> ArrayBuffer简单说是一片内存，但是你不能（也不方便）直接用它。这就好比你在C里面，malloc一片内存出来，你也会把它转换成unsigned_int32或者int16这些你需要的实际类型的数组/指针来用。
>
> 这就是JS里的TypedArray的作用，那些Uint32Array也好，Int16Array也好，都是给ArrayBuffer提供了一个“View”，MDN上的原话叫做“Multiple views on the same data”，对它们进行下标读写，最终都会反应到它所建立在的ArrayBuffer之上。
> 
> 除了TypedArray以外，也可以使用DataView来读写ArrayBuffer，这样会麻烦一些，但也更灵活。DataView能更自由的选择字节序，对于对齐的要求也更低。
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