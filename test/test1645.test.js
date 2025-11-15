// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 1645', () => {
	test('variable assigned from query should work properly', () => {
		var sql = `
			CREATE TABLE cities (city string, population number);
			INSERT INTO cities VALUES ('Rome',2863223),('Paris',2249975),('Berlin',3517424), ('Madrid',3041579);
			SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC;
			declare @X NUMBER = (select MAX(population) from cities);`;

		alasql(sql);
		var x = alasql.vars.X;
		expect(x).toEqual(3517424);
	});
});
