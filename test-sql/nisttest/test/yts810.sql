-- MODULE  YTS810  

-- SQL Test Suite, V6.0, Interactive SQL, yts810.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7567 FULL OUTER JOIN <tab ref> ON <search cond> dynamic!

   CREATE VIEW TA
     AS SELECT GRADE, DEPTNO, LOC, HOURS
     FROM CTS1.CL_EMPLOYEE;
-- PASS:7567 If view created successfully?

   COMMIT WORK;

   CREATE VIEW TB
     AS SELECT EMPNAME, HOURS, EMPNUM, SALARY, PNUM
     FROM CTS1.STAFFa;
-- PASS:7567 If view created successfully?

   COMMIT WORK;

   DELETE FROM CTS1.staffa;
-- PASS:7567 If delete completed successfully?

   DELETE FROM CL_EMPLOYEE;
-- PASS:7567 If delete completed successfully?

   INSERT INTO CL_EMPLOYEE VALUES (
     1, 'abc', 'Susan', NULL, NULL, 1, 100);
-- PASS:7567 If 1 row inserted successfully?

   INSERT INTO CL_EMPLOYEE VALUES (
     2, 'abc', 'Matthew', NULL, NULL, 7, 100);
-- PASS:7567 If 1 row inserted successfully?

   INSERT INTO CL_EMPLOYEE VALUES (
     3, 'abc', 'Peter', NULL, NULL, 2, 100);
-- PASS:7567 If 1 row inserted successfully?

   INSERT INTO CL_EMPLOYEE VALUES (
     4, 'abc', 'Rosemary', NULL, NULL, 8, 100);
-- PASS:7567 If 1 row inserted successfully?

   INSERT INTO TB VALUES
     ('Praze-an-beeble    ',1,'aaa',100,3);
-- PASS:7567 If 1 row inserted successfully?

   INSERT INTO TB VALUES
     ('Chy-an-gwel        ',2,'abc',100,4);
-- PASS:7567 If 1 row inserted successfully?

   INSERT INTO TB VALUES
     ('Ponsonooth         ',3,'abc',100,5);
-- PASS:7567 If 1 row inserted successfully?

   INSERT INTO TB VALUES
     ('Tregwedyn          ',4,'abc',100,6);
-- PASS:7567 If 1 row inserted successfully?


    SELECT GRADE, COUNT (*) AS CC, EMPNUM
      FROM TA FULL OUTER JOIN TB ON GRADE > PNUM
       AND EMPNUM = DEPTNO WHERE
       GRADE IS NOT NULL GROUP BY GRADE, EMPNUM
       ORDER BY CC DESC, GRADE;
-- PASS:7567 If 4 rows returned in the following order?
--                 grade      grpno       empnum
--                 =====      =====       ======
-- PASS:7567 If     7           3           abc  ?
-- PASS:7567 If     8           3           abc  ? 
-- PASS:7567 If     1           1           NULL ?
-- PASS:7567 If     2           1           NULL ?

   ROLLBACK WORK;

   DROP VIEW TA CASCADE;
-- PASS:7567 If view dropped successfully?

   COMMIT WORK;

   DROP VIEW TB CASCADE;
-- PASS:7567 If view dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7567 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
