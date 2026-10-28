-- MODULE   XTS799

-- SQL Test Suite, V6.0, Interactive SQL, xts799.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7003 COALESCE with three <value expression>s!

   DELETE FROM CL_EMPLOYEE;
-- PASS:7003 If delete completed successfully?

   COMMIT WORK;

   INSERT INTO CL_EMPLOYEE VALUES(5000,NULL,NULL,NULL,NULL,NULL,NULL);
-- PASS:7003 If 1 row inserted?

   INSERT INTO CL_EMPLOYEE VALUES(6000,NULL,'CRETA','JIM',NULL,4,130);
-- PASS:7003 If 1 row inserted?

   INSERT INTO CL_EMPLOYEE VALUES(7000,'P2',NULL,NULL,NULL,NULL,150);
-- PASS:7003 If 1 row inserted?

   INSERT INTO CL_EMPLOYEE 
         VALUES(8000,'P2','HALKIDA',NULL,30000,6,NULL);
-- PASS:7003 If 1 row inserted?

   INSERT INTO CL_EMPLOYEE
         VALUES(9000,'P1','SANTORINH','ANDREWS',15000,5,125);
-- PASS:7003 If 1 row inserted?

   SELECT EMPNUM, COALESCE(SALARY,GRADE,HOURS),
         COALESCE(EMPNAME,LOC,DEPTNO) 
         FROM CTS1.CL_EMPLOYEE
         ORDER BY EMPNUM;
-- PASS:7003 If 5 rows are selected in the following order?
-- 
-- PASS:7003 If   5000        NULL       NULL    ?
-- PASS:7003 If   6000        4          JIM     ?
-- PASS:7003 If   7000        150        P2      ?
-- PASS:7003 If   8000        30000      HALDIDA ?
-- PASS:7003 If   9000        15000      ANDREWS ?

   SELECT EMPNUM, COALESCE(DEPTNO,LOC,'ATHENS'), 
         COALESCE(SALARY,'50000',GRADE) 
         FROM CL_EMPLOYEE
         WHERE EMPNUM = 5000;
-- PASS:7003 If 5000    ATHENS   50000?

   SELECT EMPNUM, COALESCE('NICKOS',DEPTNO,LOC), 
         COALESCE(SALARY,GRADE,47000) 
         FROM CL_EMPLOYEE
         WHERE EMPNUM = 7000;
-- PASS:7003 If 7000   NICKOS   47000?

   SELECT EMPNUM, COALESCE(EMPNAME,'PAGRATI',LOC), 
         COALESCE('12000',SALARY,GRADE)
         FROM CL_EMPLOYEE
         WHERE EMPNUM = 8000;
-- PASS:7003 If  8000   PAGRATI   12000?

   ROLLBACK WORK;

-- END TEST >>> 7003 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
