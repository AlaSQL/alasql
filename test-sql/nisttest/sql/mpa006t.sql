-- MODULE MPA006T  testreport

-- SQL Test Suite, V6.0, Interactive SQL, mpa006t.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0506 SQLSTATE 40001: transaction rollback/serialization failure!
-- *** These queries verify serializability
-- ***  if NO ERRORS have been detected earlier.
-- *** If there has been an error message in either MPA006R or MPB006R
-- ***  then the expected ANUM and BNUM values are not required to pass.

-- verify
     SELECT ANUM FROM AA;
-- PASS:0506 If ANUM = 131?
-- PASS:0506 OR ERROR message in MPA006R or MPB006R?

     SELECT BNUM FROM BB;
-- PASS:0506 If BNUM = -30?
-- PASS:0506 OR ERROR message in MPA006R or MPB006R?

     COMMIT WORK; 

-- END TEST >>> 0506 <<< END TEST

-- *************************************************////END-OF-MODULE
