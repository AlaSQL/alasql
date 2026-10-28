-- MODULE   XTS717

-- SQL Test Suite, V6.0, Interactive SQL, xts717.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7017 SET SESSION AUTH. to current auth-id in. transaction!

   SELECT COUNT(*) FROM CTS1.STAFF;
-- PASS:7017 If COUNT = 5?

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7017 If ERROR - invalid transaction state?

   ROLLBACK WORK;

   SELECT EMPNAME FROM CTS1.STAFF;
-- PASS:7017 If 1 row selected?

   SET SESSION AUTHORIZATION CURRENT_USER;
-- PASS:7017 If ERROR - invalid tranaction state?

   ROLLBACK WORK;

   INSERT INTO STAFF
         VALUES('E9','NoName',19,'NoCity');
-- PASS:7017 If 1 row inserted successfully?

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7017 If ERROR - invalid tranaction state?

   ROLLBACK WORK;

-- END TEST >>> 7017 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
