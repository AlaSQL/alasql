-- MODULE DML046

-- SQL Test Suite, V6.0, Interactive SQL, dml046.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0220 FIPS sizing -- 6 column in ORDER BY!
-- FIPS sizing TEST

-- setup
     INSERT INTO T12
            VALUES('1','22','4444','666666','88888884','1010101010',
               '2020...20','3030...30','4040...40','5050...50',11,12);
-- PASS:0220 If 1 row is inserted?

     INSERT INTO T12
            VALUES('1','22','4444','666666','88888883','1010101010',
                '2020...20','3030...30','4040...40','5050...50',22,24);
-- PASS:0220 If 1 row is inserted?

     INSERT INTO T12
            VALUES('1','22','4444','666666','88888882','0101010101',
                '2020...20','3030...30','4040...40','5050...50',33,36);
-- PASS:0220 If 1 row is inserted?

     INSERT INTO T12
            VALUES('1','22','4444','666666','88888881','0101010101',
                '2020...20','3030...30','4040...40','5050...50',44,48);
-- PASS:0220 If 1 row is inserted?

     SELECT COUNT(*)
                FROM  T12;
-- PASS:0220 If count = 4?

     SELECT COL5,COL6,COL11,COL3,COL4,COL7,COL8
          FROM T12
          ORDER BY COL7,COL8,COL3,COL4,COL6,COL5 DESC;
-- PASS:0220 If 4 rows are selected and first row?
-- PASS:0220 COL5 = 88888882, COL6 = 0101010101 and COL11 = 33?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0220 <<< END TEST
-- **************************************************************

-- TEST:0221 FIPS sizing -- 120 bytes in ORDER BY!
-- FIPS sizing TEST

-- setup
     INSERT INTO T12
     VALUES('1','22','4442','666666','88888888','1010101010',
     '20202020202020202020','303030303030303030303030303030',
     '4040404040404040404040404040404040404040', '5050...50',111,112);
-- PASS:0221 If 1 row is inserted?

     INSERT INTO T12
     VALUES('1','22','4443','666666','88888888','1010101010',
     '20202020202020202020','303030303030303030303030303030',
     '4040404040404040404040404040404040404040', '5050...50',222,224);
-- PASS:0221 If 1 row is inserted?

     INSERT INTO T12
     VALUES('1','22','4441','666666','88888888','1010101010',
     '20202020202020202020','303030303030303030303030303030',
     '4040404040404040404040404040404040404040', '5050...50',333,336);
-- PASS:0221 If 1 row is inserted?

     INSERT INTO T12
     VALUES('1','22','4444','666666','88888888','1010101010',
     '20202020202020202020','303030303030303030303030303030',
     '4040404040404040404040404040404040404040', '5050...50',444,448);
-- PASS:0221 If 1 row is inserted?

     SELECT COUNT(*)
                FROM  T12;
-- PASS:0221 If count = 4?

     SELECT COL3,COL11,COL9,COL8,COL7,COL5,COL4
          FROM T12
          ORDER BY COL9,COL8,COL7,COL5,COL4,COL3;
-- PASS:0221 If 4 rows are selected ?
-- PASS:0221 If first row COL3 = 4441 and COL11 = 333?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0221 <<< END TEST
-- *************************************************////END-OF-MODULE
