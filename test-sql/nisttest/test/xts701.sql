-- MODULE   XTS701

-- SQL Test Suite, V6.0, Interactive SQL, xts701.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7004 Compound char. literal in <comparison predicate>!

   INSERT INTO T4
      VALUES
      ('This is the first compound character literal.',1,NULL,NULL);
-- PASS:7004 If 1 row inserted successfully?

   INSERT INTO T4
         VALUES('Second character literal.',2,NULL,NULL);
-- PASS:7004 If 1 row inserted successfully?

   INSERT INTO T4
         VALUES('Third character literal.',3,NULL,NULL);
-- PASS:7004 If 1 row inserted successfully?

   SELECT NUM6
         FROM   T4
         WHERE  STR110 = 'This is the compound '
         'character literal.';
-- PASS:7004 If 0 rows selected - no data condition?

   SELECT COUNT(*)
         FROM   T4
         WHERE  STR110 <> 'This is the first compound '
         'character literal.';
-- PASS:7004 If COUNT = 2?

   SELECT NUM6
         FROM   T4
         WHERE  NUM6 = 2 AND 
         STR110 <= 'Second character '--Comments here
         'literal.';
-- PASS:7004 If NUM6 = 2?

   SELECT NUM6
         FROM   T4
         WHERE  STR110 = 'Third character literal.'--Comments here
         'second fragment'
         'third fragment.';
-- PASS:7004 If 0 rows selected - no data condition?

   SELECT NUM6
         FROM   T4
         WHERE  STR110 = 'First fragment'
         'another fragment'--Comments    
         'Second character literal.'--Comments here
         'fourth fragment.';
-- PASS:7004 If 0 rows selected - no data condition?

   SELECT NUM6
         FROM   T4
         WHERE  STR110 <= 'Second '    
         'chara'--Comments    
         'cter liter'--Comments here
         'al.'
         '     ';
-- PASS:7004 If NUM6 = 2?

   SELECT COUNT(*)
         FROM   T4
         WHERE  STR110 < 'An indifferent'--Comments
         ' charac'    
         'ter literal.';
-- PASS:7004 If sum of this COUNT and the next COUNT = 3?

   SELECT COUNT(*)
         FROM   T4
         WHERE  STR110 >= 'An indifferent'--Comments
         ' charac'     
         'ter literal.';
-- PASS:7004 If sum of this COUNT and the previous COUNT = 3?

   SELECT NUM6
         FROM   T4
         WHERE  STR110 = 'Second '    
         'chara'--Comments    
         'cter liter'--Comments here
         'al.'
         '     '--Comments
         '      ';
-- PASS:7004 If NUM6 = 2?

   SELECT NUM6
         FROM   T4
         WHERE  NUM6 = 2 AND STR110 < 'Second '    
         'chara'--Comments    
         'cter literal.';
-- PASS:7004 If 0 rows selected - no data condition?

   ROLLBACK WORK;

-- END TEST >>> 7004 <<< END TEST
-- *********************************************

-- TEST:7005 Compound character literal as inserted value!

   INSERT INTO T4
     VALUES
('This is the first fragment of a compound character literal,'--Comments
       ' and this is the second part.',11,NULL,'Compound '  
          
      --Comments   
                 
       'literal.');
-- PASS:7005 If 1 row inserted successfully?

   INSERT INTO T4
         VALUES('This is a comp'
         'ound character literal,'       
         ' in the second table row.',12,NULL,NULL);
-- PASS:7005 If 1 row inserted successfully?

   INSERT INTO T4
         VALUES('This is '
         'a comp'      
         'ound '
         'char'
         'acter lit'-- Comments
         'eral, ' 
     -- Comments        
           
         'in the th'
         'ird '
         'table '
         'row.',13,NULL,NULL);
-- PASS:7005 If 1 row inserted successfully?

   SELECT STR110, COL4 FROM T4 WHERE NUM6 = 11;
-- PASS:7005 If STR110 = 'This is the first fragment of a compound
--                character literal, and this is the second part.'?
-- PASS:7005 If COL4 = 'Compound literal.'?

   SELECT STR110 FROM T4 WHERE  NUM6 = 12;
-- PASS:7005 If STR110 = 'This is a compound character literal, in
--                        the second table row.'?

   SELECT STR110
         FROM   T4
         WHERE  NUM6 = 13;
-- PASS:7005 If STR110 = 'This is a compound character literal, in 
--                        the third table row.'?

   ROLLBACK WORK;

-- END TEST >>> 7005 <<< END TEST
-- *********************************************

-- TEST:7006 Compound character literal in a <select list>!

   SELECT 'First fragment of a compound character literal, '
 --Comment1   
     
     
 --Comment2
     'and second part.',
'This is the first fragment of a compound character literal,'--...
     ' this is the second,'
     

     ' and this is the third part.'
              FROM   CTS1.ECCO;
-- PASS:7006 If 1st value = 'First fragment of a compound character 
--                           literal, and second part.'?
-- PASS:7006 If 2nd value = 'This is the first fragment of a compound 
--                         character literal, this is the second, and
--                         this is the third part.'?

   ROLLBACK WORK;

-- END TEST >>> 7006 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
