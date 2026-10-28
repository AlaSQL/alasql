-- MODULE SDL021

-- SQL Test Suite, V6.0, Interactive SQL, sdl021.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0199 Priv. violation: GRANT SELECT to Public, No DELETE!

      SELECT PNUM,PNAME,BUDGET
           FROM HU.PROJ
           WHERE PNUM = 'P3';
-- PASS:0199 If PNAME = 'SDP' and BUDGET = 30000?

      DELETE FROM HU.PROJ
           WHERE PNUM='P3';
-- PASS:0199 If ERROR, syntax error/access violation, 0 rows deleted?

      SELECT COUNT (*)
           FROM HU.PROJ;
-- PASS:0199 If count = 6?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0199 <<< END TEST
-- *************************************************////END-OF-MODULE
