import API from "../utils/api"

export default function ElementOfRow(props) {
    return <button className={props.type} key={props.id} onClick={
        () => connectButton(props.type, props.id)  
    }>
        <img src={props.img} alt={props.type} width="100" height="100" />
        <p>{props.name}</p>
        <p>{props.artist}</p>
    </button>

    function connectButton(elementType, elementId) {
        switch(elementType) {
            case "genre": 
                API.get_playlists(elementId).then(playlists => props.updateData(playlists))
                return
            case "album": 
                API.get_tracks(elementId).then(tracks => props.updateData(tracks))
                return
            case "track": 
                API.get_track(elementId).then(track => props.updateData(track))
                return
        }
    }
}

