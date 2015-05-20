-- MODULE  YTS768

-- SQL Test Suite, V6.0, Interactive SQL, yts768.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7550 Access to SCHEMATA view!

   SELECT COUNT (*) FROM 
     INFORMATION_SCHEMA.SCHEMATA;
-- PASS:7550 If COUNT = 2?

   SELECT CATALOG_NAME, SCHEMA_NAME, SCHEMA_OWNER
     FROM INFORMATION_SCHEMA.SCHEMATA;
-- PASS:7550 If the following rows are selected?
--                 schema_name         schema_owner
--                 ===========         ============
-- PASS:7550 If    CTS1 or CTS1B       CTS1?
-- PASS:7550 If    CTS1 or CTS1B       CTS1?

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.SCHEMATA
     WHERE SCHEMA_OWNER = 'CTS2';
-- PASS:7550 If COUNT = 0?

   ROLLBACK WORK;

-- END TEST >>> 7550 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
