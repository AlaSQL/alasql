-- MODULE DML019

-- SQL Test Suite, V6.0, Interactive SQL, dml019.sql
-- 59-byte ID
-- TEd Version #
                                        
-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0074 GROUP BY col with SELECT col., SUM!
     SELECT PNUM, SUM(HOURS)                 
          FROM WORKS                              
          GROUP BY PNUM;
-- PASS:0074 If 6 rows are selected?
-- PASS:0074 If PNUMs: 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'?
-- PASS:0074 If SUM(HOURS) for 'P2' is 140 ?

-- END TEST >>> 0074 <<< END TEST
-- **********************************************************

-- TEST:0075 GROUP BY clause!
     SELECT EMPNUM                           
          FROM WORKS                              
          GROUP BY EMPNUM;
-- PASS:0075 If 4 rows are selected with EMPNUMs: 'E1','E2','E3','E4'?

-- END TEST >>> 0075 <<< END TEST
-- ************************************************************

-- TEST:0076 GROUP BY 2 columns!
     SELECT EMPNUM,HOURS                     
          FROM WORKS                              
          GROUP BY EMPNUM,HOURS;
-- PASS:0076 If 10 rows are selected and EMPNUM = 'E1' in 4 rows ?
-- PASS:0076 for 1 row EMPNUM = 'E1' and HOURS = 12?

-- END TEST >>> 0076 <<< END TEST
-- ***********************************************************

-- TEST:0077 GROUP BY all columns with SELECT * !
     SELECT *                    
          FROM WORKS                              
          GROUP BY PNUM,EMPNUM,HOURS;
-- PASS:0077 If 12 rows are selected ?

-- END TEST >>> 0077 <<< END TEST
-- ***********************************************************

-- TEST:0078 GROUP BY three columns, SELECT two!
     SELECT PNUM,EMPNUM                      
          FROM WORKS                              
          GROUP BY EMPNUM,PNUM,HOURS;
-- PASS:0078 If 12 rows are selected  ?

-- END TEST >>> 0078 <<< END TEST
-- *********************************************************

-- TEST:0079 GROUP BY NULL value!

-- setup
     INSERT INTO STAFF(EMPNUM,EMPNAME,GRADE)
            VALUES('E6','WANG',40);
-- PASS:0079 If 1 row is inserted?

     INSERT INTO STAFF(EMPNUM,EMPNAME,GRADE)
            VALUES('E7','SONG',50);
-- PASS:0079 If 1 row is inserted?
              
     SELECT SUM(GRADE)                       
          FROM STAFF                            
          WHERE CITY IS NULL                     
          GROUP BY CITY;
-- PASS:0079 If SUM(GRADE) = 90?

-- restore
   DELETE FROM STAFF WHERE CITY IS NULL;
-- PASS:0079 If 2 rows deleted?

   SELECT COUNT(*) FROM STAFF;
-- PASS:0079 If count = 5?

-- END TEST >>> 0079 <<< END TEST

-- *************************************************////END-OF-MODULE
