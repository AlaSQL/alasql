SELECT VALUE COUNT(*) FROM (
	SELECT * from TableA
	LEFT OUTER JOIN TableB
	ON TableA.name = TableB.name;
);

ASSERT 1;