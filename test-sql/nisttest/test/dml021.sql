-- MODULE DML021

-- SQL Test Suite, V6.0, Interactive SQL, dml021.sql
-- 59-byte ID
-- TEd Version #
                                                                   
-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0084 Data type CHAR(20)!

-- setup
     INSERT INTO AA
            VALUES('abcdefghijklmnopqrst');
-- PASS:0084 If 1 row is inserted?
                                                             
     SELECT CHARTEST                                                   
          FROM   AA;
-- PASS:0084 If CHARTEST = 'abcdefghijklmnopqrst' ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0084 <<< END TEST
-- *************************************************************

-- TEST:0173 Data type CHAR!

-- setup
     INSERT INTO BB
            VALUES('a');
-- PASS:0173 If 1 row is inserted?

     SELECT CHARTEST                                                    
          FROM BB;
-- PASS:0173 If CHARTEST = 'a'?

-- restore
     ROLLBACK WORK;                                                         

-- END TEST >>> 0173 <<< END TEST
-- *****************************************************************

-- TEST:0085 Data type CHARACTER(20)!

-- setup
     INSERT INTO CC
            VALUES('abcdefghijklmnopqrst');
-- PASS:0085 If 1 row is inserted?

     SELECT CHARTEST                                                   
          FROM CC;
-- PASS:0085 If CHARTEST = 'abcdefghijklmnopqrst'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0085 <<< END TEST
-- *************************************************************

-- TEST:0174 Data type CHARACTER!

-- setup
     INSERT INTO DD
            VALUES('a');
-- PASS:0174 If 1 row is inserted?
           
     SELECT CHARTEST                                                    
          FROM DD;
-- PASS:0174 If CHARTEST = 'a'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0174 <<< END TEST
-- ****************************************************************

-- TEST:0086 Data type INTEGER!

-- setup
     INSERT INTO EE
            VALUES(123456);
-- PASS:0086 If 1 row is inserted?
                       
     SELECT INTTEST                                                     
          FROM EE;
-- PASS:0086 If INTTEST = 123456?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0086 <<< END TEST
-- ***************************************************************

-- TEST:0087 Data type INT!

-- setup 
     INSERT INTO FF
            VALUES(123456);
-- PASS:0087 If 1 row is inserted?
                
     SELECT INTTEST  
          FROM FF;
-- PASS:0087 If INTTEST = 123456?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0087 <<< END TEST
-- **************************************************************

-- TEST:0089 Data type SMALLINT!

-- setup
     INSERT INTO HH
            VALUES(123);
-- PASS:0089 If 1 row is inserted?

     SELECT *
          FROM HH;  
-- PASS:0089 If SMALLTEST = 123?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0089 <<< END TEST
-- ****************************************************************

-- TEST:0175 Data type NUMERIC!

-- setup
     INSERT INTO MM
            VALUES(7);
-- PASS:0175 If 1 row is inserted?

     SELECT *
          FROM MM;
-- PASS:0175 If NUMTEST = 7?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0175 <<< END TEST
-- ****************************************************************

-- TEST:0176 Data type NUMERIC(9), SELECT *!

-- making sure table is empty
     DELETE FROM NN;

-- setup
     INSERT INTO NN
            VALUES(123456789);
-- PASS:0176 If 1 row is inserted?

     SELECT *
          FROM NN;
-- PASS:0176 If NUMTEST = 123456789 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0176 <<< END TEST
-- *****************************************************************

-- TEST:0177 Data type NUMERIC(9), SELECT column!

-- setup
     INSERT INTO OO
            VALUES(123456789);
-- PASS:0177 If 1 row is inserted ?

     SELECT NUMTEST
          FROM OO;
-- PASS:0177 If NUMTEST = 123456789?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0177 <<< END TEST
-- **************************************************************

-- TEST:0178 Data type DECIMAL!

-- setup
     INSERT INTO QQ
            VALUES(56);
-- PASS:0178 If 1 row is inserted?

     SELECT *
          FROM QQ;
-- PASS:0178 If NUMTEST = 56?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0178 <<< END TEST
-- **************************************************************

-- TEST:0179 Data type DECIMAL(8)!

-- setup
     INSERT INTO RR
            VALUES(12345678);
-- PASS:0179  If 1 row is inserted?

     SELECT *
          FROM RR;
-- PASS:0179 If NUMTEST = 12345678?

-- restore
     ROLLBACK WORK; 

-- END TEST >>> 0179 <<< END TEST
-- *************************************************////END-OF-MODULE
