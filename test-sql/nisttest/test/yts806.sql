-- MODULE  YTS806  

-- SQL Test Suite, V6.0, Interactive SQL, yts806.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7563 NATURAL FULL OUTER JOIN <table reference> - dynamic!

   DELETE FROM CTS1.STAFF1;

   DELETE FROM CTS1.STAFFa;

   INSERT INTO CTS1.STAFF1 VALUES
     ('E1','Alice',4,'Lyon');
   INSERT INTO CTS1.STAFF1 VALUES
     ('E1','Alice',8,'Lyon');
   INSERT INTO CTS1.STAFF1 VALUES
     ('E1','Alice',12,'Geneva');
   INSERT INTO CTS1.STAFF1 VALUES
     ('E2','Betty',16,'Strasbourg');
   INSERT INTO CTS1.STAFF1 VALUES
     ('E2','Betty',20,'Munich');
   INSERT INTO CTS1.STAFF1 VALUES
     ('E3','Colin',24,'Leuven');
   INSERT INTO CTS1.STAFF1 VALUES
     ('E4','Daniel',28,'Cologne');
   INSERT INTO CTS1.STAFFa VALUES
     (20,40000,'E1',11,'Alice');
   INSERT INTO CTS1.STAFFa VALUES
     (15,20000,'E2',12,'Betty');
   INSERT INTO CTS1.STAFFa VALUES
     (15,20000,'E2',13,'Betty');
   INSERT INTO CTS1.STAFFa VALUES
     (10,15000,'E3',14,'Colin');
   INSERT INTO CTS1.STAFFa VALUES
     (10,8000,'E3',15,'Colin');
   INSERT INTO CTS1.STAFFa VALUES
     (10,8000,'E3',16,'Colin');
   INSERT INTO CTS1.STAFFa VALUES
     (30,50000,'E5',17,'Edward');
-- PASS:7563 If 14 rows inserted successfully from previous 14 inserts?

   SELECT * FROM STAFF1 NATURAL FULL OUTER JOIN
     STAFFA ORDER BY EMPNUM, EMPNAME, GRADE, PNUM;
-- PASS:7563 If 12 rows selected in the following order?
--               eno  enaam  grd  cit         hrs   sal     pno
--               ===  =====  ===  ===         ===   ===     ===
-- PASS:7563 If  E1   Alice  4    Lyon        20    40000   11  ?
-- PASS:7563 If  E1   Alice  8    Lyon        20    40000   11  ?
-- PASS:7563 If  E1   Alice  12   Geneva      20    40000   11  ?
-- PASS:7563 If  E2   Betty  16   Strasbourg  15    20000   12  ? 
-- PASS:7563 If  E2   Betty  16   Strasbourg  15    20000   13  ?
-- PASS:7563 If  E2   Betty  20   Munich      15    20000   12  ?
-- PASS:7563 If  E2   Betty  20   Munich      15    20000   13  ?
-- PASS:7563 If  E3   Colin  24   Leuven      10    15000   14  ?
-- PASS:7563 If  E3   Colin  24   Leuven      10     8000   15  ?
-- PASS:7563 If  E3   Colin  24   Leuven      10     8000   16  ?
-- PASS:7563 If  E4   Daniel 28   Cologne     NULL   NULL   NULL?
-- PASS:7563 If  E5   Edward NULL NULL        30    50000   17  ?   

   ROLLBACK WORK;

-- END TEST >>> 7563 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
