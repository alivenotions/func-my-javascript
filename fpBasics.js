// rest operator
// const array = (...elements) => elements

// rest and spread operator
// const log = (...args) => { console.log(...args) }

// log(array(1, 2, 4))

// destructuring
// const head = ([x]) => x

// console.log(head([1, 2, 3]))

// pure function
// const add = (x, y) => x + y

// add(2, 3) === 5
/* ********************************** */
// impure functions

// let name = 'Bhavdeep'
// accesses global state
// const getName = () => name
// mutates state
// const setName = newName => { name = newName }
// accesses global state and
// mutates the console
// const printUpperName = () => {
//     console.log(name.toUpperCase())
// }

// impure functions are difficult to test
// hidden state is uncertain state

// describe('api', () => {
//     beforeEach(() => mockConsoleLog())
//     afterEach(() => restoreConsoleLog())

//     it('sets and prints the name', () => {
//         printUpperName()

//         expect(console.log).calledWith('BD')

//         setName('Jet')
//         printUpperName()

//         expect(console.log).calledWith('JET')
//     })
// })
/* ********************************** */

/* ********************************** */
// pure version of the previous function
// const upperName = name => name.toUpperCase()

// test for this pure function
// describe('api', () => {
//     it('returns an uppercase name', () => {
//         expect(upperName('Bd')).to.equal('BD')
//         expect(upperName('Jet')).to.equal('JET')
//     })
// })
/* ********************************** */

/* ********************************** */
// classes contrasted with ES5 code

// class Point {
//     constructor(x, y) {
//         this.x = x
//         this.y = y
//     }

//     moveBy(dx, dy) {
//         this.x += dx
//         this.y += dy
//     }
// }

// is equivalent to

// function Point(x, y) {
//     this.x = x
//     this.y = y
// }

// Point.prototype.moveBy = function(dx, dy) {
//     this.x += dx
//     this.y += dy
// }
// this is mutating state a lot
/* ********************************** */

/* ********************************** */
// equivalent functions to the functions above 
// without mutation

// const createPoint = (x, y) => Object.freeze([x, y])

// const movePointBy = ([x, y], dx, dy) =>
//                         Object.freeze([x + dx, y + dy])

// let point = createPoint(0, 0)

// point = movePointBy(point, 5, 5)
// point = movePointBy(point, -2, 2)

// point
/* ********************************** */

/* ********************************** */
// Curried example

// const request = defaults => options => {
//     options = Object.assign(
//         {}, defaults, options
//     )
// }

// const map = fn => array => array.map(fn)
// const multiply = x => y => x * y
// const pluck = key => object => object[key]

// const discount = multiply(0.98)
// const tax = multiply(1.0925)

// const customRequest = request({
//     headers: { 'X-Custom': 'mykey' }
// })

// customRequest({ url: '/cart/items' })
//     .then(map(pluck('price')))
//     .then(map(discount))
//     .then(map(tax))

/* ********************************** */
// composition

const toUpperCase = string => string.toUpperCase()
const reverse = string => string.split('').reverse().join('')

// reduce version
// const pipe = (fn, ...fns) => (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args))

// recursive version
// const pipe = (fn, ...fns) => (...args) => !fns.length ? fn(...args) : pipe(...fns)(fn(...args))
// const compose = (...fns) => pipe(...fns.reverse())

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const processWord =
    compose(reverse, toUpperCase)

const words = [
    'hello', 'functional', 'programming'
]

const newWords = words.map(processWord)

console.log(newWords)
