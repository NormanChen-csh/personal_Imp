/* 
  watch(() => {
    return state.name
  }, (val, oldVal) => {
    console.log(val, oldVal)
  })
*/
import {effect, cleanup} from './effect.js'
import {isReactive, isRef} from './reactive.js'
import {postJob} from './job.js'

const WATCH_INITAL_VAL = {}

export const watch = (fn, cb, {immediate, deep, flush} = {immediate: false, deep: false, flush: 'post'})=> {
  let oldVal = WATCH_INITAL_VAL
  // set getter
  let getter
  if (isReactive(fn)) {
    deep = true
    getter = () => fn
  }
  else if (isRef(fn)) {
    getter = () => fn.value
  }
  else {
    getter = fn
  }
  if (deep) {
    let baseGetter = getter
    getter = () => recursive(baseGetter())
  }
  let applyCb = () => {
    let val = runner()
    oldVal = oldVal === WATCH_INITAL_VAL ? undefined : oldVal
    cb(val, oldVal)
    oldVal = val
  }
  let scheduler
  if (flush === 'sync') {
    scheduler = applyCb
  }
  else if (flush === 'post') {
    scheduler = () => postJob(applyCb)
  }
  let runner = effect(getter, {
    lazy: true,
    scheduler
  })
  // ignore options
  // ...
  if (immediate) {
    applyCb()
  }
  else {
    runner()
  }
  // todo stop watch
  return () => {
    cleanup(runner)
  }
}

// 其实值不是很重要， 就是遍历一首所有的reactive的属性进行依赖收集
function recursive(obj, visited = new Set()) {
  if (_.isArray(obj) || obj instanceof Map || obj instanceof Set) {
    obj.forEach(item => {
      recursive(item, visited)
    })
  }
  else if (_.isObject(obj)) {
    Object.values(obj).forEach(val => {
      recursive(val, visited)
    })
  }
  else {
    visited.add(obj)
  }
  return visited
}
