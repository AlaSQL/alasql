if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 210 WHILE BREAK CONTINUE', function() {

    it("1. WHILE BREAK", function(done) {
        alasql('SET @i = 1; \
            WHILE @i < 5 \
            BEGIN \
                PRINT @i;\
                SET @i = @i + 1;\
                IF @i = 2 CONTINUE; \
                PRINT @i*10;\
             END',[],function(){
                console.log('ok');
                done();
            });
    });

});

