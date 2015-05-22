-- MODULE SDL008

-- SQL Test Suite, V6.0, Interactive SQL, sdl008.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0144 Priv. violation: Column not in UPDATE column list!

      SELECT EMPNUM,EMPNAME,GRADE
           FROM HU.STAFF3
           WHERE EMPNUM = 'E3';
-- PASS:0144 If EMPNAME = 'Carmen' and GRADE = 13 ?

      UPDATE HU.STAFF3
           SET EMPNUM  = 'E8',GRADE = 30
           WHERE EMPNUM = 'E3';
-- PASS:0144 If ERROR, syntax error/access violation, 0 rows updated?

      UPDATE HU.STAFF3
           SET EMPNUM='E8',EMPNAME='Yang'
           WHERE EMPNUM='E3';
-- PASS:0144 If 1 row is updated?

      SELECT EMPNUM,EMPNAME,GRADE
           FROM HU.STAFF3
           WHERE EMPNUM = 'E8';
-- PASS:0144 If EMPNAME = 'Yang' and GRADE = 13?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0144 <<< END TEST
-- *************************************************////END-OF-MODULE
