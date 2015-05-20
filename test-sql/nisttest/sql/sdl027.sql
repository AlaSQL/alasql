-- MODULE SDL027

-- SQL Test Suite, V6.0, Interactive SQL, sdl027.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- setup

    DELETE FROM TEMP_OBSERV;
    INSERT INTO TEMP_OBSERV VALUES (1984, 'Sun City', 110, 44);
    INSERT INTO TEMP_OBSERV VALUES (1984, 'Iceburg', 45, -90);
    INSERT INTO TEMP_OBSERV VALUES (1984, 'Abeland', 101, 10);
    INSERT INTO TEMP_OBSERV VALUES (1985, 'Sun City', 105, 50);
    INSERT INTO TEMP_OBSERV VALUES (1985, 'Iceburg', 47, -82);
    INSERT INTO TEMP_OBSERV VALUES (1985, 'Abeland', 98, -3);

-- TEST:0391 Correlation names used in self-join of view!

     SELECT X.CITY, X.MAX_C, Y.MAX_C,
           (X.MAX_C + Y.MAX_C) / 2
           FROM CELSIUS_OBSERV X, CELSIUS_OBSERV Y
           WHERE X.YEAR_OBSERV = 1984 AND
                Y.YEAR_OBSERV = 1985 AND
                X.CITY = Y.CITY
                ORDER BY 4 DESC;

-- PASS:0391 If for the first row X.CITY = 'Sun City',?
-- PASS:0391 X.MAX_C is between 43.31 and 43.35,?
-- PASS:0391 Y.MAX_C is between 40.54 and 40.57?
-- PASS:0391 and (X.MAX_C + Y.MAX_C) /2 is between 41.93 and 41.96?

-- END TEST >>> 0391 <<< END TEST
-- *************************************************************

-- TEST:0401 VIEW with computed columns!

    SELECT CITY, YEAR_OBSERV, MIN_C, MAX_C
          FROM CELSIUS_OBSERV
          WHERE YEAR_OBSERV = 1984 AND MIN_C > 5;

-- PASS:0401 If CITY = 'Sun City' and YEAR_OBSERV = 1984?
-- PASS:0401 If MIN_C is between 6.65 and 6.68?
-- PASS:0401 If MAX_C is between 43.31 and 43.35?

    SELECT CITY, HIGH, LOW 
          FROM MULTI_YEAR_OBSERV
          ORDER BY CITY ASC;

-- PASS:0401 If for the first row HIGH is between 99.3 and 99.7?
-- PASS:0401 and LOW is between 3.3 and 3.7?

   SELECT HIGH, YEAR_OBSERV, LOW 
              FROM EXTREME_TEMPS
              ORDER BY YEAR_OBSERV DESC;

-- PASS:0401 If for the first row HIGH = 105 and LOW = -82?

-- END TEST >>> 0401 <<< END TEST
-- *************************************************////END-OF-MODULE
