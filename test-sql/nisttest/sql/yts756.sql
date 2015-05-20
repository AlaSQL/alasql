-- MODULE  YTS756  

-- SQL Test Suite, V6.0, Interactive SQL, yts756.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7506 Domain Constraint Containing VALUE!

   CREATE DOMAIN d AS INTEGER
     CHECK (VALUE IN (3,5,7,9,11));
-- PASS:7506 If domain created successfully?

   COMMIT WORK;

   CREATE DOMAIN e AS CHAR
     CHECK (VALUE LIKE 'a');
-- PASS:7506 If domain created successfully?

   COMMIT WORK;

   CREATE DOMAIN f AS INTEGER
     CHECK (VALUE * VALUE > 1 + VALUE);
-- PASS:7506 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE def_chk
     ( d_chk    d,
       e_chk    e,
       f_chk    f);
-- PASS:7506 If table created successfully?

   COMMIT WORK;

   INSERT INTO def_chk VALUES (3,'a',3);
-- PASS:7506 If 1 row inserted successfully?

   INSERT INTO def_chk VALUES (2,'a',3);
-- PASS:7506 If ERROR - integrity constraint violation?

   INSERT INTO def_chk VALUES (3,'z',3);
-- PASS:7506 If ERROR - integrity constraint violation?

   INSERT INTO def_chk VALUES (3,'a',1);
-- PASS:7506 If ERROR - integrity constraint violation?

   COMMIT WORK;

   DROP TABLE DEF_CHK CASCADE;
-- PASS:7506 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN d CASCADE;
-- PASS:7506 If domain dropped successfully?

   COMMIT WORK;

   DROP DOMAIN e CASCADE;
-- PASS:7506 If domain dropped successfully?

   COMMIT WORK;

   DROP DOMAIN f CASCADE;
-- PASS:7506 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7506 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
