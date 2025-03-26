# 阿里OD笔试题

```javascript
let num = 2;

function fn1 (){
    let num = 1; 
    return Function('console.log(this, num)')();
}
fn1.call({}) // global / window, 2

function fn2 (){
    let num = 1; 
    setTimeout(function(){
        console.log(this, num);
    },1);
}
fn2.call({}) // global / window, 1

function fn3 (){
    let num = 1; 
    console.log(this, num)
}
fn3.call({}) // {}, 1

function fn4 (){
    let num = 1; 
    setTimeout(()=>{
        console.log(this, num);
    },0)
}
fn4.call({})  // {}, 1


class ClassA {
  logThis(){
    console.log(this);
  }
}

function cbTest(fn){ 
    fn() 
}
const aInstance = new ClassA();
cbTest(aInstance.logThis) // global / window

---

MyPromise

var ainstance = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
});

var binstance = ainstance.then((arg)=>{
  console.log(arg) // 1
  return new MyPromise(res=>{
    setTimeout(res,0)
  })
})

ainstance.then(console.log) // 1
binstance.then(console.log) // undefined

class MyPromise {
  constructor(excutor) {
    this.status = 'pending'; // 记录状态
    this.value = undefined; // resolve的值
    this.reason = undefined; // reject的值
    this.onFulfilledCallbacks = []; // resolve的callbacks
    this.onRejectedCallbacks = []; // reject的callbacks

    function resolve(value) {
      console.log(1)
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.onFulfilledCallbacks.forEach(cb => cb(this.value));
      }
    }
    function reject(reason) {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach(cb => cb(this.reason));
      }
    }
    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    console.log(3)
    if (this.status === 'fulfilled') {
      this.value = onFulfilled(this.value)
    return new MyPromise((resolve) => resolve(this.value));

    } else if (this.status === 'rejected') {
      this.reason = onRejected(this.reason)
    return new MyPromise((resolve, reject) => reject(this.reason));
    } else {
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    return new MyPromise((resolve) => resolve(this.value));
    }
  }
  catch(error) {
    if ()
  }
  static resolve(value) {
    return this.then()
  }

  static reject(reason) {
    return this.then()
  }


}

new MyPromise(res=>res(1)).then(console.log)

```