-- MODULE   XTS762

-- SQL Test Suite, V6.0, Interactive SQL, xts762.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7062 Defined character set in <like predicate>!

   SELECT COLUN, COLSTR1, COLSTR2
         FROM CTS1.TABCS
         WHERE COLSTR1 LIKE _CS 'NICKKOS%' ESCAPE _CS 'K'
         ORDER BY COLUN;
-- PASS:7062 If two rows are selected in following order?
--                 colun     colstr1     colstr2
--                 =====     =======     =======
-- PASS:7062 If    1         NICKOS      MARIA?
-- PASS:7062 If    3         NICKOS      TAKIS?

   SELECT COUNT(*) 
         FROM TABCS
         WHERE COLSTR1 LIKE _CS 'VLASSIS%' ESCAPE _CS 'S'
         OR COLSTR2   LIKE _CS 'YANNIS%'  ESCAPE _CS 'N';
-- PASS:7062 If COUNT = 0?

   ROLLBACK WORK;

-- END TEST >>> 7062 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
