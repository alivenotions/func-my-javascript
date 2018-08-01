// This file illustrates the problems with the Promises/A+ implementation

/** 
 * 1. eagerness
 */
const mockDb = {
  db: {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  },

  getValue(key) { console.log(`someone hit me bro! with query: ${key}`); return this.db[key] }
}

const mockDbInterface = query => new Promise(resolve => {
  const response = mockDb.getValue(query)
  console.log(`made a request to the db`)
  resolve(response)
})

// starts working even before a then handler
// mockDbInterface(1)

/**
 * 2. Cancellation
 */

// Despite the race being over, the second promise
// is still running and will cause a side effect
// that isn't needed.
Promise.race([
  Promise.resolve('Done.'),
  new Promise(resolve => setTimeout(() => {console.log('laaaaaaate'); resolve('donnneee!!!')}, 5000))
])
.then(console.log)

// Both these problems can be resolved with the use of Futures
// TODO: Implement solutions with Fluture's Futures.
