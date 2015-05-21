-- MODULE   XTS742

-- SQL Test Suite, V6.0, Interactive SQL, xts742.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7042 COUNT ALL <literal>!

   SELECT COUNT(ALL 115.5), COUNT(ALL 'ATHINA'), COUNT(ALL 255), 
         COUNT(*) FROM CL_DATA_TYPE;
-- PASS:7042 If COUNTs are 6, 6, 6, 6?

   INSERT INTO CTS1.CL_DATA_TYPE VALUES(NULL,55,225,10);
-- PASS:7042 If 1 row inserted successfully?

   INSERT INTO CTS1.CL_DATA_TYPE VALUES(NULL,15,140,NULL);
-- PASS:7042 If 1 row inserted successfully?

   SELECT COUNT(*),COUNT(ALL 119), COUNT(ALL 'GIORGOS') ,
         COUNT(CL_CHAR),
         COUNT(CL_REAL) FROM CL_DATA_TYPE;
-- PASS:7042 If COUNTs are 8, 8, 8, 6, 7?
-- PASS:7042 If WARNING - null value eliminated in set function?

   INSERT INTO CTS1.CL_DATA_TYPE VALUES(NULL,0,0,NULL);
-- PASS:7042 If 1 row inserted successfully?

   SELECT COUNT(*), COUNT(ALL 1000), COUNT(ALL 'STEFOS'),
         COUNT(CL_CHAR),
         COUNT(CL_REAL) FROM CL_DATA_TYPE;
-- PASS:7042 If COUNTs = 9, 9, 9, 6, 7?
-- PASS:7042 If WARNING - null value eliminated in set function?

   ROLLBACK WORK;

-- END TEST >>> 7042 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
