const {
  compose,
  match,
  concat,
  inspect,
  prop,
  curry,
  map,
} = require('../utils')

/** Maybe functor */
// a simplified implementation
class Maybe {
  static of(x) {
      return new Maybe(x)
  }

  get isNothing() {
      return this.$value === null || this.$value === undefined
  }

  constructor(x) {
      this.$value = x
  }

  map(fn) {
      return this.isNothing ? this : Maybe.of(fn(this.$value))
  }

  join() {
    return this.isNothing ? Maybe.of(null) : this.$value
  }

  inspect() {
      return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`
  }
}

// console.log(Maybe.of('This is the end'))
// console.log(Maybe.of(null).map(match(/a/ig)))

// // safeHead :: [a] -> Maybe(a)
// const safeHead = xs => Maybe.of(xs[0])

// // streetName :: Object -> Maybe String
// const streetName = compose(map(prop('street')), safeHead, prop('addresses'))

// console.log(streetName({ addresses: [] }))
// console.log(streetName({
//   addresses: [{
//       street: 'Shady Ln.',
//       number: 4201,
//   }]
// }))


/** a dummy logic flow for withdrawal */
// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) => 
  Maybe.of(balance >= amount ? { balance: balance - amount } : null ))

// a hypothetical unimplemented function
// updateLedger :: Account -> Account
const updateLedger = account => account

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your remaining balance is $${balance}`

// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger)

// getTwenty :: Account -> Maybe(String)
// const getTwenty = compose(map(finishTransaction), withdraw(20))

// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry ((v, f, m) => {
  if(m.isNothing) {
    return v
  }

  return f(m.$value)
})

// An alternative to the above function can be the following function
// getTwenty :: Account -> String
const getTwenty = compose(maybe(`You're broke`, finishTransaction), withdraw(20))

// console.log(getTwenty({ balance: 200 }))
// console.log(getTwenty({ balance: 15 }))

module.exports = {
  Maybe,
}
