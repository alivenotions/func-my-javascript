/** features that have GREATLY helped FP in JS */

/** arrow functions */
// ES5 way
function upperCaseName(name) {
    return name.toUpperCase()
}

// ES6
const upperName = name => name.toUpperCase()

// Psst... can generalize this above function too
// const upperCase = str => str.toUpperCase()
// upperName = upperCase

/** rest and spread operators */
// removes the need for the arguments array that
// was required to access the arguments passed
const log = (...args) => { console.log(...args) }

/** destructuring */
const head = ([head]) => head
head([1, 2, 3, 4]) // 1

/** Object.freeze */
// is an ES5 feature and helps not to mutate
// the underlying object

const fiveNaturalNum = Object.freeze([1, 2, 3, 4, 5])
// fiveNaturalNum.push(6) // ​​Cannot add property 5, object is not extensible​​

/** Classes */

class PointClass {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    moveBy(dx, dy) {
        this.x += dx
        this.y += dy
    }
}

// is equivalent to

function Point(x, y) {
    this.x = x
    this.y = y
}

Point.prototype.moveBy = function(dx, dy) {
    this.x += dx
    this.y += dy
}

// this above approach mutates state a lot.
// the approach below with pure functions
const createPoint = (x, y) => Object.freeze([x, y])

const movePointBy = ([x, y], dx, dy) => 
                                Object.freeze([x + dx, y + dy])