var alasql = require('./src/alasql')

for(var key in alasql) {
  exports[key] = alasql[key]
}

