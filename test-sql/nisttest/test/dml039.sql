-- MODULE DML039

-- SQL Test Suite, V6.0, Interactive SQL, dml039.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0208 Upper and lower case in LIKE predicate!

-- setup
     INSERT INTO STAFF
            VALUES('E7', 'yanping',26,'China');
-- PASS:0208 If 1 row is inserted?

     INSERT INTO STAFF
            VALUES('E8','YANPING',30,'NIST');
-- PASS:0208 If 1 row is inserted?

      SELECT CITY
           FROM STAFF
           WHERE EMPNAME LIKE 'yan____%';
-- PASS:0208 If CITY = 'China'?

      SELECT CITY
           FROM STAFF
           WHERE EMPNAME LIKE 'YAN____%';
-- PASS:0208 If CITY = 'NIST'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0208 <<< END TEST
-- *************************************************////END-OF-MODULE
