if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '1208'; // CAST / CONVERT of NULL should stay NULL (undefined)

describe(`Test ${testId} - CAST and CONVERT of NULL`, function () {
	const data = [
		{
			FILTER_COL: 'COL1',
			TEST_COL2: 'COL2',
			TEST_COL3: 'UNIQ VAL 3',
			TOTAL_COST: 1500,
			'DYNAMIC COL1': null,
		},
		{
			FILTER_COL: 'COL1',
			TEST_COL2: 'COL2',
			TEST_COL3: 'UNIQ VAL 33',
			TOTAL_COST: 100,
			'DYNAMIC COL2': null,
			'DYNAMIC COL3': null,
		},
		{
			FILTER_COL: 'COL3',
			TEST_COL2: 'UNIQ VAL 222',
			TEST_COL3: 'UNIQ VAL 333',
			TOTAL_COST: 100,
			'DYNAMIC COL2': null,
			'DYNAMIC COL5': null,
		},
		{
			FILTER_COL: 'COL3',
			TEST_COL2: 'UNIQ VAL 2222',
			TEST_COL3: 'UNIQ VAL 3333',
			TOTAL_COST: 100,
			'DYNAMIC COL4': null,
			'DYNAMIC COL5': null,
		},
	];

	const avgs = ['DYNAMIC COL1', 'DYNAMIC COL2', 'DYNAMIC COL3', 'DYNAMIC COL4', 'DYNAMIC COL5']
		.map((c, i) => `AVG(CAST(\`${c}\` AS NUMBER)) AS a${i + 1}`)
		.join(', ');
	const noAvg = {a1: undefined, a2: undefined, a3: undefined, a4: undefined, a5: undefined};

	it('A) AVG(CAST(x AS NUMBER)) over NULL values is undefined, not 0 (issue example 1)', function () {
		const res = alasql(
			`SELECT TEST_COL2, SUM(TOTAL_COST) AS cost, ${avgs}
				FROM ? WHERE FILTER_COL = ? GROUP BY TEST_COL2`,
			[data, 'COL1']
		);
		assert.deepStrictEqual(res, [{TEST_COL2: 'COL2', cost: 1600, ...noAvg}]);
	});

	it('B) AVG(CAST(x AS NUMBER)) over NULL values is undefined, not 0 (issue example 2)', function () {
		const res = alasql(
			`SELECT TEST_COL3, SUM(TOTAL_COST) AS cost, ${avgs}
				FROM ? WHERE FILTER_COL = ? GROUP BY TEST_COL3`,
			[data, 'COL3']
		);
		assert.deepStrictEqual(res, [
			{TEST_COL3: 'UNIQ VAL 333', cost: 100, ...noAvg},
			{TEST_COL3: 'UNIQ VAL 3333', cost: 100, ...noAvg},
		]);
	});

	it('C) CAST(NULL AS <type>) returns undefined for every type', function () {
		const types = [
			'NUMBER',
			'INT',
			'INTEGER',
			'SMALLINT',
			'BIGINT',
			'FLOAT',
			'DECIMAL(10,2)',
			'NUMERIC',
			'MONEY',
			'STRING',
			'VARCHAR(10)',
			'NVARCHAR',
			'CHAR(3)',
			'BOOLEAN',
			'DATE',
			'DATETIME',
			'JSON',
		];
		const res = types.map(type => alasql(`VALUE OF SELECT CAST(NULL AS ${type})`));
		assert.deepStrictEqual(
			res,
			types.map(() => undefined)
		);
	});

	it('D) CAST of a column holding null or missing stays undefined', function () {
		const res = alasql(
			`SELECT CAST(a AS NUMBER) AS n, CAST(a AS INT) AS i, CAST(a AS STRING) AS s,
				CAST(a AS BOOLEAN) AS b, CAST(a AS DATE) AS d FROM ?`,
			[[{a: null}, {}]]
		);
		const empty = {n: undefined, i: undefined, s: undefined, b: undefined, d: undefined};
		assert.deepStrictEqual(res, [empty, empty]);
	});

	it('E) CONVERT with a style keeps NULL as undefined', function () {
		const res = alasql('SELECT CONVERT(STRING, a, 103) AS d FROM ?', [[{a: null}]]);
		assert.deepStrictEqual(res, [{d: undefined}]);
	});

	it('F) Aggregates ignore NULL values after CAST', function () {
		const res = alasql(
			`SELECT AVG(CAST(a AS NUMBER)) AS av, SUM(CAST(a AS NUMBER)) AS s,
				COUNT(CAST(a AS NUMBER)) AS c FROM ?`,
			[[{a: null}, {a: 4}, {}]]
		);
		assert.deepStrictEqual(res, [{av: 4, s: 4, c: 1}]);
	});

	it('G) Non-null values are still converted', function () {
		const res = alasql(
			`SELECT CAST(a AS INT) AS i, CAST(a AS NUMBER) AS n, CAST(a AS STRING) AS s,
				CAST(0 AS BOOLEAN) AS b FROM ?`,
			[[{a: '12.7'}]]
		);
		assert.deepStrictEqual(res, [{i: 12, n: 12.7, s: '12.7', b: false}]);
	});
});
