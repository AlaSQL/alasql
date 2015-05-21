-- MODULE  YTS797  

-- SQL Test Suite, V6.0, Interactive SQL, yts797.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7558 <scalar subquery> in SET of searched update!

   UPDATE TV AS X
     SET B =
         (SELECT D FROM TV AS Y, TW AS Z
              WHERE Y.A = Z.E
              AND X.A = Y.A);
-- PASS:7558 If ERROR - cardinality violation?

   UPDATE TV AS X
     SET B =
         (SELECT D FROM TV AS Y, TW AS Z
              WHERE Y.A = Z.E AND Z.E <> 2
              AND X.A = Y.A);
-- PASS:7558 If UPDATE completed successfully?

   SELECT B 
     FROM CTS1.TV
     WHERE A = 1;
-- PASS:7558 If B = 'g'?

   SELECT B 
     FROM CTS1.TV
     WHERE A = 2;
-- PASS:7558 If B = NULL?

   SELECT B 
     FROM CTS1.TV
     WHERE A = 3;
-- PASS:7558 If B = NULL?

   SELECT B 
     FROM CTS1.TV
     WHERE A = 4;
-- PASS:7558 If B = 'h'?

   SELECT B 
     FROM CTS1.TV
     WHERE A = 5;
-- PASS:7558 If B = 'i'?

   ROLLBACK WORK;

-- END TEST >>> 7558 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
