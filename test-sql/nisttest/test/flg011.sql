-- MODULE  FLG011  

-- SQL Test Suite, V6.0, Interactive SQL, flg011.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0831 FIPS Flagger - ADD (column, ...)!
-- FIPS Flagger Test.  Support for this feature is not required.
-- If supported, this feature must be flagged as an extension to the standard.

   ALTER TABLE USIG
  ADD(COL3 INTEGER, COL4 SMALLINT);
-- PASS:0831 If 2 columns added?
-- NOTE:0831 Shows support for X/Open ADD (column, ...) extension

   ROLLBACK WORK;

-- END TEST >>> 0831 <<< END TEST
-- *************************************************////END-OF-MODULE
