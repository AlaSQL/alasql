// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 210 WHILE BREAK CONTINUE', function () {
	/** @todo Add CONTINUE operator */

	// please let done depend on output
	test.skip('1. WHILE BREAK', function (done) {
		alasql(
			'SET @i = 1; \
            WHILE @i < 5 \
            BEGIN \
                -- PRINT 1,@i, @i*10;\
                SET @i = @i + 1;\
                IF @i % 2 = 0 CONTINUE; \
                -- PRINT "ODD"\
                ;\
             END',
			[],
			function () {
				/// console.log('ok');
				done();
			}
		);
	});
});
