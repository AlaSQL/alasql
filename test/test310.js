if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 310 Create graph', function() {
	it('1. Create database ', function(done) {
		alasql('CREATE DATABASE test310;USE test310');
		done();
	});

	it('2. LIKE selector', function(done) {
		var data = [{name: 'Moscow'}, {name: 'St.Petersburg'}, {name: 'Prague'}];
		//    var res = alasql.parse('CREATE GRAPH #Andrey');
		var res = alasql('SEARCH / name LIKE "P%" FROM ?', [data]);
		assert.deepEqual(res, ['Prague']);
		done();
	});

	it('3. CREATE GRAPH', function(done) {
		//    var res = alasql.parse('CREATE GRAPH #Andrey');
		var res = alasql('CREATE GRAPH #Andrey');
		var res = alasql('CREATE GRAPH #John,#Mary');
		var res = alasql('CREATE GRAPH #Anton,#Julia,#Anton >> #John');
		var res = alasql('CREATE GRAPH #Victor "Victor Branson"');
		var res = alasql('CREATE GRAPH #[John Smith] {age:23, country:"Canada"}');
		var res = alasql('CREATE GRAPH #[John Smith] > "loves" > #Mary');
		var res = alasql('CREATE GRAPH #Anton > "loves" {power:"too much"} > #Julia');
		var res = alasql('SEARCH / VERTEX [$id]');
		assert.deepEqual(res, ['Andrey', 'John', 'Mary', 'Anton', 'Julia', 'Victor', 'John Smith']);
		done();
	});

	it('2. RETURNS', function(done) {
		var res = alasql('SEARCH RETURNS(country,age AS Age) FROM #[John Smith] ');
		assert.deepEqual(res, [{country: 'Canada', Age: 23}]);
		done();
	});

	// it('2. CREATE GRAPH FROM',function(done){
	//   alasql('CREATE GRAPH FROM GEXF("test310.gexf")');
	//   done();
	// });

	// it('3. Gorup operations',function(done){
	//   alasql('SEARCH EDGE SET(color="black")');
	//   done();
	// });

	// it('4. PATH',function(done){
	//   alasql('SEARCH #1 PATH(#10)');
	//   alasql('SEARCH #1 PATH(#10) SET(color="red")');

	//   alasql('SEARCH #1 PATHS(#10)');
	//   done();
	// });

	// it('5. D3',function(done){
	//   alasql('SEARCH VERTEX D3()');
	//   alasql('SEARCH EDGE D3()');
	//   done();
	// });

	// it('6. ALL,ANY,CONCAT',function(done){
	//   alasql('SEARCH SUM(VERTEX)');
	//   alasql('SEARCH SUM(EDGE)');
	//   alasql('SEARCH SUM(EDGE),SUM(VERTEX)'); //?
	//   alasql('SEARCH CONCAT(SUM(EDGE),SUM(VERTEX))');
	//   alasql('SEARCH ALL(VERTEX,EDGE)');
	//   alasql('SEARCH ANY(VERTEX,EDGE)');
	//   done();
	// });

	// it('7. = statement',function(done){
	//   alasql('=1+1');
	//   alasql('=(SEARCH SUM(VERTEX))');
	//   alasql('=(SEARCH SUM(EDGE))');
	//   done();
	// });

	// it('7. ORDER BY',function(done){
	//   var data = [{a:1},{a:2},{a:0}];
	//   var res = alasql('SEARCH a FROM ? ORDER BY _ DESC',[data]);
	//   assert.deepEqual(res,[2,1,0]);
	//   done();
	// });

	it('99. Drop database ', function(done) {
		alasql('DROP DATABASE test310');
		done();
	});
});
