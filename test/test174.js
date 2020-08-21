if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 174 - HAVING Clause', function () {
	it('1. FROM without select', function (done) {
		var groups = [
			{id: 4, name: 'abcd', id_group: '1'},
			{id: 5, name: 'efgh', id_group: '1'},
			{id: 6, name: 'ijkl', id_group: '1'},
			{id: 4, name: 'abcd', id_group: '2'},
			{id: 7, name: 'mnop', id_group: '2'},
		];

		// var res = alasql('select id_group, count(id) as cnt from ? where id in (4,7)\
		// group by id_group having cnt = 2',[groups]);
		var res = alasql(
			'select id_group, count(id) as cnt from ? where id in (4,7)\
		group by id_group having count(id) = 2',
			[groups]
		);
		// var res = alasql('select id_group from ? where id in (4,7)\
		// group by id_group having count(id) = 2',[groups]);
		// var res = alasql('select id_group from ? where id in (4,7)\
		// group by id_group having count(id) = 2',[groups]);
		//		console.log(res);
		assert.deepEqual(res, [{id_group: '2', cnt: 2}]);
		done();
	});
});

//};
