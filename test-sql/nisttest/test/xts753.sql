-- MODULE   XTS753

-- SQL Test Suite, V6.0, Interactive SQL, xts753.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7053 ALTER TABLE ADD COLUMN WITH <data type>!

   CREATE TABLE TAB753
         (COL1 DECIMAL(4),
          COL2 CHAR(10),
          COL3 CHAR(10));
-- PASS:7053 If table created successfully?

   COMMIT WORK;

   ALTER TABLE TAB753 ADD COLUMN COL4 NUMERIC(7);
-- PASS:7053 If table altered successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'TAB753'
         AND COLUMN_NAME = 'COL4';
-- PASS:7053 If COUNT = 1?

   COMMIT WORK;

   ALTER TABLE TAB753 ADD COLUMN COL5 CHAR(7);
-- PASS:7053 If table altered successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'TAB753'
         AND COLUMN_NAME = 'COL5';
-- PASS:7053 If COUNT = 1?

   INSERT INTO TAB753 VALUES(1000,'PHONE','NICKOS',12000,'blue');
-- PASS:7053 If 1 row inserted?

   INSERT INTO TAB753 VALUES(1001,'HULME','CHEADLE',12001,'velvet');
-- PASS:7053 If 1 row inserted?

   COMMIT WORK;

   SELECT COL1,COL2,COL3,COL4,COL5
         FROM TAB753
         ORDER BY COL1;
-- PASS:7053 If 2 rows are selected in the following order?
--               col1   col2    col3    col4     col5
--               ====   ====    ====    ====     ====
-- PASS:7053 If  1000   PHONE   NICKOS  12000    blue?
-- PASS:7053 If  1001   HULME   CHEADLE 12001    velvet?

   ROLLBACK WORK;

   DROP TABLE TAB753 CASCADE;
-- PASS:7053 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7053 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
