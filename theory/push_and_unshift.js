Array.prototype.myPush = function(val) {
  let arrLength = this.length
  this[arrLength] = val
  return this.length
}

Array.prototype.myUnshift = function(val) {
  let k = []
  for(let i = 1; i <= this.length; i++) {
    k[i] = this[i-1]
  }
  k[0] = val
  for (let j = 0; j < k.length; j++) {
    this[j] = k[j]
  }
  return this.length
}

let a = [5,3,1]
let b = a.myPush(4)

console.log(a)
console.log(b)

let c = a.myUnshift(8)
console.log(c)
console.log(a)