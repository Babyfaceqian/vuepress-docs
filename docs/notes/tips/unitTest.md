# 单元测试

- 单元测试对于任何 React 项目（及其他任何项目）来说都是必须的
- 我们需要自动化的测试套件，根本目标是为了提升企业和团队的 IT「响应力」
- 之所以优先选择单元测试，是依据测试金字塔的成本收益比原则确定得到的
- 好的单元测试具备三大特征：

  - 有且仅有一个失败的理由：不关注内部实现
  - 表达力极强
  - 快、稳定

- 单元测试也有测试策略：在 React 的典型架构下，一个测试体系大概分为六层：组件、action、reducer、selector、副作用层、utils。它们分别的测试策略为：

  - reducer、selector 的重逻辑代码要求 100% 覆盖
  - utils 层的纯函数要求 100% 覆盖
  - 副作用层主要测试：

    - 是否拿到了正确的参数
    - 是否调用了正确的 API
    - 是否保存了正确的数据
    - 业务逻辑
    - 异常逻辑

  - 组件层两测两不测：

    - 分支渲染逻辑必测
    - 事件、交互调用必测
    - 纯 UI（包括 CSS）不测
    - @connect 过的高阶组件不测

  - action 层选择性覆盖：可不测

- 其他高级技巧：定制测试工具（jest.extend）、参数化测试等。

## 实践

### 测试框架

#### jest

```
npm i -D jest
```

jest 包含了测试所需的断言库、mock 库、快照、覆盖率报告等。

使用`jest --init`初始化配置文件。

```js
// jest.config.js 基础配置
const path = require("path");
module.exports = {
	rootDir: path.resolve(__dirname, "./"),
	collectCoverage: false, // 是否手机测试时的覆盖率信息
	moduleNameMapper: {
		// 主要用于与webpack的resolve.alias匹配，注意正则写法
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	setupFiles: ["<rootDir>/jest.setup.js"], // 运行测试前可运行的脚本，比如注册enzyme的兼容
	testMatch: ["<rootDir>/src/**/*.test.{js,jsx,mjs}"],
};
```

#### @testing-library/react

测试 react 必备，提供了方便的测试工具函数。

#### @testing-library/jest-dom

用于 dom 测试的断言库扩展，直接在文件中引入就行。

#### redux-mock-store

测试 redux connect 过的组件时 mock store 使用。

### 测试代码

#### reducer

```js
// model.js 使用dva的写法
export default {
	// 省略
	reducers: {
		setVisible(state, { payload }) {
			return { ...state, visible: payload };
		},
	},
};
// model.test.js
import model from "./model";
it("setVisible", () => {
	let state = {};
	const payload = true;
	state = reducers.setVisible(state, { payload });
	expect(state.visible).toEqual(payload);
});
```

#### 副作用

```js
// model.js 使用dva的写法
import * as Fetch from "./apis";
export default {
	// 省略
	effects: {
		*getDetail(action, { put, call, select }) {
			const param = yield select((state) => state.param);
			const res = yield call(Fetch.getDetail, {...param, id: action.payload});
			if (res.success) {
				yield put({
					type: "setDetail",
					payload: res.data,
				});
			}
			action.cb && action.cb(res);
		},
	},
};
// model.test.js
import model from "./model";
import * as Fetch from "./apis";
import { runSaga } from "redux-saga";
import { put, select, call } from "redux-saga/effects";
it("getDetail", () => {
	const state = {
    param: {
      type: 'test'
    }
  };
	const action = {
		payload: 123,
		cb: jest.fn(),
	};
	const res = {
		success: true,
		data: [],
  };
  const dispatched = [];
	const apiMock = jest
		.spyOn(Fetch, "getDetail")
    .mockImplementation(async () => res);
  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => state
    },
    model.effects.getTaskDetail,
    action,
    {put, call, select}
  );
  expect(apiMock).toHaveBeenCalledWith({
    type: 'test',
    id: 123
  })
  expect(dispatched).toContainEqual({
    type: 'setDetail',
    payload: res.data
  })
});
```
#### 组件