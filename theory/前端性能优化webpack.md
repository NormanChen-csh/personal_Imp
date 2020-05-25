# 前端性能优化webpack篇

一个前端工程化项目，出了运用好项目本身的性能优化还得有打包工具的优化，下面就是几种关于webpack相关的打包优化，来更好的代码分层和减少代码体积

## webpack的性能优化层面一般从这几个方面来进行

  1. 静态资源压缩（图片，外部文件）
  2. 压缩代码
  3. Tree Shaking/Scope Hoisting
  4. 使用cdn加载第三方模块
  5. 多线程打包happypack/thread-loader/DllPlugin
  6. splitChunks抽离公共文件
  7. sourceMap优化

### 1. 静态资源压缩（图片，外部文件）

静态资源压缩是最基础的减少包体积的办法。我们可以使用npm run build --report这个命令来得到打包后各个模块内存划分的一个html页面，就可以知道哪些静态资源过大。

图片压缩办法

1. 找在线压缩网站手动压缩，适用于很大的图片，就算是banner图压缩后200K以内比较合适
2. 使用img-loader和url-loader这两个loader，url-loader可以配置limit参数(一般100k以内图片)，小于这个参数转换成Base64编码打包进JS。img-loader这个是使用插件imagemin-pngquant然后配置参数quality:[0.3,0.5]//图片压缩30%~50%，来达到所有图片压缩。

综合上述两种方法结合使用可以把图片资源压缩到最适合的大小。

静态资源JS、CSS等外部静态资源可以使用CDN或者不将他们打入到项目包中，通过外部引入来减少主项目体积，当然必须使用压缩后的代码

### 2. 压缩代码

压缩代码一般分为JS、CSS、HTML 三类文件的压缩。
1. JS压缩代码插件Uglifyjs-webpack-plugin
2. CSS压缩代码插件
Optimize-css-assets-webpack-plugin
3. HTML压缩代码插件html-webpack-plugin

现在的项目脚手架基本上都集成了这几个压缩代码的插件，无需自己引入

### 3. Tree-Shaking/Scope Hoisting

Tree-Shaking是基于ES6impot/export语法衍生出的一种webpack的移除 JavaScript 上下文中的未引用代码(dead-code)，他是从webpack2.0开始，需支持ES6语法，commonJS语法慎用。主要作用就是通过分析文件中的export和import 把没有用到的export方法不打包进项目中，来减小代码体积。

最简单的使用方式是在package.json中添加"sideEffects": false，在没有副作用的情况下可以这么使用（什么叫没有副作用，整个项目都是通过import 和export来进行变量的导入，没有类似于地图JS这类全局的JS文件）。

Scope Hoisting也是基于ES6的代码优化方法，是通过分析出模块之间的**依赖关系**，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。因此只有那些被引用了一次的模块才能被合并。合并作用域减少反复声明

SH使用方式就是引入**ModuleConcatenationPlugin**插件

```javascript
  const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

  module.exports = {
    plugins: [
      // 开启 Scope Hoisting
      new ModuleConcatenationPlugin(),
    ],
  };
```

### 4.使用cdn加载第三方模块

当用户访问已经加入CDN服务的网站时，首先通过DNS重定向技术确定最接近用户的最佳CDN节点，同时将用户的请求指向该节点。当用户的请求到达指定节点时，CDN的服务器（节点上的高速缓存）负责将用户请求的内容提供给用户。具体流程为: 用户在自己的浏览器中输入要访问的网站的域名，浏览器向本地DNS请求对该域名的解析，本地DNS将请求发到网站的主DNS，主DNS根据一系列的策略确定当时最适当的CDN节点，并将解析的结果（IP地址）发给用户，用户向给定的CDN节点请求相应网站的内容。

简单来讲就是用户发送请求后，到主服务器进行分析，找到最快或者说当地的服务器然后再把这个请求重定向到最快的ip地址请求资源。


### 5.多线程打包happypack/thread-loader/DllPlugin