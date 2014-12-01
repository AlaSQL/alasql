if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 147 - WebSQL Database', function() {

	it("1. Nested SQL", function(done){
		var res = alasql('CREATE WebSQL DATABASE wd147 ("1.0","My database",1024*1024) AS test147');
		console.log('done', res);
			done();
//			alasql('ATTACH WebSQL DATABASE wd147', [], function() {
//				alasql('USE wd147',[],function() {
//					done();
//				});
//			});
		// });
	});

	it("99. Detach database", function(done){
		 // Do we really need this?
		done();
	});
});

