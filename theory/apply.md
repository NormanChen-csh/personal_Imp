```javascript
    var obj = { a: 2 }
    Function.prototype.myApply = function(context, arr) {
        context.fn = this
        
        // eval('context.fn(' + arr + ')')
        var result = context.fn(...arr)
        delete context.fn
        return result
    }

    function myFunc(a, b ,c) {

        console.log((a + b + c) * this.a)
    }

    myFunc.myApply(obj, [1,2,3])
```