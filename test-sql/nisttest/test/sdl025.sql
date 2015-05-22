-- MODULE SDL025

-- SQL Test Suite, V6.0, Interactive SQL, sdl025.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0204 Updatable VIEW with compound conditions in CHECK!

     SELECT EMPNUM, HOURS
          FROM DOMAIN_VIEW
          WHERE PNUM = 'P3';
-- PASS:0204 If EMPNUM = 'E1' and HOURS = 80?

     INSERT INTO DOMAIN_VIEW
            VALUES('E1', 'P7', 80);
-- PASS:0204 If 1 row is inserted?

     SELECT COUNT(*)
          FROM DOMAIN_VIEW;
-- PASS:0204 If count = 4?

-- restore
     ROLLBACK WORK;

     INSERT INTO DOMAIN_VIEW
            VALUES('E2', 'P4', 80);
-- PASS:0204 If 0 rows are inserted - Violation of check option?

     INSERT INTO DOMAIN_VIEW
            VALUES('E5', 'P5', 20);
-- PASS:0204 If 0 rows are inserted - Violation of check option?

     SELECT COUNT(*)
          FROM DOMAIN_VIEW;
-- PASS:0204 If count = 3?

     SELECT COUNT(*)
          FROM WORKS;
-- PASS:0204 If count = 12?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0204 <<< END TEST
-- *************************************************////END-OF-MODULE
