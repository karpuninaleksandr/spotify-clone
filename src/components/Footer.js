export default function Footer(props) {
    return (
        <footer className="footer">
                <div className="current_song_container">
                    {props.currentTrack ? 
                        (
                            <>
                                <img src={props.currentTrack.album.images[0].url} alt="track" width="40" height="40" />
                                <div className="current_song">
                                    <p>{props.currentTrack.name}</p>
                                    <p>{props.currentTrack.artists[0].name}</p>
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
                        {props.currentTrack ? 
                            (
                                <>
                                    <p>Release date: {props.currentTrack.album.release_date}</p>
                                    <p>Check this track on <a href={props.currentTrack.external_urls.spotify}>actual</a> Spotify</p>
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
    )
}