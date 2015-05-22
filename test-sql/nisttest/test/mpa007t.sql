-- MODULE MPA007T  testreport  

-- SQL Test Suite, V6.0, Interactive SQL, mpa007t.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0507 Transaction serializability, READ/DELETE/INSERT!

   SELECT * FROM AA ORDER BY ANUM;
-- PASS:0507 If 0 rows are selected ?
-- PASS:0507 OR 2 rows are selected with values 1 and 6?
-- PASS:0507 OR both MPA008R and MPB008R typed ROLLBACK twice?

   SELECT * FROM BB ORDER BY BNUM;
-- PASS:0507 If 0 rows are selected ?
-- PASS:0507 OR 2 rows are selected with values 1 and 6?
-- PASS:0507 OR both MPA008R and MPB008R typed ROLLBACK twice?

   SELECT * FROM AA
   UNION
   SELECT * FROM BB
   ORDER BY 1;
-- PASS:0507 If 2 rows are selected with values 1 and 6?

   COMMIT WORK;

-- END TEST >>>  0507 <<< END TEST

-- *************************************************////END-OF-MODULE
