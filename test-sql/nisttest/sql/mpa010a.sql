-- MODULE MPA010A
-- ORDER OF EXECUTION:  1
-- PREVIOUS PROGRAM:    N/A
-- NEXT PROGRAM:        MPB010A

-- SQL Test Suite, V6.0, Interactive SQL, mpa010a.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0627 <grant statement> (static)!

DROP TABLE GRANT010 RESTRICT;

CREATE TABLE GRANT010 (C1 INT);

COMMIT WORK;

INSERT INTO GRANT010 VALUES (1);

COMMIT WORK;

-- Now execute MPB010A as HU!

-- *************************************************////END-OF-MODULE
