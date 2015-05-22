-- MODULE   XTS740

-- SQL Test Suite, V6.0, Interactive SQL, xts740.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7040 COUNT(ALL <column name>) with Nulls in column!

   DELETE FROM EMPTY740;
-- PASS:7040 If delete completed successfully?

   SELECT COUNT(ALL COL_1) 
         FROM EMPTY740;
-- PASS:7040 If COUNT = 0?

   SELECT COUNT(COL_2) 
         FROM EMPTY740;
-- PASS:7040 If COUNT = 0?

   SELECT COUNT(COL_3) 
         FROM EMPTY740;
-- PASS:7040 If COUNT = 0?

   SELECT COUNT(COL_4) 
         FROM EMPTY740;
-- PASS:7040 If COUNT = 0?

   SELECT COUNT(ALL COL_5)
         FROM EMPTY740;
-- PASS:7040 If COUNT = 0?

   INSERT INTO EMPTY740 
         VALUES('NICKOS','NICK',NULL,116,TIME'09:30:30');
-- PASS:7040 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('MARIA',NULL,NULL,NULL,TIME'15:43:52');
-- PASS:7040 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('KILLER','BUCK',NULL,127,TIME'15:43:52');
-- PASS:7040 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('JOYCE',NULL,NULL,17,TIME'12:53:13');
-- PASS:7040 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('ANGIE','TREE',NULL,7,TIME'16:29:22');
-- PASS:7040 If 1 row inserted successfully?

   COMMIT WORK;

   SELECT COUNT(COL_1) FROM EMPTY740;
-- PASS:7040 If COUNT = 5?

   SELECT COUNT(ALL COL_2) FROM EMPTY740;
-- PASS:7040 If   COUNT = 3 and                                     ?
-- PASS:7040      WARNING - null value eliminated in set function   ?

   SELECT COUNT(ALL COL_3) FROM EMPTY740;
-- PASS:7040 If   COUNT = 0 and                                     ?
-- PASS:7040      WARNING - null value eliminated in set function   ?

   SELECT COUNT(ALL COL_4) FROM EMPTY740;
-- PASS:7040 If   COUNT = 4 and                                     ?
-- PASS:7040      WARNING - null value eliminated in set function   ?

   SELECT COUNT(ALL COL_5) FROM EMPTY740;
-- PASS:7040 If COUNT = 5?

   ROLLBACK WORK;

   DELETE FROM EMPTY740;
-- PASS:7040 If deleted completed successfully?

   COMMIT WORK;

-- END TEST >>> 7040 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
