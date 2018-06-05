const {
  inspect,
  curry,
  compose,
  add,
  map,
  concat,
} = require('./utils')

class Either {
  static of(x) {
    return new Right(x)
  }

  constructor(x) {
    this.$value = x
  }
}

class Left extends Either {
  map(f) {
    return this
  }

  inspect() {
    return `Left(${inspect(this.$value)})`
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.$value))
  }

  inspect() {
    return `Right(${inspect(this.$value)})`
  }
}

const left = x => new Left(x)

// console.log(Either.of('rain').map(str => `b${str}`))
// console.log(left('rain').map(str => `b${str}`))

// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
  const { birthDate } = user

  return (/[12][0-9]{3}/g.test(birthDate.slice(0, 4)))
    ? Either.of(parseInt(now, 10) - parseInt(birthDate.slice(0, 4), 10))
    : left('Birth date could not be parsed')
})

// console.log(getAge(new Date().getFullYear(), { birthDate: 'balloons' }))

const trace = x => {
  console.log(x)
  return x
}

// fortune :: Number -> String
const fortune = compose(
  concat('If you survive, you will be '),
  add(1),
)

// zoltar :: User -> Either(String, _)
const zoltar = compose(
  map(console.log),
  map(fortune),
  getAge(new Date().getFullYear()),
)

console.log(zoltar({ birthDate: 'balloons' }))
