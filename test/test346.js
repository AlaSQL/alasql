if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//

//http://stackoverflow.com/questions/18811265/sql-creating-temporary-variables
//

describe('Test 337 SEARCH 8 queens', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test337;USE test337');
		done();
	});

	it.skip('2. SEARCH 8 queens', function(done) {
		var res = alasql(function() {
			/*

    select 'a' || a A, 'b' || b B, 'c' || c C, 'd' || d D, 'e' || e E, 'f' || f F, 'g' || g G, 'h' || h H
    from
    (
    select a, b, c, d, e, f, g, h ,
     case when a = b or a = b - 1 or a = b + 1 or a = c or a = c - 2 or a = c + 2 or a = d or a = d - 3 or a = d + 3 or a = e or a = e - 4 or a = e + 4 or a = f or a = f - 5 or a = f + 5 or a = g or a = g - 6 or a = g + 6 or a = h or a = h - 7 or a = h + 7 
        then 0 
        else case when b = c or b = c - 1 or b = c + 1 or b = d or b = d - 2 or b = d + 2 or b = e or b = e - 3 or b = e + 3 or b = f or b = f - 4 or b = f + 4 or b = g or b = g - 5 or b = g + 5 or b = h or b = h - 6 or b = h + 6
            then 0
            else case when c = d or c = d - 1 or c = d + 1 or c = e or c = e - 2 or c = e + 2 or c = f or c = f - 3 or c = f + 3 or c = g or c = g - 4 or c = g + 4 or c = h or c = h - 5 or c = h + 5
                 then 0
                 else case when d = e or d = e - 1 or d = e + 1 or d = f or d = f - 2 or d = f + 2 or d = g or d = g - 3 or d = g + 3 or d = h or d = h - 4 or d = h + 4
                    then 0
                    else case when e = f or e = f - 1 or e = f + 1 or e = g or e = g - 2 or e = g + 2 or e = h or e = h - 3 or e = h + 3
                         then 0
                         else case when f = g or f = g - 1 or f = g + 1 or f = h or f = h - 2 or f = h + 2
                           then 0
                           else case when g = h or g = h - 1 or g = h + 1
                                then 0
                                else 1
                           end
                         end
                    end
                 end               
               end
            end
     end chk
    from
    (select level a from dual connect by level <= 8)
    cross join
    (select level b from dual connect by level <= 8)
    cross join
    (select level c from dual connect by level <= 8)
    cross join
    (select level d from dual connect by level <= 8)
    cross join
    (select level e from dual connect by level <= 8)
    cross join
    (select level f from dual connect by level <= 8)
    cross join
    (select level g from dual connect by level <= 8)
    cross join
    (select level h from dual connect by level <= 8)
    )
    where chk = 1
    */
		});

		console.log(res);
		assert.deepEqual(res, 1);
		done();
	});
	if (false) {
		it.skip('2. SEARCH 8 queens', function(done) {
			var res = alasql(function() {
				/*
    
    search times(
        ^/ as @f 
        where(
          @f not in @h 
          and (@f-@i) not in @d 
          and (8-@i-@f) not in @g
        )
        @f to @h 
        ex(@f-@i) to @d 
        ex(8-@i-@f) to @g,
      0,7,@i) 
      return @h
    from range(1,8)

    */
			});
			assert.deepEqual(res, 1);
			done();
		});

		it.skip('99. DROP DATABASE', function(done) {
			alasql('DROP DATABASE test337');
			done();
		});
	}
});
