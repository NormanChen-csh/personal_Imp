```javascript
  var obj = { a: 3 }
  Function.prototype.myCall = function(context) {

    context.fn = this
    var arg = []

    for(var i = 1; i < arguments.length; i ++) {
      arg.push(arguments[i])
    }
    var result = context.fn(...arg)
    //eval('context.fn(' + arg + ')')
    delete context.fn  //内存回收
    return result
    
  }

  function myFunc(x, y) {
    console.log(x + y)
    return x + y * this.a
  }

  console.log('log ' + myFunc.myCall(obj, 33, 4))
```