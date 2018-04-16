
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
