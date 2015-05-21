-- MODULE   XTS716

-- SQL Test Suite, V6.0, Interactive SQL, xts716.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7016 SET SESSION AUTHORIZATION to current auth-id!

   SELECT COUNT(*) FROM CTS1.STAFF;
-- PASS:7016 If COUNT = 5?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7016 If statement executed successfully without ERRORs?

   SELECT COUNT(*) FROM CTS1.STAFF;
-- PASS:7016 If COUNT = 5?

   COMMIT WORK;

   SET SESSION AUTHORIZATION USER;
-- PASS:7016 If statement executed successfully without ERRORs?

   SELECT COUNT(*) FROM CTS1.STAFF;
-- PASS:7016 If COUNT = 5?

   ROLLBACK WORK;

-- END TEST >>> 7016 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
