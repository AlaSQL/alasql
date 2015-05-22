-- MODULE DML012

-- SQL Test Suite, V6.0, Interactive SQL, dml012.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0037 DELETE without WHERE clause!
     SELECT COUNT(*)
          FROM STAFF;
-- PASS:0037 If count = 5?

      DELETE FROM STAFF;
-- PASS:0037 If 5 rows deleted?

      SELECT COUNT(*)
           FROM STAFF;
-- PASS:0037 If count = 0?

-- restore
     ROLLBACK WORK;

-- Testing Rollback
      SELECT COUNT(*)
           FROM STAFF;
-- PASS:0037 If count = 5?

-- END TEST >>> 0037 <<< END TEST
-- **************************************************************

-- TEST:0038 DELETE with correlated subquery in WHERE clause!
     SELECT COUNT(*)
          FROM WORKS;
-- PASS:0038 If count = 12?

     DELETE FROM WORKS
           WHERE WORKS.PNUM IN
                 (SELECT PROJ.PNUM
                       FROM PROJ
                       WHERE PROJ.PNUM=WORKS.PNUM
                       AND PROJ.CITY='Tampa');
-- PASS:0038 If 1 row deleted?

      SELECT COUNT(*)
           FROM WORKS;
-- PASS:0038 If count = 11?

-- restore
      ROLLBACK WORK;

-- Testing Rollback
      SELECT COUNT(*)
           FROM WORKS;
-- PASS:0038 If count = 12?

-- END TEST >>> 0038 <<< END TEST
-- *************************************************////END-OF-MODULE
