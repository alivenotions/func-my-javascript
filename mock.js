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
  
  name: 'mockDb',
  config: { host: 'localhost', port: 8909, username: 'admin' },
  getValue(key) { console.log(`someone hit me bro! with query: ${key}`); return this.db[key] }
}

const mockDbInterface = query => new Promise(resolve => {
  const response = mockDb.getValue(query)
  console.log(`made a request to the db`)
  resolve(response)
})

const mockWindow = {
  location: { href: 'https://localhost:9099/yo/momma?house=42' }
}

module.exports = {
  mockDb,
  mockDbInterface,
  mockWindow,
}
