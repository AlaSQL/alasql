if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 104 - RANDOM() and RECURSIVE', function () {
	/*

DROP TABLE IF EXISTS ttbl;
CREATE TABLE IF NOT EXISTS ttbl
(
  id serial NOT NULL,
  is_active BOOL NOT NULL DEFAULT true,
  CONSTRAINT ttbl_pkey PRIMARY KEY (id)
)
WITH (OIDS=FALSE);

*/
	/*
select t.*
from ttbl t
where 
  t.id not in (1, 3, 10, 89, 99, 22, 24, 25, 28, 30) 
  AND t.is_active
order by random()
limit 5;
*/
	//	it('localStorage', function(done){
	//		done();
	//	});
	/*
WITH RECURSIVE r AS (
  WITH b AS (
    SELECT
    min(t.id),
    (
      SELECT t.id
      FROM ttbl AS t
      WHERE
        t.id NOT IN (1, 3, 10, 89, 99, 22, 24, 25, 28, 30)
        AND t.is_active
      ORDER BY t.id DESC
      LIMIT 1
      OFFSET 5 - 1
    ) max
    FROM ttbl AS t
    WHERE 
      t.id NOT IN (1, 3, 10, 89, 99, 22, 24, 25, 28, 30)
      AND t.is_active
  )
  (
    SELECT
      id, min, max, array[]::integer[] || id AS a, 0 AS n
    FROM ttbl AS t, b
    WHERE
      id >= min + ((max - min) * random())::int AND
      t.id NOT IN (1, 3, 10, 89, 99, 22, 24, 25, 28, 30) AND
      t.is_active
    LIMIT 1
  ) UNION ALL (
    SELECT t.id, min, max, a || t.id, r.n + 1 AS n
    FROM ttbl AS t, r
    WHERE
      t.id > min + ((max - min) * random())::int AND
      t.id <> all( a ) AND
      r.n + 1 < 5 AND
      t.id NOT IN (1, 3, 10, 89, 99, 22, 24, 25, 28, 30) AND
      t.is_active
    LIMIT 1
  )
)
SELECT t.* FROM ttbl AS t, r WHERE r.id = t.id


*/
});
