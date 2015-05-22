-- MODULE  DML163  

-- SQL Test Suite, V6.0, Interactive SQL, dml163.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0865 Result data types for case expressions!

   CREATE TABLE T0865 (
     C1 INT,
     C2 CHAR (10),
     C3 VARCHAR (5),
     C4 REAL,
     C5 CHAR (5),
     C6 DECIMAL (2));
-- PASS:0865 If table created successfully?

   COMMIT WORK;

   CREATE VIEW V0865 (EXN, APXN, FXC, VC) AS
     SELECT COALESCE (C1, C6),
            COALESCE (C1, C4),
            COALESCE (C2, C5),
            COALESCE (C2, C3)
     FROM T0865;
-- PASS:0865 If view created successfully?

   COMMIT WORK;

   SELECT DATA_TYPE, ORDINAL_POSITION
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'FLATER'
     AND TABLE_NAME = 'V0865'
     ORDER BY ORDINAL_POSITION;
-- PASS:0865 If 4 rows are returned in the following order?
--                                   data_type
--                                   =========
-- PASS:0865 If row1 =  INTEGER or SMALLINT or NUMERIC or DECIMAL?
-- PASS:0865 If row2 =  REAL or DOUBLE PRECISION or FLOAT?
-- PASS:0865 If row3 =  CHARACTER or CHARACTER V?
-- PASS:0865 If row4 =  CHARACTER VARYING?

   COMMIT WORK;

   DROP TABLE T0865 CASCADE;
-- PASS:0865 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0865 <<< END TEST
-- *********************************************

-- TEST:0866 Case expressions in other than SELECT!

   CREATE VIEW V0866 (EMPNUM, HOURS) AS
   SELECT EMPNUM,
      CASE
        WHEN PNUM = 'P2' THEN HOURS + 30
        ELSE HOURS
      END
     FROM HU.WORKS;
-- PASS:0866 If view created successfully?

   COMMIT WORK;

   UPDATE HU.STAFF
     SET CITY = NULLIF (CITY, 'Deale');
-- PASS:0866 If update completed successfully?

   SELECT COUNT(*) 
     FROM HU.STAFF
     WHERE CITY IS NULL;
-- PASS:0866 If COUNT = 2?

   INSERT INTO HU.STAFF VALUES (
     'E8', 'Wally',
     CASE WHEN USER = 'FLATER' THEN 15 ELSE 10 END,
     'Monash');
-- PASS:0866 If insert completed successfully?

   SELECT COUNT(*) 
     FROM HU.STAFF
     WHERE GRADE = 15;
-- PASS:0866 If COUNT = 1?

   SELECT COUNT(*) 
     FROM HU.STAFF
     WHERE CASE GRADE
       WHEN 10 THEN 12
       WHEN 13 THEN 12
     END = 12;
-- PASS:0866 If COUNT = 3?

   SELECT SUM(HOURS) 
     FROM V0866;
-- PASS:0866 If SUM(HOURS) = 584?

   SELECT COALESCE (CITY, EMPNUM) FROM HU.STAFF
     ORDER BY 1;
-- PASS:0866 If 6 rows are returned in the following order?
--               coalesce(city,empnum)
--               =====================
-- PASS:0866 If  Akron?  
-- PASS:0866 If  E1   ?
-- PASS:0866 If  E4   ?
-- PASS:0866 If  Monash?
-- PASS:0866 If  Vienna?
-- PASS:0866 If  Vienna?

   ROLLBACK WORK;

   DROP VIEW V0866 CASCADE;
-- PASS:0866 If view dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0866 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
