const fs = require('fs')
const Future = require('fluture')

const {
  split,
  head,
  concat,
} = require('../utils')

const {
  mockDbInterface,
} = require('../mock')

const readFile = filename => Future((reject, result) => {
  fs.readFile(filename, 'utf8', (err, data) => err ? reject(err) : result(data))
})

const fetch = query => Future((reject, result) => {
  mockDbInterface(query).then(result, reject)
})

readFile(__dirname + '/test.txt')
  .map(split('\n'))
  .map(head)
  .fork(console.log, console.log)

fetch(1).map(concat('Hey '))
  .fork(console.log, console.log)
