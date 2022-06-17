import useDataHook from "./useDataHook"
import API from "../utils/api"

export default function Footer(props) {
    const [data, error] = useDataHook("track", props.currentTrack, API.get_track)
    if (error || !data) return (
        <footer className="footer">
            <div className="current_song_container">
                <img src="./logos/empty_song.jpg" alt="Song" width="40" height="40"/>
                <div className="current_song">
                    <p>Song name</p>
                    <p>Author</p>
                </div>
            </div>                 
            <div className="current_song_description">
                <div className="current_song">
                    <p>Release date</p>
                    <p>Spotify url</p>
                </div>
            </div>
        </footer>
    )
    return (
        <footer className="footer">
            <div className="current_song_container">
                <img src={data.album.images[0].url} alt="track" width="40" height="40" />
                <div className="current_song">
                    <p>{data.name}</p>
                    <p>{data.artists[0].name}</p>
                </div>
            </div>                 
            <div className="current_song_description">
                <div className="current_song">
                    <p>Release date: {data.album.release_date}</p>
                    <p>Check this track on <a href={data.external_urls.spotify}>actual</a> Spotify</p>
                </div>
            </div>
        </footer>
    )
}