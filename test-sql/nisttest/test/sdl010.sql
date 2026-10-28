-- MODULE SDL010

-- SQL Test Suite, V6.0, Interactive SQL, sdl010.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0146 GRANT SELECT, INSERT, DELETE!

-- setup
     INSERT INTO HU.STAFF4
            SELECT * 
                 FROM   HU.STAFF;
-- PASS:0146 If 5 rows are inserted?

      SELECT EMPNUM,EMPNAME,USER
           FROM HU.STAFF4
           WHERE EMPNUM = 'E3';
-- PASS:0146 If EMPNAME = 'Carmen' and USER = 'SULLIVAN'?

      INSERT INTO HU.STAFF4
             VALUES('E6','Ling',11,'Xi an');
-- PASS:0146 If 1 row is inserted?

      SELECT EMPNUM,EMPNAME
           FROM HU.STAFF4
           WHERE EMPNUM = 'E6';
-- PASS:0146 If EMPNAME = 'Ling'?

      DELETE FROM HU.STAFF4;
-- PASS:0146 If 6 rows are deleted?

      SELECT COUNT(*)
           FROM HU.STAFF4;
-- PASS:0146 If count = 0?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0146 <<< END TEST
-- *************************************************////END-OF-MODULE
