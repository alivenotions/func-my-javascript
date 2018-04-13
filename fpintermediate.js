/** don't provide unnecessary wrapping */
const hi = name => `Hi ${name}`
// this code is unnecessary
// const greeting = name => hi(name)

// this will ensure compactness and removes
// argument dependency
const greeting = hi

console.log(greeting('BD'))

/** Pure Functions */

const xs = [1, 2, 3, 4, 5]

console.log(xs.slice(0, 3))
xs
console.log(xs.splice(0, 3))
xs

const immutableState = Object.freeze({ minimum: 21 })
const checkAge = age => age >= immutableState.minimum


// Caching

const memoize = f => {
    const cache = {}

    return (args) => {
        const argStr = args
        cache[argStr] = cache[argStr] || f(args)
        return cache[argStr]
    }
}

const squareNumber = memoize(x => x * x)

const squared = squareNumber(3)
const threeSquared = squareNumber(3)
squared

/** Curry */

const reduce = f => list => list.reduce(f)
const keepHighest = (x, y) => x >= y ? x : y

const max = reduce(keepHighest, -Infinity)

console.log(max([1, 12, 3, 30]))

const split = arg => str => str.split(arg)
const words = split(' ')

console.log(words('hello my name is'))

const filter = regex => list => list.filter(str => str.match(regex))
const filterQs = filter(/q/i)

console.log(filterQs(['this is the end', 'Question is', 'Quixotic Elixir']))

