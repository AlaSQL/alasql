-- MODULE  YTS753  

-- SQL Test Suite, V6.0, Interactive SQL, yts753.sql
-- 59-byte ID
-- TEd Version # 

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7503 DROP DOMAIN RESTRICT!

   CREATE DOMAIN intdomain AS INTEGER;
-- PASS:7503 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE int_in_use
     (   numerical  intdomain,
         literary   char(10));
-- PASS:7503 If table created successfully?

   COMMIT WORK;

   DROP DOMAIN intdomain RESTRICT;
-- PASS:7503 If ERROR - syntax error or access rule violation?

   COMMIT WORK;

   DROP TABLE int_in_use CASCADE;
-- PASS:7503 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN intdomain RESTRICT;
-- PASS:7503 If domain dropped successfully?

   COMMIT WORK;

   CREATE TABLE int_in_use
     (   numerical   intdomain,
         literary    char(10));
-- PASS:7503 If ERROR - syntax error or access rule violation?

   ROLLBACK WORK;

-- END TEST >>> 7503 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
