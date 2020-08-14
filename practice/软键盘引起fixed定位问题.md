# 软键盘将页面顶起来、收起未回落问题

## 表现

Android 手机中，点击 input 框时，键盘弹出，将页面顶起来，导致页面样式错乱。

移开焦点时，键盘收起，键盘区域空白，未回落。

## 产生原因

我们在app 布局中会有个固定的底部。安卓一些版本中，输入弹窗出来，会将解压 absolute 和 fixed 定位的元素。导致可视区域变小，布局错乱。

## 原理与解决方案

软键盘将页面顶起来的解决方案，主要是通过监听页面高度变化，强制恢复成弹出前的高度。

```javascript
// 记录原有的视口高度
const originalHeight = document.body.clientHeight || document.documentElement.clientHeight;

window.onresize = function(){
  var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
  if(resizeHeight < originalHeight ){
    // 恢复内容区域高度
    // const container = document.getElementById("container")
    // 例如 container.style.height = originalHeight;
  }
}
```

## 键盘不能回落问题出现在 iOS 12+ 和 wechat 6.7.4+ 中，而在微信 H5 开发中是比较常见的 Bug。

兼容原理，1.判断版本类型 2.更改滚动的可视区域

```javascript
const isWechat = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
if (!isWechat) return;
const wechatVersion = wechatInfo[1];
const version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
 ```

如果设备类型为iOS 12+ 和wechat 6.7.4+，恢复成原来的视口

```javascript
if (+wechatVersion.replace(/\./g, '') >= 674 && +version[1] >= 12) {
  window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
}
window.scrollTo(x-coord, y-coord)，其中window.scrollTo(0, clientHeight)恢复成原来的视口
```
