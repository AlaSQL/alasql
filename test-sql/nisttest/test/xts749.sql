-- MODULE   XTS749

-- SQL Test Suite, V6.0, Interactive SQL, xts749.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7049 Named table constraint in table definition!

   CREATE TABLE TEST12649
         (TNUM1 NUMERIC(5),
          TNUM2 NUMERIC(5),
          TCHAR CHAR(3),
          CONSTRAINT CND12649A PRIMARY KEY(TNUM1, TNUM2),
          CONSTRAINT CND12649B CHECK(TNUM2 > 0),
          CONSTRAINT CND12649C FOREIGN KEY(TCHAR) 
          REFERENCES STAFF(EMPNUM));
-- PASS:7049 If table created successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
         WHERE CONSTRAINT_SCHEMA = 'CTS1' AND TABLE_SCHEMA = 'CTS1'
         AND TABLE_NAME = 'TEST12649';
-- PASS:7049 If COUNT = 3?

   SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE
         FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
         WHERE CONSTRAINT_SCHEMA = 'CTS1' AND TABLE_SCHEMA = 'CTS1'
         ORDER BY CONSTRAINT_NAME;
-- PASS:7049 If 3 rows selected in the following order?
--                 cname          ctype 
--                 =====          =====
-- PASS:7049 If  CND12549A     PRIMARY KEY?
-- PASS:7049 If  CND12549B     CHECK?
-- PASS:7049 If  CND12549C     FOREIGN KEY?

   COMMIT WORK;

   DROP TABLE TEST12649 CASCADE;
-- PASS:7049 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7049 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
