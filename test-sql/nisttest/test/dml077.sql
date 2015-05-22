-- MODULE DML077

-- SQL Test Suite, V6.0, Interactive SQL, dml077.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print


-- TEST:0443 VIEW with check option rejects unknown!

   INSERT INTO TEMP_SS VALUES('E7',NULL,'Frankfurt'); 
-- PASS:0443 If ERROR, view check constraint, 0 rows inserted? 

   INSERT INTO TEMP_SS VALUES('E8',NULL,'Atlanta'); 
-- PASS:0443 If ERROR, view check constraint, 0 rows inserted?
 
   INSERT INTO TEMP_SS(EMPNUM) VALUES('E9'); 
-- PASS:0443 If ERROR, view check constraint, 0 rows inserted?
 
   UPDATE WORKS 
       SET HOURS = NULL 
       WHERE PNUM = 'P2';
 
   INSERT INTO TEMP_SS 
       SELECT PNUM,HOURS,'Nowhere'  
          FROM WORKS 
          WHERE EMPNUM = 'E1'; 
-- PASS:0443 If ERROR, view check constraint, 0 rows inserted?
 
   UPDATE TEMP_SS 
       SET GRADE = NULL 
       WHERE EMPNUM = 'E3'; 
-- PASS:0443 If ERROR, view check constraint, 0 rows updated? 

   UPDATE TEMP_SS 
       SET GRADE = NULL 
       WHERE EMPNUM = 'E5';
-- PASS:0443 If ERROR, view check constraint, 0 rows updated?
  
   SELECT COUNT(*) 
       FROM STAFF 
       WHERE GRADE IS NULL; 
-- PASS:0443 If count = 0?
 
   SELECT COUNT(*) 
       FROM TEMP_SS; 
-- PASS:0443 If count = 2?
 
   SELECT COUNT(*) 
       FROM STAFF; 
-- PASS:0443 If count = 5?
 
   ROLLBACK WORK; 
 
-- END TEST >>> 0443 <<< END TEST
-- *********************************************

-- NO_TEST:0444 Updatable cursor, modify value selected on!

-- NOTE:0444 Testing cursors. 
-- *********************************************

-- NO_TEST:0445 Values not assigned to targets for SQLCODE=100 !

-- NOTE:0445 Testing host variables.

-- *************************************************////END-OF-MODULE
