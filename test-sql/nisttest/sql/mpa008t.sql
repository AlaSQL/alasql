-- MODULE MPA008T  testreport

-- SQL Test Suite, V6.0, Interactive SQL, mpa008t.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0517 Transaction serializability:  Twins Problem!

-- verify
   SELECT * FROM TTT WHERE ANUM = 3;
-- PASS:0517 If 1 row selected and AUTHOR = 'A'?

   COMMIT WORK;

-- END TEST >>>  0517 <<< END TEST

-- *************************************************////END-OF-MODULE
