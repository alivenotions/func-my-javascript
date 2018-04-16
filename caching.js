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
squared // 9