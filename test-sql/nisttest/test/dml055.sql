-- MODULE DML055

-- SQL Test Suite, V6.0, Interactive SQL, dml055.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0243 FIPS sizing - precision of SMALLINT >= 4!
-- FIPS sizing TEST

     DELETE FROM HH;
-- Making sure the table is empty

-- setup
     INSERT INTO HH
            VALUES(9999);
-- PASS:0243 If 1 row is inserted?

     SELECT COUNT(*) 
          FROM HH
          WHERE SMALLTEST = 9999;
-- PASS:0243 If count = 1?

-- setup
     INSERT INTO HH
            VALUES(-9999);
-- PASS:0243 If 1 row is inserted?

     SELECT SMALLTEST 
          FROM HH
          WHERE SMALLTEST = -9999;
-- PASS:0243 If SMALLTEST = -9999?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0243 <<< END TEST

-- ***************************************************************

-- TEST:0244 FIPS sizing - precision of INTEGER >= 9!
-- FIPS sizing TEST

     DELETE FROM EE;
-- Making sure the table is empty

-- setup
     INSERT INTO EE
            VALUES(999999999);
-- PASS:0244 If 1 row is inserted?

     SELECT INTTEST
          FROM EE
          WHERE INTTEST = 999999999;
-- PASS:0244 If INTTEST = 999999999?

-- setup
     INSERT INTO EE
            VALUES(-999999999);
-- PASS:0244 If 1 row is inserted?

     SELECT COUNT(*) 
          FROM EE
          WHERE INTTEST = -999999999;
-- PASS:0244 If count = 1?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0244 <<< END TEST

-- *****************************************************************

-- TEST:0245 FIPS sizing - precision of DECIMAL >= 15!
-- FIPS sizing TEST

     DELETE FROM PP_15;
-- Making sure the table is empty

-- setup
     INSERT INTO PP_15
            VALUES(.123456789012345);
-- PASS:0245 If 1 row is inserted?

     SELECT NUMTEST
          FROM PP_15;
-- PASS:0245 If NUMTEST = 0.123456789012345?

     SELECT COUNT(*) FROM PP_15
       WHERE NUMTEST = 0.123456789012345;
-- PASS:0245 If count = 1?

     DELETE FROM PP_15;
-- PASS:0245 If 1 row is deleted?

-- setup
     INSERT INTO PP_15
            VALUES(-.912345678901234);
-- PASS:0245 If 1 row is inserted?

     SELECT COUNT(*) 
          FROM PP_15
          WHERE NUMTEST = -0.912345678901234;
-- PASS:0245 If count = 1?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0245 <<< END TEST
-- *************************************************////END-OF-MODULE
