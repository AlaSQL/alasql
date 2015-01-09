
SELECT VALUE COUNT(*) FROM (
	SELECT * from Album
	JOIN Track
	    ON Track.AlbumId = Album.AlbumId
	WHERE Track.Composer IS null;
);
ASSERT 1;
