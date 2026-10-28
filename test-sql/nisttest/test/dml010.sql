-- MODULE DML010

-- SQL Test Suite, V6.0, Interactive SQL, dml010.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0027 INSERT short string in long col -- space padding !

-- setup 
     INSERT INTO TMP (T1, T2, T3) 
            VALUES ( 'xxxx',23,'xxxx');
-- PASS:0027 If 1 row inserted?
 
      SELECT *
           FROM TMP
           WHERE T2 = 23 AND T3 = 'xxxx      ';
-- PASS:0027 If T1 = 'xxxx      ' ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0027 <<< END TEST
-- ************************************************************* 

-- TEST:0028 Insert String that fits Exactly in Column!

-- setup
     INSERT INTO TMP (T1, T2, T3) 
            VALUES ('xxxxxxxxxx', 23,'xxxxxxxxxx'); 
-- PASS:0028 If 1 row inserted?

      SELECT *
           FROM TMP
           WHERE T2 = 23;
-- PASS:0028 If T1 = 'xxxxxxxxxx'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0028 <<< END TEST
-- ***********************************************************

-- TEST:0031 INSERT(column list) VALUES(NULL and literals)!

-- setup
     INSERT INTO TMP (T2, T3, T1) 
            VALUES (NULL,'zz','z'); 
-- PASS:0031 If 1 row inserted?

      SELECT *
           FROM   TMP
           WHERE  T2 IS NULL;
-- PASS:0031 If T1 = 'z         '?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0031 <<< END TEST

-- *************************************************////END-OF-MODULE
