-- MODULE  DML179  

-- SQL Test Suite, V6.0, Interactive SQL, dml179.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0892 FIPS sizing, rowlen >= 8000, statement var >= 4000!

   CREATE TABLE T0892 (
     INTKEY NUMERIC (3) PRIMARY KEY,
     NAAM VARCHAR (1000),
     ADDRESS VARCHAR (1000),
     KEYWORDS VARCHAR (1000),
     FUNCTION1 VARCHAR (1000),
     FUNCTION2 VARCHAR (1000),
     DESCRIPT1 VARCHAR (1000),
     DESCRIPT2 VARCHAR (1000),
     DESCRIPT3 VARCHAR (978));
-- PASS:0892 If table created successfully?

   COMMIT WORK;

   INSERT INTO T0892 (INTKEY, NAAM, ADDRESS, KEYWORDS, DESCRIPT3) 
              VALUES (0,
'John                                                               ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                            Smith',  
'1313 Osprey Alley                                                  ' ||
'                                                                    ' ||
'                                                                    ' ||
'Box 35B Sector 28 Quadrant 3                                        ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'Rural Route 29837-39234234324-XRZ                                   ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'Beverly Hills, CA                                                   ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                            90210',  
'aardvark osprey          metrology                                 ' ||
'                                                                    ' ||
'                                                                    ' ||
'synthetic             SQL RDA PDP                                   ' ||
'                                                                    ' ||
'          antelope gnu yak bison quadruped cattle                   ' ||
'                                                                    ' ||
'           CORBA IDL       Amsterdam                                ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'production  crystal growth                                          ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                          gravity',  
'filler filler filler blah blah blah                                ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                    ' ||
'                                                                 ' ||
'this is going to be overwritten'); 
-- PASS:0892 If 1 row inserted successfully?

   UPDATE T0892
     SET FUNCTION1 =
'Harry works in the Redundancy Automation Division of the ' ||
'Materials ' ||
'Blasting Laboratory in the National Cattle Acceleration ' ||
'Project of ' ||
'lower Michigan.  His job is to document the trajectory of ' ||
'cattle and ' ||
'correlate the loft and acceleration versus the quality of ' ||
'materials ' ||
'used in the trebuchet.  He served ten years as the ' ||
'vice-president in ' ||
'charge of marketing in the now defunct milk trust of the ' ||
'Pennsylvania ' ||
'Coalition of All Things Bovine.  Prior to that he ' ||
'established himself ' ||
'as a world-class graffiti artist and source of all good ' ||
'bits related ' ||
'to channel dredging in poor weather.  He is author of over ' ||
'ten thousand ' ||
'paperback novels, including such titles as "How Many ' ||
'Pumpkins will Fit ' ||
'on the Head of a Pin," "A Whole Bunch of Useless Things ' ||
'that you Don''t ' ||
'Want to Know," and "How to Lift Heavy Things Over your ' ||
'Head without ' ||
'Hurting Yourself or Dropping Them."  He attends ANSI and ' ||
'ISO standards ' ||
'meetings in his copious free time and funds the development ' ||
'of test ' ||
'suites with his pocket change.'
  WHERE INTKEY = 0;
-- PASS:0892 If update completed successfully?

   UPDATE T0892
     SET FUNCTION2 = FUNCTION1,
     DESCRIPT1 = FUNCTION1,
     DESCRIPT2 = FUNCTION1,
     DESCRIPT3 = SUBSTRING (FUNCTION1 FROM 1 FOR 978);
-- PASS:0892 If update completed successfully?

   SELECT CHAR_LENGTH (NAAM) +
                CHAR_LENGTH (ADDRESS) +
                CHAR_LENGTH (KEYWORDS) +
                CHAR_LENGTH (FUNCTION1) +
                CHAR_LENGTH (FUNCTION2) +
                CHAR_LENGTH (DESCRIPT1) +
                CHAR_LENGTH (DESCRIPT2) +
                CHAR_LENGTH (DESCRIPT3) + 22
     FROM T0892
     WHERE INTKEY = 0;
-- PASS:0892 If CHAR_LENGTH = 8000?

   COMMIT WORK;

   DROP TABLE T0892 CASCADE;
-- PASS:0892 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0892 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
