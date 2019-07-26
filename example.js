const fs = require('fs')
const Rabin = require('./')

const r = new Rabin()

const book = fs.readFileSync('sandbox/book.pdf')
let chunks = 0

console.time('rabin')
for (let i = 0; i < 100; i++) {
  chunks = r.push(book)
}
console.timeEnd('rabin')

let offset = 0
for (let i = 0; i < chunks; i++) {
  console.log('chunk offset=' + offset + ' length=' + r.chunks[i])
  offset += r.chunks[i]
}
