-- MODULE DML076

-- SQL Test Suite, V6.0, Interactive SQL, dml076.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- NO_TEST:0435 Host variables in UPDATE WHERE CURRENT!

-- Testing cursors <update statement:positioned>

-- *************************************************************

-- TEST:0436 NULL values for various SQL data types!

    INSERT INTO BB VALUES(NULL);
    INSERT INTO EE VALUES(NULL);
    INSERT INTO GG VALUES(NULL);
    INSERT INTO HH VALUES(NULL);
    INSERT INTO II VALUES(NULL);
    INSERT INTO JJ VALUES(NULL);
    INSERT INTO MM VALUES(NULL);
    INSERT INTO SS VALUES(NULL);
 

    SELECT CHARTEST 
      FROM BB;
-- PASS:0436 If CHARTEST is NULL (Implementor defined print format)?


    SELECT INTTEST
      FROM EE;
-- PASS:0436 If INTTEST is NULL (Implementor defined print format)?


    SELECT REALTEST 
      FROM GG;
-- PASS:0436 If REALTEST is NULL (Implementor defined print format)?


    SELECT COUNT(*)
      FROM GG 
      WHERE REALTEST IS NULL;
-- PASS:0436 If count = 1?


    SELECT SMALLTEST 
      FROM HH;
-- PASS:0436 If SMALLTEST is NULL (Implementor defined print format)?


    SELECT DOUBLETEST 
      FROM II;
-- PASS:0436 If DOUBLETEST is NULL (Implementor defined print format)?


    SELECT COUNT(*) 
      FROM II 
      WHERE DOUBLETEST IS NULL;
-- PASS:0436 If count = 1?


    SELECT FLOATTEST 
      FROM JJ;
-- PASS:0436 If FLOATTEST is NULL (Implementor defined print format)?


    SELECT COUNT(*) 
      FROM JJ 
      WHERE FLOATTEST IS NULL;
-- PASS:0436 If count = 1?


    SELECT NUMTEST  
      FROM MM;
-- PASS:0436 If NUMTEST is NULL (Implementor defined print format)?


    SELECT NUMTEST 
      FROM SS;
-- PASS:0436 If NUMTEST is NULL (Implementor defined print format)?


-- restore
    ROLLBACK WORK;

-- END TEST >>> 0436 <<< END TEST
-- *************************************************************

-- NO_TEST:0437 NULL values for various host variable types!

-- Testing Host Variables & Indicator Variables

-- *************************************************************

-- NO_TEST:0410 NULL value in OPEN CURSOR!

-- Testing Cursors & Indicator Variables

-- *************************************************************

-- NO_TEST:0441 NULL value for various predicates!

-- Testing Indicator Variables

-- *************************************************////END-OF-MODULE
