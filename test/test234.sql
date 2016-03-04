CREATE TABLE people (
    FirstName STRING,
    LastName STRING,
    Gender STRING    
);
    
INSERT INTO people VALUES ("John","Johnson","M"),("John","Johnson","M"),("John","Johnson","M"),("John","Johnson","M"),("John","Johnson","M"),("John","Johnson","M");

INSERT INTO people VALUES ("Peter","Petersen","M"),
("Peter","Petersen","M"),
("Peter","Petersen","M"),
("Peter","Petersen","M");
    
INSERT INTO people VALUES ("Larry","Larrison","M"),("Larry","Larrison","M"),("Larry","Larrison","M"),("Larry","Larrison","M"),("Larry","Larrison","M"),("Larry","Larrison","M"),("Larry","Larison","M");

--DECLARE @M STRING = "M";

SELECT FirstName, LastName  
	FROM people 
	GROUP BY FirstName, LastName 
	HAVING SUM(CASE WHEN Gender = "M" THEN 1 ELSE 0 END) >= 5;