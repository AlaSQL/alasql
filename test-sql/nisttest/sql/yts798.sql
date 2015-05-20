-- MODULE  YTS798  

-- SQL Test Suite, V6.0, Interactive SQL, yts798.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7559 <scalar subquery> in <select list> of single-row select!

   SELECT DISTINCT A,
            (SELECT D FROM TW
             WHERE E = X.A)
             FROM TV AS X, TW AS Y
             WHERE 1 <
                     (SELECT COUNT (*) FROM TV, TW
                      WHERE A = X.A
                      AND A = E);
-- PASS:7559 If ERROR - cardinality violation?

   SELECT DISTINCT A,
              (SELECT D FROM TW
               WHERE E = X.A)
         FROM TV AS X, TW AS Y
         WHERE A = 1;
-- PASS:7559 If A = 1 and D = 'g'?

   SELECT DISTINCT A,
             (SELECT D FROM TW
              WHERE E = X.A)
         FROM TV AS X, TW AS Y
         WHERE A = 3;
-- PASS:7559 If A = 3 and D = NULL?

   ROLLBACK WORK;

-- END TEST >>> 7559 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
