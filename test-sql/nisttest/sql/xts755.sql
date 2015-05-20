-- MODULE   XTS755

-- SQL Test Suite, V6.0, Interactive SQL, xts755.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7055 ALTER TABLE DROP COLUMN RESTRICT!

   CREATE TABLE TAB755a
         (COL1  NUMERIC(7) PRIMARY KEY,
          COL2  CHAR(10),
          ENAME CHAR(25));
-- PASS:7055 If table created successfully?

   COMMIT WORK;

   CREATE TABLE TAB755b
         (COL_1    NUMERIC(7),
          COL_LEKTIKO1 CHAR(10),
          FOREIGN KEY(COL_1) REFERENCES TAB755a(COL1));
-- PASS:7055 If table created successfully?

   COMMIT WORK;

   ALTER TABLE TAB755b DROP COLUMN COL_LEKTIKO1 RESTRICT;
-- PASS:7055 If table altered successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'TAB755B'
         AND COLUMN_NAME = 'COL_LEKTIKO1';
-- PASS:7055 If COUNT = 0?

   COMMIT WORK;

   ALTER TABLE TAB755a DROP COLUMN COL1 RESTRICT;
-- PASS:7055 If ERROR - syntax error or access rule violation?

   ROLLBACK WORK;

   DROP TABLE TAB755a CASCADE;
-- PASS:7055 If table dropped successfully?

   COMMIT WORK;

   DROP TABLE TAB755b CASCADE;
-- PASS:7055 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7055 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
