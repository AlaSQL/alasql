if (typeof exports === 'object') {
var assert = require('assert');
var alasql = require('..');
}

describe('Test UNION ALL with ORDER BY and LIMIT on each SELECT', function () {
const test = 'union_order_limit';

before(function () {
alasql('create database test' + test);
alasql('use test' + test);
});

after(function () {
alasql('drop database test' + test);
});

it('A) UNION ALL with ORDER BY and LIMIT on each SELECT', function () {
// Create test data
alasql('CREATE TABLE temptable (subcategoryname STRING, totalamount FLOAT)');
alasql(`INSERT INTO temptable VALUES 
('Bikes', 1000.5),
('Components', 2000.75),
('Clothing', 1500.25),
('Accessories', 800.10),
('Socks', 9556.37),
('Helmets', 3000.00),
('Gloves', 1200.50)`
);

// Test UNION ALL with ORDER BY and LIMIT on each SELECT
var sql = `
SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
GROUP BY subcategoryname
ORDER BY sales DESC
LIMIT 3

UNION ALL

SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
GROUP BY subcategoryname
ORDER BY sales ASC
LIMIT 3
`;

var res = alasql(sql);

// Expected: 6 rows total (3 top + 3 bottom)
assert.equal(res.length, 6, 'Should return 6 rows (3 from each SELECT)');

// Check top 3 (DESC)
assert.equal(res[0].subcategoryname, 'Socks');
assert.equal(res[0].sales, 9556.37);
assert.equal(res[1].subcategoryname, 'Helmets');
assert.equal(res[1].sales, 3000);
assert.equal(res[2].subcategoryname, 'Components');
assert.equal(res[2].sales, 2000.75);

// Check bottom 3 (ASC)
assert.equal(res[3].subcategoryname, 'Accessories');
assert.equal(res[3].sales, 800.1);
assert.equal(res[4].subcategoryname, 'Bikes');
assert.equal(res[4].sales, 1000.5);
assert.equal(res[5].subcategoryname, 'Gloves');
assert.equal(res[5].sales, 1200.5);

alasql('DROP TABLE temptable');
});

it('B) UNION with ORDER BY and LIMIT on each SELECT', function () {
// Create test data
alasql('CREATE TABLE test2 (val INT)');
alasql('INSERT INTO test2 VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10)');

// Test UNION (with distinct) with ORDER BY and LIMIT on each SELECT
var sql = `
SELECT val FROM test2
WHERE val <= 5
ORDER BY val DESC
LIMIT 2

UNION

SELECT val FROM test2
WHERE val >= 6
ORDER BY val ASC
LIMIT 2
`;

var res = alasql(sql);

// Expected: 4 rows (2 from each SELECT, UNION removes no duplicates in this case)
assert.equal(res.length, 4, 'Should return 4 rows');

// The result should contain: 5, 4 (from first) and 6, 7 (from second)
var values = res.map(r => r.val).sort((a,b) => a-b);
assert.deepEqual(values, [4, 5, 6, 7]);

alasql('DROP TABLE test2');
});
});
