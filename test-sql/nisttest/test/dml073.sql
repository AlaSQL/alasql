-- MODULE DML073

-- SQL Test Suite, V6.0, Interactive SQL, dml073.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU 

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0393 SUM, MAX on Cartesian product!

     SELECT SUM(HOURS), MAX(HOURS)
           FROM  STAFF, WORKS;

-- PASS:0393 If SUM(HOURS) = 2320 and MAX(HOURS) = 80?

-- END TEST >>> 0393 <<< END TEST
-- *************************************************************

-- TEST:0394 AVG, MIN on joined table with WHERE without GROUP!

     SELECT AVG(HOURS), MIN(HOURS)
           FROM  STAFF, WORKS
           WHERE STAFF.EMPNUM = 'E2'
                 AND STAFF.EMPNUM = WORKS.EMPNUM;

-- PASS:0394 If AVG(HOURS) = 60 and MIN(HOURS) = 40?

-- END TEST >>> 0394 <<< END TEST
-- *************************************************************

-- TEST:0395 SUM, MIN on joined table with GROUP without WHERE!

     SELECT STAFF.EMPNUM, SUM(HOURS), MIN(HOURS)
           FROM  STAFF, WORKS
           GROUP BY STAFF.EMPNUM
           ORDER BY 1;

-- PASS:0395 If 5 rows are selected with the following order?
-- PASS:0395 STAFF.EMPNUM  SUM(HOURS)  MIN(HOURS)?
-- PASS:0395    'E1'         464          12?
-- PASS:0395    'E2'         464          12?
-- PASS:0395    'E3'         464          12?
-- PASS:0395    'E4'         464          12?
-- PASS:0395    'E5'         464          12?

-- END TEST >>> 0395 <<< END TEST
-- *************************************************************

-- TEST:0396 SUM, MIN on joined table with WHERE, GROUP BY, HAVING!
 
     SELECT STAFF.EMPNUM, AVG(HOURS), MIN(HOURS)
           FROM  STAFF, WORKS
           WHERE STAFF.EMPNUM IN ('E1','E4','E3') AND
                 STAFF.EMPNUM = WORKS.EMPNUM
                 GROUP BY STAFF.EMPNUM
                 HAVING COUNT(*) > 1
                 ORDER BY STAFF.EMPNUM;

-- PASS:0396 If 2 rows are selected with the following order?
-- PASS:0396 STAFF.EMPNUM   AVG(HOURS)  MIN(HOURS)?
-- PASS:0396     'E1'        30 to 31      12?
-- PASS:0396     'E4'        46 to 47      20?

-- END TEST >>> 0396 <<< END TEST
-- *************************************************************

-- TEST:0417 Cartesian product GROUP BY 2 columns with NULLs!

     DELETE FROM STAFF1;
-- Making sure the table is empty

-- setup          
     INSERT INTO STAFF VALUES ('E6', 'David', 17, NULL);
     INSERT INTO STAFF VALUES ('E7', 'Tony', 18, NULL);
     INSERT INTO STAFF1 SELECT * FROM STAFF;


     SELECT MAX(STAFF1.GRADE), SUM(STAFF1.GRADE)
           FROM STAFF1, STAFF
           GROUP BY STAFF1.CITY, STAFF.CITY;

-- PASS:0417 If 16 rows are selected in any order?
-- PASS:0417 Including the following four rows? 
-- PASS:0417 MAX(STAFF1.GRADE) = 18 and SUM(STAFF1.GRADE) = 35?
-- PASS:0417 MAX(STAFF1.GRADE) = 18 and SUM(STAFF1.GRADE) = 70?
-- PASS:0417 MAX(STAFF1.GRADE) = 18 and SUM(STAFF1.GRADE) = 70?
-- PASS:0417 MAX(STAFF1.GRADE) = 18 and SUM(STAFF1.GRADE) = 70?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0417 <<< END TEST
-- *************************************************************

-- TEST:0418 AVG, SUM, COUNT on Cartesian product with NULL!

     SELECT AVG(T1.COL4), AVG(T1.COL4 + T2.COL4),
           SUM(T2.COL4), COUNT(DISTINCT T1.COL4)
           FROM VTABLE T1, VTABLE T2;

-- PASS:0418 If AVG(T1.COL4) = 147 or 148? 
-- PASS:0418 If AVG(T1.COL4 + T2.COL4) = 295 or 296?
-- PASS:0418 If SUM(T2.COL4) = 1772?
-- PASS:0418 If COUNT(DISTINCT T1.COL4) = 3?

-- END TEST >>> 0418 <<< END TEST
-- *************************************************************

-- TEST:0419 SUM, MAX, MIN on joined table view!

     SELECT SUM(COST), MAX(COST), MIN(COST)
           FROM STAFF_WORKS_DESIGN;

-- PASS:0419 If SUM(COST) = 3488, MAX(COST) = 960, MIN(COST) = 288?

-- END TEST >>> 0419 <<< END TEST
-- *************************************************////END-OF-MODULE
