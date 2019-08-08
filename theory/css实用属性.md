# CSS实用属性

1. 镜像展示（会出现两个图片）

```css
  -webkit-box-reflect: right;
```

2. 镜像展示（将原来图片沿着Y轴翻转）

```css
  transform: scale(-1,1);
  transform: rotateY(180deg);
```

3. 开启硬件加速

CSS animations, transforms 以及 transitions 不会自动开启GPU加速，而是由浏览器的缓慢的软件渲染引擎来执行。那我们怎样才可以切换到GPU模式呢，很多浏览器提供了某些触发的CSS规则。

现在，像Chrome, FireFox, Safari, IE9+和最新版本的Opera都支持硬件加速，当它们检测到页面中某个DOM元素应用了某些CSS规则时就会开启，最显著的特征的元素的3D变换。

```css
  .cube {
    -webkit-transform: translate3d(250px,250px,250px)
    rotate3d(250px,250px,250px,-120deg)
    scale3d(0.5, 0.5, 0.5);
  }

  .cube {
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    /* Other transform properties here */
  }

  // 存在3D页面闪烁解决方案
  .cube {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
  
    -webkit-perspective: 1000;
    -moz-perspective: 1000;
    -ms-perspective: 1000;
    perspective: 1000;
    /* Other transform properties here */
  }

  //在webkit内核的浏览器中，另一个行之有效的方法是

  .cube {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    /* Other transform properties here */
  }

```