if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 142 INSTREAM', function () {
	it('1. Source as a string', function (done) {
		alasql('CREATE DATABASE test142; use test142');
		done();
	});

	it('2. Simple Date functions', function (done) {
		var srcfn = function (i) {
			if (i > 2) return;
			return {i: i, i2: i * 2};
		};

		//		srcfn.length = 3;

		var res = alasql('SELECT * FROM ?', [srcfn]);
		//		console.log(res);
		assert.deepEqual(res, [
			{i: 0, i2: 0},
			{i: 1, i2: 2},
			{i: 2, i2: 4},
		]);

		done();
	});
	it('3. Calculate PI with streaming function', function (done) {
		var n = 10000;

		var rndfn = function (i) {
			if (i >= n) return; // EOF
			return {x: Math.random(), y: Math.random()};
		};
		rndfn.dontcache = true;

		//		rndfn.length = 100;

		//		alasql.stdlib.SQRT = function(s) {return 'Math.sqrt('+s+')'};
		var tm = Date.now();
		var res = alasql('SELECT VALUE COUNT(*) FROM ? WHERE SQRT(x*x+y*y)<1', [rndfn]);
		//		console.log(Date.now() - tm);
		var pi = (res / n) * 4;
		//		console.log(res,pi);
		assert(2 < pi && pi < 4);

		done();
	});
	/*
	it("4. Calculate PI", function(done){




		var vtab = "ABCDEF\tsdfsdfsd\ndjlskjd\tsddsf\nsdsdffsd\tsddsfsd";
		alasql("select [0], LEN([0]) from tab(?) where [1] like '%sd%'",[vtab]);

		var vcsv = "1,2,3\n2,3,4\n6,5,3";
		alasql("select [0], LEN([0]) from csv(?) where [1] like '%sd%'",[vcsv]);

// Connect to other database
		alasql("select [0], LEN([0]) from alasql(SELECT * FROM one) where [1] like '%sd%'")		

if(false) {

		alasql("select INTO ?",[fn]);
// include xls
// tab.datafn = function() { return all};
// tab.length = 10;
// tab.defineProperty = '';
// unnn.start();
// vat i = 0;
// var ilen = 10000000000; // Security brake
// if(unnn.init) unnn.init();
// if(unnn.length) ilen = unnn.length;
// while( (unnn.get && d = unnn.get(i)) || (i<ilen) {} ; - instead for(i) - cyc
// getrow();
// srcfn.getAll();
// srcfn.prepare();

// srcfn.length;
// Can be not object
// var xls = new alasql.InStream(1,2,3,4) {
//   aassa
//};
// xls.length = 10;

		$.get({}).then(function(data){
			var vxls = {};
			alasql("select [0], LEN([0]) from xls(?) where [1] like '%sd%'",[vxls]);
		});

		var xls = function(data,args,i) {
			return ;
		};
		alasql.instream.xls = xls;
};

		done();
	});
/*
	it("3. AGGR functions", function(done){
		var res = alasql('SELECT SUM(x) AS x, SUM(y) AS y, AGGR(x/y) AS z FROM ? WHERE SQRT(x*x+y*y)<1', [rndfn]);
/// console.log(res);
		assert( 0.5 < res[0].z && res[0].z < 2 );
		done();
	});

	it("4. Output stream", function(done){
		rndfn.length = 3;
		var outfn = function(data) {
/// console.log(data);
		};
		var res = alasql('SELECT x, y INTO ? FROM ? WHERE SQRT(x*x+y*y)<1', [outfn,rndfn]);
/// console.log(res);
		done();
	});

	it("4. Output stream with groups", function(done){
		var res = alasql('SELECT COUNT(*) AS n, SUM(x) AS x, SUM(y) AS y INTO ? AS z FROM ? WHERE SQRT(x*x+y*y)<1', [outfn,rndfn]);
/// console.log(res);
		done();
	});


*/
	it('99. Drop database', function (done) {
		alasql('DROP DATABASE test142');
		done();
	});
});
