-- MODULE DML045

-- SQL Test Suite, V6.0, Interactive SQL, dml045.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0218 FIPS sizing -- 6 columns in GROUP BY!
-- FIPS sizing TEST

-- setup
     INSERT INTO T12
            VALUES('1','22','4444','666666','88888888','0101010101',
                '2020...20','3030...30','4040...40','5050...50',44,48);
-- PASS:0218 If 1 row is inserted?

     INSERT INTO T12
            VALUES('1','22','4444','666666','88888888','1010101010',
                '2020...20','3030...30','4040...40','5050...50',11,12);
-- PASS:0218 If 1 row is inserted?

     INSERT INTO T12
            VALUES('1','22','4444','666666','88888888','1010101010',
                '2020...20','3030...30','4040...40','5050...50',22,24);
-- PASS:0218 If 1 row is inserted?

     INSERT INTO T12
            VALUES('1','22','4444','666666','88888888','0101010101',
                '2020...20','3030...30','4040...40','5050...50',33,36);
-- PASS:0218 If 1 row is inserted?

     SELECT COUNT(*)
                FROM  T12;
-- PASS:0218 If count = 4?

     SELECT COL6,SUM(COL11),MAX(COL12)
          FROM T12
          GROUP BY COL1,COL5,COL3,COL6,COL2,COL4
          ORDER BY COL6 DESC;
-- PASS:0218 If 2 rows are selected and second COL6 = 0101010101 and ?
-- PASS:0218 second SUM(COL11) = 77 and second MAX(COL12) = 48?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0218 <<< END TEST
-- ****************************************************************

-- TEST:0219 FIPS sizing -- 120 bytes in GROUP BY!
-- FIPS sizing TEST

-- setup
    INSERT INTO T12
    VALUES('1','22','4444','666666','88888888','1010101010',
    '20202020202020202020','303030303030303030303030303030',
    '4040404040404040404040404040404040404040', '5050...50',111,112);
-- PASS:0219 If 1 row is inserted?

    INSERT INTO T12
    VALUES('1','22','4444','666666','88888889','1010101010',
    '20202020202020202020','303030303030303030303030303030',
    '4040404040404040404040404040404040404040', '5050...50',333,336);
-- PASS:0219 If 1 row is inserted?

    INSERT INTO T12
    VALUES('1','22','4444','666666','88888889','1010101010',
    '20202020202020202020','303030303030303030303030303030',
    '4040404040404040404040404040404040404040', '5050...50',444,448);
-- PASS:0219 If 1 row is inserted?

    INSERT INTO T12
    VALUES('1','22','4444','666666','88888888','1010101010',
    '20202020202020202020','303030303030303030303030303030',
    '4040404040404040404040404040404040404040', '5050...50',222,224);
-- PASS:0219 If 1 row is inserted?

     SELECT COUNT(*)
                FROM  T12;
-- PASS:0219 If count = 4?

     SELECT COL5,SUM(COL11),MAX(COL12)
          FROM T12
          GROUP BY COL9,COL5,COL7,COL4,COL3,COL8
          ORDER BY COL5 DESC;
-- PASS:0219 If 2 rows are selected ?
-- PASS:0219 If row #1 COL5=88888889, SUM(COL11)=777, MAX(COL12)=448?
-- PASS:0219 If row #2 COL5=88888888, SUM(COL11)=333, MAX(COL12)=224?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0219 <<< END TEST
-- *************************************************////END-OF-MODULE
