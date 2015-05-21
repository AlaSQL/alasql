-- MODULE   XTS798

-- SQL Test Suite, V6.0, Interactive SQL, xts798.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7002 NULLIF producing non-NULL!

   INSERT INTO STAFFb VALUES(10000,'Kilroy',10000,'P4','Athens','M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(15000,'Nickos',20000,'P6','Nickos','M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(NULL,'Nickos',NULL,'P5','Rhodes','M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(10010,'George',NULL,'P7','Georgia','M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(10005,NULL,30000,'P8',NULL,'M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(10001,'Gregory',12000,'P9',NULL,'M');
-- PASS:7002 If 1 row inserted?

   SELECT EMPNAME, NULLIF (SALARY,HOURS)
         FROM CTS1.STAFFb
         WHERE SEX = 'M' AND PNUM NOT IN ('P1','P2','P3','P6','P8')
         AND (SALARY <> HOURS OR SALARY IS NULL OR HOURS IS NULL)
         ORDER BY PNUM;
-- PASS:7002 If 3 rows selected in the following order?
--                EMPNAME          SALARY
--                =======          ======
-- PASS:7002 If   Nickos           NULL   ?
-- PASS:7002 If   George           10010  ?
-- PASS:7002 If   Gregory          10001  ?

   SELECT NULLIF (EMPNAME,CITY), SALARY
         FROM CTS1.STAFFb
         WHERE SEX = 'M' AND PNUM NOT IN ('P1','P2','P3','P5','P7')
         AND (EMPNAME <> CITY OR EMPNAME IS NULL OR CITY IS NULL)
         ORDER BY PNUM;
-- PASS:7002 If 3 row selected in the following order?
--                EMPNAME           SALARY
--                =======           ======
-- PASS:7002 If   Kilroy            10000  ?
-- PASS:7002 If   NULL              10005  ?
-- PASS:7002 If   Gregory           10001  ?

   ROLLBACK WORK;

   CREATE TABLE TEMP1426 
         (SALARY DECIMAL(6),
          EMPNAME CHAR(20));
-- PASS:7002 If table created successfully?

   COMMIT WORK;

   INSERT INTO STAFFb VALUES(10000,'Kilroy',10000,'P4','Athens','M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(15000,'Nickos',20000,'P6','Nickos','M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(NULL,'Nickos',NULL,'P5','Rhodes','M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(10010,'George',NULL,'P7','Georgia','M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(10005,NULL,30000,'P8',NULL,'M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO STAFFb VALUES(10001,'Gregory',12000,'P9',NULL,'M');
-- PASS:7002 If 1 row inserted?

   INSERT INTO TEMP1426
         SELECT NULLIF (10000,SALARY), EMPNAME FROM STAFFb
         WHERE 
         SEX = 'M' AND PNUM NOT IN ('P1','P2','P3','P6','P8','P9');
-- PASS:7002 If 1 row inserted?

   SELECT * FROM CTS1.TEMP1426
         ORDER BY EMPNAME;
-- PASS:7002 If 3 rows selected in the following order?
--                  EMPNAME        SALARY
--                  =======        ======
-- PASS:7002 If     George         10000  ?
-- PASS:7002 If     Kilroy         NULL   ?
-- PASS:7002 If     Nickos         10000  ?

   ROLLBACK WORK;

   DROP TABLE TEMP1426 CASCADE;
-- PASS:7002 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7002 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
