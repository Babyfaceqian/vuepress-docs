# 文件分片上传
## 浏览器端
- 浏览器端的文件分片上传主要是通过`File.slice`方法来实现的。`File.slice`方法可以将一个文件分割成多个部分，每个部分都是一个`Blob`对象。`Blob`对象是一个二进制数据的容器，它可以被用于存储和传输二进制数据。
- 将分片包装到`FormData`对象中，使用`Fetch`API发送请求。`FormData`对象是一个键值对的集合，它可以用于存储和传输表单数据。`Fetch`API是一个用于发送HTTP请求的API，它可以用于发送表单数据。
## 服务端
- 服务端接收分片并保存到本地文件系统中。服务端可以使用`Node.js`的`fs`模块来操作文件系统。`fs`模块是一个用于操作文件系统的模块，它可以用于读取、写入、删除文件等操作。
- 服务端需要在分片合并前校验分片的完整性，比较简单的做法是比较本地保存的分片数量和分片的总数是否一致。如果不一致，则说明分片上传失败，需要重新上传。
- 服务端使用`fs`模块进行分片合并。`fs`模块提供了一些方法用于操作文件系统，例如`fs.createWriteStream`方法可以用于创建一个可写流，`fs.createReadStream`方法可以用于创建一个可读流。

## 浏览器端代码
```ts
// nextjs 中实现
"use client"
import React, { useState } from 'react';

const ChunkSize = 1024 * 1024; // 1MB

const BigFileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 缓存文件
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    // 计算分片数量
    const totalChunks = Math.ceil(selectedFile.size / ChunkSize);

    for (let i = 0; i < totalChunks; i++) {
      // 计算分片的起始和结束位置
      const start = i * ChunkSize;
      const end = Math.min(start + ChunkSize, selectedFile.size);

      // 上传分片
      try {
        const formData = new FormData();
        formData.append('file', selectedFile.slice(start, end));
        formData.append('name', selectedFile.name);
        formData.append('chunkIndex', i.toString());
        formData.append('totalChunks', totalChunks.toString());

        // 发送请求
        const response = await fetch('/api/file', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('上传失败');
        }
      } catch (error) {
        console.error('上传出错:', error);
        return;
      }
    }

    console.log('文件上传完成');
  };

  return (
    <div className='mt-[100px]'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>上传文件</button>
    </div>
  );
};

export default BigFileUpload;

```
## 服务端代码
```ts
// nextjs 中实现
import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');
const path = require('path');

export async function POST(_req: NextApiRequest & Request, res: NextApiResponse) {
    const formData = await _req.formData();
    const file = formData.get('file') as File;
    const chunkIndex = parseInt(formData.get('chunkIndex') as string);
    const totalChunks = parseInt(formData.get('totalChunks') as string);
    const filename = formData.get('name');
    const tempFilePath = path.resolve('./temp'); // 临时分片文件路径

    // 确保临时目录存在
    if (!fs.existsSync(tempFilePath)) {
        fs.mkdirSync(tempFilePath, { recursive: true });
    }
    // 将分片写入临时文件
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = fs.createWriteStream(`${tempFilePath}/${chunkIndex}`, { flags: 'w' });
    await new Promise((resolve) => {
        stream.write(buffer, () => {
            stream.end(() => resolve(true));
        });
    });

    let status = 'pending';
    // 检查是否所有分片都已接收
    const receivedChunks = fs.readdirSync(tempFilePath).length;
    if (receivedChunks === totalChunks) {
        // 创建合并文件存放的路径
        const mergedFilePath = path.resolve('./uploads');
        if (!fs.existsSync(mergedFilePath)) {
            fs.mkdirSync(mergedFilePath, { recursive: true });
        }
        const writeStream = fs.createWriteStream(mergedFilePath + '/' + filename);
        // 合并分片
        try {
            for (let i = 0; i < totalChunks; i++) {
                const readStream = fs.createReadStream(tempFilePath + '/' + i);
                await new Promise((resolve) => {
                    readStream.on('data', (chunk: any) => {
                        writeStream.write(chunk);
                    });
                    readStream.on('end', resolve);
                });
            }
            writeStream.end(); // 确保所有数据写入完成
        } catch (error) {
            
        }
        writeStream.end();
        // 删除临时文件
        fs.rmSync(tempFilePath, { recursive: true, force: true });
    }

    return Response.json({ ok: true, status })
}

```