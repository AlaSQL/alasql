-- MODULE SDL003

-- SQL Test Suite, V6.0, Interactive SQL, sdl003.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0139 GRANT ALL Priviliges to Public (SELECT, UPDATE)!

      SELECT EMPNUM,EMPNAME,USER
           FROM HU.STAFF
           WHERE EMPNUM = 'E3';
-- PASS:0139 If EMPNAME = 'Carmen' and USER = 'SCHANZLE'?

      UPDATE HU.STAFF
           SET  EMPNUM='E8',EMPNAME='SCHANZLE'
           WHERE EMPNUM='E3';
-- PASS:0139 If 1 row is updated?

      SELECT EMPNUM,EMPNAME
           FROM HU.STAFF
           WHERE EMPNUM='E8';
-- PASS:0139 If EMPNAME = 'SCHANZLE'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0139 <<< END TEST
-- *************************************************////END-OF-MODULE
