-- MODULE  YTS800  

-- SQL Test Suite, V6.0, Interactive SQL, yts800.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7532 <null predicate><interval value exp> as <row value cons>!

   SELECT TTA FROM TT2 
     WHERE TTB+CAST(TTC AS INTERVAL MONTH) IS NULL;
-- PASS:7532 If TTA = 2, 3, and 4 (in any order)?

   SELECT COUNT (*) FROM TT2 
     WHERE NOT TTB+CAST(TTC AS INTERVAL MONTH) IS NULL;
-- PASS:7532 If COUNT = 2?

   ROLLBACK WORK;

-- END TEST >>> 7532 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
