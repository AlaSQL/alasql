-- MODULE  YTS795  

-- SQL Test Suite, V6.0, Interactive SQL, yts795.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS4              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7529 GRANT USAGE on character set no WGO!

   CREATE TABLE TC
     ( TCC CHARACTER(3) CHARACTER SET CTS1.CS2);
-- PASS:7529 If ERROR - syntax error or access rule violation?

   COMMIT WORK;

   SELECT COUNT (*) FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA LIKE 'CTS4%' AND TABLE_NAME LIKE 'TC%';
-- PASS:7529 If COUNT = 0?

   ROLLBACK WORK;

-- END TEST >>> 7529 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
