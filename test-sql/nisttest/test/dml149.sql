-- MODULE  DML149  

-- SQL Test Suite, V6.0, Interactive SQL, dml149.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0561 Double SET TRANSACTION!

   ROLLBACK WORK;
-- PASS:0561 If successful completion?

   SET TRANSACTION READ ONLY;
-- PASS:0561 If successful completion?

   SET TRANSACTION READ WRITE;
-- PASS:0561 If successful completion?

   INSERT INTO USIG VALUES (10, 20);
-- PASS:0561 If 1 row is inserted?

   ROLLBACK WORK;
-- PASS:0561 If successful completion?

   SET TRANSACTION READ WRITE;
-- PASS:0561 If successful completion?

   SET TRANSACTION READ ONLY;
-- PASS:0561 If successful completion?

   INSERT INTO USIG VALUES (10, 20);
-- PASS:0561 If ERROR, invalid transaction state, 0 rows inserted?

   ROLLBACK WORK;
-- PASS:0561 If successful completion?

-- END TEST >>> 0561 <<< END TEST

-- *********************************************

-- TEST:0846 Feature 20, CAST functions (static) nits!

   CREATE TABLE NO_DUCK (
  GOOSE       NUMERIC (4, 2),
  ALBATROSS   FLOAT,
  SEAGULL     INT,
  OSPREY      CHAR (10));
-- PASS:0846 If table is created?

   COMMIT WORK;

-- NOTE:0846 CAST (100 AS NUMERIC (2)) loses the leading significant digit
   SELECT CAST (100 AS NUMERIC (2))
  FROM HU.ECCO;
-- PASS:0846 If ERROR, numeric value out of range, 0 rows selected?

   SELECT CAST (100.5 AS DECIMAL (3))
  FROM HU.ECCO;
-- PASS:0846 If 1 row selected and value is 100 or 101?

   INSERT INTO NO_DUCK VALUES (
  CAST ('  23.23 ' AS NUMERIC (4, 2)), 1.57E-1, -9, 'QUACK');
-- PASS:0846 If 1 row is inserted?

   SELECT COUNT(*)
  FROM NO_DUCK WHERE GOOSE = 23.23;
-- PASS:0846 If count = 1?

   DELETE FROM NO_DUCK
  WHERE ALBATROSS - CAST ('   15.5E0    ' AS FLOAT) < 3E-1;
-- PASS:0846 If 1 row is deleted?

   SELECT COUNT(*) FROM NO_DUCK;
-- PASS:0846 If count = 0?

   INSERT INTO NO_DUCK
  SELECT 22.22, CAST (C1 AS FLOAT), 0, C1 FROM HU.ECCO;
-- PASS:0846 If ERROR, invalid character value for cast, 0 rows inserted?

   INSERT INTO NO_DUCK
  SELECT 22.22, 2.222E1, CAST (C1 AS INT), 'QUACK!' FROM HU.ECCO;
-- PASS:0846 If ERROR, invalid character value for cast, 0 rows inserted?

   SELECT CAST (CAST (3 AS DEC (5, 3)) AS CHAR (5))
  FROM HU.ECCO;
-- PASS:0846 If 1 row selected and value is '3.000'?

   INSERT INTO NO_DUCK VALUES (
  12.00, -10.5E0, 12, 'QUACK!');
-- PASS:0846 If 1 row is inserted?

   UPDATE NO_DUCK
  SET OSPREY = CAST (GOOSE AS CHAR (10))
  WHERE SEAGULL = CAST (GOOSE AS DEC);
-- PASS:0846 If 1 row is updated?

   SELECT OSPREY
  FROM NO_DUCK;
-- PASS:0846 If 1 row selected and OSPREY = '12.00     '?

   SELECT OSPREY
  FROM NO_DUCK
  WHERE OSPREY < CAST (SEAGULL + 1 AS CHAR (10))
  AND OSPREY = CAST (GOOSE * 1 AS CHAR (10));
-- PASS:0846 If 1 row selected and OSPREY = '12.00     '?

   UPDATE NO_DUCK
  SET OSPREY = CAST (-SEAGULL AS CHAR (10));
-- PASS:0846 If 1 row is updated?

   SELECT OSPREY
  FROM NO_DUCK;
-- PASS:0846 If 1 row selected and OSPREY = '-12       '?

-- NOTE:0846 Expected value -12.00 is too long for CHAR (5) cast
   SELECT CAST (-GOOSE AS CHAR (5))
  FROM NO_DUCK;
-- PASS:0846 If ERROR, string data, right truncation, 0 rows selected?

   UPDATE NO_DUCK
  SET ALBATROSS = 0.0;
-- PASS:0846 If 1 row is updated?

   SELECT CAST (-ALBATROSS AS CHAR (5))
  FROM NO_DUCK;
-- PASS:0846 If 1 row selected and value is '0E0  '?

   SELECT CAST (0230E-1 AS CHAR (10))
  FROM HU.ECCO;
-- PASS:0846 If 1 row selected and value is '2.3E1     '?

   SELECT CAST (0230E+1 AS CHAR (10))
  FROM HU.ECCO;
-- PASS:0846 If 1 row selected and value is '2.3E3     '?

   DELETE FROM NO_DUCK;

   INSERT INTO NO_DUCK VALUES (
  0.00, -10.5E0, -0, 'QUACK!');
-- PASS:0846 If 1 row is inserted?

   UPDATE NO_DUCK
  SET OSPREY = CAST (ALBATROSS AS CHAR (10))
  WHERE GOOSE = CAST (SEAGULL AS NUMERIC (2));
-- PASS:0846 If 1 row is updated?

   SELECT OSPREY
  FROM NO_DUCK;
-- PASS:0846 If 1 row selected and OSPREY = '-1.05E1   '?

   UPDATE NO_DUCK SET ALBATROSS = -0.5;
-- PASS:0846 If 1 row is updated?

   UPDATE NO_DUCK
  SET OSPREY = CAST (ALBATROSS AS CHAR (10));
-- PASS:0846 If 1 row is updated?

   SELECT OSPREY
  FROM NO_DUCK;
-- PASS:0846 If 1 row selected and OSPREY = '-5E-1     '?

   UPDATE NO_DUCK
  SET OSPREY = CAST (-ALBATROSS AS CHAR (10));
-- PASS:0846 If 1 row is updated?

   SELECT OSPREY
  FROM NO_DUCK;
-- PASS:0846 If 1 row selected and OSPREY = '5E-1      '?

-- NOTE:0846 Expected value -5E-1 is too long for CHAR (4) cast
   SELECT CAST (ALBATROSS AS CHAR (4))
  FROM NO_DUCK;
-- PASS:0846 If ERROR, string data, right truncation, 0 rows selected?

  SELECT CAST (NULL AS CHAR (10)), GOOSE FROM NO_DUCK
  WHERE SEAGULL = 0
  UNION
  SELECT OSPREY, CAST (SEAGULL AS NUMERIC (4, 2)) FROM NO_DUCK
  WHERE GOOSE > 10000;
-- PASS:0846 If 1 row selected and first value is NULL?

   UPDATE NO_DUCK SET GOOSE =
  CAST (NULL AS NUMERIC (2, 2));
-- PASS:0846 If 1 row is updated?

   SELECT COUNT(*)
  FROM NO_DUCK WHERE GOOSE IS NULL;
-- PASS:0846 If count = 1?

   SELECT CAST (GOOSE AS INT)
  FROM NO_DUCK;
-- PASS:0846 If 1 row selected and value is NULL?

   ROLLBACK WORK;

   DROP TABLE NO_DUCK CASCADE;

   COMMIT WORK;

-- END TEST >>> 0846 <<< END TEST

-- *************************************************////END-OF-MODULE
