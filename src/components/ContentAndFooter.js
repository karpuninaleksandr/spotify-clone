import { useState, useEffect } from "react"
import API from "../utils/api"

export default function ContentAndFooter() {
    const[genres, setGenres] = useState()
    const[playlists, setPlaylists] = useState()
    const[tracks, setTracks] = useState()
    const[track, setTrack] = useState()

    function getErrorMessage() {
        return <>
            <p className="empty_alert">Unfortunately, there was a problem with Spotify data :(</p>
            <p className="empty_alert">Please, try reloading page or checking another genre or album</p>
        </>
    }

    function connectButton(elementType, elementId) {
        switch(elementType) {
            case "genre": 
                API.get_playlists(elementId).then(playlists => setPlaylists(playlists))
                return
            case "album": 
                API.get_tracks(elementId).then(tracks => setTracks(tracks))
                return
            case "track": 
                API.get_track(elementId).then(track => setTrack(track))
                return
        }
    }

    function getElementOfRow(elementType, elementId, elementImg, elementName, artist) {
        return <button className={elementType} key={elementId} onClick={
                () => connectButton(elementType, elementId)  
            }>
            <img src={elementImg} alt={elementType} width="100" height="100" />
            <p>{elementName}</p>
            <p>{artist}</p>
        </button>
    }

    function getRow(elementType) {
        switch(elementType) {
            case "genre":
                return <>
                    {genres ? genres.map(genre => getElementOfRow("genre", genre.id, genre.icons[0].url, genre.name, null))
                        : getErrorMessage()
                    }
                </>
            case "album": 
                return <>
                    {playlists ? playlists.map(playlist => getElementOfRow("album", playlist.id, playlist.images[0].url, playlist.name, null)) 
                        : getErrorMessage()
                    }
                </>
            case "track": 
                return <>
                    {tracks ? tracks.map(track => getElementOfRow("track", track.track.id, track.track.album.images[0].url, track.track.name, track.track.artists[0].name))
                        : getErrorMessage()
                    }
                </>
        } 
    }

    useEffect(() => {
        API.get_genres().then((genres) => setGenres(genres))
    }, [])
    return (
        <>
            <main className="content">
                <p className="section_name">Genres</p>
                <div className="genres_container">
                    {getRow("genre")}
                </div>
                <p className="section_name">Albums</p>
                <div className="albums_container">
                    {getRow("album")}
                </div>
                <p className="section_name">Tracks</p>
                <div className="tracks_container">
                    {getRow("track")}
                </div>
            </main>
            <footer className="footer">
                <div className="current_song_container">
                    {track ? 
                        (
                            <>
                                <img src={track.album.images[0].url} alt="track" width="40" height="40" />
                                <div className="current_song">
                                    <p>{track.name}</p>
                                    <p>{track.artists[0].name}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <img src="./logos/empty_song.jpg" alt="Song" width="40" height="40"/>
                                <div className="current_song">
                                    <p>Song name</p>
                                    <p>Author</p>
                                </div>
                            </>
                        )
                    }
                </div>                 
                <div className="current_song_description">
                    <div className="current_song">
                        {track ? 
                            (
                                <>
                                    <p>Release date: {track.album.release_date}</p>
                                    <p>Check this track on <a href={track.external_urls.spotify}>actual</a> Spotify</p>
                                </>
                            ) : (
                                <>
                                    <p>Release date</p>
                                    <p>Spotify url</p>
                                </>
                            ) 
                        }
                    </div>
                </div>
            </footer>
        </>
    )
}
