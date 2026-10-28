-- MODULE  DML061

-- SQL Test Suite, V6.0, Interactive SQL, dml061.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0269 BETWEEN value expressions in wrong order!

            SELECT COUNT(*)
            FROM WORKS
            WHERE HOURS BETWEEN 80 AND 40;
-- PASS:0269 If count = 0   ?

-- setup   
         INSERT INTO WORKS
            VALUES('E6','P6',-60);
   
            SELECT COUNT(*)
            FROM WORKS
            WHERE HOURS BETWEEN -40 AND -80;
-- PASS:0269 If count = 0?

            SELECT COUNT(*)
            FROM WORKS
            WHERE HOURS BETWEEN -80 AND -40;
-- PASS:0269 If count = 1?

-- restore
    ROLLBACK WORK;

-- END TEST >>> 0269 <<< END TEST

-- ****************************************************************


-- TEST:0270 BETWEEN approximate and exact numeric values!

            SELECT COUNT(*)
            FROM WORKS
            WHERE HOURS BETWEEN 11.999 AND 12 OR
                  HOURS BETWEEN 19.999 AND 2.001E1;
-- PASS:0270 If count = 6?

-- END TEST >>> 0270 <<< END TEST

-- ****************************************************************


-- TEST:0271 COUNT(*) with Cartesian product subset !

            SELECT COUNT(*)
            FROM WORKS,STAFF
            WHERE WORKS.EMPNUM = 'E1';
-- PASS:0271 If count = 30?

-- END TEST >>> 0271 <<< END TEST

-- ****************************************************************


-- TEST:0272 Statement rollback for integrity!
        UPDATE WORKS
        SET EMPNUM = 'E7'
        WHERE EMPNUM = 'E1' OR EMPNUM = 'E4';
-- PASS:0272 If ERROR, unique constraint, 0 rows updated?

        INSERT INTO WORKS 
        SELECT 'E3',PNUM,17 FROM PROJ;
-- PASS:0272 If ERROR, unique constraint, 0 rows inserted?

        UPDATE V_WORKS1
        SET HOURS = HOURS - 9;
-- PASS:0272 If ERROR, view check constraint, 0 rows updated?

        SELECT COUNT(*)
        FROM WORKS
        WHERE EMPNUM = 'E7' OR HOURS = 31 OR HOURS = 17;
-- PASS:0272 If count = 0?

-- restore
       ROLLBACK WORK;

-- END TEST >>> 0272 <<< END TEST

-- ****************************************************************


-- TEST:0273 SUM, MAX, MIN = NULL for empty arguments  !

            UPDATE WORKS
            SET HOURS = NULL;
-- PASS:0273 If 12 rows updated?

            SELECT SUM(HOURS),MAX(HOURS),MIN(HOURS),MIN(EMPNUM)
                FROM WORKS;
-- PASS:0273 If 1 row is selected?
-- PASS:0273 If SUM(HOURS), MAX(HOURS), and MIN(HOURS) are NULL?

-- restore
    ROLLBACK WORK;

-- END TEST >>> 0273 <<< END TEST

-- ****************************************************************


-- TEST:0277 Computation with NULL value specification!

          UPDATE WORKS
          SET HOURS = NULL  WHERE EMPNUM = 'E1';
-- PASS:0277 If 6 rows are updated?
 
          UPDATE WORKS
          SET HOURS = HOURS - (3 + -17);
-- PASS:0277 If 12 rows are updated?
 
          UPDATE WORKS
          SET HOURS = 3 / -17 * HOURS;
-- PASS:0277 If 12 rows are updated?
  
          UPDATE WORKS
          SET HOURS = HOURS + 5;
-- PASS:0277 If 12 rows are updated?
  
          SELECT COUNT(*)
          FROM WORKS
          WHERE HOURS IS NULL;
-- PASS:0277 If count = 6?

-- restore 
    ROLLBACK WORK;

-- END TEST >>> 0277 <<< END TEST

-- ****************************************************************


-- TEST:0278 IN value list with USER, literal, variable spec.!

          UPDATE STAFF
          SET EMPNAME = 'HU'
          WHERE EMPNAME = 'Ed';
-- PASS:0278 If 1 row is updated?

          SELECT COUNT(*)
          FROM STAFF
          WHERE EMPNAME IN (USER,'Betty','Carmen'); 
-- PASS:0278 If count = 3?

-- restore
    ROLLBACK WORK;

-- END TEST >>> 0278 <<< END TEST

-- *************************************************////END-OF-MODULE
