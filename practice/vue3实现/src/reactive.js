import { track, trigger } from './effect.js' 

export const reactive = (target) => {
  const proxy = new Proxy(target, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
      return true
    }
  })
  proxy.__is_reactive = true
  return proxy
}

export const ref = (raw) => {
  let value = raw
  const _ref = {
    __is_ref: true,
    get value() {
      track(_ref, 'value')
      return value
    },
    set value(val) {
      if (value === val) {
        return
      }
      value = val
      trigger(_ref, 'value')
    }
  }
  return _ref
}

export const isReactive = (target) => {
  return !!target.__is_reactive
}

export const isRef = (target) => {
  return !!target.__is_ref
} 