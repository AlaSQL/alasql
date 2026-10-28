-- MODULE   XTS752

-- SQL Test Suite, V6.0, Interactive SQL, xts752.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7052 ALTER TABLE ADD TABLE CONSTRAINT!

   CREATE TABLE TAB752a
         (COL1 NUMERIC(5),
          COL2 CHAR(15) NOT NULL UNIQUE,
          COL3 CHAR(15));
-- PASS:7052 If table created successfully?

   COMMIT WORK;

   CREATE TABLE TAB752b
         (C1 NUMERIC(5) PRIMARY KEY,
          C2 CHAR(15),
          C3 CHAR(15));
-- PASS:7052 If table created successfully?

   COMMIT WORK;

   ALTER TABLE CTS1.TAB752a 
         ADD CONSTRAINT TA752a_PRKEY PRIMARY KEY(COL1);
-- PASS:7052 If table altered successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
         WHERE TABLE_SCHEMA = 'CTS1' AND TABLE_NAME = 'TA752A'
         AND CONSTRAINT_NAME = 'TA752A_PRKEY' AND COLUMN_NAME = 'COL1';
-- PASS:7052 If COUNT = 1?

   COMMIT WORK;

   ALTER TABLE TAB752b
      ADD CONSTRAINT TA752b_FKEY FOREIGN KEY(C2) 
      REFERENCES TAB752a(COL2);
-- PASS:7052 If table altered successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
       WHERE TABLE_SCHEMA = 'CTS1'
       AND TABLE_NAME = 'TAB752B' 
       AND CONSTRAINT_NAME = 'TA752B_FKEY' 
       AND COLUMN_NAME = 'C2';
-- PASS:7052 If COUNT = 1?

   COMMIT WORK;

   ALTER TABLE TAB752a
     ADD CONSTRAINT COL3_CHECK CHECK 
     (COL3 IN ('ATHENS','CORFU','PYLOS'));
-- PASS:7052 If table altered successfully?

   COMMIT WORK;

   INSERT INTO TAB752a VALUES(1000,'KILLER','PAROS');
-- PASS:7052 If ERROR - integrity constraint violation?

   ROLLBACK WORK;

   DROP TABLE TAB752a CASCADE;
-- PASS:7052 If table dropped successfully?

   COMMIT WORK;

   DROP TABLE TAB752b CASCADE;
-- PASS:7052 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7052 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
