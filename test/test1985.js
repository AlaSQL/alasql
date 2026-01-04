if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1985 - SELECT field on joined tables gives unexpected undefined', function () {
	const test = '1985';

	it('A) SELECT * works correctly', function () {
		const users = [{UserId: '1', UserName: 'User'}];
		const orders = [{UserId: '1', Text: 'Order text'}];

		const expected = alasql(
			`
  SELECT *
  FROM ? u 
  JOIN ? o 
  ON u.UserId = o.UserId`,
			[users, orders]
		);

		// Should have all fields
		assert.deepStrictEqual(expected, [
			{
				UserId: '1',
				UserName: 'User',
				Text: 'Order text',
			},
		]);
	});

	it('B) SELECT specific fields should not return undefined', function () {
		const users = [{UserId: '1', UserName: 'User'}];
		const orders = [{UserId: '1', Text: 'Order text'}];

		const result = alasql(
			`
  SELECT UserName, Text 
  FROM ? u 
  JOIN ? o 
  ON u.UserId = o.UserId`,
			[users, orders]
		);

		// Both fields should be defined
		assert.deepStrictEqual(result, [
			{
				UserName: 'User',
				Text: 'Order text',
			},
		]);
	});

	it('C) SELECT single field from second table', function () {
		const users = [{UserId: '1', UserName: 'User'}];
		const orders = [{UserId: '1', Text: 'Order text'}];

		const result = alasql(
			`
  SELECT Text 
  FROM ? u 
  JOIN ? o 
  ON u.UserId = o.UserId`,
			[users, orders]
		);

		// Text field should be defined
		assert.deepStrictEqual(result, [
			{
				Text: 'Order text',
			},
		]);
	});

	it('D) SELECT with table aliases', function () {
		const users = [{UserId: '1', UserName: 'User'}];
		const orders = [{UserId: '1', Text: 'Order text'}];

		const result = alasql(
			`
  SELECT u.UserName, o.Text 
  FROM ? u 
  JOIN ? o 
  ON u.UserId = o.UserId`,
			[users, orders]
		);

		// Both fields should be defined
		assert.deepStrictEqual(result, [
			{
				UserName: 'User',
				Text: 'Order text',
			},
		]);
	});
});
