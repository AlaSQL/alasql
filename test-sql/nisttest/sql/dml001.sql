-- MODULE DML001

-- SQL Test Suite, V6.0, Interactive SQL, dml001.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print


-- TEST:0001 SELECT with ORDER BY DESC!

                SELECT EMPNUM,HOURS
                     FROM WORKS
                     WHERE PNUM='P2'
                     ORDER BY EMPNUM DESC;

-- PASS:0001 If 4 rows selected and last EMPNUM = 'E1'?

-- END TEST >>> 0001 <<< END TEST
-- *********************************************

-- TEST:0002 SELECT with ORDER BY integer ASC!

                SELECT EMPNUM,HOURS
                     FROM WORKS
                     WHERE PNUM='P2'
                     ORDER BY 2 ASC;

-- PASS:0002 If 4 rows selected and last HOURS = 80?

-- END TEST >>> 0002 <<< END TEST
-- *********************************************

-- TEST:0003 SELECT with ORDER BY DESC integer, named column!

                SELECT EMPNUM,HOURS
                     FROM WORKS
                     WHERE PNUM = 'P2'
                     ORDER BY 2 DESC,EMPNUM DESC;

-- PASS:0003 If 4 rows selected and last EMPNUM = 'E1'?

-- END TEST >>> 0003 <<< END TEST
-- *********************************************

-- TEST:0004 SELECT with UNION, ORDER BY integer DESC!

                SELECT WORKS.EMPNUM 
                     FROM WORKS
                     WHERE WORKS.PNUM = 'P2'
            UNION
                SELECT STAFF.EMPNUM  
                     FROM STAFF
                     WHERE STAFF.GRADE=13 
                     ORDER BY 1 DESC;

-- PASS:0004 If 5 rows selected and last EMPNUM = 'E1'?

-- END TEST >>> 0004 <<< END TEST
-- *********************************************

-- TEST:0005 SELECT with UNION ALL!

                SELECT WORKS.EMPNUM 
                     FROM WORKS
                     WHERE WORKS.PNUM = 'P2'
            UNION ALL    
                SELECT STAFF.EMPNUM  
                     FROM STAFF
                     WHERE STAFF.GRADE = 13;

-- PASS:0005 If 6 rows selected?

-- END TEST >>> 0005 <<< END TEST
-- *********************************************

-- TEST:0158 SELECT with UNION and NOT EXISTS subquery!

                SELECT EMPNAME,PNUM,HOURS
                     FROM STAFF,WORKS
                     WHERE STAFF.EMPNUM = WORKS.EMPNUM
            UNION
                SELECT EMPNAME,PNUM,HOURS
                     FROM STAFF,WORKS
                     WHERE NOT EXISTS
                       (SELECT HOURS 
                             FROM WORKS
                             WHERE STAFF.EMPNUM = WORKS.EMPNUM);

-- PASS:0158 If 21 rows selected?

-- END TEST >>> 0158 <<< END TEST
-- *********************************************

-- TEST:0159 SELECT with 2 UNIONs, ORDER BY 2 integers!

             SELECT PNUM,EMPNUM,HOURS
                  FROM WORKS
                  WHERE HOURS=80
         UNION
             SELECT PNUM,EMPNUM,HOURS
                  FROM WORKS
                  WHERE HOURS=40
         UNION
             SELECT PNUM,EMPNUM,HOURS
                  FROM WORKS
                  WHERE HOURS=20
                  ORDER BY 3,1;

-- PASS:0159 If 10 rows selected?

-- END TEST >>> 0159 <<< END TEST
-- *********************************************

-- TEST:0160 SELECT with parenthesized UNION, UNION ALL!

             SELECT PNUM,EMPNUM,HOURS
                  FROM WORKS
                  WHERE HOURS=12
             UNION ALL 
            (SELECT PNUM,EMPNUM,HOURS
                  FROM WORKS
             UNION
             SELECT PNUM,EMPNUM,HOURS
                  FROM WORKS
                  WHERE HOURS=80)
                  ORDER BY 2,1;

-- PASS:0160 If 14 rows selected?

-- END TEST >>> 0160 <<< END TEST

-- *************************************************////END-OF-MODULE
