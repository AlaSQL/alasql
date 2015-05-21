-- MODULE  YTS764  

-- SQL Test Suite, V6.0, Interactive SQL, yts764.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7519 <query expression> with UNION ALL CORRESPONDING BY!

   DELETE FROM CTS1.ET;

   SELECT COUNT (*) FROM CTS1.STAFFb;
-- PASS:7519 If COUNT = 12?

   SELECT COUNT (*) FROM CTS1.STAFFa;
-- PASS:7519 If COUNT = 12?

   INSERT INTO CTS1.ET (col5, col6)
     SELECT * FROM CTS1.STAFFB
     UNION ALL CORRESPONDING BY (hours, salary)
     SELECT * FROM CTS1.STAFFA;
-- PASS:7519 If insert completed successfully?


   SELECT COUNT (*), col5, col6
     FROM CTS1.ET
     GROUP BY col6, col5
     ORDER BY 2,3;
-- PASS:7519 If 7 rows are returned in the following order?
--               count   col5   col6
--               =====   ====   ====
-- PASS:7519 If   1      15     7000?
-- PASS:7519 If   1      30     8000?
-- PASS:7519 If   3      30     20000?
-- PASS:7519 If   2      35     15000?
-- PASS:7519 If   9      40     10000?
-- PASS:7519 If   2      60     45000?
-- PASS:7519 If   6      70     40000?

   ROLLBACK WORK;

-- END TEST >>> 7519 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
