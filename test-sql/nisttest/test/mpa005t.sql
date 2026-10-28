-- MODULE MPA005T  testreport

-- SQL Test Suite, V6.0, Interactive SQL, mpa005t.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0457 Transactions serializable - phantom read!

-- PASS:0457 If every query by MPB005R shows?
-- PASS:0457   table AA has either 20 or 25 rows?

   COMMIT WORK;

-- END TEST >>> 0457 <<< END TEST


-- *************************************************////END-OF-MODULE
