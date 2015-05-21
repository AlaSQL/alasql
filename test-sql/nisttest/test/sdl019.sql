-- MODULE SDL019

-- SQL Test Suite, V6.0, Interactive SQL, sdl019.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0155 CREATE Table with Unique (...), INSERT via SELECT!
      SELECT COUNT(*)
           FROM WORKS;
-- PASS:0155 If count = 12?

-- setup
     INSERT INTO WORKS
            SELECT 'E3',PNUM,100
             FROM PROJ;
-- PASS:0155 If ERROR, unique constraint, 0 rows inserted?
 
      SELECT COUNT(*)
           FROM WORKS;
-- PASS:0155 If count = 12?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0155 <<< END TEST
-- *************************************************////END-OF-MODULE
