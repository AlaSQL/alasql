-- MODULE   XTS756

-- SQL Test Suite, V6.0, Interactive SQL, xts756.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7056 ALTER TABLE DROP COLUMN CASCADE!

   CREATE DOMAIN CHARDOMAIN AS CHAR (15)
         CONSTRAINT cons_strdom CHECK 
         (VALUE IN ('ATHENS','CORFU','RHODES'));
-- PASS:7056 If domain created successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.DOMAINS
         WHERE DOMAIN_SCHEMA = 'CTS1' AND DOMAIN_NAME = 'CHARDOMAIN';
-- PASS:7056 If COUNT = 1?

   COMMIT WORK;

   CREATE TABLE TAB756a
         (T756a_COL1  NUMERIC(3) PRIMARY KEY,
          DNAME      CHAR(15),
          LOC        CHARDOMAIN UNIQUE);
-- PASS:7056 If table created successfully?

   COMMIT WORK;

   CREATE TABLE TAB756b
         (T756b_COL_1    NUMERIC(5) PRIMARY KEY,
          ENAME         CHAR(15) NOT NULL,
          FOREIGN KEY(ENAME) REFERENCES TAB756a(LOC));
-- PASS:7056 If table created successfully?

   COMMIT WORK;

   CREATE VIEW V_756a
         AS SELECT LOC,DNAME FROM CTS1.TAB756a;
-- PASS:7056 If view created successfully?

   COMMIT WORK;

   CREATE VIEW V_756b
         AS SELECT LOC,T756a_COL1 FROM CTS1.TAB756a;
-- PASS:7056 If view created successfully?

   COMMIT WORK;

   ALTER TABLE TAB756a DROP COLUMN LOC CASCADE;
-- PASS:7056 If table altered successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'TAB756A'
         AND COLUMN_NAME = 'LOC';
-- PASS:7056 If COUNT = 0?

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.VIEWS
         WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'V_756A';
-- PASS:7056 If COUNT = 0?

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.VIEWS
         WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'V_756B';
-- PASS:7056 If COUNT = 0?

   ROLLBACK WORK;

   DROP TABLE TAB756a CASCADE;
-- PASS:7056 If table dropped successfully?

   COMMIT WORK;

   DROP TABLE TAB756b CASCADE;
-- PASS:7056 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN CHARDOMAIN CASCADE;
-- PASS:7056 If domain dropped usccessfully?

   COMMIT WORK;

-- END TEST >>> 7056 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
