-- http://gdichicago.com/classes/intro-databases/class4.html#/8

SELECT VALUE COUNT(*) FROM 

(SELECT Album.AlbumId, Album.Title as AlbumTitle,
    Artist.Name as ArtistName
FROM Album
JOIN Artist
    ON Album.ArtistId = Artist.ArtistId);

ASSERT 347;