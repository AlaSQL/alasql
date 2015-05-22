-- MODULE DML018

-- SQL Test Suite, V6.0, Interactive SQL, dml018.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0069 HAVING COUNT with WHERE, GROUP BY!
     SELECT PNUM
          FROM WORKS
          WHERE PNUM > 'P1'
          GROUP BY PNUM
          HAVING COUNT(*) > 1;
-- PASS:0069 If 3 rows are selected with PNUMs = 'P2', 'P4', 'P5'?

-- END TEST >>> 0069 <<< END TEST
-- ***********************************************************
   
-- TEST:0070 HAVING COUNT with GROUP BY!
     SELECT PNUM
          FROM WORKS
          GROUP BY PNUM
          HAVING COUNT(*) > 2;
-- PASS:0070 If PNUM = 'P2'?

-- END TEST >>> 0070 <<< END TEST
-- ***********************************************************

-- TEST:0071 HAVING MIN, MAX with GROUP BY 3 columns!
     SELECT EMPNUM, PNUM, HOURS
          FROM WORKS
          GROUP BY PNUM, EMPNUM, HOURS
          HAVING MIN(HOURS) > 12 AND MAX(HOURS) < 80;
-- PASS:0071 If 7 rows are selected: EMPNUM/PNUMs are 'E1'/'P1',?
-- PASS:0071      'E1'/'P2','E1'/'P4', 'E2'/'P1',?
-- PASS:0071      'E3'/'P2', 'E4'/'P2', 'E4'/'P4'?

-- END TEST >>> 0071 <<< END TEST
-- *************************************************************

-- TEST:0072 Nested HAVING IN with no outer reference!
     SELECT WORKS.PNUM
          FROM WORKS
          GROUP BY WORKS.PNUM
          HAVING WORKS.PNUM IN (SELECT PROJ.PNUM
                    FROM PROJ
                    GROUP BY PROJ.PNUM
                    HAVING SUM(PROJ.BUDGET) > 25000);
-- PASS:0072 If 3 rows are selected: WORKS.PNUMs are 'P2', 'P3', 'P6'?

-- END TEST >>> 0072 <<< END TEST
-- ***********************************************************

-- TEST:0073 HAVING MIN with no GROUP BY!
     SELECT SUM(HOURS)
          FROM WORKS
          HAVING MIN(PNUM) > 'P0';
-- PASS:0073 If 1 row is selected with SUM(HOURS) = 464?

-- END TEST >>> 0073 <<< END TEST
-- *************************************************////END-OF-MODULE
