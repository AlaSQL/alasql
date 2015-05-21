-- MODULE DML023

-- SQL Test Suite, V6.0, Interactive SQL, dml023.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU                                                          

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0103 Subquery with comparison predicate!
     SELECT PNUM                                                        
          FROM PROJ                                                            
          WHERE PROJ.CITY =                                                  
             (SELECT STAFF.CITY                                              
              FROM STAFF                                                     
              WHERE EMPNUM = 'E1');
-- PASS:0103 If 3 rows are selected with PNUMs:'P1','P4','P6?

-- END TEST >>> 0103 <<< END TEST
-- **************************************************************

-- TEST:0104 SQLCODE < 0, subquery with more than 1 value!
     SELECT PNUM                                                       
          FROM PROJ                                                          
          WHERE PROJ.CITY =                                                  
             (SELECT STAFF.CITY                                              
              FROM STAFF                                                    
              WHERE EMPNUM > 'E1' );

-- PASS:0104 If ERROR, SELECT returns more than 1 row in subquery?
-- PASS:0104 If 0 rows are selected?
 
-- END TEST >>> 0104 <<< END TEST
-- ************************************************************

-- TEST:0105 Subquery in comparison predicate is empty!
     SELECT COUNT(*)
          FROM STAFF
          WHERE STAFF.CITY =
              (SELECT PROJ.CITY
                    FROM PROJ
                    WHERE PNUM > 'P7');
-- PASS:0105 If count = 0?

     SELECT COUNT(*)
          FROM STAFF
          WHERE NOT (STAFF.CITY =
                  (SELECT PROJ.CITY
                        FROM PROJ
                        WHERE PNUM > 'P7' ));
-- PASS:0105 If count = 0?

-- END TEST >>> 0105 <<< END TEST
-- *************************************************************

-- TEST:0106 Comparison predicate <> !
     SELECT PNUM                                                         
          FROM PROJ                                                          
          WHERE CITY <> 'Deale';
-- PASS:0106 If 3 rows are selected with PNUMs:'P2','P3','P5'?

-- END TEST >>> 0106 <<< END TEST
-- *************************************************************

-- TEST:0107 Comp predicate with short string logically blank padded!
     SELECT COUNT(*)
          FROM WORKS
          WHERE EMPNUM = 'E1';
-- PASS:0107 If count = 6 ?

     SELECT COUNT(*)
          FROM WORKS
          WHERE EMPNUM = 'E1' AND EMPNUM = 'E1 ';
-- PASS:0107 If count = 6?

-- END TEST >>> 0107 <<< END TEST
-- ****************************************************************

-- TEST:0180 NULLs sort together in ORDER BY!

-- setup
     UPDATE STAFF
          SET GRADE = NULL
          WHERE EMPNUM = 'E1' OR EMPNUM = 'E3' OR EMPNUM = 'E5';
-- PASS:0180 If 3 rows are updated?
                                                                     
     SELECT EMPNUM,GRADE                                                 
          FROM   STAFF                                                        
          ORDER  BY GRADE,EMPNUM;
-- PASS:0180 If 5 rows are selected with NULLs together ?
-- PASS:0180 If first EMPNUM is either 'E1' or 'E2'?
-- PASS:0180 If last EMPNUM is either 'E4' or 'E5?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0180 <<< END TEST
-- ***************************************************************

-- TEST:0181 NULLs are equal for DISTINCT!

-- setup
     UPDATE STAFF
          SET GRADE = NULL
          WHERE EMPNUM = 'E1' OR EMPNUM = 'E3' OR EMPNUM = 'E5';
-- PASS:0181 If 3 rows are updated?
                                                                     
     SELECT DISTINCT USER, GRADE                                               
          FROM   STAFF                                                        
          ORDER  BY GRADE;
-- PASS:0181 If 3 rows are selected with GRADEs:10, 12, NULL ?
-- PASS:0181 GRADE 10 precedes GRADE 12?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0181 <<< END TEST
                                                                       
-- *************************************************////END-OF-MODULE
