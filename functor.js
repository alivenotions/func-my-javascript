const {
    compose,
    match,
    concat,
    inspect,
    prop
 } = require('./utils')

// a functor follows this rule
// fx.map(f).map(g) == fx.map(x => g(f(x)))

// double :: Number -> Number
const double = x => x * 2

// decrement :: Number -> Number
const decrement = x => x - 1

// console.log([1, 2, 3].map(double).map(decrement))
// console.log([1, 2, 3].map(compose(decrement, double)))


/** A self contained generic container */
class Container {
    constructor(x) {
        this.$value = x
    }

    static of(x) {
        return new Container(x)
    }
}

// functor is an interface with a contract
// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
    return Container.of(f(this.$value))
}

// console.log(Container.of(3))
// console.log(Container.of('Hotdogs'))
// console.log(Container.of(Container.of({ name: 'yoda' })))

// console.log(
//     Container.of('bombs')
//         .map(concat(' away'))
//         .map(str => str.length)
// )


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

    inspect() {
        return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`
    }
}

// a point-free map
// map :: Functor f => (a -> b) -> f a -> f b
const map = f => anyFunctor => anyFunctor.map(f)

// console.log(Maybe.of('This is the end'))
// console.log(Maybe.of(null).map(match(/a/ig)))

// safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0])

// streetName :: Object -> Maybe String
const streetName = compose(map(prop('street')), safeHead, prop('addresses'))

console.log(streetName({ addresses: [] }))
console.log(streetName({
    addresses: [{
        street: 'Shady Ln.',
        number: 4201,
    }]
}))
