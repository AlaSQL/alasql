-- MODULE SDL007

-- SQL Test Suite, V6.0, Interactive SQL, sdl007.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0143 GRANT SELECT AND UPDATE on VIEW!

      SELECT EMPNUM,EMPNAME,USER
           FROM HU.STAFF2
           WHERE  EMPNUM = 'E3';
-- PASS:0143 If EMPNAME = 'Carmen' and USER = 'SULLIVAN' ?

      UPDATE HU.STAFF2
           SET EMPNUM = 'E8',EMPNAME = 'Ling'
                WHERE EMPNUM = 'E3';
-- PASS:0143 If 1 row is updated ?

      SELECT EMPNUM,EMPNAME
           FROM HU.STAFF
           WHERE EMPNUM='E8';
-- PASS:0143 If EMPNAME = 'Ling'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0143 <<< END TEST
-- *************************************************////END-OF-MODULE
