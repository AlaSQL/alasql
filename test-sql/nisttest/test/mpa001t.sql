-- MODULE MPA001T  testreport

-- SQL Test Suite, V6.0, Interactive SQL, mpa001t.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0230 Transactions serializable - assign sequential key!


      SELECT COUNT(*)
               FROM TT;
-- PASS:0230 If count = 11?

      SELECT COUNT(DISTINCT ANUM) 
               FROM TT;
-- PASS:0230 If count = 11?

      COMMIT WORK;
 
-- END TEST >>> 0230 <<< END TEST

-- *************************************************////END-OF-MODULE
