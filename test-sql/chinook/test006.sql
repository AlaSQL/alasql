SELECT VALUE COUNT(*) FROM (
	SELECT * from TableA
	FULL OUTER JOIN TableB
	ON TableA.name = TableB.name
	WHERE TableA.id IS null
	OR TableB.id IS null;
);
ASSERT 1;
