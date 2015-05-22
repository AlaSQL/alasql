-- MODULE   XTS766

-- SQL Test Suite, V6.0, Interactive SQL, xts766.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7066 Drop character set no granted privileges!

   CREATE CHARACTER SET TESTSET GET SQL_TEXT;
-- PASS:7066 If character set created successfully?

   COMMIT WORK;

   SELECT GRANTOR, GRANTEE, OBJECT_SCHEMA, OBJECT_NAME, OBJECT_TYPE
         FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES
         WHERE OBJECT_TYPE = 'CHARACTER SET'
         AND OBJECT_NAME = 'TESTSET';
-- PASS:7066 If GRANTOR = _SYSTEM?
-- PASS:7066 If GRANTEE = CTS1?
-- PASS:7066 If OBJECT_SCHEMA = CTS1?
-- PASS:7066 If OBJECT_NAME = TESTSET?
-- PASS:7066 If OBJECT_TYPE = CHARACTER SET?
   COMMIT WORK;

   DROP CHARACTER SET TESTSET;
-- PASS:7066 If character set dropped successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.CHARACTER_SETS 
         WHERE CHARACTER_SET_SCHEMA = 'CTS1'
         AND CHARACTER_SET_NAME = 'TESTSET';
-- PASS:7066 If COUNT = 0?

   ROLLBACK WORK;

-- END TEST >>> 7066 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
