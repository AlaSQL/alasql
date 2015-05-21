-- MODULE MPA010C
-- ORDER OF EXECUTION:  5
-- PREVIOUS PROGRAM:    MPB010B
-- NEXT PROGRAM:        MPB010C

-- SQL Test Suite, V6.0, Interactive SQL, mpa010c.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0627 <grant statement> (static)!

GRANT ALL PRIVILEGES ON GRANT010 TO HU;

COMMIT WORK;

-- Now execute MPB010C as HU!

-- *************************************************////END-OF-MODULE
