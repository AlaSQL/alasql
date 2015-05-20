-- MODULE DML027

-- SQL Test Suite, V6.0, Interactive SQL, dml027.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0124 UPDATE UNIQUE column (key = key + 1) interim conflict!

-- setup
     UPDATE UPUNIQ
          SET NUMKEY = NUMKEY + 1;
-- PASS:0124 If 6 rows updated?

      SELECT COUNT(*),SUM(NUMKEY)
           FROM UPUNIQ;
-- PASS:0124 If count = 6 and SUM(NUMKEY) = 30?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0124 <<< END TEST
-- ********************************************************

-- TEST:0125 UPDATE UNIQUE column (key = key + 1) no interim conflit!

-- setup
     UPDATE UPUNIQ
          SET NUMKEY = NUMKEY + 1
          WHERE NUMKEY >= 4;
-- PASS:0125 If 3 rows are updated?

      SELECT COUNT(*),SUM(NUMKEY)
           FROM UPUNIQ;
-- PASS:0125 If count = 6 and SUM(NUMKEY) = 27?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0125 <<< END TEST
-- *************************************************////END-OF-MODULE
