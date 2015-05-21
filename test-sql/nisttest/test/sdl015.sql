-- MODULE SDL015

-- SQL Test Suite, V6.0, Interactive SQL, sdl015.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0151 CREATE VIEW!

      SELECT COUNT(*)
           FROM STAFFV1;
-- PASS:0151 If count = 4?

-- END TEST >>> 0151 <<< END TEST
-- *************************************************////END-OF-MODULE
