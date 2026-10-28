-- MODULE   XTS713

-- SQL Test Suite, V6.0, Interactive SQL, xts713.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION T7013PC           

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7013 Schema definition in an SQL statement-single table!

   CREATE SCHEMA AUTHORIZATION T7013PC
         CREATE TABLE TA
         (TAINT INTEGER,
          TACHAR CHARACTER(3));
-- PASS:7013 If schema is created successfully?

   COMMIT WORK;

   INSERT INTO T7013PC.TA VALUES(1,'AA');
-- PASS:7013 If 1 row inserted successfully?

   INSERT INTO T7013PC.TA VALUES(5,'EE');
-- PASS:7013 If 1 row inserted successfully?

   INSERT INTO T7013PC.TA VALUES(3,'CC');
-- PASS:7013 If 1 row inserted successfully?

   INSERT INTO T7013PC.TA VALUES(4,'DD');
-- PASS:7013 If 1 row inserted successfully?

   INSERT INTO T7013PC.TA VALUES(2,'BB');
-- PASS:7013 If 1 row inserted successfully?

   COMMIT WORK;

   SELECT * FROM T7013PC.TA ORDER BY TAINT;
-- PASS:7013 If 5  rows are selected with the following order?
--               c1   c2
--               ==   == 
-- PASS:7013 If   1   AA?
-- PASS:7013 If   2   BB?
-- PASS:7013 If   3   CC?
-- PASS:7013 If   4   DD?
-- PASS:7013 If   5   EE?

   COMMIT WORK;

   CREATE SCHEMA AUTHORIZATION T7013bPC
         CREATE TABLE TB
         (TBINT INT,
          TBCHAR CHAR(3))
         GRANT SELECT, INSERT ON TB TO T7013PC;
-- PASS:7013 If schema created successfully?

   COMMIT WORK;

   INSERT INTO T7013bPC.TB VALUES(1,'AA');
-- PASS:7013 If 1 row inserted successfully?

   INSERT INTO T7013bPC.TB VALUES(5,'EE');
-- PASS:7013 If 1 row inserted successfully?

   INSERT INTO T7013bPC.TB VALUES(3,'CC');
-- PASS:7013 If 1 row inserted successfully?

   INSERT INTO T7013bPC.TB VALUES(4,'DD');
-- PASS:7013 If 1 row inserted successfully?

   INSERT INTO T7013bPC.TB VALUES(2,'BB');
-- PASS:7013 If 1 row inserted successfully?

   SELECT * FROM T7013bPC.TB ORDER BY TBINT;
-- PASS:7013 If 5 rows are selected in the following order?
--                c1  c2
--                ==  ==
-- PASS:7013 If   1   AA?
-- PASS:7013 If   2   BB?
-- PASS:7013 If   3   CC?
-- PASS:7013 If   4   DD?
-- PASS:7013 If   5   EE?

   ROLLBACK WORK;

   DROP SCHEMA T7013PC CASCADE;
-- PASS:7013 If schema dropped successfully?

   COMMIT WORK;

   DROP SCHEMA T7013bPC CASCADE;
-- PASS:7013 If schema dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7013 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
