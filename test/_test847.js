if (typeof exports === 'object') {
	var alasql = require('..');
}

const table = {
	name: 'midnightcalls',
	columns: [
		{name: 'track_name', type: 'string'},
		{name: 'author', type: 'string'},
		{name: 'views', type: 'int'},
	],
};

describe('Test 847 - Testing backtick call function', function () {
	it('1. Create table', function () {
		alasql`DROP TABLE IF EXISTS test`;
		alasql`CREATE TABLE test (a int, b int)`;
	});

	it('2. Insert values ', function () {
		alasql`INSERT INTO test VALUES (1,1)`;
		alasql`INSERT INTO test VALUES (1,7)`;
		alasql`INSERT INTO test VALUES (2,2)`;
		alasql`INSERT INTO test VALUES (3,3)`;
	});

	it('3. Create a new table', function () {
		alasql`DROP TABLE IF EXISTS ${table.name}`;

		alasql(`
			CREATE TABLE ${table.name} (${table.columns
			.map((item) => ` ${item.name} ${item.type.toUpperCase()}`)
			.join(', ')
			.toString()})
		`);
	});

	it('4. Insert values', function () {
		const values = [
			['qhAfaWdLbIE', 'Baby bi', 'Yunk Vino', 72],
			['YA-db3f8Ak4', 'Sonar', 'Yunk Vino', 809],
		];
		const valuesToInsert = values
			.map(
				(item, i) =>
					`('${item[0]}', '${item[1]}', '${item[2]}', ${item[3]})${
						i + 1 === values.length ? '' : ', '
					}`
			)
			.join('');

		console.log(valuesToInsert);

		alasql(`
			INSERT INTO ${table.name}
			VALUES 
				${valuesToInsert}
		`);
	});
});
