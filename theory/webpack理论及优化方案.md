# webpack理论及优化方案

## 1. 什么是loader

本质上来说loader是node的一个模块，是文件加载器，能够加载资源文件，并对这些文件进行相应的处理。比如编译、压缩等
loader是支持链式调用，依次调用同一种文件支持多个loader自下而上执行

Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。

大部分loader的转换过程都遵循以下原则

此例babel-loader

1. 解析 把代码进行词法分析分割成token流（语法单元组成的数组），再分析这个token流生成AST语法树
2. 转换 把AST语法树根据规则转换新的AST语法树
3. 生成 最后以新的AST语法树为基础生成代码

常用loader

1. file-loader
2. url-loadersource-map-loader
3. svg-inline-loader
4. vue-svg-loader（用于把svg文件转化为vue组件）
5. babel-loader
6. css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
7. i18n-loader: 国际化
8. cache-loader: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

## 2. 什么是plugin

plugin其实就是插件，他用来做一些根据用户需求对代码或者打包进行优化或者处理的事情
Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

常用的plugin

1. html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)
2. define-plugin：定义环境变量 (Webpack4 之后指定 mode 会自动配置)
3. webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
4. ModuleConcatenationPlugin: 开启 Scope Hoisting（在打包过程中会产生很多闭包，导致垃圾收集机制效果不完美，使用这个可以把作用域规范）
5. speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
6. webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

## 3. webpack的compiler是什么

compiler是webpack的一个模块，是webpack的主要引擎，通过他可以创建一个compilation实例，
而且所有通过cli、webpack的api、webpack配置文件等传入的配置，都会作为参数来构建一个compilation实例。
可以通过webpack。compiler来访问他。
webpack通过实例化一个compiler对象，然后通过调用他的run方法来开始一次完整的编译过程

## 4. webpack的tapable是什么

webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，实现这一切的核心就是tapable.
webpack的核心负责编译的模块compiler和负责创建bundles的compilation都是tapable构造函数的实例

## 5. webpack 构建流程

分为三步 

1. 初始化：启动构建把cli webpack shell多方面的参数进行汇总，加载compiler，以参数来生成compiler实例
2. 编译：从entry触发，针对每个module串行调用对应的loader去翻译文件的内容，再找到该module依赖的module，进行递归编译处理
3. 输出：将编译后的module组合成chunk,将chunk转换成文件，输出到文件系统中

## 提高效率的webpack的插件

1. speed-measure-webpack-pkugin (SMP)

用来分析webpack打包过程中Loader和plugin的耗时，有助于找到构建过程中的性能瓶颈

2. webpack-bundle-analyzer （BZ）自带的插件，npm run build --report

分析打包之后每个文件以及每个模块对应的体积大小

3. HotModuleReplacementPlugin (HMR)

热更新加载模块，在修改文件后只替换响应模块，而不刷新整个页面

4. webpack-merge 
   
用来将不同环境下的配置和基础公共配置合并，其中涉及到了数组和对象的合并