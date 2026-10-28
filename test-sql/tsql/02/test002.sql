DECLARE @Names TABLE (
  name VARCHAR(20)
);

INSERT INTO @Names VALUES
  ('DeSzmetch'),('DESZMETCH'),('DESZMETCK'),('DesZmetch'),('deszmetch');

SELECT
  name,
  RANK() OVER (ORDER BY name COLLATE Latin1_General_BIN) AS [Lat...BIN],
  RANK() OVER (ORDER BY name COLLATE Traditional_Spanish_CI_AS) AS [Tra...CI_AS],
  RANK() OVER (ORDER BY name COLLATE Latin1_General_CS_AS) AS [Lat...CS_AS],
  RANK() OVER (ORDER BY name COLLATE Latin1_General_CI_AS) AS [Lat...CI_AS],
  RANK() OVER (ORDER BY name COLLATE Hungarian_CI_AS) AS [Hun..._CI_AS]
FROM @Names
ORDER BY name COLLATE Latin1_General_BIN;
GO