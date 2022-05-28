import { useState, useEffect } from "react"
import API from "../utils/api"
  

export default function ContentAndFooter() {
    const[genres, setGenres] = useState([])
    const[playlists, setPlaylists] = useState([])
    const[tracks, setTracks] = useState([])
    const[track, setTrack] = useState()

    useEffect(() => {
        API.get_token()
        API.get_genres().then((genres) => {
            setGenres(genres)
        })
    }, [])
    return (
        <><main className="content">
            <p className="section_name">Genres</p>
            <div className="genres_container">
                {genres.length ? (genres.map((genre) => (<button className="genre" key={genre.id} onClick={(e) => 
                    API.get_playlists(genre.id).then((playlists) => {
                        setPlaylists(playlists)
                    })
                }>
                    <img src={genre.icons[0].url} alt="genre" width="100" height="100" />
                    <p>{genre.name}</p>
                    </button>))) : (<><p className="empty_alert">Unfortunately, there was a problem connecting to API :(</p><p className="empty_alert">Please, try reloading page</p></>)
                }
            </div>
            <p className="section_name">Albums</p>
            <div className="albums_container">
                {playlists.length ? (playlists.map((playlist) => (<button className="album" key={playlist.id} onClick={(e) => 
                    API.get_tracks(playlist.id).then((tracks) => {
                        setTracks(tracks)
                    })
                }>
                    <img src={playlist.images[0].url} alt="album" width="100" height="100"/>
                    <p>{playlist.name}</p>
                    </button>))) : (<><p className="empty_alert">Unfortunately, no albums were found for this genre :(</p><p className="empty_alert">Please, try checking other genres</p></>)
                }
            </div>
            <p className="section_name">Tracks</p>
            <div className="tracks_container">
                {tracks.length ? (tracks.map((track) => (<button className="track" key={track.track.id} onClick={(e) =>
                    API.get_track(track.track.id).then((track) => {
                        setTrack(track)
                    })
                }>
                    <img src={track.track.album.images[0].url} alt="track" width="100" height="100" />
                    <p>{track.track.name}</p>
                    <p>{track.track.artists[0].name}</p>
                </button>))) : (<><p className="empty_alert">Unfortunately, no tracks were found for this album :(</p><p className="empty_alert">Please, try checking other albums</p></>)}
            </div>
        </main>
        <footer className="footer">
            <div className="current_song_container">
                {track ? (<>
                    <img src={track.album.images[0].url} alt="track" width="40" height="40" />
                        <div className="current_song">
                            <p>{track.name}</p>
                            <p>{track.artists[0].name}</p>
                        </div>
                    </>) : (<><img src="./logos/empty_song.jpg" alt="Song" width="40" height="40"/>
                                <div className="current_song">
                                    <p>Song name</p>
                                    <p>Author</p>
                                </div></>)
                }
            </div>                 
            <div className="current_song_description">
                <div className="current_song">
                    {track ? (<><p>Release date: {track.album.release_date}</p><p>Check this track on <a href={track.external_urls.spotify}>actual</a> Spotify</p></>) 
                    : (<><p>Release date</p>
                    <p>Spotify url</p></>) }
                </div>
            </div>
        </footer></>
    )
}
