# Vue 相关知识

## 1. 你知道vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解

vue 使用的是Mustache语法，即双大括号的语法，模板语法的特点就是识别特异字符串然后进行替换目标值。
优点是：

1. 后期改起来方便
2. 增加需求方便
3. 写法简单程序逻辑组织更好，调试方便
4. 看起来舒服

## 2. v-model 原理

v-model是@input的语法糖，是一个双向绑定的指令，能将页面表单控件的输入值同步更新到相关绑定的data属性，
也会在更新data绑定属性的时候，更新页面上输入控件的值

## 3. 在使用计算属性的时，函数名和data数据源中的数据可以同名吗？

不可以，因为初始化vm的过程，会先把data绑定到vm,再把computed的值绑定到vm，会把data覆盖了
“不能同名,因为不管计算属性还是data还是props都会挂在vm实例上,所以不能同名”

## 4. vue中data的属性可以和methods中的方法同名吗？为什么？

不行，Vue会把data里面的值和method里面的值全部挂载到组件的vue实力对象上，这也是为什么可以通过this可以全部访问到的原因，
所以命名要区分开

## 5. 怎么解决vue打包后静态资源图片失效的问题？

这个就是webpack对路径识别失败造成的，可以使用externals映射路径，来让webpack识别

## 6. 怎么解决vue动态设置img的src不生效的问题？

因为动态添加src被当做静态资源处理了，没有进行编译，所以要加上require。

## 7. 使用vue后怎么针对搜索引擎做SEO优化？

1. ssr 服务端渲染
2. nuxt.js(在 Nuxt.js 执行 generate 静态化打包时，动态路由会被忽略。需要动态路由先生成静态页面，你需要指定动态路由参数的值，并配置到 routes 数组中去。要将 v-if 改为 v-show 语法。)
3. vue-meta-info(动态生成META标签内容的插件)与prerender-spa-plugin（预渲染插件，基于puppeteer）
4. phantom.js(无头浏览器，原理就是通过Nginx配置， 判断访问的来源UA是否是爬虫访问，如果是则将搜索引擎的爬虫请求转发到一个node server，再通过PhantomJS来解析完整的HTML，返回给爬虫)

## 8. 跟keep-alive有关的生命周期是哪些？描述下这些生命周期

1.activated:页面第一次进入的时候，钩子触发的顺序是created->mounted->activated
2.deactivated:页面退出的时候会触发deactivated,当再次前进或者后退的时候只触发activated

简单的说:当keep-alive组件激活时，触发activated.
keep-alive组件停用时调用deactivated

## 9. 如何重置vue的data

Object.assign()、 this.$data

Object.assign(this.$data,this.$options.data())Object.assign（）方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象

this.$data获取当前状态下的data

this.$options.data()获取该组件初始状态下的data。

Object.assign(this.$data,this.$options.data())

## 10. vue渲染模板时怎么保留模板中的HTML注释呢

comments:true 再加上template标签comments属性

## 11. 你知道style加scoped属性的用途和原理吗？

通过给节点添加一个动态属性(data-v-sfsdfs)然后css选择器加上这个动态属性，来实现对CSS的模块化（通过PostCSS实现）

## 12. vue是如何处理边界情况？

边界情况是指一些发生在实际开发中的特殊问题，比如整个项目需要一个数据实现跨组件通信，但是引入vuex又太大了，所以这种情况就叫做边界情况。解决这个问题的办法就是vue.obervable()、eventbus、或者用$root中的数据让所有组件都能访问到、等组件通信方法

## 13. watch的属性和methods用箭头函数定义结果会怎么样？

组件内的this，vue都是经过了重写会指向组件的vue实例，如果使用箭头函数会绑定父级作用域的上下文导致this获取不到vue组件实例（this为undefined）

## 14. vue强制刷新组件方法

1. this.$forceUpdate
2. v-if
3. 修改组件绑定的key值

## 15. vue变量名如果以_、$开头的属性会发生什么问题？怎么访问到它们的值？

vue会代理data的属性，让this.$data.property => this.property，使用$或_,属性不会被vue代理，得通过this.$data._访问

## 16. v-for 是如何遍历对象的 

1. 先去判断是否有iterator接口，如果有就循环执行next()方法
2. 如果没有会使用Object.keys()方法


## 17. 如何使用\$attrs和$listeners

\$attr: 包含了父作用域中不被认为 (且不预期为) props 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 props 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind=”$attrs” 传入内部组件——在创建更高层次的组件时非常有用。

简单理解为除了props以外的所有属性

实现了爷孙组件之间的方便通信，减少了往常通过$emit,$on需要写具体事件名充当中转组件的代码。
需要根据数据流向每个组件写$attr 和 $listener 减少了事件绑定和代理。但是如果层级过多也会造成后期难维护

## 18. 说说你对vue的表单修饰符.lazy和.number的理解

默认v-model是绑定表单的input事件，涉及到data能实时得到输入值，而使用lazy会使input变为change事件，如果光标不移开输入框，关联的data值是不更新的，只有当光标移开输入框，对应的data才会同步input框中的值

.number并不是限制只能输入number,而是把输入的值通过parseFloat()转化为数值来展示

## 19. vue为什么要求组件模板只能有一个根元素

1. 一个入口可以增加转换为AST抽象语法的速度，减少遍历查找时间
2. 从组件化思维来说，如果存在多个根就已经可以拆分为多个组件来解藕了

## 20. EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？

建议在created里注册，在beforeDestory移出

在组件内的beforeRouteLeave中移除事件监听

eventbus本质是生成一个Vue实例充当事件总线，然后从这个总线上面去获取想要的
```javascript
  //部分组件注册
  let eb = new Vue()
  // 全局注册
  Vue.prototype.$EventBus = new Vue()

  // 发送消息
  eb.$emit(channel: string, callback(payload1,…))

  // 监听接收消息
  eb.$on(channel: string, callback(payload1,…))

  // 注销事件
  eb.$off('name')
```

## 21. vue的is这个特性你有用过吗？主要用在哪些方面？

vue中is的属性引入是为了解决dom结构中对放入html的元素有限制（不支持）的问题 
比如ul 下面 不允许出现li以外的dom标签，table里面不允许出现tr以外的标签

<ul> <li :is='A'></li></ul>

使用A组件替换li

<ul><li is="div"></li>

还可以实现根据组件名称进行动态组件替换
<component :is="comName"></component>


## 22. 组件中写name选项有什么作用？

1. keep-alive组件识别
2. 递归组件 （子组件一定要有name属性!，递归调用自身是通过name属性，当作组件标签名字调用的，如果没有这个属性，无法调用自身。而且最好将name属性首字母大写。）就不用写component了
3. 使用vue-tool时能更快识别

## 23. 说说你对slot的理解有多少？slot使用场景有哪些？

```html

  <A>
    <Test>
      经济拮据 + {{name}}
    </Test>
  </A>

  test.vue

  <template>
    <slot></slot>
  </template>
```

vue在解析A组件的时候，遇到了不能识别的html标签，会先把它识别为组件节点，会保留（通过使用with方法绑定作用域）此时的执行作用域，可以取到name值，并且保留组件内写的节点内容
在解析组件的时候通过renderSolt方法把父组件保留的组件内子节点的内容替换到slot标签位置，可以根据默认的slot key是default

## 24. 动态组件用法

```html
  <component :is="comName"></component>
  <TabberCon @handleToggle="togglePage"/>
```
根据动态修改comName（组件名称），然后根据is特性，动态渲染不同的组件

## 25. 说说你对vue组件的设计原则的理解

1. 组件一定得是最小功能单元的集成，所以能拆则拆，减小功能耦合和增大组件复用
2. 组件内部的参数一定要有默认值处理，极端场景的容错处理（穿参类型错误）
3. 组件名称命名通俗易懂，props\emit亦是如此.绑定事件名称和类型统一
4. 设计组件必须考虑可扩展性