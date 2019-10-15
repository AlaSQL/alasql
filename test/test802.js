if (typeof exports === 'object') {
    var assert = require('assert');
    var alasql = require('..');
} else {
    __dirname = '.';
}

var test = '802'; // insert test file number
describe('Test 802 - Drop trigger', function() {

	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

    it('1. Dropped trigger does not execute function', function(done) {

        var onChangeCalledCount = 0; 
        var expectedOnChangeCalledCount = 1;
        alasql.fn.onchange = function(r) {
            onChangeCalledCount++;
        }

        alasql('CREATE TABLE one (a INT)');
        alasql('CREATE TRIGGER myTrigger AFTER INSERT ON one CALL onchange()');
        alasql('INSERT INTO one VALUES (123)');  // This will fire onchange()
        alasql('DROP TRIGGER myTrigger');
        alasql('INSERT INTO one VALUES (231)');  // This should not fire onchange()    

                 
        assert.deepEqual(onChangeCalledCount, expectedOnChangeCalledCount);
        done();
    });
});
