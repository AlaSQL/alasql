-- MODULE SDL005

-- SQL Test Suite, V6.0, Interactive SQL, sdl005.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CUGINI

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0141 GRANT SELECT AND UPDATE to Cugini!

      SELECT EMPNUM,PNUM,USER
           FROM HU.WORKS
           WHERE EMPNUM = 'E3';
-- PASS:0141 If PNUM = 'P2' and USER = 'CUGINI'?

      UPDATE HU.WORKS
           SET EMPNUM = 'E8',PNUM = 'P8'
           WHERE EMPNUM = 'E3';
-- PASS:0141 If 1 row is updated?

      SELECT EMPNUM,PNUM
           FROM HU.WORKS
           WHERE EMPNUM='E8';
-- PASS:0141 If PNUM = 'P8'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0141 <<< END TEST

-- *************************************************////END-OF-MODULE
