-- MODULE SDL009

-- SQL Test Suite, V6.0, Interactive SQL, sdl009.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0145 Fully Qualified Column Spec.!

      SELECT HU.STAFF.EMPNUM,EMPNAME,HOURS,USER
           FROM HU.STAFF,HU.WORKS
           WHERE HU.STAFF.EMPNUM='E1' AND PNUM='P3';
-- PASS:0145 If STAFF.EMPNAME = 'Alice', USER = 'SULLIVAN', HOURS =80?

-- END TEST >>> 0145 <<< END TEST
-- *************************************************////END-OF-MODULE
