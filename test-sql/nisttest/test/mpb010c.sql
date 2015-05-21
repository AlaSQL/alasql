-- MODULE MPB010C
-- ORDER OF EXECUTION:  6
-- PREVIOUS PROGRAM:    MPA010C
-- NEXT PROGRAM:        MPA010D

-- SQL Test Suite, V6.0, Interactive SQL, mpb010c.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0627 <grant statement> (static)!

SELECT COUNT(*) FROM FLATER.GRANT010;
-- PASS:0627 If count = 1?

INSERT INTO FLATER.GRANT010 VALUES (0);
-- PASS:0627 If 1 row is inserted?

SELECT COUNT(*) FROM FLATER.GRANT010;
-- PASS:0627 If count = 2?

UPDATE FLATER.GRANT010 SET C1 = 0;
-- PASS:0627 If 2 rows are updated?

SELECT COUNT(*) FROM FLATER.GRANT010 WHERE C1 = 0;
-- PASS:0627 If count = 2?

DELETE FROM FLATER.GRANT010;
-- PASS:0627 If 2 rows are deleted?

SELECT COUNT(*) FROM FLATER.GRANT010;
-- PASS:0627 If count = 0?

COMMIT WORK;

GRANT SELECT ON FLATER.GRANT010 TO SCHANZLE;
-- PASS:0627 If WARNING:  privilege not granted?

COMMIT WORK;

-- END TEST >>> 0627 <<< END TEST

-- Now execute MPA010D as FLATER!

-- *************************************************////END-OF-MODULE
