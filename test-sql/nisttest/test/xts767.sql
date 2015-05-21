-- MODULE   XTS767

-- SQL Test Suite, V6.0, Interactive SQL, xts767.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7067 DROP character set, outstanding granted privileges!

   CREATE CHARACTER SET TESTSET GET SQL_TEXT;
-- PASS:7067 If character set created successfully?

   COMMIT WORK;

   GRANT USAGE ON CHARACTER SET TESTSET TO CTS3;
-- PASS:7067 If usage granted successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS3';
-- PASS:7067 If statement completed successfully?

   CREATE TABLE TEMP767 
    ( COLCH1 CHAR(10) CHARACTER SET CTS1.TESTSET,
      COLCH2 CHAR(5)  CHARACTER SET CTS1.TESTSET);
-- PASS:7067 If table created successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7067 If statement completed successfully?

   DROP CHARACTER SET TESTSET;
-- PASS:7067 If character set dropped successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS3';
-- PASS:7067 If statement completed successfully?

   DROP TABLE TEMP767 CASCADE;
-- PASS:7067 If table dropped successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7067 If statement completed successfully?

   DROP CHARACTER SET TESTSET;
-- PASS:7067 If character set dropped successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.CHARACTER_SETS 
         WHERE CHARACTER_SET_SCHEMA = 'CTS1' 
         AND CHARACTER_SET_NAME = 'TESTSET';
-- PASS:7067 If COUNT = 0?

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES
         WHERE OBJECT_SCHEMA = 'CTS1'
         AND OBJECT_TYPE = 'CHARACTER SET'
         AND OBJECT_NAME = 'TESTSET';
-- PASS:7067 If COUNT = 0?

   ROLLBACK WORK;

-- END TEST >>> 7067 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
