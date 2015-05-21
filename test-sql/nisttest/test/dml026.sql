-- MODULE DML026

-- SQL Test Suite, V6.0, Interactive SQL, dml026.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0118 Monadic arithmetic operator +!

      SELECT +MAX(DISTINCT HOURS)
              FROM WORKS;
-- PASS:0118 If +MAX(DISTINCT HOURS) = 80?

-- END TEST >>> 0118 <<< END TEST
-- *********************************************************

-- TEST:0119 Monadic arithmetic operator -!

      SELECT -MAX(DISTINCT HOURS)
              FROM WORKS;
-- PASS:0119 If -MAX(DISTINCT HOURS) = -80?

-- END TEST >>> 0119 <<< END TEST
-- *********************************************************

-- TEST:0120 Value expression with NULL primary IS NULL!

-- setup
     INSERT INTO WORKS1
            SELECT * 
                 FROM WORKS;
-- PASS:0120 If 12 rows are inserted ?

-- setup
     INSERT INTO WORKS1
            VALUES('E9','P1',NULL);
-- PASS:0120 If 1 row is inserted?

      SELECT EMPNUM
           FROM WORKS1
           WHERE HOURS IS NULL;
-- PASS:0120 If EMPNUM = 'E9'?

-- NOTE:0120 we insert into WORKS from WORKS1

-- setup
     INSERT INTO WORKS
            SELECT EMPNUM,'P9',20+HOURS
                 FROM WORKS1
                 WHERE EMPNUM='E9';
-- PASS:0120 If 1 row is inserted?

      SELECT COUNT(*)
           FROM WORKS
           WHERE EMPNUM='E9';
-- PASS:0120 If count = 1      ?

      SELECT COUNT(*)
              FROM WORKS
              WHERE HOURS IS NULL;
-- PASS:0120 If count = 1 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0120 <<< END TEST
-- **********************************************************

-- TEST:0121 Dyadic operators +, -, *, /!

      SELECT COUNT(*)
           FROM VTABLE;
-- PASS:0121 If count = 4 ?

      SELECT +COL1+COL2 - COL3*COL4/COL1
              FROM VTABLE
              WHERE COL1=10;
-- PASS:0121 If answer is -90?

-- END TEST >>> 0121 <<< END TEST
-- *********************************************************

-- TEST:0122 Divisor shall not be zero!

      SELECT COL2/COL1+COL3
              FROM VTABLE
              WHERE COL4=3;
-- PASS:0122 If ERROR Number not Divisible by Zero?

-- END TEST >>> 0122 <<< END TEST
-- **********************************************************

-- TEST:0123 Evaluation order of expression!

      SELECT (-COL2+COL1)*COL3 - COL3/COL1
              FROM VTABLE
              WHERE COL4 IS NULL;
-- PASS:0123 If Answer is 8999997 (plus or minus 0.5)?

-- END TEST >>> 0123 <<< END TEST
-- *************************************************////END-OF-MODULE
