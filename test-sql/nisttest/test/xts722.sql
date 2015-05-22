-- MODULE  XTS722  

-- SQL Test Suite, V6.0, Interactive SQL, xts722.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS4              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7022 Access to CONSTRAINT_TABLE_USAGE view!

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.CONSTRAINT_TABLE_USAGE
         WHERE TABLE_SCHEMA = 'CTS4';
-- PASS:7022 If COUNT = 0?

   COMMIT WORK;

   CREATE TABLE TAB722a 
 (COLNUM1 NUMERIC(5),
  COLNUM2 NUMERIC(5),
  COLSTR1 CHAR(3),
  CONSTRAINT 722ACONS1 PRIMARY KEY (COLSTR1),
  CONSTRAINT 722ACONS2 CHECK(COLNUM2 > 0));
-- PASS:7022 If table created successfully? 

   COMMIT WORK;

   CREATE TABLE TAB722b
         ( C1 CHAR(3),
           C2 CHAR(10),
           CONSTRAINT 722B FOREIGN KEY(C1) 
           REFERENCES TAB722a(COLSTR1));
-- PASS:7022 If table created successfully?

   COMMIT WORK;

   SELECT COUNT (DISTINCT TABLE_NAME),
         COUNT(CONSTRAINT_NAME)
         FROM INFORMATION_SCHEMA.CONSTRAINT_TABLE_USAGE
         WHERE CONSTRAINT_SCHEMA = 'CTS4';
-- PASS:7022 If first COUNT = 1?
-- PASS:7022 If second COUNT = 3?

   COMMIT WORK;

   DROP TABLE TAB722a CASCADE;
-- PASS:7022 If table dropped successfully? 

   COMMIT WORK;

   SELECT COUNT (CONSTRAINT_NAME) 
  FROM INFORMATION_SCHEMA.VIEW_TABLE_USAGE
  WHERE TABLE_SCHEMA = 'CTS4';
-- PASS:7022 If COUNT = 0?

   ROLLBACK WORK;

   DROP TABLE TAB722b CASCADE;
-- PASS:7022 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7022 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
