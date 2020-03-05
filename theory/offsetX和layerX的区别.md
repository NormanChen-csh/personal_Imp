# OffsetX和layerX的区别

主角offsetX、layerX

这两个属性来自不同的浏览器标准

## IE：offsetX、offsetY

## FF（FireFox）：layerX、layerY

## 区别

### offserX是目标点相对于DOM元素边框以内的内容偏移距离，如果边框很大，目标点在边框上会出现负值

### layerX和offset一样，但是计算规则稍有差异

```Markdown
  1. layerX计算偏移量包括了边框宽度，如果存在宽边框，同级不存在定位条件下layerX-offsetX = border-width
  2. 偏移距离受CSS定位属性影响，如果目标元素或者父级添加了绝对定位或者相对定位，偏移计算会由原来的body改为，最近的添加了定位属性的父级元素
```

### 以上是在IE标准和FF标准下两个偏移属性的不同，但是在谷歌浏览器和safari浏览器这两个属性都支持！
