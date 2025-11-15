// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 301 Vertices and Edges', () => {
	test.skip('1. CREATE DATABASE', done => {
		var res = alasql('CREATE DATABASE test301; USE test301');
		done();
	});

	test.skip('2. Create vertices', done => {
		//    var res = alasql('CREATE VERTEX');
		alasql('SET @v1 = (CREATE VERTEX SET name="Olga",age=19,sef="F")');
		alasql('SET @v2 = (CREATE VERTEX SET name="Peter",age=21,sef="M")');
		alasql('SET @v3 = (CREATE VERTEX SET name="Helen",age=20,sef="F")');
		alasql('SET @e12 = (CREATE EDGE FROM @v1 TO @v2 SET name="loves")');
		alasql('SET @e23 = (CREATE EDGE FROM @v2 TO @v3 SET name="loves")');

		//    var res = alasql('SEARCH "Olga" > "loves" > name');
		//    var res = alasql('SEARCH "Olga" > "loves" > name');
		var res = alasql('SEARCH / "Olga" > "loves" > name');
		expect(res).toEqual(['Peter']);
		done();
	});

	test.skip('3. Create vertices', done => {
		var res = alasql('SEARCH / "Olga" > "loves" > name');
		expect(res).toEqual(['Peter']);
		//      var res = alasql('SEARCH "Olga" > "loves" > name');
		//       console.log(res);
		done();
	});

	test.skip('4. Create vertices', done => {
		var res = alasql('SEARCH / "Olga" > AS @p > "Peter" @p name');
		expect(res).toEqual(['loves']);
		done();
	});

	test.skip('5. Create vertices', done => {
		var res = alasql('SEARCH / AS @p > "loves" > "Peter" @p->name');
		expect(res).toEqual(['Olga']);
		done();
	});

	test.skip('6. Create vertices', done => {
		alasql('SET @steven = (CREATE VERTEX "Steven")');
		alasql('CREATE EDGE "loves" FROM @v1 TO @steven');
		var res = alasql('SEARCH / VERTEX AS @p > "loves" > AS @s @[(@p->name),(@s->name)]');
		expect(res).toEqual([
			['Olga', 'Peter'],
			['Olga', 'Steven'],
			['Peter', 'Helen'],
		]); //      var res = alasql('SEARCH "Olga" > "loves" > '); //      console.log(res); //      var res = alasql.parse('SEARCH "Olga" > "loves" > name').statements[0].selectors; //       console.log(res);
		//      console.log(res);

		/*      var res = alasql('SEARCH / VERTEX AS @p > "loves" > AS @s @[(@p->name),(@s->name)]');
      expect(res).toEqual([ [ 'Olga', 'Peter' ],
          [ 'Olga', 'Steven' ],
          [ 'Peter', 'Helen' ] ]      
      );
*/ var res = alasql('SEARCH / "Olga" > "loves" > name');
		expect(res).toEqual(['Peter', 'Steven']);

		done();
	});
	if (false) {
		test.skip('4. +() and *() and NOT()', done => {
			alasql('SET @heather = (CREATE VERTEX "Heather")');
			alasql('CREATE EDGE "loves" FROM @steven TO @heather');
			var res = alasql('SEARCH / VERTEX NOT(>) name');
			expect(res).toEqual(['Helen', 'Heather']);

			var res = alasql('SEARCH / VERTEX NOT(>"loves">"Steven") name');
			expect(res).toEqual(['Peter', 'Helen', 'Steven', 'Heather']);

			var res = alasql('SEARCH / VERTEX IF(>"loves">"Steven") name');
			expect(res).toEqual(['Olga']);

			var res = alasql('SEARCH / VERTEX @p >"loves">"Steven" @(@p) name');
			expect(res).toEqual(['Olga']);

			//      var res = alasql('SEARCH VERTEX IF(*(>"loves">)"Steven") name');
			//      expect(res).toEqual([ 'Olga' ]);

			//      expect(res).toEqual(//        [ [ 'Olga', 'Peter' ],
			//          [ 'Olga', 'Steven' ],
			//          [ 'Peter', 'Helen' ] ]
			//      );

			done();
		});
	}

	if (false) {
		test.skip('3. Create edges', done => {
			var res = alasql('CREATE CLASS Person');
			var res = alasql('CREATE VERTEX Person SET name = "Olga",age=56,sex="F"');
			var res = alasql(
				'CREATE VERTEX Person CONTENT {name:"Mike",age:45,sex:"M"},{name:"Paola",age:21,sex:"F"}'
			);
			var res = alasql('CREATE VERTEX Person SELECT * FROM ?');
			var res = alasql('CREATE VERTEX Person');
			var res = alasql('SET @e12!name = "Lisa"');
			var res = alasql('SET @e12!age = 43');

			alasql('SET @john = (CREATE VERTEX Person SET name = "John",age=23,sex="M")');
			alasql('SET @peter = (CREATE VERTEX Person SET name = "Peter",age=18,sex="M")');
			alasql(
				'SET @mike = (CREATE VERTEX Person CONTENT {name:"Mike",age:45,sex:"M"},{name:"Paola",age:21,sex:"F"})'
			);
			alasql('SET @girls = (CREATE VERTEX Person SELECT * FROM ?', [
				[
					{name: 'Mary', age: 25, sex: 'F'},
					{name: 'Helen', age: 33, sex: 'F'},
				],
			]);
			alasql('SET @mary = @girls->0; SET @helen = @girls->1');
			alasql('SET @paola = (CREATE VERTEX Person SET name = "Paola",age:19,sex="M")');
			done();
		});

		test.skip('3. Create edges', done => {
			alasql('CREATE EDGE FROM @john TO @mary SET relation="likes"');
			alasql('CREATE EDGE FROM @peter TO @mary SET relation="loves"');
			alasql('CREATE EDGE FROM @mike TO @mary CONTENT {relation:"hates"}');
			alasql('CREATE EDGE FROM @mike TO @paola CONTENT ?', [{relation: 'loves'}]);
			alasql('CREATE EDGE FROM (SELECT * FROM Person WHERE sex="M") TO @helen SET relation:"love"');
			alasql(
				'CREATE EDGE FROM @john TO (SELECT * FROM Person WHERE sex="M" AND [$id] <> @john) SET relation:"is friend of"'
			);
			done();
		});

		test.skip('4. Create edges', done => {
			alasql('SEARCH / OUT(relation="is friend of") FROM @john');
			alasql(
				'SEARCH / @john ! OUT(relation="is friend of") OUT(relation="loves") (class="Person" AND name="Mary")'
			);
		});

		test.skip('9. DROP DATABASE', done => {
			var res = alasql('DROP DATABASE test301');
			done();
		});

		test.skip('10. CREATE DATABASE', done => {
			var res = alasql('CREATE DATABASE test301a; USE test301a');
			done();
		});

		test.skip('11. CREATE GRAPH', done => {
			alasql(
				'CREATE GRAPH #Olga, #Helen, #Pablo, #Andrey, #Alice, \
        #Olga >> #Pablo, #Helen >> #Andrey, \
        #Pablo >> #Alice, #Andrey >> #Alice'
			);
			// Whom loves Olga?
			var res = alasql('SEARCH #Olga >> name');
			// ['Pablo']

			// Whom loves Olga's love objects?
			var res = alasql('SEARCH #Olga >> >> name');
			// ['Alice']

			// Who loves lovers of Alice?
			var res = alasql('SEARCH ANY(>> >> #Alice) name');
			// ['Olga','Helen']

			// Who loves lovers of Alice?
			var res = alasql('SEARCH #Olga PATH(#Alice) VERTEX name');
			// ['Pablo']
			var res = alasql('SEARCH #Olga PATH(#Alice) EDGE SET(color="red")');
			// ['Pablo']
		});

		test.skip('19. DROP DATABASE', done => {
			var res = alasql('DROP DATABASE test301a');
			done();
		});
	}
});
