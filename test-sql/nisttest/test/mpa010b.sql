-- MODULE MPA010B
-- ORDER OF EXECUTION:  3
-- PREVIOUS PROGRAM:    MPB010A
-- NEXT PROGRAM:        MPB010B

-- SQL Test Suite, V6.0, Interactive SQL, mpa010b.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0627 <grant statement> (static)!

GRANT SELECT ON GRANT010 TO HU;

COMMIT WORK;

-- Now execute MPB010B as HU!

-- *************************************************////END-OF-MODULE
