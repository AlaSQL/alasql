-- MODULE  YTS774  

-- SQL Test Suite, V6.0, Interactive SQL, yts774.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7556 Access to INFORMATION_SCHEMA_CATALOG_NAME base table!

   SELECT CATALOG_NAME 
     FROM INFORMATION_SCHEMA.INFORMATION_SCHEMA_CATALOG_NAME;
-- PASS:7556 If select statement completed successfully?
-- NOTE:  Remember this CATALOG_NAME value as "cname"!

   SELECT TABLE_CATALOG
     FROM INFORMATION_SCHEMA.TABLES
     WHERE 
     TABLE_SCHEMA = 'INFORMATION_SCHEMA'
     AND TABLE_NAME = 'TABLES'
     AND TABLE_TYPE = 'VIEW'
     ORDER BY TABLE_CATALOG;
-- PASS:7556 If 1 or more rows are selected?
-- PASS:7556 If exactly 1 row has TABLE_CATALOG matching "cname"?

   SELECT TABLE_CATALOG
     FROM INFORMATION_SCHEMA.TABLES
     ORDER BY TABLE_CATALOG;
-- PASS:7556 If 1 or more rows are selected?
-- PASS:7556 If every TABLE_CATALOG value matches "cname"?

   SELECT CATALOG_NAME
     FROM INFORMATION_SCHEMA.SCHEMATA
     ORDER BY CATALOG_NAME;
-- PASS:7556 If 1 or more rows are selected?
-- PASS:7556 If every CATALOG_NAME value matches "cname"?

   ROLLBACK WORK;

-- END TEST >>> 7556 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
