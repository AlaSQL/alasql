
SELECT sum(UnitPrice) from Track;
ASSERT 3680.969999999704;

SELECT avg(UnitPrice) as 'Average Price' FROM Track;
ASSERT 1.0508050242648312;

SELECT count(DISTINCT GenreId) from Track;
ASSERT 25;

SELECT count(DISTINCT ArtistId) from Album;
ASSERT 204;