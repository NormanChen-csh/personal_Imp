# fetch、ajax、axios 区别

## fetch

1. fetch并不是基于XMLHttpRequest对象进行封装的，这个是和ajax和axios的区别
2. fetch是一个HTML5的window下的api,不是ES6的内容
3. fetch执行之后会回调一个promise对象
4. 用传统xhr按顺序访问两个异步接口，如果第一个接口访问失败了，那第二个接口就不能在继续进行了，但用fetch就能处理这种情况了
5. 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject， 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
6. fetch 不会发送 cookies。除非你使用了credentials 的初始化选项。
7. 等等。。。。

## axios

axios是基于XMLHttpRequest()和promise实现的

## ajax

ajax 是基于XMLHttpRequest()实现的，是jQuery封装的请求方法