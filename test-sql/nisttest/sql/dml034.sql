-- MODULE DML034

-- SQL Test Suite, V6.0, Interactive SQL, dml034.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU                                                          

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0088 Data type REAL!

-- setup
     INSERT INTO GG
            VALUES(123.4567E-2);
-- PASS:0088 If 1 row is inserted?

     SELECT REALTEST                                                    
          FROM GG;
-- PASS:0088 If REALTEST = 1.234567 ?
-- PASS:0088 OR  is between 1.234562 and 1.234572 ?

     SELECT * 
        FROM GG    
        WHERE REALTEST > 1.234561 and REALTEST < 1.234573;
-- PASS:0088 If 1 row selected?

-- restore                                                                 
     ROLLBACK WORK;

-- END TEST >>> 0088 <<< END TEST
-- ****************************************************************

-- TEST:0090 Data type DOUBLE PRECISION!

-- setup
     INSERT INTO II
            VALUES(0.123456123456E6);
-- PASS:0090 If 1 row is inserted?

     SELECT DOUBLETEST                                                  
          FROM II;
-- PASS:0090 If DOUBLETEST = 123456.123456 ?
-- PASS:0090 OR  is between 123456.123451 and 123456.123461 ?

     SELECT * 
       FROM II 
       WHERE DOUBLETEST > 123456.123450 and DOUBLETEST < 123456.123462;
-- PASS:0090 If 1 row selected?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0090 <<< END TEST
-- ***********************************************************

-- TEST:0091 Data type FLOAT!

-- setup
     INSERT INTO JJ
            VALUES(12.345678);
-- PASS:0091 If 1 row is inserted?
                                                                               
     SELECT FLOATTEST                                                  
          FROM JJ;
-- PASS:0091 If FLOATTEST = 12.345678 ?
-- PASS:0091 OR  is between 12.345673 and 12.345683 ?

     SELECT * 
       FROM JJ
       WHERE FLOATTEST > 12.345672 and FLOATTEST < 12.345684;
-- PASS:0091 If 1 row selected?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0091 <<< END TEST
-- **********************************************************

-- TEST:0092 Data type FLOAT(32)!

-- setup
     INSERT INTO KK
            VALUES(123.456123456E+3);
-- PASS:0092 If 1 row is inserted?
                                                                                
     SELECT FLOATTEST                                                   
          FROM KK;
-- PASS:0092 If FLOATTEST = 123456.123456 ?
-- PASS:0092 OR  is between 123456.1233 and 123456.1236 ?

     SELECT * 
       FROM KK
       WHERE FLOATTEST > 123456.123450 and FLOATTEST < 123456.123462;
-- PASS:0092 If 1 row selected?

-- restore
     ROLLBACK WORK;                                                           

-- END TEST >>> 0092 <<< END TEST
-- *************************************************************

-- TEST:0093 Data type NUMERIC(13,6)!

-- setup
     INSERT INTO LL
            VALUES(123456.123456);
-- PASS:0093 If 1 row is inserted?
 
     SELECT *
          FROM LL;
-- PASS:0093 If NUMTEST = 123456.123456 ?
-- PASS:0093 OR  is between 123456.123451 and 123456.123461 ?

     SELECT * 
       FROM LL
       WHERE NUMTEST > 123456.123450 and NUMTEST < 123456.123462;
-- PASS:0093 If 1 row selected?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0093 <<< END TEST
-- *************************************************************

-- TEST:0094 Data type DECIMAL(13,6)!

-- setup
     INSERT INTO PP
             VALUES(123456.123456);
-- PASS:0094 If 1 row is inserted?

     SELECT *
          FROM PP;
-- PASS:0094 If NUMTEST = 123456.123456 ?
-- PASS:0094 OR  is between 123456.123451 and 123456.123461 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0094 <<< END TEST
-- **************************************************************

-- TEST:0095 Data type DEC(13,6)!

-- setup
     INSERT INTO SS
            VALUES(123456.123456);
-- PASS:0095 If 1 row is inserted?

     SELECT *
          FROM SS;
-- PASS:0095 If NUMTEST = 123456.123456 ?
-- PASS:0095 OR  is between 123456.123451 and 123456.123461 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0095 <<< END TEST
-- *************************************************////END-OF-MODULE
