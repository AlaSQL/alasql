-- MODULE CDR024

-- SQL Test Suite, V6.0, Interactive SQL, cdr024.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0385 character default column values!

     DELETE FROM CHAR_DEFAULT;
-- Making sure the table is empty

-- setup
     INSERT INTO CHAR_DEFAULT(SEX_CODE) VALUES ('M');
-- PASS:0385 If 1 row is inserted?
 
     SELECT NICKNAME, INSURANCE1  
          FROM CHAR_DEFAULT
          WHERE SEX_CODE = 'M';
-- PASS:0385 If NICKNAME = 'No nickname given', INSURANCE1 = 'basic'? 

     INSERT INTO CHAR_DEFAULT(NICKNAME, INSURANCE1)
            VALUES ('Piggy', 'Kaise');
-- PASS:0385 If 1 row is inserted?

     SELECT SEX_CODE  
          FROM CHAR_DEFAULT
          WHERE INSURANCE1 = 'Kaise';
-- PASS:0385 If SEX_CODE = 'F'?

     COMMIT WORK;

-- END TEST >>> 0385 <<< END TEST
-- *************************************************************

-- TEST:0386 exact numeric default column values!

     DELETE FROM EXACT_DEF;
-- Making sure the table is empty

-- setup
     INSERT INTO EXACT_DEF
            VALUES (98.3, -55556, .000001);
-- PASS:0386 If 1 row is inserted?

     INSERT INTO EXACT_DEF(BODY_TEMP)
            VALUES (99.0);
-- PASS:0386 If 1 row is inserted?

     INSERT INTO EXACT_DEF(MAX_NUM, MIN_NUM)
            VALUES (100, .2);
-- PASS:0386 If 1 row is inserted?

     SELECT COUNT(*)  
          FROM EXACT_DEF
          WHERE BODY_TEMP = 99.0 AND 
          MAX_NUM = -55555 AND MIN_NUM = .000001
          OR BODY_TEMP = 98.6 AND MAX_NUM = 100 AND MIN_NUM = .2;
-- PASS:0386 If count = 2?

     COMMIT WORK;

-- END TEST >>> 0386 <<< END TEST
-- *************************************************************

-- TEST:0387 approximate numeric default column values!

     DELETE FROM APPROX_DEF;
-- Making sure the table is empty

-- setup
     INSERT INTO APPROX_DEF(X_COUNT)
            VALUES (5.0E5);
-- PASS:0387 If 1 row is inserted?

     INSERT INTO APPROX_DEF
            VALUES (1.78E11, -9.9E10, 3.45E-10, 7.6777E-7);
-- PASS:0387 If 1 row is inserted?

     INSERT INTO APPROX_DEF(Y_COUNT, Z_COUNT, ZZ_COUNT)
            VALUES (1.0E3, 2.0E4, 3.8E6);
-- PASS:0387 If 1 row is inserted?

     SELECT COUNT(*) 
          FROM APPROX_DEF
          WHERE (Y_COUNT BETWEEN -9.991E10 AND -9.989E10) AND
              (Z_COUNT BETWEEN 3.44E-11 AND 3.46E-11) AND
              (ZZ_COUNT BETWEEN -7.6778E-7 AND -7.6776E-7) OR
              (X_COUNT BETWEEN 1.77E12 AND 1.79E12);
-- PASS:0387 If count = 2?

     COMMIT WORK;

-- END TEST >>> 0387 <<< END TEST
-- *************************************************************

-- TEST:0388 FIPS sz. default column values!

     DELETE FROM SIZE_TAB;
-- Making sure the table is empty

-- setup
     INSERT INTO SIZE_TAB(COL1) VALUES(
'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789012');
-- PASS:0388 If 1 row is inserted?

     INSERT INTO SIZE_TAB(COL2, COL3, COL4)
            VALUES (-999888777, 987654321.123456, -1.45E22);
-- PASS:0388 If 1 row is inserted?


     INSERT INTO SIZE_TAB
            VALUES('ABCDEFG',7,7,-1.49E22);
-- PASS:0388 If 1 row is inserted?
 
     SELECT COUNT(*)  FROM SIZE_TAB
          WHERE COL4 BETWEEN -1.46E22 AND -1.048575E22
          GROUP BY COL1, COL2, COL3;
-- PASS:0388 If count = 2?

     COMMIT WORK;

-- END TEST >>> 0388 <<< END TEST
-- *************************************************////END-OF-MODULE
