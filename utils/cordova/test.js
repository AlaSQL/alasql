var fst = require('./filestorage.js');

var f = new fst.FileStorage('./test.json', {strict: false, ws: ''});

f.setItem('aaa', {a: 1, b: 1});
