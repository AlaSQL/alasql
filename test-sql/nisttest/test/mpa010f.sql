-- MODULE MPA010F
-- ORDER OF EXECUTION:  11
-- PREVIOUS PROGRAM:    MPB010E
-- NEXT PROGRAM:        MPB010F

-- SQL Test Suite, V6.0, Interactive SQL, mpa010f.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0560 Table privileges vs. column privileges!

CREATE TABLE X (A INT, B INT, C INT);

GRANT SELECT, UPDATE ON X TO HU;

REVOKE UPDATE (B) ON X FROM HU CASCADE;

ALTER TABLE X ADD D INT;

COMMIT WORK;

INSERT INTO X VALUES (1, 2, 3, 4);

COMMIT WORK;

-- Now execute MPB010F as HU!

-- *************************************************////END-OF-MODULE
