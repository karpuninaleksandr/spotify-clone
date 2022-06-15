import ElementOfRow from "./ElementOfRow"
import ErrorMessage from "./ErrorMessage"

export default function RowOfElements(props) {
    switch(props.type) {
        case "genre":
            return <>
                {
                    props.elements ? props.elements.map(genre => 
                            <ElementOfRow 
                                type = {"genre"}
                                id = {genre.id}
                                img = {genre.icons[0].url} 
                                name = {genre.name} 
                                artist = {null} 
                                updateData = {props.updateData}
                                key = {genre.id}
                            />
                    ) : <ErrorMessage />
                }
            </>
        case "album": 
            return <>
                {
                    props.elements ? props.elements.map(playlist => 
                            <ElementOfRow 
                                type = {"album"} 
                                id = {playlist.id} 
                                img = {playlist.images[0].url} 
                                name = {playlist.name} 
                                artist = {null} 
                                updateData = {props.updateData}
                                key = {playlist.id}
                            />
                    ) : <ErrorMessage />
                }
            </>
        case "track": 
            return <>
                {
                    props.elements ? props.elements.map(track => 
                        <ElementOfRow 
                            type = {"track"} 
                            id = {track.track.id} 
                            img = {track.track.album.images[0].url} 
                            name = {track.track.name} 
                            artist = {track.track.artists[0].name} 
                            updateData = {props.updateData}
                            key = {track.track.id}
                        />
                    ) : <ErrorMessage />
                }
            </>
    }
}

