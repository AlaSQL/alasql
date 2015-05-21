-- MODULE  YTS792  

-- SQL Test Suite, V6.0, Interactive SQL, yts792.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS4              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7526 GRANT USAGE on character set, WITH GRANT OPTION!

   CREATE DOMAIN CD CHAR(3) CHARACTER SET CTS1.CS;
-- PASS:7526 If domain created successfully?

   COMMIT WORK;

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.DOMAINS 
     WHERE DOMAIN_NAME = 'CD' AND DOMAIN_SCHEMA = 'CTS4';
-- PASS:7526 If COUNT = 1?

   COMMIT WORK;

   CREATE TABLE TC
     ( TCC CD);
-- PASS:7526 If table created successfully?

   COMMIT WORK;

   INSERT INTO TC VALUES (_CTS1.CS 'ghi');
-- PASS:7526 If 1 row inserted successfully?

   SELECT COUNT (*) FROM TC;
-- PASS:7526 If COUNT = 1?

   COMMIT WORK;

   DROP TABLE TC CASCADE;
-- PASS:7526 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN CD CASCADE;
-- PASS:7526 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7526 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
