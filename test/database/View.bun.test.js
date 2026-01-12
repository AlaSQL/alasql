import {describe, expect, test} from 'bun:test';
import {View, registerView} from '../../src/database/View.js';

describe('View class', () => {
	test('creates empty view', () => {
		const view = new View();
		expect(view.columns).toStrictEqual([]);
		expect(view.xcolumns).toStrictEqual({});
		expect(view.query).toStrictEqual([]);
	});

	test('creates view with params', () => {
		const view = new View({viewid: 'myview'});
		expect(view.viewid).toBe('myview');
	});

	test('creates view with query', () => {
		const query = {select: [{columnid: 'name'}], from: [{tableid: 'users'}]};
		const view = new View({query});
		expect(view.query).toBe(query);
	});

	test('indexColumns builds xcolumns from columns', () => {
		const view = new View();
		view.columns = [{columnid: 'id'}, {columnid: 'name'}];
		view.indexColumns();
		expect(view.xcolumns.id).toBeDefined();
		expect(view.xcolumns.name).toBeDefined();
	});

	test('registerView attaches View to alasql', () => {
		const mockAlasql = {};
		registerView(mockAlasql);
		expect(mockAlasql.View).toBe(View);
	});
});
