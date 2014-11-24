//
// alaserver.js = Alasql Server
// Date: 25.11.2014
// (c) 2014, Andrey Gershun
//

var alasql = require('./alasql');
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
