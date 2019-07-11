# Babel 的使用和理解

## 什么是babel?

官方解释：Babel 是一个JavaScript的编译器

Babel是一个工具链，**主要用于将ECMAScript 2015+ 版本的代码转换为向后兼容的JavaScript语法**，以便能运用在当前和旧版的浏览器活其他环境中。

所以babel是什么，根本上就是一个将新语法转换为旧语法使之能够兼容各种浏览器的工具。

## babel 使用

现在用的比较多的是将babel整合进webpack一起使用，使用的是babel-loader。

下面两个命令是安装babel的整合工具依赖

```bash
  npm install --save-dev babel-loader @babel/core

  npm install @babel/preset-env --save-dev
```

安装完成后还需要在根目录新建一个.babelrc文件。

## 什么是.bablerc,用来干什么

在Babel执行编译的过程中，会从项目的根目录下的 .babelrc文件中读取配置。.babelrc是一个json格式的文件。
在.babelrc配置文件中，主要是对预设(presets) 和 插件(plugins) 进行配置。

下面是一个.babelrc的一些配置

```json
{
  "plugins": [
     [
      "transform-runtime",
      {
        "polyfill": false
      }
     ]
   ],
   "presets": [
     [
       "env",
       {
         "modules": false
       }
     ],
     "stage-2",
     "react"
  ]
}
```

该属性是告诉babel要使用那些插件，这些插件可以控制如何转换代码。

既然涉及到插件，又有一个隐藏问题了

### babel工具有哪些插件？

常用的babel插件有：babel-polyfill 和 babel-runtime 及 babel-plugin-transform-runtime。

为什么要用到这些插件，因为babel默认只转换新的js语法，并不会转换新的API，比如Promise、Set、Iterator...等等这些es6新的api及全局对象，一些在全局对象上的方法如Object.assign都不会转码。

比如ES6的Array.from方法Babel就不会转码，需要用到babel-polyfill这个插件。

babel-polyfill 它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。

babel-runtime 它是将es6编译成es5去执行。我们使用es6的语法来编写，最终会通过babel-runtime编译成es5.也就是说，不管浏览器是否支持ES6，只要是ES6的语法，它都会进行转码成ES5.所以就有很多冗余的代码。

### 那么问题来了，在我们正常写代码的时候不可能说不用到全局API或者ES6语法，有没有一个东西把这两个东西整合到一起呢？

#### babel-plugin-transform-runtime

相信你们在很多bablerc文件中都看过这个transform-runtime.他把公用需要转码的方法做了抽离只需要存一份。

他有几个配置项

```json
   {
      'helpers': false,
      'polyfill': false,
      'regenerator': true,
      'moduleName': 'babel-runtime'
    }
```

helpers: 默认值为true，表示是否开启内联的babel helpers(即babel或者环境本来存在的某些对象方法函数)如：extends，etc这样的
在调用模块名字时将被替换名字。

polyfill：默认值为true，表示是否把内置的东西(Promise, Set, Map)等转换成非全局污染的。

regenerator：默认值为true，是否开启generator函数转换成使用regenerator runtime来避免污染全局域。

moduleName：默认值为 babel-runtime，当调用辅助 设置模块（module）名字/路径.

### 还有个常用的babel插件babel-presets

presets属性告诉Babel要转换的源码使用了哪些新的语法特性，**presets是一组Plugins的集合**。

babel-preset-es2015: 可以将es6的代码编译成es5. 改变后面的版本号依次类推，会转码成上一个版本。

babel-preset-latest 支持现有所有ECMAScript版本新特性.


使用方法 .bablerc：

```json
  bash: npm install babel-preset-env --save-dev

  {
    "presets": [
      "es2015"
    ]
  }
```

## 其他方式使用babel 转码

```bash
  全局安装只需：

   $ npm install --global babel-cli

  这时候我们可以使用 Babel 命令编译文件：

    $ babel index.js --out-file compiled.js
    #或
    $ babel index.js -o compiled.js

  编译目录：

    $ babel src -out-dir lib
    #或
    babel src -d lib

```

但是总的来说不推荐这么用，因为毕竟是全局的babel转码，容易导致一些babel依赖插件缺失，导致转码达不到期望效果。
