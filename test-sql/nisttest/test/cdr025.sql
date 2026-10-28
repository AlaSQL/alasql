-- MODULE CDR025 

-- SQL Test Suite, V6.0, Interactive SQL, cdr025.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

     DELETE FROM C_TRANSACTION;
     DELETE FROM COMMODITY;
     DELETE FROM CURRENCY_TABLE;
     DELETE FROM MEASURE_TABLE;
-- Making sure the tables are empty

-- setup
     INSERT INTO COMMODITY VALUES (17, 'Wheat');
     INSERT INTO COMMODITY VALUES (14, 'Saffron');
     INSERT INTO COMMODITY VALUES (23, 'Alfalfa');

     INSERT INTO CURRENCY_TABLE VALUES ('DOLLAR', 1.00);
     INSERT INTO CURRENCY_TABLE VALUES ('POUND', 1.91);
     INSERT INTO CURRENCY_TABLE VALUES ('DM', .45);

     INSERT INTO MEASURE_TABLE VALUES ('POUND', 1.00);
     INSERT INTO MEASURE_TABLE VALUES ('OUNCE', .06);
     INSERT INTO MEASURE_TABLE VALUES ('KILO', 2.20);
     INSERT INTO MEASURE_TABLE VALUES ('TON', 2000.00);

     INSERT INTO C_TRANSACTION
            VALUES (17, 1411.5, 'DM', 4000, 'KILO', 871212);
     INSERT INTO C_TRANSACTION
            VALUES (17, 7000.0, 'POUND', 100, 'TON', 871012);
     INSERT INTO C_TRANSACTION
            VALUES (23, 20000.0, 'DOLLAR', 40000, 'POUND', 880707);
     INSERT INTO C_TRANSACTION
            VALUES (14, 10000.0, 'DM', 900, 'OUNCE', 880606);
     INSERT INTO C_TRANSACTION
            VALUES (14, 10000.0, 'DM', 900, 'OUNCE', 880707);

     COMMIT WORK;

-- TEST:0402 Computed GROUP BY view over referencing tables!

     SELECT COUNT(*) 
          FROM C_TRANSACTION WHERE COMMOD_NO = 17;

-- PASS:0402 If count = 2?

     SELECT UNIT_PRICE, FROM_DATE, TO_DATE, COMMODITY
          FROM DOLLARS_PER_POUND
          ORDER BY COMMODITY DESC;

-- PASS:0402 If the first row has the following values?
-- PASS:0402 If UNIT_PRICE is between 0.06 and 0.07?
-- PASS:0402 If FROM_DATE = 871012 and TO_DATE = 871212?

-- END TEST >>> 0402 <<< END TEST
-- *************************************************************

-- TEST:0403 View on computed GROUP BY view with join!
-- NOTE:  OPTIONAL test

     SELECT COUNT(*)
          FROM COST_PER_UNIT;

-- PASS:0403 If count = 24?


     SELECT CURRENCY, MEASURE, UNIT_PRICE, COMMODITY
          FROM COST_PER_UNIT;

-- PASS:0403 If for values CURRENCY = 'DM' and?
-- PASS:0403 MEASURE = 'KILO' and COMMODITY = 'Alfalfa'?
-- PASS:0403 UNIT_PRICE is between 2.42 and 2.47?

-- END TEST >>> 0403 <<< END TEST
-- *************************************************************

-- TEST:0413 Computed SELECT on computed VIEW!

     SELECT (100 + 7) * UNIT_PRICE * 700 / 100, COMMODITY
          FROM DOLLARS_PER_POUND
          ORDER BY COMMODITY;

-- PASS:0413 If the first row has the following values?
-- PASS:0413 If Answer is between 374.4 and 374.6?
-- PASS:0413 If COMMODITY = 'Alfalfa'?

  COMMIT WORK;
 
-- END TEST >>> 0413 <<< END TEST
-- *************************************************////END-OF-MODULE
