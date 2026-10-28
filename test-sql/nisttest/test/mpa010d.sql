-- MODULE MPA010D
-- ORDER OF EXECUTION:  7
-- PREVIOUS PROGRAM:    MPB010C
-- NEXT PROGRAM:        MPB010D

-- SQL Test Suite, V6.0, Interactive SQL, mpa010d.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0628 <revoke statement> (static)!

REVOKE SELECT, UPDATE, DELETE ON GRANT010 FROM HU CASCADE;

COMMIT WORK;

-- Now execute MPB010D as HU!

-- *************************************************////END-OF-MODULE
