-- MODULE  YTS770  

-- SQL Test Suite, V6.0, Interactive SQL, yts770.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7552 Access to DOMAIN_CONSTRAINTS view!

   DROP DOMAIN cts1b.esal CASCADE;
-- PASS:7552 If domain dropped successfully?

   COMMIT WORK;

   SELECT DOMAIN_SCHEMA, DOMAIN_NAME
     FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS
     WHERE DOMAIN_NAME IN ('DOMSMALL', 'ESAL');
-- PASS:7552 If two rows are returned with the following values?
--               dom_schema       dom_name
--               ==========       ========
-- PASS:7552 If  CTS1B            DOMSMALL?
-- PASS:7552 If  CTS1             ESAL?

   COMMIT WORK;

   CREATE DOMAIN cts1b.esal AS INTEGER
     CHECK  (VALUE<500);
-- PASS:7552 If DOMAIN created successfully?

   COMMIT WORK;

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS
     WHERE DOMAIN_NAME = 'ESAL';
-- PASS:7552 If COUNT = 2?

   COMMIT WORK;

   DROP DOMAIN cts1b.esal CASCADE;
-- PASS:7552 If DOMAIN dropped successfully?

   COMMIT WORK;

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS
     WHERE DOMAIN_NAME LIKE 'ESAL%';
-- PASS:7552 If count = 1?

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS
     WHERE DOMAIN_SCHEMA NOT IN
     ('CTS1','CTS1B');
-- PASS:7552 If COUNT = 0?

   COMMIT WORK;

   CREATE DOMAIN cts1b.esal AS INTEGER
    CHECK  (VALUE>500);
-- PASS:7552 If DOMAIN created successfully?

   COMMIT WORK;

-- END TEST >>> 7552 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
