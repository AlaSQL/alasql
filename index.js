var alasql = require('./lib/alasql')

for(var key in alasql) {
  exports[key] = alasql[key]
}

