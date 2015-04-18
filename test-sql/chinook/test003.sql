
SELECT VALUE COUNT(*) FROM (
	SELECT * from TableA
	FULL OUTER JOIN TableB
	ON TableA.name = TableB.name;
);

ASSERT 1;
