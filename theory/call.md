```javascript
  var obj = { a: 1 }
  Function.prototype.myCall = function(context) {

    context.fn = this
    var arg = []
    var tempFn = context.fn

    for(var i = 1; i < arguments.length; i ++) {
      arg.push(arguments[i])
    }
    
    //eval('context.fn(' + arg + ')')
    delete context.fn  //内存回收
    console.log(context)
    return tempFn(...arg)
    
  }

  function myFunc(x, y) {
    console.log(this.a)
    console.log(x)
    console.log(x + y)
  }

  console.log('log ' + myFunc.myCall(obj, 33, 4))
```