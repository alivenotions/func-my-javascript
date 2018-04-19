/**
 * intermediate algorithm problems from freeCodeCamp
 * all the solutions have stressed on being functional
 * a ToDo is marked against those done in a non-func style
 */

// utility functions
const titleCaseWord = word => word.charAt(0).toUpperCase() + word.slice(1)
const leadingConsonants = word => word.match(/^[^aeiou]+/) || ''

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

// return true only and only if bool is a boolean
function booWho(bool) {
    return typeof bool === 'boolean'
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
// console.log(translatePigLatin('falgorithm'))
// console.log(pairElement('GCGT'))
// console.log(booWho([]))
