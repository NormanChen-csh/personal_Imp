const targetMap = new WeakMap()
let activeEffect
let effectStack = []

/*
  data = reactive({name})
  // nameEffect
  effect(() => console.log(data.name))
  // 会把 nameEffect收集为data.name的依赖 
*/
let id = 0

export function effect(fn, options = {lazy: false}) {
  const _effect = (...args) => {
    // 防止循环
    // effect函数中更改了依赖的值 如 state.num++
    if (!effectStack.includes(_effect)) {
      cleanup(_effect)
      try {
        effectStack.push(_effect)
        activeEffect = _effect
        return fn(...args)
      } finally{
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  _effect.id = id++
  _effect.options = options
  _effect.deps = []
  if (!options.lazy) {
    _effect()
  }
  return _effect
}

/**
 * 收集当前的activeEffect
 * @param {Object} target
 * @param {String} key
 */
export function track(target, key) {
  if (!activeEffect) return
  let depMap = targetMap.get(target)
  if (!depMap) {
    targetMap.set(target, depMap = new Map())
  }
  let deps = depMap.get(key)
  if (!deps) {
    depMap.set(key, deps = new Set())
  }
  // 没有收集过依赖
  if (!deps.has(activeEffect)) {
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
  }
}

export function trigger(target, key) {
  let depMap = targetMap.get(target)
  if (!depMap) return
  let deps = depMap.get(key)
  if (!deps) return  
  const effects = new Set()
  let runner = (effect) => {
    //  与effect中一样防止循环
    // effect函数中更改了依赖的值 如 state.num++

    if (effect === activeEffect) return
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    }
    else {
      effect()
    }
  }
  deps.forEach(effect => effects.add(effect))
  // 注意这里不能直接用deps
  // 因为每一次track 之前都会cleanup effect的deps
  // 所以导致track的时候会更新deps
  // 导致循环不能结束
  effects.forEach(runner)
}

export function cleanup(effect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}
