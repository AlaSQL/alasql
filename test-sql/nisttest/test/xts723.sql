-- MODULE  XTS723

-- SQL Test Suite, V6.0, Interactive SQL, xts723.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS4              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7023 Access to CONSTRAINT_COLUMN_USAGE view!

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE
         WHERE TABLE_SCHEMA = 'CTS4';
-- PASS:7023 If COUNT = 0?

   COMMIT WORK;

   CREATE TABLE TAB722a 
 (COLNUM1 NUMERIC(5),
  COLNUM2 NUMERIC(5),
  COLSTR1 CHAR(3),
  CONSTRAINT 722ACONS1 PRIMARY KEY (COLSTR1),
  CONSTRAINT 722ACONS2 CHECK(COLNUM2 > 0));
-- PASS:7023 If table created successfully?

   COMMIT WORK;

   CREATE TABLE TAB722b
         ( C1 CHAR(3),
           C2 CHAR(10),
           CONSTRAINT 722B FOREIGN KEY(C1) 
           REFERENCES TAB722a(COLSTR1));
-- PASS:7023 If table created successfully?

   COMMIT WORK;

   SELECT COLUMN_NAME,CONSTRAINT_NAME
         FROM INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE
         ORDER BY CONSTRAINT_NAME;
-- PASS:7023 If 3 rows are selected in the following order?
--               COLUMN_NAME        CONSTRAINT_NAME
--               ===========        ===============
-- PASS:7023 If  COLSTR1            722ACONS1      ?
-- PASS:7023 If  COLNUM2            722ACONS2      ?    
-- PASS:7023 If  COLSTR1            722B           ?

   COMMIT WORK;

   DROP TABLE TAB722a CASCADE;
-- PASS:7023 If table dropped successfully?

   COMMIT WORK;

   SELECT COUNT(CONSTRAINT_NAME)
         FROM INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE;
-- PASS:7023 If COUNT = 0?

   ROLLBACK WORK;

   DROP TABLE TAB722b CASCADE;
-- PASS:7023 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7023 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
