-- MODULE  YTS776  

-- SQL Test Suite, V6.0, Interactive SQL, yts776.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7510 DROP SCHEMA - empty schema with restrict!

   CREATE SCHEMA MARPLE;
-- PASS:7510 If schema created successfully?

   COMMIT WORK;

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.SCHEMATA 
     WHERE SCHEMA_NAME = 'MARPLE';
-- PASS:7510 If COUNT = 1?

   COMMIT WORK;

   DROP SCHEMA MARPLE RESTRICT;
-- PASS:7510 If schema dropped successfully?

   COMMIT WORK;

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.SCHEMATA 
     WHERE SCHEMA_NAME = 'MARPLE';
-- PASS:7510 If COUNT = 0?

   ROLLBACK WORK;

-- END TEST >>> 7510 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
