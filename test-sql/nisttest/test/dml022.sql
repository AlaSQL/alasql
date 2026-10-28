-- MODULE DML022

-- SQL Test Suite, V6.0, Interactive SQL, dml022.sql
-- 59-byte ID
-- TEd Version #
                                                                           
-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print
                                
-- TEST:0096 Subquery with MAX in < comparison predicate!
     SELECT EMPNUM                                                         
          FROM STAFF                                                           
          WHERE GRADE <                                                        
             (SELECT MAX(GRADE)                                                
              FROM STAFF);
-- PASS:0096 If 3 rows selected with EMPNUMs:'E1', 'E2', 'E4'?

-- END TEST >>> 0096 <<< END TEST
-- **********************************************************

-- TEST:0097 Subquery with AVG - 1 in <= comparison predicate!
     SELECT *                                                            
          FROM STAFF                                                          
          WHERE GRADE <=                                                    
             (SELECT AVG(GRADE)-1                                           
              FROM STAFF);
-- PASS:0097 If EMPNUM = 'E2' and EMPNAME = 'Betty'?

-- END TEST >>> 0097 <<< END TEST
-- *******************************************************************

-- TEST:0098 IN predicate with simple subquery!
     SELECT EMPNAME                                                     
          FROM STAFF                                                         
          WHERE EMPNUM IN                                                   
             (SELECT EMPNUM                                                  
              FROM WORKS                                                   
              WHERE PNUM = 'P2')
     ORDER BY EMPNAME;
-- PASS:0098 If 4 rows selected and first EMPNAME = 'Alice'?

-- END TEST >>> 0098 <<< END TEST
-- ***************************************************************

-- TEST:0099 Nested IN predicate - 2 levels!
     SELECT EMPNAME                                                     
          FROM STAFF                                                      
          WHERE EMPNUM IN 
             (SELECT EMPNUM                                                 
              FROM WORKS                                                     
              WHERE PNUM IN                                                   
                 (SELECT PNUM                                                 
                  FROM PROJ                                                  
                  WHERE PTYPE = 'Design'));
-- PASS:0099 If 3 rows selected with EMPNAMEs:'Alice', 'Betty', 'Don'?

-- END TEST >>> 0099 <<< END TEST
-- *****************************************************************

-- TEST:0100 Nested IN predicate - 6 levels!
     SELECT EMPNUM, EMPNAME                                             
          FROM STAFF
          WHERE EMPNUM IN                                                   
             (SELECT EMPNUM                                                 
              FROM WORKS                                                     
              WHERE PNUM IN                                                    
                 (SELECT PNUM                                                
                  FROM PROJ                                                
                  WHERE PTYPE IN                                              
                     (SELECT PTYPE                                           
                      FROM PROJ                                              
                      WHERE PNUM IN                                          
                         (SELECT PNUM                                          
                          FROM WORKS
                          WHERE EMPNUM IN                                    
                             (SELECT EMPNUM                                   
                              FROM WORKS                                     
                              WHERE PNUM IN                                  
                                 (SELECT PNUM                                
                                  FROM PROJ                                  
                                  WHERE PTYPE = 'Design'))))))
     ORDER BY EMPNUM;
-- PASS:0100 If 4 rows selected and first EMPNUM = 'E1'?
-- PASS:0100 and first EMPNAME = 'Alice'?

-- END TEST >>> 0100 <<< END TEST
-- ****************************************************************

-- TEST:0101 Quantified predicate <= ALL with AVG in GROUP BY!
     SELECT EMPNUM,PNUM                                                 
          FROM   WORKS                                                       
          WHERE  HOURS <= ALL                                                 
               (SELECT AVG(HOURS)                                            
                FROM   WORKS                                                 
                GROUP BY PNUM);
-- PASS:0101 If 2 rows selected and each EMPNUM = 'E1'?

-- END TEST >>> 0101 <<< END TEST
-- *******************************************************************

-- TEST:0102 Nested NOT EXISTS with correlated subquery and DISTINCT!
     SELECT DISTINCT EMPNUM                                             
          FROM WORKS WORKSX                                               
          WHERE NOT EXISTS                                                    
             (SELECT *                                                        
              FROM WORKS WORKSY                                              
              WHERE EMPNUM = 'E2'                                            
              AND NOT EXISTS                                                
                  (SELECT *                                                 
                   FROM WORKS WORKSZ                                         
                   WHERE WORKSZ.EMPNUM = WORKSX.EMPNUM
                   AND WORKSZ.PNUM = WORKSY.PNUM));                       
-- PASS:0102 If 2 rows selected with EMPNUMs:'E1', 'E2'?

-- END TEST >>> 0102 <<< END TEST
-- *************************************************////END-OF-MODULE
