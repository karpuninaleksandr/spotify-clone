import { useState } from "react"
import RowOfGenres from "./RowOfGenres"
import RowOfPlaylists from "./RowOfPlaylists"
import RowOfTracks from "./RowOfTracks"
import API from "../utils/api"
import useDataHook from "./useDataHook"

export default function Content(props) {
    const[genre, setGenre] = useState()
    const[playlist, setPlaylist] = useState()

    const [dataGenres, errorGenres] = useDataHook("genres", "get_genres", API.get_genres)
    const [dataPlaylists, errorPlaylists] = useDataHook("playlists", genre, API.get_playlists)
    const [dataTracks, errorTracks] = useDataHook("tracks", playlist, API.get_tracks)

    return <>
        <main className="content">
            <p className="section_name">Genres</p>
            <div className="genres_container">
                <RowOfGenres data={dataGenres} error={errorGenres} updateData = {setGenre}/>
            </div>
            <p className="section_name">Albums</p>
            <div className="albums_container">
                <RowOfPlaylists data={dataPlaylists} error={errorPlaylists} updateData = {setPlaylist}/>
            </div>
            <p className="section_name">Tracks</p>
            <div className="tracks_container">
                <RowOfTracks data={dataTracks} error={errorTracks} updateData = {props.updateCurrentTrack} />
            </div>
        </main>
    </>
}
