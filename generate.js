const fs = require("fs")
const {randomBytes} = require("node:crypto")
fs.writeFileSync("key",randomBytes(32))
fs.writeFileSync("iv",randomBytes(16))