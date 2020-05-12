# Vue基础知识

## 1. Vue的通信机制有 props/emit、event Bus、vuex、provide/inject、$attrs/$listeners 五种

## 2. vue开始加载出现message字样，闪屏问题？在css里加上 [v-cloak] { display: none; } 。如果没有彻底解决问题，则在根元素加上 style="display: none;" :style="{display:  block }"

## 3. \$route和\$router的区别$router 是VueRouter的实例，在script标签中想要导航到不同的URL,使用 \$router.push 方法。返回上一个历史history用 \$router.to(-1)，\$route 为当前router跳转对象。里面可以获取当前路由的name,path,query,parmas等。


## 4. Vue2.x的默认diff算法是把所有的虚拟节点都过一遍，比对props,但是到了Vue3.x，diff算法改进，只比对追踪createVNode中有动态参数的节点，（会携带一个patch flag）意味着静态节点不比对了.更高优化，静态节点会在应用启动的时候脱离编译定义一次，然后后面再渲染的时候反复复用

## 5. vue3.x使用了tree-shaking(打包工具根据import来实现剔除无用模块)，在不使用v-model transition等等这些内置功能的时候 是不会被build进包里

```JavaScript
  <div></div>

  //编译后
    import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

    export function render(_ctx, _cache) {
      return (_openBlock(), _createBlock("div"))
    }
```

## 6. vue 3.x组件中不需要再用一个div包裹内容 哪怕是纯文字都能够渲染了
