/**
 * algorithm problems from freeCodeCamp
 * all the solutions have stressed on being functional
 * a ToDo is marked against those done in a non-func style
 */


// utility functions
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const stripNonAlphanumerics = str => str.replace(/([^a-z0-9]+)/g, '')
const upperCase = str => str.toUpperCase()
const lowerCase = str => str.toLowerCase()
const reverse = str => str.split('').reverse().join('')
const sortCharsAsc = str => str.split('').sort((a, b) => a.localeCompare(b)).join('')
const uniqueStr = sortedStr => sortedStr.replace(/(.)(?=.*\1)/g, '')
const isInArray = (value, arr) => arr.indexOf(value) > -1

// solutions to problems
function palindrome(str) {
    const bareStringify = compose(stripNonAlphanumerics, lowerCase)
    return bareStringify(str) === bareStringify(reverse(str))
}

function findLongestWord(str) {
    return str.split(' ')
            .reduce((length, word) =>
                        word.length >= length ? word.length : length, 0)
}

function titleCase(str) {
    return str.split(' ')
            .map(word => upperCase(word.slice(0, 1)) + lowerCase(word.slice(1)))
            .join(' ')
}

function largestInSubArrays(arr) {
    return arr.reduce((listOfLargeNums, subArray) => {
        let largest = subArray[0]
        for(let num = 0; num < subArray.length; num++) {
            if(largest < subArray[num]) {
                largest = subArray[num]
            }
        }
        listOfLargeNums.push(largest)
        return listOfLargeNums
    }, [])
}

function confirmEnding(str, target) {
    // return str.endsWith(target)
    // return !!str.match(new RegExp(target + '$'))
    // return str.substr(-target.length, target.length) === target
    return str.substring(str.length - target.length, str.length) === target
}

function repeatStringNumTimes(str, num) {
    if(num < 0) return ''
    return str.repeat(num)
}

function truncateString(str, num) {
    if(num >= str.length) return str
    else if(num <= 3) return str.slice(0, num) + '...'
    return str.slice(0, num - 3) + '...'
}

// TODO: functionalize the logic
function chunkArrayInGroups(arr, size) {
    let chunkedArray = []
    let subArray = []
    for(let count = 0, num = 0; num < arr.length; num++) {
        if(count === 0 || count === size) {
            subArray = []
            chunkedArray.push(subArray)
            count = 0
        }
        subArray.push(arr[num])
        count++
    }
    return chunkedArray
}

function slasher(arr, howMany) {
    return arr.slice(howMany)
}

function mutation([first, second]) {
    return second.toLowerCase()
        .split('')
        .every(letter => first.toLowerCase()
            .indexOf(letter) !== -1)
}

function bouncer(arr) {
    return arr.filter(element => !!element)
}

function destroyer(arr, ...destroy) {
    // return arr.filter(element => !destroy.includes(element))
    // ES5 way: use indexOf
    return arr.filter(element => !isInArray(element, destroy))
}

function getIndexToIns(arr, num) {
    // arr.sort((a,b) => a > b)
    // for(const elem of arr) {
    //     if(num <= elem) return arr.indexOf(elem)
    // }
    // return arr.length

    // functional way
    const insertIndex = arr.slice()
                    .sort((curr, next) => curr > next)
                    .findIndex(element => num <= element)
    return insertIndex === -1 ? arr.length : insertIndex
}

function rot13(str) {
    return str.replace(/[A-Z]/g, L => 
                            String.fromCharCode((L.charCodeAt(0) % 26) + 65))
}

// checking the solutions

// console.log(palindrome('A man, a plan, a canal. Panama'))
// console.log(findLongestWord('The quick brown fox jumped over the lazy dog'))
// console.log(titleCase(`I'm a little teApot`))
// const nestedArray = [[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]
// console.log(largestInSubArrays(nestedArray))
// console.log(confirmEnding('Bastian', 'an')
// console.log(repeatStringNumTimes('abc', 2))
// console.log(truncateString('A-tisket a-tasket A green and yellow basket', 12))
// console.log(chunkArrayInGroups(['a', 'b', 'c', 'd'], 2))
// console.log(slasher([1, 2, 3], 5))
// console.log(mutation(['floor', 'for']))
// console.log(bouncer([7, 'ate', '', false, 9]))
// console.log(destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3))
// console.log(getIndexToIns([10, 20, 30, 40, 50], 30))
// console.log(rot13('SERR PBQR PNZC'))
