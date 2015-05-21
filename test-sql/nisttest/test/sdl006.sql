-- MODULE SDL006

-- SQL Test Suite, V6.0, Interactive SQL, sdl006.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0142 GRANT SELECT AND UPDATE with GRANT Option!

      SELECT EMPNUM,PNUM,USER
           FROM HU.WORKS
           WHERE EMPNUM = 'E3';
-- PASS:0142 If PNUM = 'P2' and USER = 'SULLIVAN' ?

      UPDATE HU.WORKS
           SET  EMPNUM = 'E8',PNUM = 'P8'
                WHERE EMPNUM = 'E3';
-- PASS:0142 If 1 row is updated?

      SELECT EMPNUM,PNUM
           FROM HU.WORKS
           WHERE EMPNUM='E8';
-- PASS:0142 If PNUM = 'P8'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0142 <<< END TEST
-- *************************************************////END-OF-MODULE
