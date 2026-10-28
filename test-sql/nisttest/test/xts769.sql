-- MODULE   XTS769

-- SQL Test Suite, V6.0, Interactive SQL, xts769.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS3              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7069 <Character set specification> of LATIN1 in <literal>!

   CREATE TABLE TABLATIN1
  ( COL1 CHARACTER(10) CHARACTER SET LATIN1,
    COL2 CHAR(12)      CHARACTER SET LATIN1,
    COL3 CHAR(15)   CHARACTER SET LATIN1,
    COL4 NUMERIC(5));
-- PASS:7069 If table created successfully?

   COMMIT WORK;

   INSERT INTO TABLATIN1 VALUES
(_LATIN1 'NICKOS', _LATIN1 'VASO', _LATIN1 'BILL',2);
-- PASS:7069 If 1 row inserted?

   INSERT INTO TABLATIN1 VALUES
(_LATIN1 'HELEN', _LATIN1 'JIM', _LATIN1 'ALLOS',5);
-- PASS:7069 If 1 row inserted?

   INSERT INTO TABLATIN1 VALUES
(_LATIN1 'LAMIA', _LATIN1 'ISOS', _LATIN1 'ALLOS',3);
-- PASS:7069 If 1 row inserted?

   INSERT INTO TABLATIN1 VALUES
(_LATIN1 'PAROS', _LATIN1 'MYKONOS', _LATIN1 'ALLOS',4);
-- PASS:7069 If 1 row inserted?

   INSERT INTO TABLATIN1 VALUES
(_LATIN1 'HULL', _LATIN1 'MYKONOS', _LATIN1 'OFFERTON',6);
-- PASS:7069 If 1 row inserted?

   SELECT COL1, COL2, COL3, COL4
         FROM TABLATIN1
         WHERE COL1 = _LATIN1'NICKOS';
-- PASS:7069 If COL1 = NICKOS?
-- PASS:7069 If COL2 = VASO?
-- PASS:7069 If COL3 = BILL? 
-- PASS:7069 If COL4 = 2?

   SELECT COUNT(COL2) 
         FROM TABLATIN1
         WHERE COL2 = _LATIN1'MYKONOS';
-- PASS:7069 If COUNT = 2?

   SELECT COL1, COL2, COL3, COL4
         FROM TABLATIN1 WHERE COL3 = _LATIN1'ALLOS'
         ORDER BY COL4;
-- PASS:7069 If 3 rows are selected in the following order?
--                  COL1       COL2       COL3       COL4
--               ========    ========   ========   ========
-- PASS:7069 If  LAMIA       ISOS       ALLOS      3       ?
-- PASS:7069 If  PAROS       MYKONOS    ALLOS      4       ?
-- PASS:7069 If  HELEN       JIM        ALLOS      5       ?

   ROLLBACK WORK;

   DROP TABLE TABLATIN1 CASCADE;
-- PASS:7069 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7069 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
