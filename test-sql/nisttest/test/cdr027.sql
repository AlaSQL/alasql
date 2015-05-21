
-- MODULE CDR027

-- SQL Test Suite, V6.0, Interactive SQL, cdr027.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print


-- TEST:0446 Table CHECK constraint allows unknown (NULL)!

   DELETE FROM STAFF5;

   INSERT INTO STAFF5 VALUES('E7','Mimi',NULL,'Miami');
-- PASS:0446 If 1 row inserted?

   INSERT INTO STAFF5 VALUES('E8','Joe',NULL,'Boston'); 
-- PASS:0446 If 1 row inserted?

   INSERT INTO STAFF5(EMPNUM) VALUES('E9');
-- PASS:0446 If 1 row inserted?

   UPDATE STAFF
       SET GRADE = NULL
       WHERE EMPNUM = 'E1';
-- PASS:0446 If 1 row updated?

   INSERT INTO STAFF5 
        SELECT *
         FROM STAFF;
-- PASS:0446 If 5 rows inserted?

   UPDATE STAFF5 
       SET GRADE = NULL
       WHERE EMPNUM = 'E2';
-- PASS:0446 If 1 row updated?

   UPDATE STAFF5
       SET GRADE = NULL 
       WHERE EMPNUM = 'E4';
-- PASS:0446 If 1 row updated?

   SELECT COUNT(*)
       FROM STAFF5;
-- PASS:0446 If count = 8?

   SELECT COUNT(*)
       FROM STAFF5
       WHERE GRADE IS NULL;
-- PASS:0446 If count = 6?

   ROLLBACK WORK;

-- END TEST >>> 0446 <<< END TEST
-- *********************************************

-- TEST:0447 NULLs with check constraint and check option!

   DELETE FROM STAFF6;

   INSERT INTO STAFF6_WITH_GRADES
       VALUES('X1','Vicki',NULL,'Houston');
-- PASS:0447 If ERROR, view check constraint, 0 rows inserted?

   INSERT INTO STAFF6
       VALUES('X2','Tina',NULL,'Orlando');
-- PASS:0447 If 1 row inserted?

   SELECT COUNT(*)
       FROM STAFF6_WITH_GRADES;
-- PASS:0447 If count = 0?

   SELECT COUNT(*)
      FROM STAFF6;
-- PASS:0447 If count = 1?

   SELECT EMPNAME
       FROM STAFF6
       WHERE GRADE IS NULL;
-- PASS:0447 If EMPNAME is Tina?

   ROLLBACK WORK;

-- END TEST >>> 0447 <<< END TEST
-- *********************************************

-- TEST:0448 PRIMARY KEY implies UNIQUE!

   DELETE FROM STAFF9;

   INSERT INTO STAFF9(EMPNUM,EMPNAME)
       VALUES('D1','Muddley');
-- PASS:0448 If 1 row inserted?


   INSERT INTO STAFF9(EMPNUM,EMPNAME)
       VALUES('D1','Muddley');
-- PASS:0448 If ERROR, unique constraint, 0 rows inserted?

   INSERT INTO STAFF9(EMPNUM,EMPNAME)
       VALUES('d1','Muddley');
-- PASS:0448 If 1 row inserted?

   SELECT COUNT(*)
       FROM STAFF9;
-- PASS:0448 If count = 2?

   ROLLBACK WORK;

-- END TEST >>> 0448 <<< END TEST
-- *********************************************

-- TEST:0449 Constraint definition is case sensitive!

   DELETE FROM STAFF9;

   INSERT INTO STAFF9(EMPNUM,EMPNAME)
       VALUES('Z1','Tina');
-- PASS:0449 If ERROR, check constraint, 0 rows inserted?

   INSERT INTO STAFF9(EMPNUM,EMPNAME)
       VALUES('Z2','tina');
-- PASS:0449 If 1 row inserted?

   INSERT INTO STAFF9(EMPNUM,EMPNAME)
       VALUES('Z3','ANTHONY');
-- PASS:0449 If 1 row inserted?

   SELECT COUNT(*)
        FROM STAFF9;
-- PASS:0449 If count = 2?

   ROLLBACK WORK;

-- END TEST >>> 0449 <<< END TEST
-- *********************************************

-- TEST:0450 Referential integrity is case sensitive!

   INSERT INTO DEPT
       VALUES(11,'VOLLEYBALL','VICKI');
-- PASS:0450 If 1 row inserted?

   INSERT INTO DEPT 
       VALUES(10,'volleyball','vicki');
-- PASS:0450 If 1 row inserted?
-- NOTE:0450 insert lower case value of above.

   SELECT COUNT(*) FROM DEPT WHERE DNO = 10;
-- PASS:0450 If count = 1?

   INSERT INTO EMP
       VALUES(13,'MARY','Dancer',15,'VOLLEYBALL',010101);
-- PASS:0450 If 1 row inserted?

   DELETE FROM DEPT
       WHERE DNO = 10;
-- PASS:0450 If 1 row deleted?

   UPDATE DEPT
       SET DNAME = 'EDUCATION'
       WHERE DNAME = 'Education';
-- PASS:0450 If RI ERROR, children exist, 0 rows updated?

   SELECT * FROM DEPT ORDER BY DNO;
-- PASS:0450 If 5 rows selected?
-- PASS:0450 If DNO values are 11, 12, 13, 14, 15?
-- PASS:0450 If DNAME = 'Education' (not 'EDUCATION') for DNO = 14?

   INSERT INTO EMP
       VALUES(28,'BARBARA','Jogger',14,'EDUCATION',010101);
-- PASS:0450 If RI ERROR, parent missing, 0 rows inserted?

   UPDATE EMP
       SET DNAME = 'PHYSICS'
       WHERE ENO = 25;
-- PASS:0450 If RI ERROR, parent missing, 0 rows updated?

   SELECT ENO, ENAME, DNO, DNAME 
       FROM EMP ORDER BY ENO;
-- PASS:0450 If 8 rows selected?
-- PASS:0450 If ENO values are 13, 21 through 27?
-- PASS:0450 If DNAME = 'Physics' (not 'PHYSICS') for ENO = 25?

   ROLLBACK WORK;

-- END TEST >>> 0450 <<< END TEST

-- *************************************************////END-OF-MODULE
