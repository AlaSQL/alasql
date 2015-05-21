-- MODULE   XTS721

-- SQL Test Suite, V6.0, Interactive SQL, xts721.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS4              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7021 Access to VIEW_COLUMN_USAGE view!

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.VIEW_COLUMN_USAGE
         WHERE VIEW_SCHEMA = 'CTS4';
-- PASS:7021 If COUNT = 0?

   COMMIT WORK;

   CREATE TABLE TAB721a 
         (COLNUM1 NUMERIC(5),
          COLNUM2 NUMERIC(7),
          COLSTR1 CHAR(10),
          COLSTR2 CHAR(5));
-- PASS:7021 If table created successfully?

   COMMIT WORK;

   CREATE VIEW VA_721a AS SELECT 
         COLNUM1,COLNUM2,COLSTR1,COLSTR2 FROM TAB721a;
-- PASS:7021 If view created successfully?

   COMMIT WORK;

   SELECT 
         VIEW_SCHEMA,VIEW_NAME,TABLE_NAME,COLUMN_NAME
         FROM INFORMATION_SCHEMA.VIEW_COLUMN_USAGE
         WHERE VIEW_SCHEMA = 'CTS4' AND TABLE_SCHEMA = 'CTS4'
         ORDER BY COLUMN_NAME;
-- PASS:7021 If 4 rows are selected in the following order?
--                 c1       c2       c3        c4
--                 ==       ==       ==        ==
-- PASS:7021 If   CTS4   VA_721A   TAB721A   COLNUM1?
-- PASS:7021 If   CTS4   VA_721A   TAB721A   COLNUM2?
-- PASS:7021 If   CTS4   VA_721A   TAB721A   COLSTR1?
-- PASS:7021 If   CTS4   VA_721A   TAB721A   COLSTR2?

   COMMIT WORK;

   DROP VIEW VA_721a CASCADE;
-- PASS:7021 If view dropped successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.VIEW_COLUMN_USAGE
         WHERE VIEW_SCHEMA = 'CTS4';
-- PASS:7021 If COUNT = 0?

   ROLLBACK WORK;

   DROP TABLE TAB721a CASCADE;
-- PASS:7021 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7021 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
