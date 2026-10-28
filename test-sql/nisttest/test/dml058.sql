-- MODULE DML058

-- SQL Test Suite, V6.0, Interactive SQL, dml058.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0251 COMMIT keeps changes of current transaction!

     DELETE FROM STAFF1;
-- Making sure the table is empty

-- setup
     INSERT INTO STAFF1
            SELECT *
                 FROM STAFF;
-- PASS:0251 If 5 rows are inserted?

     SELECT COUNT(*) 
          FROM STAFF1;
-- PASS:0251 If count = 5?

     INSERT INTO STAFF1
            VALUES('E9','Tom',50,'London');
-- PASS:0251 If 1 row is inserted?
  
     UPDATE STAFF1
            SET GRADE = 40 
            WHERE EMPNUM = 'E2';
-- PASS:0251 If 1 row is updated?

     COMMIT WORK;

     DELETE FROM STAFF1;
-- PASS:0251 If 6 rows are deleted?

-- verify
     ROLLBACK WORK;

-- verify previous commit
     SELECT COUNT(*)
          FROM STAFF1
          WHERE GRADE > 12;
-- PASS:0251 If count = 4?

-- restore
     DELETE FROM STAFF1;
     COMMIT WORK;

-- END TEST >>> 0251 <<< END TEST

-- ***************************************************************

-- TEST:0252 ROLLBACK cancels changes of current transaction!

     DELETE FROM STAFF1;
-- Making sure the table is empty

-- setup
     INSERT INTO STAFF1
            SELECT *
                 FROM STAFF;
-- PASS:0252 If 5 rows are inserted?

     COMMIT WORK;

     INSERT INTO STAFF1
            VALUES('E10','Tom',50,'London');
-- PASS:0252 If 1 row is inserted?

     UPDATE STAFF1
            SET GRADE = 40
            WHERE EMPNUM = 'E1';
-- PASS:0252 If 1 row is updated?

     DELETE FROM STAFF1
            WHERE EMPNUM = 'E2';
-- PASS:0252 If 1 row is deleted?

     ROLLBACK WORK;

-- verify     
     SELECT SUM(GRADE)
          FROM STAFF1;
-- PASS:0252 If SUM(GRADE) = 60?

-- restore
     DELETE FROM STAFF1;
     COMMIT WORK;

-- END TEST >>> 0252 <<< END TEST

-- ****************************************************************

-- TEST:0253 TEST0124 workaround (key = key+1)!

     SELECT NUMKEY
          FROM UPUNIQ
          ORDER BY NUMKEY DESC;
-- PASS:0253 If 6 rows are selected and first NUMKEY = 8 ?

     UPDATE UPUNIQ
          SET NUMKEY = 8 + 1
          WHERE NUMKEY = 8;
-- PASS:0253 If 1 row is updated?

     UPDATE UPUNIQ
          SET NUMKEY = 6 + 1
          WHERE NUMKEY = 6;
-- PASS:0253 If 1 row is updated?

     UPDATE UPUNIQ
          SET NUMKEY = 4 + 1
          WHERE NUMKEY = 4;
-- PASS:0253 If 1 row is updated?

     UPDATE UPUNIQ
          SET NUMKEY = 3 + 1
          WHERE NUMKEY = 3;
-- PASS:0253 If 1 row is updated?

     UPDATE UPUNIQ
          SET NUMKEY = 2 + 1 
          WHERE NUMKEY = 2;
-- PASS:0253 If 1 row is updated?

     UPDATE UPUNIQ
          SET NUMKEY = 1 + 1
          WHERE NUMKEY = 1;
-- PASS:0253 If 1 row is updated?


     SELECT MAX(NUMKEY), MIN(NUMKEY)
          FROM UPUNIQ;
-- PASS:0253 If MAX(NUMKEY) = 9 AND MIN(NUMKEY) = 2?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0253 <<< END TEST

-- **************************************************************

-- TEST:0254 Column name in SET clause!

     DELETE FROM PROJ1;
-- Making sure the table is empty

-- setup
     INSERT INTO PROJ1
            SELECT *
                 FROM PROJ;
-- PASS:0254 If 6 rows are inserted?

     UPDATE PROJ1
          SET CITY = PTYPE;
-- PASS:0254 If 6 rows are updated?

     SELECT CITY
          FROM PROJ1
          WHERE PNUM = 'P1';
-- PASS:0254 If CITY = 'Design'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0254 <<< END TEST

-- **************************************************************


-- TEST:0255 Key word USER for INSERT, UPDATE!

     DELETE FROM T4;
-- Making sure the table is empty

-- setup
     INSERT INTO T4
          VALUES(USER,100,'good','luck');
-- PASS:0255 If 1 row is inserted?

     SELECT STR110 
          FROM T4
          WHERE NUM6 = 100;
-- PASS:0255 If STR110 = 'HU'?

-- setup
     INSERT INTO T4
          VALUES('Hello',101,'good','luck');
-- PASS:0255 If 1 row is inserted?

     UPDATE T4
          SET STR110 = USER
          WHERE NUM6 = 101;
-- PASS:0255 If 1 row is updated?

     SELECT STR110 
          FROM T4
          WHERE NUM6 = 101;
-- PASS:0255 If STR110 = 'HU'?

-- restore
     ROLLBACK WORK;
       
-- END TEST >>> 0255 <<< END TEST

-- ***************************************************************

-- TEST:0256 Key word USER in WHERE clause!

     DELETE FROM T4;
-- Making sure the table is empty

-- setup
     INSERT INTO T4
            VALUES('HU',100,'good','luck');
-- PASS:0256 If 1 row is inserted?

     SELECT STR110 
          FROM T4
          WHERE STR110 = USER;
-- PASS:0256 If STR110 = 'HU'?

-- setup
     INSERT INTO T4
            VALUES('Hello',101,'good','luck');
-- PASS:0256 If 1 row is inserted?

     DELETE FROM T4
            WHERE STR110 = USER;
-- PASS:0256 If 1 row is deleted?

     SELECT COUNT(*)
          FROM T4
          WHERE STR110 LIKE '%HU%';
-- PASS:0256 If count = 0?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0256 <<< END TEST
-- *************************************************////END-OF-MODULE
