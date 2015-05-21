-- MODULE  DML114  

-- SQL Test Suite, V6.0, Interactive SQL, dml114.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0635 Feature 13, grouped operations (static)!

  CREATE VIEW WORKWEEK AS
  SELECT EMPNUM, HOURS FROM HU.WORKS
  GROUP BY HOURS, EMPNUM;
-- PASS:0635 If table is created?

   COMMIT WORK;

  SELECT EMPNUM, SUM (HOURS)
  FROM WORKWEEK
  WHERE HOURS > 20
  GROUP BY EMPNUM
  HAVING EMPNUM = 'E1';
-- PASS:0635 If 1 row selected and EMPNUM = 'E1' and SUM(HOURS) = 120?

   SELECT COUNT(*)
  FROM WORKWEEK WHERE HOURS > 40;
-- PASS:0635 If count = 3?

   SELECT EMPNAME
  FROM HU.STAFF, WORKWEEK
  WHERE HU.STAFF.EMPNUM = WORKWEEK.EMPNUM
  AND HOURS = 12;
-- PASS:0635 If 1 row selected and EMPNAME = 'Alice'?

   SELECT COUNT(*), MAX(EMPNUM), MIN(EMPNUM), AVG(HOURS)
  FROM WORKWEEK;
-- PASS:0635 If 1 row selected and count = 10 and MAX(EMPNUM) = 'E4'?
-- PASS:0635 AND MIN(EMPNUM) = 'E1' and AVG(HOURS) = 43 (approximately)?

   SELECT EMPNAME
  FROM HU.STAFF WHERE EMPNUM =
  (SELECT EMPNUM FROM WORKWEEK
    WHERE HOURS = 12);
-- PASS:0635 If 1 row selected and EMPNAME = 'Alice'?

   SELECT EMPNAME
  FROM HU.STAFF WHERE EMPNUM =
  (SELECT EMPNUM FROM HU.WORKS
    GROUP BY EMPNUM, HOURS
    HAVING HOURS = 12);
-- PASS:0635 If 1 row selected and EMPNAME = 'Alice'?

-- NOTE:0635 Cursor subtest deleted.

   COMMIT WORK;

   DROP VIEW WORKWEEK CASCADE;

   COMMIT WORK;

-- END TEST >>> 0635 <<< END TEST

-- *********************************************

-- TEST:0637 Feature 14, Qualified * in select list (static)!

   CREATE VIEW QUALSTAR AS
  SELECT HU.STAFF.*, HOURS FROM HU.STAFF, HU.WORKS
  WHERE HU.STAFF.EMPNUM = HU.WORKS.EMPNUM;
-- PASS:0637 If view is created?

   COMMIT WORK;

   CREATE VIEW CORRQUALSTAR AS
  SELECT BLAH.*, HOURS FROM HU.STAFF BLAH, HU.WORKS
  WHERE BLAH.EMPNUM = HU.WORKS.EMPNUM;
-- PASS:0637 If view is created?

   COMMIT WORK;

   CREATE VIEW SUBQ2 AS
  SELECT DISTINCT * FROM QUALSTAR;
-- PASS:0637 If view is created?

   COMMIT WORK;

   CREATE VIEW CORRSUBQ2 AS
  SELECT DISTINCT * FROM CORRQUALSTAR;
-- PASS:0637 If view is created?

   COMMIT WORK;

   SELECT COUNT(*) FROM QUALSTAR;
-- PASS:0637 If count = 12?

   SELECT COUNT(*) FROM SUBQ2;
-- PASS:0637 If count = 10?

   SELECT EMPNUM, GRADE, CITY, HOURS
  FROM QUALSTAR WHERE EMPNAME = 'Carmen';
-- PASS:0637 If 1 row selected and EMPNUM = 'E3' and GRADE = 13?
-- PASS:0637 AND CITY = 'Vienna' and HOURS = 20?

-- NOTE:0637 Cursor subtest deleted.

   SELECT HU.STAFF.*, HOURS
  FROM HU.STAFF, HU.WORKS
  WHERE HU.STAFF.EMPNUM = HU.WORKS.EMPNUM
  AND EMPNAME = 'Carmen';
-- PASS:0637 If 1 row selected and EMPNUM = 'E3' and EMPNAME = 'Carmen'?
-- PASS:0637 AND GRADE = 13 and CITY = 'Vienna' and HOURS = 20?

   SELECT COUNT(*) FROM CORRQUALSTAR;
-- PASS:0637 If count = 12?

   SELECT COUNT(*) FROM CORRSUBQ2;
-- PASS:0637 If count = 10?

   SELECT EMPNUM, GRADE, CITY, HOURS
  FROM CORRQUALSTAR WHERE EMPNAME = 'Carmen';
-- PASS:0637 If 1 row selected and EMPNUM = 'E3'?
-- PASS:0637 AND GRADE = 13 and CITY = 'Vienna' and HOURS = 20?

   COMMIT WORK;

   DROP VIEW QUALSTAR CASCADE;

   COMMIT WORK;

   DROP VIEW CORRQUALSTAR CASCADE;

   COMMIT WORK;

-- END TEST >>> 0637 <<< END TEST

-- *********************************************

-- TEST:0639 Feature 15, Lowercase Identifiers (static)!

  create view Staff (Empnum, empname, Grade, City) as
  select empnum, EMPNAME, Grade, cItY from Hu.Staff;
-- PASS:0639 If view is created?

  commit work;

   SELECT EMPNUM as WhatsHisNumber, GRADE, CITY
  FROM Flater.staff FLaterStaff_Flater
  WHERE EMPNAME = 'Carmen'
  AND FLATERstaff_fLATER.whatshisnumber = 'E3';
-- PASS:0639 If 1 row selected and EMPNUM = 'E3'?
-- PASS:0639 AND GRADE = 13 and CITY = 'Vienna'?

-- NOTE:0639 Cursor subtest deleted.

   COMMIT WORK;

   DROP VIEW STAFF CASCADE;

   COMMIT WORK;

-- END TEST >>> 0639 <<< END TEST

-- *********************************************

-- TEST:0641 Feature 16, PRIMARY KEY enhancement (static)!

   CREATE TABLE FEAT16 (
  EMPNUM INT PRIMARY KEY,
  PNUM   INT UNIQUE);
-- PASS:0641 If view is created?

   COMMIT WORK;

   CREATE TABLE BARNO (
  P1 INT, P2 CHAR, X1 INT, X2 CHAR,
  UNIQUE (X2, X1),
  PRIMARY KEY (P1, P2));
-- PASS:0641 If view is created?

   COMMIT WORK;

   INSERT INTO FEAT16 VALUES (1, 10);
-- PASS:0641 If 1 row is inserted?

   INSERT INTO FEAT16 VALUES (2, 20);
-- PASS:0641 If 1 row is inserted?

   INSERT INTO FEAT16 VALUES (1, 30);
-- PASS:0641 If ERROR, unique constraint, 0 rows inserted?

   INSERT INTO FEAT16 VALUES (3, 20);
-- PASS:0641 If ERROR, unique constraint, 0 rows inserted?

   INSERT INTO FEAT16 VALUES (3, NULL);
-- PASS:0641 If 1 row is inserted?

   INSERT INTO FEAT16 VALUES (4, NULL);
-- PASS:0641 If 1 row is inserted?

   INSERT INTO FEAT16 VALUES (5, NULL);
-- PASS:0641 If 1 row is inserted?

   INSERT INTO BARNO VALUES (1, 'A', 10, 'a');
-- PASS:0641 If 1 row is inserted?

   INSERT INTO BARNO VALUES (2, 'A', 20, 'a');
-- PASS:0641 If 1 row is inserted?

   INSERT INTO BARNO VALUES (1, 'A', 30, 'a');
-- PASS:0641 If ERROR, unique constraint, 0 rows inserted?

   INSERT INTO BARNO VALUES (3, 'A', 20, 'a');
-- PASS:0641 If ERROR, unique constraint, 0 rows inserted?

   INSERT INTO BARNO VALUES (3, NULL, 30, 'a');
-- PASS:0641 If ERROR, PRIMARY KEY constraint, 0 rows inserted?
-- PASS:0641 OR ERROR, NOT NULL constraint, 0 rows inserted?

   INSERT INTO BARNO VALUES (3, NULL, 30, 'b');
-- PASS:0641 If ERROR, PRIMARY KEY constraint, 0 rows inserted?
-- PASS:0641 OR ERROR, NOT NULL constraint, 0 rows inserted?

   INSERT INTO BARNO VALUES (3, 'A', 30, NULL);
-- PASS:0641 If 1 row is inserted?

   INSERT INTO BARNO VALUES (3, 'B', 30, NULL);
-- PASS:0641 If 1 row is inserted?

   INSERT INTO BARNO VALUES (4, 'B', NULL, NULL);
-- PASS:0641 If 1 row is inserted?

   COMMIT WORK;

   DROP TABLE FEAT16 CASCADE;

   COMMIT WORK;

   DROP TABLE BARNO CASCADE;

   COMMIT WORK;

-- END TEST >>> 0641 <<< END TEST
-- *************************************************////END-OF-MODULE
