var alasql = require('./alasql.js')

for(var key in alasql) {
  exports[key] = alasql[key]
}

