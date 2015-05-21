-- MODULE   XTS750

-- SQL Test Suite, V6.0, Interactive SQL, xts750.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7050 Named domain constraint!

   CREATE DOMAIN D12749 AS NUMERIC(5)
         CONSTRAINT CTS1.CND12749 CHECK(VALUE > 0);
-- PASS:7050 If domain created successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS
         WHERE CONSTRAINT_SCHEMA = 'CTS1' 
         AND DOMAIN_SCHEMA = 'CTS1'
         AND DOMAIN_NAME = 'D12749';
-- PASS:7050 If COUNT = 1?

   SELECT CONSTRAINT_NAME 
         FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS
         WHERE CONSTRAINT_SCHEMA = 'CTS1' AND DOMAIN_SCHEMA = 'CTS1'
         AND DOMAIN_NAME = 'D12749';
-- PASS:7050 If cname = CND12749?

   ROLLBACK WORK;

   DROP DOMAIN D12749 CASCADE;
-- PASS:7050 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7050 <<< END TEST
-- ********************************************
-- *************************************************////END-OF-MODULE
