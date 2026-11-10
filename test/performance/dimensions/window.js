// ROW_NUMBER and a running SUM over partitions
const sql =
	'SELECT id, dept_id, salary, ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rn, SUM(salary) OVER (PARTITION BY dept_id ORDER BY id ASC) AS running_sum FROM ?';
const rows = (g, parts) => {
	const r = [];
	for (let id = 0; id < 50000; id++)
		r.push({id, dept_id: g.int(parts), salary: 1000 + g.int(9000)});
	return r;
};
module.exports = {
	group: 'window',
	title: 'Window functions',
	info: {
		tests:
			'ROW_NUMBER() and a running SUM() OVER (PARTITION BY ... ORDER BY ...) on 50,000 rows in 100 and in 5,000 partitions.',
		why: 'Window functions partition, sort each partition and keep running state. A naive version sorts or scans a partition again for every row (N squared). Note: develop answers this query wrongly (#2591, #2689); the time is still the work alasql does today.',
		read: 'Compare 100 with 5,000 partitions: the time should not grow much with the number of partitions.',
	},
	setup: g => ({few: rows(g, 100), many: rows(g, 5000)}),
	cases: [
		{name: '100 partitions', sql, params: c => [c.few]},
		{name: '5,000 partitions', sql, params: c => [c.many]},
	],
};
