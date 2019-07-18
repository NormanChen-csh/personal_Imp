# 实现一个单向链表的基本功能 增删改查

```javascript
 // 链表实现
function Node(element) {
  this.element = element
  this.next = null
}

function ListTable() {
  this.head = new Node('head')
  this.insertNode = insertNode
  this.find = find
  this.showList = showList
  this.deleteNode = deleteNode
  this.findPreNode = findPreNode
}

// 找到一个节点位置
function find(item) {
  console.log(this.head)
  var currentNode = this.head
  while(currentNode.element != item) {
    currentNode = currentNode.next
  }
  return currentNode
}

// 插入节点
function insertNode(newNode, item) {
  var currentNode = this.find(item)
  var newNode = new Node(newNode)

  newNode.next = currentNode.next // 向后插入 把需要插入节点的next 挂载到新节点的next
  currentNode.next = newNode
}

//展示链表
function showList() {
  var currentNode = this.head

  while (currentNode.next != null) {
    currentNode = currentNode.next
    console.log(currentNode.element)
  }
}

// 找到目标节点前一个节点
function findPreNode(item) {
  var currentNode = this.head
  var deleteNode = this.find(item)
  while (currentNode.next.element != deleteNode.element) {
    currentNode = currentNode.next
  }
  return currentNode
}

// 删除对应节点
function deleteNode(item) {
  let preNode = this.findPreNode(item)
  console.log(preNode)

  preNode.next = preNode.next.next
}


let mylist = new ListTable()

mylist.insertNode('this', 'head')
mylist.insertNode('is', 'this')
mylist.insertNode('my', 'is')
mylist.insertNode('first', 'my')
mylist.insertNode('listTable', 'first')

mylist.deleteNode('first')

mylist.showList()
```

# 实现一个双向链表

双向链表和单向链表的区别就是每个节点出了拥有一个next指向下一个元素之外还有一个prev元素指向前一个元素，单链表的删除需要查询待删除元素的前一个元素，而双向链表不需要查询前一个元素，直接通过current.prev得到前一个元素

```javascript
class Node {
  constructor(item) {
    this.element = item
    this.next = null
    this.prev = null
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = new Node('head');
  }

  searchNode(item) {
    let currentNode = this.head
    // debugger
    while(currentNode.element != item) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  
  insert(newNode, positionNode) {
    let currentNode = this.searchNode(positionNode);
    let newObj = new Node(newNode)

    newObj.next = currentNode.next
    newObj.prev = currentNode
    currentNode.next = newObj
  }

  deleteNode(item) {
    let currentNode = this.searchNode(item)
    
    if (currentNode.next != null) {
      currentNode.prev.next = currentNode.next
      currentNode.next.prev = currentNode.prev
    } else {
      currentNode.prev.next = null
    }
    currentNode.next = null
    currentNode.prev = null
  }
  //展示链表
  showList() {
    var currentNode = this.head

    while (currentNode.next != null) {
      currentNode = currentNode.next
      console.log(currentNode.element)
    }
  }
  
}

let doubleLinkedList = new DoubleLinkedList()
doubleLinkedList.insert("it's", 'head')
doubleLinkedList.insert("a", "it's")
doubleLinkedList.insert("doubleLinkedList hhh", "a")
doubleLinkedList.insert("haha!", "doubleLinkedList hhh")
doubleLinkedList.deleteNode('haha!')
doubleLinkedList.showList()

console.log(doubleLinkedList)
```