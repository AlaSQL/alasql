-- MODULE MPA010G
-- ORDER OF EXECUTION:  13
-- PREVIOUS PROGRAM:    MPB010F
-- NEXT PROGRAM:        N/A

-- SQL Test Suite, V6.0, Interactive SQL, mpa010g.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0560 Table privileges vs. column privileges!

DROP TABLE X CASCADE;

COMMIT WORK;

-- END TEST >>> 0560 <<< END TEST

-- That's it!

-- *************************************************////END-OF-MODULE
