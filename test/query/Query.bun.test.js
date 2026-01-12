import {describe, expect, test} from 'bun:test';
import {Query, registerQuery} from '../../src/query/Query.js';

describe('Query class', () => {
	test('creates query with default values', () => {
		const query = new Query();
		expect(query.columns).toStrictEqual([]);
		expect(query.sources).toStrictEqual([]);
		expect(query.data).toStrictEqual([]);
		expect(query.where).toBeNull();
	});

	test('creates query with params', () => {
		const query = new Query({limit: 10, offset: 5});
		expect(query.limit).toBe(10);
		expect(query.offset).toBe(5);
	});

	test('reset clears execution state', () => {
		const query = new Query();
		query.data = [{x: 1}];
		query.groups = [{g: 1}];
		query.xgroups = {key: 'value'};
		query.subqueryCache = {q1: []};

		query.reset();

		expect(query.data).toStrictEqual([]);
		expect(query.groups).toStrictEqual([]);
		expect(query.xgroups).toStrictEqual({});
		expect(query.subqueryCache).toStrictEqual({});
	});

	test('registerQuery attaches Query to alasql', () => {
		const mockAlasql = {};
		registerQuery(mockAlasql);
		expect(mockAlasql.Query).toBe(Query);
	});
});
