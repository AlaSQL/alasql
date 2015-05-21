-- MODULE MPB010E
-- ORDER OF EXECUTION:  10
-- PREVIOUS PROGRAM:    MPA010E
-- NEXT PROGRAM:        MPA010F

-- SQL Test Suite, V6.0, Interactive SQL, mpb010e.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0628 <revoke statement> (static)!

SELECT COUNT(*) FROM FLATER.GRANT010;
-- PASS:0628 If ERROR, syntax error/access violation, 0 rows selected?

INSERT INTO FLATER.GRANT010 VALUES (0);
-- PASS:0628 If ERROR, syntax error/access violation, 0 rows inserted?

UPDATE FLATER.GRANT010 SET C1 = 0;
-- PASS:0628 If ERROR, syntax error/access violation, 0 rows updated?

DELETE FROM FLATER.GRANT010;
-- PASS:0628 If ERROR, syntax error/access violation, 0 rows deleted?

COMMIT WORK;

-- END TEST >>> 0628 <<< END TEST

-- Now execute MPA010F as FLATER!

-- *************************************************////END-OF-MODULE
