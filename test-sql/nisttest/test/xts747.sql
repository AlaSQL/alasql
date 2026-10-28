-- MODULE   XTS747

-- SQL Test Suite, V6.0, Interactive SQL, xts747.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7047 Presence of ASCII FULL in CHARACTER_SETS view!

   SELECT COUNT(*) 
     FROM INFORMATION_SCHEMA.CHARACTER_SETS
     WHERE CHARACTER_SET_SCHEMA = 'INFORMATION_SCHEMA'
     AND CHARACTER_SET_NAME = 'ASCII_FULL'
     AND NUMBER_OF_CHARACTERS = 256
     AND CHARACTER_SET_CATALOG IS NOT NULL
     AND DEFAULT_COLLATE_CATALOG IS NOT NULL
     AND DEFAULT_COLLATE_SCHEMA IS NOT NULL
     AND DEFAULT_COLLATE_NAME IS NOT NULL;
-- PASS:7047 If COUNT = 1?

   ROLLBACK WORK;

-- END TEST >>> 7047 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
