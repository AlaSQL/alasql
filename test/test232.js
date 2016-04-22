if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 232 Errors handling', function() {

	before(function(){
        alasql('CREATE DATABASE test232; USE test232;');
	});

	after(function(){
        alasql('set errorlog off');
        alasql('DROP DATABASE test232');
    });


    it("2. Throw error", function(done) {
        alasql('set errorlog off');
        assert.throws(function(){
            alasql('SELECT * FROM faultyName', [], function(data,err){
            });            
        },Error);
        done();
    });

    it("3. Log error async", function(done) {
        alasql('set errorlog on');
        alasql('SELECT * FROM faultyName', [], function(data,err){
            assert(/^Table does not exists\:/.test(err.message));
        	done();
        });            
        
    });

    it("4. Log error sync", function() {
        alasql('set errorlog on');
        alasql('SELECT * FROM faultyName');
        assert(/^Table does not exists\:/.test(alasql.error.message));
        
        alasql('SELECT * FROM ?',[{a:1},{a:2}]);
        assert(!alasql.error); 
    });


});

