var alasql = require('./alasql')

for(var key in alasql) {
  exports[key] = alasql[key]
}

