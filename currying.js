
// const reduce = f => list => list.reduce(f)

// keepHighest :: Number -> Number -> Bool
const keepHighest = (x, y) => x >= y ? x : y

// const max = reduce(keepHighest, -Infinity)

// console.log(max([1, 12, 3, 30]))

// split :: String -> String -> [String]
const split = arg => str => str.split(arg)
const words = split(' ')

console.log(words('hello my name is'))

const filter = regex => list => list.filter(str => str.match(regex))
const filterQs = filter(/q/i)

console.log(filterQs(['this is the end', 'Question is', 'Quixotic Elixir']))

// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = f => x => xs => xs.reduce(f, x)

const sum = reduce((x, y) => x + y)
const sumFromZero = sum(0)
console.log(sumFromZero([1, 2, 3, 9, 5]))
