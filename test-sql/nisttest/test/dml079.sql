-- MODULE DML079

-- SQL Test Suite, V6.0, Interactive SQL, dml079.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print


-- TEST:0451 UNIQUEness is case sensitive!

         UPDATE STAFF SET EMPNUM = 'e2'
           WHERE EMPNUM = 'E4';
-- PASS:0451 If 1 row updated?  

         INSERT INTO STAFF(EMPNUM)
           VALUES ('E1');         
-- PASS:0451 If ERROR, unique constraint, 0 rows inserted?
 
         INSERT INTO STAFF(EMPNUM)
           VALUES ('e1');
-- PASS:0451 If 1 row inserted?

         UPDATE STAFF
           SET EMPNUM = 'E1' WHERE EMPNUM = 'e1';
-- PASS:0451 If ERROR, unique constraint, 0 rows updated?

         SELECT * FROM STAFF;
-- PASS:0451 If 6 rows are selected?
-- PASS:0451 If EMPNUMs are 'e1','e2','E1','E2','E3','E5'?
      
         INSERT INTO WORKS (EMPNUM,PNUM)
           VALUES ('e1','p2');
-- PASS:0451 If 1 row inserted?
   
         INSERT INTO WORKS (EMPNUM,PNUM)
           VALUES ('E1','p2');
-- PASS:0451 If 1 row inserted?
  
         INSERT INTO WORKS (EMPNUM,PNUM) 
           VALUES ('E1','P2');
-- PASS:0451 If ERROR, unique constraint, 0 rows inserted?
     
         INSERT INTO WORKS (EMPNUM,PNUM)
           VALUES ('e1', 'P2');
-- PASS:0451 If 1 row inserted?
     
         UPDATE WORKS
           SET EMPNUM = 'E1'
           WHERE PNUM = 'P5' AND EMPNUM = 'E4';
-- PASS:0451 If ERROR, unique constraint, 0 rows updated?

         UPDATE WORKS
           SET EMPNUM = 'e1'
           WHERE PNUM = 'P5' AND EMPNUM = 'E4';
-- PASS:0451 If 1 row updated?

         UPDATE WORKS
           SET PNUM = 'P4'
           WHERE PNUM = 'P2' AND EMPNUM = 'E4';
-- PASS:0451 If ERROR, unique constraint, 0 rows updated?

         UPDATE WORKS
           SET PNUM = 'p4'
           WHERE PNUM = 'P2' AND EMPNUM = 'E4';
-- PASS:0451 If 1 row updated?

          SELECT * FROM WORKS
             ORDER BY EMPNUM, PNUM;
-- PASS:0451 If 15 rows are selected?
-- PASS:0451 If EMPNUM/PNUM values include ?
-- PASS:0451    e1/p2, E1/p2, e1/P2, e1/P5, E4/p4 ? 
-- PASS:0451 If no EMPNUM/PNUM values are duplicates ?

         ROLLBACK WORK;

-- END TEST >>> 0451 <<< END TEST
-- *********************************************

-- TEST:0452 Order of precedence, left-to-right in UNION [ALL]!

      SELECT EMPNAME FROM STAFF
             UNION
      SELECT EMPNAME FROM STAFF
             UNION ALL 
      SELECT EMPNAME FROM STAFF;
-- PASS:0452 If 10 rows selected?

      SELECT EMPNAME FROM STAFF
             UNION ALL
      SELECT EMPNAME FROM STAFF
             UNION
      SELECT EMPNAME FROM STAFF;
-- PASS:0452 If 5 rows selected? 

-- END TEST >>> 0452 <<< END TEST
-- *********************************************

-- TEST:0453 NULL with empty subquery of ALL, SOME, ANY!

   UPDATE PROJ
       SET CITY = NULL WHERE PNAME = 'IRM';

   SELECT COUNT(*) 
       FROM PROJ
       WHERE CITY IS NULL;
-- PASS:0453 If count = 1?

   SELECT COUNT(*)
       FROM PROJ
       WHERE CITY = ALL (SELECT CITY
                    FROM STAFF
                    WHERE EMPNUM = 'E8');
-- PASS:0453 If count = 6?

   SELECT COUNT(*)
       FROM PROJ
       WHERE CITY <> ALL (SELECT CITY
                     FROM STAFF
                     WHERE EMPNUM = 'E8');
-- PASS:0453 If count = 6?

   SELECT COUNT(*)
       FROM PROJ
       WHERE CITY = ANY (SELECT CITY
                    FROM STAFF
                    WHERE EMPNUM = 'E8');
-- PASS:0453 If count = 0?

   SELECT COUNT(*)
       FROM PROJ
       WHERE CITY <> ANY (SELECT CITY
                     FROM STAFF
                     WHERE EMPNUM = 'E8');
-- PASS:0453 If count = 0?

   SELECT COUNT(*)
       FROM PROJ
       WHERE CITY = SOME (SELECT CITY
                     FROM STAFF
                     WHERE EMPNUM = 'E8');
-- PASS:0453 If count = 0?

   SELECT COUNT(*)
       FROM PROJ
       WHERE CITY <> SOME (SELECT CITY
                      FROM STAFF
                      WHERE EMPNUM = 'E8');
-- PASS:0453 If count = 0?

   ROLLBACK WORK;

-- END TEST >>> 0453 <<< END TEST

-- *************************************************////END-OF-MODULE
