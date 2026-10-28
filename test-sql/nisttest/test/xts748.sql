-- MODULE   XTS748

-- SQL Test Suite, V6.0, Interactive SQL, xts748.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7048 Named constraint in column definition in schema definition!

   CREATE SCHEMA T12549PC
         CREATE TABLE TEST12549
         (TNUM1 NUMERIC(5)
          CONSTRAINT CND12549A NOT NULL,
          TNUM2 NUMERIC(5)
          CONSTRAINT CND12549B UNIQUE,
          TNUM3 NUMERIC(5)
          CONSTRAINT CND12549C CHECK(TNUM3 > 0));
-- PASS:7048 If schema created successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
         WHERE CONSTRAINT_SCHEMA =
         'T12549PC' AND TABLE_SCHEMA = 'T12549PC';
-- PASS:7048 If COUNT = 3?

   SELECT CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE
         FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
         WHERE CONSTRAINT_SCHEMA = 
         'T12549PC' AND TABLE_SCHEMA = 'T12549PC'
         ORDER BY CONSTRAINT_NAME;
-- PASS:7048 If 3 rows are selected in the following order?
--                cname       tname       ctype
--                =====       =====       =====
-- PASS:7048 If  CND12549A   TEST12549    CHECK?
-- PASS:7048 If  CND12549B   TEST12549    UNIQUE?
-- PASS:7048 If  CND12549C   TEST12549    CHECK?

   CREATE SCHEMA DT12549PC CREATE TABLE TEST12549
       (TNUM1 NUMERIC(5) CONSTRAINT CND12549D UNIQUE,
       TNUM2 NUMERIC(5) CONSTRAINT CND12549E CHECK(TNUM2 > 1000),
       TNUM3 NUMERIC(5) CONSTRAINT CND12549F NOT NULL);
-- PASS:7048 If schema created successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
      WHERE CONSTRAINT_SCHEMA = 
      'DT12549PC' AND TABLE_SCHEMA = 'DT12549PC';
-- PASS:7048 If COUNT = 3?

   SELECT CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE
         FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
         WHERE CONSTRAINT_SCHEMA = 
         'DT12549PC' AND TABLE_SCHEMA = 'DT12549PC'
         ORDER BY CONSTRAINT_NAME;
-- PASS:7048 If 3 rows are selected in the following order?
--                 cname      tname       ctype
--                 =====      =====       =====     
-- PASS:7048 If  CND12549D   TEST12549    UNIQUE? 
-- PASS:7048 If  CND12549E   TEST12549    CHECK?
-- PASS:7048 If  CND12549F   TEST12549    CHECK?

   ROLLBACK WORK;

   DROP SCHEMA T12549PC CASCADE;
-- PASS:7048 If schema dropped successfully?

   COMMIT WORK;

   DROP SCHEMA DT12549PC CASCADE;
-- PASS:7048 If schema dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7048 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
