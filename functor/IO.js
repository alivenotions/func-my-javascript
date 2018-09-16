const {
  compose,
  inspect,
  map,
  split,
  last,
  eq,
  head,
  filter,
} = require('../utils')

const {
  mockDb,
  mockDbInterface,
  mockWindow,
} = require('../mock')

const { Maybe } = require('./maybe')

class IO {
  static of(x) {
    return new IO(() => x)
  }

  constructor(fn) {
    this.performIO = fn
  }

  map(fn) {
    return new IO(compose(fn, this.performIO))
  }

  inspect() {
    return `IO(${inspect(this.performIO)})`
  }
}

const ioDb = IO.of(mockDb)

// console.log(ioDb.map(db => db.name))

ioDb.map(db => db.config)
    .map(config => config.host[0])
    .map(console.log)
    // .performIO()

ioDb.map(db => db.getValue(1))

const fetch = query => IO.of(mockDbInterface(query))

// fetch(3).performIO().then(console.log)

// url :: IO String
const url = IO.of(mockWindow.location.href)

// toPairs :: String -> [[String]]
const toPairs = compose(map(split('=')), split('&'))

// params :: String -> [[String]]
const params = compose(toPairs, last, split('?'))

// findParam :: String -> IO Maybe [String]
const findParam = key => map(
  compose(Maybe.of, filter(compose(eq(key), head)), params),
  url
)

console.log(findParam('house').performIO())
