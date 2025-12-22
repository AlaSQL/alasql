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

it('A) UNION ALL with ORDER BY and LIMIT using parentheses in UNION branch', function () {
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

// SQL-99 compliant: Use parentheses on second SELECT for ORDER BY/LIMIT
// This works: plain SELECT, then UNION ALL with parenthesized SELECT
var sql = `
SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
WHERE subcategoryname IN ('Socks', 'Helmets', 'Components')
GROUP BY subcategoryname
UNION ALL
(SELECT subcategoryname, SUM(totalamount) AS sales
FROM temptable
WHERE subcategoryname IN ('Accessories', 'Bikes', 'Gloves')
GROUP BY subcategoryname
ORDER BY sales ASC
LIMIT 3)
`;

var res = alasql(sql);

// Expected: 6 rows (3 from first + 3 from second with LIMIT)
assert.equal(res.length, 6, 'Should return 6 rows');

// Check that we got results from both queries
var names = res.map(r => r.subcategoryname);
assert(names.includes('Socks'), 'Should include Socks from first SELECT');
assert(names.includes('Accessories'), 'Should include Accessories from second SELECT');

alasql('DROP TABLE temptable');
});

it('B) UNION with ORDER BY and LIMIT using parentheses', function () {
// Create test data
alasql('CREATE TABLE test2 (val INT)');
alasql('INSERT INTO test2 VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10)');

// SQL-99 compliant: Use parentheses on second SELECT for ORDER BY/LIMIT
var sql = `
SELECT val FROM test2
WHERE val <= 5
UNION
(SELECT val FROM test2
WHERE val >= 6
ORDER BY val ASC
LIMIT 2)
`;

var res = alasql(sql);

// Expected: 7 rows (5 from first + 2 from second with LIMIT)
assert.equal(res.length, 7, 'Should return 7 rows');

// Check that LIMIT worked on second SELECT
var values = res.map(r => r.val).sort((a,b) => a-b);
assert(values.includes(1), 'Should include 1 from first SELECT');
assert(values.includes(6), 'Should include 6 from second SELECT');
assert(values.includes(7), 'Should include 7 from second SELECT');
assert(!values.includes(8), 'Should NOT include 8 (LIMIT 2 on second)');

alasql('DROP TABLE test2');
});
});
