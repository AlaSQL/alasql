-- MODULE   XTS754

-- SQL Test Suite, V6.0, Interactive SQL, xts754.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7054 ALTER TABLE ADD COLUMN WITH domain and constraint!

   CREATE DOMAIN DOM6138 AS INTEGER
      CHECK (VALUE > 1000)
      CHECK (VALUE < 2000);
-- PASS:7054 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE TAB754
         (C1 NUMERIC(5),
          C2 DECIMAL(4));
-- PASS:7054 If table created successfully?

   COMMIT WORK;

   ALTER TABLE CTS1.TAB754 ADD COLUMN COLDOM DOM6138
         CONSTRAINT c3dom_check CHECK (COLDOM <= 1998);
-- PASS:7054 If table altered successfully?

   COMMIT WORK;

   SELECT COUNT(*)  
         FROM INFORMATION_SCHEMA.COLUMN_DOMAIN_USAGE
         WHERE DOMAIN_SCHEMA = 'CTS1' AND DOMAIN_NAME = 'DOM6138'
         AND TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'TAB754'
         AND COLUMN_NAME = 'COLDOM';
-- PASS:7054 If COUNT = 1?

   INSERT INTO TAB754 VALUES(1000,766,1990);
-- PASS:7054 If 1 row inserted successfully?

   INSERT INTO TAB754 VALUES(1001,767,1999);
-- PASS:7054 If ERROR - integrity constraint violation?

   INSERT INTO TAB754 VALUES(1001,767,0);
-- PASS:7054 If ERROR - integrity constraint violation?

   ROLLBACK WORK;

   DROP TABLE TAB754 CASCADE;
-- PASS:7054 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN DOM6138 CASCADE;
-- PASS:7054 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7054 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
