-- MODULE   XTS741

-- SQL Test Suite, V6.0, Interactive SQL, xts741.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7041 COUNT(ALL NULLIF...) with generated Nulls!

   DELETE FROM EMPTY740;
-- PASS:7041 If delete completed successfully?

   INSERT INTO EMPTY740 
         VALUES('NICKOS','NICK',NULL,116,TIME'18:00:00');
-- PASS:7041 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('MARIA',NULL,NULL,NULL,TIME'12:00:00');
-- PASS:7041 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('KILLER','BUCK',NULL,127,TIME'09:30:30');
-- PASS:7041 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('JOYCE',NULL,NULL,17,TIME'15:43:52');
-- PASS:7041 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('ANGIE','TREE',NULL,7,TIME'12:53:13');
-- PASS:7041 If 1 row inserted successfully?

   INSERT INTO EMPTY740 
         VALUES('BUCK','BUCK',NULL,12,TIME'16:29:22');
-- PASS:7041 If 1 row inserted successfully?

   COMMIT WORK;

   SELECT COUNT(ALL NULLIF ('Nickos','Nickos   ')) 
         FROM EMPTY740;
-- PASS:7041 If   COUNT = 0 and                                     ?
-- PASS:7041      WARNING - null value eliminated in set function   ?

   SELECT COUNT(ALL NULLIF (COL_1,'JANET'))
         FROM EMPTY740;
-- PASS:7041 If COUNT = 6?

   SELECT COUNT(ALL NULLIF ('NICKOS',COL_1)) 
         FROM EMPTY740;
-- PASS:7041 If   COUNT = 5 and                                     ?
-- PASS:7041      WARNING - null value eliminated in set function   ?

   SELECT COUNT(ALL NULLIF (COL_2,COL_1))
         FROM EMPTY740;
-- PASS:7041 If   COUNT = 3 and                                     ?
-- PASS:7041      WARNING - null value eliminated in set function   ?

   SELECT COUNT(ALL NULLIF (COL_4,COL_3))
         FROM EMPTY740;
-- PASS:7041 If   COUNT = 5 and                                     ?
-- PASS:7041      WARNING - null value eliminated in set function   ?

   SELECT COUNT(ALL NULLIF (COL_5,TIME'12:00:00'))
         FROM EMPTY740;
-- PASS:7041 If  COUNT = 5 and                                      ?
-- PASS:7041     WARNING - null value eliminated in set function    ?

   ROLLBACK WORK;

   DELETE FROM EMPTY740;
-- PASS:7041 If delete completed successfully?

   COMMIT WORK;

-- END TEST >>> 7041 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
