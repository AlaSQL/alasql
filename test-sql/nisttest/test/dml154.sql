-- MODULE  DML154  

-- SQL Test Suite, V6.0, Interactive SQL, dml154.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0852 Transitive grant in COLUMN_PRIV, TABLE_PRIV!

  SELECT COUNT(*)
  FROM INFO_SCHEM.TABLE_PRIVILEGES
  WHERE TABLE_SCHEM = 'HU' AND TABLE_NAME = 'STAFF'
  AND GRANTOR = 'SULLIVAN1' AND GRANTEE = 'FLATER'
  AND IS_GRANTABLE = 'NO';
-- PASS:0852 If COUNT = 1?

   SELECT COUNT(*) 
  FROM INFO_SCHEM.COLUMN_PRIVILEGES
  WHERE TABLE_SCHEM = 'HU' AND TABLE_NAME = 'STAFF'
  AND GRANTOR = 'SULLIVAN1' AND GRANTEE = 'FLATER'
  AND IS_GRANTABLE = 'NO';
-- PASS:0852 If COUNT = 4?

   COMMIT WORK;

-- END TEST >>> 0852 <<< END TEST
-- *********************************************

-- TEST:0854 Informational:  mixing SDL and DML!
-- NOTE:  OPTIONAL test

   CREATE TABLE TRANSIENT (WINDOW_ID INT);

   INSERT INTO TRANSIENT VALUES (1);

   CREATE VIEW CTRANS (WIN_COUNT) AS
     SELECT COUNT(*) FROM TRANSIENT;

   INSERT INTO TRANSIENT VALUES (2);

   SELECT * FROM CTRANS;
-- PASS:0854 If WIN_COUNT = 2?

   SELECT * FROM TRANSIENT ORDER BY WINDOW_ID;
-- PASS:0854 If 2 rows are selected with the following order?
--               window_id
--               =========
-- PASS:0854 If     1      ?
-- PASS:0854 If     2      ? 

   DROP TABLE TRANSIENT CASCADE;
-- PASS:0854 If table dropped successfully?

   ROLLBACK WORK;

-- END TEST >>> 0854 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
