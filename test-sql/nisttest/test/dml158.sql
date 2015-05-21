-- MODULE  DML158  

-- SQL Test Suite, V6.0, Interactive SQL, dml158.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU                

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0857 <join condition> set function, outer reference!

   DELETE FROM WORKS
     WHERE EXISTS 
     (SELECT * FROM PROJ JOIN STAFF
      ON PROJ.CITY <> STAFF.CITY
      AND EMPNUM = WORKS.EMPNUM
      AND PNUM = WORKS.PNUM);
-- PASS:0857 If delete completed successfully?

   SELECT EMPNUM, PNUM FROM WORKS
       ORDER BY EMPNUM, PNUM;
-- PASS:0857 If 6 rows are returned in the following order?
--                 empnum    pnum
--                 ======    ====
-- PASS:0857 If    E1        P1  ?
-- PASS:0857 If    E1        P4  ?
-- PASS:0857 If    E1        P6  ?
-- PASS:0857 If    E2        P2  ?
-- PASS:0857 If    E3        P2  ?
-- PASS:0857 If    E4        P4  ?

   ROLLBACK WORK;

   SELECT EMPNUM, SUM (HOURS) FROM WORKS OWORKS
       GROUP BY EMPNUM
       HAVING EMPNUM IN (
       SELECT WORKS.EMPNUM FROM WORKS JOIN STAFF
       ON WORKS.EMPNUM = STAFF.EMPNUM
       AND HOURS < SUM (OWORKS.HOURS) / 3
       AND GRADE > 10)
       ORDER BY EMPNUM;
-- PASS:0857 If 2 rows are returned in the following order?
--               empnum    sum(hours)
--               ======    ==========
-- PASS:0857 If  E1        184       ?
-- PASS:0857 If  E4        140       ?

   SELECT EMPNUM, SUM (HOURS) FROM WORKS OWORKS
       GROUP BY EMPNUM
       HAVING EMPNUM IN (
       SELECT WORKS.EMPNUM FROM WORKS JOIN STAFF
       ON WORKS.EMPNUM = STAFF.EMPNUM
       AND HOURS >= 10 + AVG (OWORKS.HOURS)
       AND CITY = 'Deale')
       ORDER BY EMPNUM;
-- PASS:0857 If 2 rows are returned in the following order?
--               empnum    sum(hours)
--               ======    ==========
-- PASS:0857 If  E1        184       ?
-- PASS:0857 If  E4        140       ?

   COMMIT WORK;

-- END TEST >>> 0857 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
