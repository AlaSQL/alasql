-- MODULE DML050

-- SQL Test Suite, V6.0, Interactive SQL, dml050.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0226 FIPS sizing - 10 tables in SQL statement!
-- FIPS sizing TEST

     SELECT EMPNUM, EMPNAME 
     FROM STAFF 
     WHERE EMPNUM IN 
       (SELECT EMPNUM  FROM WORKS 
        WHERE PNUM IN 
          (SELECT PNUM  FROM PROJ 
           WHERE PTYPE IN 
             (SELECT PTYPE  FROM PROJ 
              WHERE PNUM IN 
                (SELECT PNUM  FROM WORKS 
                 WHERE EMPNUM IN 
                   (SELECT EMPNUM  FROM WORKS 
                    WHERE PNUM IN 
                      (SELECT PNUM   FROM PROJ 
                       WHERE PTYPE IN
                         (SELECT PTYPE  FROM PROJ
                          WHERE CITY IN
                            (SELECT CITY  FROM STAFF
                             WHERE EMPNUM IN
                               (SELECT EMPNUM  FROM WORKS
                                WHERE HOURS = 20 
                                AND PNUM = 'P2' )))))))));

-- PASS:0226 If 4 rows selected excluding EMPNUM='E5', EMPNAME='Ed'?

-- END TEST >>> 0226 <<< END TEST
-- *************************************************////END-OF-MODULE
