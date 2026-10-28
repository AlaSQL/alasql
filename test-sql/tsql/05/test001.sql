---------------------------------------------------------------------
-- Inside Microsoft SQL Server 2008: T-SQL Querying (MSPress, 2009)
-- Chapter 05 - Algorithms and Complexity
-- Copyright Steve Kass, 2009
-- All Rights Reserved
---------------------------------------------------------------------

---------------------------------------------------------------------
-- How Algorithms Scale
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Comparing Complexities
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Sorting a Million Numbers
---------------------------------------------------------------------

USE InsideTSQL2008;
GO

SELECT n
FROM dbo.Nums
ORDER BY REVERSE(n);


---------------------------------------------------------------------
-- A Practical Application
---------------------------------------------------------------------

---------------------------------------------------------------------
-- Problem in T-SQL
---------------------------------------------------------------------

-- Listing 5-1 Creating and Population the Locations and Readings Tables
USE tempdb;
GO

IF OBJECT_ID('dbo.Locations') IS NOT NULL
  DROP TABLE dbo.Locations;
CREATE TABLE dbo.Locations (
  ID INT NOT NULL PRIMARY KEY,
  name VARCHAR(12) NOT NULL
);

INSERT INTO dbo.Locations VALUES (1, 'Uptown'), (2, 'Midtown');

IF OBJECT_ID('dbo.Readings') IS NOT NULL
  DROP TABLE dbo.Readings;
CREATE TABLE dbo.Readings (
  locID INT REFERENCES dbo.Locations(ID),
  readingNum INT,
  ppb DECIMAL(6,3),
  PRIMARY KEY (locID,readingNum)
);

INSERT INTO dbo.Readings VALUES
  (1,1,3.968), (1,2,3.773), (1,3,3.994), (1,4,3.889),
  (1,5,4.015), (1,6,4.002), (1,7,4.043), (1,8,3.932),
  (1,9,4.072), (1,10,4.088), (1,11,3.952), (1,12,3.992),
  (1,13,3.980), (1,14,4.062), (1,15,4.074), (2,1,3.894),
  (2,2,4.184), (2,3,3.939), (2,4,4.050), (2,5,3.940),
  (2,6,4.140), (2,7,3.914), (2,8,4.156), (2,9,4.143),
  (2,10,4.035), (2,11,4.097), (2,12,4.086), (2,13,4.093),
  (2,14,3.932), (2,15,4.046);
GO

-- Listing 5-2 Code to Create the User-Defined Function LISL

IF OBJECT_ID('dbo.LISL') IS NOT NULL
  DROP FUNCTION dbo.LISL;
GO

CREATE FUNCTION dbo.LISL(@locID INT)
RETURNS INT AS BEGIN

  DECLARE @Solitaire TABLE (
    pos int IDENTITY(1,1) PRIMARY KEY,
    ppb decimal(6,3),
    UNIQUE (ppb,pos)
  );

  DECLARE C CURSOR FAST_FORWARD
  FOR
    SELECT ppb
    FROM dbo.Readings
    WHERE locID = @locID
    ORDER BY readingNum;

  DECLARE @ppb decimal(6,3);

  OPEN C;
  FETCH NEXT FROM C INTO @ppb;
  IF @@fetch_status <> 0 RETURN 0;

  INSERT INTO @Solitaire VALUES (@ppb);
  WHILE @@fetch_status = 0 BEGIN

    WITH T(pos) AS (
      SELECT MIN(pos)
      FROM @Solitaire
      WHERE ppb >= @ppb
    )
    MERGE  INTO @Solitaire AS S
    USING T
    ON T.pos = S.pos
    WHEN MATCHED THEN
      UPDATE SET ppb = @ppb
    WHEN NOT MATCHED BY TARGET THEN
      INSERT (ppb) VALUES (@ppb);

    FETCH NEXT FROM C INTO @ppb;

  END;
  CLOSE C;
  DEALLOCATE C;

  RETURN (SELECT COUNT(*) FROM @Solitaire);
END;
GO

-- Listing 5-3 Query to Find the Longest Increasing Subsequence Length
SELECT
  name, dbo.LISL(ID) AS LISL
FROM dbo.Locations;

