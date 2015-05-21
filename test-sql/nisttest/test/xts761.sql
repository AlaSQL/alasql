-- MODULE   XTS761

-- SQL Test Suite, V6.0, Interactive SQL, xts761.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7061 Defined character set in <comparison predicate>!

   SELECT COLUN, COLSTR1, COLSTR2
         FROM CTS1.TABCS
         WHERE COLSTR1 = _CS 'NICKOS'
         ORDER BY COLUN;
-- PASS:7061 If two rows selected in the following order?
--             colun      colstr1      colstr2
--             =====      =======      =======
-- PASS:7061     1        NICKOS       MARIA  ?
-- PASS:7061     3        NICKOS       TAKIS  ?

   SELECT COUNT(*) 
         FROM TABCS
         WHERE COLSTR1 = COLSTR2;
-- PASS:7061 If COUNT = 0?

   SELECT COUNT(*) 
         FROM TABCS
         WHERE COLSTR1 > COLSTR2;
-- PASS:7061 If COUNT = 1?

   SELECT COUNT(*) 
         FROM TABCS
         WHERE COLSTR1 <= COLSTR2;
-- PASS:7061 If COUNT = 3?

   ROLLBACK WORK;

-- END TEST >>> 7061 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
