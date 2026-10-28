-- MODULE DML035

-- SQL Test Suite, V6.0, Interactive SQL, dml035.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0157 ORDER BY approximate numeric!

-- setup
     INSERT INTO JJ VALUES(66.2);
-- PASS:0157 If 1 row is inserted?
     INSERT INTO JJ VALUES(-44.5);
-- PASS:0157 If 1 row is inserted?
     INSERT INTO JJ VALUES(0.2222);
-- PASS:0157 If 1 row is inserted?
     INSERT INTO JJ VALUES(66.3);
-- PASS:0157 If 1 row is inserted?
     INSERT INTO JJ VALUES(-87);
-- PASS:0157 If 1 row is inserted?
     INSERT INTO JJ VALUES(-66.25);
-- PASS:0157 If 1 row is inserted?

     SELECT FLOATTEST
          FROM JJ
          ORDER BY FLOATTEST DESC;
-- PASS:0157 If 6 rows are selected ?
-- PASS:0157 If last FLOATTEST = -87 OR  is between -87.5 and -86.5 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0157 <<< END TEST
-- *************************************************////END-OF-MODULE
