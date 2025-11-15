// @ts-ignore
import {describe, test, expect} from 'bun:test';
import alasql from '..';
var nums = [29, 30.1, 30.2, 30.3];

var data = [
	{
		i: nums[0],
		date: new Date('2022-11-29'),
	},
	{
		i: nums[1],
		date: new Date('2022-11-30'),
	},
	{
		i: nums[3],
		date: new Date('2022-11-30'),
	},
	{
		i: nums[2],
		date: new Date('2022-11-30'),
	},
];

describe('Test 1496 - Order by Date tests', () => {
	test('Should correctly order by date in an anonymous query', () => {
		var res = alasql.exec('SELECT i FROM ? ORDER BY date, i ASC', [data]);
		expect(Object.values(res).map(r => r.i)).toEqual(nums);
	});

	test('Should correctly order by date in a table query', () => {
		var db = new alasql.Database('MyDB');
		db.exec('CREATE TABLE mytable (i NUMBER, date DATE)');
		db.tables.mytable.data = data;
		var res = db.exec('SELECT i FROM mytable ORDER BY date, i ASC');
		expect(Object.values(res).map(r => r.i)).toEqual(nums);
	});
});
