# TypeScript 笔记
## 基础类型
- 布尔值：boolean
- 数字：number
- 字符串：string
- 数组：`number[]` | `Array<number>`
- 元组：[string, number]
- 枚举：{Red = 1, Green = 2, Blue = 4}
- Any：any
- Void：void
- Null：null
- Undefined：undefined
- Never：never
- Object：object
- Symbol：symbol
- 类型断言：`<string>someValue` | someValue as string

## 接口
### 可选属性：?
```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
```
### 只读属性：readonly
```ts
interface Point {
    readonly x: number;
    readonly y: number;
}

let ro: ReadonlyArray<number> = a;
// readonly 用在属性，const 用在变量
```
### 额外的属性检查
```ts
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```
### 函数类型
```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```
### 可索引的类型
```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```
### 类类型
#### 实现接口
  ```ts
  interface ClockInterface {
      currentTime: Date;
      setTime(d: Date);
  }

  class Clock implements ClockInterface {
      currentTime: Date;
      setTime(d: Date) {
          this.currentTime = d;
      }
      constructor(h: number, m: number) { }
  }
  ```
#### 类静态部分与实例部分的区别
```ts
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute); // 对静态类型部分，也就是 constructor 做类型检查
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```
### 继承接口
```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```
### 混合类型
```ts
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```
### 接口继承类
```ts
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}
```

## 类
### 公共，私有与受保护的修饰符
  - public：默认为 public
  - private：当成员被标记成 private时，它就不能在声明它的类的外部访问
  - protected：protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问

### readonly修饰符：只读属性必须在声明时或构造函数里被初始化
### 存取器
```ts
// 首先，存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 其次，只带有 get不带有 set的存取器自动被推断为 readonly
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```
### 静态属性
> static定义的属性为静态属性，它是类本身的属性而不是类实例的属性，所以访问的时候要用类本身访问。

### 抽象类
> 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
```ts
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
```
> 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。

## 高级技巧
### 构造函数
### 把类当做接口使用

## 函数
### 为函数定义类型
```ts
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
// 也可以这么写
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
// 也可以省略部分类型定义，由 TS 自行推断
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```
### 可选参数和默认参数
> 在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能。可选参数必须跟在必须参数后面。在所有必须参数后面的带默认初始化的参数都是可选的。
```ts
function buildName(firstName: string, lastName?: string) {
    // ...
}
// 带默认初始化的参数都是可选的
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```

### 剩余参数
```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

```

## 泛型
### 类型变量
```ts
function identity<T>(arg: T): T {
    return arg;
}
```
> 类型变量T(任意名称)帮助我们捕获用户传入的类型（比如：number），之后我们再次使用了 T当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。identity称之为泛型函数。

```ts
// 调用时明确参数类型
let output = identity<string>("myString");
// 或 让 TS 自行判断
let output = identity("myString");
```
### 使用泛型变量
```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```
### 泛型类型
```ts
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```
### 泛型类
```ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
### 泛型约束
```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```
#### 在泛型约束中使用类型参数
```ts
function getProperty(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```
#### 在泛型里使用类类型
```ts
function create<T>(c: {new(): T; }): T {
    return new c();
}
```
## 枚举
### 数字枚举
```ts
// Up使用初始化为 1。 其余的成员会从 1开始自动增长。
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
```
### 字符串枚举
```ts
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```
### 异构枚举
```ts
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```
### 计算的和常量成员
### 联合枚举与枚举成员的类型
### 运行时的枚举
### const枚举
```ts
const enum Enum {
    A = 1,
    B = A * 2
}
```
### 外部枚举
> 外部枚举用来描述已经存在的枚举类型的形状。
> 外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。
```ts
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```
## JSX
### `as` 操作符
- 在结合 JSX 语法时，禁用了尖括号的断言方式，改为 `as` 代替。
```ts
var foo = <foo>bar;
// 改为
var foo = bar as foo;
```