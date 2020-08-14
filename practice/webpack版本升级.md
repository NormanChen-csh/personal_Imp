# webpack版本升级


## 使用reflect及?.（可选操作符）等高版本api导致loader缺失报错

![webpackupgrade](./img/webpackupgrade.png)

这种类型的问题主要是babel版本过低对于某个api的适配达不到要求，需要引入相关的插件来进行弥补。这次使用了 **@babel/plugin-proposal-optional-chaining** 这个插件。
