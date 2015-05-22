-- MODULE MPA010E
-- ORDER OF EXECUTION:  9
-- PREVIOUS PROGRAM:    MPB010D
-- NEXT PROGRAM:        MPB010E

-- SQL Test Suite, V6.0, Interactive SQL, mpa010e.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0628 <revoke statement> (static)!

REVOKE ALL PRIVILEGES ON GRANT010 FROM HU CASCADE;

COMMIT WORK;

-- Now execute MPB010E as HU!

-- *************************************************////END-OF-MODULE
