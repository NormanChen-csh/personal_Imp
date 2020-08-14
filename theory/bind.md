```javascript
  Function.prototype.myBind = function(context) {
      // context是作用域上下文
      let func = this //保存调用函数
      let args_1 = []
      for(let i = 1; i < arguments.length; i++) {
          args_1.push(arguments[i])
      }
      
      return function() {
          let args_2 = []
          for(let j = 0; j<arguments.length; j ++) {
              args_2.push(arguments[j])
          }

          let arr = args_1.concat(args_2)
          return func.apply(context, arr)
      }
  }

  let obj = {
      init: 1,
      add: function(q,w,e,r) {
          console.log(q+w+e+r+this.init)
      }
  }

  let pp = obj.add

  pp.myBind(obj, 1,2)(3,4)
```


第二种简便方法

```javascript
  Function.prototype.myBind = function(context) {
    let func = this
    let args = Array.prototype.slice.call(arguments, 1)
    
    return function() {
        let args_2 = Array.prototype.slice.call(arguments, 0)

        let arr = args.concat(args_2)
        return func.apply(context, arr)
    }
  }

  let obj = {
      init: 1,
      add: function(q,w,e,r) {
          console.log(q+w+e+r+this.init)
      }
  }

  let pp = obj.add

  pp.myBind(obj, 1,2)(3,4)

```