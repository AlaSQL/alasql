
SELECT VALUE COUNT(*) FROM (

	SELECT Artist.Name, Album.Title as AlbumTitle,
	    Track.Name as TrackName, Genre.Name,
	    Track.Composer, Track.UnitPrice
	FROM Album
	JOIN Artist
	    ON Album.ArtistId = Artist.ArtistId
	JOIN Track
	    ON Track.AlbumId = Album.AlbumId
	JOIN Genre
	    ON Genre.GenreId = Track.GenreId
);

ASSERT 3503;