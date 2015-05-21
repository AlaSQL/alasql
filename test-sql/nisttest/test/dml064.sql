-- MODULE DML064

-- SQL Test Suite, V6.0, Interactive SQL, dml064.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0281 Updatable VIEW with ALL, IN, BETWEEN!

   DELETE FROM UPDATE_VIEW1 WHERE CITY = 'Tampa';

   DELETE FROM UPDATE_VIEW1 WHERE CITY = 'Deale';

   SELECT COUNT (*) FROM PROJ;
-- PASS:0281 If count = 2?

-- restore
   ROLLBACK WORK;

   INSERT INTO UPDATE_VIEW2 VALUES (10, 'E9', 'P7');
   
   UPDATE UPDATE_VIEW2
          SET HOURS = 10 WHERE EMPNUM = 'E4';

   SELECT COUNT (*) FROM WORKS WHERE HOURS = 10;
-- PASS:0281 If count = 3?

-- restore
   ROLLBACK WORK;

   UPDATE UPDATE_VIEW3 SET EMPNUM = 'E7' WHERE EMPNUM = 'E1';
   
   DELETE FROM UPDATE_VIEW3 WHERE HOURS = 80;

   SELECT COUNT (*) FROM WORKS WHERE EMPNUM = 'E7';
-- PASS:0281 If count = 2?

-- restore
   ROLLBACK WORK;
  
-- END TEST >>> 0281 <<< END TEST

-- ****************************************************************

-- TEST:0282 Updatable VIEW with LIKE, NULL, >, =, < !
  
   DELETE FROM UPDATE_VIEW4 WHERE EMPNUM = 'E1';
   
   DELETE FROM UPDATE_VIEW4
        WHERE EMPNUM = 'E3';

   SELECT COUNT (*) 
                  FROM WORKS;
-- PASS:0282 If count = 10?

-- restore
   ROLLBACK WORK;

   INSERT INTO UPDATE_VIEW5 VALUES ('E6',NULL,11,NULL);
   INSERT INTO UPDATE_VIEW5 VALUES ('E7',NULL,11,'Deale');
   INSERT INTO UPDATE_VIEW5 VALUES ('E8','Mary',11,NULL);
   
   DELETE FROM UPDATE_VIEW5;

   SELECT COUNT (*) 
                  FROM STAFF;
-- PASS:0282 If count = 7?

-- restore
   ROLLBACK WORK;

   UPDATE UPDATE_VIEW6 SET GRADE = 12 WHERE CITY = 'Vienna';
   
   DELETE FROM UPDATE_VIEW6 WHERE GRADE = 10;

   SELECT COUNT (*) 
                  FROM STAFF WHERE GRADE = 13;
-- PASS:0282 If count = 1?

-- restore
   ROLLBACK WORK;
  
-- END TEST >>> 0282 <<< END TEST

-- ****************************************************************

-- TEST:0283 Updatable VIEW with view, correlation name, NOT!

   UPDATE UPDATE_VIEW7 SET GRADE = 15;
   
   DELETE FROM UPDATE_VIEW7 WHERE CITY = 'Akron';

   SELECT COUNT (*) 
                  FROM STAFF WHERE GRADE = 15;
-- PASS:0283 If count = 1?

-- restore
   ROLLBACK WORK;

   INSERT INTO UPDATE_VIEW8 VALUES ('E6','GEORGE');
   INSERT INTO UPDATE_VIEW8 VALUES ('E7','SHARA');
   INSERT INTO UPDATE_VIEW8 VALUES ('E8','DAVID');
   INSERT INTO UPDATE_VIEW8 VALUES ('E9','JOHNNY');
   
   UPDATE UPDATE_VIEW8
         SET EMPNAME = 'Kathy';

   SELECT COUNT (*) FROM STAFF
          WHERE GRADE IS NULL OR EMPNAME = 'Kathy';
-- PASS:0283 If count = 6?

-- restore
   ROLLBACK WORK;

   DELETE FROM UPDATE_VIEW9 WHERE GRADE = 12;
   
   UPDATE UPDATE_VIEW9
          SET GRADE = 15;

   SELECT COUNT (*) 
                  FROM STAFF WHERE GRADE = 15;
-- PASS:0283 If count = 2?

-- restore
   ROLLBACK WORK;
  
-- END TEST >>> 0283 <<< END TEST

-- *************************************************////END-OF-MODULE
