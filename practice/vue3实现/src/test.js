import {effect, track, trigger} from './effect.js'
import {reactive, ref} from './reactive.js'
import {computed} from './computed.js'
import {watch} from './watch.js'

const app = document.querySelector('#app')

function main() {
  const state = reactive({name: 'syys', greet: 'hello', num: 0})
  const numComp = computed({
    get() {
      return state.num
    },
    set(val) {
      state.num = val
    }
  })
  const numAddOneComp = computed(() => {
    return numComp.value + 1
  })
  effect(() => {
    app.innerHTML = state.greet + ',' + state.name + ',' + numComp.value
  })
  effect(() => {
    console.log('computed effect', numComp.value)
  })
  effect(() => {
    console.log('effect', state.name)
  })
  
  toGlobal({
    setName: name => state.name = name,
    addNum: () => ++state.num,
    numComp,
    numAddOneComp
  })
  renderHtml()
  manual()

}
main()

// 手动调用响应式
function manual() {
  const state = {
    count: 0,
  }
  effect(() => {
    console.log('manual:', state.count)
    track(state, 'count')
  })

  function addCount() {
    state.count++
    trigger(state, 'count')
  }
  toGlobal({
    addCount,
  })
}

// effectTest()

function effectTest() {
  let dummy
  const counter = reactive({ num1: 0, num2: 0 })
  const runner = () => {
    return dummy = counter.num1 + counter.num1 + counter.num2
  }
  effect(runner)
  counter.num2 = 7
  counter.num1 = counter.num2
  console.log('dummy-->', dummy)
}

function renderHtml() {
  const num = ref(0)
  const btnIncrease = document.querySelector('#btnIncrease')
  const textNum = document.querySelector('#textNum')
  const btnClear = document.querySelector('#btnClear')
  const male = reactive({
    name: 'smy',
    age: 26
  })
  const female = reactive({
    name: 'mnn',
    age: 26
  })
  const isMale = ref(true)
  effect(() => {
    textNum.innerHTML = num.value
  })
  btnIncrease.onclick = () => {
    num.value++
    num.value++
    num.value++
  }
  const numAddOne = computed(() => {
    return num.value + 1
  })
  const role = computed(() => {
    return isMale.value ? male : female
  })

  watch(() => numAddOne.value, (val, oldVal) => {
    console.log('numAddOne:', val, oldVal)
  })
  watch(male, (val) => {
    console.log('male change:', val)
  })
  watch(role, val => {
    console.log('role change:', val)
  }, {deep: true})
  // let unwatchnum = watch(() => {
  //   return num.value
  // }, (val, oldval) => {
  //   console.log(val, oldval)
  //   textnum.innerhtml = val
  // }, {
  //   immediate: true
  // })
  // btnclear.onclick = () => {
  //   unwatchnum()
  // }

  toGlobal({
    num, 
    numAddOne,
    role,
    female,
    male,
    isMale,
  })
  
}

function toGlobal(obj) {
  Object.keys(obj).forEach(key => {
    window[key] = obj[key]
  })
}