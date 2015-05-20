-- MODULE   XTS764

-- SQL Test Suite, V6.0, Interactive SQL, xts764.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7064 REVOKE USAGE on character set RESTRICT!

   GRANT USAGE ON CHARACTER SET CS TO CTS2 
         WITH GRANT OPTION;
-- PASS:7064 If usage granted successfully?

   COMMIT WORK;

   GRANT USAGE ON CHARACTER SET CS TO CTS3 WITH GRANT OPTION;
-- PASS:7064 If usage granted successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS3';
-- PASS:7064 If statement completed successfully?

   CREATE TABLE TEMP764C 
         ( COLCH1 CHAR(10) CHARACTER SET CTS1.CS,
           COLCH2 CHAR(5)  CHARACTER SET CTS1.CS);
-- PASS:7064 If table created successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7064 If statement completed successfully?

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES
         WHERE GRANTOR = 'CTS1' AND GRANTEE = 'CTS2'
         AND OBJECT_NAME = 'CS' AND OBJECT_TYPE = 'CHARACTER SET'
         AND IS_GRANTABLE = 'YES';
-- PASS:7064 If COUNT = 1?

   SELECT IS_GRANTABLE 
         FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES
         WHERE GRANTOR = 'CTS1' AND GRANTEE = 'CTS3'
         AND OBJECT_TYPE = 'CHARACTER SET' AND OBJECT_NAME = 'CS';
-- PASS:7064 If IS_GRANTABLE is "YES"?

   COMMIT WORK;

   REVOKE USAGE ON CHARACTER SET CS FROM CTS2 RESTRICT;
-- PASS:7064 If usage is revoked successfully?

   COMMIT WORK;

   REVOKE GRANT OPTION FOR USAGE ON CHARACTER SET CS 
         FROM CTS3 RESTRICT;
-- PASS:7064 If grant option is revoked successfully?

   COMMIT WORK;

   SELECT IS_GRANTABLE 
         FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES
         WHERE GRANTOR = 'CTS1' AND GRANTEE = 'CTS3'
         AND OBJECT_TYPE = 'CHARACTER SET' AND OBJECT_NAME = 'CS';
-- PASS:7064 If IS_GRANTABLE is "NO"? 

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS2';
-- PASS:7064 If statement completed successfully?

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.USAGE_PRIVILEGES 
         WHERE OBJECT_TYPE = 'CHARACTER SET' AND OBJECT_NAME = 'CS'
         AND GRANTEE = 'CTS2';
-- PASS:7064 If COUNT = 0?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7064 If statement completed successfully?

   REVOKE USAGE ON CHARACTER SET CS FROM CTS3 RESTRICT;
-- PASS:7064 If ERROR - access rule violation?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS3';
-- PASS:7064 If statement executed successfully?

   INSERT INTO TEMP764C VALUES(_CTS1.CS 'TEST', _CTS1.CS 'DONE');
-- PASS:7064 If 1 row inserted successfully?

   ROLLBACK WORK;

   DROP TABLE TEMP764C CASCADE;
-- PASS:7064 If table dropped successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7064 If statement completed successfully?

   REVOKE USAGE ON CHARACTER SET CS FROM CTS3 CASCADE;
-- PASS:7064 If usage is revoked successfully?

   COMMIT WORK;

-- END TEST >>> 7064 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
