DECLARE @a REAL = 0.001;
DECLARE @b REAL = 9876543;
DECLARE @c REAL = 1234567;

SELECT
  @a * (@b * @c) as [a(bc)],
  (@a * @b) * @c as [(ab)c];
