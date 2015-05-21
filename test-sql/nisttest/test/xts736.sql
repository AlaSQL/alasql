-- MODULE   XTS736

-- SQL Test Suite, V6.0, Interactive SQL, xts736.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7036 Update NCHAR Varying column with value from NCHAR domain!

   CREATE DOMAIN DOM1 AS NATIONAL CHARACTER VARYING(10)
         DEFAULT _VANGELIS 'KILLER';
-- PASS:7036 If domain created successfully?

   COMMIT WORK;

   CREATE DOMAIN DOM2 AS NATIONAL CHAR VARYING(12)
         DEFAULT _VANGELIS 'HELLAS';
-- PASS:7036 If domain created successfully?

   COMMIT WORK;

   CREATE DOMAIN DOM3 AS NCHAR VARYING(16)
         CHECK (VALUE IN (_VANGELIS 'NEW YORK', _VANGELIS 'ATHENS',
                          _VANGELIS 'ZANTE'));
-- PASS:7036 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE TAB736
         (COLK DECIMAL(4) PRIMARY KEY,
          COL1 DOM1,
          COL2 DOM2,
          COL3 DOM3);
-- PASS:7036 If table created successfully?

   COMMIT WORK;

   INSERT INTO TAB736 VALUES(1,DEFAULT,DEFAULT,N'ATHENS');
-- PASS:7036 If 1 row inserted successfully?

   INSERT INTO TAB736 VALUES(2,DEFAULT,DEFAULT,N'ZANTE');
-- PASS:7036 If 1 row inserted successfully?

   COMMIT WORK;

   UPDATE TAB736 
         SET COL1 = DEFAULT,
         COL2 = DEFAULT,
         COL3 = N'NEW YORK'
         WHERE COLK = 2;
-- PASS:7036 If 1 row updated successfully?

   SELECT COLK,COL1,COL2,COL3
         FROM TAB736 
         ORDER BY COLK DESC;
-- PASS:7036 If 2 rows selected in the following order?
--                 colk     col1     col2     col3 
--                 ====     ====     ====     ====
-- PASS:7036 If     2       KILLER   HELLAS   NEW YORK?
-- PASS:7036 If     1       KILLER   HELLAS   ATHENS  ?

   ROLLBACK WORK;

   DROP TABLE TAB736 CASCADE;
-- PASS:7036 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN DOM1 CASCADE;
-- PASS:7036 If domain dropped successfully?

   COMMIT WORK;

   DROP DOMAIN DOM2 CASCADE;
-- PASS:7036 If domain dropped successfully?

   COMMIT WORK;

   DROP DOMAIN DOM3 CASCADE;
-- PASS:7036 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7036 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
