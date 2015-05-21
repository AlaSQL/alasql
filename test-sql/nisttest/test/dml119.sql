-- MODULE  DML119  

-- SQL Test Suite, V6.0, Interactive SQL, dml119.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0647 Feature 20, CAST functions (static)!

   CREATE TABLE USER_INPUT (
   USER_ID INT, USER_TYPED CHAR (10),
   CASH_BALANCE NUMERIC (5, 2));
-- PASS:0647 If table is created?

   COMMIT WORK;

   CREATE VIEW STANDARD_INPUT AS
  SELECT CAST (USER_ID AS CHAR (10)) AS USER_NAME,
         CAST (USER_TYPED AS NUMERIC (5, 2)) AS USER_INPUT,
         CAST (CASH_BALANCE AS REAL) AS RECEIVABLE
    FROM USER_INPUT;
-- PASS:0647 If view is created?

   COMMIT WORK;

   INSERT INTO USER_INPUT VALUES
  (0, '999.99', 999.99);
-- PASS:0647 If 1 row is inserted?

   INSERT INTO USER_INPUT VALUES
  (1, '-999.99', -999.99);
-- PASS:0647 If 1 row is inserted?

   INSERT INTO USER_INPUT VALUES
  (2, '  54.', 54);
-- PASS:0647 If 1 row is inserted?

   INSERT INTO USER_INPUT VALUES
  (CAST ('3' AS INT), CAST (-7.02 AS CHAR (10)),
  CAST (' -.702E+1' AS NUMERIC (5, 2)));
-- PASS:0647 If 1 row is inserted?

   SELECT CAST (AVG (CAST (USER_TYPED AS INT)) AS INT)
  FROM USER_INPUT;
-- PASS:0647 If 1 row selected and value is 11 or 12?

   SELECT AVG (USER_INPUT)
  FROM STANDARD_INPUT;
-- PASS:0647 If 1 row selected and value is 11.745 +- 0.01?

   UPDATE USER_INPUT
  SET USER_TYPED = CAST (0 AS CHAR (10)),
  CASH_BALANCE = CASH_BALANCE - CAST ('500' AS NUMERIC (5, 2))
  WHERE USER_ID = CAST ('-0' AS INT);
-- PASS:0647 If 1 row is updated?

   SELECT SUM (USER_INPUT) * 100, SUM (RECEIVABLE)
  FROM STANDARD_INPUT;
-- PASS:0647 If 1 row selected and first value is -95301 +- 4?
-- PASS:0647 AND second value is -453.02 +- 0.04?

   DELETE FROM USER_INPUT;

   INSERT INTO USER_INPUT VALUES
  (CAST ('3' AS INT), CAST (-7.02 AS CHAR (10)),
  CAST (' -.702E+1' AS NUMERIC (5, 2)));
-- PASS:0647 If 1 row is inserted?

   INSERT INTO USER_INPUT VALUES
  (CAST ('3' AS SMALLINT), CAST (-7.02 AS CHAR (5)),
  CAST (' -.702E+1' AS DECIMAL (3, 2)));
-- PASS:0647 If 1 row is inserted?

   SELECT USER_ID
  FROM USER_INPUT
  GROUP BY USER_ID, USER_TYPED, CASH_BALANCE
  HAVING COUNT(*) = 2;
-- PASS:0647 If 1 row selected and USER_ID = 3?

   COMMIT WORK;

   DROP TABLE USER_INPUT CASCADE;

   COMMIT WORK;

-- END TEST >>> 0647 <<< END TEST
-- *************************************************////END-OF-MODULE
