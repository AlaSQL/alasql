-- MODULE   XTS730

-- SQL Test Suite, V6.0, Interactive SQL, xts730.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7030 Table name with 19 characters - delimited!

   CREATE TABLE "LONGIDENTIFIERSAAAA" (TNUM NUMERIC(5));
-- PASS:7030 If table created successfully?

   COMMIT WORK;

   CREATE TABLE "longidentifiersaaab" (TNUM NUMERIC(5));
-- PASS:7030 If table created successfully?

   COMMIT WORK;

   CREATE TABLE "0""LONGIDENTIFIERS_1" (TNUM NUMERIC(5));
-- PASS:7030 If table created successfully?

   COMMIT WORK;

   CREATE TABLE "0""LONGIDENTIFIERS_2" (TNUM NUMERIC(5));
-- PASS:7030 If table created successfully?

   COMMIT WORK;

   CREATE TABLE "lngIDENTIFIER% .,()" (TNUM NUMERIC(5));
-- PASS:7030 If table created successfully?

   COMMIT WORK;

   SELECT  COUNT(*)  
         FROM INFORMATION_SCHEMA.TABLES
         WHERE TABLE_SCHEMA = 'CTS1' 
         AND TABLE_TYPE = 'BASE TABLE'
         AND ( TABLE_NAME = 'LONGIDENTIFIERSAAAA'
            OR TABLE_NAME = 'longidentifiersaaab'
            OR TABLE_NAME = '0"LONGIDENTIFIERS_1'
            OR TABLE_NAME = '0"LONGIDENTIFIERS_2'
            OR TABLE_NAME = 'lngIDENTIFIER% .,()' );
-- PASS:7030 If COUNT = 5?

   SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
         WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_TYPE = 'BASE TABLE'
         AND ( TABLE_NAME = 'LONGIDENTIFIERSAAAA'
            OR TABLE_NAME = 'longidentifiersaaab'
            OR TABLE_NAME = '0"LONGIDENTIFIERS_1'
            OR TABLE_NAME = '0"LONGIDENTIFIERS_2'
            OR TABLE_NAME = 'lngIDENTIFIER% .,()' )
         ORDER BY TABLE_NAME;
-- PASS:7030 If 5 rows are selected in following order?
--                    table_name
--                    ==========
-- PASS:7030 If   0"LONGIDENTIFIERS_1?
-- PASS:7030 If   0"LONGIDENTIFIERS_2?
-- PASS:7030 If   LONGIDENTIFIERSAAAA?
-- PASS:7030 If   lngIDENTIFIER% .,()?
-- PASS:7030 If   longidentifiersaaab?

   ROLLBACK WORK;

   DROP TABLE "LONGIDENTIFIERSAAAA" CASCADE;
-- PASS:7030 If table dropped successfully?

   DROP TABLE "longidentifiersaaab" CASCADE;
-- PASS:7030 If table dropped successfully?

   DROP TABLE "0""LONGIDENTIFIERS_1" CASCADE;
-- PASS:7030 If table dropped successfully?

   DROP TABLE "0""LONGIDENTIFIERS_2" CASCADE;
-- PASS:7030 If table dropped successfully?

   DROP TABLE "lngIDENTIFIER% .,()" CASCADE;
-- PASS:7030 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7030 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
