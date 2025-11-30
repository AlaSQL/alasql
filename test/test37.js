if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 37 - WHILE with BREAK and CONTINUE statements', function () {
	/**
	 * Supports both T-SQL and SQL-99 syntax:
	 * - T-SQL: BREAK exits the loop, CONTINUE skips to next iteration
	 * - SQL-99: LEAVE exits the loop, ITERATE skips to next iteration
	 *
	 * WHILE condition BEGIN statements END syntax is used (T-SQL style).
	 */

	it('1. Simple WHILE loop without BREAK/CONTINUE', function () {
		var res = alasql('SET @a = 0; WHILE @a < 3 BEGIN SET @a = @a + 1; END; SELECT @a as a');
		assert.deepEqual(res[res.length - 1], [{a: 3}]);
	});

	it('2. WHILE with BREAK - exit loop early', function () {
		var res = alasql(
			'SET @a = 0; WHILE @a < 10 BEGIN SET @a = @a + 1; IF @a = 5 BREAK; END; SELECT @a as a'
		);
		assert.deepEqual(res[res.length - 1], [{a: 5}]);
	});

	it('3. WHILE with CONTINUE - skip iteration', function () {
		var res = alasql(
			'SET @mysum = 0; SET @i = 0; WHILE @i < 5 BEGIN SET @i = @i + 1; IF @i = 3 CONTINUE; SET @mysum = @mysum + @i; END; SELECT @mysum as mysum'
		);
		// Should sum: 1 + 2 + 4 + 5 = 12 (skipping 3)
		assert.deepEqual(res[res.length - 1], [{mysum: 12}]);
	});

	it('4. BREAK immediately (condition true, break on first iteration)', function () {
		var res = alasql(
			'SET @a = 1; WHILE @a < 10 BEGIN IF @a = 1 BREAK; SET @a = @a + 1; END; SELECT @a as a'
		);
		assert.deepEqual(res[res.length - 1], [{a: 1}]);
	});

	it('5. Example from issue - WHILE with BREAK and CONTINUE (original logic)', function () {
		// Using the exact example from the issue
		var res = alasql(`
			SET @a = 1;
			WHILE @a < 10
			BEGIN
				IF @a = 8 BREAK;
				SET @a = @a + 1;
				IF @a = 5 CONTINUE;
				SET @a = @a + 1;
			END;
			SELECT @a as a
		`);
		// This example demonstrates the syntax but the CONTINUE never actually triggers
		// because by the time @a is checked against 5, it's been incremented past 5
		// The BREAK does trigger when @a reaches 8
		assert.deepEqual(res[res.length - 1], [{a: 11}]);
	});

	it('5b. Better example - WHILE with BREAK and CONTINUE that actually triggers', function () {
		// Modified to show CONTINUE actually working
		var res = alasql(`
			SET @a = 0;
			SET @result = 0;
			WHILE @a < 10
			BEGIN
				SET @a = @a + 1;
				IF @a = 8 BREAK;
				IF @a % 2 = 0 CONTINUE;
				SET @result = @result + @a;
			END;
			SELECT @result as result
		`);
		// Adds odd numbers: 1 + 3 + 5 + 7 = 16
		assert.deepEqual(res[res.length - 1], [{result: 16}]);
	});

	it('6. CONTINUE multiple times in one loop', function () {
		var res = alasql(`
			SET @cnt = 0;
			SET @i = 0;
			WHILE @i < 10
			BEGIN
				SET @i = @i + 1;
				IF @i % 2 = 0 CONTINUE;
				SET @cnt = @cnt + 1;
			END;
			SELECT @cnt as cnt
		`);
		// Count only odd numbers: 1, 3, 5, 7, 9 = 5
		assert.deepEqual(res[res.length - 1], [{cnt: 5}]);
	});

	it('7. WHILE with nested IF and BREAK', function () {
		var res = alasql(`
			SET @x = 0;
			WHILE @x < 100
			BEGIN
				SET @x = @x + 1;
				IF @x > 5
				BEGIN
					IF @x = 7 BREAK;
				END;
			END;
			SELECT @x as x
		`);
		assert.deepEqual(res[res.length - 1], [{x: 7}]);
	});

	it('8. WHILE loop that completes without BREAK', function () {
		var res = alasql(`
			SET @mysum = 0;
			SET @i = 1;
			WHILE @i <= 5
			BEGIN
				SET @mysum = @mysum + @i;
				SET @i = @i + 1;
				IF @i > 100 BREAK;
			END;
			SELECT @mysum as mysum
		`);
		// Sum: 1 + 2 + 3 + 4 + 5 = 15
		assert.deepEqual(res[res.length - 1], [{mysum: 15}]);
	});

	it('9. Empty loop with immediate BREAK', function () {
		var res = alasql('SET @a = 1; WHILE @a < 100 BEGIN BREAK; END; SELECT @a as a');
		assert.deepEqual(res[res.length - 1], [{a: 1}]);
	});

	it('10. CONTINUE at end of loop (should work like normal iteration)', function () {
		var res = alasql(`
			SET @a = 0;
			WHILE @a < 3
			BEGIN
				SET @a = @a + 1;
				CONTINUE;
			END;
			SELECT @a as a
		`);
		assert.deepEqual(res[res.length - 1], [{a: 3}]);
	});

	// SQL-99 compatibility tests using LEAVE and ITERATE keywords
	it('11. SQL-99: LEAVE as alias for BREAK', function () {
		var res = alasql(
			'SET @a = 0; WHILE @a < 10 BEGIN SET @a = @a + 1; IF @a = 5 LEAVE; END; SELECT @a as a'
		);
		assert.deepEqual(res[res.length - 1], [{a: 5}]);
	});

	it('12. SQL-99: ITERATE as alias for CONTINUE', function () {
		var res = alasql(
			'SET @mysum = 0; SET @i = 0; WHILE @i < 5 BEGIN SET @i = @i + 1; IF @i = 3 ITERATE; SET @mysum = @mysum + @i; END; SELECT @mysum as mysum'
		);
		// Should sum: 1 + 2 + 4 + 5 = 12 (skipping 3)
		assert.deepEqual(res[res.length - 1], [{mysum: 12}]);
	});

	it('13. SQL-99: LEAVE and ITERATE combined', function () {
		var res = alasql(`
			SET @a = 0;
			SET @result = 0;
			WHILE @a < 10
			BEGIN
				SET @a = @a + 1;
				IF @a = 8 LEAVE;
				IF @a % 2 = 0 ITERATE;
				SET @result = @result + @a;
			END;
			SELECT @result as result
		`);
		// Adds odd numbers: 1 + 3 + 5 + 7 = 16
		assert.deepEqual(res[res.length - 1], [{result: 16}]);
	});
});
