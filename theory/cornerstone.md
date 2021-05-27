# Cornerstone.js

## cornerstone.js 是什么？

### 1.简介

JS编写的医疗**DICOM影像**浏览工具，用来支持医学影像的显示与交互。他的作用和他的名字一样基石，很多医疗的影像阅片系统都是基于cornerstone.js开发的，如OHIF Viewer、Lesion Tracker等，目前国内医疗大部分结合AI的阅片系统也是基于cornerstone.js来进行开发的。

### 2.商用授权

Cornerstone和OHIF Viewer都采用MIT开源协议。MIT是最宽松和自由的一种版权许可协议。使用者只需要在软件和软件的所有副本中包含原创版权声明，就可以使用、复制、修改、合并、出版发行、散布、再授权及贩售软件及软件的副本。

简单来说，只需要保留原作者的版权声明，就可以将源代码用于商用，并且不需要公开自己二次开发的源代码。

ps: DICOM（Digital Imaging and Communications in Medicine）即医学数字成像和通信，是医学图像和相关信息的国际标准（ISO 12052）。它定义了质量能满足临床需要的可用于数据交换的医学图像格式

## cornerstone.js优点特性

1. 标准兼容——支持DICOM影像解析，来实现图像网页显示；支持DICOMweb中的WADO-URI和WADO-RS接口，来实现图像网页获取。
2. 高性能——采用网页端多线程解码，来加速图像显示。这一点对于互联网应用采用JPEG等压缩方式来传输图像非常有帮助。
3. 可扩展——采用模块化（组件）设计，能够嵌入不同前端架构。例如目前最流行的React、vue框架。

## cornerstone.js实例

```javascript
  const element = document.getElementById('demo-element');
  const imageId = 'https://example.url.com/image.dcm';
  cornerstone.enable(element);
  cornerstone.loadAndCacheImage(imageId).then(function(image) {
  cornerstone.displayImage(element, image);
  *// Enable our tools*
  cornerstoneTools.mouseInput.enable(element);
  cornerstoneTools.mouseWheelInput.enable(element);
  cornerstoneTools.wwwc.activate(element, 1); *// Left Click*
  cornerstoneTools.pan.activate(element, 2); *// Middle Click*
  cornerstoneTools.zoom.activate(element, 4); *// Right Click*
  cornerstoneTools.zoomWheel.activate(element); *// Mouse Wheel*
```

通过上面的代码，我们可以实现在网页上展示一张dicom医学影像，并且支持缩放，平移等基础的影像交互操作。当然cornerstoneTools这个工具需要单独引入，他是cornerstone.js的一个加强，提供了更多的影像交互操作工具。

官方示例（需梯子）：[cornerstone.js示例](https://rawgit.com/cornerstonejs/cornerstone/master/example/index.html)

一些基于cornerstone.js实现的阅片系统落地视频: [lesionTracker](http://ohif.org/wp-content/uploads/2017/11/LesionTracker-cropped.mp4)

## cornerstone.js学习

目前官方文档都是全英文，但是本人比较建议从cornerstone.js github中的wiki入手先了解基本概念和api。

[cornerstone-wiki](https://github.com/cornerstonejs/cornerstone/wiki)

首先了解一下cornerstone的几大基本概念

1. Enabled element -----激活元素
2. ImageIds -----图片id
3. ImageLoaders ----图片加载器
4. Image Object ----图片对象
5. Viewport ----视图
6. Pixel Coordinate System ----图像坐标系
7. Architecture ----架构
8. Rendering loop ----主渲染循环

下面我们一个个理解

### Enabled Element（激活元素）

激活的元素是一个HTML DOM node,一般来说是一个div标签。然后如果想要展示一张dicom影像图片，需要做下面几件事情：

1. 通过script标签引入cornerstone.js文件
2. 为一个或多个图片加载器写JS代码，让cornerstone可以在网页上展示图片的实际像素
3. 把一个用于展示图片的element添加到页面中，用css定义宽高位置等样式
4. 调用enable()api，让element可以渲染图片
5. 使用loadImage()api加载图片，使用displayImage()api渲染图片

如果想让展示的图片能够实现一些基础的交互，你需要做到如下几步：

1. 指定viewport的窗口宽度和高度、放大缩小、平移等参数。vIE我port的参数可以在调用displayImage()的时候设定，也可以后面通过调用setViewport()设置
2. 监听CornerstoneImageRendered event，可以在渲染的影像上画画
3. 监听CornerstoneViewportUpdated event，可以感知图像视口属性的变化
4. 实现一个自定义ImageLoader，它可以检索存储在非标准容器或非标准协议中的图像
5. 当DOM的大小变化的时候，可以通过调用resize() api通知cornerstone

### ImageIds （图片id标识）

cornerstone的imageid是定义了一张展示图片的url,它imageLoader插件决定加载哪一张图片的唯一标识。这种策略可以让cornerstone同时展示多个通过不同服务器以不同协议得到的图片。比如：cornerstone可以将通过WADO获得的DICOM CT图像与由数码相机捕获并存储在文件系统中的JPEG皮肤病学图像一起显示。

cornerstone没有指定URL的内容是什么-它是由ImageLoader来定义URL的内容所以也方便定位。可以编写一个专有的ImageLoader插件来与专有服务器对话，并使用GUID、文件名或数据库行id来查找图像。

一些不同imagesid路径

WADO

```url
  http://www.medical-webservice.st/RetrieveDocument?
  requestType=WADO&studyUID=1.2.250.1.59.40211.12345678.678910
  &seriesUID=1.2.250.1.59.40211.789001276.14556172.67789
  &objectUID=1.2.250.1.59.40211.2678810.87991027.899772.2
  &contentType=application%2Fdicom&transferSyntax=1.2.840.10008.1.2.4.50
  DICOM CGET

```

A 'dicomcget' image loader could work with a server to issue a DICOM CGET command to retrieve the image and then return it to cornerstone:

```url
  dicomcget://www.medical-webservice.st/RetrieveDocument?
  requestType=WADO&studyUID=1.2.250.1.59.40211.12345678.678910
  &seriesUID=1.2.250.1.59.40211.789001276.14556172.67789
  &objectUID=1.2.250.1.59.40211.2678810.87991027.899772.2
  &contentType=application%2Fdicom&transferSyntax=1.2.840.10008.1.2.4.50
```

### ImageLoader （图片加载器）