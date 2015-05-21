-- MODULE   XTS720

-- SQL Test Suite, V6.0, Interactive SQL, xts720.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS4              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7020 Access to VIEW_TABLE USAGE view!

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.VIEW_TABLE_USAGE
         WHERE VIEW_SCHEMA = 'CTS4';
-- PASS:7020 If COUNT = 0?

   COMMIT WORK;

   CREATE TABLE TAB720a
         (COLNUM1 NUMERIC(5),
         COLNUM2 NUMERIC(7),
         COLSTR1 CHAR(10),
         COLSTR2 CHAR(5));
-- PASS:7020 If table created successfully?

   COMMIT WORK;

   CREATE TABLE TAB720b
         (CNUM1 NUMERIC(5),
          CNUM2 NUMERIC(7), 
          CSTR1 CHAR(10),
          CSTR2 CHAR(5));
-- PASS:7020 If table created successfully?

   COMMIT WORK;

   CREATE VIEW VA_720a AS SELECT COLNUM1,COLNUM2,CNUM1,NUM
         FROM TAB720a,TAB720b,CTS1.DATA_TYPE;
-- PASS:7020 If view created successfully?

   COMMIT WORK;

   CREATE VIEW VA_720b AS SELECT COLSTR1,COLSTR2,CSTR1,CSTR2
         FROM TAB720a,TAB720b;
-- PASS:7020 If view created successfully?

   COMMIT WORK;

   SELECT COUNT(*)
         FROM INFORMATION_SCHEMA.VIEW_TABLE_USAGE
          WHERE VIEW_SCHEMA = 'CTS4'
          AND VIEW_NAME = 'VA_720A';
-- PASS:7020 If COUNT = 2?

   COMMIT WORK;

         SELECT COUNT(*)
         FROM INFORMATION_SCHEMA.VIEW_TABLE_USAGE
         WHERE VIEW_SCHEMA = 'CTS4'
         AND VIEW_NAME = 'VA_720B';
-- PASS:7020 If COUNT = 2?

   COMMIT WORK;

   DROP VIEW VA_720a CASCADE;
-- PASS:7020 If view dropped successfully?

   COMMIT WORK;

   SELECT VIEW_SCHEMA,
          VIEW_NAME,TABLE_NAME
          FROM INFORMATION_SCHEMA.VIEW_TABLE_USAGE
          WHERE VIEW_SCHEMA = 'CTS4' AND TABLE_SCHEMA = 'CTS4'
          ORDER BY TABLE_NAME;
-- PASS:7020 If 2 rows are selected with the following order?
--                  c1         c2          c3
--                  ==         ==          ==
-- PASS:7020 If    CTS4     VA_720B     TAB720A?
-- PASS:7020 If    CTS4     VA_720B     TAB720B?

   COMMIT WORK;

   DROP VIEW VA_720b CASCADE;
-- PASS:7020 If view dropped successfully?

   COMMIT WORK;

   SELECT VIEW_SCHEMA,VIEW_NAME,TABLE_NAME
         FROM INFORMATION_SCHEMA.VIEW_TABLE_USAGE
         WHERE VIEW_SCHEMA = 'CTS4' AND TABLE_SCHEMA = 'CTS4';
-- PASS:7020 If 0 rows selected - no data?

   ROLLBACK WORK;

   DROP TABLE TAB720a CASCADE;
-- PASS:7020 If table dropped successfully?

   COMMIT WORK;

   DROP TABLE TAB720b CASCADE;
-- PASS:7020 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7020 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
