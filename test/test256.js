if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 256 INTO() in result and into params array', function() {
	it('1. INTO param', function(done) {
		var data = [{a: 1}, {a: 2}];
		var resdata = [{a: 0}];
		var res = alasql('SELECT * INTO ? FROM ?', [resdata, data]);
		assert(res == 2);
		assert.deepEqual(resdata, [{a: 0}, {a: 1}, {a: 2}]);
		done();
	});

	it('2. INTO TXT() result', function(done) {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT * INTO TXT() FROM ?', [data]);
		assert(res == '1\n2');
		done();
	});

	it('3. INTO JSON() result', function(done) {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT * INTO JSON() FROM ?', [data]);
		assert(res == '[{"a":1},{"a":2}]');
		done();
	});

	it('4. INTO SQL() result', function(done) {
		var data = [{a: 1, b: 2}, {a: 2, b: 2}];
		var res = alasql('SELECT * INTO SQL({tableid:"one"}) FROM ?', [data]);
		assert(res == 'INSERT INTO one(a,b) VALUES (1,2);\nINSERT INTO one(a,b) VALUES (2,2);\n');
		done();
	});

	it('4. INTO CSV() result', function(done) {
		var data = [{a: 1, b: 2}, {a: 2, b: 2}];
		var res = alasql('SELECT * INTO CSV({headers:true, utf8Bom:false}) FROM ?', [data]);
		assert.equal(res, '"a";"b"\r\n1;2\r\n2;2\r\n');
		done();
	});

	it('5. INTO XLSX() result', function(done) {
		var data = [{a: 1, b: 2}, {a: 2, b: 2}];
		var res = alasql('SELECT * INTO XLSX({headers:true}) FROM ?', [data]);
		/// console.log(res);
		//    assert(res == 'a,b\n1,2\n2,2\n')
		done();
	});
});
