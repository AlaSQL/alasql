-- MODULE  DML135  

-- SQL Test Suite, V6.0, Interactive SQL, dml135.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0692 Many TSQL features #3:  enhanced proj/works!

   CREATE TABLE "Proj" (
   PNUM     CHAR(3) PRIMARY KEY,
   PNAME    CHAR(20),
   PTYPE    CHAR(6)    DEFAULT 'Code',
   BUDGET   DECIMAL(9) DEFAULT 10000,
   CITY     CHAR(15)   DEFAULT 'Berlin');
-- PASS:0692 If table is created?

   COMMIT;

   CREATE VIEW "PTypes" ("TYPE", NUM) AS
  SELECT PTYPE, COUNT(*) FROM "Proj"
  GROUP BY PTYPE;
-- PASS:0692 If view is created?

   COMMIT;

   CREATE VIEW PTYPES AS
  SELECT * FROM "PTypes"
  WHERE NUM > 1;
-- PASS:0692 If view is created?

   COMMIT;

   CREATE TABLE "Works" (
    EMPNUM   CHAR(3),
    PNUM     CHAR(3)
      REFERENCES "Proj" ON DELETE CASCADE,
    HOURS    DECIMAL(5),
    PRIMARY KEY (EMPNUM,PNUM));
-- PASS:0692 If table is created?

   COMMIT;

   CREATE VIEW "PStaff" (PNUM, NUM) AS
  SELECT PNUM, COUNT(*) FROM "Works"
  WHERE HOURS >= 20
  GROUP BY PNUM;
-- PASS:0692 If view is created?

   COMMIT;

   INSERT INTO "Proj"
  SELECT * FROM Hu.Proj;
-- PASS:0692 If 6 rows are inserted?

   INSERT INTO "Proj" (PNUM, PNAME, BUDGET)
  VALUES ('P7', 'FROB', DEFAULT);
-- PASS:0692 If 1 row is inserted?

   INSERT INTO "Proj" (PNUM, PNAME, BUDGET)
  VALUES ('P8', 'BORF', 15000);
-- PASS:0692 If 1 row is inserted?

   INSERT INTO "Proj" (PNUM, PNAME, PTYPE)
  VALUES ('P9', 'FORB', DEFAULT);
-- PASS:0692 If 1 row is inserted?

   INSERT INTO "Proj" VALUES
  ('P10', 'ROBF', 'Docs', 1000, 'Sofia');
-- PASS:0692 If 1 row is inserted?

   INSERT INTO "Works"
  SELECT * FROM Hu.Works;
-- PASS:0692 If 12 rows are inserted?

  SELECT * FROM PTYPES ORDER BY NUM;
-- PASS:0692 If 3 rows selected with ordered rows and column values ?
-- PASS:0692    Test     2 ?
-- PASS:0692    Design   3 ?
-- PASS:0692    Code     4 ?

  SELECT NUM, COUNT(*) FROM "PStaff"
   GROUP BY NUM ORDER BY NUM;
-- PASS:0692 If 3 rows selected with ordered rows and column values ?
-- PASS:0692     1    2 ?
-- PASS:0692     2    2 ?
-- PASS:0692     4    1 ?

   DELETE FROM "Proj" WHERE PTYPE = 'Design';
-- PASS:0692 If 3 rows from "Proj" and 5 rows from "Works" are deleted?

  SELECT * FROM PTYPES ORDER BY NUM;
-- PASS:0692 If 2 rows selected with ordered rows and column values ?
-- PASS:0692    Test     2 ?
-- PASS:0692    Code     4 ?

  SELECT NUM, COUNT(*) FROM "PStaff"
   GROUP BY NUM ORDER BY NUM;
-- PASS:0692 If 2 rows selected with ordered rows and column values ?
-- PASS:0692     1    2 ?
-- PASS:0692     4    1 ?

   ROLLBACK;

   DROP TABLE "Proj" CASCADE;
-- PASS:0692 If table and 2 views are dropped?

   COMMIT;

   DROP TABLE "Works" CASCADE;
-- PASS:0692 If table and view are dropped?

   COMMIT;

-- END TEST >>> 0692 <<< END TEST

-- *********************************************

-- TEST:0693 Many TSQL features #4:  enhanced INFO_SCHEM!

   CREATE TABLE CreationTimes (
  TABLE_SCHEM CHAR (50),
  TABLE_NAME  CHAR (50),
  CREATE_TIME TIMESTAMP);
-- PASS:0693 If table is created?

   COMMIT;

   CREATE VIEW TablesColumns AS
  SELECT TABLE_SCHEM, TABLE_NAME,
  TABLE_TYPE, COLUMN_NAME, CREATE_TIME
  FROM Info_Schem.Tables
  NATURAL JOIN Info_Schem.Columns
  NATURAL JOIN CreationTimes;
-- PASS:0693 If view is created?

   COMMIT;

   INSERT INTO CREATIONTIMES VALUES
  ('FLATER', 'CREATIONTIMES',
  TIMESTAMP '1994-09-01 16:15:00');
-- PASS:0693 If 1 row is inserted?

   INSERT INTO CREATIONTIMES VALUES
  ('FLATER', 'TABLESCOLUMNS', DEFAULT);
-- PASS:0693 If 1 row is inserted?

   COMMIT;

   SET TRANSACTION READ ONLY;
-- PASS:0693 If successful completion?

  SELECT TABLE_NAME, TABLE_TYPE, COLUMN_NAME,
  EXTRACT (HOUR FROM CREATE_TIME)
  FROM TABLESCOLUMNS
  ORDER BY TABLE_NAME, COLUMN_NAME;
-- PASS:0693 If 8 rows selected with ordered rows and column values ?
-- PASS:0693   CREATIONTIMES      BASE TABLE CREATE_TIME        16   ?
-- PASS:0693   CREATIONTIMES      BASE TABLE TABLE_NAME         16   ?
-- PASS:0693   CREATIONTIMES      BASE TABLE TABLE_SCHEM        16   ?
-- PASS:0693   TABLESCOLUMNS      VIEW       COLUMN_NAME        NULL ?
-- PASS:0693   TABLESCOLUMNS      VIEW       CREATE_TIME        NULL ?
-- PASS:0693   TABLESCOLUMNS      VIEW       TABLE_NAME         NULL ?
-- PASS:0693   TABLESCOLUMNS      VIEW       TABLE_SCHEM        NULL ?
-- PASS:0693   TABLESCOLUMNS      VIEW       TABLE_TYPE         NULL ?

   INSERT INTO CREATIONTIMES VALUES
  ('FLATER', 'USIG', DEFAULT);
-- PASS:0693 If ERROR, invalid transaction state, 0 rows inserted?

   ROLLBACK;

   DROP TABLE CreationTimes CASCADE;
-- PASS:0693 If table and view are dropped?

   COMMIT;

-- END TEST >>> 0693 <<< END TEST

-- *********************************************

-- TEST:0694 Interval Arithmetic and Casts!

   CREATE TABLE WORKS (
  EMPNUM CHAR (3) NOT NULL,
  PNUM CHAR (3) NOT NULL,
  HOURS DECIMAL (5),
  UNIQUE(EMPNUM,PNUM));
-- PASS:0694 If table is created?

   COMMIT WORK;

   CREATE VIEW PROJ_HOURS (PNUM, HOURS) AS
  SELECT PNUM, AVG (HOURS) * INTERVAL '01:00' HOUR TO MINUTE
  FROM WORKS GROUP BY PNUM;
-- PASS:0694 If view is created?

   COMMIT WORK;

   CREATE VIEW PROJ_HOURS2 (PNUM, HOURS) AS
  SELECT PNUM,
  AVG (CAST (CAST (HOURS AS INTERVAL HOUR)
    AS INTERVAL HOUR TO MINUTE))
  FROM WORKS GROUP BY PNUM;
-- PASS:0694 If view is created?

   COMMIT WORK;

   CREATE TABLE RUN_TIMES (
  JOB_ID INT NOT NULL UNIQUE,
  JOB_TYPE CHAR (3) NOT NULL,
  RUN_SECONDS REAL);
-- PASS:0694 If table is created?

   COMMIT WORK;

   CREATE VIEW TYPE_TIMES (JOB_TYPE, RUN_SECONDS) AS
  SELECT JOB_TYPE,
  AVG (RUN_SECONDS) * INTERVAL '01.000000' SECOND
  FROM RUN_TIMES GROUP BY JOB_TYPE;
-- PASS:0694 If view is created?

   COMMIT WORK;

   CREATE VIEW TYPE_TIMES2 (JOB_TYPE, RUN_SECONDS) AS
  SELECT JOB_TYPE,
  CAST (CAST (AVG (RUN_SECONDS) AS NUMERIC (8, 6))
    AS INTERVAL SECOND)
  FROM RUN_TIMES GROUP BY JOB_TYPE;
-- PASS:0694 If view is created?

   COMMIT WORK;

   CREATE VIEW HUNDREDS (WORKTOTL) AS
  SELECT SUM (CAST (HOURS AS INTERVAL DAY TO MINUTE)) / 100
  FROM PROJ_HOURS;
-- PASS:0694 If view is created?

   COMMIT WORK;

   INSERT INTO WORKS
  SELECT * FROM HU.WORKS;
-- PASS:0694 If 12 rows are inserted?

   INSERT INTO WORKS VALUES
  ('EX', 'P1', 50);
-- PASS:0694 If 1 row is inserted?

   INSERT INTO WORKS VALUES
  ('EX', 'P3', 25);
-- PASS:0694 If 1 row is inserted?

   INSERT INTO RUN_TIMES VALUES
  (0, 'DMP', 1.22);
-- PASS:0694 If 1 row is inserted?

   INSERT INTO RUN_TIMES VALUES
  (1, 'DMP', .49);
-- PASS:0694 If 1 row is inserted?

   INSERT INTO RUN_TIMES VALUES
  (2, 'CHK', 5.2);
-- PASS:0694 If 1 row is inserted?

   INSERT INTO RUN_TIMES VALUES
  (3, 'CHK', 4.04);
-- PASS:0694 If 1 row is inserted?

   INSERT INTO RUN_TIMES VALUES
  (4, 'CHK', 23.74);
-- PASS:0694 If 1 row is inserted?

   SELECT COUNT(*)
  FROM PROJ_HOURS A, PROJ_HOURS2 B
  WHERE A.PNUM = B.PNUM
  AND (A.HOURS - B.HOURS) HOUR TO MINUTE
    BETWEEN INTERVAL '-1' MINUTE AND INTERVAL '+1' MINUTE;
-- PASS:0694 If count = 6?

   SELECT COUNT(*)
  FROM TYPE_TIMES A, TYPE_TIMES2 B
  WHERE A.JOB_TYPE = B.JOB_TYPE
  AND (A.RUN_SECONDS - B.RUN_SECONDS) SECOND
    BETWEEN INTERVAL '-00.000010' SECOND
    AND INTERVAL '+00.000010' SECOND;
-- PASS:0694 If count = 2?

  SELECT EXTRACT (HOUR FROM HOURS),
         EXTRACT (MINUTE FROM HOURS)
  FROM PROJ_HOURS ORDER BY PNUM;
-- PASS:0694 If 6 rows selected with ordered rows and column values ?
-- PASS:0694   43     20 or 19   ?
-- PASS:0694   35        0       ?
-- PASS:0694   52       30       ?
-- PASS:0694   30        0       ?
-- PASS:0694   46        0       ?
-- PASS:0694   12        0       ?

  SELECT EXTRACT (SECOND FROM RUN_SECONDS)
  FROM TYPE_TIMES ORDER BY JOB_TYPE;
-- PASS:0694 If 2 rows selected with values in the following order?
-- PASS:0694  10.993333 +- 0.00001 ?
-- PASS:0694  0.855 +- 0.00001     ?

   SELECT EXTRACT (DAY FROM WORKTOTL)
  FROM HUNDREDS;
-- PASS:0694 If 1 row selected and value is 0?

   SELECT EXTRACT (HOUR FROM WORKTOTL)
  FROM HUNDREDS;
-- PASS:0694 If 1 row selected and value is 2?

   SELECT EXTRACT (MINUTE FROM WORKTOTL)
  FROM HUNDREDS;
-- PASS:0694 If 1 row selected and value is 11?

   ROLLBACK WORK;

   DROP TABLE WORKS CASCADE;
-- PASS:0694 If table and 3 views are dropped?

   COMMIT WORK;

   DROP TABLE RUN_TIMES CASCADE;
-- PASS:0694 If table and 2 views are dropped?

   COMMIT WORK;

-- END TEST >>> 0694 <<< END TEST

-- *********************************************

-- NO_TEST:0695 <updatability clause> in <declare cursor>!

-- Testing cursors

-- *************************************************////END-OF-MODULE
