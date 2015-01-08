if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 212 CONVERT', function() {

    it("1. CONVERT DATES", function(done) {
        alasql('SET @d = DATE("01/08/2015 12:34:56.789"); \
            SELECT ROW \
                CONVERT(STRING,@d,1),\
                CONVERT(STRING,@d,2),\
                CONVERT(STRING,@d,3),\
                CONVERT(STRING,@d,4),\
                CONVERT(STRING,@d,5),\
                CONVERT(STRING,@d,6),\
                CONVERT(STRING,@d,7),\
                CONVERT(STRING,@d,8),\
                CONVERT(STRING,@d,10),\
                CONVERT(STRING,@d,11),\
                CONVERT(STRING,@d,12),\
                CONVERT(STRING,@d,101),\
                CONVERT(STRING,@d,102),\
                CONVERT(STRING,@d,103),\
                CONVERT(STRING,@d,104),\
                CONVERT(STRING,@d,105),\
                CONVERT(STRING,@d,106),\
                CONVERT(STRING,@d,107),\
                CONVERT(STRING,@d,108),\
                CONVERT(STRING,@d,110),\
                CONVERT(STRING,@d,111),\
                CONVERT(STRING,@d,112)\
            ',[],function(res){
                assert(res,
[ 1,
  [ '01/08/15',
    '15.01.08',
    '08/01/15',
    '08.01.15',
    '08-01-15',
    '08 jan 15',
    'Jan 08,15',
    '12:35:56',
    '01-08-15',
    '15/01/08',
    '150108',
    '01/08/2015',
    '2015.01.08',
    '08/01/2015',
    '08.01.2015',
    '08-01-2015',
    '08 jan 2015',
    'Jan 08,2015',
    '12:35:56',
    '01-08-2015',
    '2015/01/08',
    '20150108' ] ]


                );
                done();
            });
    });

});

