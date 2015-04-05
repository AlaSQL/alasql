if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

// See http://www.codeproject.com/Articles/300785/Calculating-simple-running-totals-in-SQL-Server
describe('Test 232 Errors handling', function() {

    it('1. Prepare database', function(done){
        alasql('CREATE DATABASE test232; USE test232;');
        done();
    });

    it("2. Throw error", function(done) {
        alasql('set errorlog off');
        assert.throws(function(){
            alasql('SELECT * FROM one', [], function(data,err){
                console.log(err);
            });            
        },Error);
        done();
    });

    it("3. Log error async", function(done) {
        alasql('set errorlog on');
        alasql('SELECT * FROM one', [], function(data,err){
            assert(err.message == "Cannot read property 'columns' of undefined");
        });            
        done();
    });

    it("4. Log error sync", function(done) {
        alasql('set errorlog on');
        alasql('SELECT * FROM one');
        assert(alasql.error.message == "Cannot read property 'columns' of undefined");
        alasql('SELECT * FROM ?',[{a:1},{a:2}]);
        assert(!alasql.error); 
        done();
    });

    it('99. DROP', function(done){
        alasql('set errorlog off');
        alasql('DROP DATABASE test232');
        done();
    });

});

