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