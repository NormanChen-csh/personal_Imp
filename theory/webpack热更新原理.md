# Webpack 热更新原理

HOT MODULE REPLACEMENT (HMR) 


基本实现原理大致这样的，构建 bundle 的时候，加入一段 HMR runtime 的 js 和一段和服务沟通的 js 。文件修改会触发 webpack 重新构建，服务器通过向浏览器发送更新消息，浏览器通过 jsonp 拉取更新的模块文件，jsonp 回调触发模块热替换逻辑。

基本流程是：

1. 当文件修改并保存，触发webpack重新打包并存在内存中
2. webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，**webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控**，并且告诉 webpack，将代码打包到内存中。
3. webpack-dev-server 对文件变化的一个监控，这个文件是webpack相关配置文件，会触发页面的刷新 live reload
4. webpack-dev-server 和浏览器端通过socket.js 建立一个websocket长连接，把各个阶段的东西发送给浏览器端，主要是hash值这些
5. webpack-dev-server/client端并不能请求更新代码，也不执行热更新模块操作，把这部分功能交给webpack。webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。
6. HotModuleReplacement.runtime是客户端HMR的中枢，他接收webpack-dev-server/client传给他的hash值，他通过JsonpMainTemplate.runtime向server端发送Ajax请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值。
7. 获取到更新列表后，JsonpMainTemplate.runtime模块再次通过 jsonp 请求，获取到最新的模块代码
## 有两次向server请求，第一次请求到需要更新模块的hash值列表，第二次是请求到要更新模块的代码

8. HotModulePlugin会对新旧模块进行对比，决定是否更新，决定更新后检查依赖关系，更新模块的同时去更新依赖引用。
9. 如果HotModulePlugin失败 就直接live reload刷新页面来获取最新打包代码