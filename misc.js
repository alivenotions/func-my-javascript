/** don't provide unnecessary wrapping */
const hi = name => `Hi ${name}`
// this code is unnecessary
// const greeting = name => hi(name)

// this will ensure compactness and removes
// argument dependency
const greeting = hi

console.log(greeting('BD'))
