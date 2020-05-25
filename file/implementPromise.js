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

//上面实现的promise不能进行链式调用
//下面的作参考
function isFunction(func) {
    return typeof(func) === 'function'
}

const PENDING = 'PENDING'
const FULLFILLED = 'FULLFILLED'
const REJECTED = 'REJECTED'

class APromise {
    constructor(func) {
        if (!isFunction(func)) {
            throw new Error('APromise must accept a function as parameter')
        }

        this.status = PENDING
        this.value = undefined

        //由于then支持i链式调用
        this.fullfilledQueues = []
        this.rejectedQueues = []

        try {
            func(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            reject(error)
        }
    }

    resolve(val) {
        // if (this.status !== PENDING) return
        // let run = () => {
        //     this.status = FULLFILLED
        //     this.value = val
        //     let cb = this.fullfilledQueues.shift()

        //     if (cb) {
        //         cb(val)
        //     }
        // }
        // setTimeout(() => run(), 0)
        const run = () => {
                if (this.status !== PENDING) return
                this.status = FULLFILLED
                    // 依次执行成功队列中的函数，并清空队列
                const runFullfilled = (value) => {
                        let cb;
                        while (cb = this.fullfilledQueues.shift()) {
                            cb(value)
                        }
                    }
                    // 依次执行失败队列中的函数，并清空队列
                const runRejected = (error) => {
                        let cb;
                        while (cb = this.rejectedQueues.shift()) {
                            cb(error)
                        }
                    }
                    /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
                      当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
                    */
                if (val instanceof APromise) {
                    val.then(value => {
                        this.value = value
                        runFullfilled(value)
                    }, err => {
                        this.value = err
                        runRejected(err)
                    })
                } else {
                    this._value = val
                    runFullfilled(val)
                }
            }
            // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }

    reject(err) {
        if (this.status !== PENDING) return
        let run = () => {
            this.status = REJECTED
            this.value = err
            let cb = this.rejectedQueues.shift()

            if (cb) {
                cb(err)
            }
        }
        setTimeout(() => run(), 0)

    }

    then(onFullfilled, onRejected) {
        const { value, status } = this

        return new APromise((onFullfilledNext, onRejectedNext) => {

            let fullfilled = (value) => {
                try {
                    if (!isFunction(onFullfilled)) {
                        onFullfilledNext(value)
                    } else {
                        let res = onFullfilled(value)

                        if (res instanceof APromise) {
                            res.then(onFullfilledNext, onRejectedNext)
                        } else {
                            onFullfilledNext(res)
                        }
                    }
                } catch (error) {
                    onRejectedNext(error)
                }
            }

            let rejected = (value) => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(value)
                    } else {
                        let res = onRejected(value)

                        if (res instanceof APromise) {
                            res.then(onFullfilledNext, onRejectedNext)
                        } else {
                            onFullfilledNext(res)
                        }
                    }
                } catch (error) {
                    onRejectedNext(error)
                }
            }

            switch (status) {
                case PENDING:
                    this.fullfilledQueues.push(fullfilled)
                    this.rejectedQueues.push(rejected)
                    break;
                case FULLFILLED:
                    fullfilled(value)
                    break;
                case REJECTED:
                    rejected(value)
                    break;
            }
        })
    }
}

let q = new APromise((resolve, reject) => {
    setTimeout(() => {
        resolve(666)
    }, 1000)
})

q.then(res => {
    console.log(res)
    return 999
}).then(r => {
    console.log(r)
})


let a = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(666)
        resolve(666)
    }, 2000)
})

let b = a.then(res => {
    setTimeout(() => {
        console.log(777)
    }, 5000)
    return Promise.resolve(7778)
})

let c = a.then(res => {
    setTimeout(() => {
        console.log(888)
    }, 1000)
    return Promise.resolve(8887)
})

b.then(res => {
    console.log(res)
})

c.then(res => {
    console.log(res)
})