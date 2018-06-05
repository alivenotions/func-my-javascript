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
