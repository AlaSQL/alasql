-- MODULE  YTS759  

-- SQL Test Suite, V6.0, Interactive SQL, yts759.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7509 GRANT USAGE on a domain!

   CREATE DOMAIN emp_nos INTEGER;
-- PASS:7509 If domain created successfully?

   COMMIT WORK;

   GRANT USAGE ON emp_nos TO CTS2 WITH GRANT OPTION;
-- PASS:7509 If usage granted successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS2'
-- PASS:7509 If session set successfully?

   CREATE TABLE EMP_INFO
   (  empno       CTS1.emp_nos,
      emp_name    char(10),
      salary      smallint);
-- PASS:7509 If table created successfully?

   COMMIT WORK;

   INSERT INTO EMP_INFO VALUES (1, 'watters',20000);
-- PASS:7509 If 1 row inserted successfully?

   COMMIT WORK;

   GRANT USAGE ON CTS1.emp_nos TO CTS3;
-- PASS:7509 If usage granted successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS3'
-- PASS:7509 If session set successfully?

   DROP TABLE emp CASCADE;
-- PASS:7509 If table dropped successfully?

   COMMIT WORK;

   CREATE TABLE emp
   (col1    CTS1.emp_nos,
    col2    char(10));
-- PASS:7509 If table created successfully?

   COMMIT WORK;

   INSERT INTO emp VALUES (2, 'pratt');
-- PASS:7509 If 1 row inserted successfully?

   SELECT col1 FROM emp;
-- PASS:7509 If col1 = 2? 

   ROLLBACK WORK;

   DROP TABLE EMP CASCADE;
-- PASS:7509 If table dropped successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS2'
-- PASS:7509 If session set successfully?

   DROP TABLE EMP_INFO CASCADE;
-- PASS:7509 If table dropped successfully?

   COMMIT WORK;

   SET SESSION AUTHORIZATION 'CTS1'
-- PASS:7509 If session set successfully?

   DROP DOMAIN emp_nos CASCADE;
-- PASS:7509 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7509 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
