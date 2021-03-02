import {track, trigger, effect} from './effect.js'

function  isFunction(fn) {
  return typeof fn === 'function'
}

export const computed = function(fn) {
  let dirty = true
  let getter = isFunction(fn) ? fn : fn.get
  let setter = fn.set
  let value
  let runner = effect(getter, {
    lazy: true,
    scheduler: () => {
      dirty = true
      trigger(_computed, 'value')
    }
  })
  const _computed = {
    __is_ref: true,
    effect: runner,
    get value() {
      if (dirty) {
        value = runner()
        dirty = false
      }
      track(_computed, 'value')
      return value
    },
    set value(val) {
      if (!setter) {
        throw 'computed has no setter'
      }
      setter(val)
    }
  }

  return _computed
}
