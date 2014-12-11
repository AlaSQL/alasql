if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 158 - INSERT/DELETE/UPDATE in IndexedDB', function() {

	it("1. Create table and INSERT", function(done){

		alasql("create indexeddb database if not exists test158; \
			attach indexeddb database test158; \
			use test158; \
			drop table if exists cities; \
			create table cities (city string)",[], function(res) {
			res[0] = 1;
			assert.deepEqual(res, [1,1,1,1,1]);
//				console.log(20);
			alasql("insert into cities values ('Moscow'),('Paris'),('Minsk'),('Riga'),('Tallinn')",[],function(res){
//				console.log(22);
				assert(res,5);
				alasql("select column * from cities where city like 'M%' order by city", [], function(res){
//				console.log(25, res);
					assert.deepEqual(res,['Minsk','Moscow']);
					alasql('delete from cities where city in ("Riga","Tallinn","Moscow")', [], function(res) {
						assert(res == 3);
						alasql('select column * from cities order by city', [], function(res) {
							assert.deepEqual(res, ["Minsk","Paris"]);
							alasql("update cities set city = 'Vilnius' where city = 'Minsk'", [], function(res){
								assert(res == 1);
								alasql('select column * from cities order by city', [], function(res) {
									assert.deepEqual(res, ["Paris","Vilnius"]);
//console.log(res);
									alasql('detach database test158',[],function(res) {
			//							console.log(52);
										assert(res==1);
										alasql('drop indexeddb database test158',[],function(res){
			//								console.log(51,res);
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

}

