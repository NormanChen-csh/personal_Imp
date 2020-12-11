# Map 对象

Map对象保存你键值对，并且能够记住键的原始顺序。任何值（对象或者原始值）都可以作为一个键或者一个值。

**Objects和Maps类似的是，他们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。但是Maps和Objects还是有一些重要的区别的**

## Map和Object的区别

—|Map|Object
---|:---:|---
意外的键|Map默认情况不包含任何键。只包括显式插入的键。|一个Object有一个原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。
键的类型|一个Map的键可以是任意值，包括函数、对象或任意基本类型。|一个Object的键必须是一个String或是Symbol。
键的顺序|Map中的key是有序的。因此当迭代的时候，一个map对象以插入的顺序返回键值|一个OBJECT的键是无序的。
Size|Map的键值对个数可以轻易的通过size属性获取|Object的键值对个数只能手动计算
迭代|Map是iterable的，所以可以直接被迭代|迭代一个object需要以某种方式获取他的键然后才能迭代
性能|在频繁增删键值对的场景下表现更好|在频繁增删键值对的场景下未做优化

__________

### 相关属性api

### 属性

#### Map.prototype.constructor

返回一个函数，它创建了实例的原型。默认是Map函数

#### Map.prototype.size

返回Map对象的键/值对的数量

### 方法

#### Map.prototype.clear()

删除所有元素

#### Map.prototype.delete(key) 

如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。随后调用 Map.prototype.has(key) 将返回 false 。

#### Map.prototype.entries()

按插入顺序，为 Map对象里的每一键值对调用一次callbackFn函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。


#### Map.prototype.forEach(callbackFn[, thisArg])

按插入顺序，为 Map对象里的每一键值对调用一次callbackFn函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。

#### Map.prototype.get(key)

返回键对应的值，如果不存在，则返回undefined。

#### Map.prototype.has(key)

返回一个布尔值，表示Map实例是否包含键对应的值。

#### Map.prototype.keys()
返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。


#### Map.prototype.set(key, value)

设置Map对象中键的值。返回该Map对象。

#### Map.prototype.values()

返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 。

#### Map.prototype[@@iterator]()

返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。


## map各种方法返回的迭代器对象，都可以通过for...of来进行遍历取值