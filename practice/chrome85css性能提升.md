# content-visibility: auto;

css contain 一共有四个属性：

size: 在计算该元素盒子大小的时候会忽略其子元素
layout: 元素的内部布局不受外部影响，同时该元素以及其内容也不会影响到上级
style: 声明同时会影响这个元素和其子孙元素的属性，都在这个元素的包含范围内
paint: 声明这个元素的子孙节点不会在它边缘外显示。如果一个元素在视窗外或因其他原因导致不可见，则同样保证它的子孙节点不会被显示。

如果我们给可视区域外的元素增加了  content-visibility: auto  属性，那么当滚动条滚动到这个元素之后，如果这个元素很大有一定高度，那么滚动条的长度就会发生变化，页面可能就会发生抖动的现象。
解决这个问题，可以先使用 contains-intrinsic-size 提前给元素设置自然高度的大小，比如 1000px ，这样元素提前占用了一些高度，就不会发生抖动现象。