-- MODULE MPA003T  testreport

-- SQL Test Suite, V6.0, Interactive SQL, mpa003t.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0232 Transactions serializable - UPDATE with arithmetic!

      SELECT SUM(DOLLARS)
        FROM TT
        WHERE ANUM = 1  OR  ANUM = 25  OR ANUM = 50;
-- PASS:0232 If SUM(DOLLARS) = 1500?

      SELECT ANUM, DOLLARS FROM TT
        WHERE DOLLARS <> 500;
-- PASS:0232 If 3 rows selected?
-- PASS:0232 If rows are: (1, 525), (25, 425) and (50, 550)?

      COMMIT WORK;

-- END TEST >>> 0232 <<< END TEST

-- *************************************************////END-OF-MODULE
