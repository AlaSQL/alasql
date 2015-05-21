-- MODULE   XTS734

-- SQL Test Suite, V6.0, Interactive SQL, xts734.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7034 National Character data type in cpmparison predicate!

   SELECT COUNT(*) 
         FROM TAB734 WHERE CSTR1 = CSTR2;
-- PASS:7034 If COUNT = 1?

   SELECT COUNT(*) 
         FROM TAB734 WHERE CSTR1 <> _VANGELIS '   !';
-- PASS:7034 If COUNT = 2?

   SELECT COUNT(CSTR2) 
         FROM TAB734 WHERE CSTR2 = _VANGELIS '*  *';
-- PASS:7034 If COUNT = 1?

   SELECT COUNT(*) 
         FROM TAB734 WHERE NOT CSTR1 <> _VANGELIS '   !';
-- PASS:7034 If COUNT = 1?

   SELECT COUNT(CSTR1) 
         FROM TAB734 WHERE CSTR1 <> N' * ';
-- PASS:7034 If COUNT = 2?

   SELECT COUNT(*) 
         FROM TAB734 WHERE NOT _VANGELIS '*  *' = CSTR2;
-- PASS:7034 If COUNT = 3?

   SELECT COUNT(CSTR2) 
         FROM TAB734 WHERE N'++++' <> CSTR2 ;
-- PASS:7034 If COUNT = 4?

   ROLLBACK WORK;

-- END TEST >>> 7034 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
