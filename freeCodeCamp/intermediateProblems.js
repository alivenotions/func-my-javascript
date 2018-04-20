/**
 * intermediate algorithm problems from freeCodeCamp
 * all the solutions have stressed on being functional
 * a ToDo is marked against those done in a non-func style
 */

// utility functions
const titleCaseWord = word => word.charAt(0).toUpperCase() + word.slice(1)
const leadingConsonants = word => word.match(/^[^aeiou]+/) || ''
const isOdd = num => num % 2 !== 0
const isNum = num => Number.isInteger(num)

// solutions to problems.
// the function names correspond the names at freeCodeCamp, hence, are poor

// arr := [first, last]
function sumAll(arr) {
    const start = Math.min(...arr)
    const end = Math.max(...arr)
    return (end - start + 1) * (start + end) / 2
}

// symmetric difference
function diffArray(arr1, arr2) {
    return arr2.filter(element => !arr1.includes(element))
            .concat(arr1.filter(element => !arr2.includes(element)))
}

// return matched objects in a array
// a matched object is an object in collection
// that has the same key value pair as source
function whatIsInAName(collection, source) {
    // more imperative code!!! + not using HOFs
    // return collection.reduce((matched, object) => {
    //     let flag = false
    //     for(const key in source) {
    //         if(object.hasOwnProperty(key) 
    //           && object[key] === source[key]) {
    //             flag = true
    //         } else if (!object.hasOwnProperty(key)){
    //             flag = false
    //         }
    //     }
    //     if(flag) matched.push(object)
    //     return matched
    // }, [])

    // a good solution for learning but overtly convoluted
    // const srcKeys = Object.keys(source)
    // return collection.filter(
    //     object => srcKeys.map(key =>
    //         object.hasOwnProperty(key) && object[key] === source[key])
    //         .reduce((a, b, c, d) => a && b)
    // )

    const srcKeys = Object.keys(source)
    return collection.filter(object => 
                                srcKeys.every(key =>
                                                object.hasOwnProperty(key) 
                                                && object[key] === source[key])
                            )
}

// replace before with after in str honoring the case
function myReplace(str, before, after) {
    return str.replace(
        before,
        match => /^[A-Z]/.test(before) 
                ? titleCaseWord(after)
                : after
    )
}

function translatePigLatin(str) {
    const consLength = leadingConsonants(str) && leadingConsonants(str)[0].length
    return /^[aeiou]/.test(str)
        ? `${str}way`
        : `${str.slice(consLength)}${str.slice(0, consLength)}ay`

    // a terser but slightly more involved solution
    // return str.replace(/^([aeiouy])(.*)/, '$1$2way')
    //     .replace(/^([^aeiouy]+)(.*)/, '$2$1ay')
}

// DNA pairing
// 'GCT' => [['G', 'C'], ['C', 'G'], ['T', 'A']] 
function pairElement(str) {
    return str.split('')
            .reduce((arr, char) => {
                switch(char){
                    case 'G': arr.push(['G', 'C']); break
                    case 'C': arr.push(['C', 'G']); break
                    case 'T': arr.push(['T', 'A']); break
                    case 'A': arr.push(['A', 'T']); break
                }
                return arr
            }, [])
}

function uniteUnique(...arr) {
    return arr.reduce((union, subArr) => 
            union.concat(subArr.filter(element =>
                !union.includes(element))))
}
  

// return true only and only if bool is a boolean
function booWho(bool) {
    return typeof bool === 'boolean'
}


function spinalCase(str) {
    // return str.split(/\s|_|(?=[A-Z])/).join('-').toLowerCase()
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\s+|_+/g, '-')
        .toLowerCase()
}

// an abstraction func for sumFibs below
const fibonacciTill = num => {
    const listOfFibs = [1, 1]
    ;[first, second] = listOfFibs
    let sum = 1
    while(true) {
        sum = first + second
        if((sum) > num) break
        listOfFibs.push(sum)
        first = second
        second = sum
    }
    return listOfFibs
}

// sum all odd fibonacci number under num
function sumFibs(num) {
    return fibonacciTill(num)
        .filter(element => isOdd(element))
        .reduce((a, b) => a + b, 0)
}

// find the first element that satisfies func
function findElement(arr, func) {
    // return arr.filter(func).shift()
    return arr.find(func)
}

// flatten the list
function steamrollArray(arr) {
    const flatten = [].concat(...arr)
    return flatten.some(Array.isArray) ? steamrollArray(flatten) : flatten
}

// check if pre exists on every object of collection
function truthCheck(collection, pre) {
    return collection.every(object => !!object[pre])
}

function addTogether(...args) {
    if(!isNum(args[0]) || (args.length === 2 && !isNum(args[1]))) return
    return args.length === 2
        ? args[0] + args[1]
        : (num) => 
            isNum(num) ? num + args[0] : undefined
}

// checking the solutions

// console.log(sumAll([1, 4]))
// console.log(diffArray([1, 2, 3, 5, 6], [1, 2, 3, 4, 5])) // [4, 6]
// console.log(whatIsInAName([
//     { 'a': 1, 'b': 2 },
//     { 'a': 1 },
//     { 'a': 1, 'b': 2, 'c': 2 },
//     { 'b': 2}
// ], { 'a': 1, 'b': 2 }))
// console.log(myReplace('A quick brown fox Jumped over the lazy dog', 'Jumped', 'leaped'))
// console.log(pairElement('GCGT'))
// console.log(translatePigLatin('falgorithm'))
// console.log(booWho([]))
// console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]))
// console.log(spinalCase('ThisIs_Spinal Tap'))
// console.log(sumFibs(1000))
// console.log(findElement([1, 2, 3, 4], function(num){ return num % 2 === 0 }))
// console.log(steamrollArray([1, {}, [3, [[4]]]]))
// console.log(truthCheck([
//     {"user": "Tinky-Winky", "sex": "male"},
//     {"user": "Dipsy"},
//     {"user": "Laa-Laa", "sex": "female"},
//     {"user": "Po", "sex": "female"}],
// "sex"))
// console.log(addTogether(2, 3))
