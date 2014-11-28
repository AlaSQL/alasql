if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 146 - Async Tests', function() {

	var myfn = function(n,cb) {
		alasql.busy++;
		setTimeout(function(){
			alasql.busy--;
			if(n > 3) cb();
			else cb({a:n,b:n*2});
		});
	};

	it("1. Nested SQL", function(done){
		alasql('CREATE DATABASE test146',[],function(){
			alasql('USE test146',[],function(){
				alasql('SELECT * FROM ?',[myfn],function(res){
					console.log(res);
					alasql('DROP DATABASE test146',[],function(){
						done();
					});
				});
			});
		});
	});

	it("99. Detach database", function(done){
		 // Do we really need this?
		done();
	});
});

