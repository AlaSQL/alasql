-- MODULE CDR019

-- SQL Test Suite, V6.0, Interactive SQL, cdr019.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM SUN.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0365 (3-level schema), check insert F.K!

  INSERT INTO EMP VALUES
        (41,'Tom','China Architecture',
        20,'Architecture',040553);
-- PASS:0365 If RI ERROR, parent missing, 0 rows inserted?

  INSERT INTO DEPT VALUES
        (20,'Architecture','Richard');

  INSERT INTO EMP VALUES
        (41,'Tom','China Architecture',
        20,'Architecture',040553);

  SELECT COUNT(*)  FROM EMP
        WHERE ENO = 41;
-- PASS:0365 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0365 <<< END TEST

-- *************************************************


-- TEST:0366 (3-level schema), check delete P.K!

  DELETE FROM EMP
        WHERE ENO = 21;
-- PASS:0366 If RI ERROR, children exist, 0 rows deleted?

  DELETE FROM EXPERIENCE
        WHERE EXP_NAME = 'Tom' AND BTH_DATE = 040523;

  DELETE FROM EMP
        WHERE ENO = 21;

  SELECT COUNT(*)  FROM EMP
        WHERE ENO = 21;
-- PASS:0366 If count = 0?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0366 <<< END TEST

-- *************************************************


-- TEST:0367 (3-level schema), update mid. tab. check P.K & F.K!

  UPDATE EMP
        SET ENAME = 'Thomas'
        WHERE ENO = 21;
-- PASS:0367 If RI ERROR, children exist, 0 rows updated?

  UPDATE EMP
        SET DNAME = 'Agriculture'
        WHERE  ENO = 21;
-- PASS:0367 If RI ERROR, parent missing, 0 rows updated?

  UPDATE EMP
        SET DNAME = 'Education'
        WHERE  ENO = 21;

  SELECT COUNT(*)
        FROM EMP
        WHERE DNO = 12 AND DNAME = 'Education'
              AND ENO = 21 AND ENAME = 'Tom';
-- PASS:0367 If count = 1?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0367 <<< END TEST

-- *************************************************


-- TEST:0368 (3-level schema), check update P.K!

  UPDATE EMP
        SET ENAME = 'Thomas'
        WHERE ENO = 21;
-- PASS:0368 If RI ERROR, children exist, 0 rows updated?

  INSERT INTO EMP VALUES
         (30,'Thomas','Languages & Operating System',
         12,'Computer',040523);

  UPDATE EXPERIENCE
        SET EXP_NAME = 'Thomas'
        WHERE EXP_NAME = 'Tom' AND BTH_DATE = 040523;

  DELETE FROM EMP
        WHERE  ENO = 21;

  SELECT COUNT(*) FROM EMP
        WHERE DNO = 12 AND ENO = 21
              AND ENAME = 'Tom';
-- PASS:0368 If count = 0?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0368 <<< END TEST

-- *************************************************////END-OF-MODULE
