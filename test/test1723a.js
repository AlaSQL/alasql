if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}


describe('Issue #1723 - tagFunction for template strings', function () {
	it('Will mark free fields as parameters', function (done) {
		assert.deepEqual(tagBraid`SELECT 123 as abc`, ['SELECT 123 as abc']);
		assert.deepEqual(tagBraid`SELECT ${123} as abc`, ['SELECT ? as abc', [123]]);
		assert.deepEqual(tagBraid`${'SELECT'} ${123} as abc`, ['? ? as abc', ['SELECT', 123]]);
		assert.deepEqual(tagBraid`${'SELECT'} ${123} as ${'abc'}`, [
			'? ? as ?',
			['SELECT', 123, 'abc'],
		]);
		done();
	});

	it('Will work second time when data is fetched from the cache', function (done) {
		assert.deepEqual(tagBraid`SELECT 123 as abc`, ['SELECT 123 as abc']);
		assert.deepEqual(tagBraid`SELECT ${123} as abc`, ['SELECT ? as abc', [123]]);
		assert.deepEqual(tagBraid`${'SELECT'} ${123} as abc`, ['? ? as abc', ['SELECT', 123]]);
		assert.deepEqual(tagBraid`${'SELECT'} ${123} as ${'abc'}`, [
			'? ? as ?',
			['SELECT', 123, 'abc'],
		]);
		done();
	});

	it('Will inline connected fields', function (done) {
		assert.deepEqual(tagBraid`S${'ELECT'} 1${23} as ab${'c'}`, ['SELECT 123 as abc', []]);
		assert.deepEqual(tagBraid`SELECT 123 as ${'ab'}${'c'}`, ['SELECT 123 as abc', []]);
		done();
	});

	it('Will treat "()," as free space and become parameter', function (done) {
		assert.deepEqual(tagBraid`SELECT AVG(${1},${2},${3}) as abc`, [
			'SELECT AVG(?,?,?) as abc',
			[1, 2, 3],
		]);
		done();
	});

	it('Can force free fields as inline', function (done) {
		assert.deepEqual(tagBraid`~${'SELECT'} ~${123} as abc`, ['SELECT 123 as abc', []]);
		assert.deepEqual(tagBraid`~${'SELECT'} ~${123} as ${'abc'}`, ['SELECT 123 as ?', ['abc']]);
		assert.deepEqual(tagBraid`${'SELECT'} ${123} as ~${'abc'}`, ['? ? as abc', ['SELECT', 123]]);
		assert.deepEqual(tagBraid`${'SELECT'} ${123} as ~${'abc'}~`, ['? ? as ~abc~', ['SELECT', 123]]);
		assert.deepEqual(tagBraid`SELECT AVG(~${1},~${2},${3}) as abc`, [
			'SELECT AVG(1,2,?) as abc',
			[3],
		]);
		done();
	});

	it('Default to markring as parameter (option B from PR #1512)', function (done) {
		let items = `toys`;
		let type = 'Montessori';
		let item = 'batman';
		let orderBy = `ORDER BY x desc, y asc`;

		let res = tagBraid`
SELECT author 
FROM ${items} 
WHERE 
AND type = ${type}_v2
AND name = ${item} 
~${orderBy}
`;

		let expected = `
SELECT author 
FROM ? 
WHERE 
AND type = Montessori_v2
AND name = ? 
ORDER BY x desc, y asc
`;
		assert.deepEqual(res, [expected, [`toys`, 'batman']]);
		done();
	});

	/*it('Will return a promise', async function (done) {
		let res = alasql`SELECT 123`;
		assert(typeof res.then === 'function');
		assert.equal(await alasql`SELECT 123`.then((x) => 555), 555);
		done();
	});

	it('Will return the data from the query', async function (done) {
		assert.equal(await alasql`VAlUE OF SELECT 123`, 123);
		assert.deepEqual(await alasql`SELECT 123 as abc`, [{abc: 123}]);
		done();
	});

	it('Will inline string connected to other areas', async function (done) {
		assert.deepEqual(await alasql`SELECT 123 as abc`, [{abc: 123}]);
		done();
	});*/
});

const re = {
	preFree: /[\(,\s]~?$/,
	postFree: /^[\),\s]/,
};

const cache = new Map();

function tagBraid(template, ...params) {
	if (
		!Array.isArray(template) ||
		!Array.isArray(template.raw) ||
		template.length - 1 != params.length
	)
		throw 'Please use as tagfunction to provide the right arguments';

	if (1 == template.length) return [template[0]];

	let sql = '';

	let paramsIDs = [];
	if (cache[template.raw]) {
		({sql, paramsIDs} = cache.get(template.raw));
	} else {
		for (let i = 0; i <= params.length; i++) {
			sql += template[i];

			if (i === params.length) break;

			let inline = true;

			// if the field is "free" and not connected to other texts
			if (
				(re.preFree.test(template[i]) ||
					(0 === i && ('' === template[i] || '~' === template[i]))) &&
				(re.postFree.test(template[i + 1]) || (params.length - 1 === i && '' === template[i + 1]))
			) {
				inline = false;
				// force inline if prepended with ~
				if ('~'.charCodeAt(0) === template[i].charCodeAt(template[i].length - 1)) {
					sql = sql.slice(0, -1);
					inline = true;
				}
			}

			if (inline) {
				if (typeof params[i] !== 'number' && typeof params[i] !== 'string')
					console.error(
						'You are inlining a value that is not a string or a number so it might not work. Will proceed with the .toString() value but consider making space around the value so it can be provided as a parameter.',
						{parameter: params[i], template: template.raw}
					);
				sql += params[i].toString();
			} else {
				sql += '?';
				paramsIDs.push(i);
			}
		}
		cache.set(template.raw, {sql, paramsIDs});
	}

	return [sql, [...paramsIDs.map((x) => params[x])]];
}
