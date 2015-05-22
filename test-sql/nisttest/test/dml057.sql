-- MODULE DML057

-- SQL Test Suite, V6.0, Interactive SQL, dml057.sql
-- 59-byte ID
-- TEd Version #
 
-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0248 FIPS sizing - binary precision of FLOAT >= 20!
-- FIPS sizing TEST

     DELETE FROM JJ;
-- Making sure the table is empty

-- setup
     INSERT INTO JJ
            VALUES(0.1048575);
-- PASS:0248 If 1 row is inserted?

     SELECT FLOATTEST
          FROM JJ;
-- PASS:0248 If FLOATTEST = 0.1048575 ?
-- PASS:0248 OR  is between 0.1048574 and 0.1048576 ?

     SELECT COUNT(*) FROM JJ
       WHERE FLOATTEST > 0.1048574 AND FLOATTEST < 0.1048576;
-- PASS:0248 If count = 1?

     DELETE FROM JJ;
-- Making sure the table is empty

-- setup
     INSERT INTO JJ
            VALUES(-0.1048575);
-- PASS:0248 If 1 row is inserted?

     SELECT FLOATTEST
          FROM JJ;
-- PASS:0248 If FLOATTEST = -0.1048575 ?
-- PASS:0248 OR  is between -0.1048576 and -0.1048574 ?

     SELECT COUNT(*) FROM JJ
       WHERE FLOATTEST > -0.1048576 AND FLOATTEST < -0.1048574;
-- PASS:0248 If count = 1?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0248 <<< END TEST

-- *****************************************************************

-- TEST:0249 FIPS sizing - binary precision of REAL >= 20!
-- FIPS sizing TEST

     DELETE FROM GG;
-- Making sure the table is empty

-- setup
     INSERT INTO GG
            VALUES(0.1048575);
-- PASS:0249 If 1 row is inserted?

     SELECT REALTEST
          FROM GG;
-- PASS:0249 If REALTEST =  0.1048575 ?
-- PASS:0249 OR  is between 0.1048574 and 0.1048576 ?

     SELECT COUNT(*) FROM GG
       WHERE REALTEST > 0.1048574 AND REALTEST < 0.1048576;
-- PASS:0249 If count = 1?

     DELETE FROM GG;
-- Making sure the table is empty

-- setup
     INSERT INTO GG
            VALUES(-0.1048575);
-- PASS:0249 If 1 row is inserted?

     SELECT REALTEST
          FROM GG;
-- PASS:0249 If REALTEST =  -0.1048575 ?
-- PASS:0249 OR  is between -0.1048576 and -0.1048574 ?

     SELECT COUNT(*) FROM GG
       WHERE REALTEST > -0.1048576 AND REALTEST < -0.1048574;
-- PASS:0249 If count = 1?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0249 <<< END TEST

-- ***************************************************************

-- TEST:0250 FIPS sizing - bin. precision of DOUBLE >= 30!
-- FIPS sizing TEST

     DELETE FROM II;
-- Making sure the table is empty

-- setup
     INSERT INTO II
            VALUES(0.1073741823);
-- PASS:0250 If 1 row is inserted?

     SELECT DOUBLETEST
          FROM II;
-- PASS:0250 If DOUBLETEST = 0.1073741823 ?
-- PASS:0250 OR  is between  0.1073741822 and 0.1073741824 ?

     SELECT COUNT(*) FROM II
       WHERE DOUBLETEST > 0.1073741822 AND DOUBLETEST < 0.1073741824;
-- PASS:0250 If count = 1?

     DELETE FROM II;
-- Making sure the table is empty

-- setup
     INSERT INTO II
            VALUES(-0.1073741823);
-- PASS:0250 If 1 row is inserted?

     SELECT DOUBLETEST
          FROM II;
-- PASS:0250 If DOUBLETEST = -0.1073741823 ?
-- PASS:0250 OR  is between  -0.1073741824 and -0.1073741822 ?

     SELECT COUNT(*) FROM II
       WHERE DOUBLETEST > -0.1073741824 AND DOUBLETEST < -0.1073741822;
-- PASS:0250 If count = 1?

-- restore 
     ROLLBACK WORK;

-- END TEST >>> 0250 <<< END TEST
-- *************************************************////END-OF-MODULE
