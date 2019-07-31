Array.prototype.myPop = function() {
  let arrLength = this.length
  let popItem = this[arrLength-1]
  
  this.length = arrLength - 1
  return popItem
}

Array.prototype.myShift = function() {
  let one = this[0]
  for (let i = 1; i< this.length;i ++) {
    this[i-1] = this[i]
  }
  this.length --
  return one
}

let a = [1,2,3,4]
let b = a.myPop()


console.log(a)
console.log(b)

let c = a.myShift()
console.log(c)
console.log(a)

