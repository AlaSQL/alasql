-- MODULE CDR026

-- SQL Test Suite, V6.0, Interactive SQL, cdr026.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0438 (partial-NULL F.K.) F.K. INSERT supported!  

-- Making sure the table is empty
     DELETE FROM EXPERIENCE
       WHERE DESCR = 'Car Mechanic';

-- Various combinations of partial-NULL F.K.
   INSERT INTO EXPERIENCE VALUES('Tom',NULL,NULL,'Car Mechanic');
   INSERT INTO EXPERIENCE VALUES('Yolanda',NULL,NULL,'Car Mechanic');
   INSERT INTO EXPERIENCE VALUES(NULL,112156,NULL,'Car Mechanic');
   INSERT INTO EXPERIENCE VALUES(NULL,062068,NULL,'Car Mechanic');
   INSERT INTO EXPERIENCE VALUES(NULL,NULL,NULL,'Car Mechanic');
-- Fully matching F.K.
   INSERT INTO EXPERIENCE VALUES('Lilian',112156,NULL,'Car Mechanic');

-- Partial mis-match F.K.
   INSERT INTO EXPERIENCE VALUES('Tom',052744,NULL,'Car Mechanic');
-- PASS:0438 If RI ERROR, parent missing, 0 rows inserted?

-- Partial mis-match F.K.
   INSERT INTO EXPERIENCE VALUES('Yolanda',040523,NULL,'Car Mechanic');
-- PASS:0438 If RI ERROR, parent missing, 0 rows inserted?

-- Full mis-match F.K.
   INSERT INTO EXPERIENCE VALUES('Yolanda',062968,NULL,'Car Mechanic');
-- PASS:0438 If RI ERROR, parent missing, 0 rows inserted?


     SELECT EXP_NAME, BTH_DATE
       FROM EXPERIENCE
       WHERE EXP_NAME IS NOT NULL AND BTH_DATE IS NOT NULL 
         AND DESCR = 'Car Mechanic';

-- PASS:0438 If 1 row is seleced with values?
-- PASS:0438 EXP_NAME = 'Lilian' and BTH_DATE = 112156?     


     SELECT COUNT(*)
        FROM EXPERIENCE
        WHERE DESCR = 'Car Mechanic';
-- PASS:0438 If count = 6?


-- restore
     ROLLBACK WORK;

-- END TEST >>> 0438 <<< END TEST
-- *************************************************************

-- TEST:0439 (partial-NULL F.K.) F.K. UPDATE supported!


-- setup
   INSERT INTO EXPERIENCE VALUES('Lilian',NULL,NULL,'Soccer Player');
   INSERT INTO EXPERIENCE VALUES('David',NULL,NULL,'Monk');
   INSERT INTO EXPERIENCE VALUES(NULL,NULL,NULL,'Fireman');
   INSERT INTO EXPERIENCE VALUES(NULL,NULL,NULL,'Artist');

     UPDATE EXPERIENCE
       SET BTH_DATE = 040523
       WHERE EXP_NAME = 'Lilian' AND DESCR = 'Soccer Player';
-- PASS:0439 If RI ERROR, parent missing, 0 rows updated?

     UPDATE EXPERIENCE
       SET EXP_NAME = NULL
       WHERE DESCR = 'Photographer';
-- PASS:0439 If 1 row is updated? 

     UPDATE EXPERIENCE
       SET EXP_NAME = NULL ,BTH_DATE = NULL
       WHERE DESCR = 'Fashion Model';
-- PASS:0439 If 1 row is updated?

     UPDATE EXPERIENCE
       SET BTH_DATE = 101024
       WHERE EXP_NAME = 'David' AND DESCR = 'Monk';
-- PASS:0439 If 1 row is updated?

     UPDATE EXPERIENCE
       SET EXP_NAME = 'Mary', BTH_DATE = 121245
       WHERE DESCR = 'Fireman';
-- PASS:0439 If 1 row is updated?

     UPDATE EXPERIENCE
       SET EXP_NAME = 'Dick' , BTH_DATE = 020454
       WHERE DESCR = 'Artist';
-- PASS:0439 If RI ERROR, parent missing, 0 rows updated?
  
     SELECT EXP_NAME, DESCR, BTH_DATE
       FROM EXPERIENCE
       ORDER BY EXP_NAME, BTH_DATE;
-- PASS:0439 If 17 rows are selected?
-- PASS:0439 If 'David' the 'Monk' has BTH_DATE = 101024 ?
-- PASS:0439 If 3 rows with 'Lilian' have BTH_DATE = 112156 or NULL?
-- PASS:0439 If 'Mary' is a 'Fireman' with BTH_DATE = 121245?
-- PASS:0439 If EXP_NAME is NULL for 'Photographer'?
-- PASS:0439 If EXP_NAME and BTH_DATE are NULL for 'Fashion Model'?
-- PASS:0439 If EXP_NAME is NULL for 'Artist'?

-- restore
     ROLLBACK WORK;


-- END TEST >>> 0439 <<< END TEST
-- *************************************************************

-- TEST:0440 (partial-NULL F.K.) no restrict P.K. update/delete!

-- setup
   DELETE FROM EXPERIENCE
       WHERE EXP_NAME = 'Joseph' OR EXP_NAME = 'John';
   INSERT INTO EXPERIENCE VALUES('John',NULL,NULL,'Gardener');
   INSERT INTO EXPERIENCE VALUES('Joseph',NULL,NULL,'Snake Charmer');

-- Delete only parent partially matching partial-NULL F.K.
     DELETE FROM EMP WHERE ENAME = 'Joseph';
-- PASS:0440 If 1 row is deleted? 

-- Update only parent partially matching partial-NULL F.K.
     UPDATE EMP
       SET ENAME = 'Joan'
       WHERE EDESC = 'Fraction';
-- PASS:0440 If 1 row is updated?

     SELECT ENAME
       FROM EMP
       WHERE DNAME = 'Education';
-- PASS:0440 If 0 rows are selected?
   
     SELECT DNAME
       FROM EMP
       WHERE ENAME = 'Joan';
-- PASS:0440 If 1 row is selected with value DNAME = 'Physics'?
  
-- restore
     ROLLBACK WORK;

-- END TEST >>> 0440 <<< END TEST
-- *************************************************////END-OF-MODULE

