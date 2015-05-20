-- MODULE  XTS700  

-- SQL Test Suite, V6.0, Interactive SQL, xts700.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7001 NULLIF producing NULL!

   INSERT INTO STAFFb VALUES(10000,'Kilroy',10000,'P4','Athens','M');
-- PASS:7001 If 1 row is inserted successfully?

   INSERT INTO STAFFb VALUES(15000,'Nickos',20000,'P6','Nickos','M');
-- PASS:7001 If 1 row is inserted successfully?

   INSERT INTO STAFFb VALUES(NULL,'Nickos',NULL,'P5','Rhodes','M');
-- PASS:7001 If 1 row is inserted successfully?

   INSERT INTO STAFFb VALUES(10010,'George',NULL,'P7','Georgia','M');
-- PASS:7001 If 1 row is inserted successfully?

   INSERT INTO STAFFb VALUES(10005,NULL,30000,'P8',NULL,'M');
-- PASS:7001 If 1 row is inserted successfully?

   INSERT INTO STAFFb VALUES(10001,'Gregory',12000,'P9',NULL,'M');
-- PASS:7001 If 1 row is inserted successfully?

   SELECT SALARY, EMPNAME, HOURS, CITY
         FROM CTS1.STAFFb
         WHERE NULLIF(SALARY,HOURS) IS NULL
         ORDER BY EMPNAME;
-- PASS:7001 If 2 rows are selected with the following order?
--             SALARY  EMPNAME  HOURS  CITY
--             ======  =======  =====  ====
-- PASS:7001   10000   Kilroy   10000  Athens?
-- PASS:7001   NULL    Nickos   NULL   Rhodes?

   SELECT SALARY,PNUM,HOURS,NULLIF(EMPNAME,CITY)
         FROM CTS1.STAFFb
         WHERE EMPNAME = CITY OR EMPNAME IS NULL 
         ORDER BY PNUM;
-- PASS:7001 If 2 rows are selected with the following order?
--             SALARY   PNUM   HOURS  NULLIF(EMPNAME,CITY)
--             ======   ====   =====  ==================== 
-- PASS:7001   15000    P6     20000  NULL?
-- PASS:7001   10005    P8     30000  NULL?

   SELECT SUM(NULLIF(NULLIF(SALARY,10000),20000))
         FROM STAFFb;
-- PASS:7001 If SUM = 195016? 

   ROLLBACK WORK;

-- END TEST >>> 7001 <<< END TEST
-- ******************************************
-- *************************************************////END-OF-MODULE
