if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

describe('374. Miscellaneous functions tests', function() {
    it("1. ", function(done) {

        var tests = `
SELECT(CEIL(17.36)) -- 18
SELECT CEIL(-17.36) --  -17
SELECT CEILING(12.9273) -- 13
SELECT FLOOR(12.9273)  -- 12    

DECLARE @val int
SET @val = 6

SELECT ROUND(@val, 1)  -- 6 - No rounding with no digits right of the decimal point
SELECT CEILING(@val)   -- 6 - Smallest integer value
SELECT FLOOR(@val)     -- 6 - Largest integer value 

DECLARE @val int
SET @val = 6

SELECT ROUND(@val, 1)  -- 6  - No rounding with no digits right of the decimal point
SELECT ROUND(@val, -1) -- 10 - Rounding up with digits on the left of the decimal point
SELECT ROUND(@val, 2)  -- 6  - No rounding with no digits right of the decimal point 
SELECT ROUND(@val, -2) -- 0  - Insufficient number of digits
SELECT ROUND(@val, 3)  -- 6  - No rounding with no digits right of the decimal point
SELECT ROUND(@val, -3) -- 0  - Insufficient number of digits

SELECT ROUND(444,  1) -- 444  - No rounding with no digits right of the decimal point
SELECT ROUND(444, -1) -- 440  - Rounding down
SELECT ROUND(444,  2) -- 444  - No rounding with no digits right of the decimal point
SELECT ROUND(444, -2) -- 400  - Rounding down
SELECT ROUND(444,  3) -- 444  - No rounding with no digits right of the decimal point
SELECT ROUND(444, -3) -- 0    - Insufficient number of digits
SELECT ROUND(444,  4) -- 444  - No rounding with no digits right of the decimal point
SELECT ROUND(444, -4) -- 0    - Insufficient number of digits

SELECT ROUND(555,  1) -- 555  - No rounding with no digits right of the decimal point
SELECT ROUND(555, -1) -- 560  - Rounding up
SELECT ROUND(555,  2) -- 555  - No rounding with no digits right of the decimal point
SELECT ROUND(555, -2) -- 600  - Rounding up
SELECT ROUND(555,  3) -- 555  - No rounding with no digits right of the decimal point
SELECT ROUND(555, -3) -- 1000 - Rounding up
SELECT ROUND(555,  4) -- 555  - No rounding with no digits right of the decimal point
SELECT ROUND(555, -4) -- 0    - Insufficient number of digits

SELECT ROUND(666,  1) -- 666  - No rounding with no digits right of the decimal point
SELECT ROUND(666, -1) -- 670  - Rounding up
SELECT ROUND(666,  2) -- 666  - No rounding with no digits right of the decimal point
SELECT ROUND(666, -2) -- 700  - Rounding up
SELECT ROUND(666,  3) -- 666  - No rounding with no digits right of the decimal point
SELECT ROUND(666, -3) -- 1000 - Rounding up
SELECT ROUND(666,  4) -- 666  - No rounding with no digits right of the decimal point
SELECT ROUND(666, -4) -- 0    - Insufficient number of digits

SELECT ROUND(-444, -1) -- -440  - Rounding down
SELECT ROUND(-444, -2) -- -400  - Rounding down

SELECT ROUND(-555, -1) -- -560  - Rounding up
SELECT ROUND(-555, -2) -- -600  - Rounding up

SELECT ROUND(-666, -1) -- -670  - Rounding up
SELECT ROUND(-666, -2) -- -700  - Rounding up


DECLARE @val int
SET @val = 16.999999

SELECT ROUND(@val,  1) -- 16 - No rounding with no digits right of the decimal point i.e. int
SELECT ROUND(@val, -1) -- 20 - Round up
SELECT CEILING(@val)   -- 16 - Smallest integer value
SELECT FLOOR(@val)     -- 16 - Largest integer value 
SELECT @val            -- 16 - Shows how the @val is evaluated based on the int data type 

DECLARE @val float
SET @val = 11.05

SELECT ROUND(@val, 1)  -- 11.10
SELECT ROUND(@val, -1) -- 10.00 

SELECT ROUND(@val, 2)  -- 11.05 
SELECT ROUND(@val, -2) -- 0.00 

SELECT ROUND(@val, 3)  -- 11.05
SELECT ROUND(@val, -3) -- 0.00

SELECT CEILING(@val)   -- 12 
SELECT FLOOR(@val)     -- 11 

DECLARE @val numeric(10,10)
SET @val = .5432167890
SELECT ROUND(@val, 1)  -- 0.5000000000 
SELECT ROUND(@val, 2)  -- 0.5400000000
SELECT ROUND(@val, 3)  -- 0.5430000000
SELECT ROUND(@val, 4)  -- 0.5432000000
SELECT ROUND(@val, 5)  -- 0.5432200000
SELECT ROUND(@val, 6)  -- 0.5432170000
SELECT ROUND(@val, 7)  -- 0.5432168000
SELECT ROUND(@val, 8)  -- 0.5432167900
SELECT ROUND(@val, 9)  -- 0.5432167890
SELECT ROUND(@val, 10) -- 0.5432167890
SELECT CEILING(@val)   -- 1
SELECT FLOOR(@val)     -- 0

DECLARE @val float(10)
SET @val = .1234567890
SELECT ROUND(@val, 1)  -- 0.1
SELECT ROUND(@val, 2)  -- 0.12
SELECT ROUND(@val, 3)  -- 0.123
SELECT ROUND(@val, 4)  -- 0.1235
SELECT ROUND(@val, 5)  -- 0.12346
SELECT ROUND(@val, 6)  -- 0.123457
SELECT ROUND(@val, 7)  -- 0.1234568
SELECT ROUND(@val, 8)  -- 0.12345679
SELECT ROUND(@val, 9)  -- 0.123456791
SELECT ROUND(@val, 10) -- 0.123456791
SELECT CEILING(@val)   -- 1
SELECT FLOOR(@val)     -- 0

`;

        success = true;
        tests.split('\n').forEach(function(test){
//            console.log(test);
            if(test.indexOf('--')>-1) {
                var tt = test.split('--');
                var sql = tt[0];
                var etalon = +tt[1].split(' - ')[0];
                var res = alasql('VALUE OF '+sql);
                if(res != etalon) {
                    console.log(test,' => ',res);
                    success = success && false;
                }
            } else {
                if(test.length > 0) alasql(test);
            }

        });
        assert(success);
        done();
    });
});
