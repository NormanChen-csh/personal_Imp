const postJopQueue = []

function nextTick(cb) {
  return Promise.resolve().then(() => {
    cb && cb()
  })
}

export function postJob(job) {
  postJopQueue.push(job)
  nextTick(() => {
    // 去重
    new Set(postJopQueue).forEach(job => {
      job()
    })
    postJopQueue.length = 0
  })
}
