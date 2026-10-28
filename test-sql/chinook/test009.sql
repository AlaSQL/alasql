SELECT VALUE COUNT(*) FROM (
	SELECT * from Invoice
	GROUP BY CustomerId
);

ASSERT 1;
