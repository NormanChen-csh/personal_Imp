发现问题

最好是能用说碰见了什么问题


碰到了一个什么问题（主动发现），怎么解决的，进行延伸，提升了什么效果

1.活动页全都以html文件形式放在public文件夹中

把所有活动页改为组件形式，然后分配activity路由，并入主项目


2.马甲包配置繁多，webpack文件凌乱 merge

将马甲包的配置以json的形式写出来，马甲包为键名，键值为各项配置，比如entry,plugin,htmlTemplate,option这些，然后使用merge插件和基本配置进行合并

3.使用analyser插件价发现很多包很大，使用率很低

npm run build --report 可以得到report.html关于各个模块所依赖文件的大小，从中分析哪些包很大，echart很大 使用率很低，所以使用svg来实现

4.UI样式不够统一，图片使用凌乱 vue-svg-loader

很多图片由于是非闭合图形，导致不能使用iconfont进行颜色替换，所以马甲包更换的时候涉及到了大量图片的更换，其实可能就是改个颜色也得换一张图片，给开发增加了没必要的活，所以我就统一把用一些单色图片使用svg的格式，然后用vue-svg-loader这个东西转为vue模板，给关键的路径加上类名 通过不同的样式文件类名不同来改变不同的颜色

5.打包，启动非常慢

首先是吧公共方法进行抽离，统一写到公共文件里面，然后通过export导出，这样有利于webpack 进行tree-shaking,
然后引入DLLreferenceplugin 把一些依赖包先打包好，生成一个vendor文件 加快启动速度

6.html模板入口太多了

全都改成了pug形式，里面的值用变量来替换


7.首屏加载慢

组件异步引入，使用dll，打包出不经常改动的JS 文件，然后让后端配合在http请求中把cache-control(响应头，请求头都有)这个值设为public,private,max-age，下次就可以根据判断来走强缓存返回200。一些不定期更新的在后端设置响应头etag(唯一标识) last-modify（修改时间），下次浏览器会在请求头添加if-none-match和if-modify-since来判断资源是否需要更新 ，如果不更新就走协商缓存返回304.

把同步组件都改为异步组件，把一些需要引入的大插件转为cdn引入，在webpack的external里面配置全局变量

图片压缩

8.公共组件偏少，抽像出相似的功能模块复用


10.简单动画重写，复杂动画优化

复杂动画使用transform: translate3d打开gpu加速进行优化
使用requestanimationframe来作为变化的频率


11.用hash路由配置运营的渠道包设定方案/#/233

12. lighthouse和 performance工具应用

13. 全局埋点 会使用mixin混入


印尼贷超KP

1.印尼语对开发和测试不友好，使用i18n，维护几种不同语言的JSon文件来达到不同语言包的目的

2.境外服务器不稳定，设备比较复杂，所以增加了一个错误埋点

Vue.config.errorHandler = function (err, vm, info) {
  #处理错误信息, 进行错误上报
  #err错误对象
  #vm Vue实例
  #`info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}