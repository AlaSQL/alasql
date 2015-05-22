-- MODULE MPA002T  testreport

-- SQL Test Suite, V6.0, Interactive SQL, mpa002t.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0231 Transactions serializable - SELECT/UPDATE(replace)!

      SELECT ANUM, DOLLARS FROM TT WHERE DOLLARS <> 500;
-- PASS:0231 If 1 row selected with ANUM = 25 and DOLLARS = 600?

      COMMIT WORK;

-- END TEST >>> 0231 <<< END TEST


-- *************************************************////END-OF-MODULE
