-- MODULE SDL020

-- SQL Test Suite, V6.0, Interactive SQL, sdl020.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0156 Tables(Multi-sets), duplicate rows allowed!
     DELETE FROM TEMP_S;

-- setup
     INSERT INTO TEMP_S
            SELECT EMPNUM,GRADE,CITY
            FROM STAFF;
-- PASS:0156 If 5 rows are inserted?

      SELECT COUNT(*)
           FROM TEMP_S;
-- PASS:0156 If count = 5?

      INSERT INTO TEMP_S
             SELECT EMPNUM,GRADE,CITY
             FROM STAFF;
-- PASS:0156 If 5 rows are inserted?

      SELECT COUNT(*)
           FROM TEMP_S;
-- PASS:0156 If count = 10?

      SELECT COUNT(DISTINCT EMPNUM)
           FROM TEMP_S;
-- PASS:0156 If count = 5?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0156 <<< END TEST
-- *************************************************////END-OF-MODULE
