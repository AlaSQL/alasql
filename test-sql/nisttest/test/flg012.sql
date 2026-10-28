-- MODULE  FLG012  

-- SQL Test Suite, V6.0, Interactive SQL, flg012.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0832 FIPS Flagger - CREATE INDEX!
-- FIPS Flagger Test.  Support for this feature is not required.
-- If supported, this feature must be flagged as an extension to the standard.

   CREATE INDEX II1 ON USIG(C1);
-- PASS:0832 If index created?
-- NOTE:0832 Shows support for CREATE INDEX extension

   CREATE UNIQUE INDEX II2 ON USIG(C_1);
-- PASS:0832 If index created?
-- NOTE:0832 Shows support for CREATE INDEX extension

   ROLLBACK WORK;

-- END TEST >>> 0832 <<< END TEST
-- *************************************************////END-OF-MODULE
