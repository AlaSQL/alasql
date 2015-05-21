-- MODULE   XTS732

-- SQL Test Suite, V6.0, Interactive SQL, xts732.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

   ROLLBACK WORK;

-- TEST:7032 NATURAL FULL OUTER JOIN <table ref> -- static!

   SELECT  COUNT(*) 
         FROM TEST6740A NATURAL FULL OUTER JOIN TEST6740B;
-- PASS:7032 If COUNT = 0?

   SELECT COUNT(*) 
         FROM TEST6740A NATURAL FULL JOIN TEST6740B;
-- PASS:7032 If COUNT = 0?

   INSERT INTO TEST6740A VALUES (1,'AA');
-- PASS:7032 If 1 row inserted successfully?

   COMMIT WORK;

   SELECT * FROM TEST6740A NATURAL FULL JOIN TEST6740B 
     FOR READ ONLY;
-- PASS:7032 If   1   AA   NULL?

   SELECT * FROM TEST6740B NATURAL FULL JOIN TEST6740A 
     FOR READ ONLY;
-- PASS:7032 If   1   NULL   AA?

   INSERT INTO TEST6740B VALUES (1,'WW');
-- PASS:7032 If 1 row inserted successfully?

   INSERT INTO TEST6740B VALUES (3,'ZZ');
-- PASS:7032 If 1 row inserted successfully?

   SELECT COUNT(*) 
         FROM TEST6740A NATURAL FULL OUTER JOIN TEST6740B;
-- PASS:7032 If COUNT = 2?

   SELECT COUNT(*) 
         FROM TEST6740B NATURAL FULL JOIN TEST6740A;
-- PASS:7032 If COUNT = 2?

   INSERT INTO TEST6740C VALUES(6,'PP');
-- PASS:7032 If 1 row inserted successfully?

   INSERT INTO TEST6740C VALUES(7,'QQ');
-- PASS:7032 If 1 row inserted successfully?

   COMMIT WORK;

   CREATE VIEW TESTV6740 (VNUM1, VCHAR1, VNUM2, VCHAR2)
         AS TEST6740C NATURAL FULL OUTER JOIN TEST6740A;
-- PASS:7032 If view created successfully?

   COMMIT WORK;

   SELECT * FROM TESTV6740 ORDER BY VNUM1;
-- PASS:7032 If 2 rows selected in following order?
--                c1   c2   c3   c4
--                ==   ==   ==   ==
-- PASS:7032 If   6    PP   1    AA?
-- PASS:7032 If   7    QQ   1    AA?

   ROLLBACK WORK;

   DELETE FROM TEST6740A;
-- PASS:7032 If delete completed successfully?

   DELETE FROM TEST6740B;
-- PASS:7032 If delete completed successfully?

   DELETE FROM TEST6740C;
-- PASS:7032 If delete completed successfully?

   COMMIT WORK;

   DROP VIEW TESTV6740 CASCADE;
-- PASS:7032 If view dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7032 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
