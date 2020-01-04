# Tips
- npm i（或cnpm i）时报以下错误：
```js

gyp: No Xcode or CLT version detected!
gyp ERR! configure error 
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/usr/local/lib/node_modules/node-gyp/lib/configure.js:351:16)
gyp ERR! stack     at ChildProcess.emit (events.js:210:5)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:272:12)
gyp ERR! System Darwin 18.5.0
gyp ERR! command "/usr/local/bin/node" "/usr/local/bin/node-gyp" "rebuild"
gyp ERR! cwd /Users/mic/Documents/programming/backend-arch/node_modules/_fsevents@1.2.11@fsevents
gyp ERR! node -v v12.14.0
gyp ERR! node-gyp -v v5.0.7
gyp ERR! not ok 
[npminstall:runscript:error] babel-loader@8.0.6 › webpack@4.41.4 › watchpack@1.6.0 › chokidar@2.1.8 › fsevents@^1.2.7 has binding.gyp file, run "node-gyp rebuild" error: Error [RunScriptError]: Run "sh -c node-gyp rebuild" error, exit code 1
    at ChildProcess.<anonymous> (/usr/local/lib/node_modules/cnpm/node_modules/runscript/index.js:96:21)
    at ChildProcess.emit (events.js:210:5)
    at maybeClose (internal/child_process.js:1021:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:283:5) {
  name: 'RunScriptError',
  stdio: [Object]
}
```
解决办法：
按照 node-gyp 的 npm 官网上的步骤

- babel 编译 ES6 的 import 和 export 模块时，需要注意 export 出来的变量是编译时依赖还是运行时依赖的。

```js
// config.js
import InterfaceManagement from '../modules/interfaceManagement/views';
import InterfacePublish from '../modules/interfacePublish/views';
// 编译时依赖
export const PREFIX = 'http://localhost:3000'
// 运行时依赖
export const menuList = [
  {
    name: '接口管理',
    to: '/management',
    comp: InterfaceManagement
  },
  {
    name: '接口发布',
    to: '/publish',
    comp: InterfacePublish
  }
];
// another.js
import { PREFIX, menuList } from 'config'; // 这里会有问题，PREFIX为 undefined

```
解决方法：
将静态和动态的变量分开导出