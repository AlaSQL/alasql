-- MODULE  DML137  

-- SQL Test Suite, V6.0, Interactive SQL, dml137.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0697 Erratum:  drop behavior, constraints (static)!

   CREATE TABLE UNDROPPABLE (
  C1 INT PRIMARY KEY NOT NULL);
-- PASS:0697 If table is created?

   COMMIT WORK;

   CREATE TABLE DROPPABLE (
  C1 INT PRIMARY KEY NOT NULL REFERENCES UNDROPPABLE,
  C2 INT, CHECK (C1 < C2));
-- PASS:0697 If table is created?

   COMMIT WORK;

   DROP TABLE BASE_WCOV RESTRICT;
-- PASS:0697 If ERROR, syntax error/access violation, table not dropped?

   COMMIT WORK;

   DROP TABLE UNDROPPABLE RESTRICT;
-- PASS:0697 If ERROR, syntax error/access violation, table not dropped?

   COMMIT WORK;

   DROP TABLE DROPPABLE RESTRICT;
-- PASS:0697 If table is dropped?

   COMMIT WORK;

   DROP TABLE UNDROPPABLE RESTRICT;
-- PASS:0697 If table is dropped?

   COMMIT WORK;

-- END TEST >>> 0697 <<< END TEST

-- *************************************************////END-OF-MODULE
