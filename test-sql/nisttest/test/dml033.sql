-- MODULE DML033

-- SQL Test Suite, V6.0, Interactive SQL, dml033.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0135 Upper and loer case letters are distinct!

-- setup
     INSERT INTO WORKS
            VALUES('UPP','low',100);
-- PASS:0135 If 1 row is inserted?

      SELECT EMPNUM,PNUM
           FROM WORKS
           WHERE EMPNUM='UPP' AND PNUM='low';
-- PASS:0135 If EMPNUM = 'UPP' and PNUM = 'low'?

      SELECT EMPNUM,PNUM
           FROM WORKS
           WHERE EMPNUM='upp' OR PNUM='LOW';
-- PASS:0135 If 0 rows are selected - out of data?

-- restore
     ROLLBACK WORK;
-- END TEST >>> 0135 <<< END TEST
-- *************************************************////END-OF-MODULE
