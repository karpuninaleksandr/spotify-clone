import { useState, useEffect } from "react"
import API from "../utils/api"
import RowOfElements from "./RowOfElements"

export default function Content(props) {
    const[genres, setGenres] = useState()
    const[playlists, setPlaylists] = useState()
    const[tracks, setTracks] = useState()

    useEffect(() => {
        API.get_genres().then((genres) => setGenres(genres))
    }, [])
    return (
        <>
            <main className="content">
                <p className="section_name">Genres</p>
                <div className="genres_container">
                    <RowOfElements type = {"genre"} elements = {genres} updateData = {setPlaylists}/>
                </div>
                <p className="section_name">Albums</p>
                <div className="albums_container">
                    <RowOfElements type = {"album"} elements = {playlists} updateData = {setTracks}/>
                </div>
                <p className="section_name">Tracks</p>
                <div className="tracks_container">
                    <RowOfElements type = {"track"} elements = {tracks}  updateData = {props.updateCurrentTrack}/>
                </div>
            </main>
        </>
    )
}
