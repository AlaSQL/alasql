-- MODULE DML024

-- SQL Test Suite, V6.0, Interactive SQL, dml024.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
 
-- date_time print

-- TEST:0108 Search condition true OR NOT(true)!
     SELECT EMPNUM,CITY                                                 
          FROM   STAFF                                                        
          WHERE  EMPNUM='E1' OR NOT(EMPNUM='E1');
-- PASS:0108 If 5 rows are selected ?

-- END TEST >>> 0108 <<< END TEST
-- ****************************************************************

-- TEST:0109 Search condition true AND NOT(true)!
     SELECT EMPNUM,CITY                                                  
          FROM   STAFF                                                       
          WHERE  EMPNUM='E1' AND NOT(EMPNUM='E1');
-- PASS:0109 If 0 rows are selected ?

-- END TEST >>> 0109 <<< END TEST
-- **************************************************************

-- TEST:0110 Search condition unknown OR NOT(unknown)!

-- setup
     INSERT INTO WORKS
            VALUES('E8','P8',NULL);
-- PASS:0110 If 1 row is inserted?
                                                   
     SELECT EMPNUM,PNUM                                                  
          FROM   WORKS                                                       
          WHERE HOURS < (SELECT HOURS FROM WORKS                              
                    WHERE EMPNUM = 'E8')                                     
          OR NOT(HOURS < (SELECT HOURS FROM WORKS                              
                    WHERE EMPNUM = 'E8'));
-- PASS:0110 If 0 rows are selected ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0110 <<< END TEST
-- *************************************************************

-- TEST:0111 Search condition unknown AND NOT(unknown)!

-- setup
     INSERT INTO WORKS
            VALUES('E8','P8',NULL);
-- PASS:0111 If 1 row is inserted?
                                                   
     SELECT EMPNUM,PNUM                                                
          FROM   WORKS                                                       
          WHERE HOURS < (SELECT HOURS FROM WORKS                            
                    WHERE EMPNUM = 'E8')                                     
          AND NOT(HOURS< (SELECT HOURS FROM WORKS                              
                    WHERE EMPNUM = 'E8'));

-- PASS:0111 If 0 rows are selected?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0111 <<< END TEST
-- ***************************************************************

-- TEST:0112 Search condition unknown AND true!

-- setup
     INSERT INTO WORKS
            VALUES('E8','P8',NULL);
-- PASS:0112 If 1 row is inserted?
                                                           
     SELECT EMPNUM,PNUM                                                 
          FROM   WORKS                                                      
          WHERE HOURS < (SELECT HOURS FROM WORKS                              
                    WHERE EMPNUM = 'E8')                                      
          AND   HOURS IN (SELECT HOURS FROM WORKS);

-- PASS:0112 If 0 rows are selected?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0112 <<< END TEST
-- *************************************************************

-- TEST:0113 Search condition unknown OR true!

-- setup
     INSERT INTO WORKS
            VALUES('E8','P8',NULL);
-- PASS:0113 If 1 row is inserted?
                                                  
     SELECT EMPNUM,PNUM                                                 
          FROM   WORKS                                                        
          WHERE HOURS < (SELECT HOURS FROM WORKS                              
                    WHERE EMPNUM = 'E8')                                     
          OR    HOURS IN (SELECT HOURS FROM WORKS)
          ORDER BY EMPNUM;

-- PASS:0113 If 12 rows are selected?
-- PASS:0113 If first EMPNUM = 'E1'?

-- restore
     ROLLBACK WORK;                                                  

-- END TEST >>> 0113 <<< END TEST
-- *************************************************////END-OF-MODULE
