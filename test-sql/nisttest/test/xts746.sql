-- MODULE   XTS746

-- SQL Test Suite, V6.0, Interactive SQL, xts746.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7046 Presence of LATIN1 in CHARACTER_SETS view!

  SELECT COUNT(*) 
     FROM INFORMATION_SCHEMA.CHARACTER_SETS
     WHERE CHARACTER_SET_SCHEMA = 'INFORMATION_SCHEMA'
     AND CHARACTER_SET_NAME = 'LATIN1'
     AND NUMBER_OF_CHARACTERS = 191
     AND CHARACTER_SET_CATALOG IS NOT NULL
     AND DEFAULT_COLLATE_CATALOG IS NOT NULL
     AND DEFAULT_COLLATE_SCHEMA IS NOT NULL
     AND DEFAULT_COLLATE_NAME IS NOT NULL;
-- PASS:7046 If COUNT = 1?

   ROLLBACK WORK;

-- END TEST >>> 7046 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
