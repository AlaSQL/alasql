if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports == 'object') {

	var DOMStorage = require("dom-storage")
	global.localStorage = new DOMStorage("./test159.json", { strict: false, ws: '' });

};

describe('Test 159 - test DOM-storage', function() {

	it("1. Test ", function(done){
		var res = alasql("drop localstorage database if exists test159");
		assert(res == 0 || res == 1);

		var res = alasql("create localstorage database if not exists test159");
		assert(res == 0 || res == 1);

		res = alasql('attach localstorage database test159');
		assert(res == 1);

		res = alasql('use test159');
		assert(res == 1);

		res = alasql('drop table if exists cities');
		assert(res == 0 || res == 1);

		res = alasql('create table cities (city string)');
		assert(res == 1);

		res = alasql("insert into cities values ('Moscow'),('Paris'),('Minsk'),('Riga'),('Tallinn')");
		assert(res == 5);

		res = alasql("select column * from cities where city like 'M%' order by city");
		assert.deepEqual(res,['Minsk','Moscow']);

		res = alasql('delete from cities where city in ("Riga","Tallinn","Moscow")');
		assert(res == 3);

		res = alasql('select column * from cities order by city');
		assert.deepEqual(res, ["Minsk","Paris"]);

		res = alasql("update cities set city = 'Vilnius' where city = 'Minsk'");
		assert(res == 1);

		res = alasql('select column * from cities order by city');
		assert.deepEqual(res, ["Paris","Vilnius"]);

		res = alasql("insert into cities values ('Berlin')");
		assert(res == 1);

		res = alasql('select column * from cities order by city');
		assert.deepEqual(res, ["Berlin","Paris","Vilnius"]);


		res = alasql('detach database test159; \
				drop localstorage database test159');
		assert.deepEqual(res,[1,1]);

		done();
	});


	it("2. Multiple statements ", function(done){
		var res = alasql("drop localstorage database if exists test159;\
			create localstorage database if not exists test159;\
			attach localstorage database test159;\
			use test159;\
			drop table if exists cities;\
			create table cities (city string);\
			insert into cities values ('Moscow'),('Paris'),('Minsk'),('Riga'),('Tallinn');\
			delete from cities where city in ('Riga','Tallinn','Moscow'); \
			update cities set city = 'Vilnius' where city = 'Minsk';\
			insert into cities values ('Berlin')");

		res = alasql('select column * from cities order by city');
		assert.deepEqual(res, ["Berlin","Paris","Vilnius"]);

		res = alasql('detach database test159; \
				drop localstorage database test159');
		assert.deepEqual(res,[1,1]);

		done();
	});

	it("3. Multiple call-backs", function(done){
		var res = alasql("drop localstorage database if exists test159",[],function(res){
			alasql("create localstorage database if not exists test159;",[], function(res){
				alasql("attach localstorage database test159",[],function(res){
					alasql("use test159",[],function(res){
						alasql("drop table if exists cities",[],function(res){
							alasql("create table cities (city string);",[],function(res){
								alasql("insert into cities values ('Moscow'),('Paris'),('Minsk'),\
									('Riga'),('Tallinn')",[],function(res){
									alasql("delete from cities where city in ('Riga','Tallinn','Moscow')",[],function(res){
										alasql("update cities set city = 'Vilnius' where city = 'Minsk'",[],function(res){
											alasql("insert into cities values ('Berlin')", [], function(res){
												alasql('select column * from cities order by city',[],function(res){
													assert.deepEqual(res, ["Berlin","Paris","Vilnius"]);
													alasql("detach database test159",[],function(res){
														assert(res==1);
														alasql("drop localstorage database test159",[], function(res){
															assert(res==1);
															done();
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});

	});


/*

//if(false) {
	it("1. Test ", function(done){
		alasql("create localstorage database if not exists test159; \
			attach localstorage database test159; \
			use test159; \
			drop table if exists cities; \
			create table cities (city string)",[], function(res) {
				assert.deepEqual(res, [1,1,1,1,1]);
				alasql("insert into cities values ('Moscow'),('Paris'),('Minsk'),('Riga'),('Tallinn')",[],function(res){
					assert(res,5);
					alasql("select column * from cities where city like 'M%' order by city", [], function(res){
						assert.deepEqual(res,['Minsk','Moscow']);
						done();
					});
				});

		});

	});

	it("2. UPDATE and DELETE", function(done){

		alasql("update cities set city = 'Vilnius' where city = 'Minsk'", [], function(res){
			assert(res == 1);
			alasql('delete from cities where city in ("Riga","Tallinn","Moscow")', [], function(res) {
				assert(res == 3);
				alasql('select column * from cities order by city', [], function(res) {
					assert.deepEqual(res, ["Berlin","Paris","Vilnius"]);
					done();
				});
			});
		});

	});

	it("99. Drop database", function(done){
		alasql('detach database test159;\
				drop localstorage database test159');
		done();
	});
//};
// */
});


