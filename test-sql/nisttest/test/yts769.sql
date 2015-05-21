-- MODULE  YTS769  

-- SQL Test Suite, V6.0, Interactive SQL, yts769.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7551 Access to DOMAINS view!

   DROP DOMAIN CTS1b.esal CASCADE;
-- PASS:7551 If DOMAIN dropped successfully?

   COMMIT WORK;

   SELECT DOMAIN_SCHEMA, DOMAIN_NAME, DATA_TYPE
     FROM INFORMATION_SCHEMA.DOMAINS
     WHERE DOMAIN_NAME IN
     ('ESAL','NUMDOM','DOMCHAR','DOMSMALL');
-- PASS:7551 If the following rows are returned?
--                dom_schema     dom_name     data_type
--                ==========     ========     ========= 
-- PASS:7551 If   CTS1           ESAL         INTEGER?
-- PASS:7551 If   CTS2           NUMDOM       INTEGER?
-- PASS:7551 If   CTS1B          DOMCHAR      CHARACTER?
-- PASS:7551 If   CTS1B          DOMSMALL     SMALLINT?

   COMMIT WORK;

   CREATE DOMAIN cts1b.esal AS INTEGER;
-- PASS:7551 If DOMAIN created successfully?

   COMMIT WORK;

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.DOMAINS
     WHERE DOMAIN_NAME = 'ESAL';
-- PASS:7551 If COUNT = 2?

   COMMIT WORK;

   DROP DOMAIN cts1b.esal CASCADE;
-- PASS:7551 If DOMAIN dropped successfully?

   COMMIT WORK;

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.DOMAINS
     WHERE DOMAIN_NAME = 'ESAL';
-- PASS:7551 If COUNT = 1?

   COMMIT WORK;

   CREATE DOMAIN cts1b.esal AS INTEGER
     CHECK  (VALUE>500);
-- PASS:7551 If DOMAIN created successfully?

   COMMIT WORK;

-- END TEST >>> 7551 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
