const fs = require('fs')
let dir = fs.readlinkSync('./server/data/pages')
console.log(dir)
// fs.createReadStream