// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 310 Create graph', () => {
	test('1. Create database ', done => {
		alasql('CREATE DATABASE test310;USE test310');
		done();
	});

	test('2. LIKE selector', done => {
		var data = [{name: 'Moscow'}, {name: 'St.Petersburg'}, {name: 'Prague'}];
		//    var res = alasql.parse('CREATE GRAPH #Andrey');
		var res = alasql('SEARCH / name LIKE "P%" FROM ?', [data]);
		expect(res).toEqual(['Prague']);
		done();
	});

	test('3. CREATE GRAPH', done => {
		//    var res = alasql.parse('CREATE GRAPH #Andrey');
		var res = alasql('CREATE GRAPH #Andrey');
		var res = alasql('CREATE GRAPH #John,#Mary');
		var res = alasql('CREATE GRAPH #Anton,#Julia,#Anton >> #John');
		var res = alasql('CREATE GRAPH #Victor "Victor Branson"');
		var res = alasql('CREATE GRAPH #[John Smith] {age:23, country:"Canada"}');
		var res = alasql('CREATE GRAPH #[John Smith] > "loves" > #Mary');
		var res = alasql('CREATE GRAPH #Anton > "loves" {power:"too much"} > #Julia');
		var res = alasql('SEARCH / VERTEX [$id]');
		expect(res).toEqual(['Andrey', 'John', 'Mary', 'Anton', 'Julia', 'Victor', 'John Smith']);
		done();
	});

	test('2. RETURNS', done => {
		var res = alasql('SEARCH RETURNS(country,age AS Age) FROM #[John Smith] ');
		expect(res).toEqual([{country: 'Canada', Age: 23}]);
		done();
	});

	// test('2. CREATE GRAPH FROM',function(done){
	//   alasql('CREATE GRAPH FROM GEXF("test310.gexf")');
	//   done();
	// });

	// test('3. Gorup operations',function(done){
	//   alasql('SEARCH EDGE SET(color="black")');
	//   done();
	// });

	// test('4. PATH',function(done){
	//   alasql('SEARCH #1 PATH(#10)');
	//   alasql('SEARCH #1 PATH(#10) SET(color="red")');

	//   alasql('SEARCH #1 PATHS(#10)');
	//   done();
	// });

	// test('5. D3',function(done){
	//   alasql('SEARCH VERTEX D3()');
	//   alasql('SEARCH EDGE D3()');
	//   done();
	// });

	// test('6. ALL,ANY,CONCAT',function(done){
	//   alasql('SEARCH SUM(VERTEX)');
	//   alasql('SEARCH SUM(EDGE)');
	//   alasql('SEARCH SUM(EDGE),SUM(VERTEX)'); //?
	//   alasql('SEARCH CONCAT(SUM(EDGE),SUM(VERTEX))');
	//   alasql('SEARCH ALL(VERTEX,EDGE)');
	//   alasql('SEARCH ANY(VERTEX,EDGE)');
	//   done();
	// });

	// test('7. = statement',function(done){
	//   alasql('=1+1');
	//   alasql('=(SEARCH SUM(VERTEX))');
	//   alasql('=(SEARCH SUM(EDGE))');
	//   done();
	// });

	// test('7. ORDER BY',function(done){
	//   var data = [{a:1},{a:2},{a:0}];
	//   var res = alasql('SEARCH a FROM ? ORDER BY _ DESC',[data]);
	//   expect(res).toEqual([2,1,0]);
	//   done();
	// });

	test('99. Drop database ', done => {
		alasql('DROP DATABASE test310');
		done();
	});
});
