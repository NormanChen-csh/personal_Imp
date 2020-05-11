

class myPromise {
  constructor(fun) {
    this.data = null
    this.error = null
    this.status = 'pending'
    let resolve = (data) => {
      this.status = 'resolve'
      this.data = data
      // 决议成功 继续后面的调用
      this.thenCb && this.thenCb(data)
    }

    let reject = (data) => {
      this.error = data
      this.status = 'reject'

      this.thenErrCb && this.thenErrCb(data)
    }

    fun && fun(resolve, reject)
  }

  thenable(cb, errCb) {
    switch (this.status) {
      case 'resolve': 
        cb && cb(this.data)
        break;
      case 'reject':
        errCb && errCb(this.data)
      default:
        break;
    }

    this.thenCb = cb;
    this.thenErrCb = errCb;

    return this
  }
}



let p = new myPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('this is promise resolve')
    resolve('hahaha')
  }, 1000)
})

p.thenable(res => {
  console.log('this is then ' + res)
  return 555
})



let k = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('this is promise resolve')
    resolve('hahaha')
  }, 1000)
})

k.then(res => {
  console.log('promise ' + res)
  return 555
}).then(res => {

}).then(res => {
  console.log(res)
})