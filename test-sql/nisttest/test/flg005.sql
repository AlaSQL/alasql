-- MODULE FLG005

-- SQL Test Suite, V6.0, Interactive SQL, flg005.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU 

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0296 FIPS Flagger - vendor provided character function!
-- FIPS Flagger Test.  Support for this feature is not required.
-- If supported, this feature must be flagged as an extension to the standard.

-- NOTE:0296 If the vendor does not pass this test, as written,
-- NOTE:0296    the vendor should replace the SUBSTR(...) syntax below
-- NOTE:0296    with a vendor extension which selects exactly 1 row.

  SELECT COUNT(*) 
         FROM STAFF
         WHERE SUBSTR(EMPNAME,1,3) = 'Ali';
-- PASS:0296 If count = 1?

-- END TEST >>> 0296 <<< END TEST
-- *************************************************************

-- TEST:0297 FIPS Flagger - vendor provided integer function!
-- FIPS Flagger Test.  Support for this feature is not required.
-- If supported, this feature must be flagged as an extension to the standard.

  UPDATE STAFF
         SET GRADE = -GRADE;

-- NOTE:0297 If the vendor does not pass this test, as written,
-- NOTE:0297    the vendor should replace the ABS(...) syntax below
-- NOTE:0297    with a vendor extension which selects 2 rows.

  SELECT COUNT(*) 
         FROM STAFF
         WHERE ABS(GRADE) = 12;
-- PASS:0297 If count = 2?

  ROLLBACK WORK;

-- END TEST >>> 0297 <<< END TEST
-- *************************************************////END-OF-MODULE
