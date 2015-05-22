-- MODULE DML015

-- SQL Test Suite, V6.0, Interactive SQL, dml015.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- NO_TEST:0060 COMMIT work closes CURSORs!

-- Testing cursors
  
-- ************************************************************

-- TEST:0061 COMMIT work keeps changes to database!

     INSERT INTO TEMP_S
           SELECT EMPNUM, GRADE, CITY
                FROM STAFF;
-- PASS:0061 If 5 rows are inserted?

     COMMIT WORK;
 
-- verify previous COMMIT keeps changes
     ROLLBACK WORK;

     SELECT COUNT(*)
          FROM TEMP_S;
-- PASS:0061 If count = 5?

-- END TEST >>> 0061 <<< END TEST
-- ************************************************************

-- TEST:0062 ROLLBACK work cancels changes to database!
-- NOTE:0062 uses data created by TEST 0061

     DELETE FROM TEMP_S
           WHERE EMPNUM = 'E5';
-- PASS:0062 If 1 row is deleted?

        SELECT COUNT(*)
             FROM TEMP_S;
-- PASS:0062 If count = 4?

-- restore
     ROLLBACK WORK;
 
     SELECT COUNT(*)
          FROM TEMP_S;
-- PASS:0062 If count = 5?

-- restore
     DELETE FROM TEMP_S;
     COMMIT WORK;

-- END TEST >>> 0062 <<< END TEST
-- ***********************************************************

-- NO_TEST:0063 ROLLBACK work closes CURSORs!

-- Testing cursors
-- *************************************************////END-OF-MODULE
