-- MODULE  YTS772  

-- SQL Test Suite, V6.0, Interactive SQL, yts772.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7554 Access to ASSERTIONS view!

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.ASSERTIONS
     WHERE IS_DEFERRABLE IS NULL;
-- PASS:7554 If COUNT = 0?

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.ASSERTIONS
     WHERE INITIALLY_DEFERRED IS NULL;
-- PASS:7554 If COUNT = 0?

   SELECT CONSTRAINT_CATALOG, CONSTRAINT_SCHEMA,
     CONSTRAINT_NAME, IS_DEFERRABLE, INITIALLY_DEFERRED
     FROM INFORMATION_SCHEMA.ASSERTIONS;
-- PASS:7554 If IS_DEFERRABLE = 'YES' or 'NO'?
-- PASS:7554 If INITALLY_DEFERRED = 'YES' or 'NO'?
-- PASS:7554 If   IS_DEFERRABLE = 'NO' then                ?
-- PASS:7554         INITIALLY_DEFFERED must also = 'NO'   ? 

   ROLLBACK WORK;

-- END TEST >>> 7554 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
