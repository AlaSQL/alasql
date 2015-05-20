-- MODULE SDL037  

-- SQL Test Suite, V6.0, Interactive SQL, sdl037.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0495 Priv.violation: illegal GRANT to self!

   UPDATE HU.STAFF3
         SET GRADE = 15
         WHERE EMPNUM = 'E2';
-- PASS:0495 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0495 <<< END TEST
-- *************************************************////END-OF-MODULE

