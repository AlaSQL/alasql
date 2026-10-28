-- MODULE  YTS794  

-- SQL Test Suite, V6.0, Interactive SQL, yts794.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS2              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7528 GRANT USAGE on character set, no WGO!

   GRANT USAGE ON CHARACTER SET CTS1.CS2 TO CTS4;
-- PASS:7528 If ERROR - syntax error or access rule violation?

   COMMIT WORK;

   CREATE TABLE TB
     (TBC CHARACTER(3) CHARACTER SET CTS1.CS2);
-- PASS:7528 If table created successfully?

   COMMIT WORK;

   INSERT INTO TB VALUES (_CTS1.CS2 'def');
-- PASS:7528 If 1 row inserted successfully?

   SELECT * FROM TB;
-- PASS:7528 If value selected = 'def'?

   COMMIT WORK;

   DROP TABLE TB CASCADE;
-- PASS:7528 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7528 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
