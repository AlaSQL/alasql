if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 207 WHILE', function () {
	it('1. FALSE WHILE', function (done) {
		var res = alasql('WHILE FALSE SELECT VALUE 1; SELECT VALUE 2');
		//        console.log(res);
		assert.deepEqual(res, [[], 2]);
		done();
	});

	it('2. ONE WHILE ASYNC', function (done) {
		alasql(
			' \
            SET @cnt = 0; \
            WHILE @cnt < 3 \
                SET @cnt = @cnt+1; \
            ',
			[],
			function (res) {
				//                console.log("ASYNC:",res);
				assert.deepEqual(res, [1, [1, 1, 1]]);
				done();
			}
		);
	});

	it('3. ONE WHILE SYNC', function (done) {
		var res = alasql(
			' \
            SET @cnt = 0; \
            WHILE @cnt < 3 \
                SET @cnt = @cnt+1; \
            '
		);
		// console.log("SYNC:",res);
		assert.deepEqual(res, [1, [1, 1, 1]]);
		done();
	});

	it('4. Basic nested WHILE with variable updates', function (done) {
		var res = alasql(`
			SET @thisRow = 1;
			
			WHILE @thisRow <= 2
			BEGIN
				SET @newLineCnt = 5;
				WHILE @newLineCnt <= 7
				BEGIN
					SET @newLineCnt = @newLineCnt + 1
				END;
				SET @thisRow = @thisRow + 1;
			END;
			
			SELECT @thisRow as outerVar, @newLineCnt as innerVar;
		`);
		
		var finalResult = res[res.length - 1][0];
		assert.equal(finalResult.outerVar, 3, 'Outer variable should be 3');
		assert.equal(finalResult.innerVar, 8, 'Inner variable should be 8');
		done();
	});

	it('5. Triple nested WHILE loops', function (done) {
		var res = alasql(`
			SET @level1 = 1;
			SET @level2 = 0;
			SET @level3 = 0;
			
			WHILE @level1 <= 2
			BEGIN
				SET @level2 = 1;
				WHILE @level2 <= 2
				BEGIN
					SET @level3 = 1;
					WHILE @level3 <= 3
					BEGIN
						SET @level3 = @level3 + 1;
					END;
					SET @level2 = @level2 + 1;
				END;
				SET @level1 = @level1 + 1;
			END;
			
			SELECT @level1 as l1, @level2 as l2, @level3 as l3;
		`);
		
		var finalResult = res[res.length - 1][0];
		assert.equal(finalResult.l1, 3, 'Level 1 variable should be 3');
		assert.equal(finalResult.l2, 3, 'Level 2 variable should be 3');
		assert.equal(finalResult.l3, 4, 'Level 3 variable should be 4');
		done();
	});

	it('6. Nested WHILE with multiplication accumulator', function (done) {
		var res = alasql(`
			SET @result = 0;
			SET @i = 1;
			
			WHILE @i <= 3
			BEGIN
				SET @j = 1;
				WHILE @j <= 4
				BEGIN
					SET @result = @result + (@i * @j);
					SET @j = @j + 1;
				END;
				SET @i = @i + 1;
			END;
			
			SELECT @result as totalSum, @i as finalI, @j as finalJ;
		`);
		
		var finalResult = res[res.length - 1][0];
		// Expected: (1*1 + 1*2 + 1*3 + 1*4) + (2*1 + 2*2 + 2*3 + 2*4) + (3*1 + 3*2 + 3*3 + 3*4)
		// = (10) + (20) + (30) = 60
		assert.equal(finalResult.totalSum, 60, 'Total sum should be 60');
		assert.equal(finalResult.finalI, 4, 'Final i should be 4');
		assert.equal(finalResult.finalJ, 5, 'Final j should be 5');
		done();
	});

	it('7. Single WHILE loop regression test', function (done) {
		var res = alasql(`
			SET @counter = 1;
			
			WHILE @counter <= 5
			BEGIN
				SET @counter = @counter + 1;
			END;
			
			SELECT @counter as final;
		`);
		
		var finalResult = res[res.length - 1][0];
		assert.equal(finalResult.final, 6, 'Counter should be 6');
		done();
	});

	it('8. Nested WHILE with early exit conditions', function (done) {
		var res = alasql(`
			SET @outerIdx = 0;
			SET @innerIdx = 0;
			SET @totalCount = 0;
			
			WHILE @outerIdx < 5
			BEGIN
				SET @outerIdx = @outerIdx + 1;
				SET @innerIdx = 0;
				WHILE @innerIdx < @outerIdx
				BEGIN
					SET @innerIdx = @innerIdx + 1;
					SET @totalCount = @totalCount + 1;
				END;
			END;
			
			SELECT @outerIdx as outerCount, @totalCount as totalIterations;
		`);
		
		var finalResult = res[res.length - 1][0];
		// Total iterations: 1 + 2 + 3 + 4 + 5 = 15
		assert.equal(finalResult.outerCount, 5, 'Outer count should be 5');
		assert.equal(finalResult.totalIterations, 15, 'Total iterations should be 15');
		done();
	});

	it('9. Nested WHILE with conditional logic', function (done) {
		var res = alasql(`
			SET @x = 1;
			SET @cnt = 0;
			
			WHILE @x <= 3
			BEGIN
				SET @y = 1;
				WHILE @y <= 3
				BEGIN
					IF @x = @y
					BEGIN
						SET @cnt = @cnt + 1;
					END;
					SET @y = @y + 1;
				END;
				SET @x = @x + 1;
			END;
			
			SELECT @cnt as diagonalCount;
		`);
		
		var finalResult = res[res.length - 1][0];
		// Count when x equals y: (1,1), (2,2), (3,3) = 3
		assert.equal(finalResult.diagonalCount, 3, 'Diagonal count should be 3');
		done();
	});

	it('10. ASYNC nested WHILE loops', function (done) {
		alasql(`
			SET @async_outer = 1;
			
			WHILE @async_outer <= 2
			BEGIN
				SET @async_inner = 1;
				WHILE @async_inner <= 3
				BEGIN
					SET @async_inner = @async_inner + 1;
				END;
				SET @async_outer = @async_outer + 1;
			END;
			
			SELECT @async_outer as outerVal, @async_inner as innerVal;
		`, [], function(res) {
			var finalResult = res[res.length - 1][0];
			assert.equal(finalResult.outerVal, 3, 'Async outer variable should be 3');
			assert.equal(finalResult.innerVal, 4, 'Async inner variable should be 4');
			done();
		});
	});
});
