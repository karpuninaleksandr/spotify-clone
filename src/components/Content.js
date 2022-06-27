import { useState } from "react"
import Row from "./Row"

export default function Content(props) {
    const[genre, setGenre] = useState()
    const[playlist, setPlaylist] = useState()
    
    return <>
        <main className="content">
            <p className="section_name">Genres</p>
            <div className="genres_container">
                <Row type={"genre"} elemId={"get_genres"} updateData = {setGenre}/>
            </div>
            <p className="section_name">Albums</p>
            <div className="albums_container">
                <Row type={"album"} elemId={genre} updateData = {setPlaylist}/>
            </div>
            <p className="section_name">Tracks</p>
            <div className="tracks_container">
                <Row type={"track"} elemId={playlist} updateData = {props.updateCurrentTrack} />
            </div>
        </main>
    </>
}
