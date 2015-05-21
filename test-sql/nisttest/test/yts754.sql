-- MODULE  YTS754  

-- SQL Test Suite, V6.0, Interactive SQL, yts754.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7504 DROP DOMAIN CASCADE - domain definition in use!

   CREATE DOMAIN char_dom CHARACTER;
-- PASS:7504 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE char_in_use
    (  litt1   char_dom,
       numm    integer);
-- PASS:7504 If table created successfully?

   COMMIT WORK;

   INSERT INTO char_in_use VALUES ('a',00);
-- PASS:7504 If 1 row inserted successfully?

   INSERT INTO char_in_use VALUES ('z',99);
-- PASS:7504 If 1 row inserted successfully?

   INSERT INTO char_in_use VALUES ('A',999999);
-- PASS:7504 If 1 row inserted successfully?

   COMMIT WORK;

   DROP DOMAIN char_dom CASCADE;
-- PASS:7504 If domain dropped successfully?

   COMMIT WORK;

   SELECT litt1 FROM char_in_use
     ORDER BY numm;
-- PASS:7504 If 3 rows are selected in the following order?
--               litt1
--               =====
-- PASS:7504 If    a?
-- PASS:7504 If    z?
-- PASS:7504 If    A?

   INSERT INTO char_in_use VALUES ('p',654);
-- PASS:7504 If 1 row inserted successfully?

   ROLLBACK WORK;

   DROP TABLE char_in_use CASCADE;
-- PASS:7504 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7504 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
