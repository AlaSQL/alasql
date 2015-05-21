-- MODULE MPB010F
-- ORDER OF EXECUTION:  12
-- PREVIOUS PROGRAM:    MPA010F
-- NEXT PROGRAM:        MPA010G

-- SQL Test Suite, V6.0, Interactive SQL, mpb010f.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0560 Table privileges vs. column privileges!

UPDATE FLATER.X SET A = 0;
-- PASS:0560 If 1 row is updated?

UPDATE FLATER.X SET B = 0;
-- PASS:0560 If ERROR, syntax error/access violation, 0 rows updated?

UPDATE FLATER.X SET C = 0;
-- PASS:0560 If 1 row is updated?

UPDATE FLATER.X SET D = 0;
-- PASS:0560 If 1 row is updated?

SELECT COUNT(*) FROM FLATER.X
  WHERE A = 0 AND B = 2 AND C = 0 AND D = 0;
-- PASS:0560 If count = 1?

COMMIT WORK;

-- Now execute MPA010G as FLATER!

-- *************************************************////END-OF-MODULE
