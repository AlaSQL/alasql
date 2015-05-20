-- MODULE DML025

-- SQL Test Suite, V6.0, Interactive SQL, dml025.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0114 Set functions without GROUP BY returns 1 row!
     SELECT SUM(HOURS),AVG(HOURS),MIN(HOURS),MAX(HOURS)                 
          FROM    WORKS                                                      
          WHERE   EMPNUM='E1';
-- PASS:0114 If SUM(HOURS) = 184 and AVG(HOURS) is 30 to 31?
-- PASS:0114 If MIN(HOURS) = 12 and MAX(HOURS) = 80 ?

-- END TEST >>> 0114 <<< END TEST
-- ***********************************************************

-- TEST:0115 GROUP BY col, set function: 0 groups returns empty table!
     SELECT PNUM,AVG(HOURS),MIN(HOURS),MAX(HOURS)                        
          FROM    WORKS                                                        
          WHERE   EMPNUM='E8'                                                
          GROUP BY PNUM;
-- PASS:0115 If 0 rows are selected ?

-- END TEST >>> 0115 <<< END TEST
-- ***********************************************************

-- TEST:0116 GROUP BY set functions: zero groups returns empty table!
     SELECT SUM(HOURS),AVG(HOURS),MIN(HOURS),MAX(HOURS)
          FROM    WORKS                                                      
          WHERE   EMPNUM='E8'                                                
          GROUP BY PNUM;
-- PASS:0116 If 0 rows are selected?

-- END TEST >>> 0116 <<< END TEST
-- ***************************************************************

-- TEST:0117 GROUP BY column, set functions with several groups!
     SELECT PNUM,AVG(HOURS),MIN(HOURS),MAX(HOURS)                       
          FROM    WORKS                                                      
          GROUP BY PNUM
          ORDER BY PNUM;
-- PASS:0117 If 6 rows are selected and first PNUM = 'P1'?
-- PASS:0117 and first MAX(HOURS) = 40?

-- END TEST >>> 0117 <<< END TEST
-- *************************************************////END-OF-MODULE
