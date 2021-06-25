# 算法学习

## 贪心算法 （双指针解答）

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

```javascript
  输入：[1,8,6,2,5,4,8,3,7]
  输出：49

  // 此方法可以得到结果 但是数据量大了就很慢
  var maxArea = function(height) {
    let max = 0
    for (let i = 0; i < height.length; i++) {
        for (let j = height.length - 1; j > i; j--) {
            let temp = Math.min(height[j],height[i])
            if (temp * (j - i) > max) {
                max = temp * (j - i)
            }
        }
    }
    return max
  }

  // 此方法用了双指针解法，左右两个指针向中间靠拢，每次循环，值更小的往中间移动一次
  var maxArea = function(height) {
    let max = 0

    for (let i = 0, j = height.length - 1; i < j;) {
      let temp = (j - i) * Math.min(height[i], height[j])
      height[i] > height[j] ? j-- : i++
      temp > max ? max = temp : ''
    }
    return max
  }

  maxArea([1,8,6,2,5,4,8,3,7,10,11, 8,5,19])
```

## 背包问题（动态规划解法）

```javascript
// 不需要考虑顺序的零钱问题
  var change = function(amount, coins) {
      let len = coins.length
      let dp = new Array(len + 1)

      if (len === 0) {
          return  amount === 0 ? 1 : 0
      }

      for (let i = 0; i <= len; i++) {
          dp[i] = new Array(amount + 1).fill(0)
      }

      for (let i = 1; i <= len; i++) {
          dp[i][0] = 1
          for (let j = 1; j <= amount; j++) {
              if (i === 1) {
                  dp[i][j] = j % coins[i - 1] === 0 ? 1 : 0
              } else {
                  dp[i][j] = dp[i - 1][j] + (j >= coins[i - 1] ? dp[i][j - coins[i - 1]] : 0)
              }
              console.log(dp)
          }
      }
      return dp[len][amount]
  }

  // 解法2 一维数组
  //
  var change = function(amount, coins) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
          // 对于面额为coin的硬币，当coin <= i <= amount时，如果存在一种**硬币的组合的金额之和**等于i-coin,则在该硬币组合中增加一个面额coin的硬币，即可得到一种金额之和等于i的硬币组合
            dp[i] += dp[i - coin]; // dp[i]《=》dp(amount)为当前金额下的组合数,dp[i] = dp[i] (这个dp[i]是上一种硬币计算出来的历史数据)+ ...
        }
    }
    return dp[amount];
  } 

  change(10, [1, 2, 5])
```

```javascript
// 需要考虑顺序的跳楼梯问题
  let drump = function(total, feetArr) {
    let dp = new Array(total + 1).fill(0)

    dp[0] = 0
    dp[1] = 1
    dp[2] = 2
    dp[3] = 4

    for (let i = 3; i < total; i++ ) {
        dp[i] = dp[i - feetArr[0]] + dp[i - feetArr[1]] + dp[i - feetArr[2]]
        console.log(dp[i])
    }

    return dp[total]
}

  console.log(drump(3, [1,2,3]))
```

## 获取相同前缀问题

```javascript
   var longestCommonPrefix = function(strs) {
      if(!strs[0]) return ''

      let n = 1
      let target = strs[0].substr(0,n)

      for (let i = 1; i < strs.length; ) {
        if (strs[i].indexOf(target) == 0) {
          console.log(`i ${i}  target  ${target}`)
          if (i == strs.length - 1) {
            console.log(`i ${i}, n ${n}`)
            i = 1
            if (n == strs[0].length) {
              break
            } else {
              n++
              target = strs[0].substr(0,n)
            }
          } else {
            i++
          }
        } else {
          n--
          break;
        }
      }
      return strs[0].substr(0,n)
  }

  console.log(longestCommonPrefix(
    ["flower","flower","flower","flower"])) // flower
  console.log(longestCommonPrefix(['ab', 'a'])) // a
```

## 二進制手錶亮灯問題

二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。每个 LED 代表一个 0 或 1，最低位在右侧。

输入：turnedOn = 1 //亮灯数为1

输出：["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]

本题的解题关键是知道时、分所对应的灯的值的**二进制值**有几个1，1表示灯亮,0表示灯不亮

```javascript
  var readBinaryWatch = function(turnedOn) {
    let res = []
    // 获取有几个1 几个灯亮着
    let getOne = (num) => {
        let total = 0
        while (num) {
            if (num & 1) { // 位运算符中的与，简称位与，用来判断两个二进制值同位是否都为1,如1001（9） & 1 = 1， 因为就最后一位都是1 所以结果为1
                total++  // 此处可以知道num的二进制值中有多少1
            }
            num = num >>> 1 // >>>是二进制移位运算符，如8 >> 1 => 1000 变成 100 得到4
        }
        return total
    }

    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 60; j++) {
            if (getOne(i) + getOne(j) == turnedOn) {
                res.push(`${i}:${j < 10 ? '0' + j: j}`)
            }
        }
    }
    return res
  };
```
