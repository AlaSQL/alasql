if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 177 - AVG', function () {
	var data = [{a: 1}, {a: 2}, {a: 3}];

	it('1. AVG', function (done) {
		var res = alasql('SELECT COUNT(*) AS cnt, SUM(a) AS sm FROM ?', [data]);
		assert(2 == res[0].sm / res[0].cnt);
		done();
	});

	it('2. AVG', function (done) {
		var res = alasql('SELECT VALUE AVG(a) FROM ?', [data]);
		//    console.log(2, res);
		assert(res == 2);
		done();
	});

	if (false) {
		it('3. AGGR', function (done) {
			var res = alasql('SELECT COUNT(*) AS cnt, SUM(a) AS sm, AGGR(sm/cnt) AS av FROM ?', [data]);
			//    var res = alasql('SELECT COUNT(*) AS cnt, SUM(a) AS sm, AGGR(COUNT(*)/SUM(a)) AS av FROM ?',[data]);
			/// console.log(3, res);
			assert(2 == res[0].av);
			done();
		});
	}
});
