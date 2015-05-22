-- MODULE SDL017

-- SQL Test Suite, V6.0, Interactive SQL, sdl017.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0153 CREATE VIEW Joining 3 tables!

      SELECT COUNT(*),SUM(COST)
           FROM STAFF_WORKS_DESIGN;
-- PASS:0153 If count = 5 and SUM(COST) = 3488?

-- END TEST >>> 0153 <<< END TEST
-- *************************************************////END-OF-MODULE
