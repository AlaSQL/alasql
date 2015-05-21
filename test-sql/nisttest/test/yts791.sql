-- MODULE  YTS791  

-- SQL Test Suite, V6.0, Interactive SQL, yts791.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS2              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7525 GRANT USAGE on character set, WITH GRANT OPTION!

   GRANT USAGE ON CHARACTER SET CTS1.CS TO CTS4;
-- PASS:7525 If grant completed successfully?

   COMMIT WORK;

   CREATE TABLE TB
     (TBC CHARACTER(3) CHARACTER SET CTS1.CS);
-- PASS:7525 If table created successfully?

   COMMIT WORK;

   INSERT INTO TB VALUES (_CTS1.CS 'def');
-- PASS:7525 If 1 row inserted successfully?

   SELECT * FROM TB;
-- PASS:7525 If answer = 'def'?

   COMMIT WORK;

   DROP TABLE TB CASCADE;
-- PASS:7525 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7525 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
