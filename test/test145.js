if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 145 - localStorage', function() {

	it("1. window object", function(done){
		// For browser only // For node - another
		if(typeof exports === 'object') {
			var res = alasql('SELECT key, value FROM ?', [process.argv]);
		} else {
			var res = alasql('SELECT * FROM ? WHERE key = "firstname"', {firstname:"Bruce", lastname:"Lee"});
			var res = alasql('SELECT key, value->textContent FROM ?', [document.getElementsByTags("body")]);
		}
//		alasql('SELECT window->document->getElementsByTags("body")->0->style->background');
//		alasql("SELECT window->([0])->name FROM ? WHERE window->([0])->name",[window]); 
		done();
	});

	it("2. Simple localStorage interface: localStorage as a function", function(done){
		localStorage['one'] = [{a:1,b:2},{a:2,b:4}, {a:3,b:6}];
		localStorage['two'] = 1;
		localStorage['three'] = undefined;

		// Transfer to stdlib
		alasql.fn.localStorage = function(key) {
			return localStorage[key];
		};

		var res = alasql('SELECT * FROM ?', [JSON.parse(localStorage['one'])]);

		var res = alasql('SELECT * FROM ? WHERE a = localStorage("two")', [JSON.parse(localStorage['one'])]);
		localStorage['three'] = JSON.stringify(res);

		done();
	});

	it("2. localStorage as a table name with key, value", function(done){
		var res = alasql('SELECT value FROM localStorage() WHERE key LIKE "mytable."');
		alasql('INSERT INTO localStorage() VALUES ("mytable.1",@[1,2,3]), ("mytable.2",@{a:1,b:2})'); // key=value
		done();
	});

	it("3. localStorage AS a database", function(done){

		// SELECT * FROM localStorage("and")

		alasql('ATTACH DATABASE localStorage');  // Do we really need this?
		alasql('SELECT * INTO localStorage.two FROM localStorage.one');

		alasql('USE localStorage');
		alasql('SHOW TABLES');
		alasql('CREATE TABLE one');

		alasql('BEGIN TRANSACTION');
		alasql('INSERT INTO one VALUES @{a:1,b:10}, @{a:2,b:20}, @{a:1,b:30}, @{a:3, b:40');
		alasql('SELECT * FROM one WHERE a = 1')

		alasql('DELETE FROM one WHERE a = 2');
		alasql('SELECT * FROM one');
		// check localStorage

		alasql('UPDATE one SET b = a*1000 WHERE a = 2');
		alasql('SELECT * FROM one');
		// check localStorage
		alasql('COMMIT TRANSACTION');

		alasql('DROP TABLE one');
		alasql('SHOW TABLES');

		alasql('CREATE TABLE two (a INT PRIMARY KEY, b Object)');
		alasql('INSERT INTO two VALUES @{a:1,b:10}, @{a:2,b:20}, @{a:1,b:30}, @{a:3, b:40');
		alasql('SELECT * FROM two WHERE a = 1');
		alasql('DROP TABLE two');

//;String.fromCharCode(0)

		done();
	});

	it("99. Detach database", function(done){
		alasql('DETACH DATABASE localStorage'); // Do we really need this?
		done();
	});
});

